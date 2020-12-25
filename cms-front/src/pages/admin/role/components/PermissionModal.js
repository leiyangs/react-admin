import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';

const ENTITY = 'role';

const PermissionModal = (props) => {
  const { setPermissionVisible, record } = props;

  const onOk = () => {
    
  }

  const onCancel = () => {
    props.dispatch({type: `${ENTITY}/hideModal`});
  }

  return (
    <Modal
      visible={setPermissionVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      权限
    </Modal>
  )
}

export default connect(state => state.role)(PermissionModal);