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

import Auth from '../../modules/Auth.js';

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
      selectedForSlider: [],
    };
  }

  getCurrentUrlsInArray = (url) => {
    let flag = false;
    for (let i = 0; i <= this.state.selectedUrlsArray.length; i++) {
      if (this.state.selectedUrlsArray[i] === url) {
        flag = true;
      }
    }

    return flag;
  };

  getSelectedImageUrls = () => {
    let selected = this.state.selectedUrlsArray;
    for (let i = 0; i < this.state.uploads.length; i++)
      if (this.state.uploads[i].isSelected === true &&
          this.getCurrentUrlsInArray(this.state.uploads[i].url) === false)
        selected.push(this.state.uploads[i].url);
    this.setState({
      selectedUrlsArray: selected,
    });

    if (this.props.modalFromSettings === true &&
        this.props.selectingSliderImages === false) {
      this.props.addPicturesToColumn(selected);
    }
  };

  onSelectImage = (index, image) => {
    let selectedForSlider = this.state.selectedForSlider;
    let images = this.state.uploads.slice();
    let img = images[index];
    if (img.hasOwnProperty('isSelected')) {

      if (this.props.modalFromSettings === true &&
          this.props.selectingSliderImages === false) {
        if (img.isSelected === true) {
          this.setState({
            hasSelectedNImages: this.state.hasSelectedNImages - 1,
          });
          img.isSelected = !img.isSelected;
        } else if (img.isSelected === false &&
            this.state.hasSelectedNImages < 2) {
          this.setState({
            hasSelectedNImages: this.state.hasSelectedNImages + 1,
          });
          img.isSelected = !img.isSelected;
        }
      } else if (this.props.modalFromSettings === true &&
          this.props.selectingSliderImages === true) {
        if (img.isSelected === false) {
          selectedForSlider.push(img.url);
          this.props.onSelectSliderImages(selectedForSlider);
        }
        else if (img.isSelected === true) {
          for (let i = 0; i < selectedForSlider.length; i++)
            if (selectedForSlider[i] === img.url)
              selectedForSlider[i] = '';
          this.props.onSelectSliderImages(selectedForSlider);
        }
        img.isSelected = !img.isSelected;
        this.setState({
          selectedForSlider: selectedForSlider,
        });
      } else if (this.props.modalFromSettings === false &&
          this.props.selectingSliderImages === false) {
        img.isSelected = !img.isSelected;
      }

    } else {
      if (this.props.modalFromSettings && this.state.hasSelectedNImages < 2 &&
          this.props.selectingSliderImages === false) {
        img.isSelected = true;

        this.setState({
          hasSelectedNImages: this.state.hasSelectedNImages + 1,
        });
      } else if (this.props.modalFromSettings &&
          this.props.selectingSliderImages) {
        selectedForSlider.push(img.url);
        this.props.onSelectSliderImages(selectedForSlider);
        img.isSelected = true;
        this.setState({
          selectedForSlider: selectedForSlider,
        });
      } else if (!this.props.modalFromSettings) {
        img.isSelected = true;
      }
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
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
      },
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

      if (this.props.selectingSliderImages) {
        this.props.onChangeSelectingSliderImages();
      }

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
