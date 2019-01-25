import React from 'react'
import { cssStyles } from '../config/AppConfig'
import debug from '../debug'

const RavenResultBrick = ({ title, subtitle, score, look, id, ravenCount, linkTo, sort, stats, ravenSim}) => (
  <div className="col-12 px-1 mb-2 align-items-center">
    <a href={'./documents/raven-team-results.html#/'
        +String((ravenSim.result>0)?
          (Math.round(ravenSim.result/ravenSim.users*100)/100):'0.00')+"/"}>
      <div className="rounded p-2 m-1 text-center" style={cssStyles.lookSimulationResults} >
        Team Result
        <h3>{(ravenSim.result>0)?ravenSim.result:0} VP &nbsp;&nbsp; {(ravenSim.result>0)?(Math.round(ravenSim.result/ravenSim.users*100)/100):'0.00'} VPU</h3>
        {(ravenSim.result/0.75>ravenSim.users)?<span className="fa fa-star" style={cssStyles.rankingChecked}></span>:<span className="fa fa-star" style={cssStyles.rankingUnchecked}></span>}
        {(ravenSim.result/2.25>ravenSim.users)?<span className="fa fa-star" style={cssStyles.rankingChecked}></span>:<span className="fa fa-star" style={cssStyles.rankingUnchecked}></span>}
        {(ravenSim.result/4.7>ravenSim.users)?<span className="fa fa-star" style={cssStyles.rankingChecked}></span>:<span className="fa fa-star" style={cssStyles.rankingUnchecked}></span>}
        {(ravenSim.result/7.6>ravenSim.users)?<span className="fa fa-star" style={cssStyles.rankingChecked}></span>:<span className="fa fa-star" style={cssStyles.rankingUnchecked}></span>}
        {(ravenSim.result/11>ravenSim.users)?<span className="fa fa-star" style={cssStyles.rankingChecked}></span>:<span className="fa fa-star" style={cssStyles.rankingUnchecked}></span>}
      </div>
    </a>
  </div>
)

export default RavenResultBrick
