import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { connect } from 'react-redux';
import {
  onShowLoginModalAction,
  onHideLoginModalAction,
} from './homeActions.js';
import { onImagesSliderChange } from '../control-panel/settingsActions.js';
import axios from 'axios';
import qs from 'qs';

import Home from './Home.jsx';

let createHandlers = function (dispatch) {
  let onShowLoginModal = function () {
    dispatch(onShowLoginModalAction());
  };

  let onHideLoginModal = function () {
    dispatch(onHideLoginModalAction());
  };

  let onImagesSliderChangeHandler = function () {
    dispatch(onImagesSliderChange());
  };

  return {
    onShowLoginModal,
    onHideLoginModal,
    onImagesSliderChangeHandler,
  };
};

class HomeView extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      settings: [],
      sliderImages: [],
      leftIndexPromotionsDesktop: {
        imageUrl: '',
        imageAnchor: '',
      },
      rightIndexPromotionsDesktop: {
        imageUrl: '',
        imageAnchor: '',
      },
      footerIndexPromotionsDesktop: {
        imageUrl: '',
        imageAnchor: '',
      },
      indexPromotionsNewArrivals: [
        {
          imageUrl: '',
          imageAnchor: '',
        },
        {
          imageUrl: '',
          imageAnchor: '',
        },
        {
          imageUrl: '',
          imageAnchor: '',
        },
        {
          imageUrl: '',
          imageAnchor: '',
        },
      ],
      indexSalesTopPosterDesktop: {
        imageUrl: '',
        imageAnchor: '',
      },
      indexSalesMiddleImagesDesktop: [
        {
          imageUrl: '',
          imageAnchor: '',
        },
        {
          imageUrl: '',
          imageAnchor: '',
        },
        {
          imageUrl: '',
          imageAnchor: '',
        },
      ],
      indexSalesMiddlePosterDesktop: {
        imageUrl: '',
        imageAnchor: '',
      },
      indexSalesBottomImagesDesktop: [
        {
          imageUrl: '',
          imageAnchor: '',
        },
        {
          imageUrl: '',
          imageAnchor: '',
        },
        {
          imageUrl: '',
          imageAnchor: '',
        },
      ],
      indexImagesMobile: [
        {
          imageUrl: '',
          imageAnchor: '',
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
        settings: res.data.settings,
        sliderImages: res.data.settings[0].sliderImages,
        leftIndexPromotionsDesktop: res.data.settings[0].leftIndexPromotionsDesktop,
        rightIndexPromotionsDesktop: res.data.settings[0].rightIndexPromotionsDesktop,
        footerIndexPromotionsDesktop: res.data.settings[0].footerIndexPromotionsDesktop,
        indexPromotionsNewArrivals: res.data.settings[0].indexPromotionsNewArrivals,
        indexSalesTopPosterDesktop: res.data.settings[0].indexSalesTopPosterDesktop,
        indexSalesMiddleImagesDesktop: res.data.settings[0].indexSalesMiddleImagesDesktop,
        indexSalesMiddlePosterDesktop: res.data.settings[0].indexSalesMiddlePosterDesktop,
        indexSalesBottomImagesDesktop: res.data.settings[0].indexSalesBottomImagesDesktop,
        indexImagesMobile: res.data.settings[0].indexImagesMobile,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateImagesSlider === true) {
      this.setState({
        fetchingSettings: true,
      });
      axios({
        method: 'get',
        url: '/settings/get-settings',
      }).then((res) => {

        this.handlers.onImagesSliderChangeHandler();

        this.setState({
          fetchingSettings: false,
          fetchedSettings: true,
          fetchingSettingsError: false,
          settings: res.data.settings,
          sliderImages: res.data.settings[0].sliderImages,
          leftIndexPromotionsDesktop: res.data.settings[0].leftIndexPromotionsDesktop,
          rightIndexPromotionsDesktop: res.data.settings[0].rightIndexPromotionsDesktop,
          footerIndexPromotionsDesktop: res.data.settings[0].footerIndexPromotionsDesktop,
          indexPromotionsNewArrivals: res.data.settings[0].indexPromotionsNewArrivals,
          indexSalesTopPosterDesktop: res.data.settings[0].indexSalesTopPosterDesktop,
          indexSalesMiddleImagesDesktop: res.data.settings[0].indexSalesMiddleImagesDesktop,
          indexSalesMiddlePosterDesktop: res.data.settings[0].indexSalesMiddlePosterDesktop,
          indexSalesBottomImagesDesktop: res.data.settings[0].indexSalesBottomImagesDesktop,
          indexImagesMobile: res.data.settings[0].indexImagesMobile,
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
  }

  onShowLoginModal = () => {
    this.handlers.onShowLoginModal();
  };

  onHideLoginModal = () => {
    this.handlers.onHideLoginModal();
  };

  render() {
    return <Home onUpload={this.onUpload}
                 login={this.props.login}
                 signup={this.props.signup}
                 fetchedSettings={this.state.fetchedSettings}
                 sliderImages={this.state.sliderImages}
                 leftIndexPromotionsDesktop={this.state.leftIndexPromotionsDesktop}
                 rightIndexPromotionsDesktop={this.state.rightIndexPromotionsDesktop}
                 footerIndexPromotionsDesktop={this.state.footerIndexPromotionsDesktop}
                 indexPromotionsNewArrivals={this.state.indexPromotionsNewArrivals}
                 indexSalesTopPosterDesktop={this.state.indexSalesTopPosterDesktop}
                 indexSalesMiddleImagesDesktop={this.state.indexSalesMiddleImagesDesktop}
                 indexSalesMiddlePosterDesktop={this.state.indexSalesMiddlePosterDesktop}
                 indexSalesBottomImagesDesktop={this.state.indexSalesBottomImagesDesktop}
                 indexImagesMobile={this.state.indexImagesMobile}
                 onShowLoginModal={this.onShowLoginModal}
                 onHideLoginModal={this.onHideLoginModal}/>;
  }
}
HomeView.propTypes = {
  login: PropTypes.shape({
    isModalVisible: PropTypes.bool,
  }),
  signup: PropTypes.shape({
    isModalVisible: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => {
  return {
    login: state.homeReducer.login,
    signup: state.homeReducer.signup,
    shouldUpdateImagesSlider: state.settingsReducer.shouldUpdateImagesSlider,
  };
};

export default connect(mapStateToProps)(HomeView);
