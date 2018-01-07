import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  onShowUploadsModalAction,
  onHideUploadsModalAction,
} from './categoriesActions.js';
import {
  onChooseImage,
} from '../upload-modal/uploadActions.js';
import {
  onShowUploadsMultipleModalAction,
  onHideUploadsMultipleModalAction,
} from './productActions.js';
import {
  onChooseMultipleImages,
} from '../upload-modal/uploadActions.js';
import axios from 'axios';
import qs from 'qs';

import CreateProduct from './CreateProduct.jsx';

let createHandlers = function (dispatch) {
  let onShowUploadsModal = function () {
    dispatch(onShowUploadsModalAction());
  };

  let onHideUploadsModal = function () {
    dispatch(onHideUploadsModalAction());
  };

  let onChooseImageHandler = function (imageUrl) {
    dispatch(onChooseImage(imageUrl));
  };

  let onShowUploadsMultipleModal = function () {
    dispatch(onShowUploadsMultipleModalAction());
  };

  let onHideUploadsMultipleModal = function () {
    dispatch(onHideUploadsMultipleModalAction());
  };

  let onChooseMultipleImagesHandler = function (imageUrlsArray) {
    dispatch(onChooseMultipleImages(imageUrlsArray));
  };

  return {
    onShowUploadsModal,
    onHideUploadsModal,
    onChooseImageHandler,
    onShowUploadsMultipleModal,
    onHideUploadsMultipleModal,
    onChooseMultipleImagesHandler,
  };
};

class CreateProductView extends Component {
  constructor(props, context) {
    super(props, context);

    this.handlers = createHandlers(this.props.dispatch);

    // imageUrl from props is used as thumbnail
    // productPicturess array is used as a gallery

    this.state = {
      fetchingCategories: false,
      fetchedCategories: false,
      fetchingCategoriesError: false,
      categories: [],
      productName: {
        value: '',
        errorMsg: '',
      },
      productLink: '',
      productCategory: [],
      productDescription: '',
      productPictures: '',
      sku: '',
      productPrice: '',
      salePrice: '',
      stockStatus: true,
      showStockQuantity: true,
      stockQuantity: '',
      shippingFee: '',
      availableInStore: false,
      upSellLink: '',
      crossSellLink: '',
      tags: [],
      tagInput: '',
      productFeatured: false,
      latestModification: '',
    };
  }

  componentDidMount() {
    this.setState({
      fetchingCategories: true,
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
      this.setState({
        fetchingCategories: false,
        fetchingCategoriesError: true,
      });
    });
  }

  onRowSelection = (selectedRows) => {
    // Visual checkbox for the table
    this.setState({
      selectedRowsDescriptors: Object.keys(selectedRows).map((i) => {
        return { descriptor: selectedRows[i].categoryDescriptor };
      }),
    });
    let newState = Object.keys(selectedRows).map((i) => {
      return selectedRows[i].categoryName;
    });
    this.setState({
      productCategory: newState,
      latestModification: new Date(),
    });
  };

  onProductNameChange = (e) => {
    this.setState({
      productName: {
        errorMsg: '',
        value: e.target.value,
      },
      latestModification: new Date(),
    });
    if (e.target.value.length === 0)
      this.setState({
        productName: {
          ...this.state.productName,
          errorMsg: 'This field cannot be empty.',
        },
        latestModification: new Date(),
      });
  };

  onProductLinkChange = (e) => {
    if (typeof e === 'string')
      this.setState({
        productLink: e,
        latestModification: new Date(),
      }); else this.setState({
      productLink: e.target.value,
      latestModification: new Date(),
    });
  };

  onProductDescriptionChange = (value) => {
    this.setState({
      productDescription: value,
      latestModification: new Date(),
    });
  };

  onProductPicturesChange = () => {

  };

  onSKUChange = (e) => {
    this.setState({
      sku: e.target.value,
      latestModification: new Date(),
    });
  };

  onProductPriceChange = (e) => {
    this.setState({
      productPrice: e.target.value,
      latestModification: new Date(),
    });
  };

  onSalePriceChange = (e) => {
    this.setState({
      salePrice: e.target.value,
      latestModification: new Date(),
    });
  };

  onStockStatusChange = () => {
    this.setState({
      stockStatus: !this.state.stockStatus,
      latestModification: new Date(),
    });
  };

  onShowStockQuantityChange = () => {
    this.setState({
      showStockQuantity: !this.state.showStockQuantity,
      latestModification: new Date(),
    });
  };

  onStockQuantityChange = (e) => {
    this.setState({
      stockQuantity: e.target.value,
      latestModification: new Date(),
    });
  };

  onShippingFeeChange = (e) => {
    this.setState({
      shippingFee: e.target.value,
      latestModification: new Date(),
    });
  };

  onAvailableInStoreChange = (e) => {
    this.setState({
      availableInStore: !this.state.availableInStore,
      latestModification: new Date(),
    });
  };

  onUpSellLinkChange = (e) => {
    this.setState({
      upSellLink: e.target.value,
      latestModification: new Date(),
    });
  };

  onCrossSellLinkChange = (e) => {
    this.setState({
      crossSellLink: e.target.value,
      latestModification: new Date(),
    });
  };

