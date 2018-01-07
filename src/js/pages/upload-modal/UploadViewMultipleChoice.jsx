import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  onChooseMultipleImages,
} from './uploadActions.js';
import {
  onHideUploadsMultipleModalAction
  ,
} from '../control-panel/productActions.js';

import UploadMultipleChoice from './UploadMultipleChoice.jsx';

let createHandlers = function (dispatch) {
  let onChooseMultipleImagesHandler = function (imageUrlsArray) {
    dispatch(onChooseMultipleImages(imageUrlsArray));
  };

  let onHideUploadsMultipleModal = function () {
    dispatch(onHideUploadsMultipleModalAction());
  };

  return {
    onChooseMultipleImagesHandler,
    onHideUploadsMultipleModal,
  };
};

class UploadViewMultipleChoice extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      uploads: [],
      fetchingUploads: false,
      fetchedUploads: false,
      fetchingUploadsError: false,
      selectedUrlsArray: [],
    };
  }

  onUpdate = () => {
    this.setState({
      fetchingUploads: true,
    });
    axios({
      method: 'get',
      url: '/upload/getAllUploads',
    }).then((res) => {
      this.setState({
        uploads: res.data.uploads,
        fetchingUploads: false,
        fetchedUploads: true,
        fetchingUploadsError: false,
      });
      let uploads = Object.keys(this.state.uploads).map((key) => {
        return {
          displayName: this.state.uploads[key].displayName,
          url: this.state.uploads[key].url,
          createdAt: this.state.uploads[key].createdAt,
          src: this.state.uploads[key].url,
          thumbnail: this.state.uploads[key].url,
          thumbnailWidth: 320,
          thumbnailHeight: 'auto',
          caption: this.state.uploads[key].uniqueName,
        };
      });
      this.setState({
        uploads: uploads,
      });
    }).catch(() => {
      this.setState({
        fetchingUploads: false,
        fetchingUploadsError: true,
      });
    });
  };

  componentDidMount() {
    this.onUpdate();
  }

  getSelectedImageUrls = () => {
    let selected = [];
    for (let i = 0; i < this.state.uploads.length; i++)
      if (this.state.uploads[i].isSelected === true)
        selected.push(this.state.uploads[i].url);
    this.setState({
      selectedUrlsArray: selected,
    });
  };

  onSelectImage = (index, image) => {
    let images = this.state.uploads.slice();
    let img = images[index];
    if (img.hasOwnProperty('isSelected'))
      img.isSelected = !img.isSelected;
    else
      img.isSelected = true;

    this.setState({
      uploads: images,
    });

    this.getSelectedImageUrls();
  };

  onChooseImagesFunction = () => {
    this.handlers.onChooseMultipleImagesHandler(this.state.selectedUrlsArray);
    this.handlers.onHideUploadsMultipleModal();
  };

  render() {
    return <UploadMultipleChoice uploads={this.state.uploads}
                                 fetchingUploads={this.state.fetchingUploads}
                                 fetchedUploads={this.state.fetchedUploads}
                                 fetchingUploadsError={this.state.fetchingUploadsError}
                                 selectedUrlsArray={this.state.selectedUrlsArray}
                                 onUpdate={this.onUpdate}
                                 onSelectImage={this.onSelectImage}
                                 onChooseImagesFunction={this.onChooseImagesFunction}/>;
  }
}

export default connect()(UploadViewMultipleChoice);
