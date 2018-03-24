import React, { Component } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';

import {
  onAddProductToCart,
} from '../universal/navigationActions.js';

import QuickViewProduct from './QuickViewProduct.jsx';

let createHandlers = function (dispatch) {
  let onAddProductToCartHandler = function (product, qty) {
    dispatch(onAddProductToCart(product, qty));
  };

  return {
    onAddProductToCartHandler,
  };
};

class QuickViewProductView extends Component {

  constructor(props) {
    super(props);

    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      orderQty: 1,
    };
  }

  onIncrementQty = () => {
    this.setState({
      orderQty: this.state.orderQty + 1,
    });
  };

  onDecrementQty = () => {
    this.setState({
      orderQty: this.state.orderQty - 1,
    });
  };

  onQtyChange = (e) => {
    this.setState({
      orderQty: e.target.value,
    });
  };

  onAddProductToCart = (product, qty) => () => {
    this.handlers.onAddProductToCartHandler(product, qty);
    notification.success({
      duration: 5,
      message: 'Success!',
      description: `${this.state.orderQty} ${this.props.product.productName} ${this.state.orderQty ===
      1 ? 'has' : 'have'} been added to your shopping cart!`,
    });
    this.setState({
      orderQty: 1,
    });
  };

  render() {
    if (this.props.product)
      return <QuickViewProduct product={this.props.product}
                               currency={this.props.currency}
                               orderQty={this.state.orderQty}
                               onIncrementQty={this.onIncrementQty}
                               onDecrementQty={this.onDecrementQty}
                               onQtyChange={this.onQtyChange}
                               onHideModal={this.props.onHideModal}
                               onAddProductToCart={this.onAddProductToCart}/>;
    else return (<div>

    </div>);
  }
}

export default connect()(QuickViewProductView);
