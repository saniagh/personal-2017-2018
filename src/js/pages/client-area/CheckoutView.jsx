import React, { Component } from 'react';
import { notification } from 'antd';
import axios from 'axios';

import { connect } from 'react-redux';

import {
  onShowLoginModalAction,
  onShowSignupModalAction,
} from '../universal/navigationActions.js';

import Checkout from './Checkout.jsx';

let createHandlers = function (dispatch) {
  let onShowLoginModal = function () {
    dispatch(onShowLoginModalAction());
  };

  let onShowSignupModal = function () {
    dispatch(onShowSignupModalAction());
  };

  return {
    onShowLoginModal,
    onShowSignupModal,
  };
};

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
      orderNotes: '',
      currency: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      confirmedTermsOfService: false,
    };
  }

  onFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  onLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onPhoneNumberChange = (e) => {
    this.setState({
      phoneNumber: e.target.value,
    });
  };

  onCountryChange = (value) => {
    this.setState({
      country: value,
    });
  };

  onStateOrCountyChange = (e) => {
    this.setState({
      stateOrCounty: e.target.value,
    });
  };

  onTownOrCityChange = (e) => {
    this.setState({
      townOrCity: e.target.value,
    });
  };

  onPostcodeOrZIPChange = (e) => {
    this.setState({
      postcodeOrZIP: e.target.value,
    });
  };

  onOrderNotesChange = (e) => {
    this.setState({
      orderNotes: e.target.value,
    });
  };

  onConfirmTermsOfService = (e) => {
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
        country: localStorage.getItem('country'),
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
        country: localStorage.getItem('country'),
      });
    }
  }

  // when I save the order I save in localStorage the credentials for future reuse
  // only firstName, lastName and country.

  render() {
    return <Checkout firstName={this.state.firstName}
                     lastName={this.state.lastName}
                     email={this.state.email}
                     phoneNumber={this.state.phoneNumber}
                     country={this.state.country}
                     stateOrCounty={this.state.stateOrCounty}
                     townOrCity={this.state.townOrCity}
                     postcodeOrZIP={this.state.postcodeOrZIP}
                     orderNotes={this.state.orderNotes}
                     shoppingCartProducts={this.props.shoppingCartProducts}
                     currency={this.state.currency}
                     confirmedTermsOfService={this.state.confirmedTermsOfService}
                     reducerEmail={this.props.email}
                     onFirstNameChange={this.onFirstNameChange}
                     onLastNameChange={this.onLastNameChange}
                     onEmailChange={this.onEmailChange}
                     onPhoneNumberChange={this.onPhoneNumberChange}
                     onCountryChange={this.onCountryChange}
                     onStateOrCountyChange={this.onStateOrCountyChange}
                     onTownOrCityChange={this.onTownOrCityChange}
                     onPostcodeOrZIPChange={this.onPostcodeOrZIPChange}
                     onOrderNotesChange={this.onOrderNotesChange}
                     onConfirmTermsOfService={this.onConfirmTermsOfService}
                     onShowLoginModal={this.handlers.onShowLoginModal}
                     onShowSignupModal={this.handlers.onShowSignupModal}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    shoppingCartProducts: state.navigationReducer.shoppingCart.products,
    email: state.userReducer.email,
  };
};

export default connect(mapStateToProps)(CheckoutView);
