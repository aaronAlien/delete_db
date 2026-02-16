import SignupForm from "../components/SignupForm";
import Counters from "../components/Counters";
import { Link } from "react-router-dom";
import { useDatabaseWidget } from "../context/DatabaseWidgetContext";

export default function Signup() {
  const { isEnabled, enableWidget } = useDatabaseWidget();

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8 sm:mt-0 mt-12'>
        {/* illustration */}
        <div className='text-center'>
          <div className='w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full flex items-center justify-center'>
            <div className='text-6xl'>🔒</div>
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Try It Out!</h1>
          <p className='text-gray-600'>
            Create an account with your name + email
          </p>
          <p className='text-sm text-gray-500 mt-1'>
            *real email/name not required
          </p>
        </div>

        {/* db widget */}
        {!isEnabled && (
          <div className='bg-gradient-to-r from-accent-50 to-purple-50 border-2 border-accent-300 rounded-2xl p-6 text-center shadow-md'>
            <h3 className='text-lg font-bold text-gray-900 mb-2'>
              watch the database live 👀
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              enable the live monitor to see your data being created and deleted
            </p>
            <button
              onClick={enableWidget}
              className='px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold shadow-md'
            >
              enable →
            </button>
          </div>
        )}

        {/* form */}
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          <SignupForm />
        </div>

        {/* stats */}
        <div className='bg-white rounded-2xl shadow-lg p-6'>
          <div className='text-center mb-4'>
            <h2 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>
              stats
            </h2>
          </div>
          <Counters />
          {/* admin */}
          <div className='text-center pt-2 mt-2'>
            <Link
              to='/admin'
              target="_blank"
              className='text-sm font-semibold text-accent-600 hover:text-accent-800'
            >
              view live database →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
