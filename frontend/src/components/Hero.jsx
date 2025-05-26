import React from 'react'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className='heroContainer'>
        <div className='connect'>
            <h1><span>Connect</span> with your <br /> Loved Ones</h1>
            <p>Cover a distance by Meetus video call</p>
            <button>
              <Link className='auth-path' to="/auth" > Get Started</Link>
            </button>
        </div>

        <div className='img-container'>
            <img src="/mobile.png" alt="connect-image" />
        </div>
        
    </div>
  )
}

export default Hero