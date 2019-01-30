import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Bricks from './Bricks'
import Workshops from './Workshops'
import NavBar from './NavBar'
import WorkshopNavBar from './WorkshopNavBar'
import WorkshopEditNavBar from './WorkshopEditNavBar'
import Document from './components/Document'
import { MCConfig } from './config/MCConfig'
import MCTest from './components/MCTest'
import LicenceCheck from './LicenceCheck'
//import debug from './debug'

class App extends React.Component {
state = {}
render () {
  return (
  <div className="App">
    <HashRouter>
      <div>
        <LicenceCheck setMG={mg => {
          if (this.state.mg!==mg)
            this.setState({...this.state, mg})}} />

        <Switch>
          <Route exact path="/" render={({match})=>
            <NavBar mg={this.state.mg} />} />
          <Route exact path="/:super" render={({match})=>
            <WorkshopNavBar match={match} mg={this.state.mg} />} />
          <Route exact path="/:super/edit" render={({match})=>
            <WorkshopEditNavBar match={match} mg={this.state.mg} />} />
          <Route exact path="/:super/:more" render={({match})=>
            <WorkshopNavBar match={match} mg={this.state.mg} />} />
        </Switch>

        <Switch>
          <Route exact path="/" render={(routerProps)=>
            <Workshops routerProps={routerProps} mg={this.state.mg} super={'top'} />} />
          <Route exact path="/:super" render={({match})=>
            <Bricks super={match.params.super} mg={this.state.mg} />} />
          <Route exact path='/:super/doc/:document_id' component={Document} />
          <Route exact path="/:super/test/:test_id" render={(routerProps)=>
            <MCTest routerProps={routerProps} test={MCConfig.tests.filter((t) => (t.id===routerProps.match.params.test_id))[0]} />} />
        </Switch>

      </div>
    </HashRouter>
  </div>
)}}

export default App
