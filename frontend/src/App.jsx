
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Authentication from './components/Authentication';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/auth' element={<Authentication/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App