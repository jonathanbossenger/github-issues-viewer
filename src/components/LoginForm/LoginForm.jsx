import { useState } from 'react'
import { saveCredentials } from '../../utils/localStorage'
import { validateCredentials } from '../../services/github'

function TokenInstructions() {
  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Create a GitHub Personal Access Token</h3>
      <ol className="list-decimal list-inside space-y-2 text-gray-600">
        <li>Go to GitHub.com and sign in</li>
        <li>Click your profile picture → <strong>Settings</strong></li>
        <li>Scroll to <strong>Developer settings</strong> (bottom of left sidebar)</li>
        <li>Click <strong>Personal access tokens</strong> → <strong>Fine-grained tokens</strong></li>
        <li>Click <strong>Generate new token</strong></li>
        <li>Configure your token:
          <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>Set a token name (e.g., "GitHub Issues Viewer")</li>
            <li>Choose an expiration date</li>
            <li>Under "Repository access" select "All repositories"</li>
            <li>Under "Permissions" expand "Repository permissions"</li>
            <li>Find "Issues" and set it to "Read-only"</li>
          </ul>
        </li>
        <li>Click <strong>Generate token</strong> at the bottom</li>
        <li>Copy your new token immediately (you won't see it again!)</li>
      </ol>
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
        <strong>Note:</strong> Your token is like a password. Never share it or commit it to version control.
      </div>
    </div>
  )
}

function LoginForm({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: '',
    pat: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await validateCredentials(credentials.username, credentials.pat)
      saveCredentials(credentials.username, credentials.pat)
      onLoginSuccess()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              GitHub Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="pat" className="block text-gray-700 text-sm font-bold mb-2">
              Personal Access Token
            </label>
            <input
              type="password"
              id="pat"
              name="pat"
              value={credentials.pat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Validating...' : 'Login'}
          </button>
        </form>
      </div>
      <TokenInstructions />
    </div>
  )
}

export default LoginForm 
