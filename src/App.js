import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Bricks from './Bricks'
import Workshops from './Workshops'
import NavBar from './NavBar'
import MenuModal from './MenuModal'
import Document from './Document'
import debug from './include/debug'

const App = () => (
  <div className="App">
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={MenuModal} />
          <Route exact path="/:super" component={MenuModal} />
        </Switch>
        <NavBar />
        <Switch>
          <Route exact path="/key/:key" render={({match}) => {
            localStorage.setItem("key", match.params.key);
            return (<Redirect to="/"/>); }} />
          <Route exact path="/" render={(routerProps)=>
            <Workshops routerProps={routerProps} super={'top'} />} />
          <Route exact path="/:super" render={({match})=>
            <Bricks super={match.params.super} />} />
          <Route exact path='/:super/doc/:document_id' component={Document} />
        </Switch>
      </div>
    </HashRouter>
  </div>
)

export default App;
