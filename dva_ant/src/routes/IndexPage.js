import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import NavBar from '../components/NavBar';
const { Footer, Content } = Layout;

function IndexPage(props) {
  return (
    <Layout>
      <NavBar {...props} />
      <Content></Content>
      <Footer></Footer>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
