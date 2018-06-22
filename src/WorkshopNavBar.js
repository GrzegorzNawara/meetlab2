import React from 'react'
import { Link } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { getBrick, getKey } from './graphql/Queries'
import MiniNavBar from './MiniNavBar'
import debug from './include/debug'

class WorkshopNavBar extends React.Component {
render () {
  return (
  <div>
    <MiniNavBar />
    <div className="navbar look-workshop border-bottom box-shadow">
      <div className="workshop-navbar container">
        <div className='text-left'>
          <span className='h3'>{this.props.workshop.title}<br />
          <span className='h3 color-white80'>{this.props.workshop.subtitle}</span></span>
        </div>
        <div>
          {(this.props.me && this.props.workshop && this.props.me.owner===this.props.workshop.owner)?
           <img  className="edit-image" alt="edit" src="images/edit-button.png"></img>:null}
        </div>
      </div>
      <div className="workshop-navbar mt-1 container">
        <h5 className='col-xs-6 color-white80'>{this.props.workshop.owner}</h5>
        <h5 className='col-xs-6 color-white80 text-right'>{'PIN: '+this.props.workshop.PIN}</h5>
      </div>
    </div>
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
  })
)(WorkshopNavBar)
