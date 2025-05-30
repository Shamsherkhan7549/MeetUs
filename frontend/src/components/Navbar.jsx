import React from 'react'


const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='meetus-logo'>
            <img src="/meetus-logo.png" alt="logo" />
        </div>

        <div className='register'>
            <div className='join-guest'>
                <p><i className="fa-solid fa-x"></i></p>
                <h5>Join as Guest</h5>
                <h5>Register</h5>
            </div>
            <h5 className='login'><a href="">Login</a></h5>

        </div>
    </nav>
  )
}

export default Navbar