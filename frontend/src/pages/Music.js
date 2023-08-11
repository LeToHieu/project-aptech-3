import React, { useCallback, useEffect, useMemo, useState } from "react";
import Tag from "../components/Tag/Tag";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PictureInPictureAltRoundedIcon from "@mui/icons-material/PictureInPictureAltRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import { useDispatch, useSelector } from "react-redux";
import { chooseMusic, showMusic, playOrPause, showCurrentTime } from "../redux/reducer/config";
import au from "../assets/audio.mp3";
import au2 from "../assets/audio2.mp3";
import au3 from "../assets/audio3.mp3";
import axios from "../api/axios";
const Music = () => {
  const [musics, setMusics] = useState([])
  const { music, isMusic } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  let audioList = [
    {
      media_image:
        "https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg",
      media_url: au,
    },
    {
      media_image:
        "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
      media_url: au2,
    },
    {
      media_image:
        "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9ufGVufDB8fDB8fHww&w=1000&q=80",
      media_url: au3,
    },
  ];
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
  // const getDuration = (src) => {
  //     return new Promise(function(resolve) {
  //         var audio = new Audio();
  //         audio.addEventListener("loadedmetadata", function(){
  //             resolve(audio.duration);
  //         });
  //         audio.src = src;
  //     });
  // }
  // useEffect(async () => {
  //   const {data} = await axios.get('/media', {
  //     headers: 
  //       {
  //         "Content-Type": "application/json",
  //       }
  //   }) 
  //   setMusics(data.medias)
  // }, [])

  // useEffect(() => {
  //   Promise.all(music.map(audio => {
  //     return getDuration(audio.media_url).then(duration => {
  //       audio.duration = duration;
  //       audio.currentTime = 0
  //       return audio;
  //     });
  //   })).then(newMusics => {
  //     setMusics(newMusics);
  //   });
  // }, []);
  // const getDuration = useCallback(async (mediaUrl) => {
  // TODO: Tối ưu phương thức getDuration.
  // Ví dụ: sử dụng bộ đệm để lưu trữ thông tin của các file audio đã được tải trước đó.
  //   const audio = new Audio(mediaUrl);
  //   await audio.load();
  //   return audio.duration;
  // }, []);
  useEffect(() => {
    async function loadMusics() {
      const { data } = await axios.get('/media', {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setMusics(data.medias);
    }
    loadMusics();
  }, []);

  // const memoizedMusics = useMemo(() => {
  //   return musics.map((music) => ({ ...music }));
  // }, [musics]);

  // useEffect(() => {
  //   Promise.all(memoizedMusics.map((audio) => {
  //     return getDuration(audio.media_url).then((duration) => {
  //       audio.duration = duration;
  //       audio.currentTime = 0;
  //       return audio;
  //     });
  //   })).then((newMusics) => {
  //     setMusics(newMusics);
  //   });
  // }, [memoizedMusics, getDuration]);

  return (
    <>
      <div className="music h-[100%] overflow-y-auto">
        <div className="py-8 px-20 bg-white box-border text-black shrink-0 min-h-[100%] pb-40">
          <div className="mt-10 w-full">
            <h2 className="sm:text-3xl font-bold">Nhạc yêu thích của bạn</h2>
            <div className="flex gap-2 mt-4 overflow-auto hidden-scrollbar">
              <div className="text-center shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/J7Micaz8jRk7k2swwdhFL3I2jr4L1E1N_ePxnj-W15ZXWFkipqeizN5Rba2A39Tlm4uAdX9SomJZXA=w544-h544-p-l90-rj"
                  alt=""
                  className="my-3 rounded-full w-[180px] h-[180px] object-cover"
                />
                <p className="font-bold">Đen</p>
              </div>
              <div className="text-center shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/J7Micaz8jRk7k2swwdhFL3I2jr4L1E1N_ePxnj-W15ZXWFkipqeizN5Rba2A39Tlm4uAdX9SomJZXA=w544-h544-p-l90-rj"
                  alt=""
                  className="my-3 rounded-full w-[180px] h-[180px] object-cover"
                />
                <p className="font-bold">Đen</p>
              </div>
              <div className="text-center shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/J7Micaz8jRk7k2swwdhFL3I2jr4L1E1N_ePxnj-W15ZXWFkipqeizN5Rba2A39Tlm4uAdX9SomJZXA=w544-h544-p-l90-rj"
                  alt=""
                  className="my-3 rounded-full w-[180px] h-[180px] object-cover"
                />
                <p className="font-bold">Đen</p>
              </div>
              <div className="text-center shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/J7Micaz8jRk7k2swwdhFL3I2jr4L1E1N_ePxnj-W15ZXWFkipqeizN5Rba2A39Tlm4uAdX9SomJZXA=w544-h544-p-l90-rj"
                  alt=""
                  className="my-3 rounded-full w-[180px] h-[180px] object-cover"
                />
                <p className="font-bold">Đen</p>
              </div>
              <div className="text-center shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/J7Micaz8jRk7k2swwdhFL3I2jr4L1E1N_ePxnj-W15ZXWFkipqeizN5Rba2A39Tlm4uAdX9SomJZXA=w544-h544-p-l90-rj"
                  alt=""
                  className="my-3 rounded-full w-[180px] h-[180px] object-cover"
                />
                <p className="font-bold">Đen</p>
              </div>
              <div className="text-center shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/J7Micaz8jRk7k2swwdhFL3I2jr4L1E1N_ePxnj-W15ZXWFkipqeizN5Rba2A39Tlm4uAdX9SomJZXA=w544-h544-p-l90-rj"
                  alt=""
                  className="my-3 rounded-full w-[180px] h-[180px] object-cover"
                />
                <p className="font-bold">Đen</p>
              </div>
              <div className="text-center shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/J7Micaz8jRk7k2swwdhFL3I2jr4L1E1N_ePxnj-W15ZXWFkipqeizN5Rba2A39Tlm4uAdX9SomJZXA=w544-h544-p-l90-rj"
                  alt=""
                  className="my-3 rounded-full w-[180px] h-[180px] object-cover"
                />
                <p className="font-bold">Đen</p>
              </div>
              <div className="text-center shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/J7Micaz8jRk7k2swwdhFL3I2jr4L1E1N_ePxnj-W15ZXWFkipqeizN5Rba2A39Tlm4uAdX9SomJZXA=w544-h544-p-l90-rj"
                  alt=""
                  className="my-3 rounded-full w-[180px] h-[180px] object-cover"
                />
                <p className="font-bold">Đen</p>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full">
            <h3 className="text-[16px] text-gray-500 mb-2">
              BẮT ĐẦU ĐÀI PHÁT BẰNG MỘT BÀI HÁT
            </h3>
            <h2 className="sm:text-3xl font-bold">Chọn nhanh đài phát</h2>
            <div className="flex w-full overflow-auto hidden-scrollbar mt-5 h-[256px] flex-flow">
              {musics.map((music) => {
                return (
                  <div className="flex gap-2 shrink-0 w-1/3 py-2 pr-5 group cursor-pointer" onClick={() => dispatch(chooseMusic(music))}>
                    <div className="relative shrink-0">
                      <div className="absolute w-full h-full hidden items-center justify-center z-10 group-hover:flex">
                        <PlayArrowRoundedIcon />
                      </div>
                      <img
                        src={"https://localhost:7023/resources/" + music?.media.mediaImage}
                        alt=""
                        className="w-12 h-12 group-hover:brightness-50"
                      />
                    </div>
                    <div className="">
                      <p className="font-bold text-1">{music?.media.mediaName}</p>
                      <p className="flex gap-2 items-center">
                        <span className="block text-gray-400 min-w-10 text-1">
                          {music.artist.artistName}
                        </span>
                      </p>
                    </div>
                    <div className="items-center gap-5 flex-1 justify-between px-5 hidden group-hover:flex ">
                      <div className="w-9 h-9 flex items-center justify-center hover:bg-gray-800 rounded-full">
                        <ThumbDownRoundedIcon fontSize="small" />
                      </div>
                      <div className="w-9 h-9 flex items-center justify-center hover:bg-gray-800 rounded-full">
                        <ThumbUpRoundedIcon fontSize="small" />
                      </div>
                      <div className="w-9 h-9 flex items-center justify-center hover:bg-gray-800 rounded-full">
                        <MoreVertRoundedIcon fontSize="small" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {music && (
        <div
          className={`absolute bottom-40 right-0 w-1/4 cursor-pointer group animate__animated ${isMusic ? "hidden" : "animate animate__fadeInTopLeft"
            }`}
        >
          <div
            className="video-controller flex gap-1 absolute w-full h-full top-0 left-0 z-10"
            onClick={() => dispatch(playOrPause())}
          >
            <div
              className="ml-auto mt-3 rotate-180 w-fit h-fit"
              onClick={() => dispatch(showMusic())}
            >
              <PictureInPictureAltRoundedIcon
                sx={{ color: "white", fontSize: 30 }}
              />
            </div>
            <div className="mt-3 mr-2">
              <FullscreenRoundedIcon sx={{ color: "white", fontSize: 35 }} />
            </div>
          </div>
          {/* <video poster='https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg' className={`video h-full group-hover:brightness-50`}>
            <source src=''></source>
          </video> */}
          <img
            src={"https://localhost:7023/resources/" + music?.media.mediaImage}
            alt=""
            className={`video h-[200px] w-full group-hover:brightness-50`}
          />
        </div>
      )}
      <div
        className={`animate__animated ${isMusic ? "animate fadeInUpBig" : "animate fadeOutDownBig"
          } music-absolute h-[100%] overflow-y-auto absolute w-full bg-black top-0`}
      >
        <div className="mx-5 my-10 flex h-[80%]">
          <div className="flex-[1.5] p-5">
            <div className="flex justify-center h-full w-full relative group cursor-pointer" onClick={() => dispatch(playOrPause())}>
              <div className="video-controller gap-5 absolute w-full h-1/5 bg-gradient-to-b from-slate-900 to-transparent top-0 left-0 z-10 hidden group-hover:flex">
                <div
                  className="pic-in-pic ml-auto mt-3"
                  onClick={() => dispatch(showMusic())}
                >
                  <PictureInPictureAltRoundedIcon
                    sx={{ color: "white", fontSize: 30 }}
                  />
                </div>
                <div className="mt-3">
                  <FullscreenRoundedIcon
                    sx={{ color: "white", fontSize: 30 }}
                  />
                </div>
              </div>
              <div>
                <img
                  src={"https://localhost:7023/resources/" + music?.media.mediaImage}
                  alt=""
                  className={`h-[90%] animate__animated ${isMusic ? "animate animate__fadeInBottomRight" : ""
                    }`}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black p-5 w-full">
            <div className="w-full flex pl-10">
              <div className="text-white text-center flex-1 font-semibold border-b-[1px] border-white cursor-pointer">
                UP NEXT
              </div>
              <div className="text-white text-center flex-1 font-semibold cursor-pointer">
                UP NEXT
              </div>
              <div className="text-white text-center flex-1 font-semibold cursor-pointer">
                UP NEXT
              </div>
            </div>
            <div className="mt-5 pl-10 h-full overflow-auto scroll-white">
              {musics.map((music) => {
                return (
                  <div className="flex gap-2 shrink-0 w-full py-2 group cursor-pointer" onClick={() => dispatch(chooseMusic(music))}>
                    <div className="relative shrink-0">
                      <div className="absolute w-full h-full hidden items-center justify-center z-10 group-hover:flex">
                        <PlayArrowRoundedIcon sx={{ color: "white" }} />
                      </div>
                      <img
                        src={"https://localhost:7023/resources/" + music.media.mediaImage}
                        alt=""
                        className="w-12 h-12 group-hover:brightness-50"
                      />
                    </div>
                    <div className="">
                      <p className="font-bold text-white">{music.media.mediaName}</p>
                      <p className="flex gap-2 items-center">
                        <span className="block text-gray-400 min-w-10 text-1">
                          {music.artist.artistName}
                        </span>
                      </p>
                    </div>
                    <div className="items-center gap-5 flex-1 justify-between px-5 flex group-hover:hidden ">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full ml-auto text-white">
                        {formatTime(music?.media.duration)}
                      </div>
                    </div>
                    <div className="items-center gap-5 flex-1 justify-between px-5 hidden group-hover:flex ">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full ml-auto">
                        <MoreVertRoundedIcon
                          sx={{ color: "white" }}
                          fontSize="small"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Music;
