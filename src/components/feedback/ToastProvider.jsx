import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'

const ToastContext = createContext(null)

const iconMap = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
}

let toastSequence = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((options) => {
    const id = `toast-${toastSequence++}`
    const nextToast = {
      id,
      title: options.title,
      message: options.message,
      tone: options.tone || 'info',
    }

    setToasts((current) => [...current, nextToast])

    window.setTimeout(() => {
      removeToast(id)
    }, 3500)
  }, [removeToast])

  const value = useMemo(
    () => ({
      showToast,
      success: (message, title = 'Success') => showToast({ tone: 'success', title, message }),
      error: (message, title = 'Something went wrong') => showToast({ tone: 'error', title, message }),
      info: (message, title = 'Info') => showToast({ tone: 'info', title, message }),
    }),
    [showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => {
          const Icon = iconMap[toast.tone] || FiInfo

          return (
            <div key={toast.id} className={`toast-card ${toast.tone}`}>
              <div className="toast-card-icon">
                <Icon />
              </div>
              <div className="toast-card-copy">
                <strong>{toast.title}</strong>
                <span>{toast.message}</span>
              </div>
              <button
                type="button"
                className="toast-close"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
              >
                <FiX />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}
