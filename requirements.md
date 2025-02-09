# GitHub Issues Viewer Requirements

## Overview
A single page application that displays all GitHub issues assigned to the authenticated user, grouped by repository. Users can view issue details and click through to the full issue on GitHub.

## Authentication
- Authentication via GitHub Personal Access Token (PAT) and username
- Credentials to be stored securely in localStorage:
  - GitHub username
  - Personal Access Token
- Token requires `repo` scope for accessing private repositories
- Login form interface with:
  - Username input field
  - PAT input field
- Validate credentials by attempting API call
  - Show error message if API call fails
  - Save credentials if API call succeeds
- Prompt for new credentials if:
  - Current token expires
  - Current token is deleted from GitHub
  - API calls return authentication errors

## Core Features
1. **Issue Display**
   - Group issues by repository
     - Sort repositories alphabetically by name
     - Only show repositories with assigned issues
     - Show issue count per repository
     - Display issues in chronological order by creation date
   - Show issue title in card
   - Display full description in a popup on hover
     - Maximum width of 600px
     - Reduced font size for better content density
     - Full height to accommodate content
     - Position relative to mouse/card to prevent overflow
   - Display relevant metadata (labels, creation date)
   - Clickable issues that link to GitHub (opens in new tab)

2. **Data Management**
   - Fetch issues using GitHub GraphQL API
   - Cache results to handle rate limits
   - Manual refresh via browser refresh only
   - Error handling for failed requests

## Technical Architecture

### Component Structure
  src/
    components/
      IssueList/
      IssueCard/
      RepositoryGroup/
      LoginForm/
    services/
      github.js    # GraphQL query handling
    utils/
      localStorage.js
    App.js

### API Integration
- GraphQL endpoint: https://api.github.com/graphql
- Rate limit handling
  - Check rate limit before making requests
  - Prevent new requests when limit reached
- Error handling for:
  - Invalid credentials
  - Authentication failures
  - Network failures
  - API limits

### Storage
- localStorage for credentials:
  - GitHub username
  - Personal Access Token
- Cache for API responses
  - Session-only cache (cleared when browser closes)
  - Clear cache on manual refresh
  - If rate limit remaining is below 10%, serve cached data

## UI/UX Requirements
1. **Login Form**
   - Clear input form for username and PAT
   - Secure credential handling

2. **Issue List**
   - Full screen dashboard layout
   - Display all issues without pagination
   - Responsive repository panels
     - Auto-arrange panels to fit screen width
     - Allow vertical scrolling for overflow
     - Maintain readability on smaller screens
     - Repository name as prominent header
       - Larger/bolder text than issue content
       - Include issue count
       - Allow text wrapping for long names
   - Clean, readable layout
   - Clear repository grouping

3. **Issue Details**
   - Title
   - Full description shown in hover popup
   - Labels
   - Creation date
   - Link to full issue (opens in new tab)

4. **Loading States**
   - During initial authentication
   - While fetching issues after successful login
   - When refreshing data via browser refresh
   - Loading indicator should be non-intrusive but clear

## Error Handling
- Invalid/expired credential handling
  - Clear stored username and PAT
  - Show login form
  - Display clear error message
- Network error handling
- Fallback UI for component failures
- Clear user feedback for all error states

## Future Enhancements (Optional)
- Filter issues by label
- Search functionality
- Sort options
- Dark mode support
- Issue status updates
- Mark issues as read/unread
- Keyboard shortcuts and accessibility features
