import { useParams, useNavigate, Link } from "react-router-dom";

export default function FakeEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(`/confirm/${token}`);
  };

  return (
    <div className='w-full max-w-4xl mx-auto email-font'>
      {/* email client header */}
      <div className='bg-white border border-gray-200 rounded-t-xl shadow-sm'>
        <div className='flex items-center justify-between px-6 py-3 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <div className='flex gap-1'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
            </div>
            <span className='text-sm font-semibold text-gray-700'>inbox</span>
          </div>
          <div className='flex items-center gap-2 text-xs text-gray-500'>
            <span>📧</span>
            <span>1 new message</span>
          </div>
        </div>
      </div>
      {/* email list */}
      <div className='bg-white border-x border-gray-200'>
        <div className='border-b border-gray-200 bg-accent-50 hover:bg-accent-100 cursor-pointer'>
          <div className='px-6 py-4'>
            <div className='flex items-start justify-between mb-2'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-semibold'>
                  U
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>DelDB</div>
                  <div className='text-xs text-gray-500'>
                    noreply@deletedbapp.com
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span className='px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full'>
                  read
                </span>
                <span className='text-xs text-gray-500'>just now</span>
              </div>
            </div>
            <div className='ml-13'>
              <div className='font-semibold text-gray-900 mb-1'>
                Confirm your email address
              </div>
              <div className='text-sm text-gray-600'>
                Thanks for signing up! This is a simulated email...
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* email content */}
      <div className='bg-white border border-gray-200 rounded-b-xl shadow-sm p-8'>
        <div className='max-w-2xl mx-auto space-y-6'>
          {/* email header */}
          <div className='flex items-center gap-4 pb-6 border-b border-gray-200'>
            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-lg'>
              U
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-gray-900'>DelDB</div>
              <div className='text-sm text-gray-500'>
                noreply@deletedbapp.com
              </div>
            </div>
            <div className='text-xs text-gray-500'>just now</div>
          </div>

          {/* email subject */}
          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Confirm Your Email
            </h2>
            <div className='text-sm text-gray-500'>to: you</div>
          </div>

          {/* email body */}
          <div className='space-y-4 text-gray-700 leading-relaxed'>
            <p className='text-lg'>Hi! 👋</p>

            <p>
              Thanks for signing up to our DeleteDB demonstration app.
              We're excited to show you how data deletion works in practice.
            </p>

            <p>
              To complete your registration and start your temporary session,
              please confirm your email address by clicking the button below:
            </p>

            {/* CTA button */}
            <div className='py-6'>
              <button
                onClick={handleConfirm}
                className='w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white brand-font rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold text-lg shadow-lg hover:shadow-xl'
              >
                confirm email address{"  "}✓ 
              </button>
            </div>

            <p className='text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-200'>
              <strong>note:</strong><br /> Once confirmed you can manually logout using the buttons, otherwise you will be logged out automatically after 5 minutes. Your data will be permanently deleted from our database. Only aggregate statistics will be retained.
              <br />
              <br />
              <Link
              to='/admin'
              className='text-sm font-semibold text-accent-600 hover:text-accent-800'
            >
              view live database →
            </Link>
            </p>
            

            <p className='text-sm text-gray-500'>
              If you didn't create this account, you can safely ignore this
              email. No data will be stored.
            </p>
          </div>

          {/* email footer */}
          <div className='pt-6 border-t border-gray-200 text-center text-xs text-gray-700'>
            <p>DeleteDB • privacy-by-design demonstration</p>
            <p className='mt-1'>
              This is a simulated email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
