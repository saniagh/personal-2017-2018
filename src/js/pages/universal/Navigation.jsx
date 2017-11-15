import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Modal, Button, Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
const MenuItem = Menu.Item;

import LoginView from '../auth/login/LoginView.jsx';
import SignupView from '../auth/signup/SignupView.jsx';

import Auth from '../../modules/Auth.js';

class Navigation extends Component {
  handleMenuClick = (e) => {
    if (e.key === 'login') {
      this.props.onShowLoginModal();
      this.forceUpdate();
    } else if (e.key === 'signup') {
      this.props.onShowSignupModal();
      this.forceUpdate();
    } else if (e.key === 'logout') {
      this.props.router.history.replace('/');
      Auth.deauthenticateUser();
      this.forceUpdate();
    }
  };

  render() {
    return (
        <Header>
          <div className="logo"/>

          {!Auth.isUserAuthenticated() ?
              <Menu
                  theme="light"
                  mode="horizontal"
                  style={{ lineHeight: '64px' }}
                  selectedKey={[`${this.props.router.route.location.pathname}`]}
                  defaultSelectedKeys={[`${this.props.router.route.location.pathname}`]}
                  onClick={this.handleMenuClick}
              >
                <MenuItem key="/"><Link to={`/`}/>Home</MenuItem>
                <MenuItem key="/client-area"><Link to={`/client-area`}/>Client
                  Area</MenuItem>
                <MenuItem key="login">Login</MenuItem>
                <MenuItem key="signup">Signup</MenuItem>
              </Menu>
              :
              <Menu
                  theme="light"
                  mode="horizontal"
                  style={{ lineHeight: '64px' }}
                  selectedKey={[`${this.props.router.route.location.pathname}`]}
                  defaultSelectedKeys={[`${this.props.router.route.location.pathname}`]}
                  onClick={this.handleMenuClick}
              >
                <MenuItem key="/"><Link to={`/`}/>Home</MenuItem>
                <MenuItem key="/client-area"><Link to={`/client-area`}/>Client
                  Area</MenuItem>
                <MenuItem key="logout">Logout</MenuItem>
              </Menu>
          }
          <Modal title="Authentication"
                 wrapClassName="vertical-center-modal"
                 visible={this.props.login.isModalVisible}
                 footer={null}
                 width="560px"
                 onOk={this.props.onHideLoginModal}
                 onCancel={this.props.onHideLoginModal}>
            <LoginView/>
          </Modal>
          <Modal title="Registration"
                 wrapClassName="vertical-center-modal"
                 visible={this.props.signup.isModalVisible}
                 footer={null}
                 width="520px"
                 onOk={this.props.onHideSignupModal}
                 onCancel={this.props.onHideSignupModal}>
            <SignupView/>
          </Modal>
        </Header>
    );
  }
}

export default Navigation;
