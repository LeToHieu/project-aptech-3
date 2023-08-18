import React, { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import parseJson from '../../Parse';
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { chooseMusic } from "../../redux/reducer/config";
import { getList } from "../../redux/reducer/video";

function Search_Data() {
    const search = useLocation();
    const urlEncodedString = search.search;
    const decodedString = decodeURIComponent(urlEncodedString);
    const stringWithoutFirstChar = decodedString.slice(1);
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

        }
        loadVideos();
    }, []);
    
    const data1 = listVideos.filter(video => {
        const lowercaseMainString = video.media.mediaName.toLowerCase();
        const lowercaseSearchWord = stringWithoutFirstChar.toLowerCase();
        return lowercaseMainString.includes(lowercaseSearchWord);
      }).map((video, index) => (
        <Card key={index} video={video} />
      ));
    let data = [
        {
            label: "Video",
            value: "1",
            desc: <div className="list pt-2 grid gap-2 lg:grid-cols-3 sm:grid-cols-3 h-[100%] p-0 overflow-y-auto">
                {data1}
            </div>
        },
        {
            label: "Album",
            value: "2",

        }
    ]
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
    )
}

export default Search_Data
