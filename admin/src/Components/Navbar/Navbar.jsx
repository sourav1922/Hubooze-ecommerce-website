import React from 'react';
import "./Navbar.css"
import navlogo from '../../assets/nav-logo.svg';
import navprofile from '../../assets/nav-profile.svg';
const Navbar = () => {
    return (
        <div className='navbar'>
         <img src={navlogo} className='nav-Logo' alt=""/> 
         <img src={navprofile} className='navprofile' alt='' />
        </div>
    )
}

export default Navbar