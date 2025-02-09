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
      className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 relative"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Created: {formattedDate}</span>
          {labels.nodes.length > 0 && (
            <div className="flex gap-2">
              {labels.nodes.map(label => (
                <span
                  key={label.id}
                  className="px-2 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: `#${label.color}`,
                    color: parseInt(label.color, 16) > 0xffffff / 2 ? '#000' : '#fff'
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
      {showDescription && body && (
        <div className="absolute z-10 left-full ml-2 top-0 w-[600px] bg-white p-4 rounded-md shadow-lg border border-gray-200 text-sm">
          <div className="prose max-w-none">{body}</div>
        </div>
      )}
    </div>
  )
}

export default IssueCard 
