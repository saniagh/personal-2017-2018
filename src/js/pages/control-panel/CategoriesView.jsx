import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { connect } from 'react-redux';
import {
  onShowUploadsModalAction,
  onHideUploadsModalAction,
} from './categoriesActions.js';
import {
  onChooseImage,
} from '../upload-modal/uploadActions.js';
import axios from 'axios';
import qs from 'qs';

import Categories from './Categories.jsx';

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

  return {
    onShowUploadsModal,
    onHideUploadsModal,
    onChooseImageHandler,
  };
};

class CategoriesView extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      fetchingCategories: false,
      fetchedCategories: false,
      fetchingCategoriesError: false,
      categories: [],
      categoryName: {
        value: '',
        errorMsg: '',
      },
      categoryDescriptor: {
        value: '',
        errorMsg: '',
      },
      categoryParent: '',
      categoryDescription: {
        value: '',
        errorMsg: '',
      },
      categoryMiniature: '',
      savingCategory: false,
      savedCategory: false,
      shouldResetForm: false,
      savingCategoryError: false,
      errorMessage: '',
      selectedRowsDescriptors: [],
      deletingCategories: false,
      deletedCategories: false,
      deletingCategoriesError: false,
      loadedPage: false,
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
        loadedPage: true,
      });
    }).catch(() => {
      this.setState({
        fetchingCategories: false,
        fetchingCategoriesError: true,
      });
    });
  }

  onCategoryNameChange = (e) => {
    this.setState({
      categoryName: {
        errorMsg: '',
        value: e.target.value,
      },
    });
    if (e.target.value.length === 0)
      this.setState({
        categoryName: {
          ...this.state.categoryName,
          errorMsg: 'This field cannot be empty.',
        },
      });
    if (e.target.value.length > 64)
      this.setState({
        categoryName: {
          ...this.state.categoryName,
          errorMsg: 'This field must only have fewer than 64 characters.',
        },
      });
  };

  onCategoryDescriptorChange = (e) => {
    this.setState({
      categoryDescriptor: {
        errorMsg: '',
        value: e.target.value,
      },
    });
    if (e.target.value.length === 0)
      this.setState({
        categoryDescriptor: {
          ...this.state.categoryDescriptor,
          errorMsg: 'This field cannot be empty.',
        },
      });
    if (e.target.value.length > 64)
      this.setState({
        categoryDescriptor: {
          ...this.state.categoryDescriptor,
          errorMsg: 'This field must only have fewer than 64 characters.',
        },
      });
  };

  onCategoryParentChange = (value) => {
    this.setState({
      categoryParent: value,
    });
  };

  onCategoryDescriptionChange = (e) => {
    this.setState({
      categoryDescription: {
        errorMsg: '',
        value: e.target.value,
      },
    });
    if (e.target.value.length > 256)
      this.setState({
        categoryDescription: {
          ...this.state.categoryDescription,
          errorMsg: 'This field must only have fewer than 256 characters.',
        },
      });
  };

  onCategoryMiniatureChange = (e) => {
    this.setState({
      categoryMiniature: e.target.value,
    });
  };

  onFormReset = () => {
    this.setState({
      shouldResetForm: false,
    });
  };

  onSaveCategory = () => {
    this.setState({
      savingCategory: true,
    });
    axios({
      method: 'post',
      url: '/products-categories/add-category',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        categoryName: this.state.categoryName.value,
        categoryDescriptor: this.state.categoryDescriptor.value,
        categoryParent: this.state.categoryParent,
        categoryDescription: this.state.categoryDescription.value,
        categoryMiniature: this.props.imageUrl,
      }),
    }).then(() => {

      notification.success({
        message: 'Success!',
        description: 'The category has been successfully added.',
      });

      // Important because the variable is shared between categories and adding a product
      this.handlers.onChooseImageHandler('');

      this.setState({
        savingCategory: false,
        savedCategory: true,
        shouldResetForm: true,
        savingCategoryError: false,
        categoryName: {
          value: '',
          errorMsg: '',
        },
        categoryDescriptor: {
          value: '',
          errorMsg: '',
        },
        categoryParent: '',
        categoryDescription: {
          value: '',
          errorMsg: '',
        },
        categoryMiniature: '',
      });
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
    }).catch((err) => {

      notification.error({
        message: 'Failure',
        description: 'The category has not been added.',
      });

      this.setState({
        savingCategory: false,
        savedCategory: false,
        savingCategoryError: true,
        errorMessage: err.response.data.message,
      });
    });
  };

  onRowSelection = (selectedRows) => {
    this.setState({
      selectedRowsDescriptors: Object.keys(selectedRows).map((i) => {
        return { descriptor: selectedRows[i].categoryDescriptor };
      }),
    });
  };

  onDeleteSelectedRows = () => {
    const selectedRowsDescriptors =
        JSON.stringify(this.state.selectedRowsDescriptors);
    this.setState({
      deletingCategories: true,
    });
    axios({
      method: 'post',
      url: '/products-categories/delete-categories',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        selectedRowsDescriptors: selectedRowsDescriptors,
      }),
    }).then(() => {

      notification.success({
        message: 'Success!',
        description: 'The selected categories have been successfully deleted.',
      });

      this.setState({
        deletingCategories: false,
        deletedCategories: true,
        deletingCategoriesError: false,
      });
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
    }).catch(() => {

      notification.error({
        message: 'Failure',
        description: 'The selected categories have not been deleted.',
      });

      this.setState({
        deletingCategories: false,
        deletedCategories: false,
        deletingCategoriesError: true,
      });
    });
  };

  onShowUploadsModal = () => {
    this.handlers.onShowUploadsModal();
  };

  onHideUploadsModal = () => {
    this.handlers.onHideUploadsModal();
  };

  render() {
    return <Categories fetchingCategories={this.state.fetchingCategories}
                       fetchedCategories={this.state.fetchedCategories}
                       fetchingCategoriesError={this.state.fetchingCategoriesError}
                       categories={this.state.categories}
                       categoryName={this.state.categoryName}
                       categoryDescriptor={this.state.categoryDescriptor}
                       categoryParent={this.state.categoryParent}
                       categoryDescription={this.state.categoryDescription}
                       categoryMiniature={this.state.categoryMiniature}
                       savingCategory={this.state.savingCategory}
                       savedCategory={this.state.savedCategory}
                       shouldResetForm={this.state.shouldResetForm}
                       savingCategoryError={this.state.savingCategoryError}
                       errorMessage={this.state.errorMessage}
                       deletingCategories={this.state.deletingCategories}
                       deletedCategories={this.state.deletedCategories}
                       deletingCategoriesError={this.state.deletingCategoriesError}
                       isModalVisible={this.props.isModalVisible}
                       imageUrl={this.props.imageUrl}
                       loadedPage={this.state.loadedPage}
                       onCategoryNameChange={this.onCategoryNameChange}
                       onCategoryDescriptorChange={this.onCategoryDescriptorChange}
                       onCategoryParentChange={this.onCategoryParentChange}
                       onCategoryDescriptionChange={this.onCategoryDescriptionChange}
                       onCategoryMiniatureChange={this.onCategoryMiniatureChange}
                       onFormReset={this.onFormReset}
                       onSaveCategory={this.onSaveCategory}
                       onRowSelection={this.onRowSelection}
                       onDeleteSelectedRows={this.onDeleteSelectedRows}
                       onShowUploadsModal={this.onShowUploadsModal}
                       onHideUploadsModal={this.onHideUploadsModal}/>;
  }
}
CategoriesView.propTypes = {
  isModalVisible: PropTypes.bool,
  imageUrl: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    isModalVisible: state.categoriesReducer.isModalVisible,
    imageUrl: state.uploadReducer.imageUrl,
  };
};

export default connect(mapStateToProps)(CategoriesView);
