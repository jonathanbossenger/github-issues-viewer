# GitHub Issues Viewer Requirements

## Overview
A single page application that displays all GitHub issues assigned to the authenticated user, grouped by repository. Users can view issue details and click through to the full issue on GitHub.

## Technical Stack
- **Frontend Framework**
  - React 18.2
  - Vite 5.0 for build tooling and development server
- **Styling**
  - Tailwind CSS 3.4 for utility-first styling
  - PostCSS for processing CSS
  - Autoprefixer for browser compatibility
- **HTTP Client**
  - Axios 1.6 for API requests
- **Development Tools**
  - ESLint 9.19 for code linting
  - React specific ESLint plugins
    - eslint-plugin-react
    - eslint-plugin-react-hooks
    - eslint-plugin-react-refresh
- **Node Requirements**
  - Node.js >= 18.0.0

## Authentication
- Authentication via GitHub Personal Access Token (PAT) and username
- Credentials to be stored securely in sessionStorage:
  - GitHub username
  - Personal Access Token
- Token requires `repo` scope for accessing private repositories
- Login form interface with:
  - Username input field
  - PAT input field
  - Loading state during validation
  - Error messages for invalid credentials
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
     - Truncated to 2 lines with ellipsis
   - Display full description in a popup on hover
     - Maximum width of 400px
     - Reduced font size for better content density
     - Full height to accommodate content
     - Position relative to mouse/card to prevent overflow
   - Display relevant metadata (labels, creation date)
     - Labels with original GitHub colors
     - Labels truncated with tooltips if too long
     - Date formatted in localized format
   - Clickable issues that link to GitHub (opens in new tab)
   - Repository names are clickable links
     - Open GitHub repository issues page in new tab
     - Pre-filtered to show open issues assigned to user
     - Hover effect with blue color

2. **Layout**
   - Responsive grid layout
     - 1 column on mobile
     - 2 columns on medium screens
     - 3 columns on large screens
     - 4 columns on extra-large screens
     - 5 columns on 2xl screens
   - Full-width dashboard design
   - Repository panels with consistent height
   - Scrollable issue lists within panels
   - Compact spacing for better content density

3. **Data Management**
   - Fetch issues using GitHub GraphQL API
     - Search-based query for accurate filtering
     - Limited to 100 issues per request
     - Only fetch open issues assigned to user
   - Cache results to handle rate limits
   - Manual refresh via browser refresh only
   - Error handling for failed requests

## Technical Architecture

### Component Structure
  src/
    components/
      IssueList/        # Main grid layout and data handling
      IssueCard/        # Individual issue display with hover
      RepositoryGroup/  # Repository panel with issue list
      LoginForm/        # Authentication handling
    services/
      github.js         # GraphQL query handling
      dataManager.js    # Data processing and caching
    utils/
      localStorage.js   # Credential management
      cache.js         # Session-based data caching
    App.js             # Main application component

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
- sessionStorage for credentials:
  - GitHub username
  - Personal Access Token
- Cache for API responses
  - Session-only cache (cleared when browser closes)
  - Clear cache on manual refresh
  - Clear cache on authentication failure

## UI/UX Requirements
1. **Login Form**
   - Clean, centered layout
   - Clear input form for username and PAT
   - Secure credential handling
   - Loading state during validation
   - Error message display
   - Success redirect to main app

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
       - Truncate long names with tooltip
   - Clean, readable layout
   - Clear repository grouping

3. **Issue Details**
   - Title with 2-line truncation
   - Full description shown in hover popup
   - Labels with original GitHub colors
   - Creation date in localized format
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
- Empty state handling for no issues

## Future Enhancements (Optional)
- Filter issues by label
- Search functionality
- Sort options
- Dark mode support
- Issue status updates
- Mark issues as read/unread
- Keyboard shortcuts and accessibility features
