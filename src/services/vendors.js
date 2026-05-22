import { buildApiUrl } from '../config/api'

async function parseResponse(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message || 'Something went wrong while fetching vendors.')
  }

  return payload
}

function createAuthorizedHeaders(token, extraHeaders = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...extraHeaders,
  }
}

export async function getVendors({ token, page, limit }) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  const response = await fetch(buildApiUrl(`/vendor?${query.toString()}`), {
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}

export async function getVendorStats({ token }) {
  const response = await fetch(buildApiUrl('/vendor/stats'), {
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}

export async function getVendorById({ token, vendorId }) {
  const response = await fetch(buildApiUrl(`/vendor/${vendorId}`), {
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}

export async function createVendor({ token, data }) {
  const response = await fetch(buildApiUrl('/vendor'), {
    method: 'POST',
    headers: createAuthorizedHeaders(token, {
      'content-type': 'application/json',
    }),
    body: JSON.stringify(data),
  })

  return parseResponse(response)
}

export async function updateVendorVerification({ token, vendorId, isVerified }) {
  const response = await fetch(buildApiUrl(`/vendor/${vendorId}/verify`), {
    method: 'PATCH',
    headers: createAuthorizedHeaders(token, {
      'content-type': 'application/json',
    }),
    body: JSON.stringify({
      isVerified,
    }),
  })

  return parseResponse(response)
}

export async function updateVendorBlockStatus({ token, vendorId, isBlocked, blockReason = '' }) {
  const response = await fetch(buildApiUrl(`/vendor/${vendorId}/block`), {
    method: 'PATCH',
    headers: createAuthorizedHeaders(token, {
      'content-type': 'application/json',
    }),
    body: JSON.stringify({
      isBlocked,
      blockReason,
    }),
  })

  return parseResponse(response)
}

export async function deleteVendor({ token, vendorId }) {
  const response = await fetch(buildApiUrl(`/vendor/${vendorId}`), {
    method: 'DELETE',
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}
