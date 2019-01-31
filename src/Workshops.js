import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom';
import { listBricks } from './graphql/Queries'
import { createBrick } from './graphql/Mutations'
import { onCreateBrick, onUpdateBrick, onDeleteBrick } from './graphql/Subscriptions'
import MenuModal from './MenuModal'
import Workshop from './components/Workshop'
import WorkshopGate from './components/WorkshopGate'
//import debug from './debug'

class Workshops extends React.Component {
  state = { gateCode: '' }

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
        <WorkshopGate look='lookGate' workshopList={this} />
        {this.props.bricks.filter((b) => b.PIN===localStorage.getItem('gateCode') || b.owner===this.props.mg).map((r, i) => (
            <Link to={r.id} key={r.id}>
              {(i%3===0)?<div style= {{height:'10px'}} />:null}
              <Workshop title={r.title} subtitle={r.subtitle} date={r.date} owner={r.owner} PIN={r.pin} look='lookWorkshop'/>
            </Link>
          ))
        }
        <MenuModal
          super=''
          bricks={this.props.bricks}
          mg={this.props.mg}
          onAdd={this.props.onAdd}
          onDelete={() => {}} />
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
  }),
  graphql(createBrick, {
    props: props => ({
      onAdd: (brick) => props.mutate({
        variables: brick,
        optimisticResponse: {
          __typename: 'Mutation',
          createBrick: { ...brick,  __typename: 'Brick' }
        },
        update: (proxy, { data: { createBrick } }) => {
          const data = proxy.readQuery({ query: listBricks, variables: { super: createBrick.super } });
          data.listBricks.items.push(createBrick);
          proxy.writeQuery({ query: listBricks, variables: { super: createBrick.super }, data });
        }
      })
  })})
)(Workshops)
