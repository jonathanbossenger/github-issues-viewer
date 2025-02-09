const CACHE_KEY = 'github_issues_cache'

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
