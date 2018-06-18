import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import Workshops from './Workshops'
import NavBar from './NavBar'

const App = () => (
  <div className="App">
    <HashRouter>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Workshops} />
        </Switch>
      </div>
    </HashRouter>
  </div>
)

export default App;
