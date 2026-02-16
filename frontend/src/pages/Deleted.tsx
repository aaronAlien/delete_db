import { useSearchParams, useNavigate } from "react-router-dom";

export default function Deleted() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isExpired = searchParams.get("expired") === "true";

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 flex flex-col items-center justify-center p-4'>
      <div className='md:pt-0 pt-16'>
        <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-12 text-center space-y-6'>
          <div className='w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mx-auto'>
            <span className='text-5xl'>🗑️</span>
          </div>

          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-3'>
              {isExpired ? "session expired" : "logged out successfully"}
            </h1>
            <p className='text-gray-600'>
              {isExpired
                ? "your session expired after 5 minutes. your data has been permanently deleted."
                : "you've logged out. your data has been permanently deleted."}
            </p>
          </div>

          <div className='bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-xl p-6 space-y-2'>
            <div className='flex items-center justify-center gap-2 text-sm text-primary-800 font-medium'>
              <span>✓</span>
              <span>all personal data removed</span>
            </div>
            <div className='flex items-center justify-center gap-2 text-sm text-primary-800 font-medium'>
              <span>✓</span>
              <span>only aggregate metrics preserved</span>
            </div>
            <div className='flex items-center justify-center gap-2 text-sm text-primary-800 font-medium'>
              <span>✓</span>
              <span>privacy-by-design in action</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className='w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold shadow-lg hover:shadow-xl'
          >
            return to signup
          </button>
        </div>
      </div>
    </div>
  );
}
