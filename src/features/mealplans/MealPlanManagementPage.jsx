import { useState } from 'react'
import {
  FiPlusCircle,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiDollarSign,
  FiUsers,
  FiCheck,
  FiX,
  FiSearch,
  FiFilter,
  FiMoreVertical,
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'
import { mealPlans } from '../../data/messMockData'
import { FaRupeeSign } from 'react-icons/fa'

function MealPlanManagementPage() {
  const toast = useToast()
  const [plans, setPlans] = useState(mealPlans)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [planName, setPlanName] = useState('')
  const [planType, setPlanType] = useState('Student')
  const [planPrice, setPlanPrice] = useState(3500)
  const [planDuration, setPlanDuration] = useState('Monthly')
  const [mealsPerDay, setMealsPerDay] = useState(3)
  const [features, setFeatures] = useState([])
  const [featureInput, setFeatureInput] = useState('')

  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openModal = (plan = null) => {
    if (plan) {
      setIsEditing(true)
      setCurrentPlan(plan)
      setPlanName(plan.name)
      setPlanType(plan.type)
      setPlanPrice(plan.price)
      setPlanDuration(plan.duration)
      setMealsPerDay(plan.mealsPerDay)
      setFeatures(plan.features)
    } else {
      setIsEditing(false)
      setCurrentPlan(null)
      setPlanName('')
      setPlanType('Student')
      setPlanPrice(3500)
      setPlanDuration('Monthly')
      setMealsPerDay(3)
      setFeatures([])
      setFeatureInput('')
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setIsEditing(false)
    setCurrentPlan(null)
    setPlanName('')
    setPlanType('Student')
    setPlanPrice(3500)
    setPlanDuration('Monthly')
    setMealsPerDay(3)
    setFeatures([])
    setFeatureInput('')
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()])
      setFeatureInput('')
    }
  }

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (!planName || !planPrice) {
      toast.error('Please fill all required fields', 'Validation Error')
      return
    }

    const planData = {
      id: isEditing ? currentPlan.id : `MP00${plans.length + 1}`,
      name: planName,
      type: planType,
      price: planPrice,
      duration: planDuration,
      mealsPerDay: mealsPerDay,
      features: features,
      isActive: true,
      subscribers: isEditing ? currentPlan.subscribers : 0
    }

    if (isEditing) {
      setPlans(plans.map(p => p.id === currentPlan.id ? planData : p))
      toast.success('Meal plan updated successfully')
    } else {
      setPlans([...plans, planData])
      toast.success('New meal plan added successfully')
    }
    closeModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this meal plan?')) {
      setPlans(plans.filter(p => p.id !== id))
      toast.success('Meal plan deleted successfully')
    }
  }

  const toggleStatus = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p))
    toast.success(`Plan ${plans.find(p => p.id === id)?.isActive ? 'deactivated' : 'activated'} successfully`)
  }

  const stats = {
    total: plans.length,
    active: plans.filter(p => p.isActive).length,
    subscribers: plans.reduce((sum, p) => sum + p.subscribers, 0),
    revenue: plans.reduce((sum, p) => sum + (p.price * p.subscribers), 0)
  }

  return (
    <div className="management-page">
      <div className="page-section-head">
        <div>
          <h2>Meal Plans Management</h2>
          <p className="muted-copy">Manage mess meal plans, pricing, and subscriptions</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="dark-action lg-pill"
            onClick={() => openModal()}
          >
            <FiPlusCircle />
            Add Meal Plan
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <section className="stats-grid order-stats-grid">
        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Total Plans</h3>
            </div>
            <button type="button" className="icon-ghost">
              <FiMoreHorizontal />
            </button>
          </div>
          <div className="stat-value-wrap mt-2">
            <strong>{stats.total}</strong>
            <em>Active: {stats.active}</em>
          </div>
          <p className="card-footnote">Meal plans configured</p>
        </article>

        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Total Subscribers</h3>
            </div>
          </div>
          <div className="stat-value-wrap mt-2">
            <strong>{stats.subscribers.toLocaleString()}</strong>
          </div>
          <p className="card-footnote">Active mess subscribers</p>
        </article>

        <article className="panel stat-card compact">
          <div className="panel-header">
            <div>
              <h3>Monthly Revenue</h3>
            </div>
          </div>
          <div className="stat-value-wrap mt-2">
            <strong>₹{stats.revenue.toLocaleString()}</strong>
          </div>
          <p className="card-footnote">From meal plans</p>
        </article>
      </section>

      {/* Meal Plans Table */}
      <section className="panel orders-table-panel">
        <div className="orders-toolbar">
          <div className="search-shell slim">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search meal plans..." 
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
                <th>Plan Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Meals/Day</th>
                <th>Subscribers</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id}>
                  <td>
                    <div className="order-product-cell">
                      <div className="product-thumb square">
                        <FaRupeeSign />
                      </div>
                      <span>
                        <strong>{plan.name}</strong>
                        <small className="d-block muted-copy">{plan.features.length} features</small>
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`payment-status ${plan.type === 'Student' ? 'paid' : 'unpaid'}`}>
                      {plan.type}
                    </span>
                  </td>
                  <td>
                    <strong>₹{plan.price.toLocaleString()}</strong>
                  </td>
                  <td>{plan.duration}</td>
                  <td>{plan.mealsPerDay}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <FiUsers />
                      <span>{plan.subscribers}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`shipment-status ${plan.isActive ? 'active' : 'inactive'}`}>
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-icons">
                      <button 
                        className="table-action-icon"
                        onClick={() => openModal(plan)}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="table-action-icon"
                        onClick={() => toggleStatus(plan.id)}
                      >
                        {plan.isActive ? <FiX /> : <FiCheck />}
                      </button>
                      <button 
                        className="table-action-icon text-danger"
                        onClick={() => handleDelete(plan.id)}
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

      {/* Modal - Using your existing pattern from UserManagementPage */}
      {showModal && (
        <div className="users-modal-backdrop" onClick={closeModal}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mealplan-modal-title"
          >
            <div className="users-modal-head">
              <h3 id="mealplan-modal-title">
                {isEditing ? 'Edit Meal Plan' : 'Add New Meal Plan'}
              </h3>
              <button type="button" className="icon-ghost" onClick={closeModal}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="modal-body-content">
              <label className="users-modal-field">
                <span>Plan Name *</span>
                <input
                  type="text"
                  placeholder="e.g., Premium Mess Plan"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </label>

              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Plan Type</span>
                  <select value={planType} onChange={(e) => setPlanType(e.target.value)}>
                    <option>Student</option>
                    <option>Staff</option>
                    <option>Temporary</option>
                  </select>
                </label>

                <label className="users-modal-field">
                  <span>Duration</span>
                  <select value={planDuration} onChange={(e) => setPlanDuration(e.target.value)}>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Semester</option>
                  </select>
                </label>
              </div>

              <div className="form-row-modal">
                <label className="users-modal-field">
                  <span>Price (₹) *</span>
                  <input
                    type="number"
                    value={planPrice}
                    onChange={(e) => setPlanPrice(parseInt(e.target.value))}
                  />
                </label>

                <label className="users-modal-field">
                  <span>Meals Per Day</span>
                  <input
                    type="number"
                    min="1"
                    max="3"
                    value={mealsPerDay}
                    onChange={(e) => setMealsPerDay(parseInt(e.target.value))}
                  />
                </label>
              </div>

              <label className="users-modal-field">
                <span>Features</span>
                <div className="feature-input-group">
                  <input
                    type="text"
                    placeholder="Add feature (e.g., Guest meal vouchers)"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <button type="button" className="outline-action" onClick={addFeature}>
                    Add
                  </button>
                </div>
                <div className="features-list">
                  {features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                      <button type="button" onClick={() => removeFeature(idx)}>×</button>
                    </span>
                  ))}
                </div>
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
                {isEditing ? 'Update Plan' : 'Create Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MealPlanManagementPage