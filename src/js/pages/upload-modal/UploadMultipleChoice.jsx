import React, { Component } from 'react';
import { Upload, Icon, Tabs, Card, Button } from 'antd';
import Gallery from 'react-grid-gallery';

const UploadDragger = Upload.Dragger;
const TabPane = Tabs.TabPane;

class UploadMultipleChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [{}],
    };
  }

  handleChange = (info) => {
    let fileList = info.fileList;
    fileList = fileList.filter((file) => {
      if (file.response) {
        this.props.onUpdate();
        return file.response.status === 'success';
      }

      return true;
    });
    this.setState({ fileList });
  };

  render() {
    return (
        <Tabs defaultActiveKey="0">
          <TabPane tab={<span><Icon type="inbox"/>Upload files</span>}
                   key="0">
            <div>
              <UploadDragger name='upload-file'
                             action='/upload/upload'
                             style={{ padding: 80 }}
                             multiple={true}
                             onChange={this.handleChange}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox"/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area
                  to
                  upload</p>
                <div className="ant-upload-hint">Max. dimension for upload:
                  20MB.
                </div>
              </UploadDragger>
            </div>
          </TabPane>
          <TabPane tab={<span><Icon type="picture"/>Media library</span>}
                   key="1">
            <div style={{ marginBottom: 10, textAlign: 'right' }}>
              <Button type="primary"
                      onClick={this.props.onChooseImagesFunction}>
                Choose selected images
              </Button>
            </div>
            <div style={{ maxWidth: '100vh !important' }}>
              ss
              <Gallery images={this.props.uploads}
                       onSelectImage={this.props.onSelectImage}
                       enableLightbox={false}
                       onClickThumbnail={this.props.onSelectImage}
              />
            </div>
          </TabPane>
        </Tabs>
    );
  }
}

export default UploadMultipleChoice;
