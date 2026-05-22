import { useState } from 'react'
import {
  FiPlusCircle,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiSave,
  FiClock,
  FiSun,
  FiMoon,
  FiSunrise,
  FiCopy,
  FiCalendar,
  FiCheck,
  FiX,
} from 'react-icons/fi'
import { useToast } from '../../components/feedback/ToastProvider'

// Initial menu data
const initialMenuData = {
  breakfast: {
    'Monday': ['Poha', 'Sandwich', 'Fresh Fruits', 'Milk', 'Cornflakes'],
    'Tuesday': ['Aloo Paratha', 'Curd', 'Butter', 'Juice', 'Boiled Egg'],
    'Wednesday': ['Upma', 'Vada', 'Sambar', 'Chutney', 'Banana'],
    'Thursday': ['Stuffed Paratha', 'Pickle', 'Curd', 'Tea', 'Fruits'],
    'Friday': ['Puri Sabzi', 'Halwa', 'Milk', 'Bread Toast'],
    'Saturday': ['Chole Bhature', 'Lassi', 'Fruits', 'Juice'],
    'Sunday': ['Bread Pakora', 'Aloo Sabzi', 'Tea', 'Biscuits', 'Fruits']
  },
  lunch: {
    'Monday': ['Roti', 'Rice', 'Dal Tadka', 'Mix Veg', 'Salad', 'Buttermilk'],
    'Tuesday': ['Naan', 'Jeera Rice', 'Paneer Butter Masala', 'Dal Makhani', 'Salad', 'Raita'],
    'Wednesday': ['Roti', 'Veg Biryani', 'Rajma', 'Curd', 'Papad', 'Sweet'],
    'Thursday': ['Butter Roti', 'Fried Rice', 'Chole', 'Veg Manchurian', 'Salad'],
    'Friday': ['Roti', 'Pulao', 'Kadhi Pakora', 'Bhindi', 'Salad', 'Lassi'],
    'Saturday': ['Naan', 'Veg Pulao', 'Shahi Paneer', 'Dal Fry', 'Salad', 'Ice Cream'],
    'Sunday': ['Roti', 'Special Biryani', 'Malai Kofta', 'Raita', 'Gulab Jamun']
  },
  dinner: {
    'Monday': ['Roti', 'Rice', 'Dal Fry', 'Aloo Gobi', 'Salad', 'Fruit'],
    'Tuesday': ['Garlic Naan', 'Veg Pulao', 'Matar Paneer', 'Dal', 'Salad'],
    'Wednesday': ['Roti', 'Veg Hakka Noodles', 'Manchurian', 'Soup', 'Veg Spring Roll'],
    'Thursday': ['Missi Roti', 'Steam Rice', 'Kadai Vegetable', 'Dal', 'Salad'],
    'Friday': ['Roti', 'Veg Fried Rice', 'Chana Masala', 'Palak Paneer', 'Salad'],
    'Saturday': ['Naan', 'Special Rice', 'Veg Kofta', 'Dal', 'Salad', 'Kheer'],
    'Sunday': ['Roti', 'Veg Pulao', 'Special Curry', 'Raita', 'Salad', 'Ice Cream']
  }
}

