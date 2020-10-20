import React, { Component } from 'react';
import { Layout, Input, Form, Radio, Cascader, Select, AutoComplete } from 'antd';
import styles from './index.css';
import styled from 'styled-components';
import { connect } from 'dva'; // react-redux用来连接仓库和组件
import options from '../../utils/addresses';

const { Content } = Layout;

// 这个是antd3.x版本的写法

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
  state = {
    gender: 0,
    autoCompleteResult: []
  }
  handleGenderChange = (e) => {
    this.setState({
      gender: e.target.value
    })
  }
  handleWebSiteChange = value => {
    let autoCompleteResult = [];
    if(value || !value.includes('@')) {
      autoCompleteResult = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
    this.setState({autoCompleteResult});
  }
  render() {
    // 解构antd提供的方法，可以很方便的校验表单
    const {form: {getFieldDecorator}} = this.props;
    // 表单label栅格化
    const formItemLayout = {
      labelCol: { span:4 },
      wrapperCol: { span: 20 }
    }
    const { Option } = Select;
    const selectBefore = (
      <Select className="select-before" defaultValue="010" style={{width:'80px'}}>
        <Option value='010'>010</Option>
        <Option value='020'>020</Option>
        <Option value='030'>030</Option>
      </Select>
    )
    return (
      <div>
        <FormWrapper>
          <Form>
            <h3>登录</h3>
            <Form.Item label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('username', {
                  rules: [{required: true, message:'请输入用户名'}]
                })(<Input placeholder="请输入用户名" />)
              }
            </Form.Item>
            <Form.Item label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  rules: [{required: true, message:'请输入密码'}]
                })(<Input.Password placeholder="请输入密码" />)
              }
            </Form.Item>
            <Form.Item label="确认密码" {...formItemLayout}>
              {
                getFieldDecorator('repassword', {
                  rules: [{required: true, message: '请确认密码'}]
                })(<Input.Password placeholder="请确认密码"/>)
              }
            </Form.Item>
            <Form.Item label="邮箱" {...formItemLayout}>
              {
                getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }]
                })(<Input placeholder="请输入邮箱" />)
              }
            </Form.Item>
            <Form.Item label="性别" {...formItemLayout}>
              {
                getFieldDecorator('gender', {
                  // 初始值设定 initialValue
                  initialValue: this.state.gender,
                  rules: [{ required: true, message: '请选择性别' }]
                })(<Radio.Group onChange={this.handleGenderChange}>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </Radio.Group>)
              }
            </Form.Item>
            <Form.Item label="住址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  rules: [{ required: true, message: '请选择住址' }]
                })(<Cascader options={options} placeholder="请选择住址" />)
              }
            </Form.Item>
            <Form.Item label="手机号" {...formItemLayout}>
              {
                getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入手机号' }]
                })(<Input addonBefore={selectBefore} placeholder="请输入手机号"  />)
              }
            </Form.Item>
            {/* 自动完成框 */}
            <Form.Item label="个人主页" {...formItemLayout}>
              {
                getFieldDecorator('website', {})(
                  <AutoComplete dataSource={this.state.autoCompleteResult} onSearch={this.handleWebSiteChange} placeholder="请输入个人主页">
                    {/* {
                      this.state.autoCompleteResult.map(email => {
                        <Option key={email} value={email}>
                          {email}
                        </Option>
                      })
                    } */}
                  </AutoComplete>
                )
              }
            </Form.Item>
          </Form>
        </FormWrapper>
      </div>
    )
  }
}

LoginForm = Form.create()(LoginForm);

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
    width: 520px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: rgb(255, 255, 255);
    padding: 35px;
  }
`;

// 一个页面路由会对应一个子状态 login
export default connect(
  state => state.login
)(Login);