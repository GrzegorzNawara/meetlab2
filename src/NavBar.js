import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => (
  <div className=''>
    <div className="d-flex align-items-center p-3 mb-2 bg-white border-bottom box-shadow">
      <Link className="navbar-brand my-0 mx-auto" to='/' title="logo">
        <img className="logo-image" alt="logo" src="images/logo.png"></img></Link>
    </div>
  </div>
)

export default NavBar
