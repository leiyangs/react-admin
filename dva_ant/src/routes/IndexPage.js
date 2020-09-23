import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import NavBar from '../components/NavBar';
const { Header, Footer, Sider, Content } = Layout;

function IndexPage() {
  return (
    <Layout>
       <NavBar/>
      <Content></Content>
      <Footer></Footer>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
