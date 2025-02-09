import IssueCard from '../IssueCard/IssueCard'

function RepositoryGroup({ repository }) {
  const { nameWithOwner, issues } = repository

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {nameWithOwner}
        </h2>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
          {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
        </span>
      </div>
      <div className="space-y-4">
        {issues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}

export default RepositoryGroup 
