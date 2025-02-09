import { useState } from 'react'
import { saveCredentials } from '../../utils/localStorage'
import { validateCredentials } from '../../services/github'

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
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
  )
}

export default LoginForm 
