import React from 'react'
import { Link } from 'react-router-dom'
import { cssStyles } from './config/AppConfig'

const MiniNavBar = ({link}) => (
    <div className="navbar m-auto bg-white">
      <div className="col-xs-2">
        <Link to={link} title="logo"><img className="back-image" alt="back" src="images/back-button-dark.png"></img></Link>
      </div>
      <div className="col-xs-8 text-center">
        <Link to='/' title="logo"><img className="micro-logo-image" alt="logo" src={cssStyles.logo.navBar}></img></Link>
      </div>
      <div className="col-xs-2 text-right color-black80">
        <img className="user-image-small" alt="back" src="images/user-button-dark.png"></img>
        {(localStorage.getItem('mg'))?localStorage.getItem('mg'):'Guest'}</div>
    </div>
)


export default MiniNavBar
