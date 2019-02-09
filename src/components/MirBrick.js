import React from 'react'
import { cssStyles } from '../config/AppConfig'
//import debug from '../debug'

const alphaNames=['ZERO','Alpha','Bravo','Charlie','Delta','Echo','Foxtrot',
          'Golf','Hotel','India','Juliet','Kilo','Lima','Mike','November','Oscar',
          'Papa','Quebec','Romeo','Sierra','Tango','Uniform','Victor','Whiskey',
          'Xray','Yankee'];
const MirBrick = ({ title, subtitle, score, look, id, ravenCount, linkTo, sort, stats}) => (
  <div className="col px-1 align-items-center">
    <a href={(Date.now()-sort>3600000)?window.location.href:'http://www.mir91.net/sim/#/'+id+'/'+((title>24)?'Deep'+title:alphaNames[title])+'/'+localStorage.getItem('me')}>
      <div className="text-center rounded p-1 px-2 m-1"
           style={(Number(Date.now().toString())-Number(sort)>60*60*1000 ||
             (stats && stats[id] && stats[id]['Status']==='Game Over'))?cssStyles['lookSimulationOver']:cssStyles[look]} >
        <img style={{ height:'16px', width:'auto' }} alt="logo" src={cssStyles.logo.white}></img>
        <h2 className="text-nowrap">
          {(Date.now()-sort>3600000)?<img style={{height:'16px', marginRight:'15px', verticalAlign:'baseline'}} src="./images/lock-img.png" alt="Locked"/>:null}
          {(title>24)?'Deep'+title:alphaNames[title]}
        </h2>
        { (stats && stats[id])?
          <div>{stats[id]['Result']+'/'+stats[id]['MaxResult']} VP</div>
          :<div>&nbsp;</div> }
      </div>
    </a>
  </div>
)

export default MirBrick
