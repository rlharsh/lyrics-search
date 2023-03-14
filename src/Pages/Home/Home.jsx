import React, { useState } from 'react'

import '../../assets/css/home.css';

const Home = () => {

    const [search, setSearch] = useState('');

    function doSearch() {
        console.log(search)
    }

    return (
        <div className='hero-videobg'>
            <h1>Lyric Search</h1>
            <p>Search for any song you can think of.</p>
            <div className="search">
                <input type="text" onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={doSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>
    )
}

export default Home