import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import LoginView from '../auth/login/LoginView.jsx';
import SignupView from '../auth/signup/SignupView.jsx';

class Navigation extends Component {
  render() {
    return (
        <header>
          <Button type="primary"
                  onClick={this.props.onShowLoginModal}>Login</Button>
          <Modal title="Authentication"
                 wrapClassName="vertical-center-modal"
                 visible={this.props.login.isModalVisible}
                 footer={null}
                 width="560px"
                 onOk={this.props.onHideLoginModal}
                 onCancel={this.props.onHideLoginModal}>
            <LoginView/>
          </Modal>
          <Button type="primary"
                  onClick={this.props.onShowSignupModal}>Signup</Button>
          <Modal title="Registration"
                 wrapClassName="vertical-center-modal"
                 visible={this.props.signup.isModalVisible}
                 footer={null}
                 width="520px"
                 onOk={this.props.onHideSignupModal}
                 onCancel={this.props.onHideSignupModal}>
            <SignupView/>
          </Modal>
        </header>
    );
  }
}

export default Navigation;
