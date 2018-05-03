import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Auth from '../modules/Auth.js';

import { Layout, notification, BackTop, LocaleProvider, Card } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
const { Content, Footer } = Layout;

import NavigationView from './universal/NavigationView.jsx';
import FooterView from './universal/FooterView.jsx';
import { smoothScroll } from '../modules/scrollFunction.js';

import {
  onCloseShoppingCartAction,
  onRehydrateShoppingCartState,
  onRemoveProductFromCart,
} from './universal/navigationActions.js';

import {
  onGetUserCredentials,
} from './universal/userActions.js';

import Routes from './Routes.jsx';

let createHandlers = function (dispatch) {

  let onCloseShoppingCartHandler = function () {
    dispatch(onCloseShoppingCartAction());
  };

  let onRemoveProductFromCartHandler = function (index) {
    dispatch(onRemoveProductFromCart(index));
  };

  let onRehydrateShoppingCartStateHandler = function () {
    dispatch(onRehydrateShoppingCartState());
  };

  let onGetUserCredentialsHandler = function (id, username, email, isAdmin) {
    dispatch(onGetUserCredentials(id, username, email, isAdmin));
  };

  return {
    onCloseShoppingCartHandler,
    onRemoveProductFromCartHandler,
    onRehydrateShoppingCartStateHandler,
    onGetUserCredentialsHandler,
  };
};

class BaseApp extends Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      currency: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
    };
  }

  componentDidMount() {

    if (Auth.isUserAuthenticated()) {
      axios({
        method: 'post',
        url: '/authentication/auth-validation',
        headers: {
          'Authorization': `bearer ${Auth.getToken()}`,
          'Content-type': 'application/x-www-form-urlencoded',
        },
      }).then(() => {
        // the jwt has not expired and the user exists
        // fetch his credentials and fill up the reducer

        axios({
          method: 'post',
          url: '/authentication/decode-credentials',
          headers: {
            'Authorization': `bearer ${Auth.getToken()}`,
            'Content-type': 'application/x-www-form-urlencoded',
          },
        }).then((res) => {
          const response = res.data;
          this.handlers.onGetUserCredentialsHandler(response.id,
              response.username, response.email, response.isAdmin);
        }).catch(() => {
          // if something went wrong then there is something wrong with the server or with the jwt
          // it's best to deauthenticate the user
          // this is not likely to run if the first one fails, but this is just a fail check
          Auth.deauthenticateUser();
          location.reload();
        });

      }).catch(() => {
        // the jwt has expired or the user does not exist
        Auth.deauthenticateUser();
        // force a full page reload to avoid errors
        location.reload();
      });

    }

    if (localStorage.getItem('products') &&
        localStorage.getItem('cartLastModified') &&
        (Date.now() - localStorage.getItem('cartLastModified') < 24 * 3600000))
      this.handlers.onRehydrateShoppingCartStateHandler();
    else {
      localStorage.removeItem('products');
      localStorage.removeItem('cartLastModified');
    }

    this.setState({
      fetchingSettings: true,
    });
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
      } else {
        this.setState({
          fetchingSettings: false,
          fetchedSettings: true,
          fetchingSettingsError: false,
          currency: res.data.settings[0].currency,
        });
      }
    }).catch(() => {
      this.setState({
        fetchingSettings: false,
        fetchedSettings: false,
        fetchingSettingsError: true,
      });
      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred while fetching shop\'s settings. Please contact an administrator.',
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if ((this.context.router.route.location.pathname.indexOf('/browse-shop') ===
        -1 && nextProps.location.pathname.indexOf('/browse-shop') === -1) &&
        nextProps.isShoppingCartOpen === this.props.isShoppingCartOpen &&
        (this.context.router.route.location.pathname.indexOf('/product') ===
        -1 && nextProps.location.pathname.indexOf('/browse-shop') === -1)) {
      smoothScroll();
    }
  }

  render() {

    const mediaQuery = window.matchMedia('(max-width: 1100px)');
    const shoppingCartMediaQuery = window.matchMedia('(max-width: 800px)');
    return (
        <div className={`site-wrap ${this.props.isShoppingCartOpen ?
            'shopping-cart-active' :
            ''}`} aria-hidden="false">
          <div
              className={`shopping-cart-overlay ${this.props.isShoppingCartOpen ?
                  'active' :
                  ''}`}
              onClick={this.handlers.onCloseShoppingCartHandler}/>
          <div className={`shopping-cart ${this.props.isShoppingCartOpen ?
              'active' :
              ''}`}>
            {this.props.shoppingCartProducts.length === 0 ?
                <div>
                  <p className="no-items-in-cart">
                    No products to show
                  </p>
                </div>
                :
                <Card bordered={false}
                      noHovering={true}
                      style={{
                        minHeight: '100vh',
                      }}
                      bodyStyle={{
                        paddingBottom: 68,
                        minHeight: '100vh',
                      }}>
                  <ul>
                    {this.props.shoppingCartProducts.map((item, index) => {
                      return <li key={index}
                                 className="shopping-cart-product-list-item">
                        <span className="shopping-cart-remove-button"
                              onClick={() => this.handlers.onRemoveProductFromCartHandler(
                                  index)}>
                          x
                        </span>
                        <Link
                            to={`/product/${item.product.productLink}&${item.product._id}`}
                            onClick={shoppingCartMediaQuery.matches ?
                                this.handlers.onCloseShoppingCartHandler :
                                console.log('')}>
                          <div
                              className="shopping-cart-product-name-and-thumbnail">
                            <img src={item.product.productThumbnail} alt=""/>
                            {item.product.productName}
                          </div>
                        </Link>
                        <div className="shopping-cart-qty">
                          {item.qty} x {this.state.currency[1] }
                          {item.product.salePrice ?
                              item.product.salePrice :
                              item.product.productPrice}
                        </div>
                      </li>;
                    })}
                  </ul>
                  <div className="shopping-cart-checkout-button"
                       onClick={() => {
                         this.context.router.history.push('/checkout');
                         this.handlers.onCloseShoppingCartHandler();
                       }}>
                    Checkout
                  </div>
                </Card>
            }
          </div>
          <Layout style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <header className="top-header">
              <NavigationView location={this.context.router.route.location}/>
            </header>
            <LocaleProvider locale={enUS}>
              <div id="main" role="main">
                <Layout>
                  <Content
                      style={mediaQuery.matches ?
                          {
                            margin: this.context.router.route.location.pathname.indexOf(
                                '/control-panel') !== -1 ?
                                '68px 0 0' :
                                '160px 0 0',
                          } :
                          {
                            padding: this.context.router.route.location.pathname.indexOf(
                                '/control-panel') === -1 ? '190px 50px 0' :
                                '81px 50px 0',
                          }}>
                    <Routes/>
                  </Content>
                </Layout>
              </div>
            </LocaleProvider>
            <footer>
              <Footer style={{ textAlign: 'center' }}>
                <FooterView/>
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

const mapStateToProps = (state) => {
  return {
    isShoppingCartOpen: state.navigationReducer.shoppingCart.isModalVisible,
    shoppingCartProducts: state.navigationReducer.shoppingCart.products,
  };
};

export default withRouter(connect(mapStateToProps)(BaseApp));
