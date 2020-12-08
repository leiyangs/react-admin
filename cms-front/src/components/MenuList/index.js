import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';

const SubMenu = Menu.SubMenu;
class MenuList extends React.Component {
  componentDidMount() {
    console.log(this.props)

  }
  render() {
    const user = this.props.user;
    if(!user) {
      return null;
    }
    return (
      <div>
        11111
      </div>
    )
  }
}

export default connect(state => state.admin)(MenuList);