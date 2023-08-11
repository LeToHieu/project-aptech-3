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
  const {listVideos, isPlaying, video, isMute} = useSelector(state => state.video)
  const dispatch = useDispatch()
  const [currentTime, setCurrentTime] = useState(0);
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
  console.log(video?.media.duration);
  console.log(currentTime);
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(videoEle.currentTime);
    };
    const span = document.querySelector("#video-player")
    const oldVideo = span.querySelector("video")
    if (oldVideo) {
      span.removeChild(oldVideo)
    }
    const videoEle = document.createElement('video')
    if (video) {
      videoEle.src = url + video?.media.mediaUrl
      videoEle.classList.add("w-full", "h-[550px]")
      span.appendChild(videoEle)
      // videoEle.play()
      window?.addEventListener("mousemove",() => videoEle.play())
      videoEle?.addEventListener("timeupdate", handleTimeUpdate);
    }
    // if (video) {
    //   const videoElement = document.getElementById("video-player")  
    //   const videoSource = videoElement.querySelector('source')
    //   videoSource.src = url + video?.media.mediaUrl
    //   console.log(videoElement);
    //   videoElement?.addEventListener("click",() => videoElement.play())
    //   videoElement?.addEventListener("timeupdate", handleTimeUpdate(videoElement));
      return () => {
        videoEle?.removeEventListener("timeupdate", handleTimeUpdate);
        window?.removeEventListener("mousemove",() => videoEle.play());
      };
    // }
    // const videoPlay = new Video()
    // if (!video) {
      // debugger
      // videoSource.src = url + video?.media.mediaUrl
      // console.log(videoSource);
      // videoSource.src = 'https://localhost:7023/resources/' + video.media.mediaUrl
      // Xóa đối tượng audio cũ (nếu có)
      // const oldVideo = videoElement.querySelector("source");
      // if (oldVideo) {
      //   videoElement.removeChild(oldVideo);
      // }
      // videoElement.appendChild(videoPlay);
      // videoElement.currentTime = 0
      // if (isMute === 0) {
      //   videoElement.volume = 0
      // }
      
    
  }, [video])
  // console.log(url + video.media.mediaUrl);
  useEffect(() => {
    async function loadVideos() {
      let { data } = await axios.get('/media', {
        headers: {
          "Content-Type": "application/json",
        }
      });
      data.medias = data.medias.filter(video => video.media.mediaUrl.includes("Videos"))
      dispatch(getList(data.medias))
      // setVideos(data.medias);
    }
    loadVideos();
  }, []);
  useEffect(() => {
    const span = document.getElementById("video-player");
    const videoElement = span.querySelector("video")
    // if (videoElement) {
    //   videoElement.volume = isMute / 100
    // }  
    if (video?.media.mediaUrl) {
      videoElement.volume = isMute / 100
      console.log(videoElement);
    }
  }, [isMute])
  useEffect(() => {
    async function getVideo() {
      let { data } = await axios.get('/media/'+id, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      // data.medias = data.medias.filter(video => video.media.mediaUrl.includes("Videos"))
      dispatch(chooseVideo(data.media))
      // setVideos(data.medias);
    }
    getVideo();
  }, [])
  // const changeSizeIframe = () => {
  //   let videoframe = document.querySelector('#videoframe')
  //   // videoframe?.contentWindow.postMessage(url, '*');

  //   // content.width = "100%"
  //   // if (videoframe?.contentWindow) {
  //   //   let content = videoframe?.contentWindow.document.querySelector('video')
  //   //   content.style.width = "100%"
  //   //   content.style.height = "100%"
  //   //   console.log(content);
  //   // }
  // }

  // changeSizeIframe()
  return (
    <div className='flex gap-2 h-full pl-5'>
      <div className="left flex-[3]">
        <div className='relative video-container w-full h-[550px]'>
          <div className='show-controls absolute w-full'>
            <div className='relative h-1 w-full bg-gray-400/100'>
              <div style={{ width: `${currentTime/video?.media.duration * 100}%` }} className='absolute h-full bg-red-500'></div>
            </div>
            <div className='flex justify-between w-full p-3 bg-black/10'>
              <div className='flex gap-4 items-center z-10'>
                {isPlaying ? 
                  <div onClick={() => dispatch(playOrPause())}>
                    <PlayArrowIcon sx={{ color: 'white', fontSize: 25 }} />
                  </div>
                  :
                  <div onClick={() => dispatch(playOrPause())}>
                    <PauseIcon sx={{ color: 'white', fontSize: 25 }} />
                  </div>
                }
                <div>
                  <SkipNextIcon sx={{ color: 'white', fontSize: 25 }} />
                </div>
                <div className='flex gap-2 items-center group'>
                  <VolumeUpIcon sx={{ color: 'white', fontSize: 25 }} />
                  <input className='scale-0 hidden w-0 group-hover:scale-100 group-hover:flex duration-100' type="range" id='video' 
                  value={isMute} min={0} max={100} onChange={(e) => dispatch(showMute(e.target.value))} />
                </div>
                <div className='text-white text-sm'>
                  {formatTime(currentTime) + "/" + formatTime(video?.media.duration)}
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <div>
                  <ClosedCaptionIcon sx={{ color: 'white', fontSize: 25 }} />
                </div>
                <div>
                  <SettingsIcon sx={{ color: 'white', fontSize: 25 }} />
                </div>
                <div>
                  <PictureInPictureAltIcon sx={{ color: 'white', fontSize: 25 }} />
                </div>
                <div>
                  <CropFreeIcon sx={{ color: 'white', fontSize: 25 }} />
                </div>
              </div>
            </div>
          </div>
          {/* <iframe id='videoframe'
            crossOrigin="anonymous"
            className='w-full h-full absolute'
            src={url + video?.media.mediaUrl}></iframe> */}
          <span id='video-player'>
            
          </span>
        </div>
        <h3 className='my-5 text-[16px] font-semibold'>{video?.media.mediaName}</h3>
        <div className='flex gap-5 items-center'>
          <img src={url + video?.media.mediaImage}
              className='w-12 h-12 rounded-full'
          />
          <div>
              <p className='text-sm font-semibold mb-1'>{video?.artist.artistName} </p>
              <p  className='flex items-center gap-1 text-xs'>10.5m Subcribe</p>
          </div>
          <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-black bg-white border-[1px] border-gray-400'>Join</button>
          <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-white bg-black'>Subcribe</button>
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