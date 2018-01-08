import React from 'react';
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
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const showHeader = true;

// Must be outside of the component, otherwise it will always return to an empty array
const rowState = {
  selectedRowKeys: [],
  selectedRowsIdentifier: [],
};

const QuickEditForm = Form.create({
  mapPropsToFields(props) {
    return {
      productName: {
        ...props.productName,
        value: props.productName.value,
      },
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

  const tableState = {
    bordered: false,
    loading: false,
    pagination: true,
    size: 'default',
    showHeader,
  };

  let categoriesTableColumns = [];
  let categoriesTableContent;

  if (props.fetchingCategories) {
    categoriesTableColumns = [
      { title: 'Loading...' },
    ];
  }

  if (props.fetchedCategories) {
    categoriesTableColumns = [
      {
        title: 'Name',
        dataIndex: 'categoryName',
        key: 'categoryName',
      },
    ];
    categoriesTableContent = props.categories.map((category, i) => {
      return {
        key: i,
        categoryName: category.categoryName,
      };
    });

    for (let i = 0; i < props.categories.length; i++) {
      for (let j = 0; j < props.productCategory.length; j++) {
        if (props.categories[i].categoryName === props.productCategory[j])
          rowState.selectedRowKeys.push(i);
      }
    }

    if (props.productCategory[0] === 'Uncategorized') {
      rowState.selectedRowKeys = [];
    }
  }

  if (props.fetchingCategoriesError) {
    categoriesTableColumns = [
      { title: 'An error has occurred.' },
    ];
  }

  const rowSelection = {
    selectedRowKeys: rowState.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      rowState.selectedRowKeys = selectedRowKeys;
      props.onRowSelectionCategories(selectedRows);
    },
  };

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

  return (
      <Card bordered={false}
            noHovering={true}
            bodyStyle={{
              display: 'flex',
              flexDirection: cardMediaQuery.matches ?
                  'column-reverse' :
                  '',
              padding: cardMediaQuery.matches ? 0 : 5,
            }}>
        <Form style={{ width: '100%' }}>
          <Card bordered={false}
                noHovering={true}
                bodyStyle={{
                  padding: 0,
                  margin: 0,
                }}>
            <FormItem key="0"
                      style={{ marginBottom: 4 }}
                      hasFeedback>
              {getFieldDecorator('productName', {
                rules: [
                  {
                    required: true,
                    setFieldsValue: props.productName,
                  },
                ],
              })(
                  <Input placeholder="Product's name"
                         style={{ fontSize: 16 }}
                         onChange={props.onProductNameChange}/>,
              )}
            </FormItem>
          </Card>
          <span>
            <Card noHovering={true}
                  bodyStyle={{
                    padding: cardMediaQuery.matches ? '8px 8px' : '8px 14px',
                  }}>
              <Tabs tabPosition={cardMediaQuery.matches ? 'top' : 'left'}>
                <TabPane key="0"
                         tab={<span><Icon type="layout"/>General</span>}>
                    <FormItem key="1"
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
                              label="Regular Price(ADD_CURRENCY)"
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
                              label="Sale Price(ADD_CURRENCY)"
                              help="The sale price with applied discounts."
                              {...formItemLayout}>
                      {getFieldDecorator('salePrice', {
                        rules: [
                          {
                            setFieldsValue: props.salePrice,
                          },
                        ],
                      })(
                          <Input onChange={props.onSalePriceChange}/>,
                      )}
                    </FormItem>
                </TabPane>
                <TabPane key="1"
                         tab={<span><Icon type="area-chart"/>Inventory</span>}>
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
                              label="Shipping fee(ADD_CURRENCY)"
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
                          <Input onChange={props.onShippingFeeChange}/>,
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
              </Tabs>
            </Card>
          </span>
        </Form>
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <Card noHovering={true}
                loading={props.fetchingCategories}
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
                    <FormItem key="13"
                              label={<span style={{
                                fontSize: 14,
                                fontWeight: 300,
                              }}>
                                <Icon type="eye"
                                      style={{ marginRight: 2 }}/>Visibility</span>}
                              style={{ display: 'flex', margin: 0 }}>
                      <Checkbox checked={props.productVisibility}
                                onChange={props.onProductVisibilityChange}>
                        {props.productVisibility ? 'Public' : 'Private'}
                      </Checkbox>
                    </FormItem>
                  </Form>
                </span>
              </span>
              <span style={{ display: 'flex', fontSize: 14, paddingBottom: 8 }}>
                <span><Icon
                    type="calendar"/> Latest modification: <b>{props.latestModification.toString()}</b></span>
              </span>
            </Card>
          <Card noHovering={true}
                loading={props.fetchingCategories}
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
                          htmlType="submit"
                          onClick={props.onQuickUpdateFinish}
                          loading={props.updatingProduct}>
                    {props.updatingProduct ?
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
                  width: cardMediaQuery.matches ? 285 : 300,
                  padding: 5,
                }}
                style={{
                  marginLeft: cardMediaQuery.matches ? 0 : 20,
                  marginTop: 20,
                }}>
            <Table {...tableState}
                   loading={props.fetchingCategories}
                   rowSelection={rowSelection}
                   columns={categoriesTableColumns}
                   dataSource={categoriesTableContent}/>
          </Card>
          <Card noHovering={true}
                loading={props.fetchingCategories}
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
                      <Input value={props.tagInput}
                             onChange={props.onTagInputChange}
                             onKeyDown={props.handleKeyPressAddTag}/>
                      <Button type="default"
                              onClick={() => props.onAddTag(
                                  props.tagInput)}>
                        Add
                      </Button>
                    </span>
              </FormItem>
            </Form>
            {props.tags.map((tag, i) => {
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
                       afterClose={() => props.onRemoveTag(tag)}>
                    {isLongTag ? `${tag.slice(0, 25)}...` : tag}
                  </Tag>
              );
              return isLongTag ?
                  <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> :
                  tagElem;
            })}
          </Card>
        </span>
      </Card>
  );
});

export default QuickEditForm;
