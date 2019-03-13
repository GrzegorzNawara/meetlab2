import React from 'react'
import { cssStyles } from '../config/AppConfig'
//import debug from '../debug'

const MirBrick = ({ title, subtitle, score, look, id, running, workshopId, ravenCount, linkTo, sort, stats}) => (
  <div className="col-12 px-1">
    <a href={'http://www.mir91.net/sim/#/'+workshopId+'/'+title+'/'+localStorage.getItem('me')}>
      <div className="rounded p-3 m-1 mb-2 align-items-center"
           style={(!running)?cssStyles['lookSimulationOver']:cssStyles[look]} >
        <h4 className="text-nowrap">
          {(!running)?<img style={{height:'16px', marginRight:'15px', verticalAlign:'baseline'}} src="./images/lock-img.png" alt="Locked"/>:null}
          {'Sprint '+(title-1)}
        </h4>
        <div>Mir'91</div>
      </div>
    </a>
  </div>
)

export default MirBrick
