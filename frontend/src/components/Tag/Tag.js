import React from 'react'

const Tag = ({title}) => {
  return (
    <div className='shrink-0 py-2 px-5 w-fit max-sm:py-1 rounded-sm bg-gray-200 text-black text-[16px]'>
      {title}
    </div>
  )
}

export default Tag