import React from 'react'
import { Link } from 'react-router-dom';
import saveWorkshop from './database/saveWorkshop'
import listWorkshopsByOwner from './database/listWorkshopsByOwner'
import MenuModal from './MenuModal'
import Workshop from './components/Workshop'
import WorkshopGate from './components/WorkshopGate'
import debug from './debug'

class Workshops extends React.Component {
  state = {
    gateCode: '',
    workshops: []
  }

  loadWorkshops = () => {
    clearInterval(this.timer);
    listWorkshopsByOwner(this.props.mg,
      (workshops) => this.setState({...this.state, workshops }))
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
        {this.state.workshops.filter((b) => b.PIN===localStorage.getItem('gateCode') || b.owner===this.props.mg).map((r, i) => (
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
