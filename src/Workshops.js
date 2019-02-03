import React from 'react'
import { Link } from 'react-router-dom';
import saveWorkshop from './database/saveWorkshop'
import listWorkshopsByOwner from './database/listWorkshopsByOwner'
import getWorkshopByPin from './database/getWorkshopByPin'
import MenuModal from './MenuModal'
import Workshop from './components/Workshop'
import WorkshopGate from './components/WorkshopGate'
import debug from './debug'

class Workshops extends React.Component {
  state = {
    gateCode: '',
    workshops: [],
    pinWorkshop: {}
  }

  loadWorkshops = () => {
    clearInterval(this.timer);
    if(this.state.gateCode.length===6)
      getWorkshopByPin(this.state.gateCode,
        (pinWorkshop) => this.setState({...this.state, workshops: (debug(pinWorkshop,'PINW') && pinWorkshop.id)?this.state.workshops.concat([debug(pinWorkshop,'PINW')]):this.state.workshops, pinWorkshop }))

    listWorkshopsByOwner(this.props.mg,
      (workshops) => this.setState({...this.state, workshops: (this.state.pinWorkshop && this.state.pinWorkshop.id)?workshops.concat([this.state.pinWorkshop]):workshops }))
    this.timer = setInterval(this.loadWorkshops, 5000);
  }

  componentWillMount(){
    if (this.props.routerProps.location.hash)
      this.props.routerProps.history.push('./');

    this.loadWorkshops()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidUpdate(prevProps) {
    if(this.props.mg!==prevProps.mg)
      this.loadWorkshops()
  }

  render() {
    //{this.props.super}
    return (
      <div className="container">
        <WorkshopGate look='lookGate' workshopList={this} />
        {this.state.workshops.map((r, i) => (
            <Link to={r.owner+'/'+r.id} key={r.id}>
              {(i%3===0)?<div style= {{height:'10px'}} />:null}
              <Workshop title={r.title} subtitle={r.subtitle} date={r.date} owner={r.owner} PIN={r.pin} look='lookWorkshop'/>
            </Link>
          ))
        }
        <MenuModal
          super=''
          bricks={this.state.workshops}
          mg={this.props.mg}
          onAdd={saveWorkshop}
          onDelete={() => {}} />
      </div>
    )
  }
}

export default Workshops
