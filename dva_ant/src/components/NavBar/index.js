import React from 'react';
import { Link } from 'dva/router';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, ProfileOutlined, UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import styles from './index.css';
const logo = require('../../assets/yay.jpg');

const { Header } = Layout;
const { ItemGroup, Item, SubMenu } = Menu;

const NavBar = (props) => {
  state = { current: home }
  return (
    <Header className={styles.header}>
      <img src={logo} />
      <Menu selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<HomeOutlined />}>
          <Link to="/home">首页</Link>
        </Item>
        <Item key="user" icon={<UserOutlined />}>
          <Link to="/user">用户管理</Link>
        </Item>
        <Item key="profile" icon={<ProfileOutlined />}>
          <Link to="/profile">个人中心</Link>
        </Item>
        <Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">注册</Link>
        </Item>
        <Item key="login" icon={<LoginOutlined />}>
          <Link to="/login">登录</Link>
        </Item>
      </Menu>
    </Header>
  )
}

export default NavBar;