import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import axios from 'axios';
import qs from 'qs';

import { connect } from 'react-redux';

import {
  onShowLoginModalAction,
  onShowSignupModalAction,
  onEmptyCart,
} from '../universal/navigationActions.js';

import Checkout from './Checkout.jsx';

let createHandlers = function (dispatch) {
  let onShowLoginModal = function () {
    dispatch(onShowLoginModalAction());
  };

  let onShowSignupModal = function () {
    dispatch(onShowSignupModalAction());
  };

  let onEmptyCartHandler = function () {
    dispatch(onEmptyCart());
  };

  return {
    onShowLoginModal,
    onShowSignupModal,
    onEmptyCartHandler,
  };
};

import Auth from '../../modules/Auth.js';

class CheckoutView extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      country: '',
      stateOrCounty: '',
      townOrCity: '',
      postcodeOrZIP: '',
      fullHomeAddress: '',
      orderNotes: '',
      currency: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      confirmedTermsOfService: false,
      savingOrder: false,
      savedOrder: false,
      savingOrderError: false,
      errors: {},
    };
  }

  onFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value,
      errors: {
        ...this.state.errors,
        firstName: '',
      },
    });
  };

  onLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value,
      errors: {
        ...this.state.errors,
        lastName: '',
      },
    });
  };

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
      errors: {
        ...this.state.errors,
        email: '',
      },
    });
  };

  onPhoneNumberChange = (e) => {
    this.setState({
      phoneNumber: e.target.value,
      errors: {
        ...this.state.errors,
        phoneNumber: '',
      },
    });
  };

  onCountryChange = (value) => {
    this.setState({
      country: value,
      errors: {
        ...this.state.errors,
        country: '',
      },
    });
  };

  onStateOrCountyChange = (e) => {
    this.setState({
      stateOrCounty: e.target.value,
      errors: {
        ...this.state.errors,
        stateOrCounty: '',
      },
    });
  };

  onTownOrCityChange = (e) => {
    this.setState({
      townOrCity: e.target.value,
      errors: {
        ...this.state.errors,
        townOrCity: '',
      },
    });
  };

  onPostcodeOrZIPChange = (e) => {
    this.setState({
      postcodeOrZIP: e.target.value,
      errors: {
        ...this.state.errors,
        postcodeOrZIP: '',
      },
    });
  };

  onFullHomeAddressChange = (e) => {
    this.setState({
      fullHomeAddress: e.target.value,
      errors: {
        ...this.state.errors,
        fullHomeAddress: '',
      },
    });
  };

  onOrderNotesChange = (e) => {
    this.setState({
      orderNotes: e.target.value,
      errors: {
        ...this.state.errors,
        orderNotes: '',
      },
    });
  };

  onConfirmTermsOfService = () => {
    this.setState({
      confirmedTermsOfService: !this.state.confirmedTermsOfService,
    });
  };

  componentDidMount() {
    // the user is authenticated
    // for privacy we only save a few details
    if (this.props.email) {
      this.setState({
        email: this.props.email,
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
      });
    }

    //check localStorage for stored values of credentials !
    this.setState({
      fetchingSettings: true,
    });
    axios({
      method: 'get',
      url: '/settings/get-settings',
    }).then((res) => {
      this.setState({
        fetchingSettings: false,
        fetchedSettings: true,
        fetchingSettingsError: false,
        currency: res.data.settings[0].currency,
      });
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
    if (nextProps.email) {
      this.setState({
        email: nextProps.email,
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
      });
    }
  }

  onSaveOrder = () => {
    if (this.state.confirmedTermsOfService === true) {
      this.setState({
        savingOrder: true,
        savedOrder: false,
        savingOrderError: false,
      });

      notification.warn({
        message: 'In-Progress',
        description: 'We\'re saving your order. Please wait.',
        duration: 6,
      });

      const state = this.state;

      axios({
        method: 'post',
        url: '/order/make-order',
        headers: Auth.isUserAuthenticated() ?
            {
              'Authorization': `bearer ${Auth.getToken()}`,
              'Content-type': 'application/x-www-form-urlencoded',
            }
            :
            {
              'Content-type': 'application/x-www-form-urlencoded',
            },
        data: qs.stringify({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phoneNumber: state.phoneNumber,
          country: state.country,
          stateOrCounty: state.stateOrCounty,
          townOrCity: state.townOrCity,
          postcodeOrZIP: state.postcodeOrZIP,
          fullHomeAddress: state.fullHomeAddress,
          orderNotes: state.orderNotes,
          orderedProducts: JSON.stringify(this.props.shoppingCartProducts),
        }),
      }).then((res) => {
        this.setState({
          savingOrder: false,
          savedOrder: true,
          savingOrderError: false,
        });

        localStorage.setItem('firstName', state.firstName);
        localStorage.setItem('lastName', state.lastName);

        notification.success({
          message: 'Order successful',
          description: 'You will be redirected shortly.',
          duration: 6,
        });

        setTimeout(() => {
          this.handlers.onEmptyCartHandler();
          this.context.router.history.push(
              `/order-details/${res.data.orderId}`);
        }, 5000);

      }).catch((err) => {
        this.setState({
          errors: err.response.data.errors,
          savingOrder: false,
          savedOrder: false,
          savingOrderError: true,
        });

        if (err.response.data.errors.orderedProducts) {
          notification.error({
            message: 'Shopping Cart Error',
            description: err.response.data.errors.orderedProducts,
            duration: 10,
          });
        }

        notification.error({
          message: 'Error',
          description: 'Please check the errors and try again.',
          duration: 6,
        });
      });

    } else {
      notification.warn({
        message: 'Terms of service',
        description: 'Please confirm you\'ve accepted the terms of service.',
        duration: 6,
      });
    }
  };

  render() {
    return <Checkout firstName={this.state.firstName}
                     lastName={this.state.lastName}
                     email={this.state.email}
                     phoneNumber={this.state.phoneNumber}
                     country={this.state.country}
                     stateOrCounty={this.state.stateOrCounty}
                     townOrCity={this.state.townOrCity}
                     postcodeOrZIP={this.state.postcodeOrZIP}
                     fullHomeAddress={this.state.fullHomeAddress}
                     orderNotes={this.state.orderNotes}
                     shoppingCartProducts={this.props.shoppingCartProducts}
                     currency={this.state.currency}
                     confirmedTermsOfService={this.state.confirmedTermsOfService}
                     reducerEmail={this.props.email}
                     errors={this.state.errors}
                     savedOrder={this.state.savedOrder}
                     savingOrder={this.state.savingOrder}
                     onFirstNameChange={this.onFirstNameChange}
                     onLastNameChange={this.onLastNameChange}
                     onEmailChange={this.onEmailChange}
                     onPhoneNumberChange={this.onPhoneNumberChange}
                     onCountryChange={this.onCountryChange}
                     onStateOrCountyChange={this.onStateOrCountyChange}
                     onTownOrCityChange={this.onTownOrCityChange}
                     onPostcodeOrZIPChange={this.onPostcodeOrZIPChange}
                     onFullHomeAddressChange={this.onFullHomeAddressChange}
                     onOrderNotesChange={this.onOrderNotesChange}
                     onConfirmTermsOfService={this.onConfirmTermsOfService}
                     onSaveOrder={this.onSaveOrder}
                     onShowLoginModal={this.handlers.onShowLoginModal}
                     onShowSignupModal={this.handlers.onShowSignupModal}/>;
  }
}

CheckoutView.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    shoppingCartProducts: state.navigationReducer.shoppingCart.products,
    email: state.userReducer.email,
  };
};

export default connect(mapStateToProps)(CheckoutView);
