import IssueCard from '../IssueCard/IssueCard'

function RepositoryGroup({ repository }) {
  const { nameWithOwner, issues, viewerLogin } = repository
  const issuesUrl = `https://github.com/${nameWithOwner}/issues?q=is%3Aissue+state%3Aopen+assignee%3A${viewerLogin}`

  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <a 
          href={issuesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-gray-800 hover:text-blue-600 truncate"
          title={`View all issues assigned to you in ${nameWithOwner}`}
        >
          {nameWithOwner}
        </a>
        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm flex-shrink-0 ml-2">
          {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
        </span>
      </div>
      <div className="space-y-2 flex-grow overflow-y-auto max-h-[calc(100vh-14rem)]">
        {issues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}

export default RepositoryGroup 
