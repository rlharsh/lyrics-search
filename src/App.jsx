import './assets/css/app.css';

function App() {
  return(
    <div className='hero-videobg'>
      <video autoPlay muted loop className='background-video'>
        <source src='./assets/video/bg.webm' type='video/webm'></source>
      </video>
      <div className='darken'></div>
    </div>
  )
}

export default App
