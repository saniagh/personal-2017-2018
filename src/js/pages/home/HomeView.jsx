import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  onShowLoginModalAction,
  onHideLoginModalAction,
} from './homeActions.js';

import Home from './Home.jsx';

let createHandlers = function (dispatch) {
  let onShowLoginModal = function () {
    dispatch(onShowLoginModalAction());
  };

  let onHideLoginModal = function () {
    dispatch(onHideLoginModalAction());
  };

  return {
    onShowLoginModal,
    onHideLoginModal,
  };
};

class HomeView extends Component {
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

  render() {
    return <Home onUpload={this.onUpload}
                 login={this.props.login}
                 signup={this.props.signup}
                 onShowLoginModal={this.onShowLoginModal}
                 onHideLoginModal={this.onHideLoginModal}/>;
  }
}
HomeView.propTypes = {
  login: PropTypes.shape({
    isModalVisible: PropTypes.bool,
  }),
  signup: PropTypes.shape({
    isModalVisible: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => {
  return {
    login: state.homeReducer.login,
    signup: state.homeReducer.signup,
  };
};

export default connect(mapStateToProps)(HomeView);
