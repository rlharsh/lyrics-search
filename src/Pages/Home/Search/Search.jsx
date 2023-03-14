import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Search = () => {

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
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        })

    }, []);

    return (
        <div>
            { params.id }
        </div>
    )
}

export default Search