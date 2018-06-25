import React from 'react'
import { Link } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { getBrick, getKey } from './graphql/Queries'
import { updateBrick } from './graphql/Mutations'
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
  //const { title, subtitle } = this.state.workshop
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
    <MiniNavBar link={'/'+this.props.match.params.super} />
    <form onSubmit={e => {
        e.preventDefault();
        e.stopPropagation(); // preserve click outside for modal

        const form = e.target;
        const data = new FormData(form);
        //onSubmit({workshop_id:workshop_id, title:form.elements['title'].value, subtitle:form.elements['subtitle'].value});
      }}>
      <div className="navbar look-workshop border-bottom box-shadow">
        <div className="workshop-navbar container text-center">
          <div className=''>
            <span className='h3'>
              <input className='form-control form-control-lg my-1'
                name='title'
                autoFocus
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
            {(this.props.me && this.props.workshop && this.props.me.owner===this.props.workshop.owner)?
              <img onClick={this.updateWorkshop} className="save-image m-2" alt="save" src="images/save-button.png"></img>:null}
          </div>
        </div>
        <div className="workshop-navbar mt-1 container">
          <h5 className='col-xs-6 color-white80'>{this.props.workshop.owner}</h5>
          <h5 className='col-xs-6 color-white80 text-right'></h5>
        </div>
      </div>
    </form>
  </div>
)}}

export default compose(
  graphql(getKey, {
    options: props => ({
      variables: { id: localStorage.getItem('key') },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      me: props.data.getKey
    })
  }),
  graphql(getBrick, {
    options: props => ({
      variables: { id: props.match.params.super },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      workshop: (props.data.getBrick)?props.data.getBrick:
      {id:'', title:'Loading...', subtitle:'loading', date:'9999-99-99', pin:'????', owner:'Loading...'}
    })
  }),
  graphql(updateBrick, {
    props: props => ({
      onUpdate: workshop => props.mutate({
        variables: workshop,
        optimisticResponse: {
          __typename: 'Mutation',
          updateBrick: { ...workshop,  __typename: 'Brick' }
        }
      })
    })
  })
)(WorkshopNavBar)
