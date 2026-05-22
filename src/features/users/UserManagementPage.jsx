import {
  FiAlertCircle,
  FiFilter,
  FiMoreVertical,
  FiRefreshCw,
  FiPhone,
  FiTrash2,
  FiUser,
  FiEye,
  FiShield,
  FiShieldOff,
  FiMail,
} from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useToast } from '../../components/feedback/ToastProvider'
import { getUserById, getUsers, updateUserBlockStatus, deleteUser } from '../../services/users'
import { useAuth } from '../../hooks/useAuth'

const PAGE_LIMIT = 10
const SORT_BY = 'name'

function formatDate(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

function getInitials(name) {
  if (!name) {
    return 'NA'
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

function buildDonutSegments(values, circumference) {
  const total = values.reduce((sum, value) => sum + value, 0)

  if (!total) {
    return values.map(() => ({
      dashArray: `0 ${circumference}`,
      dashOffset: 0,
    }))
  }

  let offset = 0

  return values.map((value) => {
    const segmentLength = (value / total) * circumference
    const segment = {
      dashArray: `${segmentLength} ${circumference - segmentLength}`,
      dashOffset: -offset,
    }

    offset += segmentLength
    return segment
  })
}

function UserManagementPage() {
  const { authState, logout } = useAuth()
  const toast = useToast()
  const token = authState?.token
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [meta, setMeta] = useState({ page: 1, limit: PAGE_LIMIT, total: 0, totalPages: 1 })
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [refreshKey, setRefreshKey] = useState(0)
  const [listLoading, setListLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState('')
  const [pageError, setPageError] = useState('')
  const [detailError, setDetailError] = useState('')
  const [blockModalUser, setBlockModalUser] = useState(null)
  const [blockReason, setBlockReason] = useState('')
  const [deleteModalUser, setDeleteModalUser] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMeta((current) => ({ ...current, page: 1 }))
      setSearch(searchInput.trim())
    }, 350)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [searchInput])

  useEffect(() => {
    if (!token) {
      return
    }

    let isActive = true

    async function loadUsers() {
      setListLoading(true)
      setPageError('')

      try {
        const response = await getUsers({
          token,
          page: meta.page,
          limit: meta.limit,
          search,
          sortBy: SORT_BY,
          sortOrder,
        })

        if (!isActive) {
          return
        }

        const nextUsers = response.data || []
        const nextMeta = response.meta || meta

        setUsers(nextUsers)
        setMeta((current) => ({
          ...current,
          ...nextMeta,
        }))

      } catch (error) {
        if (!isActive) {
          return
        }

        if (error.message?.toLowerCase().includes('unauthorized')) {
          logout()
        }

        setUsers([])
        setPageError(error.message || 'Unable to load users right now.')
        toast.error(error.message || 'Unable to load users right now.', 'User fetch failed')
      } finally {
        if (isActive) {
          setListLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isActive = false
    }
  }, [token, meta.page, meta.limit, search, sortOrder, refreshKey, logout])

  useEffect(() => {
    if (!token || !selectedUserId) {
      setSelectedUser(null)
      setDetailError('')
      return
    }

    let isActive = true

    async function loadUserDetails() {
      setDetailLoading(true)
      setDetailError('')

      try {
        const response = await getUserById({ token, userId: selectedUserId })

        if (!isActive) {
          return
        }

        setSelectedUser(response.data || null)
      } catch (error) {
        if (!isActive) {
          return
        }

        setSelectedUser(null)
        setDetailError(error.message || 'Unable to load user details.')
      } finally {
        if (isActive) {
          setDetailLoading(false)
        }
      }
    }

    loadUserDetails()

    return () => {
      isActive = false
    }
  }, [token, selectedUserId])

  const totalUsers = meta.total
  const verifiedUsers = users.filter((item) => item.isEmailVerified).length
  const blockedUsers = users.filter((item) => item.isBlocked).length
  const activeUsers = users.filter((item) => !item.isBlocked).length
  const unverifiedUsers = users.filter((item) => !item.isEmailVerified).length
  const currentPageUsers = users.length
  const donutRadius = 54
  const donutCircumference = 2 * Math.PI * donutRadius
  const donutSegments = buildDonutSegments(
    [activeUsers || 0, unverifiedUsers || 0, blockedUsers || 0],
    donutCircumference,
  )
  const overviewLegend = [
    { label: 'Active users', value: activeUsers, tone: 'green' },
    { label: 'Pending verification', value: unverifiedUsers, tone: 'orange' },
    { label: 'Blocked users', value: blockedUsers, tone: 'red' },
  ]
  const miniBars = [
    {
      label: 'Page fill',
      value: meta.limit ? Math.round((currentPageUsers / meta.limit) * 100) : 0,
      tone: 'blue',
    },
    {
      label: 'Verified',
      value: currentPageUsers ? Math.round((verifiedUsers / currentPageUsers) * 100) : 0,
      tone: 'green',
    },
    {
      label: 'Active',
      value: currentPageUsers ? Math.round((activeUsers / currentPageUsers) * 100) : 0,
      tone: 'teal',
    },
    {
      label: 'Blocked',
      value: currentPageUsers ? Math.round((blockedUsers / currentPageUsers) * 100) : 0,
      tone: 'red',
    },
  ]

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > meta.totalPages || nextPage === meta.page) {
      return
    }

    setMeta((current) => ({ ...current, page: nextPage }))
  }

  const refreshUsers = async () => {
    setRefreshKey((current) => current + 1)
  }

  const handleBlockToggle = async (user, blockedReason = '') => {
    const nextBlocked = !user.isBlocked
    const actionLabel = nextBlocked ? 'block' : 'unblock'

    setActionLoadingId(user.id)

    try {
      const response = await updateUserBlockStatus({
        token,
        userId: user.id,
        isBlocked: nextBlocked,
        blockedReason,
      })

      const updatedUser = response.data

      setUsers((current) =>
        current.map((item) => (item.id === user.id ? { ...item, isBlocked: updatedUser.isBlocked } : item)),
      )

      if (selectedUserId === user.id) {
        setSelectedUser((current) => (current ? { ...current, ...updatedUser } : updatedUser))
      }
      toast.success(`User ${nextBlocked ? 'blocked' : 'unblocked'} successfully.`)
    } catch (error) {
      toast.error(error.message || `Unable to ${actionLabel} this user right now.`, 'User action failed')
    } finally {
      setActionLoadingId('')
    }
  }

  const handleDelete = async (user) => {
    setActionLoadingId(user.id)

    try {
      await deleteUser({
        token,
        userId: user.id,
      })

      const isLastItemOnPage = users.length === 1 && meta.page > 1

      if (isLastItemOnPage) {
        setMeta((current) => ({ ...current, page: current.page - 1 }))
      } else {
        if (selectedUserId === user.id) {
          setSelectedUserId('')
          setSelectedUser(null)
          setIsViewModalOpen(false)
        }
        refreshUsers()
      }
      toast.success('User deleted successfully.')
    } catch (error) {
      toast.error(error.message || 'Unable to delete this user right now.', 'Delete failed')
    } finally {
      setActionLoadingId('')
    }
  }

  const openBlockModal = (user) => {
    if (user.isBlocked) {
      handleBlockToggle(user)
      return
    }

    setBlockModalUser(user)
    setBlockReason('')
  }

  const closeBlockModal = () => {
    if (blockModalUser && actionLoadingId === blockModalUser.id) {
      return
    }

    setBlockModalUser(null)
    setBlockReason('')
  }

  const submitBlockModal = async () => {
    if (!blockModalUser) {
      return
    }

    await handleBlockToggle(blockModalUser, blockReason.trim())
    setBlockModalUser(null)
    setBlockReason('')
  }

  const openDeleteModal = (user) => {
    setDeleteModalUser(user)
  }

  const closeDeleteModal = () => {
    if (deleteModalUser && actionLoadingId === deleteModalUser.id) {
      return
    }

    setDeleteModalUser(null)
  }

  const submitDeleteModal = async () => {
    if (!deleteModalUser) {
      return
    }

    const currentUser = deleteModalUser
    await handleDelete(currentUser)
    setDeleteModalUser(null)
  }

  const openViewModal = (userId) => {
    setSelectedUserId(userId)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false)
  }

  return (
    <div className="management-page">
      <section className="management-hero-grid">
        <div className="stacked-stat-list">
          {[
            { title: 'Total Users', value: totalUsers, change: `Page ${meta.page} of ${meta.totalPages || 1}` },
            { title: 'Verified Emails', value: verifiedUsers, change: 'Current page snapshot' },
            { title: 'Blocked Users', value: blockedUsers, change: 'Current page snapshot' },
          ].map((item) => (
            <article className="panel stat-card compact tall" key={item.title}>
              <div className="panel-header">
                <div>
                  <h3>{item.title}</h3>
                </div>
                <button type="button" className="icon-ghost">
                  <FiMoreVertical />
                </button>
              </div>
              <div className="stat-value-wrap mt-2">
                <strong>{item.value}</strong>
                <em>{item.change}</em>
              </div>
              <p className="card-footnote">Last 7 days</p>
            </article>
          ))}
        </div>

        <article className="panel overview-panel">
          <div className="panel-header">
            <h3>Users Overview</h3>
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
              <button type="button" className="outline-action users-refresh-button" onClick={refreshUsers}>
                <FiRefreshCw />
                Refresh
              </button>
              <label className="users-filter-shell">
                <input
                  type="search"
                  placeholder="Search by name or email"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
              </label>
              <label className="users-filter-shell users-sort-shell">
                <FiFilter />
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                  <option value="asc">Name A-Z</option>
                  <option value="desc">Name Z-A</option>
                </select>
              </label>
              <button type="button" className="icon-ghost">
                <FiMoreVertical />
              </button>
            </div>
          </div>

          <div className="overview-metric-grid">
            {[
              { label: 'Showing', value: users.length },
              { label: 'Unverified', value: users.filter((item) => !item.isEmailVerified).length },
              { label: 'Active', value: users.filter((item) => !item.isBlocked).length },
              { label: 'Search Term', value: search || 'All users' },
            ].map((item, index) => (
              <div key={item.label} className={`overview-metric ${index === 0 ? 'active success' : ''}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="users-overview-card">
            <div className="users-overview-visual">
              <div className="users-donut-shell">
                <svg viewBox="0 0 140 140" className="users-donut-chart" aria-hidden="true">
                  <circle className="users-donut-track" cx="70" cy="70" r={donutRadius} />
                  {donutSegments.map((segment, index) => (
                    <circle
                      key={overviewLegend[index].label}
                      className={`users-donut-segment ${overviewLegend[index].tone}`}
                      cx="70"
                      cy="70"
                      r={donutRadius}
                      strokeDasharray={segment.dashArray}
                      strokeDashoffset={segment.dashOffset}
                    />
                  ))}
                </svg>
                <div className="users-donut-center">
                  <strong>{currentPageUsers}</strong>
                  <span>on page</span>
                </div>
              </div>

              <div className="users-overview-insights">
                <div>
                  <p className="muted-copy mb-2">Live breakdown</p>
                  <h4>{pageError ? 'Unable to load users' : 'Current user mix'}</h4>
                  <p className="users-overview-copy">
                    {pageError
                      ? pageError
                      : `Page ${meta.page} is showing ${currentPageUsers} users, sorted by ${SORT_BY} in ${sortOrder.toUpperCase()} order.`}
                  </p>
                </div>

                <div className="users-overview-legend">
                  {overviewLegend.map((item) => (
                    <div key={item.label} className="users-overview-legend-item">
                      <span className={`users-legend-dot ${item.tone}`} />
                      <div>
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="users-mini-bars">
              {miniBars.map((item) => (
                <div key={item.label} className="users-mini-bar-card">
                  <div className="users-mini-bar-head">
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="users-mini-bar-track">
                    <div
                      className={`users-mini-bar-fill ${item.tone}`}
                      style={{ width: `${Math.min(item.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </article>
      </section>

      <section>
        <article className="panel user-table-panel">
          <div className="page-section-head mb-3">
            <h3 className="section-title mb-0">User Details</h3>
            <span className="muted-copy">
              {listLoading ? 'Loading users...' : `${meta.total} total users`}
            </span>
          </div>

          {pageError ? (
            <div className="users-empty-state users-empty-state-error">
              <FiAlertCircle />
              <span>{pageError}</span>
            </div>
          ) : null}

          <div className="table-responsive">
            <table className="table order-table align-middle mb-0">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Verified</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listLoading ? (
                  <tr>
                    <td colSpan="7">
                      <div className="users-empty-state">
                        <FiRefreshCw className="spin" />
                        <span>Loading users from the API...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      <div className="users-empty-state">
                        <FiUser />
                        <span>No users found for this filter.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id.slice(0, 8)}</td>
                      <td>{item.name || '-'}</td>
                      <td>{item.email || '-'}</td>
                      <td>{`${item.country_code || ''} ${item.mobile || '-'}`.trim()}</td>
                      <td>
                        <span className={`shipment-status ${item.isEmailVerified ? 'active' : 'inactive'}`}>
                          {item.isEmailVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <span className={`shipment-status ${item.isBlocked ? 'inactive' : 'active'}`}>
                          {item.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td>
                        <div className="action-icons">
                          <button
                            type="button"
                            className="table-action-icon"
                            onClick={() => openViewModal(item.id)}
                            aria-label={`View ${item.name || item.email}`}
                          >
                            <FiEye />
                          </button>
                          <button
                            type="button"
                            className="table-action-icon"
                            onClick={() => openBlockModal(item)}
                            disabled={actionLoadingId === item.id}
                            aria-label={item.isBlocked ? `Unblock ${item.name || item.email}` : `Block ${item.name || item.email}`}
                          >
                            {item.isBlocked ? <FiShieldOff /> : <FiShield />}
                          </button>
                          <button
                            type="button"
                            className="table-action-icon"
                            onClick={() => openDeleteModal(item)}
                            disabled={actionLoadingId === item.id}
                            aria-label={`Delete ${item.name || item.email}`}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-wrap mt-4">
            <button
              type="button"
              className="pager-button"
              onClick={() => handlePageChange(meta.page - 1)}
              disabled={meta.page <= 1 || listLoading}
            >
              Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: meta.totalPages || 1 }, (_, index) => index + 1).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={item === meta.page ? 'active success' : ''}
                  onClick={() => handlePageChange(item)}
                  disabled={listLoading}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="pager-button"
              onClick={() => handlePageChange(meta.page + 1)}
              disabled={meta.page >= meta.totalPages || listLoading}
            >
              Next
            </button>
          </div>
        </article>
      </section>

      {isViewModalOpen ? (
        <div className="users-modal-backdrop" onClick={closeViewModal}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-user-title"
          >
            {detailLoading ? (
              <div className="users-empty-state">
                <FiRefreshCw className="spin" />
                <span>Loading selected user...</span>
              </div>
            ) : detailError ? (
              <div className="users-empty-state users-empty-state-error">
                <FiAlertCircle />
                <span>{detailError}</span>
              </div>
            ) : selectedUser ? (
              <>
                <div className="users-modal-head">
                  <div className="profile-summary">
                    <div className="profile-avatar">{getInitials(selectedUser.name)}</div>
                    <div>
                      <h3 id="view-user-title">{selectedUser.name || 'Unnamed user'}</h3>
                      <p className="users-modal-copy users-modal-copy-tight">{selectedUser.email || '-'}</p>
                    </div>
                  </div>
                  <button type="button" className="icon-ghost" onClick={closeViewModal}>
                    <FiMoreVertical />
                  </button>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Customer Info</p>
                  <div className="info-pill">
                    <FiMail />
                    <span>{selectedUser.email || '-'}</span>
                  </div>
                  <div className="info-pill">
                    <FiPhone />
                    <span>{`${selectedUser.country_code || ''} ${selectedUser.mobile || '-'}`.trim()}</span>
                  </div>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Account Status</p>
                  <p className="activity-line">
                    Email verification: {selectedUser.isEmailVerified ? 'Verified' : 'Pending'}
                  </p>
                  <p className="activity-line">
                    Access: {selectedUser.isBlocked ? 'Blocked' : 'Active'}
                  </p>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Activity</p>
                  <p className="activity-line">Created: {formatDate(selectedUser.createdAt)}</p>
                  <p className="activity-line">Updated: {formatDate(selectedUser.updatedAt)}</p>
                </div>

                <div className="users-modal-actions">
                  <button type="button" className="outline-action" onClick={closeViewModal}>
                    Close
                  </button>
                  <button
                    type="button"
                    className="login-submit users-modal-submit"
                    onClick={() =>
                      openBlockModal({
                        id: selectedUser.id,
                        name: selectedUser.name,
                        email: selectedUser.email,
                        isBlocked: selectedUser.isBlocked,
                      })
                    }
                    disabled={actionLoadingId === selectedUser.id}
                  >
                    {selectedUser.isBlocked ? 'Unblock User' : 'Block User'}
                  </button>
                </div>
              </>
            ) : (
              <div className="users-empty-state">
                <FiUser />
                <span>Select a user to view details.</span>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {blockModalUser ? (
        <div className="users-modal-backdrop" onClick={closeBlockModal}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="block-user-title"
          >
            <div className="users-modal-head">
              <h3 id="block-user-title">{blockModalUser.isBlocked ? 'Unblock User' : 'Block User'}</h3>
              <button type="button" className="icon-ghost" onClick={closeBlockModal}>
                <FiMoreVertical />
              </button>
            </div>
            <p className="users-modal-copy">
              {blockModalUser.isBlocked
                ? `This will restore access for ${blockModalUser.name || blockModalUser.email}.`
                : `Add a reason before blocking ${blockModalUser.name || blockModalUser.email}.`}
            </p>

            {!blockModalUser.isBlocked ? (
              <label className="users-modal-field">
                <span>Reason</span>
                <textarea
                  rows="4"
                  placeholder="Enter block reason"
                  value={blockReason}
                  onChange={(event) => setBlockReason(event.target.value)}
                />
              </label>
            ) : null}

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={closeBlockModal}>
                Cancel
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={submitBlockModal}
                disabled={actionLoadingId === blockModalUser.id}
              >
                {actionLoadingId === blockModalUser.id
                  ? 'Saving...'
                  : blockModalUser.isBlocked
                    ? 'Unblock User'
                    : 'Block User'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteModalUser ? (
        <div className="users-modal-backdrop" onClick={closeDeleteModal}>
          <div
            className="users-modal-card users-modal-card-danger"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-user-title"
          >
            <div className="users-modal-head">
              <h3 id="delete-user-title">Delete User</h3>
              <button type="button" className="icon-ghost" onClick={closeDeleteModal}>
                <FiMoreVertical />
              </button>
            </div>
            <p className="users-modal-copy">
              Delete {deleteModalUser.name || deleteModalUser.email}? This action cannot be undone.
            </p>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button
                type="button"
                className="users-danger-button"
                onClick={submitDeleteModal}
                disabled={actionLoadingId === deleteModalUser.id}
              >
                {actionLoadingId === deleteModalUser.id ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default UserManagementPage
