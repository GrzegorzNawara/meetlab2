import React from 'react'
import { graphql, compose } from 'react-apollo'
import { getBrick, listBricks } from './graphql/Queries'
import { onCreateBrick, onUpdateBrick, onDeleteBrick } from './graphql/Subscriptions'
import { cssStyles } from './config/AppConfig'
import Brick from './components/Brick'
import RavenBrick from './components/RavenBrick'
import debug from './debug'

class Bricks extends React.Component {

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

  render() {
    return (
      <div className="container"><div className="row py-3 justify-content-center">
        {
          this.props.bricks.map((r, i) => {
            switch (r.type) {
              case 'DOCUMENT': return (
                  <Brick key={'brick'+i} title={r.title} subtitle={r.subtitle}
                    look={JSON.parse(r.params).look}
                    linkTo={r.super+'/doc/'+JSON.parse(r.params).doc} />
                )
              case 'RAVEN':
                return (
                    <RavenBrick key={'brick'+i} title={r.title}
                      id={r.id} look={JSON.parse(r.params).look} />
                )
              case 'MIR': return (
                  <a key={'link'+i} href={'http://mir.ignifer-labs.com/#/'+r.id+'/'+localStorage.getItem('me')}>
                    <Brick key={'brick'+i} title={r.title} subtitle={r.subtitle}
                      look={JSON.parse(r.params).look} />
                  </a>
                )
              case 'MC_TEST': return (
                    <Brick key={'brick'+i} title={r.title} subtitle={r.subtitle}
                      score={
                        (localStorage.getItem('mc-score-'+JSON.parse(r.params).test_id))?
                        JSON.parse(localStorage.getItem('mc-score-'+JSON.parse(r.params).test_id)):[]
                      }
                      look={JSON.parse(r.params).look}
                      linkTo={r.super+'/test/'+JSON.parse(r.params).doc} />
                )
              default:return (
                <Brick key={'brick'+i} title={r.title} subtitle={r.subtitle}
                  look='look-brick' />
              )
            }
          })
        }
      </div></div>
    )
  }
}

export default compose(
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
        .slice().sort((a,b)=>(a.sort.localeCompare(b.sort))):[],

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
