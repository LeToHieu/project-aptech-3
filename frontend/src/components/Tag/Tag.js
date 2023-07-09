import React from 'react'

const Tag = ({title}) => {
  return (
    <div className='py-2 px-5 w-max rounded-sm bg-gray-200 text-black text-[16px]'>
      {title}
    </div>
  )
}

export default Tag