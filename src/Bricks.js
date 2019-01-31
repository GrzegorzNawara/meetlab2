import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { getBrick, listBricks } from './graphql/Queries'
import { createBrick, deleteBrick } from './graphql/Mutations'
import { onCreateBrick, onUpdateBrick, onDeleteBrick } from './graphql/Subscriptions'
//import { cssStyles } from './config/AppConfig'
import MenuModal from './MenuModal'
import Brick from './components/Brick'
import RavenBrick from './components/RavenBrick'
import RavenResultBrick from './components/RavenResultBrick'
//import debug from './debug'

class Bricks extends React.Component {
  timer = null;
  ravenSim = {};
  myBricks = [];
  state = {};

  getRavenStats = () => {
    if(this.props.bricks && this.props.bricks.filter((b)=>b.type==='RAVEN').length>0){
      fetch('http://api.ignifer-labs.com/raven/api_read_results.php',{
        method: 'post',
        body: JSON.stringify(
          this.props.bricks.filter((b)=>b.type==='RAVEN').map((b)=>(b.id))
      )})
        .then(result => result.json())
        .then(result => this.setState({ ravenStats: result }));


      clearInterval(this.timer);
      this.timer = setInterval(()=> this.getRavenStats(), 15000);
    }
  }

  componentWillMount(){
    this.props.subscribeToDelete();
    this.props.subscribeToUpdate();
    this.props.subscribeToCreate();
    this.timer = setInterval(()=> this.getRavenStats(), 1000);
  }

  componentWillUnmount() {
    //this.props.unsubscribe();
    clearInterval(this.timer);
    this.timer = null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.super!==prevProps.super) {
      this.props.subscribeToCreate(this.props.super);
    }
  }

  render() {
    this.ravenSim = { clear:false, actualSort:0, lastSort:0, count:0, result:0, users:0 };
    let title=0;
    let last=0;
    this.myBricks = this.props.bricks.slice().reverse().map((b,i,ba) => {
      if(b.type!=='RAVEN') return b;
      (i>0 && b['sort']-last<60000)?title=title+1:title=1;
      last=b['sort'];
      return {...b,title:title};
    });


    return (
      <div className="container"><div className="row py-3 justify-content-center">
        {
          this.myBricks.reverse().map((r, i) => {
            switch (r.type) {
              case 'DOCUMENT': return (
                  <Brick key={'brick'+i} title={r.title} subtitle={r.subtitle}
                    look={JSON.parse(r.params).look}
                    linkTo={r.super+'/doc/'+JSON.parse(r.params).doc} />
                )
              case 'RAVEN':
                this.ravenSim = {
                  result: (this.state.ravenStats && this.state.ravenStats[r.id])?this.ravenSim.result+this.state.ravenStats[r.id]['Result']:0,
                  users: (this.state.ravenStats && this.state.ravenStats[r.id])?this.ravenSim.users+this.state.ravenStats[r.id]['Users']:0
                }
                return (
                    <React.Fragment key={'brick-f'+i}>
                      <RavenBrick key={'brick'+i} title={r.title}
                        id={r.id} stats={this.state.ravenStats} sort={r['sort']}
                        look={JSON.parse(r.params).look} />
                    {(r.title!==1)?null:
                      <RavenResultBrick key={'brick-r'+i}
                        id={r.id} stats={this.state.ravenStats} sort={r['sort']}
                        ravenSim={this.ravenSim}
                        look={JSON.parse(r.params).look} />}
                    </React.Fragment>
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
        </div>

        <MenuModal
          super={this.props.super}
          workshop={this.props.workshop}
          bricks={this.props.bricks}
          mg={this.props.mg}
          history={this.props.history}
          onAdd={this.props.onAdd}
          onDelete={this.props.onDelete} />
      </div>
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
      fetchPolicy: 'cache-and-network' //'network-only'
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
                items: (data.onCreateBrick.super===props.ownProps.super)?
                  [...prev.listBricks.items.filter(brick => brick.id !== data.onCreateBrick.id),
                    data.onCreateBrick]:[...prev.listBricks.items]
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
          let data = proxy.readQuery({ query: listBricks, variables: { super: createBrick.super } });
          data.listBricks.items.filter((i)=>i.id!==createBrick.id).push(createBrick);
          proxy.writeQuery({ query: listBricks, variables: { super: createBrick.super }, data });
        }
      })
  })}),
  graphql(deleteBrick, {
    props: props => ({
      onDelete: (brick) => props.mutate({
        variables: { id: brick.id },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteBrick: { ...brick,  __typename: 'Brick' }
        },
        update: (proxy, { data: { deleteBrick } }) => {
          const data = proxy.readQuery({ query: listBricks, variables: { super: deleteBrick.super } });
          data.listBricks.items.filter((r)=>(r.id!==deleteBrick.id));
          proxy.writeQuery({ query: listBricks, variables: { super: deleteBrick.super }, data });
        }
      })
  })})
)(withRouter(Bricks))