function WeeklyMenuManagement() {
  const toast = useToast()
  const [menuData, setMenuData] = useState(initialMenuData)
  const [selectedMeal, setSelectedMeal] = useState('breakfast')
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [newItemName, setNewItemName] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const meals = [
    { id: 'breakfast', label: 'Breakfast', icon: FiSunrise, time: '8:00 AM - 10:00 AM', color: '#f59e0b' },
    { id: 'lunch', label: 'Lunch', icon: FiSun, time: '12:30 PM - 2:30 PM', color: '#22c55e' },
    { id: 'dinner', label: 'Dinner', icon: FiMoon, time: '7:30 PM - 9:30 PM', color: '#3b82f6' }
  ]

  const openAddItemModal = (meal, day) => {
    setEditingItem({ meal, day })
    setNewItemName('')
    setEditingIndex(null)
    setShowEditModal(true)
  }

  const openEditItemModal = (meal, day, index, itemName) => {
    setEditingItem({ meal, day })
    setNewItemName(itemName)
    setEditingIndex(index)
    setShowEditModal(true)
  }

  const handleSaveItem = () => {
    if (!newItemName.trim()) {
      toast.error('Please enter a menu item', 'Validation Error')
      return
    }

    const newMenuData = { ...menuData }
    const currentItems = [...newMenuData[editingItem.meal][editingItem.day]]
    
    if (editingIndex !== null) {
      currentItems[editingIndex] = newItemName
      toast.success('Menu item updated successfully')
    } else {
      currentItems.push(newItemName)
      toast.success('Menu item added successfully')
    }
    
    newMenuData[editingItem.meal][editingItem.day] = currentItems
    setMenuData(newMenuData)
    setShowEditModal(false)
  }

  const handleDeleteItem = (meal, day, index) => {
    if (window.confirm('Remove this item from the menu?')) {
      const newMenuData = { ...menuData }
      const currentItems = [...newMenuData[meal][day]]
      currentItems.splice(index, 1)
      newMenuData[meal][day] = currentItems
      setMenuData(newMenuData)
      toast.success('Menu item removed')
    }
  }

  const getMealIcon = (mealId) => {
    const meal = meals.find(m => m.id === mealId)
      const Icon = meal?.icon || FiSun
    return <Icon size={20} />
  }

  const currentMeal = meals.find(m => m.id === selectedMeal)
  const currentItems = menuData[selectedMeal][selectedDay]

  return (
    <div className="management-page">
      <div className="page-section-head">
        <div>
          <h2>Weekly Menu Management</h2>
          <p className="muted-copy">Create and manage breakfast, lunch, and dinner menu for the week</p>
        </div>
        <div className="header-actions">
          <button type="button" className="dark-action lg-pill">
            <FiCopy />
            Copy Previous Week
          </button>
        </div>
      </div>

      {/* Meal Type Cards */}
      <div className="weekly-menu-meal-cards">
        {meals.map((meal) => {
          const Icon = meal.icon
          return (
            <button
              key={meal.id}
              className={`meal-type-card ${selectedMeal === meal.id ? 'active' : ''}`}
              onClick={() => setSelectedMeal(meal.id)}
            >
              <div className="meal-type-icon" style={{ backgroundColor: `${meal.color}15`, color: meal.color }}>
                <Icon size={24} />
              </div>
              <div className="meal-type-info">
                <h4>{meal.label}</h4>
                <span>{meal.time}</span>
              </div>
              {selectedMeal === meal.id && <div className="active-indicator" />}
            </button>
          )
        })}
      </div>

      {/* Day Navigation */}
      <div className="weekly-menu-days">
        {days.map((day) => (
          <button
            key={day}
            className={`day-button ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            <span className="day-name">{day.slice(0, 3)}</span>
            <span className="day-full">{day}</span>
          </button>
        ))}
      </div>

      {/* Menu Items Section */}
      <div className="weekly-menu-items-panel">
        <div className="panel-header">
          <div>
            <h3>
              {currentMeal?.label} - {selectedDay}
            </h3>
            <p className="muted-copy">{currentMeal?.time}</p>
          </div>
          <button 
            className="dark-action"
            onClick={() => openAddItemModal(selectedMeal, selectedDay)}
          >
            <FiPlusCircle size={16} />
            Add Item
          </button>
        </div>

        <div className="menu-items-container">
          {currentItems.length === 0 ? (
            <div className="empty-menu-items">
              <FiClock size={48} />
              <p>No items added for {currentMeal?.label} on {selectedDay}</p>
              <button className="outline-action" onClick={() => openAddItemModal(selectedMeal, selectedDay)}>
                Add Menu Items
              </button>
            </div>
          ) : (
            <div className="menu-items-list">
              {currentItems.map((item, index) => (
                <div key={index} className="menu-item-row">
                  <div className="menu-item-number">{index + 1}</div>
                  <div className="menu-item-name">{item}</div>
                  <div className="menu-item-actions">
                    <button 
                      className="icon-btn edit"
                      onClick={() => openEditItemModal(selectedMeal, selectedDay, index, item)}
                      title="Edit item"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      className="icon-btn delete"
                      onClick={() => handleDeleteItem(selectedMeal, selectedDay, index)}
                      title="Delete item"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full Week Overview */}
      <div className="weekly-menu-overview">
        <div className="panel-header">
          <h3>Full Week Menu Overview</h3>
          <FiCalendar size={20} />
        </div>
        
        <div className="overview-table-wrapper">
          <table className="overview-menu-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="day-cell">{day}</td>
                  <td className="meal-cell">
                    <div className="meal-items">
                      {menuData.breakfast[day].slice(0, 3).map((item, idx) => (
                        <span key={idx} className="meal-badge">{item}</span>
                      ))}
                      {menuData.breakfast[day].length > 3 && (
                        <span className="meal-badge more">+{menuData.breakfast[day].length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="meal-cell">
                    <div className="meal-items">
                      {menuData.lunch[day].slice(0, 3).map((item, idx) => (
                        <span key={idx} className="meal-badge">{item}</span>
                      ))}
                      {menuData.lunch[day].length > 3 && (
                        <span className="meal-badge more">+{menuData.lunch[day].length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="meal-cell">
                    <div className="meal-items">
                      {menuData.dinner[day].slice(0, 3).map((item, idx) => (
                        <span key={idx} className="meal-badge">{item}</span>
                      ))}
                      {menuData.dinner[day].length > 3 && (
                        <span className="meal-badge more">+{menuData.dinner[day].length - 3}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showEditModal && (
        <div className="users-modal-backdrop" onClick={() => setShowEditModal(false)}>
          <div
            className="users-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="users-modal-head">
              <h3>{editingIndex !== null ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
              <button type="button" className="icon-ghost" onClick={() => setShowEditModal(false)}>
                <FiMoreVertical />
              </button>
            </div>

            <div className="modal-body-content">
              <label className="users-modal-field">
                <span>Menu Item Name</span>
                <input
                  type="text"
                  placeholder="e.g., Paneer Butter Masala, Aloo Paratha, etc."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  autoFocus
                />
              </label>
              
              <div className="info-alert">
                <FiClock />
                <div>
                  <strong>Adding to: {editingItem?.meal} on {editingItem?.day}</strong>
                  <p>This item will appear in the {editingItem?.meal} menu for {editingItem?.day}</p>
                </div>
              </div>
            </div>

            <div className="users-modal-actions">
              <button type="button" className="outline-action" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="login-submit users-modal-submit"
                onClick={handleSaveItem}
              >
                <FiSave />
                {editingIndex !== null ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeeklyMenuManagement