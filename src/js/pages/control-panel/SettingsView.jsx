import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { connect } from 'react-redux';
import {
  onShowUploadsMultipleModalAction,
  onHideUploadsMultipleModalAction,
} from './productActions.js';
import {
  onChooseImage,
  onChooseMultipleImages,
} from '../upload-modal/uploadActions.js';
import {
  onSiteNavigationChange,
  onImagesSliderChange,
  onTopPromotionalBannerChange,
} from './settingsActions.js';
import axios from 'axios';
import qs from 'qs';

import Settings from './Settings.jsx';

let createHandlers = function (dispatch) {

  let onShowUploadsMultipleModal = function () {
    dispatch(onShowUploadsMultipleModalAction());
  };

  let onHideUploadsMultipleModal = function () {
    dispatch(onHideUploadsMultipleModalAction());
  };

  let onChooseImageHandler = function (imageUrl) {
    dispatch(onChooseImage(imageUrl));
  };

  let onChooseMultipleImagesHandler = function (imageUrlsArray) {
    dispatch(onChooseMultipleImages(imageUrlsArray));
  };

  let onSiteNavigationChangeHandler = function () {
    dispatch(onSiteNavigationChange());
  };

  let onImagesSliderChangeHandler = function () {
    dispatch(onImagesSliderChange());
  };

  let onTopPromotionalBannerChangeHandler = function () {
    dispatch(onTopPromotionalBannerChange());
  };

  return {
    onShowUploadsMultipleModal,
    onHideUploadsMultipleModal,
    onChooseImageHandler,
    onChooseMultipleImagesHandler,
    onSiteNavigationChangeHandler,
    onImagesSliderChangeHandler,
    onTopPromotionalBannerChangeHandler,
  };
};

