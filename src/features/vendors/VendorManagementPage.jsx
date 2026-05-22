import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiMoreVertical,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiShieldOff,
  FiTrash2,
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'
import { useAuth } from '../../hooks/useAuth'
import {
  createVendor,
  deleteVendor,
  getVendorById,
  getVendorStats,
  getVendors,
  updateVendorBlockStatus,
  updateVendorVerification,
} from '../../services/vendors'

const PAGE_LIMIT = 10

const initialVendorForm = {
  name: '',
  email: '',
  country_code: '+91',
  mobile: '',
  password: '',
  companyName: '',
  companyAddress: '',
  gstNumber: '',
  storeDescription: '',
}

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

function getInitials(value) {
  if (!value) {
    return 'VN'
  }

  return value
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

function VendorManagementPage() {
  const { authState, logout } = useAuth()
  const toast = useToast()
  const token = authState?.token
  const [vendors, setVendors] = useState([])
  const [vendorStats, setVendorStats] = useState({
    total: 0,
    newVendors: 0,
    verified: 0,
    unverified: 0,
  })
  const [selectedVendorId, setSelectedVendorId] = useState('')
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [meta, setMeta] = useState({ page: 1, limit: PAGE_LIMIT, total: 0, totalPages: 1 })
  const [refreshKey, setRefreshKey] = useState(0)
  const [listLoading, setListLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState('')
  const [pageError, setPageError] = useState('')
  const [detailError, setDetailError] = useState('')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [verifyModalVendor, setVerifyModalVendor] = useState(null)
  const [blockModalVendor, setBlockModalVendor] = useState(null)
  const [blockReason, setBlockReason] = useState('')
  const [deleteModalVendor, setDeleteModalVendor] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [createForm, setCreateForm] = useState(initialVendorForm)
  useEffect(() => {
    if (!token) {
      return
    }

    let isActive = true

    async function loadVendorStats() {
      try {
        const response = await getVendorStats({ token })

        if (!isActive) {
          return
        }

        setVendorStats(response.data || {
          total: 0,
          newVendors: 0,
          verified: 0,
          unverified: 0,
        })
      } catch (error) {
        if (!isActive) {
          return
        }

        if (error.message?.toLowerCase().includes('unauthorized')) {
          logout()
        }

        toast.error(error.message || 'Unable to load vendor stats right now.', 'Vendor stats failed')
      }
    }

    async function loadVendors() {
      setListLoading(true)
      setPageError('')

      try {
        const response = await getVendors({
          token,
          page: meta.page,
          limit: meta.limit,
        })

        if (!isActive) {
          return
        }

        setVendors(response.data || [])
        setMeta((current) => ({
          ...current,
          ...(response.meta || current),
        }))
      } catch (error) {
        if (!isActive) {
          return
        }

        if (error.message?.toLowerCase().includes('unauthorized')) {
          logout()
        }

        setVendors([])
        setPageError(error.message || 'Unable to load vendors right now.')
        toast.error(error.message || 'Unable to load vendors right now.', 'Vendor fetch failed')
      } finally {
        if (isActive) {
          setListLoading(false)
        }
      }
    }

    loadVendorStats()
    loadVendors()

    return () => {
      isActive = false
    }
  }, [token, meta.page, meta.limit, refreshKey, logout])

  useEffect(() => {
    if (!token || !selectedVendorId) {
      setSelectedVendor(null)
      setDetailError('')
      return
    }

    let isActive = true

    async function loadVendorDetails() {
      setDetailLoading(true)
      setDetailError('')

      try {
        const response = await getVendorById({ token, vendorId: selectedVendorId })

        if (!isActive) {
          return
        }

        setSelectedVendor(response.data || null)
      } catch (error) {
        if (!isActive) {
          return
        }

        setSelectedVendor(null)
        setDetailError(error.message || 'Unable to load vendor details.')
      } finally {
        if (isActive) {
          setDetailLoading(false)
        }
      }
    }

    loadVendorDetails()

    return () => {
      isActive = false
    }
  }, [token, selectedVendorId])

  const verifiedVendors = vendorStats.verified
  const unverifiedVendors = vendorStats.unverified
  const blockedVendors = vendors.filter((item) => item.user?.isBlocked).length
  const activeVendors = vendors.filter((item) => !item.user?.isBlocked).length
  const totalProducts = vendors.reduce((sum, item) => sum + (item._count?.products || 0), 0)
  const donutRadius = 54
  const donutCircumference = 2 * Math.PI * donutRadius
  const donutSegments = buildDonutSegments(
    [activeVendors || 0, verifiedVendors || 0, unverifiedVendors || 0],
    donutCircumference,
  )
  const overviewLegend = [
    { label: 'Active vendors', value: activeVendors, tone: 'green' },
    { label: 'Verified vendors', value: verifiedVendors, tone: 'blue' },
    { label: 'Unverified vendors', value: unverifiedVendors, tone: 'orange' },
  ]
  const miniBars = [
    {
      label: 'Page fill',
      value: meta.limit ? Math.round((vendors.length / meta.limit) * 100) : 0,
      tone: 'blue',
    },
    {
      label: 'Verified',
      value: vendorStats.total ? Math.round((verifiedVendors / vendorStats.total) * 100) : 0,
      tone: 'green',
    },
    {
      label: 'Unverified',
      value: vendorStats.total ? Math.round((unverifiedVendors / vendorStats.total) * 100) : 0,
      tone: 'orange',
    },
    {
      label: 'Blocked',
      value: vendors.length ? Math.round((blockedVendors / vendors.length) * 100) : 0,
      tone: 'red',
    },
  ]

  const refreshVendors = () => {
    setRefreshKey((current) => current + 1)
  }

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > meta.totalPages || nextPage === meta.page) {
      return
    }

    setMeta((current) => ({ ...current, page: nextPage }))
  }

  const openViewModal = (vendorId) => {
    setSelectedVendorId(vendorId)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false)
  }

  const handleVerifyToggle = async (vendor, nextIsVerified) => {
    setActionLoadingId(vendor.id)

    try {
      const response = await updateVendorVerification({
        token,
        vendorId: vendor.id,
        isVerified: nextIsVerified,
      })

      const updatedVendor = response.data

      setVendors((current) =>
        current.map((item) =>
          item.id === vendor.id ? { ...item, isVerified: updatedVendor.isVerified } : item,
        ),
      )

      if (selectedVendorId === vendor.id) {
        setSelectedVendor((current) =>
          current ? { ...current, isVerified: updatedVendor.isVerified } : current,
        )
      }
      toast.success(`Vendor ${nextIsVerified ? 'verified' : 'marked unverified'} successfully.`)
    } catch (error) {
      toast.error(error.message || 'Unable to update vendor verification right now.', 'Vendor action failed')
    } finally {
      setActionLoadingId('')
    }
  }

  const handleVendorBlockToggle = async (vendor, nextIsBlocked, reason = '') => {
    setActionLoadingId(vendor.id)

    try {
      const response = await updateVendorBlockStatus({
        token,
        vendorId: vendor.id,
        isBlocked: nextIsBlocked,
        blockReason: reason,
      })

      const updatedUser = response.data

      setVendors((current) =>
        current.map((item) =>
          item.id === vendor.id
            ? {
                ...item,
                user: {
                  ...item.user,
                  isBlocked: updatedUser.isBlocked,
                  blockReason: updatedUser.blockReason,
                },
              }
            : item,
        ),
      )

      if (selectedVendorId === vendor.id) {
        setSelectedVendor((current) =>
          current
            ? {
                ...current,
                user: {
                  ...current.user,
                  isBlocked: updatedUser.isBlocked,
                  blockReason: updatedUser.blockReason,
                },
              }
            : current,
        )
      }
      toast.success(`Vendor ${nextIsBlocked ? 'blocked' : 'unblocked'} successfully.`)
    } catch (error) {
      toast.error(error.message || 'Unable to update vendor access right now.', 'Vendor action failed')
    } finally {
      setActionLoadingId('')
    }
  }

  const handleDeleteVendor = async (vendor) => {
    setActionLoadingId(vendor.id)

    try {
      await deleteVendor({
        token,
        vendorId: vendor.id,
      })

      const isLastItemOnPage = vendors.length === 1 && meta.page > 1

      if (isLastItemOnPage) {
        setMeta((current) => ({ ...current, page: current.page - 1 }))
      } else {
        if (selectedVendorId === vendor.id) {
          setSelectedVendorId('')
          setSelectedVendor(null)
          setIsViewModalOpen(false)
        }
        refreshVendors()
      }
      toast.success('Vendor deleted successfully.')
    } catch (error) {
      toast.error(error.message || 'Unable to delete this vendor right now.', 'Delete failed')
    } finally {
      setActionLoadingId('')
    }
  }

  const submitCreateVendor = async () => {
    setActionLoadingId('create-vendor')

    try {
      await createVendor({
        token,
        data: createForm,
      })

      setIsCreateModalOpen(false)
      setCreateForm(initialVendorForm)
      refreshVendors()
      toast.success('Vendor created successfully.')
    } catch (error) {
      toast.error(error.message || 'Unable to create vendor right now.', 'Create failed')
    } finally {
      setActionLoadingId('')
    }
  }

  return (
    <div className="management-page">
      <section className="management-hero-grid">
        <div className="stacked-stat-list">
          {[
            { title: 'Total Vendors', value: vendorStats.total, change: `Page ${meta.page} of ${meta.totalPages || 1}` },
            { title: 'New Vendors', value: vendorStats.newVendors, change: 'Backend aggregate' },
            { title: 'Blocked Vendors', value: blockedVendors, change: 'Current page snapshot' },
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
            <h3>Vendor Overview</h3>
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
              <button type="button" className="outline-action users-refresh-button" onClick={refreshVendors}>
                <FiRefreshCw />
                Refresh
              </button>
              <button
                type="button"
                className="login-submit vendor-add-button"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <FiPlus />
                Add Vendor
              </button>
            </div>
          </div>

          <div className="overview-metric-grid">
            {[
              { label: 'Showing', value: vendors.length },
              { label: 'Verified', value: verifiedVendors },
              { label: 'Unverified', value: unverifiedVendors },
              { label: 'Products', value: totalProducts },
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
                  <strong>{vendors.length}</strong>
                  <span>on page</span>
                </div>
              </div>

              <div className="users-overview-insights">
                <div>
                  <p className="muted-copy mb-2">Live vendor snapshot</p>
                  <h4>{pageError ? 'Unable to load vendors' : 'Current vendor mix'}</h4>
                  <p className="users-overview-copy">
                    {pageError
                      ? pageError
                      : `Page ${meta.page} is showing ${vendors.length} vendors. Verified, blocked, and product counts are coming from the backend.`}
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

      <section className="panel vendor-table-panel">
        <div className="page-section-head mb-3">
          <h3 className="section-title mb-0">Vendor Details</h3>
          <span className="muted-copy">
            {listLoading ? 'Loading vendors...' : `${meta.total} total vendors`}
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
                <th>Vendor</th>
                <th>GST</th>
                <th>Phone</th>
                <th>Products</th>
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
                      <span>Loading vendors from the API...</span>
                    </div>
                  </td>
                </tr>
              ) : vendors.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="users-empty-state">
                      <FiAlertCircle />
                      <span>No vendors found.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                vendors.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="vendor-id-cell">
                        <div className="vendor-badge sky">{getInitials(item.companyName)}</div>
                        <div>
                          <strong>{item.companyName}</strong>
                          <span className="vendor-email-ellipsis" title={item.user?.email || '-'}>
                            {item.user?.email || '-'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{item.gstNumber || '-'}</td>
                    <td>{`${item.user?.country_code || ''} ${item.user?.mobile || '-'}`.trim()}</td>
                    <td>{item._count?.products || 0}</td>
                    <td>
                      <span className={`shipment-status ${item.isVerified ? 'active' : 'pending'}`}>
                        {item.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <span className={`shipment-status ${item.user?.isBlocked ? 'inactive' : 'active'}`}>
                        {item.user?.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td>
                      <div className="action-icons">
                        <button
                          type="button"
                          className="table-action-icon"
                          onClick={() => openViewModal(item.id)}
                          aria-label={`View ${item.companyName}`}
                        >
                          <FiEye />
                        </button>
                        <button
                          type="button"
                          className="table-action-icon"
                          onClick={() => setVerifyModalVendor(item)}
                          disabled={actionLoadingId === item.id}
                          aria-label={item.isVerified ? `Unverify ${item.companyName}` : `Verify ${item.companyName}`}
                        >
                          <FiCheckCircle />
                        </button>
                        <button
                          type="button"
                          className="table-action-icon"
                          onClick={() => {
                            setBlockModalVendor(item)
                            setBlockReason(item.user?.blockReason || '')
                          }}
                          disabled={actionLoadingId === item.id}
                          aria-label={item.user?.isBlocked ? `Unblock ${item.companyName}` : `Block ${item.companyName}`}
                        >
                          {item.user?.isBlocked ? <FiShieldOff /> : <FiShield />}
                        </button>
                        <button
                          type="button"
                          className="table-action-icon"
                          onClick={() => setDeleteModalVendor(item)}
                          disabled={actionLoadingId === item.id}
                          aria-label={`Delete ${item.companyName}`}
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
      </section>

      {isViewModalOpen ? (
        <div className="users-modal-backdrop" onClick={closeViewModal}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-vendor-title"
          >
            {detailLoading ? (
              <div className="users-empty-state">
                <FiRefreshCw className="spin" />
                <span>Loading selected vendor...</span>
              </div>
            ) : detailError ? (
              <div className="users-empty-state users-empty-state-error">
                <FiAlertCircle />
                <span>{detailError}</span>
              </div>
            ) : selectedVendor ? (
              <>
                <div className="users-modal-head">
                  <div className="profile-summary">
                    <div className="profile-avatar">{getInitials(selectedVendor.companyName)}</div>
                    <div>
                      <h3 id="view-vendor-title">{selectedVendor.companyName}</h3>
                      <p className="users-modal-copy users-modal-copy-tight">
                        {selectedVendor.user?.email || '-'}
                      </p>
                    </div>
                  </div>
                  <button type="button" className="icon-ghost" onClick={closeViewModal}>
                    <FiMoreVertical />
                  </button>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Vendor Info</p>
                  <div className="info-pill">
                    <span>{selectedVendor.companyAddress || '-'}</span>
                  </div>
                  <div className="info-pill">
                    <span>{selectedVendor.gstNumber || '-'}</span>
                  </div>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Owner Info</p>
                  <p className="activity-line">Name: {selectedVendor.user?.name || '-'}</p>
                  <p className="activity-line">Phone: {`${selectedVendor.user?.country_code || ''} ${selectedVendor.user?.mobile || '-'}`.trim()}</p>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Account Status</p>
                  <p className="activity-line">Verification: {selectedVendor.isVerified ? 'Verified' : 'Pending'}</p>
                  <p className="activity-line">Access: {selectedVendor.user?.isBlocked ? 'Blocked' : 'Active'}</p>
                  <p className="activity-line">Products: {selectedVendor._count?.products || 0}</p>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Description</p>
                  <p className="activity-line">{selectedVendor.storeDescription || 'No description provided.'}</p>
                </div>

                <div className="info-block">
                  <p className="muted-copy mb-2">Created</p>
                  <p className="activity-line">{formatDate(selectedVendor.createdAt)}</p>
                </div>

                <div className="users-modal-actions">
                  <button type="button" className="outline-action" onClick={closeViewModal}>
                    Close
                  </button>
                  <button
                    type="button"
                    className="login-submit users-modal-submit"
                    onClick={() => setVerifyModalVendor(selectedVendor)}
                    disabled={actionLoadingId === selectedVendor.id}
                  >
                    {selectedVendor.isVerified ? 'Unverify Vendor' : 'Verify Vendor'}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      {isCreateModalOpen ? (
        <div className="users-modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
          <div
            className="users-modal-card vendor-create-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-vendor-title"
          >
            <div className="users-modal-head">
              <h3 id="create-vendor-title">Add Vendor</h3>
              <button type="button" className="icon-ghost" onClick={() => setIsCreateModalOpen(false)}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="vendor-form-grid">
              {[
                ['name', 'Owner Name'],
                ['email', 'Email'],
                ['country_code', 'Country Code'],
                ['mobile', 'Mobile'],
                ['password', 'Password'],
                ['companyName', 'Company Name'],
                ['gstNumber', 'GST Number'],
                ['companyAddress', 'Company Address'],
              ].map(([key, label]) => (
                <label key={key} className={`users-modal-field ${key === 'companyAddress' ? 'vendor-form-wide' : ''}`}>
                  <span>{label}</span>
                  <input
                    type={key === 'password' ? 'password' : 'text'}
                    value={createForm[key]}
                    onChange={(event) =>
                      setCreateForm((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                  />
                </label>
              ))}

              <label className="users-modal-field vendor-form-wide">
                <span>Store Description</span>
                <textarea
                  rows="4"
                  value={createForm.storeDescription}
                  onChange={(event) =>
                    setCreateForm((current) => ({
                      ...current,
                      storeDescription: event.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={submitCreateVendor}
                disabled={actionLoadingId === 'create-vendor'}
              >
                {actionLoadingId === 'create-vendor' ? 'Creating...' : 'Create Vendor'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {verifyModalVendor ? (
        <div className="users-modal-backdrop" onClick={() => setVerifyModalVendor(null)}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-vendor-title"
          >
            <div className="users-modal-head">
              <h3 id="verify-vendor-title">{verifyModalVendor.isVerified ? 'Unverify Vendor' : 'Verify Vendor'}</h3>
              <button type="button" className="icon-ghost" onClick={() => setVerifyModalVendor(null)}>
                <FiMoreVertical />
              </button>
            </div>
            <p className="users-modal-copy">
              {verifyModalVendor.isVerified
                ? `This will mark ${verifyModalVendor.companyName} as unverified.`
                : `This will verify ${verifyModalVendor.companyName} and mark the vendor as approved.`}
            </p>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={() => setVerifyModalVendor(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={async () => {
                  const currentVendor = verifyModalVendor
                  await handleVerifyToggle(currentVendor, !currentVendor.isVerified)
                  setVerifyModalVendor(null)
                }}
                disabled={actionLoadingId === verifyModalVendor.id}
              >
                {actionLoadingId === verifyModalVendor.id
                  ? 'Saving...'
                  : verifyModalVendor.isVerified
                    ? 'Unverify Vendor'
                    : 'Verify Vendor'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {blockModalVendor ? (
        <div className="users-modal-backdrop" onClick={() => setBlockModalVendor(null)}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="block-vendor-title"
          >
            <div className="users-modal-head">
              <h3 id="block-vendor-title">{blockModalVendor.user?.isBlocked ? 'Unblock Vendor' : 'Block Vendor'}</h3>
              <button type="button" className="icon-ghost" onClick={() => setBlockModalVendor(null)}>
                <FiMoreVertical />
              </button>
            </div>
            <p className="users-modal-copy">
              {blockModalVendor.user?.isBlocked
                ? `This will restore access for ${blockModalVendor.companyName}.`
                : `Add a reason before blocking ${blockModalVendor.companyName}.`}
            </p>

            {!blockModalVendor.user?.isBlocked ? (
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
              <button type="button" className="outline-action" onClick={() => setBlockModalVendor(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={async () => {
                  const currentVendor = blockModalVendor
                  await handleVendorBlockToggle(
                    currentVendor,
                    !currentVendor.user?.isBlocked,
                    blockReason.trim(),
                  )
                  setBlockModalVendor(null)
                  setBlockReason('')
                }}
                disabled={actionLoadingId === blockModalVendor.id}
              >
                {actionLoadingId === blockModalVendor.id
                  ? 'Saving...'
                  : blockModalVendor.user?.isBlocked
                    ? 'Unblock Vendor'
                    : 'Block Vendor'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteModalVendor ? (
        <div className="users-modal-backdrop" onClick={() => setDeleteModalVendor(null)}>
          <div
            className="users-modal-card users-modal-card-danger"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-vendor-title"
          >
            <div className="users-modal-head">
              <h3 id="delete-vendor-title">Delete Vendor</h3>
              <button type="button" className="icon-ghost" onClick={() => setDeleteModalVendor(null)}>
                <FiMoreVertical />
              </button>
            </div>
            <p className="users-modal-copy">
              Delete {deleteModalVendor.companyName}? This action cannot be undone.
            </p>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={() => setDeleteModalVendor(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="users-danger-button"
                onClick={async () => {
                  const currentVendor = deleteModalVendor
                  await handleDeleteVendor(currentVendor)
                  setDeleteModalVendor(null)
                }}
                disabled={actionLoadingId === deleteModalVendor.id}
              >
                {actionLoadingId === deleteModalVendor.id ? 'Deleting...' : 'Delete Vendor'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default VendorManagementPage
