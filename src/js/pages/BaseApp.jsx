import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Layout, notification, BackTop } from 'antd';
const { Content, Footer } = Layout;

import NavigationView from './universal/NavigationView.jsx';
import { smoothScroll } from '../modules/scrollFunction.js';

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

  componentWillReceiveProps() {
    smoothScroll();
  }

  render() {

    const mediaQuery = window.matchMedia('(max-width: 1100px)');
    return (
        <div className="site-wrap" aria-hidden="false">
          <Layout style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <header className="top-header">
              <NavigationView location={this.context.router.route.location}/>
            </header>
            <div id="main" role="main">
              <Layout>
                <Content
                    style={mediaQuery.matches ?
                        {
                          margin: this.context.router.route.location.pathname.indexOf(
                              '/control-panel') !== -1 ? 0 : '87px 0 0',
                        } :
                        { padding: '0 50px' }}>
                  <Routes/>
                </Content>
              </Layout>
            </div>
            <footer>
              <Footer style={{ textAlign: 'center' }}>
                Bloo Shop @2018 Created by Valentin C.
              </Footer>
            </footer>
            <BackTop/>
          </Layout>
        </div>
    );
  }
}

BaseApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default BaseApp;
