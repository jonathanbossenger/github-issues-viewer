# GitHub Issues Viewer - Build Instructions

## Setup Phase

1. Create a new React project
   - Use Vite
   - Clean up default files and boilerplate code
   - Set up a basic CSS reset

2. Install necessary dependencies
   - React
   - A fetch library (axios)
   - Tailwind CSS

3. Set up project structure
   - Create the folders structure as defined in requirements
   - Create empty component files
   - Set up basic routing if needed

## Authentication Implementation

4. Create the LoginForm component
   - Create a form with username and PAT inputs
   - Style the form for clean presentation
   - Add basic form validation

5. Implement localStorage utilities
   - Create functions to save credentials
   - Create functions to retrieve credentials
   - Create functions to clear credentials

6. Set up GitHub API service
   - Create the basic GraphQL client setup
   - Implement authentication validation query
   - Add error handling for failed auth

## Core Functionality

7. Implement GitHub GraphQL query
   - Set up the issues query
   - Add error handling
   - Implement rate limit checking

8. Create data management layer
   - Implement session storage caching
   - Add cache clearing on refresh
   - Set up rate limit handling

9. Create RepositoryGroup component
   - Build the repository header
   - Implement issue count
   - Style for responsive layout

10. Create IssueCard component
    - Build the card layout
    - Implement hover functionality
    - Add metadata display
    - Set up GitHub link handling

11. Create IssueList component
    - Implement repository grouping
    - Sort repositories alphabetically
    - Handle responsive layout

## UI Implementation

12. Implement loading states
    - Add loading indicators for authentication
    - Add loading indicators for data fetching
    - Style loading states

13. Implement error handling
    - Add error boundaries
    - Create error messages
    - Style error states

14. Implement hover popup for descriptions
    - Create popup component
    - Handle positioning
    - Style description display

## Testing and Refinement

15. Test authentication flow
    - Test valid credentials
    - Test invalid credentials
    - Test token expiry

16. Test data display
    - Test with multiple repositories
    - Test with various issue counts
    - Test responsive layout

17. Test error scenarios
    - Test network failures
    - Test rate limit handling
    - Test invalid data responses

## Final Steps

18. Clean up and optimize
    - Remove console logs
    - Check for memory leaks
    - Optimize performance

19. Final testing
    - Cross-browser testing
    - Mobile responsiveness
    - Error scenarios

Each step should be completed and tested before moving to the next step. Commit your code frequently with clear commit messages. 
