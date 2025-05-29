
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Authentication from './components/Authentication';
import { AuthProvider } from './context/AuthContext';
import VideoMeet from './pages/VideoMeet';


const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/auth' element={<Authentication/>}/>
        <Route path='/:url' element={<VideoMeet/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App