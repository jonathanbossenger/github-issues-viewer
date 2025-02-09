import { useState, useEffect } from 'react'
import { hasValidCredentials, clearCredentials } from './utils/localStorage'
import { clearCache } from './utils/cache'
import LoginForm from './components/LoginForm/LoginForm'
import IssueList from './components/IssueList/IssueList'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(hasValidCredentials())
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleAuthFailure = () => {
    clearCredentials()
    clearCache()
    setIsAuthenticated(false)
  }

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">GitHub Issues Viewer</h1>
      {isAuthenticated ? (
        <IssueList onAuthFailure={handleAuthFailure} />
      ) : (
        <div className="max-w-md mx-auto">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </div>
  )
}

export default App
