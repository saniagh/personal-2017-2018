import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification } from 'antd';
import axios from 'axios';
import qs from 'qs';
import RegularSalePage from './RegularSalePage.jsx';
import {
  onSiteNavigationChange,
} from '../control-panel/settingsActions.js';

let createHandlers = function (dispatch) {
  let onSiteNavigationChangeHandler = function () {
    dispatch(onSiteNavigationChange());
  };

  return {
    onSiteNavigationChangeHandler,
  };
};

class RegularSalePageView extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      fetchingCategories: false,
      fetchedCategories: false,
      fetchingCategoriesError: false,
      categories: [],
      fetchingProducts: false,
      fetchedProducts: false,
      fetchingProductsError: false,
      products: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      siteNavigation: [],
      currency: [],
      fetchingTags: false,
      fetchedTags: false,
      fetchingTagsError: false,
      tags: [],
      sortBy: 'featured',
    };
  }

  changeSortByStatus = (value) => {
    this.setState({
      sortBy: value,
    });

    if (value === 'featured') {
      let newProducts = [];
      for (let i = 0; i < this.state.products.length; i++) {
        if (this.state.products[i].productFeatured === true)
          newProducts.push(this.state.products[i]);
      }

      for (let i = 0; i < this.state.products.length; i++) {
        if (this.state.products[i].productFeatured === false)
          newProducts.push(this.state.products[i]);
      }

      this.setState({
        products: newProducts,
      });
    }

    if (value === 'onsale') {
      let newProducts = [];
      for (let i = 0; i < this.state.products.length; i++) {
        if (this.state.products[i].salePrice)
          newProducts.push(this.state.products[i]);
      }

      for (let i = 0; i < this.state.products.length; i++) {
        if (!this.state.products[i].salePrice)
          newProducts.push(this.state.products[i]);
      }

      this.setState({
        products: newProducts,
      });
    }

    if (value === 'lowhigh') {
      let newProducts = this.state.products;
      newProducts.sort((a, b) => {
        return a.productPrice - b.productPrice;
      });
      newProducts.sort((a, b) => {
        if (a.salePrice && b.salePrice)
          return a.salePrice - b.salePrice;
      });

      this.setState({
        products: newProducts,
      });
    }

    if (value === 'highlow') {
      let newProducts = this.state.products;
      newProducts.sort((a, b) => {
        return a.productPrice - b.productPrice;
      });
      newProducts.sort((a, b) => {
        if (a.salePrice && b.salePrice)
          return a.salePrice - b.salePrice;
      });

      this.setState({
        products: newProducts.reverse(),
      });
    }

  };

  componentDidMount() {
    this.setState({
      fetchingCategories: true,
      fetchingProducts: true,
      fetchingSettings: true,
      fetchingTags: true,
    });
    axios({
      method: 'get',
      url: '/products-categories/get-categories',
    }).then((res) => {
      this.setState({
        fetchingCategories: false,
        fetchedCategories: true,
        fetchingCategoriesError: false,
        categories: res.data.categories,
      });
    }).catch(() => {

      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred. Please reload.',
      });

      this.setState({
        fetchingCategories: false,
        fetchedCategories: false,
        fetchingCategoriesError: true,
      });
    });

    if (this.props.match.params.searchTerm) {
      // This will search all products that have either
      // a name like searchTerm, a tag, or a category
      const searchTerm = this.props.match.params.searchTerm.replace('%', ' ');

      this.setState({
        searchTerm: searchTerm,
      });

      axios({
        method: 'post',
        url: '/product/get-products-regular-sale',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          searchTerm: searchTerm,
        }),
      }).then((res) => {

        if (this.state.sortBy === 'featured') {
          let newProducts = [];
          for (let i = 0; i < res.data.products.length; i++) {
            if (res.data.products[i].productFeatured === true)
              newProducts.push(res.data.products[i]);
          }

          for (let i = 0; i < res.data.products.length; i++) {
            if (res.data.products[i].productFeatured === false)
              newProducts.push(res.data.products[i]);
          }

          this.setState({
            fetchingProducts: false,
            fetchedProducts: true,
            fetchingProductsError: false,
            products: newProducts,
          });
        } else {
          this.setState({
            fetchingProducts: false,
            fetchedProducts: true,
            fetchingProductsError: false,
            products: res.data.products,
          });
        }
      }).catch(() => {

        notification.error({
          message: 'Fatal error',
          description: 'An error has occurred. Please reload.',
        });

        this.setState({
          fetchingProducts: false,
          fetchedProducts: false,
          fetchingProductsError: true,
        });
      });
    }

    axios({
      method: 'get',
      url: '/settings/get-settings',
    }).then((res) => {
      this.setState({
        fetchingSettings: false,
        fetchedSettings: true,
        fetchingSettingsError: false,
        currency: res.data.settings[0].currency,
        siteNavigation: res.data.settings[0].siteNavigation,
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

    axios({
      method: 'get',
      url: '/product/get-all-tags',
    }).then((res) => {
      this.setState({
        fetchingTags: false,
        fetchedTags: true,
        fetchingTagsError: false,
        tags: res.data.tags,
      });
    }).catch(() => {
      this.setState({
        fetchingTags: false,
        fetchedTags: false,
        fetchingTagsError: true,
      });
      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred. Please reload.',
      });
    });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.shouldUpdateTopPromotionalBanner === true) {
      this.setState({
        fetchingSettings: true,
      });
      axios({
        method: 'get',
        url: '/settings/get-settings',
      }).then((res) => {
        this.handlers.onTopPromotionalBannerChangeHandler();
        this.setState({
          fetchingSettings: false,
          fetchedSettings: true,
          fetchingSettingsError: false,
          siteNavigation: res.data.settings[0].siteNavigation,
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

    if (nextProps.match.params.searchTerm !== this.state.searchTerm) {
      this.setState({
        fetchingProducts: true,
      });

      const searchTerm = nextProps.match.params.searchTerm.replace('%', ' ');

      this.setState({
        searchTerm: searchTerm,
      });

      axios({
        method: 'post',
        url: '/product/get-products-regular-sale',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          searchTerm: searchTerm,
        }),
      }).then((res) => {

        if (this.state.sortBy === 'featured') {
          let newProducts = [];
          for (let i = 0; i < res.data.products.length; i++) {
            if (res.data.products[i].productFeatured === true)
              newProducts.push(res.data.products[i]);
          }

          for (let i = 0; i < res.data.products.length; i++) {
            if (res.data.products[i].productFeatured === false)
              newProducts.push(res.data.products[i]);
          }

          this.setState({
            fetchingProducts: false,
            fetchedProducts: true,
            fetchingProductsError: false,
            products: newProducts,
          });
        } else {
          this.setState({
            fetchingProducts: false,
            fetchedProducts: true,
            fetchingProductsError: false,
            products: res.data.products,
          });
        }
      }).catch(() => {

        notification.error({
          message: 'Fatal error',
          description: 'An error has occurred. Please reload.',
        });

        this.setState({
          fetchingProducts: false,
          fetchedProducts: false,
          fetchingProductsError: true,
        });
      });
    }
  }

  fetchProductsOnDemandFilter = (searchTerm) => () => {
    this.setState({
      fetchingProducts: true,
    });
    if (searchTerm) {
      // This will search all products that have either
      // a name like searchTerm, a tag, or a category
      const searchTerm1 = searchTerm.replace('%', ' ');

      this.setState({
        searchTerm: searchTerm1,
      });

      axios({
        method: 'post',
        url: '/product/get-products-regular-sale',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          searchTerm: searchTerm1,
        }),
      }).then((res) => {

        if (this.state.sortBy === 'featured') {
          let newProducts = [];
          for (let i = 0; i < res.data.products.length; i++) {
            if (res.data.products[i].productFeatured === true)
              newProducts.push(res.data.products[i]);
          }

          for (let i = 0; i < res.data.products.length; i++) {
            if (res.data.products[i].productFeatured === false)
              newProducts.push(res.data.products[i]);
          }

          this.setState({
            fetchingProducts: false,
            fetchedProducts: true,
            fetchingProductsError: false,
            products: newProducts,
          });
        } else {
          this.setState({
            fetchingProducts: false,
            fetchedProducts: true,
            fetchingProductsError: false,
            products: res.data.products,
          });
        }
      }).catch(() => {

        notification.error({
          message: 'Fatal error',
          description: 'An error has occurred. Please reload.',
        });

        this.setState({
          fetchingProducts: false,
          fetchedProducts: false,
          fetchingProductsError: true,
        });
      });
    }
  };

  render() {
    return <RegularSalePage searchTerm={this.props.match.params.searchTerm}
                            fetchedCategories={this.state.fetchedCategories}
                            categories={this.state.categories}
                            fetchedProducts={this.state.fetchedProducts}
                            products={this.state.products}
                            fetchedSettings={this.state.fetchedSettings}
                            currency={this.state.currency}
                            siteNavigation={this.state.siteNavigation}
                            fetchedTags={this.state.fetchedTags}
                            tags={this.state.tags}
                            sortBy={this.state.sortBy}
                            history={this.props.history}
                            location={this.props.location}
                            changeSortByStatus={this.changeSortByStatus}
                            fetchProductsOnDemandFilter={this.fetchProductsOnDemandFilter}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    shouldUpdateSiteNavigation: state.settingsReducer.shouldUpdateSiteNavigation,
  };
};

export default connect(mapStateToProps)(RegularSalePageView);
