import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Layout, notification } from 'antd';
const { Content } = Layout;

import NavigationView from './universal/NavigationView.jsx';

import Routes from './Routes.jsx';

class BaseApp extends Component {

  componentDidMount() {
    axios({
      method: 'get',
      url: '/settings/get-settings',
    }).then((res) => {
      if (!res.data.hasSettings) {
        axios({
          method: 'get',
          url: '/settings/set-default-settings',
        }).then(() => {
          notification.success({
            message: 'Default settings',
            description: 'Default settings have automatically been set.',
          });
        }).catch(() => {
          notification.error({
            message: 'Fatal error',
            description: 'An error has occurred while configuring default settings. Please fix manually.',
          });
        });
      }
    }).catch(() => {
      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred while fetching shop\'s settings. Please contact an administrator.',
      });
    });
  }

  render() {

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    return (
        <Layout style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <NavigationView/>
          <Layout style={mediaQuery.matches ? {
            paddingTop: 64,
          } : {}}>
            <Layout>
              <Content
                  style={mediaQuery.matches ?
                      { padding: '0 5px' } :
                      { padding: '0 50px' }}>
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
