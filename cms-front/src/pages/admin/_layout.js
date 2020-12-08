import React, { Component } from 'react';
import { Layout } from 'antd';
import AdminHeader from '@/components/AdminHeader';
import MenuList from '@/components/MenuList';
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    return (
      <Layout>
        <AdminHeader/>
        <Layout>
          <Sider style={{height: 'calc(100vh - 134px)'}}>
            <MenuList/>
          </Sider>
          <Content>
            Content
          </Content>
        </Layout>
        <Footer style={{textAlign: "center"}}>
          Bob ©2020
        </Footer>
      </Layout>
    )
  }
}
