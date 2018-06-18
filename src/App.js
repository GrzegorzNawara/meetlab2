import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Workshops from './Workshops'
import NavBar from './NavBar'
import MenuModal from './MenuModal'

const App = () => (
  <div className="App">
    <HashRouter>
      <div>
        <MenuModal />
        <NavBar />
        <Switch>
          <Route exact path="/" component={Workshops} />
        </Switch>
      </div>
    </HashRouter>
  </div>
)

export default App;
