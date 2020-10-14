import React, { Component } from 'react';
import { Layout, Input, Form } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.css';
import styled from 'styled-components';
import { connect } from 'dva'; // react-redux用来连接仓库和组件

const { Content } = Layout;

class Login extends Component {
  render() {
    return (
      <>
        <Layout className={styles.layout}>
          <Content className={styles.content}>
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
        <FormWrapper>
          <Form>
            <Input placeholder="aaa"/>
          </Form>
        </FormWrapper>
      </div>
    )
  }
}

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
  // height: calc(100vh - 70px);
  height: 100%;
  margin: 120px auto;
  h3 {
    text-align: center;
  }
  form {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5%;
    background: rgb(255, 255, 255);
    padding: 35px;
  }
`;

// 一个页面路由会对应一个子状态 login
export default connect(
  state => state.login
)(Login);