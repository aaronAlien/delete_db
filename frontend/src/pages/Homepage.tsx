import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import LogoutModal from "../components/LogoutModal";
import { useDatabaseWidget } from "../context/DatabaseWidgetContext";
import { FaNode, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiVite, SiSqlite } from "react-icons/si";

export default function Homepage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const { isEnabled, enableWidget } = useDatabaseWidget();

  // check session - set expiry time
  useEffect(() => {
    const checkSession = async () => {
      if (!token) return;

      try {
        const response = await fetch(`/api/session/${token}`);
        const data = await response.json();

        if (data.expired) {
          // session expired - redirect to deleted page
          navigate("/deleted?expired=true");
        } else if (data.expiresAt) {
          setExpiresAt(data.expiresAt);
        }
      } catch (error) {
        console.error("failed to check session:", error);
      }
    };

    checkSession();
  }, [token, navigate]);

  // countdown timer
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const remaining = expiry - now;

      if (remaining <= 0) {
        // session expired
        clearInterval(interval);
        navigate("/deleted?expired=true");
      } else {
        setTimeRemaining(Math.floor(remaining / 1000)); // to seconds
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, navigate]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleLogoutConfirm = async () => {
    if (!token) return;

    setLoading(true);

    try {
      await api.logout(token);
      navigate("/deleted?expired=false");
    } catch (err: any) {
      console.error("logout failed:", err);
      alert("logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='min-h-screen bg-gray-50'>
        {/* add padding top on mobile for the widget banner */}
        <div className='md:pt-0 pt-12'>
          {/* navbar */}
          <nav className='bg-white border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex justify-between items-center h-16'>
                <div className='text-xl font-bold text-gray-900'>
                  DeleteDB
                </div>

                <div className='flex items-center gap-4'>
                  {/* timer */}
                  {timeRemaining !== null && (
                    <div className='flex items-center gap-2 text-sm'>
                      <span className='text-gray-600'>session expires in:</span>
                      <span className='font-mono font-bold text-red-600'>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleLogoutClick}
                    className='px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg'
                  >
                    logout
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* main content */}
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12'>
            {/* welcome section */}
            <div className='text-center space-y-4'>
              <h1 className='text-4xl font-bold text-gray-900'>
                Welcome to the DelDB app!
              </h1>
              <p className='text-lg text-gray-600'>
                You're now logged in.<br /> Your session will expire in 5 minutes, or
                you can logout manually.
              </p>
            </div>

            {/* database monitor prompt */}
            {!isEnabled && (
              <div className='bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  want to see the database in real-time?
                </h3>
                <p className='text-sm text-gray-600 mb-4'>
                  enable the live monitor to watch your data being created and
                  deleted in real-time
                </p>
                <button
                  onClick={enableWidget}
                  className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'
                >
                  enable live monitor →
                </button>
              </div>
            )}

            {/* explain project */}
            <div className='bg-white border border-gray-200 rounded-lg p-8 space-y-6'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                  About DeleteDB project
                </h2>
                <p className='text-gray-700 leading-relaxed'>
                  This is a full-stack demonstration of privacy-first
                  architecture. This system deliberately implements automatic
                  data deletion to showcase responsible data handling practices.
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  How It Works
                </h3>
                <div className='space-y-2 text-gray-700'>
                  <p>
                    <span className='font-medium'>1. sign up:</span> user
                    provides name and email
                  </p>
                  <p>
                    <span className='font-medium'>2. confirmation:</span> email
                    verification flow (simulated)
                  </p>
                  <p>
                    <span className='font-medium'>3. login:</span> 5-minute
                    temporary session begins
                  </p>
                  <p>
                    <span className='font-medium'>4. logout:</span> automatic
                    deletion, data removed on logout or timeout
                  </p>
                  <p>
                    <span className='font-medium'>5. metrics only:</span> only
                    aggregate counters persist
                  </p>
                </div>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  Privacy
                </h3>
                <ul className='space-y-2 text-gray-700'>
                  <li>✓ email addresses are hashed using sha-256</li>
                  <li>✓ user data automatically expires after 5 minutes</li>
                  <li>✓ manual logout triggers immediate deletion</li>
                  <li>✓ database transactions ensure data consistency</li>
                  <li>✓ only anonymised aggregate metrics are retained</li>
                </ul>
              </div>
            </div>

            {/* tech stack */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-8 space-y-6'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                  Technical Implementations
                </h2>
                <p className='flex flex-wrap gap-3 text-xl text-gray-700 mb-6'>
                  <SiTypescript title='TypeScript' />
                  <FaNode title='Node' />
                  <SiSqlite title="Sqlite" />
                  <FaReact title='React' />
                  <SiVite title="Vite" />
                  <SiTailwindcss title='Tailwind CSS' />
                </p>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2'>Frontend</h3>
                  <ul className='space-y-1 text-sm text-gray-700'>
                    <li>• React with Typescript</li>
                    <li>• Vite - build tooling</li>
                    <li>• React Router - navigation</li>
                    <li>• Taillwindcss - styling</li>
                    <li>• Responsive design patterns</li>
                  </ul>
                </div>

                <div>
                  <h3 className='font-semibold text-gray-900 mb-2'>Backend</h3>
                  <ul className='space-y-1 text-sm text-gray-700'>
                    <li>• Node.js with express</li>
                    <li>• Typescript - type safety</li>
                    <li>• Sqlite3 with better-sqlite3</li>
                    <li>• Restful api design</li>
                    <li>• Database transactions</li>
                  </ul>
                </div>

                <div>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    Architecture
                  </h3>
                  <ul className='space-y-1 text-sm text-gray-700'>
                    <li>• MVC pattern</li>
                    <li>• Separation of concerns</li>
                    <li>• Cryptographic hashing (sha-256)</li>
                    <li>• Session management</li>
                    <li>• Error handling & validation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* cta */}
            <div className='text-center space-y-4 pt-8'>
              <p className='text-gray-700'>
                ready to see the deletion process in action?
              </p>
              <button
                onClick={handleLogoutClick}
                className='px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium'
              >
                logout & delete my data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* logout confirmation modal */}
      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogoutConfirm}
        loading={loading}
      />
    </>
  );
}
