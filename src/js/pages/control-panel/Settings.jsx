import React, { Component } from 'react';
import { Form, Select, Button, Popconfirm, Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

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

    const cardMediaQuery = window.matchMedia('(max-width: 1010px)');

    let selectOptions = this.props.currencyData.map((currency, i) => {
      return <Option key={i}
                     value={currency.currency}>{currency.currency}
        ({currency.symbol})
      </Option>;
    });

    return (
        <Card bordered={false}
              noHovering={true}
              loading={!this.props.loadedPage}>
          <Form>
            <FormItem key="0"
                      {...formItemLayout}>
              <div>
                <Button type="primary"
                        onClick={this.props.onSave}
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
                            style={{ width: cardMediaQuery.matches ? '' : 300 }}
                            notFoundContent="No matches found.">
                      {selectOptions}
                    </Select>
                  </Card>
                  :
                  null
              }

            </FormItem>
          </Form>
        </Card>
    );
  }
}

export default Form.create()(Settings);
