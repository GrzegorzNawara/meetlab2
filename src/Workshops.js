import React from 'react'
import { Link } from 'react-router-dom';
import Workshop from './components/Workshop'
import debug from './debug'

class Workshops extends React.Component {
  render() {
    let workshops = (this.props.workshops.pinWorkshop && this.props.workshops.pinWorkshop.id)?[this.props.workshops.pinWorkshop].concat(this.props.workshops.mgWorkshops.filter(w => w.id!==this.props.workshops.pinWorkshop.id)):debug(this.props.workshops,'WRK').mgWorkshops
    workshops = workshops.slice()
    .sort((a,b)=>-a.sort.localeCompare(b.sort))
    return (
      <div className="container">
        {debug(workshops,'WORKSHOPS').map((r, i) => (
            <Link to={r.owner+'/'+r.id} key={r.id}>
              {(i%3===0)?<div style= {{height:'10px'}} />:null}
              <Workshop title={r.title} subtitle={r.subtitle} date={r.date} owner={r.owner} PIN={r.pin} look='lookWorkshop'/>
            </Link>
          ))
        }
      </div>
    )
  }
}

export default Workshops
