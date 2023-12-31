import React from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { blue } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';
const Menu = () => {
  const location = useLocation().pathname.split('/')[1]
  return (
    <>
      <div className={`menu-1 lg:flex-2 pt-2 sm:w-fit min-[320px]:fixed  z-10 sm:h-[100%] mt-[11vh]
                      ${location === 'video' ? '' : 'lg:relative'}
                      bg-black border-r-[0.2px] border-gray-500
                  `}>
        <ul className='sm:px-4 mt-2 min-[320px]:px-3'>
          <NavLink to='/'>
            <li className='item hover:bg-gray-300 flex gap-5 sm:px-4 sm:py-3 text-lg rounded-lg'>
              <HomeIcon sx={{ color: blue[500] }} />
              <span className={`text-[14px] text-hidden
                            text-white
                          `}>Trang chủ</span>
            </li>
          </NavLink>
          <NavLink to='/music'>
            <li className='item hover:bg-gray-300 flex gap-5 sm:px-4 sm:py-3 text-lg rounded-lg '>
              <MusicNoteOutlinedIcon sx={{ color: blue[500] }} />
              <span className={`text-[14px] text-hidden
                            text-white
                          `}>Âm nhạc</span>
            </li>
          </NavLink>
          <NavLink to='/album'>
            <li className='item hover:bg-gray-300 flex gap-5 sm:px-4 sm:py-3 text-lg rounded-lg'>
              <VideoLibraryOutlinedIcon sx={{ color: blue[500] }} />
              <span className={`text-[14px] text-hidden
                            text-white
                          `}>Album</span>
            </li>
          </NavLink>
        </ul>
        <hr className='my-2 border-gray-500 min-w-fit' />
        <ul className='sm:px-4 mt-2 min-[320px]:px-3'>
          <li className='item hover:bg-gray-300 flex gap-5 sm:px-4 sm:py-3 text-lg rounded-lg'>
            <ArticleOutlinedIcon sx={{ color: blue[500] }} />
            <span className={`text-[14px] text-hidden
                            text-white
                          `}>Tin tức</span>
          </li>
        </ul>
      </div>
      <div className={`${location === 'video' ? 'hidden' : 'lg:block min-[320px]:hidden z-10 sm:h-[100%] mt-[11vh] pt-2'}
                    bg-black
                      `}>
        <div className="menu-2">
          <ul className=' mt-2'>
            <NavLink to='/'>
              <li className='item ml-1 hover:bg-gray-300 flex flex-col items-center gap-1 px-2 py-3 text-lg rounded-lg'>
                <HomeIcon sx={{ color: blue[500] }} className='' />
                <span className={`text-[10px] text-white`}>Trang chủ</span>
              </li>
            </NavLink>
            <NavLink to='/music'>
              <li className='item ml-1 hover:bg-gray-300 flex flex-col items-center gap-1 px-2 py-1 text-lg rounded-lg '>
                <MusicNoteOutlinedIcon sx={{ color: blue[500] }} />
                <span className={`text-[10px] text-white`}>Âm nhạc</span>
              </li>
            </NavLink>
            <NavLink to='/album'>
              <li className='item ml-1 hover:bg-gray-300 flex flex-col items-center gap-1 px-2 py-3 text-lg rounded-lg'>
                <VideoLibraryOutlinedIcon sx={{ color: blue[500] }} />
                <span className={`text-[10px] text-white`}>Album</span>
              </li>
            </NavLink>
            <li className='item ml-1 hover:bg-gray-300 flex flex-col items-center gap-1 px-2 py-3 text-lg rounded-lg'>
              <ArticleOutlinedIcon sx={{ color: blue[500] }} />
              <span className={`text-[10px] text-white`}>Tin tức</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Menu