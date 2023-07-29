import React, { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import Card from "../Card/Card";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../redux/reducer/video";

const Home = () => {
  // const [videos, setVideos] = useState([])
  const dispatch = useDispatch()
  const {listVideos} = useSelector(state => state.video)
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
  // console.log(videos);
  return (
    <>
      <div className="top flex items-center gap-5 h-[8%] max-lg:overflow-x-auto w-full overflow-hidden">
        <Tag title="Tất cả" />
        <Tag title="Âm nhạc" />
        <Tag title="Trò chơi" />
        <Tag title="Hoạt họa" />
        <Tag title="Đã xem" />
        <Tag title="Đã xem" />
        <Tag title="Đề xuất mới" />
        <Tag title="Đề xuất mới" />
        <Tag title="Đề xuất mới" />
      </div>
      <div className="bottom mt-[2%] h-[100%]">
        <div
          className={`
                    list pt-2 grid gap-2 lg:grid-cols-4 sm:grid-cols-3 h-[100%] overflow-auto

                    `}
        >
          {listVideos.map((video, index) => {
            return (
              <Card video = {video} />
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
