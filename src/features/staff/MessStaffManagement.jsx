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
  FiKey,
  FiCopy,
  FiDownload,
  FiUserPlus,
  FiLock,
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'

// Initial staff data
const initialStaffList = [
  {
    id: 'STF001',
    name: 'Rajesh Mishra',
    role: 'Mess Manager',
    email: 'rajesh.mishra@iiitl.ac.in',
    phone: '+91 98765 43210',
    department: 'Mess Management',
    access: 'full',
    status: 'active',
    username: 'rajesh.mishra',
    password: 'Rajesh@123',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-20 09:30 AM'
  },
  {
    id: 'STF002',
    name: 'Sunil Kumar',
    role: 'Kitchen Supervisor',
    email: 'sunil.kumar@iiitl.ac.in',
    phone: '+91 98765 43211',
    department: 'Kitchen',
    access: 'kitchen',
    status: 'active',
    username: 'sunil.kumar',
    password: 'Sunil@123',
    createdAt: '2024-01-02',
    lastLogin: '2024-01-19 08:15 AM'
  },
  {
    id: 'STF003',
    name: 'Meera Singh',
    role: 'Accounts',
    email: 'meera.singh@iiitl.ac.in',
    phone: '+91 98765 43212',
    department: 'Finance',
    access: 'finance',
    status: 'active',
    username: 'meera.singh',
    password: 'Meera@123',
    createdAt: '2024-01-03',
    lastLogin: '2024-01-20 10:00 AM'
  }
]

