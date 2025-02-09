import { useState, useEffect } from 'react'
import { fetchIssues } from '../../services/dataManager'
import { shouldRefreshData } from '../../utils/cache'
import RepositoryGroup from '../RepositoryGroup/RepositoryGroup'

function IssueList({ onAuthFailure }) {
  const [repositories, setRepositories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastRefreshTime, setLastRefreshTime] = useState(null)

  useEffect(() => {
    loadIssues()
  }, [])

  const loadIssues = async (forceFresh = false) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchIssues(forceFresh)
      setRepositories(data)
      setLastRefreshTime(new Date().getTime())
    } catch (err) {
      setError(err.message)
      if (err.message === 'Authentication failed' || err.message === 'No credentials found') {
        onAuthFailure()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const canRefresh = shouldRefreshData()

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
    <div>
      <div className="flex flex-col items-center mb-4 px-4 space-y-2">
        <div className="text-sm text-gray-600">
          {lastRefreshTime && (
            <span>
              Last updated: {new Date(lastRefreshTime).toLocaleTimeString()}
            </span>
          )}
        </div>
        {!canRefresh && (
          <div className="text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
            Please wait a moment before refreshing again
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mx-[-1rem] px-4">
        {repositories.map(repo => (
          <RepositoryGroup key={repo.id} repository={repo} />
        ))}
      </div>
    </div>
  )
}

export default IssueList 
