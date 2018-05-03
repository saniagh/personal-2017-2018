import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  Card,
  Form,
  Select,
  Input,
  Button,
  Icon,
  Table,
  Tabs,
  Checkbox,
  Tag,
  Tooltip,
  Modal,
  Switch,
  Avatar,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import UploadView from '../upload-modal/UploadView.jsx';
import UploadViewMultipleChoice from '../upload-modal/UploadViewMultipleChoice.jsx';

const showHeader = false;

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingProductLink: false,
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
  };

  tableState = {
    bordered: false,
    loading: false,
    pagination: true,
    size: 'default',
    showHeader,
  };

  onEditProductLinkToggle = () => {
    if (this.props.productLink.length === 0 &&
        this.props.productName.value.length !== 0)
      this.props.onProductLinkChange(this.props.productName.value);

    this.setState({
      editingProductLink: !this.state.editingProductLink,
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const productName = this.props.productName;
    const productLink = this.props.productLink;

    let categoriesTableColumns = [];
    let categoriesTableContent;

    if (this.props.fetchingCategories) {
      categoriesTableColumns = [
        { title: 'Loading...' },
      ];
    }

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
    }

    if (this.props.fetchingCategoriesError) {
      categoriesTableColumns = [
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

    const modules = {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
        ['link', 'video'],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };

    const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'video', 'align',
    ];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    let upSellOptions;
    let crossSellOptions;

    if (this.props.fetchingProducts) {
      upSellOptions = <Option key="0">Loading...</Option>;
      crossSellOptions = <Option key="0">Loading...</Option>;
    }

    if (this.props.fetchedProducts) {
      upSellOptions = this.props.products.map((product, i) => {
        return <Option key={i}
                       value={product._id}>
          <div>
            <Avatar shape="square"
                    style={{ cursor: 'pointer', verticalAlign: 'middle' }}
                    src={product.productThumbnail}/>
            <span style={{
              marginLeft: 5,
              verticalAlign: 'middle',
              fontSize: 14,
            }}>{product.productName + ' ' + product.sku}</span>
          </div>
        </Option>;
      });
      crossSellOptions = this.props.products.map((product, i) => {
        return <Option key={i}
                       value={product._id}>
          <div>
            <Avatar shape="square"
                    style={{ cursor: 'pointer', verticalAlign: 'middle' }}
                    src={product.productThumbnail}/>
            <span style={{
              marginLeft: 5,
              verticalAlign: 'middle',
              fontSize: 14,
            }}>{product.productName + ' ' + product.sku}</span>
          </div>
        </Option>;
      });
    }

    const cardMediaQuery = window.matchMedia('(max-width: 1100px)');
    const editorQuery1 = window.matchMedia('(max-width: 1788px)');

    let formWidth = '100%';

    if (editorQuery1.matches && !cardMediaQuery.matches) {
      formWidth = '57%';
    } else if (cardMediaQuery.matches) {
      formWidth = '100%';
    }

    return (
        <div className={this.state.mainClassName}>
          <Card bordered={false}
                noHovering={true}
                bodyStyle={{
                  display: 'flex',
                  flexDirection: cardMediaQuery.matches ? 'column-reverse' : '',
                  padding: cardMediaQuery.matches ? 24 : 5,
                }}>
            <Form style={{ width: formWidth }}>
              <Card loading={this.props.fetchingCategories}
                    bordered={false}
                    noHovering={true}
                    bodyStyle={{
                      padding: 0,
                      margin: 0,
                    }}>
                <FormItem key="0"
                          style={{ marginBottom: 4 }}
                          hasFeedback>
                  {getFieldDecorator('Product\'s name', {
                    rules: [
                      {
                        required: true,
                        setFieldsValue: productName.value,
                      },
                    ],
                  })(
                      <Input placeholder="Product's name"
                             style={{ width: '100%', fontSize: 16 }}
                             onChange={this.props.onProductNameChange}/>,
                  )}
                </FormItem>
                <FormItem key="1">
                <span style={{ display: 'flex', }}>
                  <span style={{ display: 'flex', }}>
                    <b>Permalink: </b>
                    {productLink.length === 0 ?
                        <span style={{ display: 'flex', marginLeft: 3 }}>
                          products/{productName.value.toLowerCase().
                            replace(/\s/g, '-')}
                        </span>
                        :
                        <span style={{ display: 'flex', marginLeft: 3 }}>
                          products/{productLink}
                        </span>}
                    {this.state.editingProductLink ?
                        <Input style={{ marginLeft: 10 }}
                               value={productLink}
                               onChange={this.props.onProductLinkChange}/>
                        :
                        null
                    }
                  </span>
                  <Button
                      type={this.state.editingProductLink ?
                          'primary' :
                          'default'}
                      style={{ marginLeft: 10 }}
                      onClick={this.onEditProductLinkToggle}>
                        {this.state.editingProductLink ?
                            <span>
                              Save
                            </span>
                            :
                            <span>
                              Edit
                            </span>
                        }
                  </Button>
                </span>
                </FormItem>
                <FormItem key="2">
                  <ReactQuill theme="snow"
                              onChange={this.props.onProductDescriptionChange}
                              value={this.props.productDescription}
                              modules={modules}
                              formats={formats}/>
                </FormItem>
              </Card>
              <span>
              <Card noHovering={true}
                    loading={this.props.fetchingCategories}
                    bodyStyle={{
                      padding: cardMediaQuery.matches ? '8px 8px' : '8px 14px',
                    }}>
                <Tabs tabPosition={cardMediaQuery.matches ? 'top' : 'left'}>
                  <TabPane key="0"
                           tab={<span><Icon type="layout"/>General</span>}>
                    <FormItem key="3"
                              label="Gallery"
                              {...formItemLayout}>
                      <div style={{ display: 'flex' }}
                           onClick={this.props.onShowUploadsMultipleModal}>
                        <div className="div-as-link">Click here to create a gallery to show on the product's page.</div>
                        <div style={{ marginLeft: 5 }}>
                          Current status: {this.props.imageUrlsArray &&
                        this.props.imageUrlsArray.length > 0 ?
                            <span style={{ color: 'green' }}>OK</span>
                            :
                            <span style={{ color: 'tomato' }}>NOT ADDED</span>
                        }
                        </div>
                      </div>
                    </FormItem>
                    <FormItem key="4"
                              label="Featured"
                              help="The product will be featured on the first page"
                              {...formItemLayout}>
                      <Switch style={{ width: 10 }}
                              checked={this.props.productFeatured}
                              onChange={this.props.onProductFeaturedToggle}>

                      </Switch>
                    </FormItem>
                    <FormItem key="5"
                              label="SKU"
                              help="Stock keeping unit"
                              {...formItemLayout}>
                      {getFieldDecorator('Product\'s sku', {
                        rules: [
                          {
                            setFieldsValue: this.props.sku,
                          },
                        ],
                      })(
                          <Input onChange={this.props.onSKUChange}/>,
                      )}
                    </FormItem>
                    <FormItem key="6"
                              label={this.props.fetchedSettings ?
                                  `Regular Price (` + this.props.currency[1] +
                                  `)` :
                                  `Loading`}
                              help="The price that you want to sell this product for, without discounts and excluding shipping fees"
                              {...formItemLayout}>
                      {getFieldDecorator('Product\'s regular price', {
                        rules: [
                          {
                            required: true,
                            setFieldsValue: this.props.productPrice,
                          },
                        ],
                      })(
                          <Input onChange={this.props.onProductPriceChange}
                                 placeholder="Use a dot to separate decimals."/>,
                      )}
                    </FormItem>
                    <FormItem key="7"
                              label={this.props.fetchedSettings ?
                                  `Sale Price (` + this.props.currency[1] +
                                  `)` :
                                  `Loading`}
                              help="The sale price with applied discounts."
                              {...formItemLayout}>
                      {getFieldDecorator('Product\'s sale price', {
                        rules: [
                          {
                            setFieldsValue: this.props.salePrice,
                          },
                        ],
                      })(
                          <Input onChange={this.props.onSalePriceChange}
                                 placeholder="Use a dot to separate decimals."/>,
                      )}
                    </FormItem>
                  </TabPane>
                  <TabPane key="1" tab={<span><Icon type="area-chart"/>Inventory</span>}>
                    <FormItem key="8"
                              label="Available in stock"
                              style={{ padding: 10, marginBottom: 0 }}
                              {...formItemLayout}>
                      <Checkbox checked={this.props.stockStatus}
                                onChange={this.props.onStockStatusChange}>
                        Will show product as available for purchase
                      </Checkbox>
                    </FormItem>
                    <FormItem key="9"
                              label="Show stock quantity"
                              style={{ padding: 10, marginBottom: 0 }}
                              {...formItemLayout}>
                      <Checkbox checked={this.props.showStockQuantity}
                                onChange={this.props.onShowStockQuantityChange}>
                        Will show how many products are left for this particular product
                      </Checkbox>
                    </FormItem>
                    <FormItem key="10"
                              label="Stock Quantity"
                              help="Number of units available in stock."
                              {...formItemLayout}>
                      {getFieldDecorator('Product\'s stock quantity', {
                        rules: [
                          {
                            setFieldsValue: this.props.stockQuantity,
                          },
                        ],
                      })(
                          <Input onChange={this.props.onStockQuantityChange}/>,
                      )}
                    </FormItem>
                  </TabPane>
                  <TabPane key="2"
                           tab={<span><Icon type="car"/>Shipping</span>}>
                    <FormItem key="11"
                              label={this.props.fetchedSettings ?
                                  `Shipping fee (` + this.props.currency[1] +
                                  `)` :
                                  `Loading`}
                              help="The money you charge for shipping."
                              style={{ padding: 10, }}
                              {...formItemLayout}>
                      {getFieldDecorator('Product\'s shipping fees', {
                        rules: [
                          {
                            setFieldsValue: this.props.shippingFee,
                          },
                        ],
                      })(
                          <Input onChange={this.props.onShippingFeeChange}
                                 placeholder="Use a dot to separate decimals."/>,
                      )}
                    </FormItem>
                    <FormItem key="12"
                              label="Available in store"
                              {...formItemLayout}>
                      <Checkbox checked={this.props.availableInStore}
                                onChange={this.props.onAvailableInStoreChange}>
                        The product can be picked up from the store without need for shipping fee
                      </Checkbox>
                    </FormItem>
                  </TabPane>
                  <TabPane key="3"
                           tab={<span><Icon
                               type="link"/>Linked Products</span>}>
                    <FormItem key="13"
                              label="Up-sell product link"
                              help="Similar product to the one you are adding."
                              style={{ padding: 10, }}
                              {...formItemLayout}>
                      <Select showSearch
                              style={{ height: 41 }}
                              notFoundContent="No matches found."
                              onChange={this.props.onUpSellLinkChange}>
                        {upSellOptions}
                      </Select>
                    </FormItem>
                    <FormItem key="14"
                              label="Cross-sell product link"
                              help="Product usually sold togheter with the one you are adding."
                              style={{ padding: 10, }}
                              {...formItemLayout}>
                      <Select showSearch
                              style={{ height: 41 }}
                              notFoundContent="No matches found."
                              onChange={this.props.onCrossSellLinkChange}>
                        {crossSellOptions}
                      </Select>
                    </FormItem>
                  </TabPane>
                </Tabs>
              </Card>
            </span>
            </Form>
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
                        onClick={() => this.props.router.history.replace(
                            '/control-panel/products')}>
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
                           onKeyDown={this.props.handleKeyPressAddTag}
                           autoComplete="on"/>
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

export default Form.create()(CreateProduct);
