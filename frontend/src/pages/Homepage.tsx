import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Homepage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!token) return;

    setLoading(true);

    try {
      await api.logout(token);
      // redirect to signup page
      navigate('/');
    } catch (err: any) {
      console.error('logout failed:', err);
      alert('logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-gray-900">privacy app</div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
            >
              {loading ? 'logging out...' : 'logout'}
            </button>
          </div>
        </div>
      </nav>

      {/* main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">welcome to the app!</h1>
          <p className="text-lg text-gray-600">
            you're now logged in. when you logout, your data will be permanently deleted.
          </p>
          
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">privacy-by-design</h2>
            <p className="text-gray-600 mb-4">
              this application demonstrates privacy-first architecture. your data is:
            </p>
            <ul className="text-left space-y-2 text-gray-700">
              <li>✓ stored temporarily while you're signed in</li>
              <li>✓ email addresses are hashed (never stored in plain text)</li>
              <li>✓ automatically deleted when you logout</li>
              <li>✓ only aggregate counters are preserved</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}