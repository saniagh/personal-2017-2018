import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'antd-mobile/dist/antd-mobile.css';
import { Drawer, NavBar } from 'antd-mobile';
import { Modal, Layout, Menu, Icon, Badge } from 'antd';
const { Header, Sider } = Layout;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;

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
      overlayZIndex: -1,
      drawerZIndex: -1,
      hidePromoBanner: false,
      mainClassName: 'main-container hidden',
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
    if (this.state.collapsed === true) {
      setTimeout(() => {
        this.setState({
          overlayZIndex: -1,
        });
      }, 500);
    } else this.setState({
      overlayZIndex: 1,
    });

    if (this.state.collapsed === true) {
      setTimeout(() => {
        this.setState({
          drawerZIndex: -1,
        });
      }, 500);
    } else this.setState({
      drawerZIndex: 1,
    });

    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {

    setTimeout(() => {
      this.setState({
        mainClassName: 'main-container',
      });
    }, 200);

    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 90) {
        this.setState({
          hidePromoBanner: true,
        });
      } else if (document.documentElement.scrollTop < 90 &&
          this.state.hidePromoBanner === true)
        this.setState({
          hidePromoBanner: false,
        });
    });

    this.setState(
        { selectedKeys: [this.props.location.pathname] });
    if (this.props.location.pathname.indexOf('control-panel') !== -1)
      this.setState({
        selectedKeys: ['/control-panel'],
      });

    this.setState({ selectedKeys: [this.props.location.pathname] });
    if (this.props.location.pathname.indexOf('edit-product') !== -1)
      this.setState({
        selectedKeys: ['/control-panel/products'],
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedKeys: [nextProps.location.pathname] });
    if (nextProps.location.pathname.indexOf('control-panel') !== -1)
      this.setState({
        selectedKeys: ['/control-panel'],
      });

    this.setState({ selectedKeys: [nextProps.location.pathname] });
    if (nextProps.location.pathname.indexOf('edit-product') !== -1)
      this.setState({
        selectedKeys: ['/control-panel/products'],
      });
  }

  handleMenuClick = (e) => {
    if (e.key === 'login') {
      this.props.onShowLoginModal();
      this.onCollapse();
      this.forceUpdate();
    } else if (e.key === 'signup') {
      this.props.onShowSignupModal();
      this.onCollapse();
      this.forceUpdate();
    } else if (e.key === 'logout') {
      this.props.onGetUserCredentialsHandler('', '', '', false);
      this.props.router.history.replace('/');
      this.onCollapse();
      Auth.deauthenticateUser();
      this.forceUpdate();
    } else if (e.key === 'shopping-cart') {
      this.props.onOpenShoppingCart();
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

    let optionsList;
    let drawerOptions;

    if (this.props.fetchedSettings) {

      if (mediaQuery.matches) {
        drawerOptions = this.props.siteNavigation.map((option, index) => {
          return <SubMenu key={option.optionName.toLowerCase()}
                          title={<a className="drawer-link"
                                    href={option.optionAnchor}>{option.optionName}</a>}>
            {option.siteNavigationColumn1.map((line, i) => {
              if (line.lineType === 'title')
                return <SubMenu key={line.lineText.toLowerCase()}
                                title={<span>{line.lineText}</span>}>
                  {option.siteNavigationColumn1.map((normalLine, j) => {
                    if (normalLine.lineType === 'normal')
                      return <MenuItem key={normalLine.lineText.toLowerCase()}>
                        <a href={normalLine.lineAnchor}/>
                        <span>{normalLine.lineText}</span>
                      </MenuItem>;
                  })}
                </SubMenu>;
            })}
            {option.siteNavigationColumn2.map((line, i) => {
              if (line.lineType === 'title')
                return <SubMenu key={line.lineText.toLowerCase()}
                                title={<span>{line.lineText}</span>}>
                  {option.siteNavigationColumn2.map((normalLine, j) => {
                    if (normalLine.lineType === 'normal')
                      return <MenuItem key={normalLine.lineText.toLowerCase()}>
                        <a href={normalLine.lineAnchor}/>
                        <span>{normalLine.lineText}</span>
                      </MenuItem>;
                  })}
                </SubMenu>;
            })}
            {option.siteNavigationColumn3.map((line, i) => {
              if (line.lineType === 'title')
                return <SubMenu key={line.lineText.toLowerCase()}
                                title={<span>{line.lineText}</span>}>
                  {option.siteNavigationColumn3.map((normalLine, j) => {
                    if (normalLine.lineType === 'normal')
                      return <MenuItem key={normalLine.lineText.toLowerCase()}>
                        <a href={normalLine.lineAnchor}/>
                        <span>{normalLine.lineText}</span>
                      </MenuItem>;
                  })}
                </SubMenu>;
            })}
          </SubMenu>;
        });

      } else {
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
            <a href={option.optionAnchor}>
            <span>
              {option.optionName}
            </span>
            </a>
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
                  <div
                      className="site-navigation-categories-pictures fl imgWrap">
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
    }

    // first for mobile
    // second for desktop

    return (
        mediaQuery.matches ?
            <div className={this.state.mainClassName}>
              <nav className="top-navigation">
                <NavBar
                    style={{
                      position: 'fixed',
                      width: '100vw',
                      transition: 'all 600ms cubic-bezier(0.23, 1, 0.32, 1)',
                      zIndex: 1,
                      height: 68,
                      backgroundColor: '#fff',
                    }}
                    rightContent={
                      [
                        <span
                            onClick={this.props.onOpenShoppingCart}>
                                      <Badge
                                          count={this.props.shoppingCartProducts.length}>
                                        <Icon type="shopping-cart"
                                              style={{
                                                fontSize: 24,
                                                color: '#000',
                                                position: 'relative',
                                                right: 5,
                                              }}/>
                                      </Badge>
                      </span>,
                      ]
                    }
                    icon={<Icon className="trigger"
                                style={{ color: '#000' }}
                                type='menu-unfold'
                                onClick={this.onCollapse}/>}>
                  <Link to={`/`}>
                    <div className="site-logo">
                      <img className="site-logo-img"
                           src="/images/shop-logo.png"/>
                    </div>
                  </Link>
                  {!Auth.isUserAuthenticated() ?
                      <Drawer className="my-drawer"
                              style={{
                                minHeight: '100vh',
                                width: this.state.drawerZIndex === 1 ?
                                    document.documentElement.clientWidth :
                                    0,
                                zIndex: this.state.drawerZIndex,
                              }}
                              contentStyle={{
                                color: '#A6A6A6',
                                textAlign: 'center',
                                paddingTop: 42,
                                zIndex: this.state.overlayZIndex === 1 ? 0 : -1,
                              }}
                              overlayStyle={{
                                zIndex: this.state.overlayZIndex,
                              }}
                              sidebar={<Menu
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
                                  <Icon className="trigger"
                                        type='menu-fold'/>
                                </span>
                                </MenuItem>
                                <MenuItem key="/">
                                  <Link to={`/`}/>
                                  <Icon type="home"/>
                                  <span>Home</span>
                                </MenuItem>
                                <MenuItem key="/my-orders">
                                  <Link to={`/my-orders`}/>
                                  <Icon type="car"/>
                                  <span>My orders</span>
                                </MenuItem>
                                <SubMenu key="categories-navigation"
                                         title={<span>
                                         <Icon type="shop"/>
                                         <span>Browse Shop</span>
                                       </span>}>
                                  {drawerOptions}
                                </SubMenu>
                                <MenuItem key="login">
                                  <Icon type="login"/>
                                  <span>
                                  Login
                                </span>
                                </MenuItem>
                                <MenuItem key="signup">
                                  <Icon type="user-add"/>
                                  <span>
                                  Signup
                                </span>
                                </MenuItem>
                              </Menu>}
                              open={this.state.collapsed}
                              onOpenChange={this.onCollapse}>
                      </Drawer>
                      :
                      <Drawer className="my-drawer"
                              style={{
                                minHeight: '100vh',
                                width: this.state.drawerZIndex === 1 ?
                                    document.documentElement.clientWidth :
                                    0,
                                zIndex: this.state.drawerZIndex,
                              }}
                              contentStyle={{
                                color: '#A6A6A6',
                                textAlign: 'center',
                                paddingTop: 42,
                                zIndex: this.state.overlayZIndex === 1 ? 0 : -1,
                              }}
                              overlayStyle={{
                                zIndex: this.state.overlayZIndex,
                              }}
                              sidebar={<Menu
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
                <Icon className="trigger"
                      type='menu-fold'/>
                  </span>
                                </MenuItem>
                                <MenuItem key="/">
                                  <Link to={`/`}/>
                                  <Icon type="home"/>
                                  <span>Home</span>
                                </MenuItem>
                                <MenuItem key="/my-orders">
                                  <Link to={`/my-orders`}/>
                                  <Icon type="car"/>
                                  <span>My orders</span>
                                </MenuItem>
                                <SubMenu key="categories-navigation"
                                         title={<span>
                                         <Icon type="shop"/>
                                         <span>Browse Shop</span>
                                       </span>}>
                                  {drawerOptions}
                                </SubMenu>
                                {this.props.isAdmin ?
                                    <SubMenu key="/control-panel/submenu"
                                             title={
                                               <Link to={`/control-panel`}
                                                     className="drawer-link">
                                                 <Icon type="appstore"/>
                                                 <span>Control Panel</span>
                                               </Link>}>
                                      <MenuItem key="/control-panel/products">
                                        <Link to={`/control-panel/products`}/>
                                        <Icon type="skin"/>
                                        <span>All products</span>
                                      </MenuItem>
                                      <MenuItem
                                          key="/control-panel/orders-management">
                                        <Link
                                            to={`/control-panel/orders-management`}/>
                                        <Icon type="database"/>
                                        <span>Manage orders</span>
                                      </MenuItem>
                                      <MenuItem
                                          key="/control-panel/products/add-a-product">
                                        <Link
                                            to={`/control-panel/products/add-a-product`}/>
                                        <Icon type="plus"/>
                                        <span>Add product</span>
                                      </MenuItem>
                                      <MenuItem key="/control-panel/categories">
                                        <Link to={`/control-panel/categories`}/>
                                        <Icon type="filter"/>
                                        <span>Categories</span>
                                      </MenuItem>
                                      <MenuItem key="/control-panel/settings">
                                        <Link to={`/control-panel/settings`}/>
                                        <Icon type="setting"/>
                                        <span>Settings</span>
                                      </MenuItem>
                                    </SubMenu>
                                    :
                                    null
                                }
                                <MenuItem key="logout">
                                  <Icon type="logout"/>
                                  <span>Logout</span>
                                </MenuItem>
                              </Menu>}
                              open={this.state.collapsed}
                              onOpenChange={this.onCollapse}>
                      </Drawer>
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
                </NavBar>
                {this.props.location.pathname.indexOf('control-panel') === -1 &&
                this.props.fetchedSettings &&
                this.state.hidePromoBanner === false ?
                    <div className="sub-header-promo-container">
                      <div className="header-promo">
                        <div className="header-promo-banner">
                          <div className="o-row">
                            <div className="o-column">
                              <div className="o-line">
                                <p className="header-promo-title">
                                  {this.props.topPromotionalBanner.promoText}
                                </p>
                                <div className="header-promo-link-container">
                                  <a href={this.props.topPromotionalBanner.promoLinkAnchor}
                                     className="header-promo-link">
                                    {this.props.topPromotionalBanner.promoLinkText}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    null
                }
              </nav>
            </div>
            :
            <div className={this.state.mainClassName}>
              <nav className="top-navigation">
                {this.props.location.pathname.indexOf('control-panel') === -1 &&
                this.props.fetchedSettings &&
                this.state.hidePromoBanner === false ?
                    <div className="header-promo-container">
                      <div className="header-promo">
                        <div className="header-promo-banner">
                          <div className="o-row">
                            <div className="o-column">
                              <div className="o-line">
                                <p className="header-promo-title">
                                  {this.props.topPromotionalBanner.promoText}
                                </p>
                                <div className="header-promo-link-container">
                                  <a href={this.props.topPromotionalBanner.promoLinkAnchor}
                                     className="header-promo-link">
                                    {this.props.topPromotionalBanner.promoLinkText}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    null
                }

                <Header style={{ height: 80 }}>
                  <Link to={`/`}>
                    <div className="site-logo">
                      <img className="site-logo-img"
                           src="/images/shop-logo.png"/>
                    </div>
                  </Link>
                  {!Auth.isUserAuthenticated() ?
                      <Menu
                          theme="light"
                          mode="horizontal"
                          style={{
                            lineHeight: '48px',
                            position: 'relative',
                            top: '15px',
                            float: 'right',
                          }}
                          selectedKeys={this.state.selectedKeys}
                          defaultSelectedKeys={this.state.selectedKeys}
                          onClick={this.handleMenuClick}
                      >
                        <MenuItem key="/">
                          <Link to={`/`}/>
                          <Icon type="home"/>
                          <span>Home</span>
                        </MenuItem>
                        <MenuItem key="/my-orders">
                          <Link to={`/my-orders`}/>
                          <Icon type="car"/>
                          <span>My orders</span>
                        </MenuItem>
                        <MenuItem key="shopping-cart">
                          <Badge count={this.props.shoppingCartProducts.length}>
                            <Icon type="shopping-cart"/>
                            <span >Shopping cart</span>
                          </Badge>
                        </MenuItem>
                        <MenuItem key="login">
                          <Icon type="login"/>
                          <span>
                          Login
                        </span>
                        </MenuItem>
                        <MenuItem key="signup">
                          <Icon type="user-add"/>
                          <span>
                          Signup
                        </span>
                        </MenuItem>
                      </Menu>
                      :
                      <Menu
                          theme="light"
                          mode="horizontal"
                          style={{
                            lineHeight: '48px',
                            position: 'relative',
                            top: '15px',
                            float: 'right',
                          }}
                          selectedKeys={this.state.selectedKeys}
                          defaultSelectedKeys={this.state.selectedKeys}
                          onClick={this.handleMenuClick}
                      >
                        <MenuItem key="/">
                          <Link to={`/`}/>
                          <Icon type="home"/>
                          <span>Home</span>
                        </MenuItem>
                        <MenuItem key="/my-orders">
                          <Link to={`/my-orders`}/>
                          <Icon type="car"/>
                          <span>My orders</span>
                        </MenuItem>
                        <MenuItem key="shopping-cart">
                          <Badge count={this.props.shoppingCartProducts.length}>
                            <Icon type="shopping-cart"/>
                            <span >Shopping cart</span>
                          </Badge>
                        </MenuItem>
                        {this.props.isAdmin ?
                            <MenuItem key="/control-panel">
                              <Link to={`/control-panel`}/>
                              <Icon type="appstore"/>
                              <span>Control Panel</span>
                            </MenuItem>
                            :
                            null
                        }
                        <MenuItem key="logout">
                          <Icon type="logout"/>
                          <span>Logout</span>
                        </MenuItem>
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
            </div>
    );
  }
}

export default Navigation;
