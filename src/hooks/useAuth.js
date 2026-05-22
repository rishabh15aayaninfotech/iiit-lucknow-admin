const AUTH_KEY = 'arivelle-admin-auth'

function persistAuthState(authData) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
}

function clearAuthState() {
  localStorage.removeItem(AUTH_KEY)
}

function readAuthState() {
  const storedValue = localStorage.getItem(AUTH_KEY)

  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue)
  } catch {
    localStorage.removeItem(AUTH_KEY)
    return null
  }
}

export function useAuth() {
  const authState = readAuthState()
  const isAuthenticated = Boolean(authState?.token)

  return {
    authState,
    isAuthenticated,
    login: persistAuthState,
    logout: clearAuthState,
  }
}
