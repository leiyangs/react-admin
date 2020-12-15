import React, {useEffect} from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

// 使用函数组件，使用React Hooks特性
const UserModal = (props) => {
  const FormItemLayout = {
    labelCol: { span:4 },
    wrapperCol: { span: 20 }
  }
  const { isCreate, visible } = props;
  const [form] = Form.useForm(); // useForm 是 React Hooks 的实现，只能用于函数组件
  const save = (payload) => {
    props.dispatch({type: 'user/save', payload});
  }
  const onOk = () => {
    form.validateFields().then(async values=> {
      await props.dispatch({type: 'user/createUser', payload: values});
      save({visible: false});
    }).catch(errorInfo => {
      console.log(errorInfo)
    });
  }
  const onCancel = () => {
    save({visible: false});
  }
  useEffect(() => { // 要手动调用resetFields清空form
    form.resetFields();
  });
  return (
    <Modal
      title={isCreate ? '新增用户' : '编辑用户'}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      getContainer={false}
      destroyOnClose={false} // 关闭会销毁数据 与 <Form />配合使用时， Modal 关闭时销毁表单字段数据，需要设置 <Form preserve={false} /> 但不能设置 destroyOnClose 为 true
      maskClosable={false}
    >
      <Form {...FormItemLayout} form={form} preserve={false} name="control-hooks">
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名"/>
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码"/>
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default connect(
  state=>state.user
)(UserModal)

// class UserModal extends React.Component {
//   render() {
//     const { isCreate, visible, onOk, oncancel } = this.props;
//     return (
//       <Modal
//         title={isCreate ? '新增用户' : '编辑用户'}
//         visible={visible}
//         onOk={onOk}
//         onCancel={oncancel}
//       />
//     )
//   }
// }
