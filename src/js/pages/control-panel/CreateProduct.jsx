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
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import UploadView from '../upload-modal/UploadView.jsx';

const showHeader = false;

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingProductLink: false,
    };
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
          { 'indent': '-1' }, { 'indent': '+1' }],
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
      'link', 'video',
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

    const cardMediaQuery = window.matchMedia('(max-width: 1010px)');

    return (
        <Card bordered={false}
              noHovering={true}
              bodyStyle={{
                display: 'flex',
                flexDirection: cardMediaQuery.matches ? 'column-reverse' : '',
                padding: cardMediaQuery.matches ? 24 : 5,
              }}>
          <Form style={{ width: '100%' }}>
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
                        products/{productName.value}
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
                    type={this.state.editingProductLink ? 'primary' : 'default'}
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
            <span>
              <Card noHovering={true}
                    bodyStyle={{
                      padding: cardMediaQuery.matches ? '8px 8px' : '8px 14px',
                    }}>
                <Tabs tabPosition={cardMediaQuery.matches ? 'top' : 'left'}>
                  <TabPane key="0"
                           tab={<span><Icon type="layout"/>General</span>}>
                    <FormItem key="3"
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
                    <FormItem key="4"
                              label="Regular Price(ADD_CURRENCY)"
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
                          <Input onChange={this.props.onProductPriceChange}/>,
                      )}
                    </FormItem>
                    <FormItem key="5"
                              label="Sale Price(ADD_CURRENCY)"
                              help="The sale price with applied discounts."
                              {...formItemLayout}>
                      {getFieldDecorator('Product\'s sale price', {
                        rules: [
                          {
                            required: true,
                            setFieldsValue: this.props.salePrice,
                          },
                        ],
                      })(
                          <Input onChange={this.props.onSalePriceChange}/>,
                      )}
                    </FormItem>
                  </TabPane>
                  <TabPane key="1" tab={<span><Icon type="area-chart"/>Inventory</span>}>
                    <FormItem key="5"
                              label="Available in stock"
                              style={{ padding: 10, marginBottom: 0 }}
                              {...formItemLayout}>
                      <Checkbox checked={this.props.stockStatus}
                                onChange={this.props.onStockStatusChange}>
                        Will show product as available for purchase
                      </Checkbox>
                    </FormItem>
                    <FormItem key="6"
                              label="Show stock quantity"
                              style={{ padding: 10, marginBottom: 0 }}
                              {...formItemLayout}>
                      <Checkbox checked={this.props.showStockQuantity}
                                onChange={this.props.onShowStockQuantityChange}>
                        Will show how many products are left for this particular product
                      </Checkbox>
                    </FormItem>
                    <FormItem key="7"
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
                    <FormItem key="8"
                              label="Shipping fee(ADD_CURRENCY)"
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
                          <Input onChange={this.props.onShippingFeeChange}/>,
                      )}
                    </FormItem>
                    <FormItem key="9"
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
                    After I finish the process, I need to fetch all products in a select and modify these accordingly.
                  </TabPane>
                </Tabs>
              </Card>
            </span>
          </Form>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <Card noHovering={true}
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
                <span><Icon type="eye"/> Visibility: <b>Private</b></span>
              </span>
              <span style={{ display: 'flex', fontSize: 14, paddingBottom: 8 }}>
                <span><Icon
                    type="calendar"/> Latest modification: <b>{this.props.latestModification.toString()}</b></span>
              </span>
            </Card>
            <Card noHovering={true}
                  bodyStyle={{
                    display: 'flex',
                    width: cardMediaQuery.matches ? 285 : 300,
                    padding: cardMediaQuery.matches ? '8px 8px' : '8px 14px',
                  }}
                  style={{
                    marginLeft: cardMediaQuery.matches ? 0 : 20,
                    height: 50,
                    background: '#e5e3e3',
                  }}>
              <span style={{ display: 'flex', flex: 1, }}>
                <Button type='danger'
                        htmlType="button">
                Move to trash
              </Button>
              </span>
              <span style={{
                display: 'flex',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
                <Button type='primary'
                        htmlType="submit">
                Publish
              </Button>
              </span>
            </Card>
            <Card noHovering={true}
                  title="Product Categories"
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: cardMediaQuery.matches ? 285 : 300,
                    padding: 5,
                  }}
                  style={{
                    marginLeft: cardMediaQuery.matches ? 0 : 20,
                    marginTop: 20,
                  }}>
              <Table {...this.tableState}
                     rowSelection={rowSelection}
                     columns={categoriesTableColumns}
                     dataSource={categoriesTableContent}/>
            </Card>
            <Card noHovering={true}
                  title="Product Tags"
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: cardMediaQuery.matches ? 285 : 300,
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
                  title="Product Thumbnail"
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: cardMediaQuery.matches ? 285 : 300,
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
                            width: cardMediaQuery.matches ? 275 : 290,
                            padding: 0,
                          }}>
                      <img className="product-thumbnail-create"
                          style={{
                        maxWidth: cardMediaQuery.matches ?
                            275 :
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
                 width="auto"
                 visible={this.props.isModalVisible}
                 footer={null}
                 onOk={this.props.onHideUploadsModal}
                 onCancel={this.props.onHideUploadsModal}>
            <UploadView/>
          </Modal>
        </Card>
    );
  }
}

export default Form.create()(CreateProduct);
