import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiAward,
  FiBox,
  FiChevronLeft,
  FiCreditCard,
  FiGift,
  FiGrid,
  FiHeadphones,
  FiImage,
  FiLayers,
  FiLock,
  FiLogOut,
  FiMessageSquare,
  FiPlusCircle,
  FiSettings,
  FiShield,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
  FiX,
  FiCalendar,
  FiBell,
  FiTrendingUp,
  FiAlertTriangle,
  FiUserCheck,
  FiBookOpen,
} from 'react-icons/fi'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { sidebarSections } from '../../data/messMockData'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/IIITL_logo.png'
import aayanlogo from '../../assets/aayanlogo.png'
import makeinindia from '../../assets/makeinindia.png'

const iconMap = {
  dashboard: FiGrid,
  'meal-plans': FiBookOpen,
  'special-requests': FiHeadphones,
  announcements: FiBell,
  users: FiUsers,
  staff: FiUserCheck,
  reports: FiTrendingUp,
  wastage: FiAlertTriangle,
  calendar: FiCalendar,
  orders: FiShoppingCart,
  vendors: FiUsers,
  categories: FiLayers,
  partners: HiOutlineBuildingStorefront,
  payment: FiCreditCard,
  promotion: FiTag,
  content: FiImage,
  support: FiHeadphones,
  review: FiMessageSquare,
  loyalty: FiGift,
  affiliate: FiAward,
  add: FiPlusCircle,
  media: FiImage,
  list: FiLayers,
  productReview: FiStar,
  admin: FiShield,
  settings: FiSettings,
}

function getInitials(name) {
  if (!name) {
    return 'M'
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

function Sidebar({ isOpen, onClose, currentPath, isCollapsed, onToggleCollapse }) {
  const navigate = useNavigate()
  const { authState, logout } = useAuth()
  const currentUser = authState?.user || null
  const currentRole = currentUser?.role || authState?.role || ''

  // Filter sidebar sections based on role (admin gets everything)
  const visibleSections =
    currentRole === 'STAFF'
      ? sidebarSections
          .map((section) => ({
            ...section,
            items: section.items.filter((item) => 
              item.path === '/dashboard' || 
              item.path === '/special-requests' || 
              item.path === '/meal-plans'
            ),
          }))
          .filter((section) => section.items.length > 0)
      : sidebarSections

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/login')
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-brand-wrap">
          <div className="sidebar-logo-container">
            <img src={logo} alt="IIIT Lucknow Logo" className="sidebar-logo" />
            {!isCollapsed && (
              <div className="sidebar-brand-text">
                <h1 className="sidebar-brand">IIIT Lucknow</h1>
                <p className="sidebar-subtitle">Mess Management System</p>
              </div>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="sidebar-collapse-toggle d-none d-lg-inline-flex"
              onClick={onToggleCollapse}
              aria-expanded={!isCollapsed}
              aria-label="Toggle sidebar"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              className="sidebar-close d-lg-none"
              onClick={onClose}
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>
        </div>

        <div className="sidebar-scroll">
          {visibleSections.map((section) => (
            <div className="sidebar-section" key={section.title}>
              <p className="sidebar-section-title">{section.title}</p>
              <nav className="sidebar-nav">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon] || FiBox
                  const isDisabled = item.path === '#'
                  const isActive = currentPath === item.path

                  if (isDisabled) {
                    return (
                      <span
                        className={`sidebar-link muted ${isActive ? 'active' : ''}`}
                        key={item.label}
                        title={item.label}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </span>
                    )
                  }

                  return (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={({ isActive: navActive }) =>
                        `sidebar-link ${navActive ? 'active' : ''}`
                      }
                      title={item.label}
                      onClick={onClose}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          {/* Designed & Developed by Section with logos in one line */}
          {!isCollapsed && (
            <div className="sidebar-credits">
              {/* Logos in one row */}
              <div className="credits-content">
                <span className="credits-label">Designed & Developed by</span>
              </div>
              <div className="credits-logos">
                <a href="https://aayaninfotech.com/" target="_blank" rel="noopener noreferrer" className="credit-logo-link">
                  <img src={aayanlogo} alt="Aayan Infotech" className="credit-logo aayan-logo" />
                </a>
                <img src={makeinindia} alt="Make in India" className="credit-logo makeinindia-logo" />
              </div>
              
            </div>
          )}
          
          {/* Collapsed version - only icons */}
          {isCollapsed && (
            <div className="sidebar-credits-collapsed" title="Designed & Developed by AI Aayan Infotech | Made in India">
              <img src={aayanlogo} alt="Aayan" className="collapsed-logo" />
              <img src={makeinindia} alt="Made in India" className="collapsed-logo" />
            </div>
          )}
          
          <div className="sidebar-user">
            <div className="avatar avatar-sm">{getInitials(currentUser?.name)}</div>
            {!isCollapsed && (
              <div className="sidebar-user-copy">
                <h6>{currentUser?.name || 'Mess Admin'}</h6>
                <p>{currentUser?.email || 'admin@iiitl.ac.in'}</p>
              </div>
            )}
            <button
              type="button"
              className="sidebar-logout-button"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
            >
              <FiLogOut className="sidebar-footer-icon" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar