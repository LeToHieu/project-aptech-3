import React from 'react'
import { NavLink } from 'react-router-dom'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import {format} from 'timeago.js'
import { useDispatch } from 'react-redux';
import { chooseVideo } from '../../redux/reducer/video';
const Card = ({video}) => {
  const url = "https://localhost:7023/resources/"
  const dispatch = useDispatch()
  const formatTime = time => {
    let seconds = Math.floor(time % 60)
    let minutes = Math.floor(time / 60) % 60
    let hours = Math.floor(time / 3600)
    
    seconds = seconds < 10 ? `0${seconds}` : seconds
    minutes = minutes < 10 ? `0${minutes}` : minutes
    hours = hours < 10 ? `0${hours}` : hours

    if (hours == 0) return `${minutes}:${seconds}`
    return `${hours}:${minutes}:${seconds}`
  }
  return (
      <div className='p-3'>
        <NavLink to={'video/' + video?.media.id} onClick={() => dispatch(chooseVideo(video))}>
          <div className='w-full h-[200px] rounded-xl mb-4 overflow-hidden relative'>
              <img src={url + video?.media.mediaImage} 
              className='w-full h-full' alt="" />
              <span className='absolute bottom-0 right-0 px-2 py-1 bg-black text-white text-xs'>{formatTime(video?.media.duration)}</span>
          </div>
          <div className='flex gap-2'>
            <img src={url + video?.artist.artistImage} 
                 className='w-10 h-10 rounded-full' alt="" />
            <div>
              <div className='text text-sm font-semibold'>
                {video?.media.mediaName}
              </div>
              <p className='text-xs mt-1'>{video?.artist.artistName} </p>
              <p  className='flex items-center gap-1 text-xs'>1 Tr lượt xem <span className='rounded-full block w-1 h-1 bg-gray-500'></span> {format(video?.media.createdAt)} </p>
            </div>            
          </div>          
        </NavLink>
      </div>
  )
}

export default Card