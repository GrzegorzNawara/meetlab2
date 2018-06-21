import React from 'react'
//import debug from '../include/debug'

const NameTag = ({ title, look}) => (
  <div className={look+" w-100 rounded px-3 py-3 my-2 align-items-center"}>
    <h4>{title}</h4>
  </div>
)

export default NameTag
