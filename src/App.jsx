import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/app.css';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Lyrics from './Pages/Lyrics/Lyrics';
import Search from './Pages/Search/Search';

function App() {
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