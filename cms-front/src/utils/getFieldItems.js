import { Form } from 'antd';
const FormItem = Form.Item;

const FormItemLayout = {
  labelCol: { span:4 },
  wrapperCol: { span: 20 }
}

function getFieldItems(fields) {
  return fields.filter((field) => field.visible).map((field, index) => {
    let layout = field.layout ? field.layout : FormItemLayout;
    field.rules = field.rules || [];
    field.extra = field.extra || {};
    return (
      <FormItem label={field.label} key={index} name={field.name} {...layout} rules={field.rules} {...field.extra}>
        {field.input}
      </FormItem>
    )
  })
}

export default getFieldItems;
