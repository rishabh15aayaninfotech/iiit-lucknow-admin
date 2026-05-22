import { useState } from 'react'
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../components/feedback/ToastProvider'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/IIITL_logo.png'
import aayanlogo from '../../assets/aayanlogo.png'
import makeinindia from '../../assets/makeinindia.png'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const toast = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    
    // IIIT Lucknow Mess Admin Credentials
    const { email, password } = formData
    
    // Demo credentials
    if (email === 'messadmin@iiitl.ac.in' && password === 'mess2026') {
      const userData = {
        token: 'iiitl-mess-token-2026',
        user: {
          email: email,
          name: 'Mess Administrator',
          role: 'admin',
          institute: 'IIIT Lucknow',
          department: 'Mess Management'
        }
      }
      login(userData)
      toast.success('Welcome to IIIT Lucknow Mess Management System!', 'Login successful')
      navigate('/dashboard')
    } else {
      toast.error('Invalid credentials. Use messadmin@iiitl.ac.in / mess2026', 'Login failed')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-panel">
          <div className="login-copy">
            <span className="eyebrow">IIIT Lucknow</span>
            <h1>Mess Management<br />Administrative Portal</h1>
            <div className="login-highlights">
              <div>
                <strong>Meal Tracking</strong>
                <span>Real-time booking vs consumption</span>
              </div>
              <div>
                <strong>Wastage Analysis</strong>
                <span>AI-powered reduction insights</span>
              </div>
            </div>
          </div>

          <form className="login-card" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <img src={logo} alt="IIIT Lucknow Logo" style={{ maxWidth: 120, height: 'auto' }} />
            </div>

            <label className="login-field">
              <span>Email Address</span>
              <div className="login-input-wrap">
                <FiMail />
                <input
                  type="email"
                  name="email"
                  placeholder="messadmin@iiitl.ac.in"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, email: event.target.value }))
                  }
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            <label className="login-field">
              <span>Password</span>
              <div className="login-input-wrap">
                <FiLock />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, password: event.target.value }))
                  }
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-visibility-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </label>

            <button type="submit" className="login-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Authenticating...' : 'Access Mess Dashboard'}</span>
              <FiArrowRight />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <div className="footer-left">
            <span>© {new Date().getFullYear()} IIIT Lucknow. All rights reserved.</span>
          </div>
          <div className="footer-right">
            <span>Designed & Developed by</span>
            <strong><a href="https://aayaninfotech.com/" target="_blank" rel="noopener noreferrer"><img src={aayanlogo} alt="Aayan Logo" /></a></strong>
            <span className="india-logo"><img src={makeinindia} alt="Make in India" /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage