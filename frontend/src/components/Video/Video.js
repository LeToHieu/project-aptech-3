import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import image from '../../assets/logo.png'
import vid from '../../assets/divenha.mp4'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import SettingsIcon from '@mui/icons-material/Settings';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { useDispatch, useSelector } from "react-redux";
import { chooseVideo, getList, playOrPause, showMute } from '../../redux/reducer/video';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

const Video = () => {
  const url = "https://localhost:7023/resources/"
  const id = useParams().id
  console.log(id);
  const { listVideos, isPlaying, video, isMute } = useSelector(state => state.video)
  const dispatch = useDispatch()
  useEffect(() => {
    async function loadVideos() {
      let { data } = await axios.get('/media', {
        headers: {
          "Content-Type": "application/json",
        }
      });
      data.medias = data.medias.filter(video => video.media.mediaUrl.includes("Videos"))
      dispatch(getList(data.medias))
    }
    loadVideos();
  }, []);
  useEffect(() => {
    async function getVideo() {
      let { data } = await axios.get('/media/' + id, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      dispatch(chooseVideo(data.media))
    }
    getVideo();
  }, [])
  console.log(url + video?.media.mediaUrl)
  return (
    <div className='flex gap-2 h-full pl-5'>
      <div className="left flex-[3]">
        <video src={url + video?.media.mediaUrl} controls width="1000" height="600"></video>
        <h3 className='my-5 text-[16px] font-semibold'>{video?.media.mediaName}</h3>
        <div className='flex gap-5 items-center'>
          <img src={url + video?.media.mediaImage}
            className='w-12 h-12 rounded-full'
          />
          <div>
            <p className='text-sm font-semibold mb-1'>{video?.artist.artistName} </p>
            <p className='flex items-center gap-1 text-xs'>10.5m Subcribe</p>
          </div>
          <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-black bg-white border-[1px] border-gray-400'>Mua ngay</button>
        </div>
        <div className="description p-5 bg-neutral-100 rounded-xl">
          <input type="checkbox" name='show-desc' id='show-desc' />
          <span className=' max-h-[100px] overflow-hidden block'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, quae!
          </span>
          <label htmlFor="show-desc" data-more="Show more" data-less="Show less" className='show relative text-center inline-block w-[150px] h-[50px]'>
          </label>
        </div>
        <div className='total mt-5 text-[16px]'>
          <p>1111 Comments</p>
        </div>
        <form action="" className='py-5'>
          <p className='text-sm'>Commenting as</p>
          <div className='flex items-center gap-5 my-2 mb-5'>
            <img src="https://framerusercontent.com/images/iX7dUlRI1KCdI731guMFo6y3iUw.png?scale-down-to=512" className='w-12 h-12 rounded-full' />
            <p>Name</p>
          </div>
          <input type="text" placeholder='Add a comment' className='w-full outline-none' />
          <div className='my-3 text-right'>
            <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-black bg-white shadow-lg  shadow-gray-300'>Cancel</button>
            <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-white bg-blue-400 shadow-lg  shadow-blue-500'>Comment</button>
          </div>
        </form>
        <div className="comments">
          <p className='text-sm'>Commenting as</p>
          <div className='flex items-center gap-5 my-2 mb-5'>
            <img src="https://framerusercontent.com/images/iX7dUlRI1KCdI731guMFo6y3iUw.png?scale-down-to=512" className='w-12 h-12 rounded-full mb-auto' />
            <div>
              <p className='text-sm font-semibold flex items-center gap-2'>Name <span className='font-thin text-[12px]'>11 month age</span></p>
              <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum saepe beatae omnis ut praesentium nesciunt quod iste, sunt est numquam?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum saepe beatae omnis ut praesentium nesciunt quod iste, sunt est numquam?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="right flex-[1.5]">
        <div>
          {listVideos.map((video, index) => {
            return (
              <Card video={video} key={video.media.mediaName} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Video