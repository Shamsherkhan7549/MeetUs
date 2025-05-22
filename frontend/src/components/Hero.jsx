import React from 'react'

const Hero = () => {
  return (
    <div className='heroContainer'>
        <div className='connect'>
            <h1><span>Connect</span> with your <br /> Loved Ones</h1>
            <p>Cover a distance by apna video call</p>
            <div><button>Get Started</button></div>
        </div>

        <div className='img-container'>
            <img src="/mobile.png" alt="connect-image" />
        </div>
        
    </div>
  )
}

export default Hero