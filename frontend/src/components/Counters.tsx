import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Counters() {
  const [counters, setCounters] = useState({ signups: 0, deletions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const data = await api.getCounters();
        setCounters(data);
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
    <div className="flex gap-8 text-center">
      <div>
        <div className="text-3xl font-bold text-green-600">{counters.signups}</div>
        <div className="text-sm text-gray-600">additions</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-red-600">{counters.deletions}</div>
        <div className="text-sm text-gray-600">deletions</div>
      </div>
    </div>
  );
}