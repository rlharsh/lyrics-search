import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../../assets/css/header.css';

const Header = () => {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const doSearch = () => {
        console.log({search})
        navigate(`/search/${search}`, { state: { refresh: true }});
    }

    return (
        <div className='header-wrapper'>
            <div className='header-wrapper__inner'>
                <input type="text" placeholder='Search by artist, title, or lyrics' onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setSearch(e.target.value);
                        doSearch();
                    }
                }}/>
            </div>
        </div>
    )
}

export default Header