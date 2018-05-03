import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';

import Auth from '../../modules/Auth.js';

import ManageOrders from './ManageOrders.jsx';

class ManageOrdersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingOrders: false,
      fetchedOrders: false,
      fetchingOrdersError: false,
      orders: [],
      fetchingCurrency: false,
      currency: [],
      selected: [],
      bulkAction: '',
      searchQuery: '',
      showingFilteredOrders: false,
      filteredOrders: [],
    };
  }

  componentDidMount() {
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

    this.setState({
      fetchingSettings: true,
    });

    axios({
      method: 'get',
      url: '/settings/get-settings',
    }).then((res) => {
      this.setState({
        fetchingSettings: false,
        currency: res.data.settings[0].currency,
      });
    }).catch(() => {
      this.setState({
        fetchingSettings: false,
      });
      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred while fetching shop\'s settings. Please contact an administrator.',
      });
    });

  }

  onSelect = (id) => {

    let exists = false;

    let newSelected = this.state.selected;

    for (let i = 0; i < newSelected.length; i++) {
      if (newSelected[i] === id) {
        newSelected = newSelected.filter(a => a !== id);
        exists = true;
      }
    }

    if (!exists) {
      newSelected.push(id);
    }

    this.setState({
      selected: newSelected,
    });
  };

  onChangeBulkAction = (value) => {
    this.setState({
      bulkAction: value,
    });
  };

  onSearchQueryChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });

    if (!e.target.value) {
      this.setState({
        showingFilteredOrders: false,
      });
    }
  };

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

  onExecuteBulkAction = () => {
    if (this.state.bulkAction === 'Mark as completed' &&
        this.state.selected.length !== 0) {
      this.state.selected.map((orderId) => {
        this.onCompleteOrder(orderId);
      });
      this.setState({
        selected: [],
      });
    }
  };

  onFilterOrders = () => {

    if (this.state.searchQuery)
      this.setState({
        showingFilteredOrders: true,
      });

    let newFilteredOrders = [];

    if (this.state.searchQuery) {
      this.state.orders.map((order) => {
        if (order.email.toLowerCase().
                indexOf(this.state.searchQuery.toLowerCase()) !== -1 ||
            order.firstName.toLowerCase().
                indexOf(this.state.searchQuery.toLowerCase()) !== -1 ||
            order.lastName.toLowerCase().
                indexOf(this.state.searchQuery.toLowerCase()) !== -1) {
          newFilteredOrders.push(order);
        }
      });

      this.setState({
        filteredOrders: newFilteredOrders,
      });
    }
  };

  render() {
    return <ManageOrders fetchingOrders={this.state.fetchingOrders}
                         orders={this.state.orders}
                         fetchingSettings={this.state.fetchingSettings}
                         currency={this.state.currency}
                         selected={this.state.selected}
                         searchQuery={this.state.searchQuery}
                         showingFilteredOrders={this.state.showingFilteredOrders}
                         filteredOrders={this.state.filteredOrders}
                         onSelect={this.onSelect}
                         onChangeBulkAction={this.onChangeBulkAction}
                         onSearchQueryChange={this.onSearchQueryChange}
                         onCompleteOrder={this.onCompleteOrder}
                         onExecuteBulkAction={this.onExecuteBulkAction}
                         onFilterOrders={this.onFilterOrders}/>;
  }
}

export default ManageOrdersView;
