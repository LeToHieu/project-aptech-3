import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Menu from '../components/Menu/Menu'
import Tag from '../components/Tag/Tag'
import Card from '../components/Card/Card'

const Home = () => {
  const [toggle, setToggle] = useState(false)
  const handleClick = (e) => {
    console.log(e.target.checked);
    setToggle(e.target.checked)
  }
  return (
    <>
      <Header />
      <input type="checkbox" id='toggle' onClick = {(e) => handleClick(e)} />
      <div className='home flex h-[89vh]'>
        <Menu />
        <div className="home-container flex-[5] py-5 pl-5 pr-1">
          <div className="top flex gap-5 h-[6%]">
            <Tag title="Tất cả" />
            <Tag title="Âm nhạc" />
            <Tag title="Trò chơi" />
            <Tag title="Hoạt họa" />
            <Tag title="Đã xem" />
            <Tag title="Đề xuất mới" />
          </div>
          <div className="bottom mt-[2%] h-[92%]">
            <div className={`list py-2 grid gap-2 ${toggle ? 'grid-cols-4' : 'px-10 grid-cols-3'} h-[100%] overflow-auto`}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home