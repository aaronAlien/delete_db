import { useEffect, useState } from 'react';

interface DatabaseWidgetProps {
  isEnabled: boolean;
  onClose?: () => void;
}

interface User {
  id: string;
  name: string;
  status: string;
}

export default function DatabaseWidget({ isEnabled, onClose }: DatabaseWidgetProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [counters, setCounters] = useState({ completedCycles: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const usersResponse = await fetch('/api/admin/users');
        const usersData = await usersResponse.json();
        setUsers(usersData.users);

        const countersResponse = await fetch('/api/counters');
        const countersData = await countersResponse.json();
        setCounters(countersData);
      } catch (error) {
        console.error('failed to fetch db status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      {/* mobile banner */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b-2 border-primary-200 shadow-md z-40 px-4 py-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${users.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="font-bold text-gray-900">db status</span>
            </div>
            <div className="flex gap-4 text-xs text-gray-600 font-semibold">
              <span>users: <strong className="text-accent-600">{users.length}</strong></span>
              <span>cycles: <strong className="text-primary-600">{counters.completedCycles}</strong></span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* desktop floating widget */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-white border-2 border-primary-300 rounded-2xl shadow-xl px-5 py-4 hover:shadow-2xl hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${users.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="font-bold text-gray-900">📊 db status</span>
            </div>
          </button>
        ) : (
          <div className="bg-white border-2 border-primary-300 rounded-2xl shadow-2xl w-80">
            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-gray-100 bg-gradient-to-r from-primary-50 to-accent-50">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${users.length > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="font-bold text-gray-900">database status</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-accent-50 to-purple-50 rounded-xl p-4 border border-accent-200">
                  <div className="text-xs text-gray-600 font-semibold mb-1">users in db</div>
                  <div className="text-3xl font-bold text-accent-700">{users.length}</div>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4 border border-primary-200">
                  <div className="text-xs text-gray-600 font-semibold mb-1">completed</div>
                  <div className="text-3xl font-bold text-primary-700">{counters.completedCycles}</div>
                </div>
              </div>

              {users.length === 0 ? (
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-200 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🗑️</div>
                  <div className="text-xs text-primary-800 font-bold mb-1">database empty</div>
                  <div className="text-xs text-primary-600">all data deleted</div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-accent-50 to-purple-50 border-2 border-accent-200 rounded-xl p-4">
                  <div className="text-xs text-accent-800 font-bold mb-3">current users:</div>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="text-xs text-gray-900 flex items-center justify-between bg-white px-3 py-2 rounded-lg">
                        <span className="font-semibold">{user.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          user.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-center text-gray-500 font-medium">
                {loading ? '↻ updating...' : '• updates every 2s'}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}