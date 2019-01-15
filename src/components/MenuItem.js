import React from 'react'
import { cssStyles } from '../config/AppConfig'
//import debug from '../include/debug'

const MenuItem = ({ title, subtitle, look, onClick}) => (
  <div style={cssStyles[look]} className={"w-100 rounded px-3 py-3 my-2 align-items-center"}
    onClick={e => {
        e.stopPropagation(); // preserve click outside for modal
        onClick();
      }}>
    <h4>{title}</h4>
    <div>{subtitle}</div>
  </div>
)

export default MenuItem
