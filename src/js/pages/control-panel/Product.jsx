import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Icon,
  Input,
  Avatar,
  Table,
  notification,
} from 'antd';

import QuickEditForm from './QuickEditForm.jsx';

const showHeader = true;

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      productsTableContent: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    let productsTableContent = nextProps.products.map((product, i) => {

      let date = new Date(product.publishDate);

      let categoriesString = product.productCategory.map((category, i) => {
        if (i < product.productCategory.length - 1)
          return category + ', ';
        else return category;
      });

      return {
        key: i,
        _id: product._id,
        productThumbnail: product.productThumbnail,
        productName: {
          value: product.productName,
          id: product._id,
        },
        sku: product.sku,
        stockStatus: product.stockStatus,
        productPrice: nextProps.fetchedSettings ?
            product.productPrice + ' ' + nextProps.currency[1] :
            product.productPrice,
        salePrice: nextProps.fetchedSettings ?
            product.salePrice + ' ' + nextProps.currency[1] :
            product.productPrice,
        productCategory: categoriesString,
        productFeatured: {
          value: product.productFeatured,
          id: product._id,
        },
        productStatus: product.productStatus,
        productVisibility: product.productVisibility,
        publishDate: date.toString(),
      };
    });
    this.setState({
      productsTableContent: productsTableContent,
    });
  }

  onSearch = (searchQuery) => {
    let indexesToRemove = [];

    if (searchQuery) {
      let productsTableContent = this.props.products.map((product, i) => {
        if (product.productName.toLowerCase().
                indexOf(searchQuery.toLowerCase()) !== -1) {
          let date = new Date(product.publishDate);

          let categoriesString = product.productCategory.map(
              (category, i) => {
                if (i < product.productCategory.length - 1)
                  return category + ', ';
                else return category;
              });

          return {
            key: i,
            _id: product._id,
            productThumbnail: product.productThumbnail,
            productName: {
              value: product.productName,
              id: product._id,
            },
            sku: product.sku,
            stockStatus: product.stockStatus,
            productPrice: product.productPrice + ' ' + this.props.currency[1],
            salePrice: product.salePrice + ' ' + this.props.currency[1],
            productCategory: categoriesString,
            productFeatured: {
              value: product.productFeatured,
              id: product._id,
            },
            productStatus: product.productStatus,
            productVisibility: product.productVisibility,
            publishDate: date.toString(),
          };
        } else indexesToRemove.push(i);
      });
      if (productsTableContent.length === indexesToRemove.length) {
        notification.warn({
          message: 'No records found',
          description: 'There was no record matching your search: ' +
          searchQuery + '.',
        });

        let productsTableContent = this.props.products.map((product, i) => {

          let date = new Date(product.publishDate);

          let categoriesString = product.productCategory.map(
              (category, i) => {
                if (i < product.productCategory.length - 1)
                  return category + ', ';
                else return category;
              });

          return {
            key: i,
            _id: product._id,
            productThumbnail: product.productThumbnail,
            productName: {
              value: product.productName,
              id: product._id,
            },
            sku: product.sku,
            stockStatus: product.stockStatus,
            productPrice: product.productPrice + ' ' + this.props.currency[1],
            salePrice: product.salePrice + ' ' + this.props.currency[1],
            productCategory: categoriesString,
            productFeatured: {
              value: product.productFeatured,
              id: product._id,
            },
            productStatus: product.productStatus,
            productVisibility: product.productVisibility,
            publishDate: date.toString(),
          };
        });
        this.setState({
          productsTableContent: productsTableContent,
        });

      }
      for (let j = indexesToRemove.length - 1; j >= 0; j--) {
        productsTableContent.splice(indexesToRemove[j], 1);
      }

      this.setState({
        productsTableContent: productsTableContent,
      });
    } else {
      let productsTableContent = this.props.products.map((product, i) => {

        let date = new Date(product.publishDate);

        let categoriesString = product.productCategory.map(
            (category, i) => {
              if (i < product.productCategory.length - 1)
                return category + ', ';
              else return category;
            });

        return {
          key: i,
          _id: product._id,
          productThumbnail: product.productThumbnail,
          productName: {
            value: product.productName,
            id: product._id,
          },
          sku: product.sku,
          stockStatus: product.stockStatus,
          productPrice: product.productPrice + ' ' + this.props.currency[1],
          salePrice: product.salePrice + ' ' + this.props.currency[1],
          productCategory: categoriesString,
          productFeatured: {
            value: product.productFeatured,
            id: product._id,
          },
          productStatus: product.productStatus,
          productVisibility: product.productVisibility,
          publishDate: date.toString(),
        };
      });
      this.setState({
        productsTableContent: productsTableContent,
      });
    }
  };

  onSearchQueryChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  rowState = {
    selectedRowKeys: [],
  };

  tableState = {
    bordered: false,
    loading: false,
    pagination: true,
    size: 'default',
    showHeader,
  };

  render() {
    const fields = {
      productName: this.props.productName,
      onProductNameChange: this.props.onProductNameChange,
      sku: this.props.sku,
      onSKUChange: this.props.onSKUChange,
      productPrice: this.props.productPrice,
      onProductPriceChange: this.props.onProductPriceChange,
      salePrice: this.props.salePrice,
      onSalePriceChange: this.props.onSalePriceChange,
      stockStatus: this.props.stockStatus,
      onStockStatusChange: this.props.onStockStatusChange,
      showStockQuantity: this.props.showStockQuantity,
      onShowStockQuantityChange: this.props.onShowStockQuantityChange,
      stockQuantity: this.props.stockQuantity,
      onStockQuantityChange: this.props.onStockQuantityChange,
      shippingFee: this.props.shippingFee,
      onShippingFeeChange: this.props.onShippingFeeChange,
      availableInStore: this.props.availableInStore,
      onAvailableInStoreChange: this.props.onAvailableInStoreChange,
      productCategory: this.props.productCategory,
      fetchingCategories: this.props.fetchingCategories,
      fetchedCategories: this.props.fetchedCategories,
      fetchingCategoriesError: this.props.fetchingCategoriesError,
      categories: this.props.categories,
      onRowSelectionCategories: this.props.onRowSelectionCategories,
      onQuickUpdateFinish: this.props.onQuickUpdateFinish,
      tagInput: this.props.tagInput,
      onTagInputChange: this.props.onTagInputChange,
      handleKeyPressAddTag: this.props.handleKeyPressAddTag,
      onAddTag: this.props.onAddTag,
      tags: this.props.tags,
      onRemoveTag: this.props.onRemoveTag,
      productVisibility: this.props.productVisibility,
      onProductVisibilityChange: this.props.onProductVisibilityChange,
      latestModification: this.props.latestModification,
      fetchingSettings: this.props.fetchingSettings,
      fetchedSettings: this.props.fetchedSettings,
      fetchingSettingsError: this.props.fetchingSettingsError,
      currency: this.props.currency,
    };

    let productsTableColumns = [];
    let productsTableContent;

    if (this.props.fetchingProducts) {
      productsTableColumns = [
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
      ];
    }

    if (this.props.fetchedProducts) {
      productsTableColumns = [
        {
          title: <Icon type="picture"
                       style={{ fontSize: 20 }}/>,
          dataIndex: 'productThumbnail',
          key: 'productThumbnail',
          render: text => <Avatar size="large"
                                  shape="square"
                                  style={{ cursor: 'pointer' }}
                                  src={text}/>,
        },
        {
          title: 'Name',
          dataIndex: 'productName',
          key: 'productName',
          render: text =>
              <span>
                <div>{text.value}</div>
                <a onClick={() => this.props.onQuickUpdateInitiate(text.id)}>Quick Update</a>
              </span>,
        },
        {
          title: 'SKU',
          dataIndex: 'sku',
          key: 'sku',
        },
        {
          title: 'Stock',
          dataIndex: 'stockStatus',
          key: 'stockStatus',
          render: text => <span>{text ?
              <span style={{ color: 'green' }}>In Stock</span> :
              <span style={{ color: 'tomato' }}>Out of Stock</span>}
              </span>,
        },
        {
          title: 'Price',
          dataIndex: 'productPrice',
          key: 'productPrice',
          defaultSortOrder: 'descend',
          sorter: (a, b) => parseFloat(a.productPrice) -
          parseFloat(b.productPrice),
        },
        {
          title: 'Sale Price',
          dataIndex: 'salePrice',
          key: 'salePrice',
          defaultSortOrder: 'descend',
          sorter: (a, b) => parseFloat(a.salePrice) -
          parseFloat(b.salePrice),
          render: text => <span>{text ? text : '-'}</span>,
        },
        {
          title: 'Categories',
          dataIndex: 'productCategory',
          key: 'productCategory',
        },
        {
          title: <Icon type="star"
                       style={{ fontSize: 16 }}/>,
          dataIndex: 'productFeatured',
          key: 'productFeatured',
          render: text => <span>{text.value ?
              <Icon type="star"
                    onClick={() => this.props.onToggleFeatured(text.id,
                        text.value)}
                    style={{ fontSize: 16 }}/> :
              <Icon type="star-o"
                    onClick={() => this.props.onToggleFeatured(text.id,
                        text.value)}
                    style={{ fontSize: 16 }}/>}
              </span>,
        },
        {
          title: 'Status',
          dataIndex: 'productStatus',
          key: 'productStatus',
        },
        {
          title: 'Visibility',
          dataIndex: 'productVisibility',
          key: 'productVisibility',
          render: text => <span>{text ? 'Public' : 'Private'}</span>,
        },
        {
          title: 'Date',
          dataIndex: 'publishDate',
          key: 'publishDate',
        },
      ];
      productsTableContent = this.state.productsTableContent;
    }

    if (this.props.fetchingCategoriesError) {
      productsTableColumns = [
        { title: 'An error has occurred.' },
        { title: 'An error has occurred.' },
        { title: 'An error has occurred.' },
        { title: 'An error has occurred.' },
        { title: 'An error has occurred.' },
        { title: 'An error has occurred.' },
        { title: 'An error has occurred.' },
        { title: 'An error has occurred.' },
        { title: 'An error has occurred.' },
      ];
    }

    const rowState = this.rowState;
    const rowSelection = {
      selectedRowKeys: rowState.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        rowState.selectedRowKeys = selectedRowKeys;
        this.props.onRowSelection(selectedRows);
      },
    };

    const title = () =>
        <Button type="danger"
                htmlType="submit"
                loading={this.props.deletingProducts}
                onClick={() => {
                  this.props.onDeleteSelectedRows();
                  this.rowState.selectedRowKeys = [];
                }
                }>
          {this.props.deletingProducts ?
              <span>Working...</span>
              :
              <span>Delete selected products</span>
          }
        </Button>;

    const footer = () =>
        <Button type="danger"
                htmlType="submit"
                loading={this.props.deletingProducts}
                onClick={() => {
                  this.props.onDeleteSelectedRows();
                  this.rowState.selectedRowKeys = [];
                }
                }>
          {this.props.deletingProducts ?
              <span>Working...</span>
              :
              <span>Delete selected products</span>
          }
        </Button>;

    const cardMediaQuery = window.matchMedia('(max-width: 768px)');

    return (
        <Card bordered={false}
              noHovering={true}>
          <Card bordered={false}
                noHovering={true}
                loading={!this.props.loadedPage}
                bodyStyle={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: cardMediaQuery.matches ? 24 : 5,
                }}>
            <div style={{ width: '100%' }}>
              <Link to={`${this.props.router.route.match.url}/add-a-product`}>
                <Button type="primary"
                        htmlType="button">
                  Add product
                </Button>
              </Link>
            </div>
            <Input style={{ width: '30em' }}
                   value={this.state.searchQuery}
                   onChange={this.onSearchQueryChange}
                   placeholder="Search products by name"
                   onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                       this.onSearch(this.state.searchQuery);
                     }
                   }}
                   suffix={<Icon type="search"
                                 className="certain-category-icon"
                                 onClick={() => this.onSearch(
                                     this.state.searchQuery)}/>}/>
          </Card>
          <Table {...this.tableState}
                 loading={this.props.fetchingProducts}
                 scroll={{ x: 1300 }}
                 title={title}
                 footer={footer}
                 rowSelection={rowSelection}
                 columns={productsTableColumns}
                 dataSource={productsTableContent}/>
          <Card bordered={false}
                loading={this.props.fetchingCategories}
                noHovering={true}
                bodyStyle={{
                  margin: 0,
                  padding: 0,
                }}>
            {this.props.quickEditing && this.props.fetchedProduct &&
            this.props.fetchedCategories ?
                <span>
                <Button type="primary"
                        onClick={this.props.onCloseQuickEdit}
                        style={{ marginBottom: 5 }}>
                  Finish editing
                </Button>
                <QuickEditForm {...fields}/>
              </span>

                :
                null
            }
          </Card>

        </Card>
    );
  }
}

export default Product;
