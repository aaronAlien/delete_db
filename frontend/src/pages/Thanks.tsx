import { useNavigate, useParams } from "react-router-dom";

export default function Thanks() {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/app/${token}`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 flex flex-col items-center justify-center p-4'>
      <div className='md:pt-0 pt-16'>
        <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-12 text-center space-y-6'>
          <div className='text-7xl mb-4'>🎉</div>

          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-3'>
              thanks for signing up!
            </h1>
            <p className='text-gray-600'>
              your account has been created successfully
            </p>
          </div>

          <div className='bg-primary-50 border border-primary-200 rounded-xl p-4'>
            <p className='text-sm text-primary-800'>
              your session will expire in <strong>5 minutes</strong>, or you can
              logout manually at any time.
            </p>
          </div>

          <button
            onClick={handleContinue}
            className='w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold shadow-lg hover:shadow-xl'
          >
            continue to app →
          </button>
        </div>
      </div>
    </div>
  );
}
