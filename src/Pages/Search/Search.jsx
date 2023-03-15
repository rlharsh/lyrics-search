import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

import '../../assets/css/search.css';
import Featured from '../../Components/Featured/Featured';
import Tile from '../../Components/Tile/Tile';
import uuid from 'react-uuid';

import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {

    const [results, setResults] = useState([]);
    const [shouldRefresh, setShouldRefresh] = useState(true);

    const location = useLocation();

    const params = useParams();
    const apiKey = '03692bb862msh0a4c9d7ed758965p156a4ajsna6812c358566';

    useEffect(() => {
        if (location.state && location.state.refresh) {
            setShouldRefresh(true);
        }
    }, [location.state]);


    useEffect(() => {

        async function fetchData() {
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
        }

        if (shouldRefresh) {
            fetchData();
            setShouldRefresh(false);
        }
    }, [shouldRefresh]);

    const renderFeatured = () => {
        return(
            <Featured data={ results[0] }/>
        )
    }

    const renderResults = () => {
        return(
                    results.map(item => {
                        return <Tile key={uuid()} data={item} doClick={doClick}/>
                    })
                
        )
    }

    const doClick = (e) => {

    }

    return (
        <div className='search'>
            <div className='search__left'>
            <h1>{params.id}</h1>
                <h2>Featured Result</h2>

                { renderFeatured() }

            </div>
            <div className='search__right'>
                <h2>Potential Matches</h2>
                { renderResults() }
            </div>
        </div>
    )
}

export default Search