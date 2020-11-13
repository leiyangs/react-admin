import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch } from 'dva/router';
import { Layout } from 'antd';
import NavBar from '../components/NavBar';
import NoMatch from '../components/NoMatch';
import { renderRoutes, renderRedirect } from '../utils/routes';

const { Content } = Layout;

function IndexPage(props) {
  return (
    <Layout>
      <NavBar {...props} />
      <Content>
        <Switch>
          {renderRoutes(props.routes, props.app)}
          {renderRedirect(props.routes)}
          <NoMatch/>
        </Switch>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
