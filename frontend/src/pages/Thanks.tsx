import { useNavigate, useParams } from 'react-router-dom';

export default function Thanks() {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/app/${token}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-6xl mb-4">🎉</div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">thanks for signing up!</h1>
          <p className="text-gray-600">your account has been created successfully</p>
        </div>

        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          continue to app
        </button>
      </div>
    </div>
  );
}