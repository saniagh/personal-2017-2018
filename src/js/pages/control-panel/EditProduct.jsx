import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  Card,
  Form,
  Input,
  Button,
  Icon,
  Table,
  Checkbox,
  Tag,
  Tooltip,
  Modal,
  Switch,
  Avatar,
} from 'antd';
const FormItem = Form.Item;

import UploadView from '../upload-modal/UploadView.jsx';
import UploadViewMultipleChoice from '../upload-modal/UploadViewMultipleChoice.jsx';

import EditForm from './EditForm.jsx';

const showHeader = false;

class EditProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mainClassName: 'main-container hidden',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        mainClassName: 'main-container',
      });
    }, 200);
  }

  rowState = {
    selectedRowKeys: [],
    selectedRowsIdentifier: [],
  };

  tableState = {
    bordered: false,
    loading: false,
    pagination: true,
    size: 'default',
    showHeader,
  };

  render() {

    let categoriesTableColumns = [];
    let categoriesTableContent;

    if (this.props.fetchingCategories) {
      categoriesTableColumns = [
        { title: 'Loading...' },
      ];
    }

    const rowState = this.rowState;

    if (this.props.fetchedCategories) {
      categoriesTableColumns = [
        {
          title: 'Name',
          dataIndex: 'categoryName',
          key: 'categoryName',
        },
      ];
      categoriesTableContent = this.props.categories.map((category, i) => {
        return {
          key: i,
          categoryName: category.categoryName,
        };
      });

      for (let i = 0; i < this.props.categories.length; i++) {
        for (let j = 0; j < this.props.productCategory.length; j++) {
          if (this.props.categories[i].categoryName ===
              this.props.productCategory[j])
            rowState.selectedRowKeys.push(i);
        }
      }

      if (this.props.productCategory[0] === 'Uncategorized') {
        rowState.selectedRowKeys = [];
      }

    }

    if (this.props.fetchingCategoriesError) {
      categoriesTableColumns = [
        { title: 'An error has occurred.' },
      ];
    }

    const rowSelection = {
      selectedRowKeys: rowState.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        rowState.selectedRowKeys = selectedRowKeys;
        this.props.onRowSelection(selectedRows);
      },
    };

    const cardMediaQuery = window.matchMedia('(max-width: 1100px)');

    const fields = {
      id: this.props.id,
      productName: this.props.productName,
      productLink: this.props.productLink,
      editingProductLink: this.props.editingProductLink,
      productDescription: this.props.productDescription,
      productPictures: this.props.productPictures,
      sku: this.props.sku,
      productPrice: this.props.productPrice,
      salePrice: this.props.salePrice,
      stockStatus: this.props.stockStatus,
      showStockQuantity: this.props.showStockQuantity,
      stockQuantity: this.props.stockQuantity,
      shippingFee: this.props.shippingFee,
      availableInStore: this.props.availableInStore,
      upSellLink: this.props.upSellLink,
      crossSellLink: this.props.crossSellLink,
      productFeatured: this.props.productFeatured,
      fetchingProduct: this.props.fetchingProduct,
      fetchedProduct: this.props.fetchedProduct,
      fetchingProductError: this.props.fetchingProductError,
      fetchingSettings: this.props.fetchingSettings,
      fetchedSettings: this.props.fetchedSettings,
      fetchingSettingsError: this.props.fetchingSettingsError,
      currency: this.props.currency,
      settings: this.props.settings,
      fetchingProducts: this.props.fetchingProducts,
      fetchedProducts: this.props.fetchedProducts,
      fetchingProductsError: this.props.fetchingProductsError,
      products: this.props.products,
      imageUrlsArray: this.props.imageUrlsArray,
      onProductNameChange: this.props.onProductNameChange,
      onProductLinkChange: this.props.onProductLinkChange,
      onEditProductLinkToggle: this.props.onEditProductLinkToggle,
      onProductDescriptionChange: this.props.onProductDescriptionChange,
      onSKUChange: this.props.onSKUChange,
      onProductPriceChange: this.props.onProductPriceChange,
      onSalePriceChange: this.props.onSalePriceChange,
      onStockStatusChange: this.props.onStockStatusChange,
      onShowStockQuantityChange: this.props.onShowStockQuantityChange,
      onShippingFeeChange: this.props.onShippingFeeChange,
      onAvailableInStoreChange: this.props.onAvailableInStoreChange,
      onUpSellLinkChange: this.props.onUpSellLinkChange,
      onCrossSellLinkChange: this.props.onCrossSellLinkChange,
      onProductFeaturedToggle: this.props.onProductFeaturedToggle,
      onShowUploadsMultipleModal: this.props.onShowUploadsMultipleModal,
    };

    return (
        <div className={this.state.mainClassName}>
          <Card bordered={false}
                noHovering={true}
                bodyStyle={{
                  display: 'flex',
                  flexDirection: cardMediaQuery.matches ?
                      'column-reverse' :
                      '',
                  padding: cardMediaQuery.matches ? 24 : 5,
                }}>
            <EditForm {...fields}/>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
            <Card noHovering={true}
                  loading={this.props.fetchingCategories}
                  title="Publish"
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: cardMediaQuery.matches ? 285 : 300,
                  }}
                  style={{
                    marginLeft: cardMediaQuery.matches ? 0 : 20,
                    height: 200,
                  }}>
              <span style={{ display: 'flex', fontSize: 14, paddingBottom: 8 }}>
                <span><Icon type="key"/> Status: <b>Not published</b></span>
              </span>
              <span style={{ display: 'flex', fontSize: 14, paddingBottom: 8 }}>
                <span>
                  <Form>
                    <FormItem key="15"
                              label={<span style={{
                                fontSize: 14,
                                fontWeight: 300,
                              }}>
                                <Icon type="eye"
                                      style={{ marginRight: 2 }}/>Visibility</span>}
                              style={{ display: 'flex', margin: 0 }}>
                      <Checkbox checked={this.props.productVisibility}
                                onChange={this.props.onProductVisibilityChange}>
                        {this.props.productVisibility ? 'Public' : 'Private'}
                      </Checkbox>
                    </FormItem>
                  </Form>
                </span>
              </span>
              <span style={{ display: 'flex', fontSize: 14, paddingBottom: 8 }}>
                <span><Icon
                    type="calendar"/> Latest modification: <b>{this.props.latestModification.toString()}</b></span>
              </span>
            </Card>
            <Card noHovering={true}
                  loading={this.props.fetchingCategories}
                  bodyStyle={{
                    display: 'flex',
                    width: cardMediaQuery.matches ? 269 : 300,
                    padding: cardMediaQuery.matches ? '8px 8px' : '8px 14px',
                  }}
                  style={{
                    marginLeft: cardMediaQuery.matches ? 0 : 20,
                    height: 50,
                    background: '#e5e3e3',
                  }}>
              <span style={{ display: 'flex', flex: 1, }}>
                <Button type='danger'
                        htmlType="button"
                        onClick={() => this.props.router.history.replace('/control-panel/products')}>
                Cancel
              </Button>
              </span>
              <span style={{
                display: 'flex',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
                <Button type='primary'
                        htmlType="submit"
                        onClick={this.props.onSave}
                        loading={this.props.savingProduct}>
                  {this.props.savingProduct ?
                      <span>Working...</span>
                      :
                      <span>Publish</span>
                  }
              </Button>
              </span>
            </Card>
            <Card noHovering={true}
                  title="Product Categories"
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: cardMediaQuery.matches ? 269 : 300,
                    padding: 5,
                  }}
                  style={{
                    marginLeft: cardMediaQuery.matches ? 0 : 20,
                    marginTop: 20,
                  }}>
              <Table {...this.tableState}
                     loading={this.props.fetchingCategories}
                     rowSelection={rowSelection}
                     columns={categoriesTableColumns}
                     dataSource={categoriesTableContent}/>
            </Card>
            <Card noHovering={true}
                  loading={this.props.fetchingCategories}
                  title="Product Tags"
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: cardMediaQuery.matches ? 269 : 300,
                    padding: 5,
                  }}
                  style={{
                    marginLeft: cardMediaQuery.matches ? 0 : 20,
                    marginTop: 20,
                  }}>
              <Form style={{ paddingTop: 10 }}>
                <FormItem help="Separate Product Tags with commas">
                  <span style={{ display: 'flex' }}>
                    <Input value={this.props.tagInput}
                           onChange={this.props.onTagInputChange}
                           onKeyDown={this.props.handleKeyPressAddTag}/>
                    <Button type="default"
                            onClick={() => this.props.onAddTag(
                                this.props.tagInput)}>
                      Add
                    </Button>
                  </span>
                </FormItem>
                </Form>
              {this.props.tags.map((tag, i) => {
                const isLongTag = tag.length > 25;
                const tagElem = (
                    <Tag key={tag}
                         closable={true}
                         style={{
                           height: 44,
                           fontSize: 14,
                           lineHeight: '36px',
                           marginBottom: 5,
                         }}
                         afterClose={() => this.props.onRemoveTag(tag)}>
                      {isLongTag ? `${tag.slice(0, 25)}...` : tag}
                    </Tag>
                );
                return isLongTag ?
                    <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> :
                    tagElem;
              })}
            </Card>
            <Card noHovering={true}
                  loading={this.props.fetchingCategories}
                  title="Product Thumbnail"
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: cardMediaQuery.matches ? 270 : 300,
                    padding: 5,
                  }}
                  style={{
                    marginLeft: cardMediaQuery.matches ? 0 : 20,
                    marginTop: 20,
                    marginBottom: 20,
                  }}>
              <span>
                {this.props.imageUrl ?
                    <Card bordered={false}
                          noHovering={true}
                          bodyStyle={{
                            width: cardMediaQuery.matches ? 260 : 290,
                            padding: 0,
                          }}>
                      <img className="product-thumbnail-create"
                           style={{
                             maxWidth: cardMediaQuery.matches ?
                                 260 :
                                 290,
                           }}
                           src={this.props.imageUrl}
                           onClick={this.props.onShowUploadsModal}/>
                    </Card>
                    :
                    null
                }
                {this.props.imageUrl ?
                    <div>
                      <div>
                        <i>Click the image to change it</i>
                      </div>
                      <div className="div-as-link"
                           onClick={() => this.props.onChooseImageHandler('')}>
                        Click here to remove the thumbnail
                      </div>
                    </div>
                    :
                    <div className="div-as-link"
                         onClick={this.props.onShowUploadsModal}>
                      Select a thumbnail from the gallery
                    </div>
                }
              </span>
            </Card>
          </span>
            <Modal title="Pick an image"
                   wrapClassName="vertical-center-modal"
                   className="upload-modal-override"
                   width={ window.innerWidth }
                   visible={this.props.isModalVisible}
                   style={{ minHeight: window.innerHeight }}
                   footer={null}
                   onOk={this.props.onHideUploadsModal}
                   onCancel={this.props.onHideUploadsModal}>
              <UploadView/>
            </Modal>
            <Modal title="Pick images to show in product's gallery"
                   wrapClassName="vertical-center-modal"
                   className="upload-modal-override"
                   width={ window.innerWidth }
                   visible={this.props.isModalVisibleMultiple}
                   style={{ minHeight: window.innerHeight }}
                   footer={null}
                   onOk={this.props.onHideUploadsMultipleModal}
                   onCancel={this.props.onHideUploadsMultipleModal}>
              <UploadViewMultipleChoice/>
            </Modal>
          </Card>
        </div>
    );
  }
}

export default EditProduct;
