// form正常写法，不套用utils
import React, { Component } from 'react';
import { Layout, Input, Form, Radio, Cascader, Select, AutoComplete, Checkbox, Button, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.scss';
import styled from 'styled-components';
import { connect } from 'dva'; // react-redux用来连接仓库和组件
import options from '../../utils/addresses';
const captchaUrl = `http://127.0.0.1:7001/api/captcha?ts=`;

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
      <Form.Item name="prefix" noStyle>
        <Select className="select-before" defaultValue="86" style={{width:'80'}}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    )
    return (
      <FormWrapper>
        <Form {...FormItemLayout} initialValues={initialValues}>
          <h3>欢迎{this.props.isLogin?'登陆':'注册'}</h3>
          <Form.Item label="用户名" name="username" rules={[{required: true, message:'请输入用户名', whitespace: true}]}>
            <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{required: true, message:'请输入密码'},{min: 4, message: '密码最少4位'},{max: 10, message: '密码最大10位'},]}>
            <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
          </Form.Item>
          {/* dependencies 设置依赖，依赖字段改变，将触发该字段校验 */}
          {/* getFieldValue获取对应字段的值 */}
          <Form.Item label="确认密码" name="repassword" dependencies={['password']}
            rules={[
              {required: true, message: '请确认密码'},
              ({ getFieldValue }) => ({validator(rule, value) {
                if(!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码不一致')
              }})
            ]}
          >
            <Input.Password placeholder="请确认密码" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }]}>
            <Input placeholder="请输入邮箱" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别' }]}>
            <Radio.Group onChange={this.handleGenderChange} value={this.state.gender} >
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="住址" name="address" rules={[{ required: true, message: '请选择住址' }]}>
            <Cascader options={options} placeholder="请选择住址" />
          </Form.Item>
          <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '请输入手机号' }, {pattern: /1\d{10}/, message: '请输入正确的手机号'}]}>
            <Input addonBefore={selectBefore} placeholder="请输入手机号"  />
          </Form.Item>
          {/* 自动完成框 */}
          <Form.Item label="个人主页" name="website">
            <AutoComplete onSearch={this.handleWebSiteChange} placeholder="请输入个人主页">
              {this.state.autoCompleteResult.map((email) => (
                <AutoComplete.Option key={email} value={email}>
                  {email}
                </AutoComplete.Option>
              ))}
            </AutoComplete>
          </Form.Item>
          <Form.Item label="验证码" name="captcha" rules={[{required: true, message: '请输入验证码'}]}>
            <Row>
              <Col span={12}>
                <Input placeholder="请输入验证码"/>
              </Col>
              <Col span={12}>
                <img src={captchaUrl} alt="验证码" onClick={this.refreshCaptcha} style={{width: '100%', height: '32px'}}/>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name="agreement" valuePropName="checked" rules={[{ validator: (rule, value) => value ? Promise.resolve() : Promise.reject('请仔细阅读并同意本协议') }]} wrapperCol={{offset: 4, span: 20}}>
            <Checkbox onChange={this.handleAgreementChange}>我已同意本<a href="void:javascript(0)">协议</a></Checkbox>
          </Form.Item>
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