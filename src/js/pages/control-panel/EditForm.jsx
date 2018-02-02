import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  Form,
  Input,
  Button,
  Card,
  Table,
  Tag,
  Tooltip,
  Icon,
  Checkbox,
  Tabs,
  Avatar,
  Select,
  Switch,
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const EditForm = Form.create({
  mapPropsToFields(props) {
    return {
      productName: {
        ...props.productName,
        value: props.productName.value,
      },
      productLink: { value: props.productLink },
      sku: { value: props.sku },
      productPrice: { value: props.productPrice },
      salePrice: { value: props.salePrice },
      stockQuantity: { value: props.stockQuantity },
      shippingFee: { value: props.shippingFee },
    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  const cardMediaQuery = window.matchMedia('(max-width: 768px)');

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

  if (props.fetchingProducts) {
    upSellOptions = <Option key="0">Loading...</Option>;
    crossSellOptions = <Option key="0">Loading...</Option>;
  }

  if (props.fetchedProducts) {
    upSellOptions = props.products.map((product, i) => {
      if (product.sku !== props.sku)
        return <Option key={i}
                       value={product.productLink}>
          <div>
            <Avatar shape="square"
                    style={{ cursor: 'pointer', verticalAlign: 'middle' }}
                    src={product.productThumbnail}/>
            <span style={{
              marginLeft: 5,
              verticalAlign: 'middle',
              fontSize: 14,
            }}>{product.productName +
            product.sku}</span>
          </div>
        </Option>;
    });
    crossSellOptions = props.products.map((product, i) => {
      if (product.sku !== props.sku)
        return <Option key={i}
                       value={product.productLink}>
          <div>
            <Avatar shape="square"
                    style={{ cursor: 'pointer', verticalAlign: 'middle' }}
                    src={product.productThumbnail}/>
            <span style={{
              marginLeft: 5,
              verticalAlign: 'middle',
              fontSize: 14,
            }}>{product.productName +
            product.sku}</span>
          </div>
        </Option>;
    });
  }

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

  const editorQuery1 = window.matchMedia('(max-width: 1788px)');

  let formWidth = '100%';

  if (editorQuery1.matches && !cardMediaQuery.matches) {
    formWidth = '57%';
  } else if (cardMediaQuery.matches) {
    formWidth = '100%';
  }

  return (
      <Form style={{ width: formWidth }}>
        <Card loading={props.fetchingProduct}
              bordered={false}
              noHovering={true}
              bodyStyle={{
                padding: 0,
                margin: 0,
              }}>
          <FormItem key="0"
                    style={{ marginBottom: 4, width: '100%' }}
                    hasFeedback>
            {getFieldDecorator('productName', {
              rules: [
                {
                  required: true,
                  setFieldsValue: props.productName.value,
                },
              ],
            })(
                <Input placeholder="Product's name"
                       style={{ width: '100%', fontSize: 16 }}
                       onChange={props.onProductNameChange}/>,
            )}
          </FormItem>
          <FormItem key="1">
                <span style={{ display: 'flex', }}>
                  <span style={{ display: 'flex', }}>
                    <b>Permalink: </b>
                    {props.productLink.length === 0 ?
                        <span style={{ display: 'flex', marginLeft: 3 }}>
                          products/{props.productName.value.toLowerCase().
                            replace(/\s/g, '-')}
                        </span>
                        :
                        <span style={{ display: 'flex', marginLeft: 3 }}>
                          products/{props.productLink}
                        </span>}
                    {props.editingProductLink ?
                        <Input style={{ marginLeft: 10 }}
                               value={props.productLink}
                               onChange={props.onProductLinkChange}/>
                        :
                        null
                    }
                  </span>
                  <Button
                      type={props.editingProductLink ?
                          'primary' :
                          'default'}
                      style={{ marginLeft: 10 }}
                      onClick={props.onEditProductLinkToggle}>
                        {props.editingProductLink ?
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
                        onChange={props.onProductDescriptionChange}
                        value={props.productDescription}
                        modules={modules}
                        formats={formats}/>
          </FormItem>
        </Card>
        <span>
              <Card noHovering={true}
                    loading={props.fetchingProduct}
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
                           onClick={props.onShowUploadsMultipleModal}>
                        <div className="div-as-link">Click here to create a gallery to show on the product's page.</div>
                        <div style={{ marginLeft: 5 }}>
                          Current status: {props.imageUrlsArray &&
                        props.imageUrlsArray.length > 0 ?
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
                              checked={props.productFeatured}
                              onChange={props.onProductFeaturedToggle}>

                      </Switch>
                    </FormItem>
                    <FormItem key="5"
                              label="SKU"
                              help="Stock keeping unit"
                              {...formItemLayout}>
                      {getFieldDecorator('sku', {
                        rules: [
                          {
                            setFieldsValue: props.sku,
                          },
                        ],
                      })(
                          <Input onChange={props.onSKUChange}/>,
                      )}
                    </FormItem>
                    <FormItem key="6"
                              label={props.fetchedSettings ?
                                  `Regular Price (` + props.currency[1] +
                                  `)` :
                                  `Loading`}
                              help="The price that you want to sell this product for, without discounts and excluding shipping fees"
                              {...formItemLayout}>
                      {getFieldDecorator('productPrice', {
                        rules: [
                          {
                            required: true,
                            setFieldsValue: props.productPrice,
                          },
                        ],
                      })(
                          <Input onChange={props.onProductPriceChange}
                                 placeholder="Use a dot to separate decimals."/>,
                      )}
                    </FormItem>
                    <FormItem key="7"
                              label={props.fetchedSettings ?
                                  `Sale Price (` + props.currency[1] +
                                  `)` :
                                  `Loading`}
                              help="The sale price with applied discounts."
                              {...formItemLayout}>
                      {getFieldDecorator('salePrice', {
                        rules: [
                          {
                            setFieldsValue: props.salePrice,
                          },
                        ],
                      })(
                          <Input onChange={props.onSalePriceChange}
                                 placeholder="Use a dot to separate decimals."/>,
                      )}
                    </FormItem>
                  </TabPane>
                  <TabPane key="1" tab={<span><Icon type="area-chart"/>Inventory</span>}>
                    <FormItem key="8"
                              label="Available in stock"
                              style={{ padding: 10, marginBottom: 0 }}
                              {...formItemLayout}>
                      <Checkbox checked={props.stockStatus}
                                onChange={props.onStockStatusChange}>
                        Will show product as available for purchase
                      </Checkbox>
                    </FormItem>
                    <FormItem key="9"
                              label="Show stock quantity"
                              style={{ padding: 10, marginBottom: 0 }}
                              {...formItemLayout}>
                      <Checkbox checked={props.showStockQuantity}
                                onChange={props.onShowStockQuantityChange}>
                        Will show how many products are left for this particular product
                      </Checkbox>
                    </FormItem>
                    <FormItem key="10"
                              label="Stock Quantity"
                              help="Number of units available in stock."
                              {...formItemLayout}>
                      {getFieldDecorator('stockQuantity', {
                        rules: [
                          {
                            setFieldsValue: props.stockQuantity,
                          },
                        ],
                      })(
                          <Input onChange={props.onStockQuantityChange}/>,
                      )}
                    </FormItem>
                  </TabPane>
                  <TabPane key="2"
                           tab={<span><Icon type="car"/>Shipping</span>}>
                    <FormItem key="11"
                              label={props.fetchedSettings ?
                                  `Shipping fee (` + props.currency[1] +
                                  `)` :
                                  `Loading`}
                              help="The money you charge for shipping."
                              style={{ padding: 10, }}
                              {...formItemLayout}>
                      {getFieldDecorator('shippingFee', {
                        rules: [
                          {
                            setFieldsValue: props.shippingFee,
                          },
                        ],
                      })(
                          <Input onChange={props.onShippingFeeChange}
                                 placeholder="Use a dot to separate decimals."/>,
                      )}
                    </FormItem>
                    <FormItem key="12"
                              label="Available in store"
                              {...formItemLayout}>
                      <Checkbox checked={props.availableInStore}
                                onChange={props.onAvailableInStoreChange}>
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
                              defaultValue={props.upSellLink}
                              onChange={props.onUpSellLinkChange}>
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
                              defaultValue={props.crossSellLink}
                              onChange={props.onCrossSellLinkChange}>
                        {crossSellOptions}
                      </Select>
                    </FormItem>
                  </TabPane>
                </Tabs>
              </Card>
            </span>
      </Form>
  );
});

export default EditForm;
