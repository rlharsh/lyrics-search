import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Header from '../../Components/Header/Header'

import '../../assets/css/lyrics.css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Lyrics = ({handleChatValue}) => {

    const params = useParams();
    const [datas, setDatas] = useState(null);
    const [songData, setSongData] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);

    const lyricApiKey = import.meta.env.VITE_LYRICS_API_KEY || process.env.VITE_LYRICS_API_KEY;

    useEffect(() => {
        const getLyrics = async () => {
            const lyricsOptions = {
                method: 'GET',
                url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
                params: { id: params.id, text_format: 'html' },
                headers: {
                    'X-RapidAPI-Key': lyricApiKey,
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
                    'X-RapidAPI-Key': lyricApiKey,
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
                        q: songDetailsResponse.data.song.artist_names + " musician artist imagesize:1920x1080 -site:facebook.com -site:twitter.com -site:circleallaccess.com -site:wbir.com -site:instagram.com -site:carolinacountrymusicfest.com",
                        hl: 'en'
                    },
                    headers: {
                        'X-RapidAPI-Key': lyricApiKey,
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
                        'X-RapidAPI-Key': lyricApiKey,
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
            <div className='button-container'>
            <button onClick={() => handleClick(`What is ${songData.song.artist_names}'s most popular song?`)}>
              Most Popular Song
            </button>
            <button onClick={() => handleClick(`What are some artists similar to ${songData.song.artist_names}?`)}>
              Similar Artists
            </button>
            <button onClick={() => handleClick(`What are some songs similar to ${songData.song.title} by ${songData.song.artist_names}?`)}>
              Similar Songs
            </button>
            <button onClick={() => handleClick(`What is the genre of ${songData.song.title} by ${songData.song.artist_names} considered?`)}>
              What Genre is {songData.song.title}
            </button>
            <button onClick={() => handleClick(`What are some interesting facts about ${songData.song.artist_names}?`)}>
              Interesting {songData.song.artist_names} Facts
            </button>
            <button onClick={() => handleClick(`Is the lead singer of ${songData.song.artist_names} still alive?`)}>
              Is {songData.song.artist_names} Still Alive?
            </button>
            </div>
          </div>
        );
      };

      const handleClick = useCallback((e) => {
        handleChatValue(e);
      }, [handleChatValue]);
      
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
    const youtubeUrl = song.youtube_url !== null ? song.youtube_url.replace(/www\.youtube\.com/, "music.youtube.com") : null;
  
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