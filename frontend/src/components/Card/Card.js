import React from 'react'
import { NavLink } from 'react-router-dom'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import './Card.css';
import { format } from 'timeago.js'
import { useDispatch } from 'react-redux';
import { chooseVideo } from '../../redux/reducer/video';
const Card = ({ video }) => {
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
    <div className="relative">
      <NavLink to={'video/' + (video?.media?.id || '')} onClick={() => dispatch(chooseVideo(video))}>
        <div class="movie_card" id="tomb">
          <div class="info_section">
            <div class="movie_header">
              <h1 className='text text-sm font-semibold'>{video?.media?.mediaName}</h1>
              <h4 className='text-xs mt-1'>{video?.artist?.artistName}</h4>
              <span class="minutes">{formatTime(video?.media?.duration)}</span>
              <p class="type">{format(video?.media?.createdAt)}</p>
            </div>
          </div>
          <div class="blur_back" style={{ backgroundImage: `url(${url + video?.media?.mediaImage})` }}></div>
        </div>
      </NavLink>
      <button className="absolute left-10 mb-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
        {/* <i className="material-icons mr-2"></i> */}
        Đặt hàng
      </button>
    </div>
  )
}

export default Card