import React from 'react'
import { NavLink } from 'react-router-dom'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
const Card = () => {
  return (
      <div className='p-3'>
        <NavLink>
          <div className='w-full h-[200px] rounded-xl mb-4 overflow-hidden relative'>
              <img src="https://framerusercontent.com/images/iX7dUlRI1KCdI731guMFo6y3iUw.png?scale-down-to=512" 
              className='w-full h-full' alt="" />
              <span className='absolute bottom-0 right-0 px-2 py-1 bg-black text-white text-xs'>1:56:19</span>
          </div>
          <div className='flex gap-2'>
            <img src="https://framerusercontent.com/images/iX7dUlRI1KCdI731guMFo6y3iUw.png?scale-down-to=512" 
                 className='w-10 h-10 rounded-full' alt="" />
            <div>
              <div className='text text-sm font-semibold'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, nobis. Enim aut vero, nisi a quibusdam accusamus odio explicabo sed.  
              </div>
              <p className='text-xs mt-1'>Vie Channel </p>
              <p  className='flex items-center gap-1 text-xs'>1 Tr lượt xem <span className='rounded-full block w-1 h-1 bg-gray-500'></span> 6 ngày trước </p>
            </div>            
          </div>          
        </NavLink>
      </div>
  )
}

export default Card