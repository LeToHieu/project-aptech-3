import React from 'react'
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
import { blue, grey } from '@mui/material/colors';
const Menu = () => {
  return (
    <>
    <div className='menu-1 flex-1'>
      <ul className='px-4 mt-2'>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <HomeIcon sx={{ color: blue[500] }} className='' />
          <span className='text-[16px] text-hidden'>Trang chủ</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 p-4 text-lg rounded-lg '>
          <BoltSharpIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Shorts</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <AppRegistrationSharpIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Kênh đăng ký</span>
        </li>
      </ul>
      <hr className='my-2 border-gray-500 min-w-fit' />
      <ul className='px-4 mt-2'>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <VideoLibraryOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Thư viện</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <TimerOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Video đã xem</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <WatchLaterOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Video xem sau</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <ThumbUpOffAltOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Video đã thích</span>
        </li>
      </ul>
      <hr className='my-2 border-gray-500 min-w-fit' />
      <ul className='px-4 mt-2'>
        <p>Khám phá</p>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <LocalFireDepartmentOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Thịnh hành</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <MusicNoteOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Âm nhạc</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <SportsEsportsOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Trò chơi</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <ArticleOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Tin tức</span>
        </li>
        <li className='item hover:bg-gray-300 flex gap-6 px-4 py-3 text-lg rounded-lg'>
          <EmojiEventsOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[16px] text-hidden'>Thể thao</span>
        </li>
        
      </ul>
    </div>
    <div className="menu-2">
    <ul className=' mt-2'>
        <li className='item ml-1 hover:bg-gray-300 flex flex-col items-center gap-1 px-2 py-3 text-lg rounded-lg'>
          <HomeIcon sx={{ color: blue[500] }} className='' />
          <span className='text-[10px]'>Trang chủ</span>
        </li>
        <li className='item ml-1 hover:bg-gray-300 flex flex-col items-center gap-1 px-2 py-1 text-lg rounded-lg '>
          <BoltSharpIcon sx={{ color: blue[500] }} />
          <span className='text-[10px]'>Shorts</span>
        </li>
        <li className='item ml-1 hover:bg-gray-300 flex flex-col items-center gap-1 px-2 py-3 text-lg rounded-lg'>
          <AppRegistrationSharpIcon sx={{ color: blue[500] }} />
          <span className='text-[10px]'>Kênh đăng ký</span>
        </li>
        <li className='item ml-1 hover:bg-gray-300 flex flex-col items-center gap-1 px-2 py-3 text-lg rounded-lg'>
          <VideoLibraryOutlinedIcon sx={{ color: blue[500] }} />
          <span className='text-[10px]'>Thư viện</span>
        </li>
      </ul>
    </div>
    </>
  )
}

export default Menu