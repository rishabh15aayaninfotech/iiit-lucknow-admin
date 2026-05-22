import { buildApiUrl } from '../config/api'

export async function loginRequest(credentials) {
  const response = await fetch(buildApiUrl('/auth/login'), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok || !payload?.success || !payload?.data?.token) {
    throw new Error(payload?.message || 'Unable to login right now.')
  }

  return payload.data
}
