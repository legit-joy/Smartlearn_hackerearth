const AUTH_STORAGE_KEY = 'smartlearn_auth';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || '/api/v1';

export function getAuth() {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.user?.email || typeof parsed.user.email !== 'string') return null;
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

async function requestJson(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export async function loginWithEmail({ email, password }) {
  const json = await requestJson('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const payload = {
    provider: 'email',
    createdAt: Date.now(),
    user: json?.data?.user,
    accessToken: json?.data?.accessToken,
  };
  setAuth(payload);
  return getAuth();
}

export async function signupWithEmail({ name, fullName, username, email, password }) {
  const json = await requestJson('/users/signup', {
    method: 'POST',
    body: JSON.stringify({
      fullName: (fullName ?? name) || '',
      username,
      email,
      password,
    }),
  });
  const payload = {
    provider: 'email',
    createdAt: Date.now(),
    user: json?.data?.user,
    accessToken: json?.data?.accessToken,
  };
  setAuth(payload);
  return getAuth();
}

export async function signInWithProvider(provider) {
  // NOTE: This is a client-side mock sign-in. Real OAuth requires backend + provider setup.
  await new Promise((resolve) => setTimeout(resolve, 600));
  const email =
    provider === 'google'
      ? 'google.user@smartlearn.demo'
      : 'github.user@smartlearn.demo';
  setAuth({ user: { email }, provider, createdAt: Date.now() });
  return getAuth();
}

