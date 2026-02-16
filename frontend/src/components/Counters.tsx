import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Counters() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const data = await api.getCounters();
        setCount(data.completedCycles);
      } catch (error) {
        console.error('failed to fetch counters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounters();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-pulse text-gray-400">loading stats...</div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 mb-3">
        <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          {count}
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-700 mb-1">completed cycles</div>
      <div className="text-xs text-gray-500 max-w-xs mx-auto">
        users signed up, confirmed and deleted
      </div>
    </div>
  );
}