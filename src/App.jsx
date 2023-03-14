import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './assets/css/app.css';
import Home from './Pages/Home/Home';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App