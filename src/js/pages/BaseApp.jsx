import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';
const { Content } = Layout;

import NavigationView from './universal/NavigationView.jsx';

import Routes from './Routes.jsx';

class BaseApp extends Component {

  render() {

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <NavigationView/>
          <Layout>
            <Layout>
              <Content
                  style={mediaQuery ? { padding: '0 50px' } : { padding: '0 5px' }}>
                <Routes/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
    );
  }
}

BaseApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default BaseApp;
