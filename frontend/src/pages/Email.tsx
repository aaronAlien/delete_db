import FakeEmail from '../components/FakeEmail';

export default function Email() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* padding - widget on mobile */}
      <div className="md:pt-10 pt-16 py-8 px-4">
        {/* main */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              <span>📬</span>
              <span>check your inbox</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Email sent!</h1>
            <p className="text-gray-600">We've sent a confirmation link to your email ↓</p>
          </div>

          <FakeEmail />
        </div>
      </div>
    </div>
  );
}