import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';

const { Header } = Layout;

class AdminHeader extends Component {
  componentWillMount() {
    this.props.dispatch({type:'admin/loadUser'});
  }
  render() {
    // console.log(this.props)
    const userInfo = this.props.user;
    return (
      <Header className={styles.header}>
        <h1>CMS辅助系统</h1>
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
