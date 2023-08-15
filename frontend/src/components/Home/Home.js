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
import Music from "../../pages/Music";
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
      console.log(data)
      // data.medias = data.medias.filter(video => video.media.mediaUrl.includes("Videos"))
      dispatch(getList(data.medias))
      setVideos(data.medias);
    }
    loadVideos();
  }, []);
  const data1 = listVideos.map((video, index) => (
    <Card key={index} video={video} />
  ));
  const data2 = <Music/>
  const data = [
    {
      label: "Tất cả",
      value: "1",
      desc: <div className="list pt-2 grid gap-2 lg:grid-cols-3 sm:grid-cols-3 h-[100%] p-0 overflow-y-auto">{data1}</div>,
    },
    {
      label: "Music",
      value: "2",
      desc: data2
    }, {
      label: "Trò chơi",
      value: "3",
      desc: data2
    }
  ]
  console.log(data)
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
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {/* <div className="list pt-2 grid gap-2 lg:grid-cols-2 sm:grid-cols-2 h-[100%] p-0"> */}
                  {desc}
                {/* </div> */}
              </TabPanel>
            ))}
          </div>
        </TabsBody>
      </Tabs>
    </>
  );
};

export default Home;
