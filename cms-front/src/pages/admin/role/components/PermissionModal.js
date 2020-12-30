import React from 'react';
import { connect } from 'dva';
import { Modal, Tree } from 'antd';

const ENTITY = 'role';

const TreeNode = Tree.TreeNode;

const PermissionModal = (props) => {
  const { setPermissionVisible, record, resources, checkedKeys } = props;

  const save = (payload) => {
    props.dispatch({type: `${ENTITY}/save`, payload});
  }

  const onOk = () => {
    
  }

  const onCancel = () => {
    props.dispatch({type: `${ENTITY}/hideModal`});
  }

  const onCheck = (checkedKeys) => {
    console.log(checkedKeys)
    save(checkedKeys);
  }

  // 4.x版本用TreeNode会报warning
  const RenderResources = (resources) => {
    return resources.map(child => {
      if(child.children.length > 0) {
        return (
          <TreeNode key={child.id} title={child.name}>
            {RenderResources(child.children)}
          </TreeNode>
        )
      }else {
        return <TreeNode key={child.id} title={child.name}/>
      }
    })
  }
  // const RenderResources = child => ({
  //   title: child.name,
  //   key: child.id
  // })

  return (
    <Modal
      title="角色授权"
      visible={setPermissionVisible}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Tree
        checkable
        defaultExpandAll
        key="id"
        // treeData={resources}
        checkedKeys={checkedKeys} // [] string
        onCheck={onCheck}
      >
        <TreeNode title="所有权限" key={0} disabled>
          {RenderResources(resources)}
        </TreeNode>
      </Tree>
    </Modal>
  )
}

export default connect(state => state.role)(PermissionModal);