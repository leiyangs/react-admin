import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import routesConfig from './routesConfig';
import { renderRoutes } from './utils/routes';

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" component={IndexPage} /> */}
        {/* 从路由表中循环渲染路由 */}
        {renderRoutes(routesConfig, app)}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
