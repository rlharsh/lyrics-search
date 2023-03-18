import React from 'react'

import '../../assets/css/tile.css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useNavigate } from 'react-router-dom';

const Tile = (props) => {

    const navigate = useNavigate();

    const doClick = () => {
        navigate(`/lyrics/${props.data.result.id}/${props.data.result.primary_artist.id}`);
    }
    
    return (
        <div className='tile' onClick={doClick}>
            <div className='tile__container'>
                <div className='tile__image'><img className='tile__image__image' src={props.data.result.header_image_thumbnail_url} alt="" /></div>
                <div className='tile__data'>
                    <h2>{props.data.result.title}</h2>
                    <p>{props.data.result.release_date_for_display}</p><p>{props.data.result.artist_names}</p>
                </div>
            </div>
        </div>
    )
}

export default Tile