import React from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { getKey } from './graphql/Queries'

class NavBar extends React.Component {
render () {
  return (
  <div className='navbar align-items-center p-3 mb-2 bg-white border-bottom box-shadow'>
    <div className="col-xs-6">
      <Link className="navbar-brand my-0 mx-auto" to='/' title="logo">
        <img className="logo-image" alt="logo" src="images/logo.jpg"></img></Link>
    </div>
    <div className="h5 col-xs-6 text-right color-black80 my-2">
      <img className="user-image" alt="back" src="images/user-button-dark.png"></img>
      {(this.props.me)?this.props.me.owner:'Guest'}</div>
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
  })
)(NavBar)
