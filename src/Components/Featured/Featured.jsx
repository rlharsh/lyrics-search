import React from 'react'

import '../../assets/css/featured.css';

const Featured = (props) => {

    const renderImage = () => {
        if (props.data != null) {
            return(
                <div className='featured__wrapper'>
                    <img className='featured__cover' src={props.data.result.header_image_url} alt="album cover" />
                </div>
            )
        }
    }

    const renderTitle = () => {
        if (props.data != null) {
            return(
                <h2>{props.data.result.title}</h2>
            )
        }
    }

    const renderArtist = () => {
        if (props.data != null) {
            return(
                <h3>{props.data.result.artist_names}</h3>
            )
        }
    }

    if (props.data != null) {
        console.log(props.data.result);
    }

    return (
        <div className='featured'>
            { renderImage() }
            { renderTitle() }
            { renderArtist() }
        </div>
    )
}

export default Featured