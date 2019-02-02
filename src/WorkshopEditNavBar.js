import React from 'react'
import { withRouter } from 'react-router-dom'
import { cssStyles } from './config/AppConfig'
import MiniNavBar from './MiniNavBar'
//import debug from './include/debug'

class WorkshopNavBar extends React.Component {
  state = {
    title: '',
    subtitle: ''
  }
onChange = (key, value) => {
  this.setState({ [key]: value })
}
updateWorkshop = () => {
  this.props.onUpdate({
    ...this.props.workshop,
    title: (this.state.title)?this.state.title:this.props.workshop.title,
    subtitle: (this.state.subtitle)?this.state.subtitle:this.props.workshop.subtitle
  });
  this.props.history.goBack();
}
render () {
  return (
  <div>
    <MiniNavBar mg={this.props.mg} link={'/'+this.props.match.params.super} />
    <form onSubmit={e => {
        e.preventDefault();
        e.stopPropagation(); // preserve click outside for modal

        //const form = e.target;
        //const data = new FormData(form);
        //onSubmit({workshop_id:workshop_id, title:form.elements['title'].value, subtitle:form.elements['subtitle'].value});
      }}>
      <div className="navbar border-bottom box-shadow" style={cssStyles.lookWorkshop}>
        <div className="workshop-navbar container text-center">
          <div className=''>
            <span className='h3'>
              <input className='form-control form-control-lg my-1'
                name='title'
                autoFocus
                autoComplete="nope"
                onChange={evt => this.onChange('title', evt.target.value)}
                placeholder={this.props.workshop.title} />
              <span className='h3 color-white80'>
                <input className='form-control form-control my-1'
                  name='subtitle'
                  onChange={evt => this.onChange('subtitle', evt.target.value)}
                  placeholder={this.props.workshop.subtitle} />
              </span>
            </span>
          </div>
          <div className="">
            {(this.props.workshop && this.props.mg===this.props.workshop.owner)?
              <img onClick={this.updateWorkshop} className="save-image m-2" alt="save" src="images/save-button.png"></img>:null}
          </div>
        </div>
        <div className="workshop-navbar mt-1 container">
          <h5 className='col-xs-6 color-white80'>{this.props.workshop.owner}</h5>
        </div>
      </div>
    </form>
  </div>
)}}

export default withRouter(WorkshopNavBar)
