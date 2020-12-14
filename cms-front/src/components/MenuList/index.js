import React from 'react';
import { Menu } from 'antd';
import * as MyIcon from '@ant-design/icons';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './index.scss';
import { CalculatorFilled } from '@ant-design/icons';
const logo = require('../../assets/images/logo.svg');

// antd 提供的方法方便根据type使用Icon
// const MyIcon = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
// });
const SubMenu = Menu.SubMenu;
class MenuList extends React.Component {
  renderMenuItems = (menus = []) => { // 递归渲染菜单
    return menus.map(menu => {
      if(menu.children && menu.children.length > 0) {
        return (
          <SubMenu key={menu.path} title={
            <span>
              {/* <MyIcon type={menu.icon} /> */}
              {/* 数据库中menu.icon要用antd中有的 */}
              {
                React.createElement(MyIcon[menu.icon], {style: {fontSize: '16px'}})
              }
              {menu.name}
            </span>
          }>
            {this.renderMenuItems(menu.children)}
          </SubMenu>
        )
      }else {
        return (
          <Menu.Item key={menu.path}>
            <Link to={menu.path}>
              {/* <MyIcon type={menu.icon} /> */}
              {
                React.createElement(MyIcon[menu.icon], {style: {fontSize: '16px'}})
              }
              {menu.name}
            </Link>
          </Menu.Item>
        )
      }
    })
  }
  render() {
    const user = this.props.user;
    if(!user) {
      return null;
    }
    const path = window.location.pathname;
    let openPath = path.split('/');
    openPath.pop();
    openPath = openPath.join('/');
    return (
      <div style={{width: 200, height: '100%', overflow: 'hidden'}}>
        {/* <MyIcon type="icon-example" style={ {fontSize: '16px', color: '#08c'} }/> */}
        <div className={[styles.logo_wrapper]}>
          <img src={logo} style={{width: '36px', marginRight: '8px'}} alt="logo" />
          <h1>REACT ADMIN</h1>
        </div>
        <div className={[styles.sidebar_container]}>
          <Menu
            defaultSelectedKeys={[path]}
            defaultOpenKeys={[openPath]}
            mode="inline"
            theme="dark"
          >
              {/* <SubMenu key="/admin" title="admin">
                <Menu.Item key="/admin/user">
                  user
                </Menu.Item>
                <Menu.Item key="/admin/resource">
                  resource
                </Menu.Item>
                <Menu.Item key="/admin/role">
                  role
                </Menu.Item>
              </SubMenu> */}
              
            {this.renderMenuItems(user.menus)}
          </Menu>
        </div>
      </div>
    )
  }
}

export default connect(state => state.admin)(MenuList);