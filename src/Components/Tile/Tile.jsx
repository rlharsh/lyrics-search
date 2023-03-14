import React from 'react'

import '../../assets/css/tile.css';

const Tile = (props) => {
    
  return (
    <div className='tile'>
        <div className='tile__image'><img className='tile__image__image' src={props.data.result.header_image_thumbnail_url} alt="" /></div>
        <div className='tile__data'>
            <h2>{props.data.result.full_title}</h2>
            <p>{props.data.result.artist_names}</p>
        </div>
    </div>
  )
}

export default Tile