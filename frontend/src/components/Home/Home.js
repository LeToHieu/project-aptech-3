import React, { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import Card from "../Card/Card";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../redux/reducer/video";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
const Home = () => {
  const [videos, setVideos] = useState([])
  const dispatch = useDispatch()
  const { listVideos } = useSelector(state => state.video)
  useEffect(() => {
    async function loadVideos() {
      let { data } = await axios.get('/media', {
        headers: {
          "Content-Type": "application/json",
        }
      });
      data.medias = data.medias.filter(video => video.media.mediaUrl.includes("Videos"))
      dispatch(getList(data.medias))
      setVideos(data.medias);
    }
    loadVideos();
  }, []);
  const data = [
    {
      label: "Âm nhạc",
      value: "1",
      desc: []
    },
    {
      label: "Video",
      value: "2",
      desc: []
    }, {
      label: "Trò chơi",
      value: "3",
      desc: []
    }
  ]
  // console.log(videos);
  return (
    <>
      <Tabs id="custom-animation" value="1">
        <TabsHeader className="z-0">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
        <div className="bottom mt-[2%] h-[100%]">
          <div
            className={`
                    list pt-2 grid gap-2 lg:grid-cols-4 sm:grid-cols-3 h-[100%] overflow-auto

                    `}
          >
            {listVideos.map((video, index) => {
              return (
                <Card video={video} />
              )
            })}
          </div>
        </div>
        </TabsBody>
      </Tabs>
    </>
  );
};

export default Home;
