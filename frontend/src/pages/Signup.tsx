import SignupForm from '../components/SignUpForm';
import Counters from '../components/Counters';

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">create account</h1>
          <p className="mt-2 text-gray-600">sign up to get started</p>
        </div>

        <SignupForm />

        <div className="pt-8 border-t border-gray-200">
          <div className="text-center mb-4">
            <h2 className="text-sm font-medium text-gray-700">privacy stats</h2>
          </div>
          <div className="flex justify-center">
            <Counters />
          </div>
        </div>
      </div>
    </div>
  );
}