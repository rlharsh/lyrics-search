import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

import '../../../assets/css/search.css';
import Featured from '../../../Components/Featured/Featured';

import { Media, Player, controls } from 'react-media-player'
const { PlayPause, MuteUnmute } = controls

const Search = () => {

    const [results, setResults] = useState([]);

    const params = useParams();
    const apiKey = '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566';

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
            params: {q: params.id, per_page: '50', page: '1'},
            headers: {
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
            }
        }

        axios.request(options).then(function (response) {
            setResults(response.data.hits);
        }).catch(function (error) {
            console.log(error);
        })

    }, []);

    const renderFeatured = () => {
        return(
            <Featured data={ results[0] }/>
        )
    }

    const renderResults = () => {
        return(
            <div>
                Results
            </div>
        )
    }

    return (
        <div className='search'>
            <div className='search__left'>
                <h1>{ params.id }</h1>
                <h2>Top Result</h2>

                { renderFeatured() }

            </div>
            <div className='search__right'>
                { renderResults() }
            </div>

            <Media>
        <div className="media">
          <div className="media-player">
            <Player src="http://www.youtube.com/embed/h3YVKTxTOgU" />
          </div>
          <div className="media-controls">
            <PlayPause />
            <MuteUnmute />
          </div>
        </div>
      </Media>
            
        </div>
    )
}

export default Search