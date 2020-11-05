import React, { Component } from 'react';
import { Layout, Input, Form, Radio, Cascader, Select, AutoComplete, Checkbox, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.css';
import styled from 'styled-components';
import { connect } from 'dva'; // react-redux用来连接仓库和组件
import options from '../../utils/addresses';
import getFieldItems from '../../utils/getFieldItems';

const { Content } = Layout;

class Login extends Component {
  changeLoginStatus = () => {
    this.props.dispatch({
      type: 'login/save',
      payload: {isLogin: !this.props.isLogin}
    })
  }
  render() {
    return (
      <>
        <Layout className={styles.layout}>
          <Content className={styles.content}>
            <LoginForm isLogin={this.props.isLogin} changeLoginStatus={this.changeLoginStatus}/>
          </Content>
        </Layout>
      </>
    )
  }
}

class LoginForm extends Component {
  state = {
    gender: 0,
    autoCompleteResult: [],
    agreement: true
  }
  // gender change
  handleGenderChange = (e) => {
    this.setState({
      gender: e.target.value
    })
  }
  // 自动完成框后缀
  handleWebSiteChange = value => {
    let autoCompleteResult = [];
    if(value || !value.includes('@')) {
      autoCompleteResult = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
    this.setState({autoCompleteResult});
  }
  // agree change
  handleAgreementChange = e => {
    this.setState({ agreement: e.target.checked })
  }
  render() {
    let isLogin = this.props.isLogin;
    // 表单label栅格化
    const FormItemLayout = {
      labelCol: { span:4 },
      wrapperCol: { span: 20 }
    }
    // form中给字段赋默认值的方法
    const initialValues = {
      gender: this.state.gender,
      agreement: this.state.agreement
    }
    const { Option } = Select;
    const selectBefore = (
      <Select className="select-before" defaultValue="010" style={{width:'80px'}}>
        <Option value='010'>010</Option>
        <Option value='020'>020</Option>
        <Option value='030'>021</Option>
      </Select>
    )
    const FieldItems = getFieldItems([
      { label: '用户名',  name: 'username', visible: true, rules: [{required: true, message:'请输入用户名', whitespace: true}], input: <Input placeholder="请输入用户名" prefix={<UserOutlined />} />},
      { label: '密码', name: 'password', visible: true, rules: [{required: true, message:'请输入密码'},{min: 4, message: '密码最少4位'},{max: 10, message: '密码最大10位'}], input: <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />},
      { label: '确认密码', name: 'repassword', visible: !isLogin, extra:{dependencies: ['password']}, rules: [
        {required: true, message: '请确认密码'},
        ({ getFieldValue }) => ({validator(rule, value) {
          if(!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject('两次密码不一致')
        }})
      ], input: <Input.Password placeholder="请确认密码" prefix={<LockOutlined />} /> },
      { label: '邮箱', name: 'email', visible: !isLogin, rules: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }], input: <Input placeholder="请输入邮箱" prefix={<MailOutlined />} /> },
      { label: '性别', name: 'gender', visible: !isLogin, rules: [{ required: true, message: '请选择性别' }], input:
        <Radio.Group onChange={this.handleGenderChange} value={this.state.gender} >
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </Radio.Group>
      },
      { label: '住址', name: 'address', visible: !isLogin, rules: [{ required: true, message: '请选择住址' }], input: <Cascader options={options} placeholder="请选择住址" /> },
      { label: '手机号', name: 'phone', visible: !isLogin, rules:[{ required: true, message: '请输入手机号' }, {pattern: /1\d{10}/, message: '请输入正确的手机号'}], input: <Input addonBefore={selectBefore} placeholder="请输入手机号"  /> },
      { label: '个人主页', name: 'website', visible: !isLogin, input: 
        <AutoComplete onSearch={this.handleWebSiteChange} placeholder="请输入个人主页">
          {this.state.autoCompleteResult.map((email) => (
            <AutoComplete.Option key={email} value={email}>
              {email}
            </AutoComplete.Option>
          ))}
        </AutoComplete>
      },
      { label:'', name: 'agreement', visible: true, extra: {valuePropName: 'checked'}, rules: [{ validator: (rule, value) => value ? Promise.resolve() : Promise.reject('请仔细阅读并同意本协议') }], layout: {wrapperCol:{offset: 4, span: 20}}, input: <Checkbox onChange={this.handleAgreementChange}>我已同意本<a>协议</a></Checkbox> }
    ])
    return (
      <FormWrapper>
        <Form {...FormItemLayout} initialValues={initialValues}>
          <h3>欢迎{isLogin?'登陆':'注册'}</h3>
          {FieldItems}
          <Form.Item wrapperCol={{span: 24}}>
            <Button type="primary" htmlType="submit" style={{width: "100%"}}>注册</Button>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            已有账号？<a onClick={this.props.changeLoginStatus}>立刻登录</a>
          </Form.Item>
        </Form>
      </FormWrapper>
    )
  }
}

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
  // height: calc(100vh - 70px);
  min-height: 100%;
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