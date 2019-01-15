import React from 'react'
import { cssStyles } from '../config/AppConfig'
import debug from '../debug'

const ravenNames=['ZERO','Alpha','Bravo','Charlie','Delta','Echo','Foxtrot',
          'Golf','Hotel','India','Juliet','Kilo','Lima','Mike','November','Oscar',
          'Papa','Quebec','Romeo','Sierra','Tango','Uniform','Victor','Whiskey',
          'Xray','Yankee'];
const ravenIterations=['NULL','1','2','3','4','5','6','7'];
const RavenBrick = ({ title, subtitle, score, look, id, ravenCount, linkTo}) => (
  <div className="col px-1 align-items-center">
    <a href={'http://raven.ignifer-labs.com/#/player/'+id+'/'+ravenNames[title]+'/'+localStorage.getItem('me')}>
      <div className="text-center rounded p-3 m-1" style={cssStyles[look]} >
        <img style={{ height:'10px', width:'auto' }} alt="logo" src={cssStyles.logo.white}></img>
        <h2>{(title>24)?'Deep'+title:ravenNames[title]}</h2>
      </div>
    </a>
  </div>
)

export default RavenBrick
