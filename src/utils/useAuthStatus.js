import { useEffect, useState } from 'react';
import { getAuth } from './auth';

export function useAuthStatus() {
  const [auth, setAuthState] = useState(() => getAuth());

  useEffect(() => {
    const handle = () => setAuthState(getAuth());
    window.addEventListener('smartlearn-auth-changed', handle);
    // In case another tab changes sessionStorage (rare), listen anyway.
    window.addEventListener('storage', handle);
    return () => {
      window.removeEventListener('smartlearn-auth-changed', handle);
      window.removeEventListener('storage', handle);
    };
  }, []);

  return {
    auth,
    isAuthenticated: Boolean(auth),
  };
}

