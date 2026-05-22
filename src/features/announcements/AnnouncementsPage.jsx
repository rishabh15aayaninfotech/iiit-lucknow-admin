import { useState } from 'react'
import {
  FiPlusCircle,
  FiEdit2,
  FiTrash2,
  FiBell,
  FiCalendar,
  FiUsers,
  FiSend,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertCircle,
  FiMessageCircle,
  FiMapPin,
  FiTag,
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'

// Initial announcements data
const initialAnnouncements = [
  {
    id: 'ANN001',
    title: 'Special Dinner on Republic Day',
    message: 'Enjoy a special menu on 26th January featuring traditional Indian dishes including Paneer Butter Masala, Gulab Jamun, and special sweets.',
    date: '2024-01-26',
    time: '07:30 PM',
    audience: 'All Students & Staff',
    type: 'event',
    priority: 'high',
    status: 'published',
    createdBy: 'Mess Admin',
    createdAt: '2024-01-20T10:00:00'
  },
  {
    id: 'ANN002',
    title: 'Breakfast Timing Change',
    message: 'Breakfast timings will be 7:30 AM - 9:30 AM from tomorrow due to winter schedule.',
    date: '2024-01-15',
    time: '08:00 AM',
    audience: 'All Mess Users',
    type: 'notice',
    priority: 'medium',
    status: 'published',
    createdBy: 'Mess Manager',
    createdAt: '2024-01-14T09:00:00'
  },
  {
    id: 'ANN003',
    title: 'Holi Special Lunch',
    message: 'Special menu for Holi celebration on 25th March. Enjoy traditional sweets and thandai.',
    date: '2024-03-25',
    time: '12:30 PM',
    audience: 'All Students',
    type: 'event',
    priority: 'high',
    status: 'scheduled',
    createdBy: 'Mess Admin',
    createdAt: '2024-01-18T14:30:00'
  },
  {
    id: 'ANN004',
    title: 'Mess Committee Meeting',
    message: 'Meeting with student representatives to discuss menu improvements and feedback.',
    date: '2024-01-22',
    time: '04:00 PM',
    audience: 'Student Representatives',
    type: 'meeting',
    priority: 'medium',
    status: 'published',
    createdBy: 'Mess Admin',
    createdAt: '2024-01-19T11:00:00'
  },
  {
    id: 'ANN005',
    title: 'Exam Week Special Menu',
    message: 'Light and healthy food options available during exam week. Special requests can be submitted.',
    date: '2024-01-28',
    time: 'All Day',
    audience: 'All Students',
    type: 'notice',
    priority: 'high',
    status: 'scheduled',
    createdBy: 'Mess Manager',
    createdAt: '2024-01-21T09:00:00'
  }
]

function AnnouncementsPage() {
  const toast = useToast()
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)

  // Form state
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [audience, setAudience] = useState('All Students & Staff')
  const [type, setType] = useState('notice')
  const [priority, setPriority] = useState('medium')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState('12:00 PM')

  // Filter announcements
  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ann.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || ann.type === filterType
    return matchesSearch && matchesType
  })

  // Stats
  const stats = {
    total: announcements.length,
    published: announcements.filter(a => a.status === 'published').length,
    scheduled: announcements.filter(a => a.status === 'scheduled').length,
    highPriority: announcements.filter(a => a.priority === 'high').length
  }

  const openModal = (announcement = null) => {
    if (announcement) {
      setIsEditing(true)
      setCurrentAnnouncement(announcement)
      setTitle(announcement.title)
      setMessage(announcement.message)
      setAudience(announcement.audience)
      setType(announcement.type)
      setPriority(announcement.priority)
      setDate(announcement.date)
      setTime(announcement.time)
    } else {
      setIsEditing(false)
      setCurrentAnnouncement(null)
      setTitle('')
      setMessage('')
      setAudience('All Students & Staff')
      setType('notice')
      setPriority('medium')
      setDate(new Date().toISOString().split('T')[0])
      setTime('12:00 PM')
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setIsEditing(false)
    setCurrentAnnouncement(null)
  }

  const openViewModal = (announcement) => {
    setSelectedAnnouncement(announcement)
    setShowViewModal(true)
  }

  const closeViewModal = () => {
    setShowViewModal(false)
    setSelectedAnnouncement(null)
  }

  const handleSave = () => {
    if (!title || !message) {
      toast.error('Please fill title and message', 'Validation Error')
      return
    }

    const announcementData = {
      id: isEditing ? currentAnnouncement.id : `ANN00${announcements.length + 1}`,
      title,
      message,
      audience,
      type,
      priority,
      date,
      time,
      status: 'published',
      createdBy: 'Mess Admin',
      createdAt: new Date().toISOString()
    }

    if (isEditing) {
      setAnnouncements(announcements.map(a => a.id === currentAnnouncement.id ? announcementData : a))
      toast.success('Announcement updated successfully')
    } else {
      setAnnouncements([announcementData, ...announcements])
      toast.success('Announcement sent successfully')
    }
    closeModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id))
      toast.success('Announcement deleted successfully')
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'event': return <FiCalendar />
      case 'notice': return <FiBell />
      case 'meeting': return <FiUsers />
      default: return <FiMessageCircle />
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'event': return '#f59e0b'
      case 'notice': return '#3b82f6'
      case 'meeting': return '#8b5cf6'
      default: return '#6b7280'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      default: return '#22c55e'
    }
  }

  return (
    <div className="management-page">
      <div className="page-section-head">
        <div>
          <h2>Announcements</h2>
          <p className="muted-copy">Broadcast messages to students and staff</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="dark-action lg-pill"
            onClick={() => openModal()}
          >
            <FiPlusCircle />
            New Announcement
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <section className="stats-grid order-stats-grid">
        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Total Announcements</h3>
            </div>
            <FiBell size={20} className="text-muted" />
          </div>
          <div className="stat-value-wrap mt-2">
            <strong>{stats.total}</strong>
          </div>
          <p className="card-footnote">All time</p>
        </article>

        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Published</h3>
            </div>
            <FiCheckCircle size={20} style={{ color: '#22c55e' }} />
          </div>
          <div className="stat-value-wrap mt-2">
            <strong style={{ color: '#22c55e' }}>{stats.published}</strong>
          </div>
          <p className="card-footnote">Active announcements</p>
        </article>

        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Scheduled</h3>
            </div>
            <FiClock size={20} style={{ color: '#f59e0b' }} />
          </div>
          <div className="stat-value-wrap mt-2">
            <strong style={{ color: '#f59e0b' }}>{stats.scheduled}</strong>
          </div>
          <p className="card-footnote">Upcoming</p>
        </article>

        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>High Priority</h3>
            </div>
            <FiAlertCircle size={20} style={{ color: '#ef4444' }} />
          </div>
          <div className="stat-value-wrap mt-2">
            <strong style={{ color: '#ef4444' }}>{stats.highPriority}</strong>
          </div>
          <p className="card-footnote">Urgent notices</p>
        </article>
      </section>

      {/* Filters */}
      <section className="panel orders-table-panel">
        <div className="orders-toolbar">
          <div className="search-shell slim">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search announcements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="orders-toolbar-right">
            <div className="tab-pills">
              <button className={filterType === 'all' ? 'active' : ''} onClick={() => setFilterType('all')}>
                All
              </button>
              <button className={filterType === 'event' ? 'active' : ''} onClick={() => setFilterType('event')}>
                Events
              </button>
              <button className={filterType === 'notice' ? 'active' : ''} onClick={() => setFilterType('notice')}>
                Notices
              </button>
              <button className={filterType === 'meeting' ? 'active' : ''} onClick={() => setFilterType('meeting')}>
                Meetings
              </button>
            </div>
            <button type="button" className="icon-square-button">
              <FiFilter />
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Cards Grid */}
      <div className="announcements-grid">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className={`announcement-card ${announcement.type}`}>
            <div className="announcement-card-header">
              <div className="announcement-type-badge" style={{ backgroundColor: `${getTypeColor(announcement.type)}15`, color: getTypeColor(announcement.type) }}>
                {getTypeIcon(announcement.type)}
                <span>{announcement.type}</span>
              </div>
              <div className="announcement-card-actions">
                <button 
                  className="icon-btn-small"
                  onClick={() => openViewModal(announcement)}
                  title="View details"
                >
                  <FiEye size={16} />
                </button>
                <button 
                  className="icon-btn-small"
                  onClick={() => openModal(announcement)}
                  title="Edit"
                >
                  <FiEdit2 size={16} />
                </button>
                <button 
                  className="icon-btn-small danger"
                  onClick={() => handleDelete(announcement.id)}
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="announcement-card-body">
              <h3 className="announcement-title">{announcement.title}</h3>
              <p className="announcement-message">{announcement.message}</p>
            </div>
            
            <div className="announcement-card-footer">
              <div className="announcement-meta">
                <div className="meta-item">
                  <FiCalendar size={14} />
                  <span>{announcement.date}</span>
                </div>
                <div className="meta-item">
                  <FiUsers size={14} />
                  <span>{announcement.audience}</span>
                </div>
                <div className="meta-item">
                  <div className={`priority-badge ${announcement.priority}`}>
                    {announcement.priority}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="empty-state">
            <FiBell size={48} />
            <p>No announcements found</p>
            <button className="outline-action" onClick={() => openModal()}>
              Create your first announcement
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Announcement Modal */}
      {showModal && (
        <div className="users-modal-backdrop" onClick={closeModal}>
          <div
            className="users-modal-card modal-lg-announcement"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="users-modal-head">
              <h3>{isEditing ? 'Edit Announcement' : 'Create New Announcement'}</h3>
              <button type="button" className="icon-ghost" onClick={closeModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="modal-body-content">
              <label className="users-modal-field">
                <span>Announcement Title *</span>
                <input
                  type="text"
                  placeholder="e.g., Special Dinner on Republic Day"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label className="users-modal-field">
                <span>Message / Description *</span>
                <textarea
                  rows="4"
                  placeholder="Enter your announcement message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>

              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Target Audience</span>
                  <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                    <option>All Students & Staff</option>
                    <option>Students Only</option>
                    <option>Staff Only</option>
                    <option>Hostel Residents</option>
                    <option>Day Scholars</option>
                    <option>Student Representatives</option>
                  </select>
                </label>

                <label className="users-modal-field">
                  <span>Announcement Type</span>
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="notice">Notice</option>
                    <option value="event">Event</option>
                    <option value="meeting">Meeting</option>
                  </select>
                </label>
              </div>

              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Priority Level</span>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low - Normal Notice</option>
                    <option value="medium">Medium - Important</option>
                    <option value="high">High - Urgent</option>
                  </select>
                </label>

                <label className="users-modal-field">
                  <span>Schedule Date</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
              </div>

              <label className="users-modal-field">
                <span>Schedule Time</span>
                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                  <option>06:00 PM</option>
                  <option>07:30 PM</option>
                </select>
              </label>
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
                <FiSend />
                {isEditing ? 'Update Announcement' : 'Send Announcement'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Announcement Modal */}
      {showViewModal && selectedAnnouncement && (
        <div className="users-modal-backdrop" onClick={closeViewModal}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="users-modal-head">
              <div className="profile-summary">
                <div className="profile-avatar" style={{ backgroundColor: `${getTypeColor(selectedAnnouncement.type)}15`, color: getTypeColor(selectedAnnouncement.type) }}>
                  {getTypeIcon(selectedAnnouncement.type)}
                </div>
                <div>
                  <h3>{selectedAnnouncement.title}</h3>
                  <p className="users-modal-copy users-modal-copy-tight">
                    {selectedAnnouncement.type} • {selectedAnnouncement.priority} priority
                  </p>
                </div>
              </div>
              <button type="button" className="icon-ghost" onClick={closeViewModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="info-block">
              <p className="muted-copy mb-2">Message</p>
              <div className="announcement-message-view">
                {selectedAnnouncement.message}
              </div>
            </div>

            <div className="info-block">
              <p className="muted-copy mb-2">Delivery Details</p>
              <div className="info-pill">
                <strong>Audience:</strong> {selectedAnnouncement.audience}
              </div>
              <div className="info-pill">
                <strong>Date:</strong> {selectedAnnouncement.date}
              </div>
              <div className="info-pill">
                <strong>Time:</strong> {selectedAnnouncement.time}
              </div>
              <div className="info-pill">
                <strong>Created By:</strong> {selectedAnnouncement.createdBy}
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
                  openModal(selectedAnnouncement)
                }}
              >
                <FiEdit2 />
                Edit Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnnouncementsPage