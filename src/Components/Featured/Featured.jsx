import React from 'react'

import '../../assets/css/featured.css';
import { useNavigate } from 'react-router-dom';

const Featured = (props) => {

    const navigate = useNavigate();

    const renderImage = () => {
        if (props.data != null) {
            return(
                <div className='featured__wrapper'>
                    <div className='featured__wrapper__meta'>{renderDate()}</div>
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

    const renderDate = () => {
        if (props.data != null) {
            return(
                <h4>{props.data.result.release_date_for_display}</h4>
            )
        }
    }

    const doClick = () => {
        navigate(`/lyrics/${props.data.result.id}/${props.data.result.primary_artist.id}`);
    }

    return (
        <div className='featured' onClick={doClick}>
            { renderImage() }
            { renderTitle() }
            { renderArtist() }
        </div>
    )
}

export default Featured