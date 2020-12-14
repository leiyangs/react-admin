import Form from 'antd/lib/form/Form';
import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';

export default
@connect(state => state.user)
class UserModal extends React.Component {
  render() {
    const { isCreate, visible, onOk, oncancel } = this.props;
    return (
      <Modal
        title={isCreate ? '新增用户' : '编辑用户'}
        visible={visible}
        onOk={onOk}
        onCancel={oncancel}
      />
    )
  }
}
