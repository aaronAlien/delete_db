import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Confirm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setError("invalid confirmation link");
        setLoading(false);
        return;
      }

      try {
        console.log("confirming token:", token);
        const response = await api.confirm(token);
        console.log("confirm response:", response);

        setTimeout(() => {
          navigate(`/thanks/${token}`);
        }, 1500);
      } catch (err: any) {
        console.error("confirm error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    confirmEmail();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 flex flex-col items-center justify-center p-4'>
        <div className='text-center bg-white rounded-2xl shadow-lg p-12 max-w-md'>
          <div className='w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-6'></div>
          <p className='text-gray-700 font-medium'>confirming your email...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 flex flex-col items-center justify-center p-4'>
        <div className='text-center bg-white rounded-2xl shadow-lg p-12 max-w-md space-y-6'>
          <div className='w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto'>
            <span className='text-4xl'>✗</span>
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
              confirmation failed
            </h1>
            <p className='text-gray-600'>{error}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className='px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold shadow-md'
          >
            back to signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 flex flex-col items-center justify-center p-4'>
      <div className='md:pt-0 pt-16'>
        <div className='text-center bg-white rounded-2xl shadow-lg p-12 max-w-md'>
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mx-auto mb-6'>
            <span className='text-4xl'>✓</span>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            email confirmed!
          </h1>
          <p className='text-gray-600'>redirecting to your app...</p>
        </div>
      </div>
    </div>
  );
}
