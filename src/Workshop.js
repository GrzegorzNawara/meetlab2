import React from 'react'
//import debug from '../include/debug'

const Workshop = ({ title, subtitle, date, owner, pin, look}) => (
  <div className={look+" w-100 rounded px-3 py-3 my-2 align-items-center"}>
    <div className='col-12 w-100 m-0 p-0'>
      <div className='row mb-2'>
        <div className='col-12 text-left'>
          <span className="">
            <span className='h2'>{title}</span>
            <br /><span className='h5 color-white80'>{subtitle}</span>
          </span>
        </div>
      </div>
      <div className='row m-0 p-0'>
        <div className='col-6 p-0'>
          <span className='h5 color-white80'>{owner}</span>
        </div>
        <div className='col-6 p-0 text-right'>
          <span className='h5 color-white80'>{date}</span>
        </div>
      </div>
    </div>
  </div>
)

export default Workshop
