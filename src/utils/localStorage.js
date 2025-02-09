// localStorage utilities will go here 

const STORAGE_KEY = 'github_credentials'

export const saveCredentials = (username, pat) => {
  const credentials = {
    username,
    pat,
    timestamp: new Date().getTime()
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(credentials))
}

export const getCredentials = () => {
  const credentials = sessionStorage.getItem(STORAGE_KEY)
  if (!credentials) return null
  return JSON.parse(credentials)
}

export const clearCredentials = () => {
  sessionStorage.removeItem(STORAGE_KEY)
}

export const hasValidCredentials = () => {
  const credentials = getCredentials()
  return credentials !== null && credentials.username && credentials.pat
} 
