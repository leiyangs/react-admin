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
          }}
            trigger={null}
            collapsible
            collapsed={collapsed} 
            onCollapse={this.toggleCollapsed}
          >
            <MenuList/>
          </Sider>
          <Content style={{padding: '20px', background: '#fff'}}>
            {this.props.children}
          </Content>
        </Layout>
        <Footer style={{width: '100%', textAlign: "center"}}>
          Bob ©2020
        </Footer>
      </Layout>
    )
  }
}