class SettingsView extends Component {
  constructor(props, context) {
    super(props, context);

    this.handlers = createHandlers(this.props.dispatch);

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
      siteNavigation: [
        {
          optionName: '',
          optionAnchor: '',
          siteNavigationColumn1: [
            {
              lineType: 'normal',
              lineText: '',
              lineAnchor: '',
            },
          ],
          siteNavigationColumn2: [
            {
              lineType: 'normal',
              lineText: '',
              lineAnchor: '',
            },
          ],
          siteNavigationColumn3: [
            {
              lineType: 'normal',
              lineText: '',
              lineAnchor: '',
            },
          ],
          siteNavigationPictures: [
            {
              imageUrl: '',
              imageCaption: '',
              imageAnchor: '',
            },
            {
              imageUrl: '',
              imageCaption: '',
              imageAnchor: '',
            },
          ],
        },
      ],
      currentOptionKey: -1,
      savedSiteNavigation: false,
      savingSiteNavigation: false,
      savingSiteNavigationError: false,
      selectingSliderImages: false,
      sliderImages: [],
      previousSliderImages: [],
      savingSliderImages: false,
      savedSliderImages: false,
      savingSliderImagesError: false,
      topPromotionalBanner: {
        promoText: '',
        promoLinkText: '',
        promoLinkAnchor: '',
      },
      savingTopPromotionalBanner: false,
      savedTopPromotionalBanner: false,
      savingTopPromotionalBannerError: false,
      indexPromotionsDesktopChoosingFor: '',
      fromIndexPromotionsDesktop: false,
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
      indexArrivalsDesktopIndex: -1,
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
      indexSalesMiddleImagesIndex: -1,
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
      indexSalesBottomImagesIndex: -1,
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
      savingIndexImagesDesktop: false,
      savedIndexImagesDesktop: false,
      savingIndexImagesDesktopError: false,
      indexImagesMobileIndex: -1,
      indexImagesMobile: [
        {
          imageUrl: '',
          imageAnchor: '',
        },
      ],
      savingIndexImagesMobile: false,
      savedIndexImagesMobile: false,
      savingIndexImagesMobileError: false,
      footerLeftColumnIndex: -1,
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
      footerCenterColumnIndex: -1,
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
      footerRightColumnIndex: -1,
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
      savingFooterColumns: false,
      savedFooterColumns: false,
      savingFooterColumnsError: false,
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
        siteNavigation: res.data.settings[0].siteNavigation.length > 0 ?
            res.data.settings[0].siteNavigation :
            this.state.siteNavigation,
        loadedPage: true,
        sliderImages: res.data.settings[0].sliderImages,
        previousSliderImages: res.data.settings[0].sliderImages,
        topPromotionalBanner: res.data.settings[0].topPromotionalBanner,
        leftIndexPromotionsDesktop: res.data.settings[0].leftIndexPromotionsDesktop,
        rightIndexPromotionsDesktop: res.data.settings[0].rightIndexPromotionsDesktop,
        footerIndexPromotionsDesktop: res.data.settings[0].footerIndexPromotionsDesktop,
        indexPromotionsNewArrivals: res.data.settings[0].indexPromotionsNewArrivals,
        indexSalesTopPosterDesktop: res.data.settings[0].indexSalesTopPosterDesktop,
        indexSalesMiddleImagesDesktop: res.data.settings[0].indexSalesMiddleImagesDesktop,
        indexSalesMiddlePosterDesktop: res.data.settings[0].indexSalesMiddlePosterDesktop,
        indexSalesBottomImagesDesktop: res.data.settings[0].indexSalesBottomImagesDesktop,
        indexImagesMobile: res.data.settings[0].indexImagesMobile,
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

  onTopBannerPromoTextChange = (e) => {
    this.setState({
      topPromotionalBanner: {
        ...this.state.topPromotionalBanner,
        promoText: e.target.value,
      },
    });
  };

  onTopBannerPromoLinkTextChange = (e) => {
    this.setState({
      topPromotionalBanner: {
        ...this.state.topPromotionalBanner,
        promoLinkText: e.target.value,
      },
    });
  };

  onTopBannerPromoLinkAnchorChange = (e) => {
    this.setState({
      topPromotionalBanner: {
        ...this.state.topPromotionalBanner,
        promoLinkAnchor: e.target.value,
      },
    });
  };

  onChangeSelectingSliderImages = () => {
    if (this.state.selectingSliderImages === false) {
      this.setState({
        sliderImages: [],
      });
    }
    this.setState({
      selectingSliderImages: !this.state.selectingSliderImages,
    });
  };

  onSelectSliderImages = (value) => {

    let restoreFlag = true;

    if (value && value.length > 0) {
      const newSliderImages = value.map((image) => {
        return {
          imageUrl: image,
          imageAnchor: '',
        };
      });

      this.setState({
        sliderImages: newSliderImages,
      });

    }

    // In case no image is selected, we need to restore the previous state
    if (value)
      for (let i = 0; i < value.length; i++) {
        if (value[i])
          restoreFlag = false;
      } else this.setState({
      sliderImages: this.state.previousSliderImages,
    });

    if (restoreFlag)
      this.setState({
        sliderImages: this.state.previousSliderImages,
      });
  };

  onSlideImageCaptionChange = (i) => (e) => {
    const newSliderImages = this.state.sliderImages.map(
        (image, k) => {
          if (i !== k) return image;
          return {
            ...image,
            imageAnchor: e.target.value,
          };
        });
    this.setState({
      sliderImages: newSliderImages,
    });
  };

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

  addSiteNavigationOption = () => {
    const panes = this.state.siteNavigation;
    panes.push({
          optionName: '',
          optionAnchor: '',
          siteNavigationColumn1: [
            {
              lineType: 'normal',
              lineText: '',
              lineAnchor: '',
            },
          ],
          siteNavigationColumn2: [
            {
              lineType: 'normal',
              lineText: '',
              lineAnchor: '',
            },
          ],
          siteNavigationColumn3: [
            {
              lineType: 'normal',
              lineText: '',
              lineAnchor: '',
            },
          ],
          siteNavigationPictures: [
            {
              imageUrl: '',
              imageCaption: '',
              imageAnchor: '',
            },
            {
              imageUrl: '',
              imageCaption: '',
              imageAnchor: '',
            },
          ],
        },
    );
    this.setState({
      siteNavigation: panes,
    });
  };

  removeSiteNavigationOption = (i) => () => {
    this.setState({
      siteNavigation: this.state.siteNavigation.filter((s, j) => i !== j),
    });
  };

  onOptionNameChange = (i) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, j) => {
      if (i !== j) return option;
      return { ...option, optionName: e.target.value };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onOptionAnchorChange = (i) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, j) => {
      if (i !== j) return option;
      return { ...option, optionAnchor: e.target.value };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineTextChange1 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn1: option.siteNavigationColumn1.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineText: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineAnchorChange1 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn1: option.siteNavigationColumn1.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineAnchor: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineTypeChange1 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn1: option.siteNavigationColumn1.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineType: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  addLineColumn1 = (i) => () => {
    const newSiteNavigation = this.state.siteNavigation.map((option, j) => {
      if (i !== j) return option;
      return {
        ...option,
        siteNavigationColumn1: option.siteNavigationColumn1.concat({
          lineType: 'normal',
          lineText: '',
          lineAnchor: '',
        }),
      };
    });

    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  deleteLineColumn1 = (i, j) => () => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option,
        siteNavigationColumn1: option.siteNavigationColumn1.filter(
            (s, l) => j !== l),
      };
    });

    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineTextChange2 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn2: option.siteNavigationColumn2.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineText: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineAnchorChange2 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn2: option.siteNavigationColumn2.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineAnchor: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineTypeChange2 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn2: option.siteNavigationColumn2.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineType: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  addLineColumn2 = (i) => () => {
    const newSiteNavigation = this.state.siteNavigation.map((option, j) => {
      if (i !== j) return option;
      return {
        ...option,
        siteNavigationColumn2: option.siteNavigationColumn2.concat({
          lineType: 'normal',
          lineText: '',
          lineAnchor: '',
        }),
      };
    });

    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  deleteLineColumn2 = (i, j) => () => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option,
        siteNavigationColumn2: option.siteNavigationColumn2.filter(
            (s, l) => j !== l),
      };
    });

    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineTextChange3 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn3: option.siteNavigationColumn3.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineText: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineAnchorChange3 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn3: option.siteNavigationColumn3.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineAnchor: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onLineTypeChange3 = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option, siteNavigationColumn3: option.siteNavigationColumn3.map(
            (line, index) => {
              if (j !== index)
                return line;
              return { ...line, lineType: e.target.value };
            }),
      };
    });
    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  addLineColumn3 = (i) => () => {
    const newSiteNavigation = this.state.siteNavigation.map((option, j) => {
      if (i !== j) return option;
      return {
        ...option,
        siteNavigationColumn3: option.siteNavigationColumn3.concat({
          lineType: 'normal',
          lineText: '',
          lineAnchor: '',
        }),
      };
    });

    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  deleteLineColumn3 = (i, j) => () => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option,
        siteNavigationColumn3: option.siteNavigationColumn3.filter(
            (s, l) => j !== l),
      };
    });

    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  getCurrentOptionKey = (i) => {
    this.setState({
      currentOptionKey: i,
    });
  };

  addPicturesToColumn = (value) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, j) => {
      if (this.state.currentOptionKey !== j) return option;
      return {
        ...option,
        siteNavigationPictures: option.siteNavigationPictures.map(
            (picture, l) => {
              if (l < 2)
                return {
                  ...picture,
                  imageUrl: value[l],
                };
            }),
      };
    });

    this.setState({
      imageUrlsArray: [],
      siteNavigation: newSiteNavigation,
    });
  };

  onPictureCaptionChange = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option,
        siteNavigationPictures: option.siteNavigationPictures.map(
            (picture, l) => {
              if (j !== l) return picture;
              return {
                ...picture,
                imageCaption: e.target.value,
              };
            }),
      };
    });

    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onPictureAnchorChange = (i, j) => (e) => {
    const newSiteNavigation = this.state.siteNavigation.map((option, k) => {
      if (i !== k) return option;
      return {
        ...option,
        siteNavigationPictures: option.siteNavigationPictures.map(
            (picture, l) => {
              if (j !== l) return picture;
              return {
                ...picture,
                imageAnchor: e.target.value,
              };
            }),
      };
    });

    this.setState({
      siteNavigation: newSiteNavigation,
    });
  };

  onIndexPromotionsDesktopChoosingForChange = (value) => {
    this.setState({
      fromIndexPromotionsDesktop: true,
      indexPromotionsDesktopChoosingFor: value,
    });
  };

  onIndexArrivalsDesktopIndexChange = (index) => {
    this.setState({
      indexArrivalsDesktopIndex: index,
    });
  };

  onIndexSalesMiddleImagesDesktopIndexChange = (index) => {
    this.setState({
      indexSalesMiddleImagesIndex: index,
    });
  };

  onIndexSalesBottomImagesDesktopIndexChange = (index) => {
    this.setState({
      indexSalesBottomImagesIndex: index,
    });
  };

  onIndexMobileImagesIndexChange = (index) => {
    this.setState({
      indexImagesMobileIndex: index,
    });
  };

  onFooterLeftColumnIndexChange = (index) => {
    this.setState({
      footerLeftColumnIndex: index,
    });
  };

  onFooterCenterColumnIndexChange = (index) => {
    this.setState({
      footerCenterColumnIndex: index,
    });
  };

  onFooterRightColumnIndexChange = (index) => {
    this.setState({
      footerRightColumnIndex: index,
    });
  };

  onIndexPromotionsDesktopChooseOne = (imageUrl) => {
    if (this.state.indexPromotionsDesktopChoosingFor === 'left') {
      this.setState({
        leftIndexPromotionsDesktop: {
          ...this.state.leftIndexPromotionsDesktop,
          imageUrl: imageUrl,
        },
        indexPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
      this.handlers.onChooseImageHandler('');
    } else if (this.state.indexPromotionsDesktopChoosingFor === 'right') {
      this.setState({
        rightIndexPromotionsDesktop: {
          ...this.state.rightIndexPromotionsDesktop,
          imageUrl: imageUrl,
        },
        indexPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
      this.handlers.onChooseImageHandler('');
    } else if (this.state.indexPromotionsDesktopChoosingFor === 'footer') {
      this.setState({
        footerIndexPromotionsDesktop: {
          ...this.state.footerIndexPromotionsDesktop,
          imageUrl: imageUrl,
        },
        indexPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
      this.handlers.onChooseImageHandler('');
    } else if (this.state.indexPromotionsDesktopChoosingFor === 'arrivals' &&
        this.state.indexArrivalsDesktopIndex !== -1) {
      let newIndexArrivals = this.state.indexPromotionsNewArrivals;
      newIndexArrivals[this.state.indexArrivalsDesktopIndex].imageUrl = imageUrl;
      this.setState({
        indexPromotionsNewArrivals: newIndexArrivals,
        indexArrivalsDesktopIndex: -1,
        indexPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
    } else if (this.state.indexPromotionsDesktopChoosingFor ===
        'salesPosterTop') {
      this.setState({
        indexSalesTopPosterDesktop: {
          ...this.state.indexSalesTopPosterDesktop,
          imageUrl: imageUrl,
        },
        indexPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
    } else if (this.state.indexPromotionsDesktopChoosingFor === 'salesMiddle' &&
        this.state.indexSalesMiddleImagesIndex !== -1) {
      let newIndexSalesMiddle = this.state.indexSalesMiddleImagesDesktop;
      newIndexSalesMiddle[this.state.indexSalesMiddleImagesIndex].imageUrl = imageUrl;
      this.setState({
        indexSalesMiddleImagesDesktop: newIndexSalesMiddle,
        indexSalesMiddleImagesIndex: -1,
        indexPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
    } else if (this.state.indexPromotionsDesktopChoosingFor ===
        'salesPosterMiddle') {
      this.setState({
        indexSalesMiddlePosterDesktop: {
          ...this.state.indexSalesMiddlePosterDesktop,
          imageUrl: imageUrl,
        },
        fromPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
    } else if (this.state.indexPromotionsDesktopChoosingFor === 'salesBottom' &&
        this.state.indexSalesBottomImagesIndex !== -1) {
      let newIndexSalesBottom = this.state.indexSalesBottomImagesDesktop;
      newIndexSalesBottom[this.state.indexSalesBottomImagesIndex].imageUrl = imageUrl;
      this.setState({
        indexSalesBottomImagesDesktop: newIndexSalesBottom,
        indexSalesBottomImagesIndex: -1,
        indexPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
    } else if (this.state.indexPromotionsDesktopChoosingFor === 'mobile' &&
        this.state.indexImagesMobileIndex !== -1) {
      let newIndexImagesMobile = this.state.indexImagesMobile;
      newIndexImagesMobile[this.state.indexImagesMobileIndex].imageUrl = imageUrl;
      this.setState({
        indexImagesMobile: newIndexImagesMobile,
        indexImagesMobileIndex: -1,
        indexPromotionsDesktopChoosingFor: '',
        fromIndexPromotionsDesktop: false,
      });
    }
  };

  onLeftIndexPromotionsDesktopImageAnchorChange = (e) => {
    this.setState({
      leftIndexPromotionsDesktop: {
        ...this.state.leftIndexPromotionsDesktop,
        imageAnchor: e.target.value,
      },
    });
  };

  onRightIndexPromotionsDesktopImageAnchorChange = (e) => {
    this.setState({
      rightIndexPromotionsDesktop: {
        ...this.state.rightIndexPromotionsDesktop,
        imageAnchor: e.target.value,
      },
    });
  };

  onFooterIndexPromotionsDesktopImageAnchorChange = (e) => {
    this.setState({
      footerIndexPromotionsDesktop: {
        ...this.state.footerIndexPromotionsDesktop,
        imageAnchor: e.target.value,
      },
    });
  };

  onArrivalsIndexPromotionsDesktopImageAnchorChange = (e) => {
    let newIndexArrivals = this.state.indexPromotionsNewArrivals;
    newIndexArrivals[this.state.indexArrivalsDesktopIndex].imageAnchor = e.target.value;

    this.setState({
      indexPromotionsNewArrivals: newIndexArrivals,
    });
  };

  onSalesIndexDesktopTopPosterAnchorChange = (e) => {
    this.setState({
      indexSalesTopPosterDesktop: {
        ...this.state.indexSalesTopPosterDesktop,
        imageAnchor: e.target.value,
      },
    });
  };

  onSalesIndexDesktopMiddleImagesAnchorChange = (e) => {
    let newSalesMiddleImages = this.state.indexSalesMiddleImagesDesktop;
    newSalesMiddleImages[this.state.indexSalesMiddleImagesIndex].imageAnchor = e.target.value;

    this.setState({
      indexSalesMiddleImagesDesktop: newSalesMiddleImages,
    });
  };

  onSalesIndexDesktopMiddlePosterAnchorChange = (e) => {
    this.setState({
      indexSalesMiddlePosterDesktop: {
        ...this.state.indexSalesMiddlePosterDesktop,
        imageAnchor: e.target.value,
      },
    });
  };

  onSalesIndexDesktopBottomImagesAnchorChange = (e) => {
    let newSalesBottomImages = this.state.indexSalesBottomImagesDesktop;
    newSalesBottomImages[this.state.indexSalesBottomImagesIndex].imageAnchor = e.target.value;

    this.setState({
      indexSalesBottomImagesDesktop: newSalesBottomImages,
    });
  };

  onAddIndexImagesMobile = (i) => () => {
    const currentImages = this.state.indexImagesMobile;
    let length = currentImages.length;

    if (length === 1 || i === length - 1) {
      currentImages.push({
        imageUrl: '',
        imageAnchor: '',
      });
    } else {
      for (let j = length; j > i + 1; j--) {
        currentImages[j] = currentImages[j - 1];
      }
      currentImages[i + 1] = {
        imageUrl: '',
        imageAnchor: '',
      };
    }

    this.setState({
      indexImagesMobile: currentImages,
    });
  };

  onRemoveIndexImagesMobile = (i) => () => {
    this.setState({
      indexImagesMobile: this.state.indexImagesMobile.filter((s, j) => i !== j),
    });
  };

  onIndexMobileImageAnchorChange = (e) => {
    let newIndexImagesMobile = this.state.indexImagesMobile;
    newIndexImagesMobile[this.state.indexImagesMobileIndex].imageAnchor = e.target.value;

    this.setState({
      indexImagesMobile: newIndexImagesMobile,
    });
  };

  onAddFooterLeftColumnLine = (i) => () => {
    const currentColumn = this.state.footerLeftColumn;
    let length = currentColumn.length;

    if (length <= 2 || i === length - 1) {
      currentColumn.push({
        lineType: 'normal',
        lineText: '',
        lineAnchor: '',
      });
    } else {
      for (let j = length; j > i + 1; j--) {
        currentColumn[j] = currentColumn[j - 1];
      }
      currentColumn[i + 1] = {
        lineType: 'normal',
        lineText: '',
        lineAnchor: '',
      };
    }

    this.setState({
      footerLeftColumn: currentColumn,
    });
  };

  onRemoveFooterLeftColumnLine = (i) => () => {
    this.setState({
      footerLeftColumn: this.state.footerLeftColumn.filter((s, j) => i !== j),
    });
  };

  onFooterLeftColumnLineTextChange = (e) => {
    let newFooterLeftColumn = this.state.footerLeftColumn;
    newFooterLeftColumn[this.state.footerLeftColumnIndex].lineText = e.target.value;

    this.setState({
      footerLeftColumn: newFooterLeftColumn,
    });
  };

  onFooterLeftColumnLineAnchorChange = (e) => {
    let newFooterLeftColumn = this.state.footerLeftColumn;
    newFooterLeftColumn[this.state.footerLeftColumnIndex].lineAnchor = e.target.value;

    this.setState({
      footerLeftColumn: newFooterLeftColumn,
    });
  };

  onAddFooterCenterColumnLine = (i) => () => {
    const currentColumn = this.state.footerCenterColumn;
    let length = currentColumn.length;

    if (length <= 2 || i === length - 1) {
      currentColumn.push({
        lineType: 'normal',
        lineText: '',
        lineAnchor: '',
      });
    } else {
      for (let j = length; j > i + 1; j--) {
        currentColumn[j] = currentColumn[j - 1];
      }
      currentColumn[i + 1] = {
        lineType: 'normal',
        lineText: '',
        lineAnchor: '',
      };
    }

    this.setState({
      footerCenterColumn: currentColumn,
    });
  };

  onRemoveFooterCenterColumnLine = (i) => () => {
    this.setState({
      footerCenterColumn: this.state.footerCenterColumn.filter(
          (s, j) => i !== j),
    });
  };

  onFooterCenterColumnLineTextChange = (e) => {
    let newFooterCenterColumn = this.state.footerCenterColumn;
    newFooterCenterColumn[this.state.footerCenterColumnIndex].lineText = e.target.value;

    this.setState({
      footerCenterColumn: newFooterCenterColumn,
    });
  };

  onFooterCenterColumnLineAnchorChange = (e) => {
    let newFooterCenterColumn = this.state.footerCenterColumn;
    newFooterCenterColumn[this.state.footerCenterColumnIndex].lineAnchor = e.target.value;

    this.setState({
      footerCenterColumn: newFooterCenterColumn,
    });
  };

  onAddFooterRightColumnLine = (i) => () => {
    const currentColumn = this.state.footerRightColumn;
    let length = currentColumn.length;

    if (length <= 2 || i === length - 1) {
      currentColumn.push({
        lineType: 'normal',
        lineText: '',
        lineAnchor: '',
      });
    } else {
      for (let j = length; j > i + 1; j--) {
        currentColumn[j] = currentColumn[j - 1];
      }
      currentColumn[i + 1] = {
        lineType: 'normal',
        lineText: '',
        lineAnchor: '',
      };
    }

    this.setState({
      footerRightColumn: currentColumn,
    });
  };

  onRemoveFooterRightColumnLine = (i) => () => {
    this.setState({
      footerRightColumn: this.state.footerRightColumn.filter(
          (s, j) => i !== j),
    });
  };

  onFooterRightColumnLineTextChange = (e) => {
    let newFooterRightColumn = this.state.footerRightColumn;
    newFooterRightColumn[this.state.footerRightColumnIndex].lineText = e.target.value;

    this.setState({
      footerRightColumn: newFooterRightColumn,
    });
  };

  onFooterRightColumnLineAnchorChange = (e) => {
    let newFooterRightColumn = this.state.footerRightColumn;
    newFooterRightColumn[this.state.footerRightColumnIndex].lineAnchor = e.target.value;

    this.setState({
      footerRightColumn: newFooterRightColumn,
    });
  };

  onSaveGeneralSettings = () => {
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
        duration: 30,
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

  onSaveSiteNavigation = () => {
    this.setState({
      savingSiteNavigation: true,
    });
    axios({
      method: 'post',
      url: '/settings/update-site-navigation',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        siteNavigation: JSON.stringify(this.state.siteNavigation),
      }),
    }).then(() => {

      this.handlers.onSiteNavigationChangeHandler();

      notification.success({
        message: 'Success!',
        description: 'The site navigation has been successfully updated.',
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
          siteNavigation: res.data.settings[0].siteNavigation.length > 0 ?
              res.data.settings[0].siteNavigation :
              this.state.siteNavigation,
          sliderImages: res.data.settings[0].sliderImages,
          previousSliderImages: res.data.settings[0].sliderImages,
          topPromotionalBanner: res.data.settings[0].topPromotionalBanner,
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
        savingSiteNavigation: false,
        savedSiteNavigation: true,
        savingSiteNavigationError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'An error has occurred while saving the settings.',
      });

      this.setState({
        savingSiteNavigation: false,
        savedSiteNavigation: false,
        savingSiteNavigationError: true,
      });
    });
  };

  onSaveSliderImages = () => {
    this.setState({
      savingSliderImages: true,
    });
    axios({
      method: 'post',
      url: '/settings/update-site-slider',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        sliderImages: JSON.stringify(this.state.sliderImages),
      }),
    }).then(() => {

      this.handlers.onImagesSliderChangeHandler();

      notification.success({
        message: 'Success!',
        description: 'The homepage slider has been successfully updated.',
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
          siteNavigation: res.data.settings[0].siteNavigation.length > 0 ?
              res.data.settings[0].siteNavigation :
              this.state.siteNavigation,
          sliderImages: res.data.settings[0].sliderImages,
          previousSliderImages: res.data.settings[0].sliderImages,
          topPromotionalBanner: res.data.settings[0].topPromotionalBanner,
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
        savingSliderImages: false,
        savedSliderImages: true,
        savingSliderImagesError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'An error has occurred while saving the settings.',
      });

      this.setState({
        savingSliderImages: false,
        savedSliderImages: false,
        savingSliderImagesError: true,
      });
    });
  };

  onSaveTopPromotionalBanner = () => {
    this.setState({
      savingTopPromotionalBanner: true,
    });
    axios({
      method: 'post',
      url: '/settings/update-top-promotional-banner',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        topPromotionalBanner: JSON.stringify(this.state.topPromotionalBanner),
      }),
    }).then(() => {

      this.handlers.onTopPromotionalBannerChangeHandler();

      notification.success({
        message: 'Success!',
        description: 'The top promotional banner has been updated.',
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
          siteNavigation: res.data.settings[0].siteNavigation.length > 0 ?
              res.data.settings[0].siteNavigation :
              this.state.siteNavigation,
          sliderImages: res.data.settings[0].sliderImages,
          previousSliderImages: res.data.settings[0].sliderImages,
          topPromotionalBanner: res.data.settings[0].topPromotionalBanner,
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
        savingTopPromotionalBanner: false,
        savedTopPromotionalBanner: true,
        savingTopPromotionalBannerError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'An error has occurred while saving the settings.',
      });

      this.setState({
        savingTopPromotionalBanner: false,
        savedTopPromotionalBanner: false,
        savingTopPromotionalBannerError: true,
      });
    });
  };

  onSaveIndexImagesDesktop = () => {
    this.setState({
      savingIndexImagesDesktop: true,
    });
    axios({
      method: 'post',
      url: '/settings/update-index-images-desktop',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        leftIndexPromotionsDesktop: JSON.stringify(
            this.state.leftIndexPromotionsDesktop),
        rightIndexPromotionsDesktop: JSON.stringify(
            this.state.rightIndexPromotionsDesktop),
        footerIndexPromotionsDesktop: JSON.stringify(
            this.state.footerIndexPromotionsDesktop),
        indexPromotionsNewArrivals: JSON.stringify(
            this.state.indexPromotionsNewArrivals),
        indexSalesTopPosterDesktop: JSON.stringify(
            this.state.indexSalesTopPosterDesktop),
        indexSalesMiddleImagesDesktop: JSON.stringify(
            this.state.indexSalesMiddleImagesDesktop),
        indexSalesMiddlePosterDesktop: JSON.stringify(
            this.state.indexSalesMiddlePosterDesktop),
        indexSalesBottomImagesDesktop: JSON.stringify(
            this.state.indexSalesBottomImagesDesktop),
      }),
    }).then(() => {
      notification.success({
        message: 'Success!',
        description: 'The front page has been updated.',
      });

      this.setState({
        savingIndexImagesDesktop: false,
        savedIndexImagesDesktop: true,
        savingIndexImagesDesktopError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'An error has occurred while saving the settings.',
      });

      this.setState({
        savingIndexImagesDesktop: false,
        savedIndexImagesDesktop: false,
        savingIndexImagesDesktopError: true,
      });

    });
  };

  onSaveIndexImagesMobile = () => {
    this.setState({
      savingIndexImagesMobile: true,
    });
    axios({
      method: 'post',
      url: '/settings/update-index-images-mobile',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        indexImagesMobile: JSON.stringify(this.state.indexImagesMobile),
      }),
    }).then(() => {
      notification.success({
        message: 'Success!',
        description: 'The front page for mobile has been updated.',
      });

      this.setState({
        savingIndexImagesMobile: false,
        savedIndexImagesMobile: true,
        savingIndexImagesMobileError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'An error has occurred while saving the settings.',
      });

      this.setState({
        savingIndexImagesMobile: false,
        savedIndexImagesMobile: false,
        savingIndexImagesMobileError: true,
      });
    });
  };

  onSaveFooterColumns = () => {
    this.setState({
      savingFooterColumns: true,
    });
    axios({
      method: 'post',
      url: '/settings/update-footer',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        footerLeftColumn: JSON.stringify(this.state.footerLeftColumn),
        footerCenterColumn: JSON.stringify(this.state.footerCenterColumn),
        footerRightColumn: JSON.stringify(this.state.footerRightColumn),
      }),
    }).then(() => {
      notification.success({
        message: 'Success!',
        description: 'The footer has been updated.',
      });

      this.setState({
        savingFooterColumns: false,
        savedFooterColumns: true,
        savingFooterColumnsError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'An error has occurred while saving the settings.',
      });

      this.setState({
        savingFooterColumns: false,
        savedFooterColumns: false,
        savingFooterColumnsError: true,
      });
    });
  };

  onShowUploadsMultipleModal = () => {
    this.handlers.onShowUploadsMultipleModal();
  };

  onHideUploadsMultipleModal = () => {
    this.handlers.onHideUploadsMultipleModal();
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
                     siteNavigation={this.state.siteNavigation}
                     savedSiteNavigation={this.state.savedSiteNavigation}
                     savingSiteNavigation={this.state.savingSiteNavigation}
                     savingSiteNavigationError={this.state.savingSiteNavigationError}
                     currencyData={this.currencyData}
                     isModalVisibleMultiple={this.props.isModalVisibleMultiple}
                     selectingSliderImages={this.state.selectingSliderImages}
                     topPromotionalBanner={this.state.topPromotionalBanner}
                     sliderImages={this.state.sliderImages}
                     indexPromotionsDesktopChoosingFor={this.state.indexPromotionsDesktopChoosingFor}
                     fromIndexPromotionsDesktop={this.state.fromIndexPromotionsDesktop}
                     leftIndexPromotionsDesktop={this.state.leftIndexPromotionsDesktop}
                     rightIndexPromotionsDesktop={this.state.rightIndexPromotionsDesktop}
                     footerIndexPromotionsDesktop={this.state.footerIndexPromotionsDesktop}
                     indexPromotionsNewArrivals={this.state.indexPromotionsNewArrivals}
                     indexSalesTopPosterDesktop={this.state.indexSalesTopPosterDesktop}
                     indexSalesMiddleImagesIndex={this.state.indexSalesMiddleImagesIndex}
                     indexSalesMiddleImagesDesktop={this.state.indexSalesMiddleImagesDesktop}
                     indexSalesMiddlePosterDesktop={this.state.indexSalesMiddlePosterDesktop}
                     indexSalesBottomImagesIndex={this.state.indexSalesBottomImagesIndex}
                     indexSalesBottomImagesDesktop={this.state.indexSalesBottomImagesDesktop}
                     savingIndexImagesDesktop={this.state.savingIndexImagesDesktop}
                     indexImagesMobile={this.state.indexImagesMobile}
                     footerLeftColumn={this.state.footerLeftColumn}
                     footerCenterColumn={this.state.footerCenterColumn}
                     footerRightColumn={this.state.footerRightColumn}
                     onTopBannerPromoTextChange={this.onTopBannerPromoTextChange}
                     onTopBannerPromoLinkTextChange={this.onTopBannerPromoLinkTextChange}
                     onTopBannerPromoLinkAnchorChange={this.onTopBannerPromoLinkAnchorChange}
                     onChangeSelectingSliderImages={this.onChangeSelectingSliderImages}
                     onSelectSliderImages={this.onSelectSliderImages}
                     onSlideImageCaptionChange={this.onSlideImageCaptionChange}
                     onCurrencyChange={this.onCurrencyChange}
                     addSiteNavigationOption={this.addSiteNavigationOption}
                     removeSiteNavigationOption={this.removeSiteNavigationOption}
                     onOptionNameChange={this.onOptionNameChange}
                     onOptionAnchorChange={this.onOptionAnchorChange}
                     onLineTextChange1={this.onLineTextChange1}
                     onLineAnchorChange1={this.onLineAnchorChange1}
                     onLineTypeChange1={this.onLineTypeChange1}
                     addLineColumn1={this.addLineColumn1}
                     deleteLineColumn1={this.deleteLineColumn1}
                     onLineTextChange2={this.onLineTextChange2}
                     onLineAnchorChange2={this.onLineAnchorChange2}
                     onLineTypeChange2={this.onLineTypeChange2}
                     addLineColumn2={this.addLineColumn2}
                     deleteLineColumn2={this.deleteLineColumn2}
                     onLineTextChange3={this.onLineTextChange3}
                     onLineAnchorChange3={this.onLineAnchorChange3}
                     onLineTypeChange3={this.onLineTypeChange3}
                     addLineColumn3={this.addLineColumn3}
                     deleteLineColumn3={this.deleteLineColumn3}
                     getCurrentOptionKey={this.getCurrentOptionKey}
                     addPicturesToColumn={this.addPicturesToColumn}
                     onPictureCaptionChange={this.onPictureCaptionChange}
                     onPictureAnchorChange={this.onPictureAnchorChange}
                     onFooterLeftColumnIndexChange={this.onFooterLeftColumnIndexChange}
                     onFooterCenterColumnIndexChange={this.onFooterCenterColumnIndexChange}
                     onFooterRightColumnIndexChange={this.onFooterRightColumnIndexChange}
                     onIndexPromotionsDesktopChoosingForChange={this.onIndexPromotionsDesktopChoosingForChange}
                     onIndexArrivalsDesktopIndexChange={this.onIndexArrivalsDesktopIndexChange}
                     onIndexSalesMiddleImagesDesktopIndexChange={this.onIndexSalesMiddleImagesDesktopIndexChange}
                     onIndexSalesBottomImagesDesktopIndexChange={this.onIndexSalesBottomImagesDesktopIndexChange}
                     onIndexMobileImagesIndexChange={this.onIndexMobileImagesIndexChange}
                     onIndexPromotionsDesktopChooseOne={this.onIndexPromotionsDesktopChooseOne}
                     onLeftIndexPromotionsDesktopImageAnchorChange={this.onLeftIndexPromotionsDesktopImageAnchorChange}
                     onRightIndexPromotionsDesktopImageAnchorChange={this.onRightIndexPromotionsDesktopImageAnchorChange}
                     onFooterIndexPromotionsDesktopImageAnchorChange={this.onFooterIndexPromotionsDesktopImageAnchorChange}
                     onArrivalsIndexPromotionsDesktopImageAnchorChange={this.onArrivalsIndexPromotionsDesktopImageAnchorChange}
                     onSalesIndexDesktopTopPosterAnchorChange={this.onSalesIndexDesktopTopPosterAnchorChange}
                     onSalesIndexDesktopMiddleImagesAnchorChange={this.onSalesIndexDesktopMiddleImagesAnchorChange}
                     onSalesIndexDesktopMiddlePosterAnchorChange={this.onSalesIndexDesktopMiddlePosterAnchorChange}
                     onSalesIndexDesktopBottomImagesAnchorChange={this.onSalesIndexDesktopBottomImagesAnchorChange}
                     onAddIndexImagesMobile={this.onAddIndexImagesMobile}
                     onRemoveIndexImagesMobile={this.onRemoveIndexImagesMobile}
                     onIndexMobileImageAnchorChange={this.onIndexMobileImageAnchorChange}
                     onAddFooterLeftColumnLine={this.onAddFooterLeftColumnLine}
                     onRemoveFooterLeftColumnLine={this.onRemoveFooterLeftColumnLine}
                     onFooterLeftColumnLineTextChange={this.onFooterLeftColumnLineTextChange}
                     onFooterLeftColumnLineAnchorChange={this.onFooterLeftColumnLineAnchorChange}
                     onAddFooterCenterColumnLine={this.onAddFooterCenterColumnLine}
                     onRemoveFooterCenterColumnLine={this.onRemoveFooterCenterColumnLine}
                     onFooterCenterColumnLineTextChange={this.onFooterCenterColumnLineTextChange}
                     onFooterCenterColumnLineAnchorChange={this.onFooterCenterColumnLineAnchorChange}
                     onAddFooterRightColumnLine={this.onAddFooterRightColumnLine}
                     onRemoveFooterRightColumnLine={this.onRemoveFooterRightColumnLine}
                     onFooterRightColumnLineTextChange={this.onFooterRightColumnLineTextChange}
                     onFooterRightColumnLineAnchorChange={this.onFooterRightColumnLineAnchorChange}
                     onSaveGeneralSettings={this.onSaveGeneralSettings}
                     onResetDefault={this.onResetDefault}
                     onSaveSiteNavigation={this.onSaveSiteNavigation}
                     onSaveSliderImages={this.onSaveSliderImages}
                     onSaveTopPromotionalBanner={this.onSaveTopPromotionalBanner}
                     onSaveIndexImagesDesktop={this.onSaveIndexImagesDesktop}
                     onSaveIndexImagesMobile={this.onSaveIndexImagesMobile}
                     onSaveFooterColumns={this.onSaveFooterColumns}
                     onShowUploadsMultipleModal={this.onShowUploadsMultipleModal}
                     onHideUploadsMultipleModal={this.onHideUploadsMultipleModal}/>;
  }
}

SettingsView.propTypes = {
  isModalVisibleMultiple: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isModalVisibleMultiple: state.productReducer.isModalVisible,
  };
};

export default connect(mapStateToProps)(SettingsView);
