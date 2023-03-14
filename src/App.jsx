import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/app.css';
import Home from './Pages/Home/Home';
import Search from './Pages/Home/Search/Search';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/search/:id' element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App