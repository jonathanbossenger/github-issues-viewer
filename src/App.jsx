import { useState, useEffect } from 'react'
import { hasValidCredentials } from './utils/localStorage'
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">GitHub Issues Viewer</h1>
      {isAuthenticated ? (
        <IssueList />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App
