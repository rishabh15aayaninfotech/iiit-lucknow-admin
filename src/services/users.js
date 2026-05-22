import { buildApiUrl } from '../config/api'

async function parseResponse(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message || 'Something went wrong while fetching users.')
  }

  return payload
}

function createAuthorizedHeaders(token, extraHeaders = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...extraHeaders,
  }
}

export async function getUsers({ token, page, limit, search, sortBy, sortOrder }) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    sortBy,
    sortOrder,
  })

  const response = await fetch(buildApiUrl(`/user?${query.toString()}`), {
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}

export async function getUserById({ token, userId }) {
  const response = await fetch(buildApiUrl(`/user/${userId}`), {
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}

export async function updateUserBlockStatus({ token, userId, isBlocked, blockedReason = '' }) {
  const response = await fetch(buildApiUrl(`/user/${userId}/block`), {
    method: 'PATCH',
    headers: createAuthorizedHeaders(token, {
      'content-type': 'application/json',
    }),
    body: JSON.stringify({
      isBlocked,
      blockedReason,
    }),
  })

  return parseResponse(response)
}

export async function deleteUser({ token, userId }) {
  const response = await fetch(buildApiUrl(`/user/${userId}`), {
    method: 'DELETE',
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}
