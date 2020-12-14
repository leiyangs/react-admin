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
      <Layout style={{display: 'flex', height: '100%'}}>
        <Sider style={{
          flex: '0 0 256px',
          width: '256px',
        }}
          trigger={null}
          collapsible
          collapsed={collapsed} 
          onCollapse={this.toggleCollapsed}
        >
          <MenuList style={{
            overflowX: 'hidden',
            height: 'calc(100vh - 134px)',
            flex: '0 0 256px',
            padding: '24px 0',
          }}/>
        </Sider>
        <Content style={{paddingTop: '64px',height: 'calc(100vh - 80px)', overflowY: 'scroll'}}>
          <AdminHeader/>
          <main style={{minHeihgt: '100%', padding: '20px'}}>
            {this.props.children}
          </main>
          <Footer style={{
            textAlign: 'center',
            background: '#fff',
            width: 'calc(100% - 200px)',
            position: 'fixed',
            bottom: 0,
            right: 0
          }}>
            React Admin ©2020 Bob <a href="https://github.com/leiyangs/react-admin" title="Github项目地址" target="_blank" rel="noopener noreferrer">Github地址</a>
          </Footer>
        </Content>
      </Layout>
    )
  }
}
