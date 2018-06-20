import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Bricks from './Bricks'
import Bricks2 from './Bricks2'
import NavBar from './NavBar'
import MenuModal from './MenuModal'
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
          <Route exact path="/" render={()=><Bricks2 super={'top'} />} />
          <Route exact path="/:super" render={({match})=><Bricks super={debug(match,'MATCH').params.super} />} />
        </Switch>
      </div>
    </HashRouter>
  </div>
)

export default App;
