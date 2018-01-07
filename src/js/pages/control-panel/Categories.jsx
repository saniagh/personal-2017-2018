import React, { Component } from 'react';

import {
  Card,
  Input,
  Form,
  Select,
  Button,
  Table,
  Modal,
  Avatar,
} from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

import UploadView from '../upload-modal/UploadView.jsx';

const expandedRowRender = record => <p>{record.categoryDescription}</p>;
const showHeader = true;

class Categories extends Component {
  onShowUploadModal = () => {
    this.props.onShowUploadsModal();
  };

  onHideUploadModal = () => {
    this.props.onHideUploadsModal();
  };

  rowState = {
    selectedRowKeys: [],
  };

  tableState = {
    bordered: false,
    loading: false,
    pagination: true,
    size: 'default',
    expandedRowRender,
    showHeader,
  };

  render() {
    if (this.props.shouldResetForm) {
      this.props.form.resetFields();
      this.props.onFormReset();
    }

    const { getFieldDecorator } = this.props.form;
    const categoryName = this.props.categoryName;
    const categoryDescriptor = this.props.categoryDescriptor;
    const categoryParent = this.props.categoryParent;
    const categoryDescription = this.props.categoryDescription;

    let parentsOptions;
    let categoriesTableColumns = [];
    let categoriesTableContent;

    if (this.props.fetchingCategories) {
      parentsOptions = <Option key="0">Loading...</Option>;
      categoriesTableColumns = [
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
        { title: 'Loading...' },
      ];
    }

    if (this.props.fetchedCategories) {
      parentsOptions = this.props.categories.map((category, i) => {
        return <Option key={i}
                       value={category.categoryName}>
          {category.categoryName}
        </Option>;
      });
      categoriesTableColumns = [
        {
          title: 'Image',
          dataIndex: 'categoryMiniature',
          key: 'categoryMiniature',
          render: text => <Avatar size="large"
                                  shape="square"
                                  style={{ cursor: 'pointer' }}
                                  src={text}/>,
        },
        {
          title: 'Name',
          dataIndex: 'categoryName',
          key: 'categoryName',
        },
        {
          title: 'Description',
          dataIndex: 'categoryDescription',
          key: 'categoryDescription',
        },
        {
          title: 'Descriptor',
          dataIndex: 'categoryDescriptor',
          key: 'categoryDescriptor',
        },
        {
          title: 'Parent',
          dataIndex: 'categoryParent',
          key: 'categoryParent',
        },
      ];
      categoriesTableContent = this.props.categories.map((category, i) => {
        return {
          key: i,
          categoryMiniature: category.categoryMiniature,
          categoryName: category.categoryName,
          categoryDescription: category.categoryDescription,
          categoryDescriptor: category.categoryDescriptor,
          categoryParent: category.categoryParent,
        };
      });
    }

    if (this.props.fetchingCategoriesError) {
      parentsOptions = <Option key="0" disabled>An error has occurred.</Option>;
      categoriesTableColumns = [
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
                loading={this.props.deletingCategories}
                onClick={() => {
                  this.props.onDeleteSelectedRows();
                  this.rowState.selectedRowKeys = [];
                }
                }>
          {this.props.deletingCategories ?
              <span>Working...</span>
              :
              <span>Delete selected categories</span>
          }
        </Button>;

    const footer = () =>
        <Button type="danger"
                htmlType="submit"
                loading={this.props.deletingCategories}
                onClick={() => {
                  this.props.onDeleteSelectedRows();
                  this.rowState.selectedRowKeys = [];
                }
                }>
          {this.props.deletingCategories ?
              <span>Working...</span>
              :
              <span>Delete selected categories</span>
          }
        </Button>;

    const mediaQuery = window.matchMedia('(max-width: 1200px)');
    const cardMediaQuery = window.matchMedia('(max-width: 768px)');

    return (
        <Card className="categories-wrap"
              bordered={false}
              noHovering={true}
              bodyStyle={mediaQuery.matches ?
                  {
                    display: 'flex',
                    flexDirection: 'column',
                    padding: cardMediaQuery.matches ? 5 : 24,
                    maxWidth: '100vh',
                  } :
                  {
                    display: 'flex',
                    flex: 1,
                  }}>
          <Card bordered={false}
                noHovering={true}
                title="Add a new category"
                style={mediaQuery.matches ?
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '100%',
                    }
                    : {
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'column',
                      maxWidth: '35%',
                    }
                }
                bodyStyle={{ padding: 0 }}>
            <Form>
              <FormItem key="0"
                        label="Name"
                        help={categoryName.errorMsg ?
                            categoryName.errorMsg :
                            'Category\'s name as it appears on the website'}
                        hasFeedback>
                {getFieldDecorator('Category\'s name', {
                  rules: [
                    {
                      required: true,
                    },
                    {
                      min: 1,
                      max: 64,
                    },
                    { setFieldsValue: categoryName.value, },
                  ],
                })(
                    <Input onChange={this.props.onCategoryNameChange}/>,
                )}
              </FormItem>
              <FormItem key="1"
                        label="Descriptor"
                        help={categoryDescriptor.errorMsg ?
                            categoryDescriptor.errorMsg :
                            'A descriptor is used for linking categories to one another.'}
                        hasFeedback>
                {getFieldDecorator('Category\'s descriptor', {
                  rules: [
                    {
                      required: true,
                    },
                    {
                      min: 1,
                      max: 64,
                    },
                    { setFieldsValue: categoryDescriptor.value, },
                  ],
                })(
                    <Input onChange={this.props.onCategoryDescriptorChange}/>,
                )}
              </FormItem>
              <FormItem key="2"
                        label="Category's parent category"
                        help="To create a hierarchy, specify another category as the parent of the one you are creating now. For example, Electronics would be a parent category for Smartphones or Computers">
                <Select showSearch
                        notFoundContent="No matches found."
                        onChange={this.props.onCategoryParentChange}>
                  {parentsOptions}
                </Select>
              </FormItem>
              <FormItem key="3"
                        label="Description"
                        help={categoryDescription.errorMsg ?
                            categoryDescription.errorMsg :
                            'A description is not always necessary, but you can still show one as a tooltip.'}
                        hasFeedback>
                {getFieldDecorator('Category\'s description', {
                  rules: [
                    {
                      min: 1,
                      max: 256,
                    },
                    { setFieldsValue: categoryDescription.value, },
                  ],
                })(
                    <TextArea autosize
                              onChange={this.props.onCategoryDescriptionChange}/>,
                )}
              </FormItem>
              <FormItem key="4">
                <Card bordered={false}
                      noHovering={true}
                      bodyStyle={{
                        padding: 0,
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-start',
                      }}>
                  <Avatar shape="square"
                          size="large"
                          src={this.props.imageUrl ?
                              this.props.imageUrl :
                              `/images/placeholder.png`}
                          style={{ cursor: 'pointer' }}
                          onClick={this.onShowUploadModal}/>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 5,
                  }}>
                    <Button type="default"
                            onClick={this.onShowUploadModal}>
                      Upload/Add an image
                    </Button>
                  </div>
                </Card>
              </FormItem>
              <FormItem key="5">
                <div style={{
                  padding: 0,
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                  <Button type="primary"
                          htmlType="submit"
                          loading={this.props.savingCategory}
                          onClick={() => {
                            this.props.onSaveCategory();
                          }
                          }>
                    {this.props.savingCategory ?
                        <span>Working...</span>
                        :
                        <span>Add the category</span>
                    }
                  </Button>
                </div>
              </FormItem>
            </Form>
          </Card>
          <Card bordered={false}
                noHovering={true}
                style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <Table {...this.tableState}
                   title={title}
                   footer={footer}
                   rowSelection={rowSelection}
                   columns={categoriesTableColumns}
                   dataSource={categoriesTableContent}/>
          </Card>
          <Modal title="Pick an image"
                 wrapClassName="vertical-center-modal"
                 width="auto"
                 visible={this.props.isModalVisible}
                 style={{ maxWidth: window.innerWidth }}
                 footer={null}
                 onOk={this.onHideUploadModal}
                 onCancel={this.onHideUploadModal}>
            <UploadView/>
          </Modal>
        </Card>
    );
  }
}

export default Form.create()(Categories);
