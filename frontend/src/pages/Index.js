import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Menu from '../components/Menu/Menu'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <>
      <Header />
      <input type="checkbox" id='toggle'/>
      <div className='home flex h-[89vh]'>
        <Menu />
        <div className="home-container flex-[5] py-5 pl-5 pr-1 max-sm:pl-1 w-full mt-[11vh]">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Index