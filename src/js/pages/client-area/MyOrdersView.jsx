import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { notification } from 'antd';

import MyOrders from './MyOrders.jsx';

import Auth from '../../modules/Auth.js';

class MyOrdersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingOrders: false,
      fetchedOrders: false,
      fetchingOrdersError: false,
      orders: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      currency: [],
    };
  }

  componentDidMount() {
    if (Auth.isUserAuthenticated()) {

      this.setState({
        fetchingOrders: true,
      });

      axios({
        method: 'get',
        url: '/order/get-user-orders',
        headers: {
          'Authorization': `bearer ${Auth.getToken()}`,
        },
      }).then((res) => {
        this.setState({
          fetchingOrders: false,
          fetchedOrders: true,
          fetchingOrdersError: false,
          orders: res.data.orders,
        });
      }).catch(() => {

        notification.error({
          message: 'Oops!',
          description: 'Please relog. If the error persists contact us.',
        });

        this.setState({
          fetchingOrders: false,
          fetchedOrders: false,
          fetchingOrdersError: true,
        });
      });

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
  }

  render() {
    return <MyOrders fetchingOrders={this.state.fetchingOrders}
                     orders={this.state.orders}
                     currency={this.state.currency}/>;
  }
}

MyOrdersView.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default MyOrdersView;
