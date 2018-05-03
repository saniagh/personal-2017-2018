import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import axios from 'axios';
import qs from 'qs';

import OrderDetails from './OrderDetails.jsx';

import Auth from '../../modules/Auth.js';

class OrderDetailsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingOrder: false,
      fetchedOrder: false,
      fetchingOrderError: false,
      order: {},
      currency: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
    };
  }

  componentDidMount() {
    if (this.props.match.params.orderId) {

      this.setState({
        fetchingOrder: true,
      });

      axios({
        method: 'post',
        url: '/authentication/auth-validation',
        headers: {
          'Authorization': `bearer ${Auth.getToken()}`,
        },
      }).then(() => {
        axios({
          method: 'post',
          url: '/authentication/decode-credentials',
          headers: {
            'Authorization': `bearer ${Auth.getToken()}`,
          },
        }).then((res) => {
          const response = res.data;

          axios({
            method: 'post',
            url: '/order/get-order-public',
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              'Authorization': `bearer ${Auth.getToken()}`,
            },
            data: qs.stringify({
              orderId: this.props.match.params.orderId,
              reducerEmail: this.props.reducerEmail,
            }),
          }).then((res) => {
            this.setState({
              fetchingOrder: false,
              fetchedOrder: true,
              fetchingOrderError: false,
              order: res.data.order,
            });
          }).catch(() => {
            this.setState({
              fetchingOrder: false,
              fetchedOrder: false,
              fetchingOrderError: true,
            });

            notification.error({
              message: 'Error',
              description: 'You\'re not allowed to see this order.',
              duration: 30,
            });
          });

        }).catch(() => {
          notification.error({
            message: 'Error',
            description: 'You\'re not allowed to see this order. Please login first.',
            duration: 30,
          });
          this.props.history.replace('/');
        });
      }).catch(() => {
        notification.error({
          message: 'Error',
          description: 'You\'re not allowed to see this order. Please login first.',
          duration: 30,
        });
        this.props.history.replace('/');
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
    return <OrderDetails orderId={this.props.match.params.orderId}
                         currency={this.state.currency}
                         fetchingOrder={this.state.fetchingOrder}
                         fetchedOrder={this.state.fetchedOrder}
                         order={this.state.order}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    reducerEmail: state.userReducer.email,
  };
};

export default connect(mapStateToProps)(OrderDetailsView);
