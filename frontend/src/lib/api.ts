// api wrapper for backend calls

const API_BASE = '/api';

export const api = {
  // signup
  signup: async (name: string, email: string) => {
    const response = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'signup failed');
    }
    
    return response.json();
  },

  // confirm email
  confirm: async (token: string) => {
    const response = await fetch(`${API_BASE}/confirm/${token}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'confirmation failed');
    }
    
    return response.json();
  },

  // logout (delete user)
  logout: async (token: string) => {
    const response = await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'logout failed');
    }
    
    return response.json();
  },

  // get counters
  getCounters: async () => {
    const response = await fetch(`${API_BASE}/counters`);
    
    if (!response.ok) {
      throw new Error('failed to fetch counters');
    }
    
    return response.json() as Promise<{ completedCycles: number }>;
  },
};