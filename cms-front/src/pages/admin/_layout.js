import React, { Component } from 'react';
import { Layout } from 'antd';
import AdminHeader from '@/components/AdminHeader';
import MenuList from '@/components/MenuList';
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Layout>
        <AdminHeader/>
        <Layout>
          <Sider style={{
            overflow: 'auto',
            height: 'calc(100vh - 134px)',
            position: 'fixed',
            left: 0,
          }}
            trigger={null}
            collapsible
            collapsed={collapsed} 
            onCollapse={this.toggleCollapsed}
          >
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
