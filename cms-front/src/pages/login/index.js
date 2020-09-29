import React, { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { connect } from 'dva';

const { Content } = Layout;

class Login extends Component {
  render() {
    return (
      <>
        <Layout>
          <Content>
            <LoginForm/>
          </Content>
        </Layout>
      </>
    )
  }
}

class LoginForm extends Component {
  render() {
    return (
      <div>
        aa
      </div>
    )
  }
}

// 一个页面路由会对应一个子状态 login
export default connect(
  state => state.login
)(Login);