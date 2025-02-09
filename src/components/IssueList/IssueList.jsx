import { useState, useEffect } from 'react'
import { fetchIssues } from '../../services/dataManager'
import RepositoryGroup from '../RepositoryGroup/RepositoryGroup'

function IssueList({ onAuthFailure }) {
  const [repositories, setRepositories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadIssues()
  }, [])

  const loadIssues = async (forceFresh = false) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchIssues(forceFresh)
      setRepositories(data)
    } catch (err) {
      setError(err.message)
      if (err.message === 'Authentication failed' || err.message === 'No credentials found') {
        onAuthFailure()
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading issues...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    )
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center text-gray-600 py-10">
        No issues found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {repositories.map(repo => (
        <RepositoryGroup key={repo.id} repository={repo} />
      ))}
    </div>
  )
}

export default IssueList 
