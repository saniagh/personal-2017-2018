import React, { Component } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import qs from 'qs';

import ManageOrderDetails from './ManageOrderDetails.jsx';

import Auth from '../../modules/Auth.js';

class ManageOrderDetailsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingOrder: false,
      fetchedOrder: false,
      fetchingOrderError: false,
      order: [],
      currency: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
    };
  }

  componentDidMount() {
    this.setState({
      fetchingOrder: true,
    });

    axios({
      method: 'post',
      url: '/order/get-order-details-admin',
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        orderId: this.props.match.params.orderId,
      }),
    }).then((res) => {

      this.setState({
        fetchingOrder: false,
        fetchedOrder: true,
        fetchingOrderError: false,
        order: res.data.order,
      });

    }).catch(() => {
      notification.error({
        message: 'Oops!',
        description: 'Something went wrong.',
      });

      this.setState({
        fetchingOrder: false,
        fetchedOrder: false,
        fetchingOrderError: true,
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

  onCompleteOrder = (orderId) => {
    axios({
      method: 'post',
      url: '/order/complete-order',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`,
      },
      data: qs.stringify({
        orderId: orderId,
      }),
    }).then(() => {
      notification.success({
        message: 'Completed!',
        description: `Order with id ${orderId} has been marked as completed.`,
      });

      this.setState({
        fetchingOrders: true,
      });

      axios({
        method: 'get',
        url: '/order/get-order-admin',
        headers: {
          'Authorization': `bearer ${Auth.getToken()}`,
        },
      }).then((res) => {
        let newOrders = res.data.orders;

        for (let i = 0; i < newOrders.length; i++) {
          let date = new Date(newOrders[i].createdAt);
          newOrders[i].createdAt = date.toISOString().
              replace('-', '/').
              split('T')[0].replace('-', '/');
        }

        this.setState({
          fetchingOrders: false,
          fetchedOrders: true,
          fetchingOrdersError: false,
          orders: newOrders,
        });

      }).catch((err) => {
        console.log(err);
        notification.error({
          message: 'Oops!',
          description: 'An error has occurred',
        });

        this.setState({
          fetchingOrders: false,
          fetchedOrders: false,
          fetchingOrdersError: true,
        });
      });

    }).catch(() => {
      notification.error({
        message: 'Oops!',
        description: 'Something went wrong while completing this order.',
      });
    });
  };

  render() {
    return (
        <ManageOrderDetails fetchedOrder={this.state.fetchedOrder}
                            order={this.state.order}
                            currency={this.state.currency}
                            onCompleteOrder={this.onCompleteOrder}/>
    );
  }
}

export default ManageOrderDetailsView;
