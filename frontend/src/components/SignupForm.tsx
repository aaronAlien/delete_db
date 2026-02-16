import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function SignupForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      setStep(2);
      setError('');
    } else {
      setError('please enter your name');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      setError('please enter a valid email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.signup(name, email);
      navigate(`/email/${response.token}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* name */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 placeholder-gray-400"
              placeholder="Phoebe"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold shadow-md hover:shadow-lg"
          >
            next →
          </button>
        </form>
      )}

      {/* email */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 placeholder-gray-400"
              placeholder="phoebe@phoebe.com"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setError('');
              }}
              className="px-6 py-3 text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-semibold"
            >
              ← back
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'signing up...' : 'sign up'}
            </button>
          </div>
        </form>
      )}

      {/* progress dots */}
      <div className="flex gap-2 justify-center pt-2">
        <div className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-primary-600' : 'bg-gray-300'}`} />
        <div className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-primary-600' : 'bg-gray-300'}`} />
      </div>
    </div>
  );
}