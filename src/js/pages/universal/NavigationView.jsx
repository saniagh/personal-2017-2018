import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { notification } from 'antd';
import { connect } from 'react-redux';
import {
  onShowLoginModalAction,
  onHideLoginModalAction,
  onShowSignupModalAction,
  onHideSignupModalAction,
} from './navigationActions.js';

import Navigation from './Navigation.jsx';

let createHandlers = function (dispatch) {
  let onShowLoginModal = function () {
    dispatch(onShowLoginModalAction());
  };

  let onHideLoginModal = function () {
    dispatch(onHideLoginModalAction());
  };

  let onShowSignupModal = function () {
    dispatch(onShowSignupModalAction());
  };

  let onHideSignupModal = function () {
    dispatch(onHideSignupModalAction());
  };

  return {
    onShowLoginModal,
    onHideLoginModal,
    onShowSignupModal,
    onHideSignupModal,
  };
};

class NavigationView extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      siteNavigation: [],
    };
  }

  componentDidMount() {
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
        siteNavigation: res.data.settings[0].siteNavigation,
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

  onShowLoginModal = () => {
    this.handlers.onShowLoginModal();
  };

  onHideLoginModal = () => {
    this.handlers.onHideLoginModal();
  };

  onShowSignupModal = () => {
    this.handlers.onShowSignupModal();
  };

  onHideSignupModal = () => {
    this.handlers.onHideSignupModal();
  };

  render() {
    return <Navigation fetchedSettings={this.state.fetchedSettings}
                       siteNavigation={this.state.siteNavigation}
                       login={this.props.login}
                       signup={this.props.signup}
                       router={this.context.router}
                       location={this.props.location}
                       onShowLoginModal={this.onShowLoginModal}
                       onHideLoginModal={this.onHideLoginModal}
                       onShowSignupModal={this.onShowSignupModal}
                       onHideSignupModal={this.onHideSignupModal}/>;
  }
}
NavigationView.propTypes = {
  login: PropTypes.shape({
    isModalVisible: PropTypes.bool,
  }),
  signup: PropTypes.shape({
    isModalVisible: PropTypes.bool,
  }),
};

NavigationView.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    login: state.navigationReducer.login,
    signup: state.navigationReducer.signup,
  };
};

export default connect(mapStateToProps)(NavigationView);
