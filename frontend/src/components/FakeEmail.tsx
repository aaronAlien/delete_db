import { useParams, useNavigate } from 'react-router-dom';

export default function FakeEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(`/confirm/${token}`);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* fake email header */}
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <div className="text-xs text-gray-500">inbox</div>
        </div>

        {/* fake email content */}
        <div className="p-6">
          <div className="mb-4">
            <div className="text-sm text-gray-500">from: noreply@privacyapp.com</div>
            <div className="text-lg font-semibold mt-1">confirm your email</div>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>thanks for signing up!</p>
            <p>click the button below to confirm your email address and complete your registration.</p>
            
            <div className="py-4">
              <button
                onClick={handleConfirm}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                confirm email address
              </button>
            </div>

            <p className="text-sm text-gray-500">
              if you didn't sign up for this account, you can ignore this email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}