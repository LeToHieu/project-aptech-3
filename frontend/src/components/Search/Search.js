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
import Card_Album from "../Album/Card_Album";
function Search_Data() {
    const search = useLocation();
    const urlEncodedString = search.search;
    const decodedString = decodeURIComponent(urlEncodedString);
    const stringWithoutFirstChar = decodedString.slice(1);
    const dispatch = useDispatch();
    const { listVideos } = useSelector((state) => state.video);
    const [album, setAlbum] = useState([])
    useEffect(() => {
        dispatch(chooseMusic(null));
    }, []);
    const fetchData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const result = await axios.get('ArtistAlbum', config)
            console.log(parseJson(result.data.json))
            const parse_result = parseJson(result.data.json)
            let array = [];
            for (let i = 0; i < parse_result.length; i++) {
                const newData = {
                    id: parse_result[i].AlbumId,
                    artist: parse_result[i].Artist.ArtistName,
                    album: parse_result[i].Album.AlbumName,
                    price: parse_result[i].Album.Price,
                    image: parse_result[i].Artist.ArtistImage
                }
                array.push(newData);
            }
            setAlbum(array)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
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
    const data2 = album.filter(album => {
        const lowercaseMainString = album.album.toLowerCase();
        const lowercaseSearchWord = stringWithoutFirstChar.toLowerCase();
        return lowercaseMainString.includes(lowercaseSearchWord);
    }).map(item => (
        <Card_Album
            key={item.id}
            id={item.id}
            artist={item.artist}
            album={item.album}
            price={item.price}
            image={item.image}
        ></Card_Album>
    ))
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
            desc: <div className="list pt-2 grid gap-2 lg:grid-cols-3 sm:grid-cols-3 h-[100%] p-0 overflow-y-auto">{data2}</div>
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
