import IssueCard from '../IssueCard/IssueCard'

function RepositoryGroup({ repository }) {
  const { nameWithOwner, issues, viewerLogin } = repository
  const issuesUrl = `https://github.com/${nameWithOwner}/issues?q=is%3Aissue+state%3Aopen+assignee%3A${viewerLogin}`

  return (
    <div className="p-2 h-[500px]">
      <div className="bg-white rounded-lg shadow-lg flex flex-col border border-gray-300 h-full">
        <div className="p-3 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
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
        </div>
        <div className="px-3 pb-3 flex-grow overflow-hidden">
          <div className="space-y-2 overflow-y-auto h-full pr-1">
            {issues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepositoryGroup 
