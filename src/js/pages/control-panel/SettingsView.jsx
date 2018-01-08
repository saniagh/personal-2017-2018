import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';

import Settings from './Settings.jsx';

class SettingsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      settings: [],
      currency: [],
      savingSettings: false,
      savedSettings: false,
      savingSettingsError: false,
      newCurrency: [],
      loadedPage: false,
    };
  }

  currencyData = [
    {
      currency: 'RON',
      symbol: 'RON',
    },
    {
      currency: 'USD',
      symbol: '$',
    },
    {
      currency: 'EUR',
      symbol: '€',
    },
  ];

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
        settings: res.data.settings,
        currency: res.data.settings[0].currency,
        loadedPage: true,
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

  onCurrencyChange = (value) => {
    this.currencyData.map((currency, i) => {
      if (value === currency.currency) {
        const newCurrency = [currency.currency, currency.symbol];
        this.setState({
          newCurrency: newCurrency,
        });
      }
    });
  };

  onSave = () => {
    this.setState({
      savingSettings: true,
    });
    axios({
      method: 'post',
      url: '/settings/update-settings',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        currency: JSON.stringify(this.state.newCurrency),
      }),
    }).then(() => {

      notification.success({
        message: 'Success!',
        description: 'The settings have been successfully updated.',
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
          settings: res.data.settings,
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

      this.setState({
        savingSettings: false,
        savedSettings: true,
        savingSettingsError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'An error has occurred while saving the settings.',
      });

      this.setState({
        savingSettings: false,
        savedSettings: false,
        savingSettingsError: true,
      });
    });
  };

  onResetDefault = () => {
    this.setState({
      savingSettings: true,
    });
    axios({
      method: 'get',
      url: '/settings//update-to-default-settings',
    }).then(() => {

      notification.success({
        message: 'Success!',
        description: 'The settings have been successfully reset to default.',
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
          settings: res.data.settings,
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

      this.setState({
        savingSettings: false,
        savedSettings: true,
        savingSettingsError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'An error has occurred while saving the settings.',
      });

      this.setState({
        savingSettings: false,
        savedSettings: false,
        savingSettingsError: true,
      });
    });
  };

  render() {
    return <Settings fetchingSettings={this.state.fetchingSettings}
                     fetchedSettings={this.state.fetchedSettings}
                     fetchingSettingsError={this.state.fetchingSettingsError}
                     settings={this.state.settings}
                     currency={this.state.currency}
                     savingSettings={this.state.savingSettings}
                     savedSettings={this.state.savedSettings}
                     savingSettingsError={this.state.savingSettingsError}
                     loadedPage={this.state.loadedPage}
                     currencyData={this.currencyData}
                     onCurrencyChange={this.onCurrencyChange}
                     onSave={this.onSave}
                     onResetDefault={this.onResetDefault}/>;
  }
}

export default SettingsView;
