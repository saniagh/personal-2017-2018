import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MyOrders from './MyOrders.jsx';

class MyOrdersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };
  }

  onSearchQueryChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  onSearch = () => {
    if (this.state.searchQuery) {
      this.context.router.history.push(`/order-details/${this.state.searchQuery}`)
    }
  };

  handlePressEnterSearch = (e) => {
    if (e.key === 'Enter') {
      this.onSearch();
    }
  };

  render() {
    return <MyOrders searchQuery={this.state.searchQuery}
                     onSearchQueryChange={this.onSearchQueryChange}
                     onSearch={this.onSearch}
                     handlePressEnterSearch={this.handlePressEnterSearch}/>;
  }
}

MyOrdersView.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default MyOrdersView;
