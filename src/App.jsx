import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/app.css';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Search from './Pages/Search/Search';

function App() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/search/:id' element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App