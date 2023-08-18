import React, { useEffect, useState } from 'react'
import Card_Album from './Card_Album'
import axios from '../../api/axios'
import parseJson from '../../Parse'
import { Animate } from '../animate/animate'
function Album() {
    const [album, setAlbum] = useState([])
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
    console.log(album)
    return (
        <Animate type="zoomInDown">
        <div className="list pt-2 grid gap-2 lg:grid-cols-3 sm:grid-cols-3 h-[100%] p-0 overflow-y-auto">
            {album.map(item => (
                <Card_Album
                    key={item.id}
                    id={item.id}
                    artist={item.artist}
                    album={item.album}
                    price={item.price}
                    image={item.image}
                ></Card_Album>
            ))}
        </div>
        </Animate>
    )
}

export default Album
