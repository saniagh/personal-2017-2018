import React, { Component } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import qs from 'qs';

import OrderDetails from './OrderDetails.jsx';

class OrderDetailsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingOrder: false,
      fetchedOrder: false,
      fetchingOrderError: false,
      order: {},
    };
  }

  componentDidMount() {
    if (this.props.match.params.orderId) {

      this.setState({
        fetchingOrder: true,
      });

      axios({
        method: 'post',
        url: '/order/get-order-public',
        headers: {
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
        this.setState({
          fetchingOrder: false,
          fetchedOrder: false,
          fetchingOrderError: true,
        });

        notification.error({
          message: 'Error',
          description: 'This order may have already been completed or is inexistent.',
          duration: 30,
        });
      });
    }
  }

  render() {
      return <OrderDetails orderId={this.props.match.params.orderId}
                           fetchingOrder={this.state.fetchingOrder}
                           order={this.state.order}/>;
  }
}

export default OrderDetailsView;
