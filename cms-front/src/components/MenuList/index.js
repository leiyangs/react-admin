import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';

const SubMenu = Menu.SubMenu;
class MenuList extends React.Component {
  state = {
    collapsed: false,
  }
  componentDidMount() {
    console.log(this.props)

  }
  render() {
    const user = this.props.user;
    if(!user) {
      return null;
    }
    return (
      <Menu
      defaultSelectedKeys={['/admin/user']}
      defaultOpenKeys={['/admin']}
      mode="inline"
      theme="dark"
      inlineCollapsed={this.state.collapsed}>
        <SubMenu key="/admin" title="admin">
          <Menu.Item key="/admin/user">
            user
          </Menu.Item>
          <Menu.Item key="/admin/resource">
          resource
          </Menu.Item>
          <Menu.Item key="/admin/role">
          role
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default connect(state => state.admin)(MenuList);