function MessStaffManagement() {
  const toast = useToast()
  const [staff, setStaff] = useState(initialStaffList)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentStaff, setCurrentStaff] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [showCredentialsModal, setShowCredentialsModal] = useState(false)
  const [generatedCredentials, setGeneratedCredentials] = useState(null)

  // Form state
  const [name, setName] = useState('')
  const [role, setRole] = useState('Kitchen Staff')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('Kitchen')
  const [access, setAccess] = useState('basic')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Generate random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'
    let generated = ''
    for (let i = 0; i < 10; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(generated)
  }

  // Generate username from name
  const generateUsername = (nameValue) => {
    if (!nameValue) return ''
    return nameValue.toLowerCase().replace(/\s/g, '.')
  }

  const handleNameChange = (value) => {
    setName(value)
    setUsername(generateUsername(value))
  }

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openModal = (staffMember = null) => {
    if (staffMember) {
      setIsEditing(true)
      setCurrentStaff(staffMember)
      setName(staffMember.name)
      setRole(staffMember.role)
      setEmail(staffMember.email)
      setPhone(staffMember.phone)
      setDepartment(staffMember.department)
      setAccess(staffMember.access)
      setUsername(staffMember.username)
      setPassword('')
    } else {
      setIsEditing(false)
      setCurrentStaff(null)
      setName('')
      setRole('Kitchen Staff')
      setEmail('')
      setPhone('')
      setDepartment('Kitchen')
      setAccess('basic')
      setUsername('')
      setPassword('')
      generatePassword()
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setIsEditing(false)
    setCurrentStaff(null)
  }

  const openViewModal = (staffMember) => {
    setSelectedStaff(staffMember)
    setShowViewModal(true)
  }

  const closeViewModal = () => {
    setShowViewModal(false)
    setSelectedStaff(null)
  }

  const showCredentials = (staffMember) => {
    setGeneratedCredentials({
      username: staffMember.username,
      password: staffMember.password,
      name: staffMember.name,
      email: staffMember.email,
      role: staffMember.role
    })
    setShowCredentialsModal(true)
  }

  const closeCredentialsModal = () => {
    setShowCredentialsModal(false)
    setGeneratedCredentials(null)
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    toast.success(`${type} copied to clipboard`)
  }

  const handleSave = () => {
    if (!name || !email || !username) {
      toast.error('Please fill all required fields', 'Validation Error')
      return
    }

    if (!isEditing && !password) {
      toast.error('Please generate a password', 'Validation Error')
      return
    }

    const staffData = {
      id: isEditing ? currentStaff.id : `STF00${staff.length + 1}`,
      name,
      role,
      email,
      phone,
      department,
      access,
      status: 'active',
      username,
      password: isEditing ? currentStaff.password : password,
      createdAt: isEditing ? currentStaff.createdAt : new Date().toISOString().split('T')[0],
      lastLogin: isEditing ? currentStaff.lastLogin : '-'
    }

    if (isEditing) {
      setStaff(staff.map(s => s.id === currentStaff.id ? staffData : s))
      toast.success('Staff member updated successfully')
    } else {
      setStaff([...staff, staffData])
      toast.success('Staff member created successfully')
      // Show credentials after creation
      setGeneratedCredentials({
        username: staffData.username,
        password: staffData.password,
        name: staffData.name,
        email: staffData.email,
        role: staffData.role
      })
      setShowCredentialsModal(true)
    }
    closeModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this staff member? This will revoke all access.')) {
      setStaff(staff.filter(s => s.id !== id))
      toast.success('Staff member removed successfully')
    }
  }

  const toggleStatus = (id) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
    toast.success(`Staff access ${staff.find(s => s.id === id)?.status === 'active' ? 'revoked' : 'granted'} successfully`)
  }

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    kitchen: staff.filter(s => s.department === 'Kitchen').length,
    finance: staff.filter(s => s.department === 'Finance').length
  }

  return (
    <div className="management-page">
      <div className="page-section-head">
        <div>
          <h2>Mess Staff Management</h2>
          <p className="muted-copy">Create and manage mess staff accounts with login credentials</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="dark-action lg-pill"
            onClick={() => openModal()}
          >
            <FiUserPlus />
            Create Staff Account
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
            <strong>{stats.kitchen}</strong>
            <span>Kitchen Staff</span>
          </div>
        </article>
        <article className="panel stat-card compact">
          <div className="stat-value-wrap mt-2">
            <strong>{stats.finance}</strong>
            <span>Finance Team</span>
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
              placeholder="Search by name, role, username or email..." 
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
                <th>Name & Contact</th>
                <th>Role</th>
                <th>Username</th>
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
                      <div>
                        <strong>{member.name}</strong>
                        <small className="d-block muted-copy">{member.email}</small>
                        <small className="d-block muted-copy">{member.phone}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="payment-status paid">{member.role}</span>
                  </td>
                  <td>
                    <code className="username-code">{member.username}</code>
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
                        title="View Details"
                      >
                        <FiEye />
                      </button>
                      <button 
                        className="table-action-icon"
                        onClick={() => openModal(member)}
                        title="Edit Staff"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="table-action-icon"
                        onClick={() => showCredentials(member)}
                        title="View Credentials"
                      >
                        <FiKey />
                      </button>
                      <button 
                        className="table-action-icon"
                        onClick={() => toggleStatus(member.id)}
                        title={member.status === 'active' ? 'Revoke Access' : 'Grant Access'}
                      >
                        {member.status === 'active' ? <FiShieldOff /> : <FiShield />}
                      </button>
                      <button 
                        className="table-action-icon text-danger"
                        onClick={() => handleDelete(member.id)}
                        title="Delete Staff"
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

      {/* Add/Edit Staff Modal */}
      {showModal && (
        <div className="users-modal-backdrop" onClick={closeModal}>
          <div
            className="users-modal-card modal-lg-staff"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="users-modal-head">
              <h3>{isEditing ? 'Edit Staff Member' : 'Create New Staff Account'}</h3>
              <button type="button" className="icon-ghost" onClick={closeModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="modal-body-content">
              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Full Name *</span>
                  <input
                    type="text"
                    placeholder="Enter staff name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </label>

                <label className="users-modal-field">
                  <span>Role *</span>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option>Mess Manager</option>
                    <option>Kitchen Supervisor</option>
                    <option>Accounts Officer</option>
                    <option>Inventory Manager</option>
                    <option>Kitchen Staff</option>
                    <option>Cleanliness Supervisor</option>
                    <option>Cashier</option>
                  </select>
                </label>
              </div>

              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Email *</span>
                  <input
                    type="email"
                    placeholder="staff@iiitl.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label className="users-modal-field">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Department</span>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option>Kitchen</option>
                    <option>Finance</option>
                    <option>Administration</option>
                    <option>Inventory</option>
                    <option>Service</option>
                  </select>
                </label>

                <label className="users-modal-field">
                  <span>Access Level</span>
                  <select value={access} onChange={(e) => setAccess(e.target.value)}>
                    <option value="full">Full Access - All features</option>
                    <option value="kitchen">Kitchen Only - Menu & meals</option>
                    <option value="finance">Finance Only - Reports & payments</option>
                    <option value="inventory">Inventory Only - Stock management</option>
                    <option value="basic">Basic Access - View only</option>
                  </select>
                </label>
              </div>

              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Username *</span>
                  <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>

                <label className="users-modal-field">
                  <span>Password</span>
                  <div className="password-field-group">
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Generated password"
                    />
                    <button type="button" className="outline-action" onClick={generatePassword}>
                      Generate
                    </button>
                  </div>
                </label>
              </div>

              {!isEditing && (
                <div className="info-alert">
                  <FiLock />
                  <div>
                    <strong>Login credentials will be generated</strong>
                    <p>Staff will receive their username and password via email. Make sure to share credentials securely.</p>
                  </div>
                </div>
              )}
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
                {isEditing ? 'Update Staff' : 'Create Account'}
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
          >
            <div className="users-modal-head">
              <div className="profile-summary">
                <div className="profile-avatar">
                  {selectedStaff.name.charAt(0)}
                </div>
                <div>
                  <h3>{selectedStaff.name}</h3>
                  <p className="users-modal-copy">{selectedStaff.role}</p>
                </div>
              </div>
              <button type="button" className="icon-ghost" onClick={closeViewModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="info-block">
              <p className="muted-copy mb-2">Contact Information</p>
              <div className="info-pill">
                <strong>Email:</strong> {selectedStaff.email}
              </div>
              <div className="info-pill">
                <strong>Phone:</strong> {selectedStaff.phone || '-'}
              </div>
            </div>

            <div className="info-block">
              <p className="muted-copy mb-2">Account Details</p>
              <div className="info-pill">
                <strong>Username:</strong> <code>{selectedStaff.username}</code>
              </div>
              <div className="info-pill">
                <strong>Access Level:</strong> {selectedStaff.access}
              </div>
              <div className="info-pill">
                <strong>Status:</strong> {selectedStaff.status}
              </div>
              <div className="info-pill">
                <strong>Created:</strong> {selectedStaff.createdAt}
              </div>
              <div className="info-pill">
                <strong>Last Login:</strong> {selectedStaff.lastLogin}
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

      {/* Credentials Modal */}
      {showCredentialsModal && generatedCredentials && (
        <div className="users-modal-backdrop" onClick={closeCredentialsModal}>
          <div
            className="users-modal-card credentials-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="users-modal-head">
              <h3>Staff Login Credentials</h3>
              <button type="button" className="icon-ghost" onClick={closeCredentialsModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="credentials-content">
              <div className="credentials-header">
                <FiKey size={32} />
                <h4>Account created for {generatedCredentials.name}</h4>
              </div>

              <div className="credentials-details">
                <div className="credential-row">
                  <span>Username:</span>
                  <code>{generatedCredentials.username}</code>
                  <button onClick={() => copyToClipboard(generatedCredentials.username, 'Username')}>
                    <FiCopy />
                  </button>
                </div>
                <div className="credential-row">
                  <span>Password:</span>
                  <code>{generatedCredentials.password}</code>
                  <button onClick={() => copyToClipboard(generatedCredentials.password, 'Password')}>
                    <FiCopy />
                  </button>
                </div>
                <div className="credential-row">
                  <span>Role:</span>
                  <span>{generatedCredentials.role}</span>
                </div>
                <div className="credential-row">
                  <span>Email:</span>
                  <span>{generatedCredentials.email}</span>
                </div>
              </div>

              <div className="info-alert warning">
                <FiAlertCircle />
                <div>
                  <strong>Share these credentials securely with the staff member</strong>
                  <p>Login URL: https://iiitl.ac.in/mess/admin</p>
                </div>
              </div>
            </div>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={closeCredentialsModal}>
                Close
              </button>
              <button
                type="button"
                className="login-submit"
                onClick={() => {
                  const allCredentials = `Username: ${generatedCredentials.username}\nPassword: ${generatedCredentials.password}\nURL: https://iiitl.ac.in/mess/admin`
                  copyToClipboard(allCredentials, 'All credentials')
                }}
              >
                <FiCopy /> Copy All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessStaffManagement