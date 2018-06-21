import React from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { getKey } from './graphql/Queries'
import NameTag from './NameTag'

class NavBar extends React.Component {
componentWillMount(){
}
render () {
  return (
  <div className='d-flex flex-container align-items-center p-3 mb-2 bg-white border-bottom box-shadow'>
    <div className="row w-100">
      <div className="col-sm-6">
        <Link className="navbar-brand my-0 mx-auto" to='/' title="logo">
          <img className="logo-image" alt="logo" src="images/logo.png"></img></Link>
      </div>
      <div className="col-sm-6 text-right color-black80">{(this.props.me)?this.props.me.owner:'Guest'}</div>
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
  })
)(NavBar)
