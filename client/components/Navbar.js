import React from 'react'
import { Link } from 'react-router-dom'
import {FaShoppingCart, FaHome,FaUser} from 'react-icons/fa'


const Navbar = () => {
  return(
    <div className='header'>
      <Link to ="/home">
      <img src= "/picture/logo.png"></img>
      </Link>
     
      <ul className='nav-menu'>
    <li><Link to ="/home">Home{'  '}<FaHome/> </Link></li>
    <li><Link to ="/cart">Cart{'  '}<FaShoppingCart/> </Link></li>
    <li><Link to ="/login">Login/SignUp{'  '}<FaUser/></Link></li>
      </ul>
    </div>
  )
}


export default Navbar
