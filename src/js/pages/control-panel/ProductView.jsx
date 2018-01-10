import React, { Component } from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';
import Product from './Product.jsx';

class ProductView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingProducts: false,
      fetchedProducts: false,
      fetchingProductsError: false,
      products: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      settings: [],
      currency: [],
      selectedRowsId: '',
      deletingProducts: false,
      deletedProducts: false,
      deletingProductsError: false,
      shouldResetForm: false,
      loadedPage: false,
      quickEditing: false,
      fetchingProduct: false,
      fetchedProduct: false,
      fetchingProductError: false,
      id: '',
      productName: {
        value: '',
        errorMsg: '',
      },
      productCategory: [],
      sku: '',
      productPrice: '',
      salePrice: '',
      stockStatus: true,
      showStockQuantity: true,
      stockQuantity: '',
      shippingFee: '',
      availableInStore: false,
      tags: [],
      tagInput: '',
      productVisibility: true,
      latestModification: '',
      fetchingCategories: false,
      fetchedCategories: true,
      fetchingCategoriesError: false,
      categories: [],
      updatingProduct: false,
      updatedProduct: false,
      updatingProductError: false,
    };
  }

  componentDidMount() {
    this.setState({
      fetchingProducts: true,
      fetchingSettings: true,
    });
    axios({
      method: 'get',
      url: '/product/get-products',
    }).then((res) => {
      this.setState({
        fetchingProducts: false,
        fetchedProducts: true,
        fetchingProductsError: false,
        products: res.data.products,
        loadedPage: true,
      });
    }).catch(() => {
      this.setState({
        fetchingProducts: false,
        fetchingProductsError: true,
      });
      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred while fetching shop\'s settings. Please contact an administrator.',
      });
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

  onFormReset = () => {
    this.setState({
      shouldResetForm: false,
    });
  };

  onToggleFeatured = (id, currentStatus) => {
    axios({
      method: 'post',
      url: '/product/toggle-featured',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        id: id,
      }),
    }).then(() => {
      notification.success({
        message: 'Toggle success',
        description: currentStatus ?
            'Product successfully removed from featured products.' :
            'Product successfully added to featured products.',
      });
      this.setState({
        fetchingProducts: true,
      });
      axios({
        method: 'get',
        url: '/product/get-products',
      }).then((res) => {
        this.setState({
          fetchingProducts: false,
          fetchedProducts: true,
          fetchingProductsError: false,
          products: res.data.products,
        });
      }).catch(() => {
        this.setState({
          fetchingProducts: false,
          fetchingProductsError: true,
        });
      });
    }).catch(() => {
      notification.error({
        message: 'Toggle failure',
        description: 'An error has occurred.',
      });
    });
  };

  onRowSelection = (selectedRows) => {
    this.setState({
      selectedRowsId: Object.keys(selectedRows).map((i) => {
        return { id: selectedRows[i]._id };
      }),
    });
  };

  onDeleteSelectedRows = () => {
    const selectedRowsId = JSON.stringify(this.state.selectedRowsId);
    this.setState({
      deletingProducts: true,
    });
    axios({
      method: 'post',
      url: '/product/delete-products',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        selectedRowsId: selectedRowsId,
      }),
    }).then(() => {

      notification.success({
        message: 'Success!',
        description: 'The selected products have been successfully deleted.',
      });

      this.setState({
        deletingProducts: false,
        deletedProducts: true,
        deletingProductsError: false,
      });
      this.setState({
        fetchingProducts: true,
      });
      axios({
        method: 'get',
        url: '/product/get-products',
      }).then((res) => {
        this.setState({
          fetchingProducts: false,
          fetchedProducts: true,
          fetchingProductsError: false,
          products: res.data.products,
        });
      }).catch(() => {
        this.setState({
          fetchingProducts: false,
          fetchingProductsError: true,
        });
      });
    }).catch(() => {

      notification.error({
        message: 'Failure',
        description: 'The selected products have not been deleted.',
      });

      this.setState({
        deletingProducts: false,
        deletedProducts: false,
        deletingProductsError: true,
      });
    });
  };

  onQuickUpdateInitiate = (id) => {
    this.setState({
      fetchingProduct: true,
      quickEditing: true,
    });
    axios({
      method: 'post',
      url: '/product/quick-edit-product',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        id: id,
      }),
    }).then((res) => {

      this.setState({
        fetchingCategories: true,
      });
      axios({
        method: 'get',
        url: '/products-categories/get-categories',
      }).then((res) => {

        notification.info({
          message: 'Quick edit started',
          description: 'Editing has been successfully initiated. Scroll below the table to edit.',
        });

        this.setState({
          fetchingCategories: false,
          fetchedCategories: true,
          fetchingCategoriesError: false,
          categories: res.data.categories,
        });
      }).catch(() => {

        notification.error({
          message: 'Quick edit aborted',
          description: 'An unexpected error has stopped the quick edit process.',
        });

        this.setState({
          fetchingCategories: false,
          fetchingCategoriesError: true,
        });
      });
      this.setState({
        fetchingProduct: false,
        fetchedProduct: true,
        fetchingProductError: false,
      });
      const product = res.data.product[0];

      this.setState({
        id: product._id,
        productName: {
          ...this.state.productName,
          value: product.productName,
        },
        productCategory: product.productCategory,
        sku: product.sku,
        productPrice: product.productPrice,
        salePrice: product.salePrice,
        stockStatus: product.stockStatus,
        showStockQuantity: product.showStockQuantity,
        stockQuantity: product.stockQuantity,
        shippingFee: product.shippingFee,
        availableInStore: product.availableInStore,
        tags: product.tags,
        productVisibility: product.productVisibility,
      });

    }).catch(() => {

      notification.error({
        message: 'Quick edit aborted',
        description: 'An unexpected error has stopped the quick edit process.',
      });

      this.setState({
        fetchingProduct: false,
        fetchedProduct: false,
        fetchingProductError: true,
      });
    });
  };

  onRowSelectionCategories = (selectedRows) => {
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
        if (multipleTags[i] && !tags.includes(multipleTags[i]))
          tags = [...tags, multipleTags[i]];
      }
    }

    this.setState({
      tags: tags,
      tagInput: '',
      latestModification: new Date(),
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
      latestModification: new Date(),
    });
  };

  onTagInputChange = (e) => {
    this.setState({
      tagInput: e.target.value,
    });
  };

  onProductVisibilityChange = () => {
    this.setState({
      productVisibility: !this.state.productVisibility,
      latestModification: new Date(),
    });
  };

  onQuickUpdateFinish = () => {
    this.setState({
      updatingProduct: true,
    });
    axios({
      method: 'post',
      url: '/product/quick-edit-product-save',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        id: this.state.id,
        productName: this.state.productName.value,
        productCategory: JSON.stringify(this.state.productCategory),
        sku: this.state.sku,
        productPrice: this.state.productPrice,
        salePrice: this.state.salePrice,
        stockStatus: this.state.stockStatus,
        availableInStore: this.state.availableInStore,
        tags: JSON.stringify(this.state.tags),
        productVisibility: this.state.productVisibility,
      }),
    }).then(() => {

      this.setState({
        fetchingProducts: true,
      });
      axios({
        method: 'get',
        url: '/product/get-products',
      }).then((res) => {
        this.setState({
          fetchingProducts: false,
          fetchedProducts: true,
          fetchingProductsError: false,
          products: res.data.products,
          loadedPage: true,
        });
      }).catch(() => {
        this.setState({
          fetchingProducts: false,
          fetchingProductsError: true,
        });
      });

      notification.success({
        message: 'Success!',
        description: 'The selected product has been successfully updated.',
      });

      this.setState({
        updatingProduct: false,
        updatedProduct: true,
        updatingProductError: false,
      });
    }).catch(() => {

      notification.error({
        message: 'Failure.',
        description: 'Could not update the product. Please check the fields.',
      });

      this.setState({
        updatingProduct: false,
        updatedProduct: false,
        updatingProductError: true,
      });
    });
  };

  onCloseQuickEdit = () => {
    this.setState({
      quickEditing: false,
    });
  };

  render() {
    return <Product router={this.context.router}
                    fetchingProducts={this.state.fetchingProducts}
                    fetchedProducts={this.state.fetchedProducts}
                    fetchingProductsError={this.state.fetchingProductsError}
                    products={this.state.products}
                    fetchingSettings={this.state.fetchingSettings}
                    fetchedSettings={this.state.fetchedSettings}
                    fetchingSettingsError={this.state.fetchingSettingsError}
                    settings={this.state.settings}
                    currency={this.state.currency}
                    deletingProducts={this.state.deletingProducts}
                    deletedProducts={this.state.deletedProducts}
                    deletingProductsError={this.state.deletingProductsError}
                    shouldResetForm={this.state.shouldResetForm}
                    loadedPage={this.state.loadedPage}
                    quickEditing={this.state.quickEditing}
                    fetchingProduct={this.state.fetchingProduct}
                    fetchedProduct={this.state.fetchedProduct}
                    fetchingProductError={this.state.fetchingProductError}
                    productName={this.state.productName}
                    productCategory={this.state.productCategory}
                    sku={this.state.sku}
                    productPrice={this.state.productPrice}
                    salePrice={this.state.salePrice}
                    stockStatus={this.state.stockStatus}
                    showStockQuantity={this.state.showStockQuantity}
                    stockQuantity={this.state.stockQuantity}
                    shippingFee={this.state.shippingFee}
                    availableInStore={this.state.availableInStore}
                    tags={this.state.tags}
                    tagInput={this.state.tagInput}
                    productVisibility={this.state.productVisibility}
                    latestModification={this.state.latestModification}
                    fetchingCategories={this.state.fetchingCategories}
                    fetchedCategories={this.state.fetchedCategories}
                    fetchingCategoriesError={this.state.fetchingCategoriesError}
                    categories={this.state.categories}
                    updatingProduct={this.state.updatingProduct}
                    updatedProduct={this.state.updatedProduct}
                    updatingProductError={this.state.updatingProductError}
                    onFormReset={this.onFormReset}
                    onToggleFeatured={this.onToggleFeatured}
                    onRowSelection={this.onRowSelection}
                    onDeleteSelectedRows={this.onDeleteSelectedRows}
                    onQuickUpdateInitiate={this.onQuickUpdateInitiate}
                    onRowSelectionCategories={this.onRowSelectionCategories}
                    onProductNameChange={this.onProductNameChange}
                    onSKUChange={this.onSKUChange}
                    onProductPriceChange={this.onProductPriceChange}
                    onSalePriceChange={this.onSalePriceChange}
                    onStockStatusChange={this.onStockStatusChange}
                    onShowStockQuantityChange={this.onShowStockQuantityChange}
                    onStockQuantityChange={this.onStockQuantityChange}
                    onShippingFeeChange={this.onShippingFeeChange}
                    onAvailableInStoreChange={this.onAvailableInStoreChange}
                    onAddTag={this.onAddTag}
                    handleKeyPressAddTag={this.handleKeyPressAddTag}
                    onRemoveTag={this.onRemoveTag}
                    onTagInputChange={this.onTagInputChange}
                    onProductVisibilityChange={this.onProductVisibilityChange}
                    onQuickUpdateFinish={this.onQuickUpdateFinish}
                    onCloseQuickEdit={this.onCloseQuickEdit}/>;
  }
}

ProductView.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default ProductView;
