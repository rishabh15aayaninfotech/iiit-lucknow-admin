import { buildApiUrl } from '../config/api'

async function parseResponse(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message || 'Something went wrong while fetching categories.')
  }

  return payload
}

function createAuthorizedHeaders(token, extraHeaders = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...extraHeaders,
  }
}

export async function getCategories({ token, page, limit }) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  const response = await fetch(buildApiUrl(`/admin/categories?${query.toString()}`), {
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}

export async function getCategoryById({ token, categoryId }) {
  const response = await fetch(buildApiUrl(`/admin/categories/${categoryId}`), {
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}

export async function createCategory({ token, data }) {
  const response = await fetch(buildApiUrl('/admin/categories'), {
    method: 'POST',
    headers: createAuthorizedHeaders(token, {
      'content-type': 'application/json',
    }),
    body: JSON.stringify(data),
  })

  return parseResponse(response)
}

export async function updateCategory({ token, categoryId, data }) {
  const response = await fetch(buildApiUrl(`/admin/categories/${categoryId}`), {
    method: 'PUT',
    headers: createAuthorizedHeaders(token, {
      'content-type': 'application/json',
    }),
    body: JSON.stringify(data),
  })

  return parseResponse(response)
}

export async function deleteCategory({ token, categoryId }) {
  const response = await fetch(buildApiUrl(`/admin/categories/${categoryId}`), {
    method: 'DELETE',
    headers: createAuthorizedHeaders(token),
  })

  return parseResponse(response)
}
