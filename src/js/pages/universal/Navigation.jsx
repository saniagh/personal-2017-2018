import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Modal, Layout, Menu, Icon } from 'antd';
const { Header, Sider } = Layout;
const MenuItem = Menu.Item;

import LoginView from '../auth/login/LoginView.jsx';
import SignupView from '../auth/signup/SignupView.jsx';

import Auth from '../../modules/Auth.js';

class Navigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      selectedKeys: [],
    };
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    this.setState(
        { selectedKeys: [this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedKeys: [nextProps.location.pathname] });
    if (nextProps.location.pathname.indexOf('control-panel') !== -1)
      this.setState({
        selectedKeys: ['/control-panel'],
      });
    this.forceUpdate();
  }

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
    } else
      this.onCollapse();
  };

  render() {

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    return (
        mediaQuery.matches ?
            <Header style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
              {!Auth.isUserAuthenticated() ?
                  <Sider
                      trigger={mediaQuery.matches &&
                      this.state.collapsed === false ?
                          null :
                          true}
                      collapsible
                      collapsed={this.state.collapsed}
                      onCollapse={this.onCollapse}
                      breakpoint={mediaQuery.matches ? 'sm' : ''}
                      collapsedWidth={mediaQuery.matches ? 0 : ''}
                      style={
                        mediaQuery.matches ?
                            {
                              overflow: 'auto',
                              height: '100vh',
                              background: '#fff',
                              position: 'fixed',
                              left: 0,
                              zIndex: 1,
                              top: 0,
                            }
                            :
                            {}}
                  >
                    <Menu
                        theme="light"
                        mode="inline"
                        style={{ lineHeight: '64px' }}
                        selectedKeys={this.state.selectedKeys}
                        defaultSelectedKeys={this.state.selectedKeys}
                        onClick={this.handleMenuClick}
                    >
                      <MenuItem key="control-navigator"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}>
                <span>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
                  </span>
                      </MenuItem>
                      <MenuItem key="/"><Link to={`/`}/>Home</MenuItem>
                      <MenuItem key="/client-area"><Link
                          to={`/client-area`}/>Client
                        Area</MenuItem>
                      <MenuItem key="login">Login</MenuItem>
                      <MenuItem key="signup">Signup</MenuItem>
                    </Menu>
                  </Sider>
                  :
                  <Sider
                      trigger={mediaQuery.matches &&
                      this.state.collapsed === false ?
                          null :
                          true}
                      collapsible
                      collapsed={this.state.collapsed}
                      onCollapse={this.onCollapse}
                      breakpoint={mediaQuery.matches ? 'sm' : ''}
                      collapsedWidth={mediaQuery.matches ? 0 : ''}
                      style={
                        mediaQuery.matches ?
                            {
                              overflow: 'auto',
                              height: '100vh',
                              background: '#fff',
                              position: 'fixed',
                              left: 0,
                              zIndex: 1,
                              top: 0,
                            }
                            :
                            {}}
                  >
                    <Menu
                        theme="light"
                        mode="inline"
                        style={{ lineHeight: '64px' }}
                        selectedKeys={this.state.selectedKeys}
                        defaultSelectedKeys={this.state.selectedKeys}
                        onClick={this.handleMenuClick}
                    >
                      <MenuItem key="control-navigator"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}>
                <span>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
                  </span>
                      </MenuItem>
                      <MenuItem key="/"><Link to={`/`}/>Home</MenuItem>
                      <MenuItem key="/client-area"><Link to={`/client-area`}/>Client
                        Area</MenuItem>

                      <MenuItem key="/control-panel"><Link
                          to={`/control-panel`}/>Control
                        Panel</MenuItem>

                      <MenuItem key="logout">Logout</MenuItem>
                    </Menu>
                  </Sider>
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
            :
            <Header>
              {!Auth.isUserAuthenticated() ?
                  <Menu
                      theme="light"
                      mode="horizontal"
                      style={{ lineHeight: '64px' }}
                      selectedKeys={this.state.selectedKeys}
                      defaultSelectedKeys={this.state.selectedKeys}
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
                      selectedKeys={this.state.selectedKeys}
                      defaultSelectedKeys={this.state.selectedKeys}
                      onClick={this.handleMenuClick}
                  >
                    <MenuItem key="/"><Link to={`/`}/>Home</MenuItem>
                    <MenuItem key="/client-area"><Link to={`/client-area`}/>Client
                      Area</MenuItem>

                    <MenuItem key="/control-panel"><Link
                        to={`/control-panel`}/>Control
                      Panel</MenuItem>

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
