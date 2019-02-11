import React from 'react'
import { cssStyles } from '../config/AppConfig'
//import debug from '../debug'

const MirBrick = ({ title, subtitle, score, look, id, running, workshopId, ravenCount, linkTo, sort, stats}) => (
  <div className="col-12 px-1 align-items-center">
    <a href={(!running)?window.location.href:'http://www.mir91.net/sim/#/'+workshopId+'/'+'Sprint '+title+'/'+localStorage.getItem('me')}>
      <div className="text-center rounded p-3 px-2 m-1"
           style={(Number(Date.now().toString())-Number(sort)>60*60*1000 ||
             (!running))?cssStyles['lookSimulationOver']:cssStyles[look]} >
        <h2 className="text-nowrap">
          {(!running)?<img style={{height:'16px', marginRight:'15px', verticalAlign:'baseline'}} src="./images/lock-img.png" alt="Locked"/>:null}
          {'Sprint '+title}
        </h2>
        { (stats && stats[id])?
          <div>{stats[id]['Result']+'/'+stats[id]['MaxResult']} VP</div>
          :<div>&nbsp;</div> }
      </div>
    </a>
  </div>
)

export default MirBrick
