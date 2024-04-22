import React, { useContext, useRef } from 'react'
import "./Navbar.css";
import dropdown from '../Assets/dpimg.png'
import { useState } from 'react';
import logo from "../Assets/logo.png"
import cart_icone from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
// import { IoIosArrowDropdownCircle } from "react-icons/io";
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalcartItem } = useContext(ShopContext);
  const menuref = useRef();
  const dropDownToole = (e) => {
    menuref.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to='/'>
          <img src={logo} alt="" />
        </Link>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <p>StyleHub</p>
        </Link>

      </div>
      <img className="nav-drop-dwon" onClick={dropDownToole} src={dropdown} alt='' />
      <ul ref={menuref} className="nav-menu">
        <li onClick={() => { setMenu("shop") }}> <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Woman</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button> : <Link to="/login"><button >Login</button></Link>}
        <Link to="/cart"><img src={cart_icone} alt="" /></Link>
        <div className="nav-cart-count">{getTotalcartItem()}</div>
      </div>
    </div>
  )
}

export default Navbar
