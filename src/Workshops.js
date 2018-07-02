import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom';
import { listBricks, getKey } from './graphql/Queries'
import { onCreateBrick, onUpdateBrick, onDeleteBrick } from './graphql/Subscriptions'
import Workshop from './components/Workshop'
//import debug from './include/debug'

class Workshops extends React.Component {

  componentWillMount(){
    if (this.props.routerProps.location.hash) this.props.routerProps.history.push('./');
    this.props.subscribeToUpdate();
    this.props.subscribeToCreate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.super!==prevProps.super) {
      this.props.subscribeToCreate(this.props.super);
    }
  }
  render() {
    //{this.props.super}
    return (
      <div className="container">
        {this.props.bricks.map((r, i) => (
            <Link to={r.id} key={r.id}>
              {(i%3===0)?<div style= {{height:'10px'}} />:null}
              <Workshop title={r.title} subtitle={r.subtitle} date={r.date} owner={r.owner} PIN={r.pin} look='look-workshop'/>
            </Link>
          ))
        }
      </div>
    )
  }
}

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
  graphql(listBricks, {
    options: props => ({
      variables: { super: props.super },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      getProps: { ...props },
      bricks: props.data.listBricks?props.data.listBricks.items
        .filter((r) => (r.title!=='Invisible Workshop' || (props.ownProps.me && r.owner===props.ownProps.me.owner)))
        .slice().sort((a,b)=>(-a.sort.localeCompare(b.sort))):[],
      subscribeToDelete: (params) => {
        props.data.subscribeToMore({
          document: onDeleteBrick,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
            ...prev,
            listBricks: {
              __typename: 'BrickConnection',
              items: [...prev.listBricks.items.filter(brick => brick.id !== data.onDeleteBrick.id)]
          }})
      })},
      subscribeToUpdate: (params) => {
        props.data.subscribeToMore({
          document: onUpdateBrick,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
              ...prev,
              listBricks: {
                __typename: 'BrickConnection',
                items: [data.onUpdateBrick, ...prev.listBricks.items.filter(brick => brick.id !== data.onUpdateBrick.id)]
          }})
      })},
      subscribeToCreate: (params) => {

          props.data.subscribeToMore({
          document: onCreateBrick,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
              ...prev,
              listBricks: {
                __typename: 'BrickConnection',
                items: (data.onCreateBrick.super===props.ownProps.super)?[data.onCreateBrick, ...prev.listBricks.items.filter(brick => brick.id !== data.onCreateBrick.id)]:[...prev.listBricks.items]
          }})
      })}
    })
  })
)(Workshops)
