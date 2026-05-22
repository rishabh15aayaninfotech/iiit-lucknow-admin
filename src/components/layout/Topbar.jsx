import { useEffect, useRef, useState } from 'react'
import { FiBell, FiChevronDown, FiLogOut, FiMenu, FiMoon, FiSearch, FiSun, FiUser } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { topbarConfig } from '../../data/mockData'
import { useAuth } from '../../hooks/useAuth'

function Topbar({ onMenuClick, theme, onToggleTheme }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const currentConfig = topbarConfig[location.pathname] || topbarConfig['/dashboard']
  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/login')
  }

  const handleProfileClick = () => {
    setProfileOpen(false)
  }

  return (
    <header className="topbar">
      <div className="d-flex align-items-center gap-3">
        <button type="button" className="menu-button d-lg-none" onClick={onMenuClick}>
          <FiMenu />
        </button>
        <h2 className="page-title">{currentConfig.title}</h2>
      </div>

      <div className="topbar-actions">
        <div className="search-shell">
          <FiSearch className="search-icon" />
          <input type="text" placeholder={currentConfig.searchPlaceholder} />
        </div>
        <button type="button" className="top-icon-button">
          <FiBell />
          <span className="notification-dot" />
        </button>
        <button type="button" className="theme-pill" onClick={onToggleTheme} aria-label="Toggle theme">
          <span className={`theme-pill-knob ${theme === 'dark' ? 'dark' : ''}`}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </span>
        </button>
        <div className="profile-menu" ref={profileRef}>
          <button
            type="button"
            className={`profile-chip profile-trigger ${profileOpen ? 'open' : ''}`}
            onClick={() => setProfileOpen((current) => !current)}
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
          >
            <span className="avatar">MA</span>
            <FiChevronDown className="profile-trigger-icon" />
          </button>

          {profileOpen ? (
            <div className="profile-dropdown">
              {/* <button type="button" className="profile-dropdown-item" onClick={handleProfileClick}>
                <FiUser />
                <span>My Profile</span>
              </button> */}
              <button type="button" className="profile-dropdown-item danger" onClick={handleLogout}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Topbar
