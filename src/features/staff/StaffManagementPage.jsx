import { useState } from 'react'
import {
  FiPlusCircle,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiShieldOff,
  FiSearch,
  FiFilter,
  FiMail,
  FiMoreVertical,
  FiEye,
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'
import { staffList } from '../../data/messMockData'

function StaffManagementPage() {
  const toast = useToast()
  const [staff, setStaff] = useState(staffList)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentStaff, setCurrentStaff] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [staffName, setStaffName] = useState('')
  const [staffRole, setStaffRole] = useState('Kitchen Staff')
  const [staffEmail, setStaffEmail] = useState('')
  const [staffAccess, setStaffAccess] = useState('basic')
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openModal = (staffMember = null) => {
    if (staffMember) {
      setIsEditing(true)
      setCurrentStaff(staffMember)
      setStaffName(staffMember.name)
      setStaffRole(staffMember.role)
      setStaffEmail(staffMember.email)
      setStaffAccess(staffMember.access)
    } else {
      setIsEditing(false)
      setCurrentStaff(null)
      setStaffName('')
      setStaffRole('Kitchen Staff')
      setStaffEmail('')
      setStaffAccess('basic')
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setIsEditing(false)
    setCurrentStaff(null)
    setStaffName('')
    setStaffRole('Kitchen Staff')
    setStaffEmail('')
    setStaffAccess('basic')
  }

  const openViewModal = (staffMember) => {
    setSelectedStaff(staffMember)
    setShowViewModal(true)
  }

  const closeViewModal = () => {
    setShowViewModal(false)
    setSelectedStaff(null)
  }

  const handleSave = () => {
    if (!staffName || !staffEmail) {
      toast.error('Please fill all required fields', 'Validation Error')
      return
    }

    if (isEditing) {
      setStaff(staff.map(s => s.id === currentStaff.id ? {
        ...currentStaff,
        name: staffName,
        role: staffRole,
        email: staffEmail,
        access: staffAccess
      } : s))
      toast.success('Staff member updated successfully')
    } else {
      const newStaff = { 
        id: `STF00${staff.length + 1}`,
        name: staffName,
        role: staffRole,
        email: staffEmail,
        access: staffAccess,
        status: 'active'
      }
      setStaff([...staff, newStaff])
      toast.success('Staff member added successfully')
    }
    closeModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      setStaff(staff.filter(s => s.id !== id))
      toast.success('Staff member removed successfully')
    }
  }

  const toggleAccess = (id) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
    toast.success(`Access ${staff.find(s => s.id === id)?.status === 'active' ? 'revoked' : 'granted'} successfully`)
  }

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    roles: [...new Set(staff.map(s => s.role))]
  }

  return (
    <div className="management-page">
      <div className="page-section-head">
        <div>
          <h2>Staff Access Management</h2>
          <p className="muted-copy">Manage staff permissions and access levels</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="dark-action lg-pill"
            onClick={() => openModal()}
          >
            <FiPlusCircle />
            Add Staff Member
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <section className="stats-grid order-stats-grid">
        <article className="panel stat-card compact">
          <div className="stat-value-wrap mt-2">
            <strong>{stats.total}</strong>
            <span>Total Staff</span>
          </div>
        </article>

        <article className="panel stat-card compact">
          <div className="stat-value-wrap mt-2">
            <strong className="text-success">{stats.active}</strong>
            <span>Active Access</span>
          </div>
        </article>

        <article className="panel stat-card compact">
          <div className="stat-value-wrap mt-2">
            <strong>{stats.roles.length}</strong>
            <span>Roles</span>
          </div>
        </article>
      </section>

      {/* Staff Table */}
      <section className="panel orders-table-panel">
        <div className="orders-toolbar">
          <div className="search-shell slim">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search staff by name, role, or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="orders-toolbar-right">
            <button type="button" className="icon-square-button">
              <FiFilter />
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table order-table align-middle mb-0">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Access Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member) => (
                <tr key={member.id}>
                  <td>
                    <span className="text-muted">{member.id}</span>
                  </td>
                  <td>
                    <div className="order-product-cell">
                      <div className="product-thumb square">
                        {member.name.charAt(0)}
                      </div>
                      <strong>{member.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="payment-status paid">{member.role}</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <FiMail size={12} />
                      <span>{member.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`shipment-status ${member.access === 'full' ? 'active' : 'warning'}`}>
                      {member.access}
                    </span>
                  </td>
                  <td>
                    <span className={`shipment-status ${member.status === 'active' ? 'active' : 'inactive'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-icons">
                      <button 
                        className="table-action-icon"
                        onClick={() => openViewModal(member)}
                      >
                        <FiEye />
                      </button>
                      <button 
                        className="table-action-icon"
                        onClick={() => openModal(member)}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="table-action-icon"
                        onClick={() => toggleAccess(member.id)}
                      >
                        {member.status === 'active' ? <FiShieldOff /> : <FiShield />}
                      </button>
                      <button 
                        className="table-action-icon text-danger"
                        onClick={() => handleDelete(member.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="users-modal-backdrop" onClick={closeModal}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-modal-title"
          >
            <div className="users-modal-head">
              <h3 id="staff-modal-title">
                {isEditing ? 'Edit Staff Member' : 'Add Staff Member'}
              </h3>
              <button type="button" className="icon-ghost" onClick={closeModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="modal-body-content">
              <label className="users-modal-field">
                <span>Full Name *</span>
                <input
                  type="text"
                  placeholder="Enter staff name"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                />
              </label>

              <label className="users-modal-field">
                <span>Email *</span>
                <input
                  type="email"
                  placeholder="staff@iiitl.ac.in"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                />
              </label>

              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Role</span>
                  <select value={staffRole} onChange={(e) => setStaffRole(e.target.value)}>
                    <option>Mess Manager</option>
                    <option>Kitchen Supervisor</option>
                    <option>Accounts</option>
                    <option>Inventory Manager</option>
                    <option>Kitchen Staff</option>
                  </select>
                </label>

                <label className="users-modal-field">
                  <span>Access Level</span>
                  <select value={staffAccess} onChange={(e) => setStaffAccess(e.target.value)}>
                    <option value="full">Full Access</option>
                    <option value="kitchen">Kitchen Only</option>
                    <option value="finance">Finance Only</option>
                    <option value="inventory">Inventory Only</option>
                    <option value="basic">Basic Access</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={closeModal}>
                Cancel
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={handleSave}
              >
                {isEditing ? 'Update Staff' : 'Add Staff'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Staff Modal */}
      {showViewModal && selectedStaff && (
        <div className="users-modal-backdrop" onClick={closeViewModal}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-staff-title"
          >
            <div className="users-modal-head">
              <div className="profile-summary">
                <div className="profile-avatar">
                  {selectedStaff.name.charAt(0)}
                </div>
                <div>
                  <h3 id="view-staff-title">{selectedStaff.name}</h3>
                  <p className="users-modal-copy users-modal-copy-tight">{selectedStaff.email}</p>
                </div>
              </div>
              <button type="button" className="icon-ghost" onClick={closeViewModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="info-block">
              <p className="muted-copy mb-2">Staff Information</p>
              <div className="info-pill">
                <strong>Role:</strong> {selectedStaff.role}
              </div>
              <div className="info-pill">
                <strong>Access Level:</strong> {selectedStaff.access}
              </div>
              <div className="info-pill">
                <strong>Status:</strong> {selectedStaff.status}
              </div>
            </div>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={closeViewModal}>
                Close
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={() => {
                  closeViewModal()
                  openModal(selectedStaff)
                }}
              >
                Edit Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaffManagementPage