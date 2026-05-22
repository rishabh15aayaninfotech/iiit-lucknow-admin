import AppRouter from './app/AppRouter'
import { ToastProvider } from './components/feedback/ToastProvider'

function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  )
}

export default App
