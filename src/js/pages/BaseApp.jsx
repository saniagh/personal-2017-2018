import React, { Component } from 'react';
import NavigationView from './universal/NavigationView.jsx';

import { Layout } from 'antd';
const { Footer } = Layout;

import Routes from './Routes.jsx';

class BaseApp extends Component {
  render() {
    return (
        <Layout className="layout">
          <NavigationView/>
          <Routes/>
          <Footer style={{ textAlign: 'center' }}>
            Personal App @2017-2018 Created by Valentin C.
          </Footer>
        </Layout>
    );
  }
}

export default BaseApp;
