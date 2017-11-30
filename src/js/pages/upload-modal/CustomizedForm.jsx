import React from 'react';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

const CustomizedForm = Form.create({
  mapPropsToFields(props) {
    return {
      selectedDisplayName: {
        ...props.selectedDisplayName,
        value: props.selectedDisplayName.value,
      },
    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  };
  return (
      <Form>
        <FormItem key="0"
                  label="URL"
                  {...formItemLayout}>
          <Input value={props.selectedUrl}
                 disabled={true}/>
        </FormItem>
        <FormItem key="1"
                  label="Name"
                  {...formItemLayout}>
          {getFieldDecorator('selectedDisplayName', {
            rules: [
              {
                required: true,
                message: 'Please use a name for this image.',
              },
              {
                max: 64,
                message: 'Please use a shorter name for this image.',
              },
              { setFieldsValue: props.selectedDisplayName },
            ],
          })(
              <Input
                  onChange={props.onSelectedDisplayNameChange}/>,
          )}
        </FormItem>
        <FormItem key="2"
                  {...tailFormItemLayout}>
          <Button type="primary"
                  htmlType="submit"
                  onClick={props.onChooseImageFunction}>
            Use this image
          </Button>
        </FormItem>
      </Form>
  );
});

export default CustomizedForm;
