import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom';
import listBricks from './queries/ListBricks'
import BrickDeleteSubscription from './subscriptions/BrickDeleteSubscription'
import BrickCreateSubscription from './subscriptions/BrickCreateSubscription'
import BrickUpdateSubscription from './subscriptions/BrickUpdateSubscription'
import debug from './include/debug'

class Bricks2 extends React.Component {

  componentWillMount(){
    this.props.subscribeToDelete();
    this.props.subscribeToUpdate();
    this.props.subscribeToCreate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.super!==prevProps.super) {
      debug(this.props.subscribeToCreate(this.props.super),'UPDATE');
    }
  }
  render() {
    return (
      <div className="container">
        {this.props.super}
        {
          this.props.bricks.map((r, i) => (
            <Link to={r.id} key={r.id}>
              <div className="w-100 rounded bg-warning px-3 py-3 my-2 align-items-center" key={i}>
                <h3>{r.title}<br /><div className='h5 text-dark'>{r.subtitle}</div></h3>
              </div>
            </Link>
          ))
        }
      </div>
    )
  }
}

export default compose(
  graphql(listBricks, {
    options: props => ({
      variables: { super: props.super },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      getProps: () => {( props )},
      bricks: props.data.listBricks?props.data.listBricks.items
        .slice().sort((a,b)=>(-a.sort.localeCompare(b.sort))):[],
      subscribeToDelete: (params) => {
        props.data.subscribeToMore({
          document: BrickDeleteSubscription,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
            ...prev,
            listBricks: {
              __typename: 'BrickConnection',
              items: [...prev.listBricks.items.filter(brick => brick.id !== data.onDeleteBrick.id)]
          }})
      })},
      subscribeToUpdate: (params) => {
        props.data.subscribeToMore({
          document: BrickUpdateSubscription,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
              ...prev,
              listBricks: {
                __typename: 'BrickConnection',
                items: [data.onUpdateBrick, ...prev.listBricks.items.filter(brick => brick.id !== data.onUpdateBrick.id)]
          }})
      })},
      subscribeToCreate: (params) => {

          props.data.subscribeToMore({
          document: BrickCreateSubscription,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
              ...prev,
              listBricks: {
                __typename: 'BrickConnection',
                items: (debug(data.onCreateBrick.super,'CREATE')===debug(props.ownProps.super,'OWN'))?[data.onCreateBrick, ...prev.listBricks.items.filter(brick => brick.id !== data.onCreateBrick.id)]:[...prev.listBricks.items]
          }})
      })}
    })
  })
)(Bricks2)
