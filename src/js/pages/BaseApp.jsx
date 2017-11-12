import React, { Component } from 'react';
import NavigationView from './universal/NavigationView.jsx';

import Routes from './Routes.jsx';

class BaseApp extends Component {
  render() {
    return (
        <div>
          <NavigationView/>
          <Routes/>
        </div>
    );
  }
}

export default BaseApp;
