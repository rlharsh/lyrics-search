import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/app.css';
import Home from './Pages/Home/Home';
import Lyrics from './Pages/Lyrics/Lyrics';
import Search from './Pages/Search/Search';

import { Configuration, OpenAIApi } from 'openai';
import './assets/css/app.css'
import Chat from './Components/Chat/Chat.jsx';

function App() {

  const openAIkey = import.meta.env.VITE_OPENAI_API_KEY;

  const openai = new OpenAIApi(new Configuration({
    apiKey: openAIkey
  }));

  const [chatValue, setChatValue] = useState('');

  const sendQuery = (val) => {
    setChatValue(val);
  }

  return(
    <>
    <Chat openai={openai} chatValue={chatValue}/>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/search/:id' element={<Search />} />
        <Route path='/lyrics/:id?/:artist' element={<Lyrics handleChatValue={sendQuery} />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App