import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom';
import { getKey, getBrick, listBricks } from './graphql/Queries'
import { onCreateBrick, onUpdateBrick, onDeleteBrick } from './graphql/Subscriptions'
import Brick from './Brick'
import PINLock from './PINLock'
//import debug from './include/debug'

class Bricks extends React.Component {
  state = {
    PIN: '0000'
  }
  componentWillMount(){
    this.props.subscribeToDelete();
    this.props.subscribeToUpdate();
    this.props.subscribeToCreate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.super!==prevProps.super) {
      this.props.subscribeToCreate(this.props.super);
    }
  }

  onPINSubmit = (PIN) => {
    this.setState({ ...this.state, PIN:PIN});
  }

  render() {
    if(!((this.props.me && this.props.me.owner===this.props.workshop.owner)
      || (this.props.workshop && localStorage.getItem('PIN'+this.props.workshop.id)===this.props.workshop.PIN)
    )) return (<PINLock workshop={this.props.workshop} onPINSubmit={this.onPINSubmit} />);
    return (
      <div className="container">
        {
          this.props.bricks.map((r, i) => {
            switch (r.type) {
              case 'DOCUMENT': return (
                  <Link to={r.super+'/doc/'+JSON.parse(r.params).doc} key={r.id}>
                    <Brick key={'brick'+i} title={r.title} subtitle={r.subtitle} onClick={()=>{}} look={JSON.parse(r.params).look} />
                  </Link>
                )
              default:return (
                <Brick key={'brick'+i} title={r.title} subtitle={r.subtitle} onClick={()=>{}} look='look-brick' />
              )
            }
          })
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
  graphql(getBrick, {
    options: props => ({
      variables: { id: props.super },
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      workshop: (props.data.getBrick)?props.data.getBrick:
      {id:'', title:'Loading...', subtitle:'loading', date:'9999-99-99', pin:'????', owner:'Loading...'}
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
                items: (data.onCreateBrick.super===props.ownProps.super)?[data.onUpdateBrick, ...prev.listBricks.items.filter(brick => brick.id !== data.onUpdateBrick.id)]:[...prev.listBricks.items]
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
)(Bricks)
