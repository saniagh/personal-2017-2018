import React, { Component } from 'react';

import { Card, Input, Icon } from 'antd';
const Search = Input.Search;

class MyOrders extends Component {
  render() {
    return <Card noHovering={true}
                 bordered={false}>
      <div className="my-orders-header">
        Enter the ID of your order below and hit Search
      </div>
      <div className="my-orders-spacing">
        <input type="text"
               className="my-orders-input"
               placeholder="ID goes here..."
               value={this.props.searchQuery}
               onChange={this.props.onSearchQueryChange}
               onKeyDown={this.props.handlePressEnterSearch}/>
        <button className="my-orders-button"
                onClick={this.props.onSearch}>
          Search
        </button>
      </div>
    </Card>;
  }
}

export default MyOrders;
