import React from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { getKey } from './graphql/Queries'

class MiniNavBar extends React.Component {
render () {
  return (
    <div className="navbar m-auto bg-white">
      <div className="col-xs-2">
        <Link to='/' title="logo"><img className="back-image" alt="back" src="images/back-button-dark.png"></img></Link>
      </div>
      <div className="col-xs-8 text-center">
        <Link to='/' title="logo"><img className="micro-logo-image" alt="logo" src="images/logo.png"></img></Link>
      </div>
      <div className="col-xs-2 text-right color-black80">
        <img className="user-image-small" alt="back" src="images/user-button-dark.png"></img>
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
)(MiniNavBar)
