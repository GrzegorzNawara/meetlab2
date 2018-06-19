import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Bricks from './Bricks'
import NavBar from './NavBar'
import MenuModal from './MenuModal'

const App = () => (
  <div className="App">
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={MenuModal} />
          <Route exact path="/:workshop_id" component={MenuModal} />
        </Switch>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Bricks} />
          <Route exact path="/:workshop_id" component={Bricks} />
        </Switch>
      </div>
    </HashRouter>
  </div>
)

export default App;
