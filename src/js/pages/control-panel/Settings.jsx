import React, { Component } from 'react';
import {
  Form,
  Select,
  Button,
  Popconfirm,
  Card,
  Tabs,
  Input,
  Icon,
  Radio,
  Modal,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import UploadViewMultipleChoice from '../upload-modal/UploadViewMultipleChoice.jsx';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currency && nextProps.currency.length > 0) {
      this.setState({ currency: nextProps.currency[0] });
    }
  }

  render() {

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

    const cardMediaQuery = window.matchMedia('(max-width: 1100px)');

    let selectOptions = this.props.currencyData.map((currency, i) => {
      return <Option key={i}
                     value={currency.currency}>{currency.currency}
        ({currency.symbol})
      </Option>;
    });

    const siteNavigation = this.props.siteNavigation;

    let navigationTabs = Object.keys(siteNavigation).map((key) => {
      const currentIndexValue = siteNavigation[key];

      let currentKey = parseInt(key) + 1;

      const suffixName = currentIndexValue.optionName ?
          <Icon type="close-circle"
                onClick={this.props.onOptionNameChange(currentKey - 1)}/> :
          null;

      const suffixAnchor = currentIndexValue.optionAnchor ?
          <Icon type="close-circle"
                onClick={this.props.onOptionAnchorChange(currentKey - 1)}/> :
          null;

      return <TabPane key={currentKey}
                      tab={currentIndexValue.optionName ?
                          currentIndexValue.optionName :
                          'Option ' + currentKey}>
        <Tabs defaultActiveKey="Main settings"
              tabPosition='left'>
          {siteNavigation.length !== 1 ?
              <div style={{ marginBottom: 16 }}>
                <Button
                    onClick={this.props.removeSiteNavigationOption(
                        currentKey - 1)}
                    type="danger">
                  Delete this option
                </Button>
              </div>
              :
              false
          }
          <TabPane key="Main settings"
                   tab={`Main settings`}>
            <div style={{ paddingTop: 10 }}>
              <Input key={currentKey}
                     placeholder="Option name"
                     value={currentIndexValue.optionName}
                     suffix={suffixName}
                     onChange={this.props.onOptionNameChange(currentKey - 1)}
                     style={{
                       maxWidth: 300,
                     }}/>
            </div>
            <div style={{ paddingTop: 30 }}>
              <Input key={currentKey}
                     placeholder="Where does this option link go to?"
                     value={currentIndexValue.optionAnchor}
                     suffix={suffixAnchor}
                     onChange={this.props.onOptionAnchorChange(currentKey - 1)}
                     style={{
                       maxWidth: 300,
                     }}/>
            </div>
          </TabPane>
          <TabPane key="Column 1"
                   tab={`Column 1`}>
            {
              currentIndexValue.siteNavigationColumn1.map((line, index) => {
                const suffixLineText = line.lineText ?
                    <Icon type="close-circle"
                          onClick={this.props.onLineTextChange1(currentKey - 1,
                              index)}/> :
                    null;

                const suffixLineAnchor = line.lineAnchor ?
                    <Icon type="close-circle"
                          onClick={this.props.onLineAnchorChange1(
                              currentKey - 1, index)}/> :
                    null;

                return <Card key={index}
                             noHovering={true}
                             bodyStyle={{
                               padding: cardMediaQuery.matches ?
                                   2 :
                                   '',
                             }}>
                  <div style={{ marginBottom: 10 }}>
                    <Button
                        style={{ marginTop: cardMediaQuery.matches ? 5 : 0, }}
                        onClick={this.props.addLineColumn1(
                            currentKey - 1)}>
                      Add a new line
                    </Button>
                    {currentIndexValue.siteNavigationColumn1.length !== 1 ?
                        <Button style={{
                          marginLeft: cardMediaQuery.matches ? 0 : 10,
                          marginTop: cardMediaQuery.matches ? 5 : 0,
                        }}
                                onClick={this.props.deleteLineColumn1(
                                    currentKey - 1, index)}
                                type="danger">
                          Remove this line
                        </Button>
                        :
                        null
                    }
                  </div>

                  <div style={{ paddingTop: 15 }}>
                    <RadioGroup defaultValue="normal"
                                onChange={this.props.onLineTypeChange1(
                                    currentKey - 1, index)}>
                      <RadioButton value="title"
                                   style={{
                                     marginRight: cardMediaQuery.matches ?
                                         0 :
                                         10,
                                   }}>
                        Title
                      </RadioButton>
                      <RadioButton value="normal">
                        Normal
                      </RadioButton>
                    </RadioGroup>
                  </div>
                  <div style={{ paddingTop: 30 }}>
                    <Input key={index}
                           placeholder="Line text"
                           value={line.lineText}
                           suffix={suffixLineText}
                           onChange={this.props.onLineTextChange1(
                               currentKey - 1, index)}
                           style={{
                             maxWidth: 300,
                           }}/>
                  </div>
                  <div style={{ paddingTop: 30 }}>
                    <Input key={index}
                           placeholder="Where does this link point to ?"
                           value={line.lineAnchor}
                           suffix={suffixLineAnchor}
                           onChange={this.props.onLineAnchorChange1(
                               currentKey - 1, index)}
                           style={{
                             maxWidth: 300,
                           }}/>
                  </div>
                </Card>;
              })
            }
          </TabPane>
          <TabPane key="Column 2"
                   tab={`Column 2`}>
            {
              currentIndexValue.siteNavigationColumn2.map((line, index) => {
                const suffixLineText = line.lineText ?
                    <Icon type="close-circle"
                          onClick={this.props.onLineTextChange2(currentKey - 1,
                              index)}/> :
                    null;

                const suffixLineAnchor = line.lineAnchor ?
                    <Icon type="close-circle"
                          onClick={this.props.onLineAnchorChange2(
                              currentKey - 1, index)}/> :
                    null;

                return <Card key={index}
                             noHovering={true}
                             bodyStyle={{
                               padding: cardMediaQuery.matches ?
                                   2 :
                                   '',
                             }}>
                  <div style={{ marginBottom: 10 }}>
                    <Button
                        style={{ marginTop: cardMediaQuery.matches ? 5 : 0, }}
                        onClick={this.props.addLineColumn2(
                            currentKey - 1)}>
                      Add a new line
                    </Button>
                    {currentIndexValue.siteNavigationColumn2.length !== 1 ?
                        <Button style={{
                          marginLeft: cardMediaQuery.matches ? 0 : 10,
                          marginTop: cardMediaQuery.matches ? 5 : 0,
                        }}
                                onClick={this.props.deleteLineColumn2(
                                    currentKey - 1, index)}
                                type="danger">
                          Remove this line
                        </Button>
                        :
                        null
                    }
                  </div>

                  <div style={{ paddingTop: 15 }}>
                    <RadioGroup defaultValue="normal"
                                onChange={this.props.onLineTypeChange2(
                                    currentKey - 1, index)}>
                      <RadioButton value="title"
                                   style={{
                                     marginRight: cardMediaQuery.matches ?
                                         0 :
                                         10,
                                   }}>
                        Title
                      </RadioButton>
                      <RadioButton value="normal">
                        Normal
                      </RadioButton>
                    </RadioGroup>
                  </div>
                  <div style={{ paddingTop: 30 }}>
                    <Input key={index}
                           placeholder="Line text"
                           value={line.lineText}
                           suffix={suffixLineText}
                           onChange={this.props.onLineTextChange2(
                               currentKey - 1, index)}
                           style={{
                             maxWidth: 300,
                           }}/>
                  </div>
                  <div style={{ paddingTop: 30 }}>
                    <Input key={index}
                           placeholder="Where does this link point to ?"
                           value={line.lineAnchor}
                           suffix={suffixLineAnchor}
                           onChange={this.props.onLineAnchorChange2(
                               currentKey - 1, index)}
                           style={{
                             maxWidth: 300,
                           }}/>
                  </div>
                </Card>;
              })
            }
          </TabPane>
          <TabPane key="Column 3"
                   tab={`Column 3`}>
            {
              currentIndexValue.siteNavigationColumn3.map((line, index) => {
                const suffixLineText = line.lineText ?
                    <Icon type="close-circle"
                          onClick={this.props.onLineTextChange3(currentKey - 1,
                              index)}/> :
                    null;

                const suffixLineAnchor = line.lineAnchor ?
                    <Icon type="close-circle"
                          onClick={this.props.onLineAnchorChange3(
                              currentKey - 1, index)}/> :
                    null;

                return <Card key={index}
                             noHovering={true}
                             bodyStyle={{
                               padding: cardMediaQuery.matches ?
                                   2 :
                                   '',
                             }}>
                  <div style={{ marginBottom: 10 }}>
                    <Button
                        style={{ marginTop: cardMediaQuery.matches ? 5 : 0, }}
                        onClick={this.props.addLineColumn3(
                            currentKey - 1)}>
                      Add a new line
                    </Button>
                    {currentIndexValue.siteNavigationColumn3.length !== 1 ?
                        <Button style={{
                          marginLeft: cardMediaQuery.matches ? 0 : 10,
                          marginTop: cardMediaQuery.matches ? 5 : 0,
                        }}
                                onClick={this.props.deleteLineColumn3(
                                    currentKey - 1, index)}
                                type="danger">
                          Remove this line
                        </Button>
                        :
                        null
                    }
                  </div>

                  <div style={{ paddingTop: 15 }}>
                    <RadioGroup defaultValue="normal"
                                onChange={this.props.onLineTypeChange3(
                                    currentKey - 1, index)}>
                      <RadioButton value="title"
                                   style={{
                                     marginRight: cardMediaQuery.matches ?
                                         0 :
                                         10,
                                   }}>
                        Title
                      </RadioButton>
                      <RadioButton value="normal">
                        Normal
                      </RadioButton>
                    </RadioGroup>
                  </div>
                  <div style={{ paddingTop: 30 }}>
                    <Input key={index}
                           placeholder="Line text"
                           value={line.lineText}
                           suffix={suffixLineText}
                           onChange={this.props.onLineTextChange3(
                               currentKey - 1, index)}
                           style={{
                             maxWidth: 300,
                           }}/>
                  </div>
                  <div style={{ paddingTop: 30 }}>
                    <Input key={index}
                           placeholder="Where does this link point to ?"
                           value={line.lineAnchor}
                           suffix={suffixLineAnchor}
                           onChange={this.props.onLineAnchorChange3(
                               currentKey - 1, index)}
                           style={{
                             maxWidth: 300,
                           }}/>
                  </div>
                </Card>;
              })
            }
          </TabPane>
          <TabPane key="Pictures"
                   tab={`Pictures`}>
            <Card noHovering={true}
                  bodyStyle={{
                    padding: cardMediaQuery.matches ?
                        2 :
                        '',
                  }}>
              <div className="div-as-link"
                   onClick={ () => {
                     this.props.onShowUploadsMultipleModal();
                     this.props.getCurrentOptionKey(currentKey - 1);
                   }}>
                Click here to add/change the current pictures.
              </div>
              <span style={{ color: 'tomato' }}>Attention: you can add a maximum of 2 pictures on this column.</span>
              <div className="o-line">
                {
                  currentIndexValue.siteNavigationPictures.map(
                      (pictureData, index) => {

                        const suffixCaption = pictureData.imageCaption ?
                            <Icon type="close-circle"
                                  onClick={this.props.onPictureCaptionChange(
                                      currentKey - 1, index)}/> :
                            null;

                        const suffixAnchor = pictureData.imageAnchor ?
                            <Icon type="close-circle"
                                  onClick={this.props.onPictureAnchorChange(
                                      currentKey - 1, index)}/> :
                            null;

                        return <div key={index}
                                    style={{
                                      marginTop: cardMediaQuery.matches ?
                                          20 :
                                          0,
                                      marginLeft: cardMediaQuery.matches ?
                                          0 :
                                          20,
                                    }}>
                          <figure>
                            <img src={pictureData.imageUrl} alt=""
                                 style={{
                                   maxWidth: 200,
                                   maxHeight: 310,
                                   height: cardMediaQuery.matches ?
                                       'auto' :
                                       310,
                                   width: cardMediaQuery.matches ?
                                       'auto' :
                                       200,
                                 }}/>
                            <figcaption
                                className="site-navigation-image-caption">
                              <small>Recommended size for pictures is :
                                200x310
                              </small>
                              <div>
                                <Input placeholder="Photo caption"
                                       value={pictureData.imageCaption}
                                       suffix={suffixCaption}
                                       onChange={this.props.onPictureCaptionChange(
                                           currentKey - 1, index)}
                                       style={{
                                         marginTop: 20,
                                         maxWidth: 300,
                                       }}/>
                              </div>
                              <div>
                                <Input placeholder="Photo links to: "
                                       value={pictureData.imageAnchor}
                                       suffix={suffixAnchor}
                                       onChange={this.props.onPictureAnchorChange(
                                           currentKey - 1, index)}
                                       style={{
                                         marginTop: 10,
                                         maxWidth: 300,
                                       }}/>
                              </div>
                            </figcaption>
                          </figure>
                        </div>;
                      })
                }
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </TabPane>;
    });

    return (
        <Card bordered={false}
              noHovering={true}
              loading={!this.props.loadedPage}
              style={{
                padding: cardMediaQuery.matches ? 5 : '',
              }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General settings" key="1">
              <Form>
                <FormItem key="0"
                          {...formItemLayout}>
                  <div>
                    <Button type="primary"
                            onClick={this.props.onSaveGeneralSettings}
                            loading={this.props.savingSettings}>
                      {this.props.savingSettings ?
                          <span>Working...</span>
                          :
                          <span>Save settings</span>
                      }
                    </Button>
                  </div>
                </FormItem>
                <FormItem key="1"
                          label="Default settings"
                          help="Click this button to reset all settings to default."
                          {...formItemLayout}>
                  <div>
                    <Popconfirm
                        title="Are you sure you want to reset all settings to default？"
                        okText="Yes" cancelText="No"
                        onConfirm={this.props.onResetDefault}>
                      <Button type="default">
                        Reset settings to default
                      </Button>
                    </Popconfirm>
                  </div>
                </FormItem>
                <FormItem key="2"
                          label="Store's currency"
                          help="Select one of the currencies listed above"
                          {...formItemLayout}>
                  {this.props.fetchedSettings ?
                      <Card bordered={false}
                            noHovering={true}
                            loading={this.props.fetchingSettings ||
                            this.props.savingSettings}
                            bodyStyle={{
                              margin: 0,
                              padding: 0,
                            }}>
                        <Select showSearch
                                onChange={this.props.onCurrencyChange}
                                defaultValue={this.state.currency}
                                style={{
                                  width: cardMediaQuery.matches ?
                                      '' :
                                      300,
                                }}
                                notFoundContent="No matches found.">
                          {selectOptions}
                        </Select>
                      </Card>
                      :
                      null
                  }

                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="Promotional banners" key="2">
              <Card noHovering={true}
                    bodyStyle={{
                      padding: cardMediaQuery.matches ?
                          2 :
                          '',
                    }}>
                <div style={{ marginBottom: 16 }}>
                  <Button onClick={this.props.onSaveTopPromotionalBanner}
                          type="primary">Save changes to top promotional
                    banner</Button>
                </div>
                <div>
                  <div>
                    <Input placeholder="Promotional text"
                           value={this.props.topPromotionalBanner.promoText}
                           onChange={this.props.onTopBannerPromoTextChange}
                           style={{
                             marginTop: 10,
                             maxWidth: 300,
                           }}/>
                  </div>
                  <div>
                    <Input placeholder="Promotional link text"
                           value={this.props.topPromotionalBanner.promoLinkText}
                           onChange={this.props.onTopBannerPromoLinkTextChange}
                           style={{
                             marginTop: 10,
                             maxWidth: 300,
                           }}/>
                  </div>
                  <div>
                    <Input placeholder="Promotional link adress"
                           value={this.props.topPromotionalBanner.promoLinkAnchor}
                           onChange={this.props.onTopBannerPromoLinkAnchorChange}
                           style={{
                             marginTop: 10,
                             maxWidth: 300,
                           }}/>
                  </div>
                </div>
              </Card>
            </TabPane>
            <TabPane tab="Site navigation layout" key="3">
              <div style={{ marginBottom: 16 }}>
                <Button onClick={this.props.onSaveSiteNavigation}
                        type="primary">Save site navigation</Button>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Button onClick={this.props.addSiteNavigationOption}>Add a new
                  option</Button>
              </div>
              <Tabs defaultActiveKey="1">
                {navigationTabs}
              </Tabs>
            </TabPane>
            <TabPane tab="Homepage image slider" key="4">
              <Card noHovering={true}
                    bodyStyle={{
                      padding: cardMediaQuery.matches ?
                          2 :
                          '',
                    }}>
                <div style={{ marginBottom: 16 }}>
                  <Button onClick={this.props.onSaveSliderImages}
                          type="primary">Save changes to homepage
                    slider</Button>
                </div>
                <div className="div-as-link"
                     onClick={ () => {
                       this.props.onShowUploadsMultipleModal();
                       this.props.onChangeSelectingSliderImages();
                     }}>
                  Click here to add/change the current pictures.
                </div>
                <div className="o-line">
                  {
                    this.props.sliderImages.map(
                        (url, index) => {
                          if (url)
                            return <div key={index}
                                        style={{
                                          marginTop: cardMediaQuery.matches ?
                                              20 :
                                              0,
                                          marginLeft: cardMediaQuery.matches ?
                                              0 :
                                              20,
                                        }}>
                              <figure>
                                <img src={url} alt=""
                                     style={{ maxWidth: '100%' }}/>
                              </figure>
                            </div>;
                        })
                  }
                </div>
              </Card>
            </TabPane>
          </Tabs>
          <Modal title="Pick images to show in product's gallery"
                 wrapClassName="vertical-center-modal"
                 width="auto"
                 visible={this.props.isModalVisibleMultiple}
                 style={{ maxWidth: window.innerWidth }}
                 footer={null}
                 onOk={this.props.onHideUploadsMultipleModal}
                 onCancel={() => {
                   this.props.onHideUploadsMultipleModal();
                   this.props.onChangeSelectingSliderImages();
                   this.props.onSelectSliderImages();
                 }}>
            <UploadViewMultipleChoice modalFromSettings={true}
                                      selectingSliderImages={this.props.selectingSliderImages}
                                      onChangeSelectingSliderImages={this.props.onChangeSelectingSliderImages}
                                      onSelectSliderImages={this.props.onSelectSliderImages}
                                      addPicturesToColumn={this.props.addPicturesToColumn}
                                      getCurrentOptionKey={this.props.getCurrentOptionKey}/>
          </Modal>
        </Card>
    );
  }
}

export default Form.create()(Settings);
