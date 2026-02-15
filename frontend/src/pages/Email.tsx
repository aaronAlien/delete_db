import FakeEmail from '../components/FakeEmail';

export default function Email() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">check your email</h1>
          <p className="mt-2 text-gray-600">we've sent you a confirmation link</p>
        </div>

        <FakeEmail />
      </div>
    </div>
  );
}