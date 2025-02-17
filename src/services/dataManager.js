import { fetchUserIssues } from './github'
import { getCredentials, clearCredentials } from '../utils/localStorage'
import { saveToCache, getFromCache, clearCache, shouldRefreshData } from '../utils/cache'

export const fetchIssues = async (forceFresh = false) => {
  // Check if we should refresh based on rate limit
  const shouldRefresh = forceFresh || shouldRefreshData()
  
  // If we shouldn't refresh, return cached data
  const cache = getFromCache()
  if (cache && !shouldRefresh) {
    return cache.data
  }

  // Get fresh data
  const credentials = getCredentials()
  if (!credentials) {
    throw new Error('No credentials found')
  }

  try {
    const response = await fetchUserIssues(credentials.pat, credentials.username)
    const issues = response.search.nodes
    
    // Group issues by repository
    const groupedIssues = issues.reduce((acc, issue) => {
      const repoName = issue.repository.nameWithOwner
      if (!acc[repoName]) {
        acc[repoName] = {
          id: issue.repository.id,
          name: issue.repository.name,
          nameWithOwner: repoName,
          viewerLogin: credentials.username,
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
  } catch (error) {
    if (error.message === 'Authentication failed') {
      clearCredentials()
      clearCache()
    }
    throw error
  }
} 
