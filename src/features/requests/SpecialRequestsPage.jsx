import { useState } from 'react'
import {
  FiCheckCircle,
  FiXCircle,
  FiFilter,
  FiSearch,
  FiMoreVertical,
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiEye,
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'
import { mealRequests } from '../../data/messMockData'

function SpecialRequestsPage() {
  const toast = useToast()
  const [requests, setRequests] = useState(mealRequests)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const filteredRequests = requests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter
    const matchesSearch = request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.request.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleApprove = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ))
    toast.success('Request approved successfully')
  }

  const handleReject = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ))
    toast.success('Request rejected')
  }

  const openViewModal = (request) => {
    setSelectedRequest(request)
    setShowViewModal(true)
  }

  const closeViewModal = () => {
    setShowViewModal(false)
    setSelectedRequest(null)
  }

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    total: requests.length
  }

  return (
    <div className="management-page">
      <div className="page-section-head">
        <div>
          <h2>Special Requests</h2>
          <p className="muted-copy">Approve and monitor student/staff special meal requests</p>
        </div>
      </div>

      {/* Stats Overview */}
      <section className="stats-grid order-stats-grid">
        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Pending Requests</h3>
            </div>
          </div>
          <div className="stat-value-wrap mt-2">
            <strong className="text-warning">{stats.pending}</strong>
          </div>
          <p className="card-footnote">Awaiting approval</p>
        </article>

        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Approved</h3>
            </div>
          </div>
          <div className="stat-value-wrap mt-2">
            <strong className="text-success">{stats.approved}</strong>
          </div>
          <p className="card-footnote">This month</p>
        </article>

        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Total Requests</h3>
            </div>
          </div>
          <div className="stat-value-wrap mt-2">
            <strong>{stats.total}</strong>
          </div>
          <p className="card-footnote">All time</p>
        </article>
      </section>

      {/* Requests Table */}
      <section className="panel orders-table-panel">
        <div className="orders-toolbar">
          <div className="tab-pills">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
              All ({stats.total})
            </button>
            <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
              Pending ({stats.pending})
            </button>
            <button className={filter === 'approved' ? 'active' : ''} onClick={() => setFilter('approved')}>
              Approved ({stats.approved})
            </button>
          </div>

          <div className="orders-toolbar-right">
            <div className="search-shell slim">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search requests..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="button" className="icon-square-button">
              <FiFilter />
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table order-table align-middle mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Request Type</th>
                <th>Description</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div className="order-product-cell">
                      <div className="product-thumb square">
                        <FiUser />
                      </div>
                      <div>
                        <strong>{request.user}</strong>
                        <small className="d-block muted-copy">{request.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`payment-status ${request.type === 'Special Diet' ? 'paid' : 'warning'}`}>
                      {request.type}
                    </span>
                  </td>
                  <td>{request.request}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <FiCalendar size={12} />
                      <span>{request.date}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`shipment-status ${request.priority === 'high' ? 'danger' : 'warning'}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`shipment-status ${request.status === 'approved' ? 'active' : request.status === 'pending' ? 'warning' : 'inactive'}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-icons">
                      <button 
                        className="table-action-icon"
                        onClick={() => openViewModal(request)}
                      >
                        <FiEye />
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button 
                            className="table-action-icon text-success"
                            onClick={() => handleApprove(request.id)}
                          >
                            <FiCheckCircle />
                          </button>
                          <button 
                            className="table-action-icon text-danger"
                            onClick={() => handleReject(request.id)}
                          >
                            <FiXCircle />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="users-empty-state">
            <FiMessageSquare />
            <span>No requests found</span>
          </div>
        )}
      </section>

      {/* View Request Modal - Using your existing pattern */}
      {showViewModal && selectedRequest && (
        <div className="users-modal-backdrop" onClick={closeViewModal}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-modal-title"
          >
            <div className="users-modal-head">
              <div className="profile-summary">
                <div className="profile-avatar">
                  {selectedRequest.user.charAt(0)}
                </div>
                <div>
                  <h3 id="request-modal-title">{selectedRequest.user}</h3>
                  <p className="users-modal-copy users-modal-copy-tight">{selectedRequest.id}</p>
                </div>
              </div>
              <button type="button" className="icon-ghost" onClick={closeViewModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="info-block">
              <p className="muted-copy mb-2">Request Details</p>
              <div className="info-pill">
                <strong>Type:</strong> {selectedRequest.type}
              </div>
              <div className="info-pill">
                <strong>Description:</strong> {selectedRequest.request}
              </div>
              <div className="info-pill">
                <strong>Date:</strong> {selectedRequest.date}
              </div>
              <div className="info-pill">
                <strong>Priority:</strong> {selectedRequest.priority}
              </div>
            </div>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={closeViewModal}>
                Close
              </button>
              {selectedRequest.status === 'pending' && (
                <>
                  <button
                    type="button"
                    className="login-submit users-modal-submit"
                    onClick={() => {
                      handleApprove(selectedRequest.id)
                      closeViewModal()
                    }}
                  >
                    Approve Request
                  </button>
                  <button
                    type="button"
                    className="users-danger-button"
                    onClick={() => {
                      handleReject(selectedRequest.id)
                      closeViewModal()
                    }}
                  >
                    Reject Request
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpecialRequestsPage