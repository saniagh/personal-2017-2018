import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import axios from 'axios';

import Footer from './Footer.jsx';

class FooterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      footerLeftColumn: [
        {
          lineType: 'title',
          lineText: '',
          lineAnchor: '',
        },
        {
          lineType: 'normal',
          lineText: '',
          lineAnchor: '',
        },
      ],
      footerCenterColumn: [
        {
          lineType: 'title',
          lineText: '',
          lineAnchor: '',
        },
        {
          lineType: 'normal',
          lineText: '',
          lineAnchor: '',
        },
      ],
      footerRightColumn: [
        {
          lineType: 'title',
          lineText: '',
          lineAnchor: '',
        },
        {
          lineType: 'normal',
          lineText: '',
          lineAnchor: '',
        },
      ],
    };
  }

  componentDidMount() {
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
        footerLeftColumn: res.data.settings[0].footerLeftColumn,
        footerCenterColumn: res.data.settings[0].footerCenterColumn,
        footerRightColumn: res.data.settings[0].footerRightColumn,
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

  render() {
    return <Footer location={this.context.router.route.location}
                   fetchingSettings={this.state.fetchingSettings}
                   footerLeftColumn={this.state.footerLeftColumn}
                   footerCenterColumn={this.state.footerCenterColumn}
                   footerRightColumn={this.state.footerRightColumn}/>;
  }
}

FooterView.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default FooterView;
