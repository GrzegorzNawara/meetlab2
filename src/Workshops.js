import React from 'react'
import { graphql, compose } from 'react-apollo'
import listWorkshops from './queries/ListWorkshops'
import WorkshopDeleteSubscription from './subscriptions/WorkshopDeleteSubscription'
import WorkshopCreateSubscription from './subscriptions/WorkshopCreateSubscription'
import WorkshopUpdateSubscription from './subscriptions/WorkshopUpdateSubscription'
import debug from './include/debug'

class Workshops extends React.Component {
  componentWillMount(){
    this.props.subscribeToDelete();
    this.props.subscribeToUpdate();
    this.props.subscribeToCreate();
  }
  render() {
    return (
      <div className="container">
        {
          this.props.workshops.map((r, i) => (
            <div className="w-100 rounded bg-warning px-3 py-3 my-2 align-items-center" key={i}>
              <h2>{r.title}</h2>
              <p >{r.subtitle}</p>
              <p >{r.owner}</p>
              <p >Date: {r.date}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

export default compose(
  graphql(listWorkshops, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: (props) => ({
      workshops: props.data.listWorkshops ? props.data.listWorkshops.items : [],
      subscribeToDelete: (params) => {
        props.data.subscribeToMore({
          document: WorkshopDeleteSubscription,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
            ...prev,
            listWorkshops: {
              __typename: 'WorkshopConnection',
              items: [...prev.listWorkshops.items.filter(workshop => workshop.id !== data.onDeleteWorkshop.id)]
          }})
      })},
      subscribeToUpdate: (params) => {
        props.data.subscribeToMore({
          document: WorkshopUpdateSubscription,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
              ...prev,
              listWorkshops: {
                __typename: 'WorkshopConnection',
                items: [data.onUpdateWorkshop, ...prev.listWorkshops.items.filter(workshop => workshop.id !== data.onUpdateWorkshop.id)]
          }})
      })},
      subscribeToCreate: (params) => {
        props.data.subscribeToMore({
          document: WorkshopCreateSubscription,
          updateQuery: (prev, { subscriptionData: { data } }) => ({
              ...prev,
              listWorkshops: {
                __typename: 'WorkshopConnection',
                items: [data.onCreateWorkshop, ...prev.listWorkshops.items.filter(workshop => workshop.id !== data.onCreateWorkshop.id)]
          }})
      })}
    })
  })
)(Workshops)
