import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Header from '../../Components/Header/Header'

import '../../assets/css/lyrics.css';

const Lyrics = () => {

    const params = useParams();
    const [datas, setDatas] = useState(null);
    const [songData, setSongData] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
            params: {id: params.id, text_format: 'html'},
            headers: {
              'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
              'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              setDatas(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }, []);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://genius-song-lyrics1.p.rapidapi.com/song/details/',
            params: {id: params.id, text_format: 'plain'},
            headers: {
              'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
              'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
              setSongData(response.data);
          }).catch(function (error) {
              console.error(error);
          });
          
    }, []);

    useEffect(() => {

        if (songData != null) {

            const options = {
                method: 'GET',
                url: 'https://joj-image-search.p.rapidapi.com/v2/',
                params: {q: songData.song.artist_names + " musician artist imagesize:1920x1080 -site:facebook.com -site:twitter.com", hl: 'en'},
                headers: {
                  'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
                  'X-RapidAPI-Host': 'joj-image-search.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                  setBackgroundImage(response.data.response)
              }).catch(function (error) {
                  console.error(error);
              })
    }
    }, [songData]);

    useEffect(() => {
        if (songData != null) {
            const options = {
                method: 'GET',
                url: 'https://genius-song-lyrics1.p.rapidapi.com/artist/details/',
                params: {id: params.artist},
                headers: {
                  'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
                  'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                  setArtistInfo(sanitizeLyrics(response.data.artist.description.html))
              }).catch(function (error) {
                  console.error(error);
              });
        }
    }, [songData]);

    const doubleBr = (str) => {
        if (str != null) {
        return str.replace(/<br\s*\/?>/gi, '<br><br>');
        }
    }

    const sanitizeLyrics = (str) => str.replace(/<a\b[^>]*>/ig,"").replace(/<\/a>/ig, "");

    const renderLyrics = () => {
        if (datas != null) {
            return (
                <div className='lyrics' dangerouslySetInnerHTML={{ __html: sanitizeLyrics(datas.lyrics.lyrics.body.html)}}></div>
            )
        }
    }

    const renderAlbumCover = () => {
        if (songData != null) {

            return (
                <div className='album-cover-wrapper'>
                    <img className='album-cover' src={songData.song.song_art_image_url} alt="" />
                    <h1>
                        { songData.song.title }
                    </h1>
                    <h2>
                        { songData.song.artist_names }
                    </h2>
                </div>
            )
        }
    }

    const renderPlayer = () => {
        if (songData != null) {
            return (
                <iframe src={songData.song.apple_music_player_url} width='100%'></iframe>
            )
        }
    }

    const renderSubFooter = () => {
        return(
            <div className='artist-info' dangerouslySetInnerHTML={{ __html: doubleBr(artistInfo) }}></div>
        )
    }

    const renderSubHeader = () => {
        if (songData != null && backgroundImage != null) {

            return(
                <div className='sub-header' style={{
                    backgroundImage: "url(" + backgroundImage.images[0].image.url + ")"

                }}>
                    
                    {songData.song.description_preview !== "" && (
                         <div className='data'>
                            <h1>Song Information</h1>
                            <p>{songData.song.description_preview}</p>
                        </div>
                    )}

                    <div className='darken-area'></div>
                   
                    <div className='sub-header-information'>
                        <h1> { backgroundImage.images[0].source.name }</h1>
                        <p> <a href={ backgroundImage.images[0].source.page } target='_blank'> { backgroundImage.images[0].source.title } </a> </p>
                    </div>

                    {
                        songData.song.youtube_url !== "" && (
                            <a href={songData.song.youtube_url} target="_blank"><img className='icon' src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" /></a>
                        ) 
                    }

                </div>
            )
        }
    }

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