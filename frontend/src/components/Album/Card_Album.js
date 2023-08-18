import React from 'react'
import './Album.css'

function Card_Album({id, artist, album, price, image}) {
    const url = "https://localhost:7023/resources/"
    return (
        <figure class="snip1560">
            <img src={url + image} alt="pr-sample23" />
            <figcaption>
                <h4>{artist}</h4>
                <h2><span>{album}</span></h2>
                <h3>PRICE: {price}</h3>
            </figcaption>
        </figure>
    )
}

export default Card_Album
