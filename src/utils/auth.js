const AUTH_STORAGE_KEY = 'smartlearn_auth';

export function getAuth() {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.email || typeof parsed.email !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAuth());
}

export function setAuth(auth) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  try {
    window.dispatchEvent(new Event('smartlearn-auth-changed'));
  } catch {
    // ignore
  }
}

export function clearAuth() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  try {
    window.dispatchEvent(new Event('smartlearn-auth-changed'));
  } catch {
    // ignore
  }
}

export async function loginWithEmail({ email }) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  setAuth({ email, provider: 'email', createdAt: Date.now() });
  return getAuth();
}

export async function signupWithEmail({ email }) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  setAuth({ email, provider: 'email', createdAt: Date.now() });
  return getAuth();
}

export async function signInWithProvider(provider) {
  // NOTE: This is a client-side mock sign-in. Real OAuth requires backend + provider setup.
  await new Promise((resolve) => setTimeout(resolve, 600));
  const email =
    provider === 'google'
      ? 'google.user@smartlearn.demo'
      : 'github.user@smartlearn.demo';
  setAuth({ email, provider, createdAt: Date.now() });
  return getAuth();
}

