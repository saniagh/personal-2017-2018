import React, { Component } from 'react';
import { Upload, Icon, Tabs, Card, Spin } from 'antd';
import Gallery from 'react-grid-gallery';
import CustomizedForm from './CustomizedForm.jsx';

const UploadDragger = Upload.Dragger;
const TabPane = Tabs.TabPane;

import Auth from '../../modules/Auth.js';

class UploadC extends Component {
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
    const fields = {
      selectedDisplayName: {
        value: this.props.selectedDisplayName,
      },
      selectedUrl: this.props.selectedUrl,
      onSelectedDisplayNameChange: this.props.onSelectedDisplayNameChange,
      onChooseImageFunction: this.props.onChooseImageFunction,
    };

    return (
        <Tabs defaultActiveKey="0">
          <TabPane tab={<span><Icon type="inbox"/>Upload files</span>}
                   key="0">
            <div>
              <UploadDragger name='upload-file'
                             action='/upload/upload'
                             headers={
                               { 'Authorization': `bearer ${Auth.getToken()}`, }
                             }
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
            <Spin tip="Fetching uploads"
                  size="large"
                  spinning={this.props.fetchingUploads}>
              <div className="uploads-container">
                <div className="gallery-container">
                  <Card bordered={false}
                        noHovering={true}
                        loading={this.props.fetchingUploads}
                        bodyStyle={{
                          margin: 0,
                          padding: 0,
                        }}>
                    <Gallery images={this.props.uploads}
                             onSelectImage={this.props.onSelectImage}
                             enableLightbox={false}
                             onClickThumbnail={this.props.onSelectImage}
                             multiple
                    />
                  </Card>
                </div>
                <div className="info-container">
                  <div className="info-uploads">
                    {this.props.selectedUrl ?
                        <span>
                        <Card bodyStyle={{ padding: 14, background: '#f3f3f3' }}
                              bordered={false}
                              noHovering={true}>
                          <div style={{ display: 'flex' }}>
                            <div className="custom-image">
                              <img width="100%"
                                   height="auto"
                                   src={this.props.selectedUrl}
                              />
                            </div>
                            <div className="custom-card"
                                 style={{ paddingLeft: 5 }}>
                              <h3>{this.props.selectedDisplayName}</h3>
                              <p>{this.props.selectedCreatedAt}</p>
                            </div>
                          </div>
                        </Card>
                        <Card bodyStyle={{ padding: 14, background: '#f3f3f3' }}
                              bordered={false}
                              noHovering={true}>
                          <CustomizedForm {...fields}/>
                        </Card>
                      </span>
                        :
                        null
                    }
                  </div>
                </div>
              </div>
            </Spin>
          </TabPane>
        </Tabs>
    );
  }
}

export default UploadC;
