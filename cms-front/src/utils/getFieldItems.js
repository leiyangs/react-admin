import { Form } from 'antd';
const FormItem = Form.Item;

const FormItemLayout = {
  labelCol: { span:4 },
  wrapperCol: { span: 20 }
}

function getFieldItems(fields) {
  return fields.filter(field => field.visible).map((field, index) => {
    let layout = field.layout ? field.layout : FormItemLayout;
    return (
      <FormItem label={field.label} name={field.name} {...layout}>
        <field.input/>
      </FormItem>
    )
  })
}

export default getFieldItems;
