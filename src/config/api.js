const DEFAULT_API_BASE_URL = 'http://87.106.82.5:8686/api/v1'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${API_BASE_URL}${normalizedPath}`
}
