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
    return <div className="text-gray-500">loading stats...</div>;
  }

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-600">{count}</div>
      <div className="text-sm text-gray-600 mt-1">completed cycles</div>
      <div className="text-xs text-gray-500 mt-2">
        users who signed up, confirmed, and logged out
      </div>
    </div>
  );
}