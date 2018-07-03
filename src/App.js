import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Bricks from './Bricks'
import Workshops from './Workshops'
import NavBar from './NavBar'
import WorkshopNavBar from './WorkshopNavBar'
import WorkshopEditNavBar from './WorkshopEditNavBar'
import MenuModal from './MenuModal'
import Document from './components/Document'
import { MCConfig } from './config/MCConfig'
import MCTest from './components/MCTest'
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
            localStorage.setItem("key", match.params.key);
            return (<Redirect to="/"/>); }} />
          <Route exact path="/" render={(routerProps)=>
            <Workshops routerProps={routerProps} super={'top'} />} />
          <Route exact path="/:super" render={({match})=>
            <Bricks super={match.params.super} />} />
          <Route exact path='/:super/doc/:document_id' component={Document} />
          <Route exact path="/:super/test/:test_id" render={({match})=>
            <MCTest match={match} test={MCConfig.tests[match.params.test_id]} />} />
        </Switch>

        <Switch>
          <Route exact path="/" component={MenuModal} />
          <Route exact path="/:super" component={MenuModal} />
        </Switch>
      </div>
    </HashRouter>
  </div>
)

export default App;
