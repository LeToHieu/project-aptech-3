import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux';
import Dropdown from '../dropdown/Dropdown'
const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false)
  const [search, setSearch] = useState("");
  const location = useLocation().pathname.split('/')[1]
  console.log(location);
  const handleLogin = () => {
    navigate("/login");
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    navigate("/search?" + search)
  }
  const {user} = useSelector(state => state.user)
  return (
    <>
    <div className={`header shadow-lg shadow-blue-500/50 z-20  pb-2 fixed w-full bg-black text-white`}>
      <div className="wrapper h-[11vh] px-10 flex gap-2 justify-between items-center max-[640px]:px-1">
        <div className='start flex items-center gap-5 max-[640px]:gap-0'>
          <label htmlFor="toggle" className='max-[640px]:hidden'>
            <MenuIcon fontSize="large" />
          </label>
          <label htmlFor="toggle" className='sm:hidden'>
            <MenuIcon fontSize="small" />
          </label>
          <img src={logo} alt="" className='w-[100px] h-[40px] max-[640px]:w-[50px]' />
        </div>
        <form action='' onSubmit={(e) => handleSearch(e)}>
        <div className="center flex-1 max-[640px]:hidden">
          <div className={`search flex items-center justify-center gap-5 px-5 py-2 border border-gray-400 rounded-lg mx-auto w-fit ${location !== 'music' ? 'bg-white' : ''}`}>
            <input type="text" placeholder='Search' className={`border-none outline-none w-[100%] text-black bg-inherit`} onChange={(e) => setSearch(e.target.value)}/>
              <SearchIcon fontSize="medium" color="primary" /> 
          </div>
        </div>
        </form>
        <div className="end flex items-center gap-2">
          <div className='sm:hidden'>
            <label htmlFor="search" onClick={() => setToggle(!toggle)}>
              <SearchIcon fontSize="medium" />
            </label>
          </div>
          {user ? 
          <>
            <Dropdown/> 
          </>
            :
          <button className='p-2 flex items-center gap-2 text-blue-400 rounded-lg shadow-lg shadow-blue-500/50 
            max-[640px]:gap-0
          '
          onClick={handleLogin}>
            <PersonIcon />
            <span className='max-[640px]:text-xs'>Đăng nhập</span>
          </button>
          }
        </div>
      </div>
      {toggle &&
          <div className='mt-2 pt-3 pb-3'>
            <form action="">
              <input type="text" placeholder='Search here' id='search' className='w-full outline-none px-2' />
            </form>
          </div>
      }
    </div>
    </>
  )
}

export default Header