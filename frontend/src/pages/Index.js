import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { Outlet, useLocation } from "react-router-dom";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { showMusic, showMute, playOrPause } from "../redux/reducer/config";

const Index = () => {
  const location = useLocation().pathname.split("/")[1];
  const { music, isMusic, isPlaying, isMute } = useSelector(
    (state) => state.config
  );
  const dispatch = useDispatch();
  const width = useRef(null);
  const formatTime = (time) => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) return `${minutes}:${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
  };
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const span = document.getElementById("audio-player");
    const audio = new Audio();
    if (music) {
      audio.src = "https://localhost:7023/resources/" + music.media.mediaUrl;
      // Xóa đối tượng audio cũ (nếu có)
      const oldAudio = span.querySelector("audio");
      if (oldAudio) {
        span.removeChild(oldAudio);
      }
      span.appendChild(audio);
      audio.currentTime = 0;
      if (isMute === 0) {
        audio.volume = 0;
      }
      audio.play();
      audio?.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [music]);

  useEffect(() => {
    const span = document?.getElementById("audio-player");
    const audio = span?.querySelector("audio");
    if (audio) {
      audio.volume = isMute / 100;
    }
    console.log(audio);
    console.log(isMute);
  }, [isMute]);
  const handleTimeLine = (e) => {
    console.log(e.clientX);
    console.log(width.current.clientWidth);
    const span = document.getElementById("audio-player");
    const audio = span.querySelector("audio");
    audio.currentTime =
      (e.clientX / width.current.clientWidth) * music.duration;
  };
  return (
    <>
      <Header />
      <input type="checkbox" id="toggle" />
      <input
        type="checkbox"
        id="music-toggle"
        onClick={() => dispatch(showMusic())}
      />
      <div className="home flex h-[100vh] overflow-hidden">
        <Menu />
        <div
          className={`home-container flex-[5] ${
            location === "music" ? "h-full" : " pl-2 py-5 overflow-auto"
          } max-sm:pl-1 w-full mt-[11vh] relative`}
        >
          <Outlet />
        </div>
      </div>
      {music && (
        <>
          <div
            className="z-30 h-[3px] w-full absolute bottom-16 bg-gray-400 group"
            ref={width}
            onClick={handleTimeLine}
          >
            <div
              style={{
                width: `${(currentTime / music.media.duration) * 100}%`,
              }}
              className="relative h-full bg-red-600 before:w-3 before:h-3 before:-bottom-1 before:right-0 before:bg-red-600 group-hover:before:absolute before:rounded-full"
            ></div>
          </div>
          <div className="z-20 absolute bottom-0 bg-zinc-800 h-16 w-full flex items-center">
            <span id="audio-player">
              {/* <audio src={music?.media_url} autoPlay></audio> */}
            </span>
            <div className="flex gap-8 items-center ml-5">
              <div>
                <SkipPreviousRoundedIcon
                  sx={{ color: "white", fontSize: 30 }}
                />
              </div>
              {!isPlaying ? (
                <div onClick={() => dispatch(playOrPause())}>
                  <PauseOutlinedIcon sx={{ color: "white", fontSize: 40 }} />
                </div>
              ) : (
                <div onClick={() => dispatch(playOrPause())}>
                  <PlayArrowRoundedIcon sx={{ color: "white", fontSize: 40 }} />
                </div>
              )}
              <div>
                <SkipNextRoundedIcon sx={{ color: "white", fontSize: 30 }} />
              </div>
              <div className="text-gray-400 text-xs">
                {formatTime(currentTime)} / {formatTime(music.media.duration)}
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="music-toggle">
                <div className="flex gap-2 w-fit shrink-0 py-2 pr-5 cursor-pointer mx-auto">
                  <div className="relative shrink-0">
                    <img
                      src={
                        "https://localhost:7023/resources/" +
                        music.media.mediaImage
                      }
                      alt=""
                      className="w-12 h-12"
                    />
                  </div>
                  <div className="">
                    <p className="font-bold text-white">
                      {music.artist.artistName}
                    </p>
                    <p className="flex gap-2 items-center">
                      <span className="block text-gray-400 min-w-10 text-1">
                        {music.media.mediaName}
                      </span>
                      {/* <span className="block text-gray-400 w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className="block text-gray-400 min-w-10 text-1">
                      Son Tung MTP{" "}
                    </span> */}
                    </p>
                  </div>
                  <div className="items-center gap-5 flex-1 justify-between px-5 flex ">
                    <div className="w-9 h-9 flex items-center justify-center hover:bg-gray-800 rounded-full">
                      <ThumbDownRoundedIcon
                        fontSize="small"
                        sx={{ color: "white" }}
                      />
                    </div>
                    <div className="w-9 h-9 flex items-center justify-center hover:bg-gray-800 rounded-full">
                      <ThumbUpRoundedIcon
                        fontSize="small"
                        sx={{ color: "white" }}
                      />
                    </div>
                    <div className="w-9 h-9 flex items-center justify-center hover:bg-gray-800 rounded-full">
                      <MoreVertRoundedIcon
                        fontSize="small"
                        sx={{ color: "white" }}
                      />
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div className="flex gap-8 items-center mr-5">
              {/* <div className="pb-2"><input type="range" className="w-20" /></div> */}
              <div className="relative group">
                {isMute === 0 ? (
                  <VolumeOffOutlinedIcon
                    sx={{ color: grey[500], fontSize: 25 }}
                  />
                ) : (
                  <VolumeUpOutlinedIcon
                    sx={{ color: grey[500], fontSize: 25 }}
                  />
                )}
                <div className="absolute top-0 px-2 -left-28 hidden group-hover:block w-40">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step="any"
                    className="w-20"
                    onChange={(e) => dispatch(showMute(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <RepeatOutlinedIcon sx={{ color: grey[500], fontSize: 25 }} />
              </div>
              <div>
                <ShuffleRoundedIcon sx={{ color: grey[500], fontSize: 25 }} />
              </div>
              {isMusic ? (
                <div onClick={() => dispatch(showMusic())}>
                  <ArrowDropUpIcon sx={{ color: "white", fontSize: 40 }} />
                </div>
              ) : (
                <div onClick={() => dispatch(showMusic())}>
                  <ArrowDropDownIcon sx={{ color: "white", fontSize: 40 }} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
