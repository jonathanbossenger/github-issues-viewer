import { useState } from 'react'

function IssueCard({ issue }) {
  const [showDescription, setShowDescription] = useState(false)
  const { title, body, url, createdAt, labels } = issue

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div 
      className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 relative group"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <div className="flex flex-col gap-2 text-xs text-gray-500">
          <span>{formattedDate}</span>
          {labels.nodes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {labels.nodes.map(label => (
                <span
                  key={label.id}
                  className="px-1.5 py-0.5 rounded-full text-xs truncate max-w-[120px]"
                  style={{
                    backgroundColor: `#${label.color}`,
                    color: parseInt(label.color, 16) > 0xffffff / 2 ? '#000' : '#fff'
                  }}
                  title={label.name}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
      {showDescription && body && (
        <div className="absolute z-10 left-full ml-2 top-0 w-[400px] bg-white p-4 rounded-md shadow-lg border border-gray-200 text-sm">
          <div className="prose prose-sm max-w-none">{body}</div>
        </div>
      )}
    </div>
  )
}

export default IssueCard 
