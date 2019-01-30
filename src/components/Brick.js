import React from 'react'
import { Link } from 'react-router-dom';
import { cssStyles } from '../config/AppConfig'
//import debug from '../debug'

const Brick = ({ title, subtitle, score, look, linkTo }) => (
  <div className="col-12 px-1">
    <Link to={linkTo}>
      <div className="rounded p-3 m-1 mb-2 align-items-center" style={cssStyles[look]} >
        <h4>{title}</h4>
        <div>{subtitle}</div>
      </div>
    </Link>
    <div className='text-right'>
      <div style={cssStyles.lookMCScore}>{
        (score)?score.map((s,i) => (
          <div key={i}><div style={cssStyles.lookMCScoreLabel} className='mb-0 pb-0'>{s.title}</div>{s.points+'%'}</div>
        )):''
      }</div>
    </div>
  </div>
)

export default Brick
