import { useState } from 'react'
import { saveCredentials } from '../../utils/localStorage'
import { validateCredentials } from '../../services/github'

function TokenInstructions() {
  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Create a GitHub Personal Access Token</h3>
      <ol className="list-decimal list-inside space-y-2 text-gray-600">
        <li>Go to GitHub Settings → Developer Settings → <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Personal Access Tokens</a> → Tokens (classic)</li>
        <li>Click "Generate new token (classic)"</li>
        <li>Give your token a descriptive name</li>
        <li>For scopes, select:
          <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
            <li><code className="bg-gray-100 px-1 rounded">repo</code> (Full control of private repositories)</li>
            <li>This is required to access both public and private repository issues</li>
          </ul>
        </li>
        <li>Click "Generate token"</li>
        <li>Copy your token immediately - you won't be able to see it again!</li>
      </ol>
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
        <strong>Important:</strong> Keep your token secure and never commit it to version control. The app stores it locally and only uses it to make authenticated requests to GitHub's API.
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
