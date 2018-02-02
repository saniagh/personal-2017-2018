import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    return <Navigation login={this.props.login}
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
