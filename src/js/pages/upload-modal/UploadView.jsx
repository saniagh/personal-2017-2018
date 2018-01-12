import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import {
  onChooseImage,
} from './uploadActions.js';
import {
  onHideUploadsModalAction,
} from '../control-panel/categoriesActions.js';

import UploadC from './Upload.jsx';

let createHandlers = function (dispatch) {
  let onChooseImageHandler = function (imageUrl) {
    dispatch(onChooseImage(imageUrl));
  };

  let onHideUploadsModal = function () {
    dispatch(onHideUploadsModalAction());
  };

  return {
    onChooseImageHandler,
    onHideUploadsModal,
  };
};

class UploadView extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      uploads: [],
      fetchingUploads: false,
      fetchedUploads: false,
      fetchingUploadsError: false,
      hasSelectedPicture: false,
      selectedPictureIndex: -1,
      selectedDisplayName: '',
      selectedUrl: '',
      selectedCreatedAt: '',
    };
  }

  onSelectImage = (index, image) => {
    let images = this.state.uploads.slice();
    let img = images[index];
    if (this.state.hasSelectedPicture === false) {
      img.isSelected = true;
      this.setState({
        uploads: images,
        hasSelectedPicture: true,
        selectedPictureIndex: index,
        selectedDisplayName: images[index].displayName,
        selectedUrl: images[index].url,
        selectedCreatedAt: images[index].createdAt,
      });
    } else {
      images[this.state.selectedPictureIndex].isSelected = false;
      if (this.state.selectedPictureIndex !== index) {
        img.isSelected = true;
        this.setState({
          uploads: images,
          hasSelectedPicture: true,
          selectedPictureIndex: index,
          selectedDisplayName: images[index].displayName,
          selectedUrl: images[index].url,
          selectedCreatedAt: images[index].createdAt,
        });
      } else {
        this.setState({
          uploads: images,
          hasSelectedPicture: false,
          selectedDisplayName: '',
          selectedUrl: '',
          selectedCreatedAt: '',
        });
      }
    }
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

      let selectedKey;

      let uploads = Object.keys(this.state.uploads).map((key) => {
        if (this.props.imageUrl === this.state.uploads[key].url)
          selectedKey = key;
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

      this.onSelectImage(selectedKey);

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

  onSelectedDisplayNameChange = (e) => {
    this.setState({
      selectedDisplayName: e.target.value,
    });
    if (e.target.value.length && e.target.value.length !== 0 &&
        e.target.value.length < 64)
      axios({
        method: 'post',
        url: '/upload/changeImageDisplayName',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          selectedUrl: this.state.selectedUrl,
          selectedDisplayName: e.target.value,
        }),
      }).then(() => {
        this.onUpdate();
      });
  };

  onChooseImageFunction = () => {
    this.handlers.onChooseImageHandler(this.state.selectedUrl);
    this.handlers.onHideUploadsModal();
  };

  render() {

    return <UploadC uploads={this.state.uploads}
                    fetchingUploads={this.state.fetchingUploads}
                    fetchedUploads={this.state.fetchedUploads}
                    fetchingUploadsError={this.state.fetchingUploadsError}
                    selectedDisplayName={this.state.selectedDisplayName}
                    selectedUrl={this.state.selectedUrl}
                    selectedCreatedAt={this.state.selectedCreatedAt}
                    onUpdate={this.onUpdate}
                    onSelectImage={this.onSelectImage}
                    onSelectedDisplayNameChange={this.onSelectedDisplayNameChange}
                    onChooseImageFunction={this.onChooseImageFunction}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    imageUrl: state.uploadReducer.imageUrl,
  };
};

export default connect(mapStateToProps)(UploadView);
