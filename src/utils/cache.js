const CACHE_KEY = 'github_issues_cache'
const RATE_LIMIT_SECONDS = 30

export const saveToCache = (issues) => {
  const cache = {
    timestamp: new Date().getTime(),
    data: issues
  }
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache))
}

export const getFromCache = () => {
  const cache = sessionStorage.getItem(CACHE_KEY)
  if (!cache) return null
  return JSON.parse(cache)
}

export const clearCache = () => {
  sessionStorage.removeItem(CACHE_KEY)
}

export const shouldRefreshData = () => {
  const cache = getFromCache()
  if (!cache || !cache.timestamp) return true
  
  const now = new Date().getTime()
  const timeSinceLastRefresh = (now - cache.timestamp) / 1000 // Convert to seconds
  
  return timeSinceLastRefresh >= RATE_LIMIT_SECONDS
} 
