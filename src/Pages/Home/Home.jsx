import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../../assets/css/home.css';

const Home = () => {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const doSearch = () => {
        navigate(`/search/${search}`);
    }

    return (
        <>
        <div className='hero-videobg'>
            
            <div className='hero-center'>
                <div className='darken-area-one'></div>

                <div className='center-container'>
                    <h1>Lyrical Genius</h1>
                    <p>Search for any song you can think of.</p>
                    <div className='search-container'>
                        <input type="text" placeholder='Search by artist, title, or lyrics' onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setSearch(e.target.value);
                                    doSearch();
                                }
                            }} onChange={(e) => setSearch(e.target.value)}/>
                        <button onClick={doSearch} type='button'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>

            </div>
            
        </div>
        </>
    )
}

export default Home