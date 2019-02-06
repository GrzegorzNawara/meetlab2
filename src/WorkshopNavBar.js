import React from 'react'
import { Link } from 'react-router-dom'
import { cssStyles } from './config/AppConfig'
//import debug from './debug'

class WorkshopNavBar extends React.Component {
render () {
  return (
  <div>
    <div className="navbar border-bottom box-shadow" style={cssStyles.lookWorkshop}>
      <div className="workshop-navbar container">
        <div className='text-left'>
          <span className='h2'>{this.props.workshop.title}<br />
          <span className='h4 color-white80'>{this.props.workshop.subtitle}</span></span>
        </div>
        <div>
          {(this.props.workshop && this.props.mg===this.props.workshop.owner)?
           <Link to={'/'+this.props.workshop.owner+'/'+this.props.workshop.id+'/edit'} title="edit"><img  className="edit-image" alt="edit" src="./images/edit-button.png"></img></Link>:null}
        </div>
      </div>
      <div className="workshop-navbar mt-1 container">
        <h5 className='col-xs-6 color-white80'>{this.props.workshop.owner}</h5>
        <h5 className='col-xs-6 color-white80 text-right'>{'PIN: '+this.props.workshop.PIN}</h5>
      </div>
    </div>
  </div>
)}}

export default WorkshopNavBar
