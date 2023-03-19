import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Header from '../../Components/Header/Header'

import '../../assets/css/lyrics.css';

import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPlayer from 'react-spotify-web-playback';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Lyrics = () => {

    const params = useParams();
    const [datas, setDatas] = useState(null);
    const [songData, setSongData] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken('<your-access-token>');

    

    useEffect(() => {
        const getLyrics = async () => {
            const lyricsOptions = {
                method: 'GET',
                url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
                params: { id: params.id, text_format: 'html' },
                headers: {
                    'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
                    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
                }
            };
    
            const lyricsResponse = await axios.request(lyricsOptions);
            setDatas(lyricsResponse.data);
    
            const songDetailsOptions = {
                method: 'GET',
                url: 'https://genius-song-lyrics1.p.rapidapi.com/song/details/',
                params: { id: params.id, text_format: 'plain' },
                headers: {
                    'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
                    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
                }
            };
    
            const songDetailsResponse = await axios.request(songDetailsOptions);
            setSongData(songDetailsResponse.data);
    
            if (songDetailsResponse.data != null) {
                const backgroundImageOptions = {
                    method: 'GET',
                    url: 'https://joj-image-search.p.rapidapi.com/v2/',
                    params: {
                        q: songDetailsResponse.data.song.artist_names + " musician artist imagesize:1920x1080 -site:facebook.com -site:twitter.com",
                        hl: 'en'
                    },
                    headers: {
                        'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
                        'X-RapidAPI-Host': 'joj-image-search.p.rapidapi.com'
                    }
                };
    
                const backgroundImageResponse = await axios.request(backgroundImageOptions);
                setBackgroundImage(backgroundImageResponse.data.response);
            }
    
            if (songDetailsResponse.data != null) {
                const artistDetailsOptions = {
                    method: 'GET',
                    url: 'https://genius-song-lyrics1.p.rapidapi.com/artist/details/',
                    params: { id: params.artist },
                    headers: {
                        'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
                        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
                    }
                };
    
                const artistDetailsResponse = await axios.request(artistDetailsOptions);
                setArtistInfo(sanitizeLyrics(artistDetailsResponse.data.artist.description.html));
            }
        };
    
        getLyrics();
    }, [params.id, params.artist]);
    

    const doubleBr = (str) => {
        if (str != null) {
        return str.replace(/<br\s*\/?>/gi, '<br><br>');
        }
    }

    const sanitizeLyrics = (str) => str.replace(/<a\b[^>]*>/ig,"").replace(/<\/a>/ig, "");

    const renderLyrics = () => {
        if (!datas) {
          // Render a skeleton while waiting for data to load
          return (
            <div className="lyrics">
                <SkeletonTheme baseColor='#1E1E1E' highlightColor='#535353'>
                    <Skeleton height={150} count={6} dark />
                </SkeletonTheme>
            </div>
          );
        }
      
        // Once data is available, render the actual lyrics
        const { lyrics } = datas;
        return (
          <div className='lyrics' dangerouslySetInnerHTML={{ __html: sanitizeLyrics(lyrics.lyrics.body.html)}}></div>
        );
      };

      const renderAlbumCover = () => {        
        if (!songData) {
          // Render a skeleton while waiting for data to load
          return (
            <div className='album-cover-wrapper'>
                <SkeletonTheme baseColor='#1E1E1E' highlightColor='#535353'>
                    <Skeleton height={300} />
                    <Skeleton height={50} width={200} style={{ marginTop: "0.5rem" }} />
                    <Skeleton height={30} width={150} style={{ marginTop: "0.25rem" }} />
                </SkeletonTheme>
            </div>
          );
        }
      
        // Once data is available, render the actual album cover and information
        return (
          <div className='album-cover-wrapper'>
            <img className='album-cover' src={songData.song.song_art_image_url} alt="" />
            <h1>
              { songData.song.title }
            </h1>
            <h2>
              { songData.song.artist_names }
            </h2>
            <h3>
              { songData.song.release_date_for_display }
            </h3>
          </div>
        );
      };
      
    const renderPlayer = () => {
        if (songData != null) {
            return (
                <iframe src={songData.song.apple_music_player_url} width='100%'></iframe>
            )
        }
    }

const renderSubFooter = () => {
  if (!artistInfo) {
    // Render a skeleton while waiting for data to load
    return (
      <div className='artist-info'>
        <SkeletonTheme baseColor='#1E1E1E' highlightColor='#535353'>
            <Skeleton count={3} />
        </SkeletonTheme>
      </div>
    );
  }

  // Once data is available, render the actual artist information
  return (
    <div className='artist-info' dangerouslySetInnerHTML={{ __html: doubleBr(artistInfo) }}></div>
  );
};


const renderSubHeader = () => {
    if (!songData || !backgroundImage) {
      return (
      <SkeletonTheme baseColor='#1E1E1E' highlightColor='#535353'>
        <Skeleton height={500} />
      </SkeletonTheme>
      )
    }
  
    const { images } = backgroundImage;
    const { song } = songData;
    const descriptionPreview = song.description_preview;
    const youtubeUrl = song.youtube_url.replace(/www\.youtube\.com/, "music.youtube.com");
  
    return (
      <div className="sub-header" style={{ backgroundImage: `url(${images[0].image.url})` }}>
        {descriptionPreview && (
          <div className="data">
            <h1>Song Information</h1>
            <p>{descriptionPreview}</p>
          </div>
        )}
  
        <div className="darken-area" />
  
        <div className='copyright'>
        <div className="sub-header-information">
          <h1>{images[0].source.name}</h1>
          <p>
            <a href={images[0].source.page} target="_blank">
              {images[0].source.title}
            </a>
          </p>
        </div>
        {youtubeUrl && (
          <a href={youtubeUrl} target="_blank">
            <img className="icon" src="https://cdn.cdnlogo.com/logos/y/83/youtube-music.svg" />
          </a>
        )}
        </div>
      </div>
    );
  };
      

    return (
        <>
        { renderSubHeader() }

        <div className='lyric-wrapper'>
            <Header />

            <div className='lyric-wrapper__left'>
                { renderAlbumCover() }
            </div>
            <div className='lyric-wrapper__right'>
                <h2>Song Lyrics</h2>
                    { renderLyrics() }
            </div>

        </div>

        <div className='sub-footer'>
                <h1>Artist Information</h1>
                { renderSubFooter() }
        </div>

        </>
    )
}

export default Lyrics