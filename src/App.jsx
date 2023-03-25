import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/app.css';
import Home from './Pages/Home/Home';
import Lyrics from './Pages/Lyrics/Lyrics';
import Search from './Pages/Search/Search';

import { Configuration, OpenAIApi } from 'openai';

import './assets/css/app.css'

function App() {

  const openAIkey = import.meta.env.VITE_OPEN_API_KEY;

  const openai = new OpenAIApi(new Configuration({
    apiKey: openAIkey
  }));

  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/search/:id' element={<Search />} />
        <Route path='/lyrics/:id?/:artist' element={<Lyrics />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App