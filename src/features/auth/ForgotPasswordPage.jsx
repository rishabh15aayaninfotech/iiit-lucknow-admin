import { useState } from 'react'
import { FiArrowLeft, FiCheckCircle, FiMail, FiSend } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('admin@arivelle.com')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="login-page">
      <div className="login-panel auth-panel">
        <div className="login-copy">
          <span className="eyebrow">Account Recovery</span>
          <h1>Reset your password</h1>
          <p>
            Enter the email address linked to your admin account and we&apos;ll send you a secure
            password reset link.
          </p>
          <div className="login-highlights">
            <div>
              <strong>Quick reset</strong>
              <span>Password recovery instructions sent instantly</span>
            </div>
            <div>
              <strong>Secure access</strong>
              <span>Use your inbox to verify and continue safely</span>
            </div>
          </div>
        </div>

        <form className="login-card" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="auth-success-state">
              <span className="auth-success-icon">
                <FiCheckCircle />
              </span>
              <div>
                <h2>Check your inbox</h2>
                <p className="login-subtitle">
                  We sent password reset instructions to <strong>{email}</strong>.
                </p>
              </div>
              <p className="login-hint">
                If you don&apos;t see the message soon, check your spam folder or try again with a
                different email address.
              </p>
              <button type="button" className="login-submit" onClick={() => setSubmitted(false)}>
                <FiSend />
                <span>Send Again</span>
              </button>
              <Link to="/login" className="auth-back-link">
                <FiArrowLeft />
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div>
                <h2>Forgot your password?</h2>
                <p className="login-subtitle">We&apos;ll email you a reset link.</p>
              </div>

              <label className="login-field">
                <span>Email</span>
                <div className="login-input-wrap">
                  <FiMail />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your work email"
                  />
                </div>
              </label>

              <button type="submit" className="login-submit">
                <span>Send Reset Link</span>
                <FiSend />
              </button>

              <Link to="/login" className="auth-back-link">
                <FiArrowLeft />
                Back to Login
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
