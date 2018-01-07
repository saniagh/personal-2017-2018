import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Product from './Product.jsx';

class ProductView extends Component {
  render() {
    return <Product router={this.context.router}/>;
  }
}

ProductView.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default ProductView;
