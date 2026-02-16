import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  status: string;
  created_at: string;
  confirmed_at: string | null;
  expires_at: string | null;
}

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [counters, setCounters] = useState({ completedCycles: 0 });
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersResponse = await fetch('/api/admin/users');
      const usersData = await usersResponse.json();
      setUsers(usersData.users);

      const countersResponse = await fetch('/api/counters');
      const countersData = await countersResponse.json();
      setCounters(countersData);

      setLastRefresh(new Date());
    } catch (error) {
      console.error('failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleTimeString();
  };

  const getTimeRemaining = (expiresAt: string | null) => {
    if (!expiresAt) return '-';
    const remaining = new Date(expiresAt).getTime() - new Date().getTime();
    if (remaining <= 0) return 'expired';
    const seconds = Math.floor(remaining / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 uppercase">live database view</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold shadow-md"
            >
              ← back to signup
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* stats cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-primary-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">users in db</div>
              <div className={`w-3 h-3 rounded-full ${users.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-accent-600 to-purple-600 bg-clip-text text-transparent">
              {users.length}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-primary-200">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">completed cycles</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {counters.completedCycles}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-primary-200">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">last refresh</div>
            <div className="text-lg font-mono text-gray-900">{formatDate(lastRefresh.toISOString())}</div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50"
            >
              {loading ? 'refreshing...' : '↻ refresh now'}
            </button>
          </div>
        </div>

        {/* users table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-accent-50">
            <h2 className="text-xl font-bold text-gray-900">current users</h2>
            <p className="text-sm text-gray-600 mt-1">
              {users.length === 0 
                ? 'no users in database - all data deleted ✓' 
                : `${users.length} user(s) currently stored`}
            </p>
          </div>

          {users.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🗑️</span>
              </div>
              <p className="text-gray-600 font-medium mb-2">database is empty</p>
              <p className="text-sm text-primary-600">privacy-by-design working as intended</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">created</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">confirmed</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">expires in</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{formatDate(user.created_at)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{formatDate(user.confirmed_at)}</td>
                      <td className="px-6 py-4 text-sm font-mono font-semibold">
                        <span className={getTimeRemaining(user.expires_at) === 'expired' ? 'text-red-600' : 'text-gray-900'}>
                          {getTimeRemaining(user.expires_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* explanation */}
        <div className="bg-gradient-to-r from-accent-50 to-purple-50 border-2 border-accent-200 rounded-2xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">💡 info</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>this panel queries the actual sqlite database every 2 seconds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>user signs up → appear in database with status</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>user logs out or session expires → disappear instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>only "completed cycles" counter persists after deletion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>auto cleanup deletes pending users afetr 10 minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>email addresses are hashed using sha-256 and not shown</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}