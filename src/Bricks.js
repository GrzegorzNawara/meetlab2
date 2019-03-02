import React from 'react'
import Brick from './components/Brick'
import RavenBrick from './components/RavenBrick'
import RavenResultBrick from './components/RavenResultBrick'
import debug from './debug'

class Bricks extends React.Component {
  ravenSim = {};
  myBricks = [];
  state = {
    ravenStats: {}
  };

  getRavenStats = () => {
    clearInterval(this.getRavenStatsTimer);
    if(this.props.bricks && this.props.bricks.filter((b)=>b.type==='RAVEN').length>0){
      fetch('http://api.ignifer-labs.com/raven/api_read_results.php',{
        method: 'post',
        body: JSON.stringify(
          this.props.bricks.filter((b)=>b.type==='RAVEN').map((b)=>(b.id))
      )})
        .then(result => result.json())
        .then(result => this.setState({ ravenStats: result }));
      this.getRavenStatsTimer = setInterval(()=> this.getRavenStats(), 5000);
    } else {
      this.getRavenStatsTimer = setInterval(()=> this.getRavenStats(), 1000);
    }
  }

  componentDidMount(){
    this.getRavenStats()
  }

  componentWillUnmount() {
    clearInterval(this.getRavenStatsTimer);
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    this.ravenSim = { clear:false, actualSort:0, lastSort:0, count:0, result:0, users:0 };
    let title=0;
    let last=0;
    let iteration=0
    let stat=[]

    this.myBricks = this.props.bricks.slice()
      .filter(b => b.id)
      .sort((a,b)=>-a.sort.localeCompare(b.sort))
      .reverse()
      .map((b,i,ba) => {
        if(b.type!=='RAVEN') return b;
        (i>0 && b['sort']-last<600000)?title=title+1:title=1;
        (i>0 && b['sort']-last<600000)?iteration=iteration:iteration++;
        if(!stat[iteration]) stat[iteration]={result:0, users:0}
        last=b['sort'];
        stat[iteration]=(!this.state.ravenStats || !this.state.ravenStats[b.id])?{ result:0, users:0 }:
          {
            result: stat[iteration].result+this.state.ravenStats[b.id]['Result'],
            users: stat[iteration].users+this.state.ravenStats[b.id]['Users']
          }
        return {...b, title, iteration};
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
                return (
                    <React.Fragment key={'brick-f'+i}>
                      <RavenBrick key={'brick'+i} title={r.title}
                        id={r.id} stats={this.state.ravenStats} sort={r['sort']}
                        look={JSON.parse(r.params).look} />
                    {(r.title!==1)?null:
                      <RavenResultBrick key={'brick-r'+i}
                        id={r.id} stats={this.state.ravenStats} sort={r['sort']}
                        ravenSim={stat[r.iteration]}
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
      </div>
    )
  }
}

export default Bricks
