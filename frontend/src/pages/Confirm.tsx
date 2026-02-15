import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Confirm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setError('invalid confirmation link');
        setLoading(false);
        return;
      }

      try {
        console.log('confirming token:', token); // debug
        const response = await api.confirm(token);
        console.log('confirm response:', response); // debug
        
        // wait a bit before redirecting
        setTimeout(() => {
          navigate(`/thanks/${token}`);
        }, 1500);
      } catch (err: any) {
        console.error('confirm error:', err); // debug
        setError(err.message);
        setLoading(false);
      }
    };

    confirmEmail();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">confirming your email...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-red-600 text-4xl">✗</div>
          <h1 className="text-2xl font-bold text-gray-900">confirmation failed</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            back to signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">email confirmed!</h1>
        <p className="text-gray-600">redirecting...</p>
      </div>
    </div>
  );
}
