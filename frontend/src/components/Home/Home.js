import React, { useEffect, useState } from "react";
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
import { chooseMusic } from "../../redux/reducer/config";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const { listVideos } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(chooseMusic(null));
  }, []);

  useEffect(() => {
    async function loadVideos() {
      let { data } = await axios.get('/media', {
        headers: {
          "Content-Type": "application/json",
        }
      });
      dispatch(getList(data.medias));
      let categories = await axios.get('Category', {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setCategories(categories.data.categories);
    }
    loadVideos();
  }, []);

  const data1 = listVideos.map((video, index) => (
    <Card key={index} video={video} />
  ));

  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = [
      {
        label: "Tất cả",
        value: "1",
        desc: (
          <div className="list pt-2 grid gap-2 lg:grid-cols-3 sm:grid-cols-3 h-[100%] p-0 overflow-y-auto">
            {data1}
          </div>
        ),
      },
    ];

    categories.forEach((category, index) => {
      let label = category.categoryName;
      let value = (index + 2).toString();
      let categoryId = category.id;
      let categoryVideos = listVideos.filter(
        (video) => video.media.categoryId === categoryId
      );
      let categoryVideoComponents = categoryVideos.map((video, index) => (
        <Card key={index} video={video} />
      ));

      newData.push({
        label: label,
        value: value,
        desc: (
          <div className="list pt-2 grid gap-2 lg:grid-cols-3 sm:grid-cols-3 h-[100%] p-0 overflow-y-auto">
            {categoryVideoComponents}
          </div>
        ),
      });
    });

    setData(newData);
  }, [categories, listVideos]);

  return (
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
              {desc}
            </TabPanel>
          ))}
        </div>
      </TabsBody>
    </Tabs>
  );
};

export default Home;
