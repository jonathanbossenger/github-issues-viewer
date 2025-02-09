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

export const fetchUserIssues = async (pat) => {
  try {
    const client = createGitHubClient(pat)
    const query = `
      query {
        viewer {
          login
          issues(first: 100, states: OPEN) {
            nodes {
              id
              title
              body
              url
              createdAt
              labels(first: 10) {
                nodes {
                  id
                  name
                  color
                }
              }
              repository {
                id
                nameWithOwner
                name
                url
                owner {
                  login
                }
              }
            }
          }
        }
      }
    `
    
    const response = await client.post('', { query })

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message)
    }

    return response.data.data
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Authentication failed')
    }
    throw error
  }
}

// GitHub API service will go here 
