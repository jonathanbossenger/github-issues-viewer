# GitHub Issues Viewer

A dashboard for viewing GitHub issues assigned to you across all your repositories. Built with React and powered by GitHub's GraphQL API.

![License](https://img.shields.io/badge/license-GPL--2.0--or--later-blue.svg)

## Description

GitHub Issues Viewer is a single-page application that provides a clean, organized view of all GitHub issues assigned to you. Features include:

- **Repository-based Grouping**: Issues are automatically grouped by repository and sorted alphabetically
- **Real-time Issue Details**: View issue descriptions and labels without leaving the dashboard
- **Responsive Layout**: Adapts seamlessly from mobile to large desktop displays
- **Quick Access**: Direct links to GitHub issues and repository views
- **Smart Caching**: Session-based caching to handle API rate limits efficiently

## Live Demo

Try out the application at [https://jonathanbossenger.github.io/github-issues-viewer/](https://jonathanbossenger.github.io/github-issues-viewer/). See the [Authentication](#authentication) section for instructions on how to use it.

## How to Use

### Prerequisites

- Node.js >= 18.0.0
- A GitHub Personal Access Token with `repo` scope
- Your GitHub username

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-issues-viewer.git
   cd github-issues-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Authentication

This app requires a GitHub Classic Personal Access Token (PAT) to function. Follow these steps to create one:

1. Go to GitHub Settings > **Developer Settings > [Personal Access Tokens](https://github.com/settings/tokens) > Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give your token a descriptive name
4. For scopes, select:
   - `repo` (Full control of private repositories)
   This is required to access both public and private repository issues
5. Click **Generate token**
6. Copy your token immediately - you won't be able to see it again!

**Important**: Keep your token secure and never commit it to version control. The app stores it locally and only uses it to make authenticated requests to GitHub's API.

On the login screen:
- Enter your GitHub username
- Enter your Personal Access Token
- Click **Login**

### Using the Dashboard

- **View Issues**: All issues assigned to you are automatically displayed and grouped by repository
- **Issue Details**: Hover over an issue to view its full description
- **Repository Links**: Click repository names to view all your assigned issues for that repository on GitHub
- **Issue Links**: Click any issue to open it directly on GitHub
- **Refresh Data**: Simply refresh your browser to fetch the latest issues

## Technical Requirements

### Core Dependencies
- React 18.2
- Vite 5.0
- Tailwind CSS 3.4
- Axios 1.6

### Development Tools
- ESLint 9.19
- PostCSS
- Autoprefixer

For a complete list of dependencies, see `package.json`.

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run tests and linting:
   ```bash
   npm run lint
   ```
5. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request

Please ensure your PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

## License

This project is licensed under the GNU General Public License v2.0 or later - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [GitHub's GraphQL API](https://docs.github.com/en/graphql)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
