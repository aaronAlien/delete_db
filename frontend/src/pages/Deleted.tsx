import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Deleted() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isExpired = searchParams.get('expired') === 'true';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-6xl mb-4">🗑️</div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isExpired ? 'session expired' : 'logged out successfully'}
          </h1>
          <p className="text-gray-600">
            {isExpired 
              ? 'your session expired after 5 minutes. your data has been permanently deleted.' 
              : `you've logged out. your data has been permanently deleted.`}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            ✓ all personal data removed<br/>
            ✓ only aggregate metrics preserved<br/>
            ✓ privacy-by-design in action
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          return to signup
        </button>
      </div>
    </div>
  );
}