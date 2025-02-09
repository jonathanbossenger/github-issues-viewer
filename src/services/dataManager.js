import { fetchUserIssues } from './github'
import { getCredentials } from '../utils/localStorage'
import { saveToCache, getFromCache, clearCache } from '../utils/cache'

export const fetchIssues = async (forceFresh = false) => {
  // Clear cache if force refresh
  if (forceFresh) {
    clearCache()
  }

  // Check cache first
  const cache = getFromCache()
  if (cache && !forceFresh) {
    return cache.data
  }

  // Get fresh data
  const credentials = getCredentials()
  if (!credentials) {
    throw new Error('No credentials found')
  }

  const issues = await fetchUserIssues(credentials.pat)
  
  // Group issues by repository
  const groupedIssues = issues.reduce((acc, issue) => {
    const repoName = issue.repository.nameWithOwner
    if (!acc[repoName]) {
      acc[repoName] = {
        id: issue.repository.id,
        name: issue.repository.name,
        nameWithOwner: repoName,
        issues: []
      }
    }
    acc[repoName].issues.push(issue)
    return acc
  }, {})

  // Sort repositories alphabetically
  const sortedRepos = Object.values(groupedIssues).sort((a, b) => 
    a.nameWithOwner.localeCompare(b.nameWithOwner)
  )

  // Sort issues by creation date within each repository
  sortedRepos.forEach(repo => {
    repo.issues.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  saveToCache(sortedRepos)
  return sortedRepos
} 
