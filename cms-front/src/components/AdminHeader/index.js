import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './index.scss';
import { connect } from 'dva';

const { Header } = Layout;

class AdminHeader extends Component {
  state = {
    collapsed: false,
  };
  componentDidMount() {
    this.props.dispatch({type:'admin/loadUser'});
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
  render() {
    const userInfo = this.props.user;
    return (
      <Header className={[styles.header]}>
        <div>
          <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
        </div>
        <div>
          <span>欢迎 {userInfo&&userInfo.username}</span>
        </div>
      </Header>
    )
  }
}

export default connect(
  state => state.admin
)(AdminHeader);
