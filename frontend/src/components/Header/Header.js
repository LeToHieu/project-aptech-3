import React from 'react'
import logo from '../../assets/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
const Header = () => {
  return (
    <div className='header h-[11vh]'>
      <div className="wrapper px-10 py-5 flex gap-2 justify-between items-center">
        <div className='start flex items-center gap-5'>
          <label htmlFor="toggle">
            <MenuIcon fontSize="large" />
          </label>
          <img src={logo} alt="" className='w-[100px] h-[40px]' />
        </div>
        <div className="center">
          <div className="search flex items-center gap-5 px-5 py-2 border border-gray-400 rounded-lg">
            <input type="text" placeholder='Search' className='border-none outline-none w-[500px]  '/>
            <SearchIcon fontSize="medium" />
          </div>
        </div>
        <div className="end">
          <button className='p-2 flex items-center gap-2 text-blue-400 rounded-lg shadow-lg shadow-blue-500/50'>
            <PersonIcon />
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header