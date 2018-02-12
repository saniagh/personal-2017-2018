import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { connect } from 'react-redux';
import {
  onShowUploadsMultipleModalAction,
  onHideUploadsMultipleModalAction,
} from './productActions.js';
import {
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
                     onSaveGeneralSettings={this.onSaveGeneralSettings}
                     onResetDefault={this.onResetDefault}
                     onSaveSiteNavigation={this.onSaveSiteNavigation}
                     onSaveSliderImages={this.onSaveSliderImages}
                     onSaveTopPromotionalBanner={this.onSaveTopPromotionalBanner}
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
