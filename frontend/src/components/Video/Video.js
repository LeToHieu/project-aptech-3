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
import parseJson from '../../Parse'
import { toast } from 'react-toastify';
const Video = () => {
  const url = "https://localhost:7023/resources/"
  const id = useParams().id
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState("");
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
  async function getComment() {
    let result = await axios.get('MediaFeedback/' + id, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const feedback = result.data.feedback;
    setComment([])
    for (let i = 0; i < feedback.length; i++) {
      const id = feedback[i].id
      const content = feedback[i].feedback.content
      const createdAt = feedback[i].feedback.createdAt
      const userId = feedback[i].feedback.userId

      const user_result = await axios.get("User/" + userId, {
        headers: {
          "Content-Type": "application/json",
        }
      })

      const user = parseJson(user_result.data.json)
      const username = user.Username
      const userimage = user.Userimage
      let data = {
        id: id,
        username: username,
        userimage: userimage,
        content: content,
        createdAt: createdAt
      }
      setComment(prevComments => [...prevComments, data]);
    }
    console.log(comment)
  }
  useEffect(() => {
    getComment();
  }, [video])
  let { user } = useSelector(state => state.user)
  console.log(user)
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const feedback_data = {
        userId: user.id,
        content: content
      }

      const result_feedback = await axios.post("Feedback/add", feedback_data, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      const response = result_feedback.data.newFeedback.id;

      const media_feedback_data = {
        mediaId: id,
        feedbackId: response
      }

      const result_media_feedback = await axios.post("MediaFeedback/add", media_feedback_data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (result_media_feedback.data.status) {
        toast.success("Thêm bình luận thành công")
      }
      setContent("");
      getComment();
    } catch (error) {
      toast.error("Error submitting comment:", error);
      console.error("Error submitting comment:", error);
    }

  }
  const handleCart = async (e) => {
    e.preventDefault();
  }
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
            <p className='flex items-center gap-1 text-xs'>{video?.artist.description}</p>
          </div>
          <form action="" onClick={(e) => handleCart(e)}>
            <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-black bg-white border-[1px] border-gray-400'>Mua ngay</button>
          </form>
        </div>
        <div className="description p-5 bg-neutral-100 rounded-xl">
          <input type="checkbox" name='show-desc' id='show-desc' />
          <span className=' max-h-[100px] overflow-hidden block'>
            Giá tiền: {video?.media.price}$
          </span>
          <label htmlFor="show-desc" data-more="Show more" data-less="Show less" className='show relative text-center inline-block w-[150px] h-[50px]'>
          </label>
        </div>
        <div className='total mt-5 text-[16px]'>
          <p>{comment.length} Comments</p>
        </div>
        <form action="" className='py-5' onSubmit={(e) => handleAdd(e)}>
          <div className='flex items-center gap-5 my-2 mb-5'>
            <img src={url + user.userimage} className='w-12 h-12 rounded-full' />
            <p>{user.username}</p>
          </div>
          <input type="text" placeholder='Add a comment' class='w-full border-b border-gray-300 outline-none p-2 text-gray-700' onChange={(e) => setContent(e.target.value)} />
          <div className='my-3 text-right'>
            <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-white bg-blue-400 shadow-lg  shadow-blue-500'>Comment</button>
          </div>
        </form>
        <div className="comments">
          <p className='text-sm'>Commenting as</p>
          {comment.map(commentData => (
            <div key={commentData.id} className='flex items-center gap-5 my-2 mb-5'>
              <img src={url + commentData.userimage} className='w-12 h-12 rounded-full mb-auto' />
              <div>
                <p className='text-sm font-semibold flex items-center gap-2'>{commentData.username} <span className='font-thin text-[12px]'>{commentData.createdAt}</span></p>
                <p className='text-sm'>{commentData.content}</p>
              </div>
            </div>
          ))}
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