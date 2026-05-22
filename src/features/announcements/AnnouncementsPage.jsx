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
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'
import { announcements } from '../../data/messMockData'

function AnnouncementsPage() {
  const toast = useToast()
  const [announcementsList, setAnnouncementsList] = useState(announcements)
  const [showModal, setShowModal] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)

  const handleSend = (announcementData) => {
    if (editingAnnouncement) {
      setAnnouncementsList(announcementsList.map(a => a.id === editingAnnouncement.id ? announcementData : a))
      toast.success('Announcement updated successfully')
    } else {
      const newAnnouncement = { ...announcementData, id: `ANN00${announcementsList.length + 1}` }
      setAnnouncementsList([newAnnouncement, ...announcementsList])
      toast.success('Announcement sent successfully')
    }
    setShowModal(false)
    setEditingAnnouncement(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this announcement?')) {
      setAnnouncementsList(announcementsList.filter(a => a.id !== id))
      toast.success('Announcement deleted')
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
            onClick={() => {
              setEditingAnnouncement(null)
              setShowModal(true)
            }}
          >
            <FiPlusCircle />
            New Announcement
          </button>
        </div>
      </div>

      <section className="panel orders-table-panel">
        <div className="announcements-list">
          {announcementsList.map((announcement) => (
            <div key={announcement.id} className={`alert-card ${announcement.type}`}>
              <div className="alert-icon">
                <FiBell />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{announcement.title}</strong>
                    <p className="mt-1">{announcement.message}</p>
                  </div>
                  <div className="action-icons">
                    <button className="table-action-icon" onClick={() => {
                      setEditingAnnouncement(announcement)
                      setShowModal(true)
                    }}>
                      <FiEdit2 />
                    </button>
                    <button className="table-action-icon text-danger" onClick={() => handleDelete(announcement.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-2">
                  <small><FiCalendar /> {announcement.date}</small>
                  <small><FiUsers /> {announcement.audience}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcement Modal */}
      {showModal && (
        <AnnouncementModal 
          announcement={editingAnnouncement}
          onClose={() => {
            setShowModal(false)
            setEditingAnnouncement(null)
          }}
          onSend={handleSend}
        />
      )}
    </div>
  )
}

function AnnouncementModal({ announcement, onClose, onSend }) {
  const [formData, setFormData] = useState(announcement || {
    title: '',
    message: '',
    audience: 'All Students & Staff',
    type: 'notice',
    date: new Date().toISOString().split('T')[0],
    isActive: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.message) {
      alert('Please fill all required fields')
      return
    }
    onSend(formData)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{announcement ? 'Edit Announcement' : 'New Announcement'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Title *</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Special Dinner on Republic Day"
                required
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea 
                className="form-control"
                rows="4"
                value={formData.message} 
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter announcement details..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Audience</label>
                <select 
                  className="form-control"
                  value={formData.audience} 
                  onChange={e => setFormData({ ...formData, audience: e.target.value })}
                >
                  <option>All Students & Staff</option>
                  <option>Students Only</option>
                  <option>Staff Only</option>
                  <option>Hostel Residents</option>
                  <option>Day Scholars</option>
                </select>
              </div>
              <div className="form-group">
                <label>Announcement Type</label>
                <select 
                  className="form-control"
                  value={formData.type} 
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option>notice</option>
                  <option>event</option>
                  <option>alert</option>
                  <option>reminder</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="outline-action" onClick={onClose}>Cancel</button>
            <button type="submit" className="login-submit">
              <FiSend /> {announcement ? 'Update' : 'Send Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AnnouncementsPage