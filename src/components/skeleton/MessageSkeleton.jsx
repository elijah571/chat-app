import React from 'react'

const MessageSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex items-center gap-3'>
        <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-4 w-32"></div>
        </div>
      </div>
      <div className='flex items-center gap-3 justify-end'>
        <div className="flex flex-col gap-2 w-full max-w-xs items-end">
          <div className="skeleton h-4 w-40"></div>
        </div>
        <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
      </div>
    </div>
  )
}

export default MessageSkeleton;
