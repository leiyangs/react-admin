import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';

const { Header } = Layout;

class AdminHeader extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <Header className={styles.header}>
        <h1>CMS辅助系统</h1>
        <div>
          <span>欢迎 {this.props.user.username}</span>
        </div>
      </Header>
    )
  }
}

export default connect(
  state => state.login
)(AdminHeader);
