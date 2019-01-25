import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Bricks from './Bricks'
import Workshops from './Workshops'
import NavBar from './NavBar'
import WorkshopNavBar from './WorkshopNavBar'
import WorkshopEditNavBar from './WorkshopEditNavBar'
import MenuModal from './MenuModal'
import Document from './components/Document'
import { MCConfig } from './config/MCConfig'
import MCTest from './components/MCTest'
import AccessCheck from './AccessCheck'
import debug from './debug'

const App = () => (
  <div className="App">
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={NavBar} />
          <Route exact path="/:super" component={WorkshopNavBar} />
          <Route exact path="/:super/edit" component={WorkshopEditNavBar} />
          <Route path="/:super/:more" component={WorkshopNavBar} />
        </Switch>

        <Switch>
          <Route exact path="/key/:key" render={({match}) => {
            return (<AccessCheck myKey={match.params.key} />) }} />
          <Route exact path="/" render={(routerProps)=>
            <Workshops routerProps={routerProps} super={'top'} />} />
          <Route exact path="/:super" render={({match})=>
            <Bricks super={match.params.super} />} />
          <Route exact path='/:super/doc/:document_id' component={Document} />
          <Route exact path="/:super/test/:test_id" render={(routerProps)=>
            <MCTest routerProps={routerProps} test={MCConfig.tests.filter((t) => (t.id===routerProps.match.params.test_id))[0]} />} />
        </Switch>

      </div>
    </HashRouter>
  </div>
)

export default App
