import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import DataBase from './database/DataBase'
import saveWorkshop from './database/saveWorkshop'
import saveBrick from './database/saveBrick'
import deleteBrick from './database/deleteBrick'
import deleteWorkshop from './database/deleteWorkshop'
import MenuModal from './MenuModal'
import Bricks from './Bricks'
import WorkshopGate from './components/WorkshopGate'
import MiniNavBar from './components/MiniNavBar'
import Workshops from './Workshops'
import NavBar from './NavBar'
import WorkshopNavBar from './WorkshopNavBar'
import WorkshopEditNavBar from './WorkshopEditNavBar'
import Document from './components/Document'
import { MCConfig } from './config/MCConfig'
import MCTest from './components/MCTest'
import LicenceCheck from './LicenceCheck'
//import debug from './debug'

const appName = 'raven13.join'
const initialState = {
  varsion:'1.0',

  mg: '',
  pin: localStorage.getItem('gateCode'),
  workshops: {
    pinWorkshop: {},
    mgWorkshops: []
  },
  workshop: {
    title: '...',
    subtitle: '...',
    pin: '...'
  },
  bricks: []
}


class App extends React.Component {

constructor(props) {
  super(props)

  this.state=initialState
  if(localStorage.getItem(appName)!==null)
    this.state=JSON.parse(localStorage.getItem(appName))

  if(this.state.version!==initialState.version)
    this.state=initialState

  this.state.pinChanged=0
}

componentWillUnmount() {
  localStorage.setItem(appName,JSON.stringify(this.state))
}

render () { return (
  <div className="App">
    <HashRouter>
      <div>
        <LicenceCheck setMG={mg => {
          if (this.state.mg!==mg)
            this.setState({...this.state, mg})}} />

        <Switch>
          <Route exact path="/" render={() =>
            <DataBase
              key="loadWorkshops"
              query="loadWorkshops"
              mg={this.state.mg}
              owner={this.state.mg}
              pin={this.state.pin}
              onDataLoaded={ workshops => {
                this.pinChanged = this.state.pinChanged
                this.setState({
                ...this.state,
                pinChanged:0,
                workshops: {
                  ...this.state.workshops,
                  ...workshops
                }})
                localStorage.setItem(appName,JSON.stringify(this.state))
                if(workshops.pinWorkshop && this.pinChanged)
                  window.location.hash='#/'+workshops.pinWorkshop.owner+'/'+workshops.pinWorkshop.id
              }} />} />
          <Route exact path="/licence/:licence" render={({match})=> {
            localStorage.setItem("licence", match.params.licence)
            return <Redirect to="/" />
          }} />
          <Route path="/:owner/:workshopId" render={({match})=>
            <DataBase
              key="loadBricks"
              query="loadBricks"
              owner={match.params.owner}
              workshopId={match.params.workshopId}
              onDataLoaded={ ({workshop, bricks}) => {
                if(workshop && workshop.id) {
                this.setState({
                  ...this.state,
                  workshop,
                  bricks: bricks.filter(b => b && b.id)
              })
              localStorage.setItem(appName,JSON.stringify(this.state))
            }}} />} />
        </Switch>

        <Switch>
          <Route exact path="/" render={({match})=>
            <NavBar mg={this.state.mg} />} />
          <Route exact path="/:owner/:workshopId" render={({match})=>
            <MiniNavBar
              mg={this.state.mg}
              link='/' />} />
          <Route path="/:owner/:workshopId" render={({match})=>
            <MiniNavBar
              mg={this.state.mg}
              link={'/'+match.params.owner+'/'+match.params.workshopId} />} />
        </Switch>

        <Switch>
          <Route exact path="/:owner/:super/doc/:document_id" render={({match})=>
            <WorkshopNavBar
              workshop={this.state.workshop} />} />
          <Route exact path="/:owner/:super" render={({match})=>
            <WorkshopNavBar
              mg={this.state.mg}
              workshop={this.state.workshop} />} />
          <Route exact path="/:owner/:super/edit" render={({match})=>
            <WorkshopEditNavBar
              mg={this.state.mg}
              workshop={this.state.workshop}
              onUpdate={(workshop) => {
                saveWorkshop(workshop)
                this.setState({
                  ...this.state,
                  workshop
              })}} />} />
          <Route exact path="/:owner/:super/:more" render={({match})=>
            <WorkshopNavBar
              match={match}
              mg={this.props.mg}
              workshop={this.state.workshop} />} />
        </Switch>

        <Switch>
          <Route exact path="/" render={()=>
            <WorkshopGate setPin={pin =>
              this.setState({
                ...this.state,
                pin,
                pinChanged:1
              })} />} />
        </Switch>

        <Switch>
          <Route exact path="/" render={()=>
            <Workshops workshops={this.state.workshops} />} />
          <Route exact path='/:owner/:super/doc/:document_id' component={Document} />
          <Route exact path="/:owner/:super/test/:test_id" render={(routerProps)=>
            <MCTest routerProps={routerProps} test={MCConfig.tests.filter((t) => (t.id===routerProps.match.params.test_id))[0]} />} />
          <Route path="/:owner/:super" render={({match})=>
            <Bricks
              owner={match.params.owner}
              super={match.params.super}
              mg={this.state.mg}
              bricks={this.state.bricks} />} />
        </Switch>

        <Switch>
          <Route exact path="/" render={()=>
            <MenuModal
              super=''
              mg={this.state.mg}
              owner={this.state.mg}
              onAdd={(newWorkshop) => {
                saveWorkshop(newWorkshop)
                this.setState({
                  ...this.state,
                  workshops: {
                    ...this.state.workshops,
                    mgWorkshops: [newWorkshop].concat(this.state.workshops.mgWorkshops)
                  }
              })}} /> } />
            <Route path="/:owner/:workshopId" render={({match})=>
            <MenuModal
              super={match.params.workshopId}
              owner={match.params.owner}
              bricks={this.state.bricks}
              mg={this.state.mg}
              onAdd={(newBrick) => {
                saveBrick(newBrick)
                this.setState({
                  ...this.state,
                  bricks: [newBrick].concat(this.state.bricks.filter(b => b.id!==newBrick.id))
              })}}
              onDeleteWorkshop={deleteWorkshop}
              onDeleteBrick={ delBrick => {
                deleteBrick(delBrick)
                this.setState({
                  ...this.state,
                  bricks: this.state.bricks.filter(b => b.id!==delBrick.id)
              })}} /> } />
        </Switch>

      </div>
    </HashRouter>
  </div>
)}}

export default App
