import React from 'react'
//import debug from '../include/debug'

const Brick = ({ title, subtitle, score, look}) => (
  <div className={look+" w-100 rounded px-3 py-3 my-2 align-items-center"}>
    <div className='row'>
      <div className='col'>
        <h4>{title}</h4>
        <div>{subtitle}</div>
      </div>
      <div className='col text-right'>
        <div className='look-score'>{
          (score)?score.map((s,i) => (
            <div key={i}><div className='look-score-label mb-0 pb-0'>{s.title}</div>{s.points+'%'}</div>
          )):''
        }</div>
      </div>
    </div>
  </div>
)

export default Brick
