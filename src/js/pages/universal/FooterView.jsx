import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer.jsx';

class FooterView extends Component {
  render() {
    return <Footer location={this.context.router.route.location}/>;
  }
}

FooterView.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default FooterView;