  onAddTag = () => {
    let tags = this.state.tags;
    if (this.state.tagInput && tags.indexOf(this.state.tagInput) === -1 &&
        this.state.tagInput.indexOf(',') === -1) {
      tags = [...tags, this.state.tagInput];
    } else if (this.state.tagInput &&
        tags.indexOf(this.state.tagInput) === -1 &&
        this.state.tagInput.indexOf(',') !== -1) {
      let multipleTags = this.state.tagInput.split(',');
      for (let i = 0; i < multipleTags.length; i++) {
        if (multipleTags[i])
          tags = [...tags, multipleTags[i]];
      }
    }

    this.setState({
      tags: tags,
      tagInput: '',
    });
  };

  handleKeyPressAddTag = (e) => {
    if (e.key === 'Enter') {
      this.onAddTag(this.state.tagInput);
    }
  };

  onRemoveTag = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({
      tags: tags,
    });
  };

  onTagInputChange = (e) => {
    this.setState({
      tagInput: e.target.value,
    });
  };

  onProductFeaturedToggle = () => {
    this.setState({
      productFeatured: !this.state.productFeatured,
    });
  };

  onShowUploadsModal = () => {
    this.handlers.onShowUploadsModal();
  };

  onHideUploadsModal = () => {
    this.handlers.onHideUploadsModal();
  };

  onShowUploadsMultipleModal = () => {
    this.handlers.onShowUploadsMultipleModal();
  };

  onHideUploadsMultipleModal = () => {
    this.handlers.onHideUploadsMultipleModal();
  };

  render() {
    return <CreateProduct router={this.context.router}
                          fetchingCategories={this.state.fetchingCategories}
                          fetchedCategories={this.state.fetchedCategories}
                          fetchingCategoriesError={this.state.fetchingCategoriesError}
                          categories={this.state.categories}
                          productName={this.state.productName}
                          productLink={this.state.productLink}
                          productCategory={this.state.productCategory}
                          productDescription={this.state.productDescription}
                          productPictures={this.state.productPictures}
                          sku={this.state.sku}
                          productPrice={this.state.productPrice}
                          salePrice={this.state.salePrice}
                          stockStatus={this.state.stockStatus}
                          showStockQuantity={this.state.showStockQuantity}
                          stockQuantity={this.state.stockQuantity}
                          shippingFee={this.state.shippingFee}
                          availableInStore={this.state.availableInStore}
                          upSellLink={this.state.upSellLink}
                          crossSellLink={this.state.crossSellLink}
                          tags={this.state.tags}
                          tagInput={this.state.tagInput}
                          productFeatured={this.state.productFeatured}
                          latestModification={this.state.latestModification}
                          isModalVisible={this.props.isModalVisible}
                          imageUrl={this.props.imageUrl}
                          isModalVisibleMultiple={this.props.isModalVisibleMultiple}
                          imageUrlsArray={this.props.imageUrlsArray}
                          onRowSelection={this.onRowSelection}
                          onProductNameChange={this.onProductNameChange}
                          onProductLinkChange={this.onProductLinkChange}
                          onProductCategoryChange={this.onProductCategoryChange}
                          onProductDescriptionChange={this.onProductDescriptionChange}
                          onproductPicturesChange={this.onproductPicturesChange}
                          onSKUChange={this.onSKUChange}
                          onProductPriceChange={this.onProductPriceChange}
                          onSalePriceChange={this.onSalePriceChange}
                          onStockStatusChange={this.onStockStatusChange}
                          onShowStockQuantityChange={this.onShowStockQuantityChange}
                          onStockQuantityChange={this.onStockQuantityChange}
                          onShippingFeeChange={this.onShippingFeeChange}
                          onAvailableInStoreChange={this.onAvailableInStoreChange}
                          onUpSellLinkChange={this.onUpSellLinkChange}
                          onCrossSellLinkChange={this.onCrossSellLinkChange}
                          onAddTag={this.onAddTag}
                          handleKeyPressAddTag={this.handleKeyPressAddTag}
                          onRemoveTag={this.onRemoveTag}
                          onTagInputChange={this.onTagInputChange}
                          onProductFeaturedToggle={this.onProductFeaturedToggle}
                          onShowUploadsModal={this.onShowUploadsModal}
                          onHideUploadsModal={this.onHideUploadsModal}
                          onChooseImageHandler={this.handlers.onChooseImageHandler}
                          onShowUploadsMultipleModal={this.onShowUploadsMultipleModal}
                          onHideUploadsMultipleModal={this.onHideUploadsMultipleModal}
                          onChooseMultipleImagesHandler={this.onChooseMultipleImagesHandler}/>;
  }
}

CreateProductView.contextTypes = {
  router: PropTypes.object.isRequired,
};

CreateProductView.propTypes = {
  isModalVisible: PropTypes.bool,
  imageUrl: PropTypes.string,
  isModalVisibleMultiple: PropTypes.bool,
  imageUrlsArray: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    isModalVisible: state.categoriesReducer.isModalVisible,
    imageUrl: state.uploadReducer.imageUrl,
    isModalVisibleMultiple: state.productReducer.isModalVisible,
    imageUrlsArray: state.uploadReducer.imageUrlsArray,
  };
};

export default connect(mapStateToProps)(CreateProductView);
