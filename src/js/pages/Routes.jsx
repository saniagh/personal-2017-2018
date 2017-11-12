import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeView from './home/HomeView.jsx';

class Routes extends Component {
  render() {
    return <main>
      <Switch>
        <Route exact path={`/`} component={HomeView}/>
      </Switch>
    </main>;
  }
}

export default Routes;
