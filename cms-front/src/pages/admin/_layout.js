import React, { Component } from 'react';
import { Layout } from 'antd';
import AdminHeader from '@/components/AdminHeader';
import MenuList from '@/components/MenuList';
const { Footer, Sider, Content, Header } = Layout;

export default class Admin extends Component {
  render() {
    return (
      <Layout>
        <AdminHeader/>
        <Layout>
          <Sider style={{
            overflow: 'auto',
            height: 'calc(100vh - 134px)',
            position: 'fixed',
            left: 0,
          }}>
            <MenuList/>
          </Sider>
          <Content style={{marginLeft: "200px", position: 'relative'}}>
            Content
          </Content>
        </Layout>
        <Footer style={{width: '100%', textAlign: "center", position: 'fixed', left: 0, bottom: 0}}>
          Bob ©2020
        </Footer>
      </Layout>
    )
  }
}
