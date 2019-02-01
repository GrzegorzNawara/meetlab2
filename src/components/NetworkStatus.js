import React from 'react'
import { cssStyles } from '../config/AppConfig'
//import debug from '../debug'

const NetworkStatus = ({ loading, error }) => (
  <div>
    {loading &&
      <div className='spinner text-nowrap' style={cssStyles.lookSpinner}>
        <img src='./images/loading.gif' alt="" /><span>LOADING</span></div>}
    {error && <p>Error: {JSON.stringify(error)}</p>}
  </div>
)

export default NetworkStatus
