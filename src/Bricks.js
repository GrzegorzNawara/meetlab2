import React from 'react'
import { graphql, compose } from 'react-apollo'
import { getBrick, listBricks } from './graphql/Queries'
import { onCreateBrick, onUpdateBrick, onDeleteBrick } from './graphql/Subscriptions'
import { cssStyles } from './config/AppConfig'
import Brick from './components/Brick'
import RavenBrick from './components/RavenBrick'
import debug from './debug'

class Bricks extends React.Component {
  timer = null;
  ravenSim = { clear:false, result:0, users:0 };
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
    this.props.unsubscribe();
    clearInterval(this.timer);
    this.timer = null;
  }

  componentDidUpdate(prevProps) {
    this.props.subscribeToDelete();
    this.props.subscribeToUpdate();
    this.props.subscribeToCreate();
    if (this.props.super!==prevProps.super) {
      this.props.subscribeToCreate(this.props.super);
    }
  }

  render() {
    this.ravenSim = { count:0, result:0, users:0 }
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
                if(this.ravenSim.clear)
                  this.ravenSim = { clear:false, result:0, users:0 };
                if(this.state.ravenStats && this.state.ravenStats[r.id])
                  this.ravenSim = {
                    clear: (r.title==='1'),
                    result: this.ravenSim.result+this.state.ravenStats[r.id]['Result'],
                    users: this.ravenSim.users+this.state.ravenStats[r.id]['Users']
                  }
                return (
                    <React.Fragment key={'brick-f'+i}>
                      <RavenBrick key={'brick'+i} title={r.title}
                        id={r.id} stats={this.state.ravenStats} sort={r['sort']}
                        look={JSON.parse(r.params).look} />
                    {(r.title!=='1')?null:
                      <div key={'brick-a'+i} className="col-12 px-1 mb-2 align-items-center">
                        <div className="rounded p-2 m-1 text-center" style={cssStyles.lookSimulationResults} >
                          Team Result
                          <h3>{(this.ravenSim.result>0)?this.ravenSim.result:0} VP &nbsp;&nbsp; {(this.ravenSim.result>0)?(Math.round(this.ravenSim.result/this.ravenSim.users*100)/100):'0.00'} VPU</h3>
                        </div>
                      </div>}
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
