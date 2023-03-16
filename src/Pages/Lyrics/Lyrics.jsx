import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

import '../../assets/css/lyrics.css';

const Lyrics = () => {

    const params = useParams();
    const [datas, setDatas] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [lyricContent, setLyricContent] = useState(null);

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
        url: 'https://genius-song-lyrics1.p.rapidapi.com/artist/details/',
        params: {id: params.artist},
        headers: {
            'X-RapidAPI-Key': '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            setBackgroundImage(response.data.artist.image_url);
        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["']).*?\1[^>]*>.*?<\/a>/gi;

    
    const sanitizeLyrics = (str) => str.replace(/<a\b[^>]*>/i,"").replace(/<\/a>/i, "");

    const renderLyrics = () => {
        if (datas != null) {
            console.log(sanitizeLyrics(datas.lyrics.lyrics.body.html))
            return (
                <div dangerouslySetInnerHTML={{ __html: sanitizeLyrics(datas.lyrics.lyrics.body.html)}}></div>
            )
        }
    }

    return (
        <div className='lyric-wrapper'>
            { renderLyrics() }
        </div>
    )
}

export default Lyrics