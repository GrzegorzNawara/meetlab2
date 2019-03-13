import React from 'react'
import { cssStyles } from './config/AppConfig'
//import debug from './debug'

const num = (v) => (v)?0+v:0

const totalPlayerScore = (myscore) => (
  (!myscore)?0:Math.round(
    num(myscore.tasksOpenedScore)+
    num(myscore.tasksAClosedScore)+
    num(myscore.tasksBClosedScore)+
    num(myscore.roomsCleanedScore)+
    num(myscore.alertsDoneScore))
)

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    h,
    m > 9 ? m : (h ? '0' + m : m || '0'),
    s > 9 ? s : '0' + s,
  ].filter(a => a).join(':');
}

class Score extends React.Component {

render() {  return (
  <div className="container">
      <h2 className="pt-4">SCORE</h2>
      {(!this.props.simState || !this.props.simState[this.props.workshopId] || !this.props.simState[this.props.workshopId].score || !this.props.simState[this.props.workshopId].score.sprints)?null:
        this.props.simState[this.props.workshopId].score.sprints.reverse().map(s =>
          <div key={'H'+s.id} >
            <div className="row py-3 mt-4 mb-1 justify-content-center" style={cssStyles.lookScoreRow}>
            <h3 className="col-8">Sprint {s.id-1}</h3>
            <h3 className="col-4 text-right">
              {formatTime(Math.floor((
                ((s.simRealtimeEnd)?
                  s.simRealtimeEnd:Date.now())-
                    s.simRealtimeStart)/1000))}
            </h3>
          </div>
            <div className="row py-3 justify-content-center" style={cssStyles.lookScoreRow}>
              {(!s.players)?null:
                s.players.map((p,i) =>
                <React.Fragment key={"F"+s.id+i} >
                  {(p.u===localStorage.getItem('me'))?
                    <div key={s.id+i} className="col-6 bg-dark text-light">YOU</div>:
                    <div key={s.id+i} className="col-6">Player {i+1}</div>
                  }
                  <div className="col-3 text-right">{totalPlayerScore(p)} VP</div>
                  <div className="col-3 text-right">{Math.round(1000*60*60*totalPlayerScore(p)/(((s.simRealtimeEnd)?s.simRealtimeEnd:Date.now())-s.simRealtimeStart))} VP/h</div>
                </React.Fragment>
              )}
            </div>
          </div>
        )
      }
  </div>
)}}

export default Score
