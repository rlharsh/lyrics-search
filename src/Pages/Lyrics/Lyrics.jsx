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
            params: {id: params.id},
            headers: {
              'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
              'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              setSongData(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }, []);

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

    return (
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
    )
}

export default Lyrics