import React, { Component } from 'react';

import QuickViewProduct from './QuickViewProduct.jsx';

class QuickViewProductView extends Component {

  constructor(props) {
    super(props);

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

  render() {
    if (this.props.product)
      return <QuickViewProduct product={this.props.product}
                               currency={this.props.currency}
                               orderQty={this.state.orderQty}
                               onIncrementQty={this.onIncrementQty}
                               onDecrementQty={this.onDecrementQty}
                               onQtyChange={this.onQtyChange}
                               onHideModal={this.props.onHideModal}/>;
    else return (<div>

    </div>);
  }
}

export default QuickViewProductView;
