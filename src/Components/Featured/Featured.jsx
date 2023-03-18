import React from 'react'

import '../../assets/css/featured.css';
import { useNavigate } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Featured = (props) => {

    const navigate = useNavigate();

    const renderImage = () => {
        if (props.data != null) {
          return (
            <div className='featured__wrapper'>
              <div className='featured__wrapper__meta'>{renderDate()}</div>
              <img className='featured__cover' src={props.data.result.header_image_url} alt="album cover" />
            </div>
          );
        } else {
          return (
            <div className='featured__wrapper'>
                <SkeletonTheme baseColor='#1E1E1E' highlightColor='#535353'>
                    <Skeleton height={488} width={488} />
                </SkeletonTheme>
            </div>
          );
        }
      };

      const renderTitle = () => {
        if (props.data != null) {
          return (
            <h2>{props.data.result.title}</h2>
          );
        } else {
          return (
            <SkeletonTheme baseColor='#1E1E1E' highlightColor='#535353'>
                <Skeleton height={30} width={200} style={{ marginTop: "1rem" }} />
            </SkeletonTheme>
          );
        }
      };

    const renderArtist = () => {
        if (props.data != null) {
            return(
                <h3>{props.data.result.artist_names}</h3>
            )
        } else {
            return (
                <SkeletonTheme baseColor='#1E1E1E' highlightColor='#535353'>
                    <Skeleton height={30} width={200} style={{ marginTop: "1rem" }} />
                </SkeletonTheme>
              );
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