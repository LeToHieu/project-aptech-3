import React from 'react'

const Tag = ({title}) => {
  return (
    <div className='shrink-0 py-1 px-1 w-fit max-sm:py-1 rounded-sm bg-gray-200 text-black text-[14px]'>
      {title}
    </div>
  )
}

export default Tag