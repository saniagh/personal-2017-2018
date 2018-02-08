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
      mouseIsOn: '',
    };
  }

  onHoverCategory = (optionName) => {
    this.setState({
      mouseIsOn: optionName,
    });
  };

  onExitCategory = () => {
    this.setState({
      mouseIsOn: '',
    });
  };

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    this.setState(
        { selectedKeys: [this.props.location.pathname] });
    if (this.props.location.pathname.indexOf('control-panel') !== -1)
      this.setState({
        selectedKeys: ['/control-panel'],
      });
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

  offset = (el) => {
    if (el === false)
      return 0;
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  render() {

    const mediaQuery = window.matchMedia('(max-width: 1100px)');

    //first Header is for mobile
    //second Header is for desktop

    let optionsList;

    if (this.props.fetchedSettings) {
      optionsList = this.props.siteNavigation.map((option, index) => {

        let leftDistance = this.offset(
            document.getElementById(option.optionName) ?
                document.getElementById(option.optionName) :
                false);

        return <li key={index}
                   id={option.optionName}
                   className="site-navigation-list-item"
                   onMouseEnter={() => this.onHoverCategory(
                       option.optionName)}
                   onMouseLeave={this.onExitCategory}>
          <Link to="/">
            <span>
              {option.optionName}
            </span>
          </Link>
          <div className="site-navigation-drop-down"
               style={{
                 display: this.state.mouseIsOn === option.optionName ?
                     'block' :
                     'none',
                 left: 0 - leftDistance.left,
                 width: window.innerWidth,
               }}>
            <div className="site-navigation-drop-down-option">
              <div className="site-navigation-categories-wrap">
                <div className="site-navigation-categories-left">
                  <ul className="site-navigation-categories-list">
                    {option.siteNavigationColumn1.map((line, i) => {
                      if (line.lineType === 'title')
                        return <li key={i}
                                   className="site-navigation-categories-list-title">
                          {line.lineAnchor ?
                              <a href={line.lineAnchor}>
                                <span>{line.lineText}</span>
                              </a>
                              :
                              <Link to={this.props.location.pathname}
                                    style={{
                                      cursor: 'default',
                                      textDecoration: 'none',
                                    }}>
                                <span
                                    style={{ borderBottom: 0 }}>{line.lineText}</span>
                              </Link>
                          }

                        </li>;
                      else if (line.lineType === 'normal')
                        return <li key={i}
                                   className="site-navigation-categories-list-item">
                          <a href={line.lineAnchor}>
                            <span>{line.lineText}</span>
                          </a>
                        </li>;
                    })}
                  </ul>
                  <ul className="site-navigation-categories-list">
                    {option.siteNavigationColumn2.map((line, i) => {
                      if (line.lineType === 'title')
                        return <li key={i}
                                   className="site-navigation-categories-list-title">
                          {line.lineAnchor ?
                              <a href={line.lineAnchor}>
                                <span>{line.lineText}</span>
                              </a>
                              :
                              <Link to={this.props.location.pathname}
                                    style={{
                                      cursor: 'default',
                                      textDecoration: 'none',
                                    }}>
                                <span
                                    style={{ borderBottom: 0 }}>{line.lineText}</span>
                              </Link>
                          }
                        </li>;
                      else if (line.lineType === 'normal')
                        return <li key={i}
                                   className="site-navigation-categories-list-item">
                          <a href={line.lineAnchor}>
                            <span>{line.lineText}</span>
                          </a>
                        </li>;
                    })}
                  </ul>
                  <ul className="site-navigation-categories-list">
                    {option.siteNavigationColumn3.map((line, i) => {
                      if (line.lineType === 'title')
                        return <li key={i}
                                   className="site-navigation-categories-list-title">
                          {line.lineAnchor ?
                              <a href={line.lineAnchor}>
                                <span>{line.lineText}</span>
                              </a>
                              :
                              <Link to={this.props.location.pathname}
                                    style={{
                                      cursor: 'default',
                                      textDecoration: 'none',
                                    }}>
                                <span
                                    style={{ borderBottom: 0 }}>{line.lineText}</span>
                              </Link>
                          }
                        </li>;
                      else if (line.lineType === 'normal')
                        return <li key={i}
                                   className="site-navigation-categories-list-item">
                          <a href={line.lineAnchor}>
                            <span>{line.lineText}</span>
                          </a>
                        </li>;
                    })}
                  </ul>
                </div>
                <div className="site-navigation-categories-pictures fl imgWrap">
                  {option.siteNavigationPictures.map((picture, i) => {
                    return <a href={picture.imageAnchor}>
                      <figure>
                        <img src={picture.imageUrl}
                             title={picture.imageCaption}/>
                        {picture.imageCaption ?
                            <figcaption
                                className="site-navigation-image-caption">
                              {picture.imageCaption}
                            </figcaption>
                            :
                            null
                        }
                      </figure>
                    </a>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </li>;
      });
    }

    return (
        mediaQuery.matches ?
            <nav className="top-navigation">
              <Header style={{
                position: 'fixed',
                width: '100%',
                zIndex: 1,
                height: 68,
              }}>
                <div className="site-logo">
                  <Link to={`/`}>
                    <img src="shop-logo.png"/>
                  </Link>
                </div>
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
                        <MenuItem key="/client-area"><Link
                            to={`/client-area`}/>Client
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
            </nav>
            :
            <nav className="top-navigation">
              <Header style={{ height: 80 }}>
                <div className="site-logo">
                  <Link to={`/`}>
                    <img src="shop-logo.png"/>
                  </Link>
                </div>
                {!Auth.isUserAuthenticated() ?
                    <Menu
                        theme="light"
                        mode="horizontal"
                        style={{ lineHeight: '78px', float: 'right' }}
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
                        style={{ lineHeight: '78px', float: 'right' }}
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
              </Header>
              {this.props.location.pathname.indexOf('/control-panel') === -1 ?
                  <div className="drop-down-menu-container">
                    <div className="o-row">
                      <div className="site-navigation">

                        <ul className="site-navigation-list">
                          {this.props.fetchedSettings ?
                              optionsList
                              :
                              null}
                        </ul>
                      </div>
                    </div>
                  </div>
                  :
                  null
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
            </nav>
    );
  }
}

export default Navigation;
