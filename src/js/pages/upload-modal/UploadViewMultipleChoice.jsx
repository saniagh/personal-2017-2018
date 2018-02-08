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
      hasSelectedNImages: 0,
      selectedUrlsArray: [],
    };
  }

  getSelectedImageUrls = () => {
    let selected = [];
    for (let i = 0; i < this.state.uploads.length; i++)
      if (this.state.uploads[i].isSelected === true)
        selected.push(this.state.uploads[i].url);
    this.setState({
      selectedUrlsArray: selected,
    });

    if (this.props.modalFromSettings === true) {
      this.props.addPicturesToColumn(selected);
    }
  };

  onSelectImage = (index, image) => {
    let images = this.state.uploads.slice();
    let img = images[index];
    if (img.hasOwnProperty('isSelected')) {

      if (this.props.modalFromSettings && img.isSelected === true)
        this.setState({
          hasSelectedNImages: this.state.hasSelectedNImages - 1,
        });
      if (this.props.modalFromSettings && img.isSelected === false)
        this.setState({
          hasSelectedNImages: this.state.hasSelectedNImages + 1,
        });

      img.isSelected = !img.isSelected;
    } else {
      if (this.props.modalFromSettings && this.state.hasSelectedNImages < 2) {
        img.isSelected = true;
        this.setState({
          hasSelectedNImages: this.state.hasSelectedNImages + 1,
        });
      } else if (!this.props.modalFromSettings) img.isSelected = true;
    }

    this.setState({
      uploads: images,
    });

    this.getSelectedImageUrls();
  };

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

      let selectedKeys = [];

      let uploads = Object.keys(this.state.uploads).map((key) => {

        if (this.props.imageUrlsArray)
          this.props.imageUrlsArray.map((image) => {
            if (image === this.state.uploads[key].url)
              selectedKeys.push(key);
          });

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

      for (let i = 0; i <= selectedKeys.length; i++) {
        this.onSelectImage(selectedKeys[i]);
      }

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

  onChooseImagesFunction = () => {
    this.handlers.onChooseMultipleImagesHandler(this.state.selectedUrlsArray);
    this.handlers.onHideUploadsMultipleModal();

    if (this.props.modalFromSettings === true) {

      // Reset the reducer to avoid multiple options having the same pictures
      this.handlers.onChooseMultipleImagesHandler([]);
      this.props.getCurrentOptionKey(-1);
      this.onUpdate();
      this.setState({
        selectedUrlsArray: [],
        hasSelectedNImages: 0,
      });
    }
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

const mapStateToProps = (state) => {
  return {
    imageUrlsArray: state.uploadReducer.imageUrlsArray,
  };
};

export default connect(mapStateToProps)(UploadViewMultipleChoice);
