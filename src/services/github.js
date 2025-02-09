import axios from 'axios'

const GITHUB_API = 'https://api.github.com/graphql'

const createGitHubClient = (pat) => {
  return axios.create({
    baseURL: GITHUB_API,
    headers: {
      'Authorization': `Bearer ${pat}`,
      'Content-Type': 'application/json',
    }
  })
}

export const validateCredentials = async (username, pat) => {
  try {
    const client = createGitHubClient(pat)
    const query = `
      query ValidateUser($username: String!) {
        user(login: $username) {
          login
        }
      }
    `
    
    const response = await client.post('', {
      query,
      variables: { username }
    })

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message)
    }

    const user = response.data.data.user
    if (!user || user.login.toLowerCase() !== username.toLowerCase()) {
      throw new Error('Invalid username')
    }

    return true
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid Personal Access Token')
    }
    throw error
  }
}

// GitHub API service will go here 
