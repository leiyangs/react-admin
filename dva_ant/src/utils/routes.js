import { Redirect, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import React from 'react';

function mydynamic({app, models, component}) {
  return class extends React.Component {
    state = { Component: null }
    componentDidMount() {
      Promise.all([
        Promise.all(models()),
        component()
      ]).then(([models, Component]) => {
        models.map(model => app.model(model));
        this.setState({Component});
      })
    }
  }
}

export function renderRoutes(routesConfig, app) {
  return routesConfig.map(({path, component: getComponent, routes, models=[]}, index) => {
    return (
      // <Route key={index} path={path} render={props=><Components {...props} routes={routes} />} />
      // 路由懒加载处理
      <Route key={index} path={path} routes={routes} component={dynamic({
        app,
        models: () => models,
        component: () => {
          return getComponent().then(result => {
            const Component = result.default || result; // result.default 是es导出
            return props=><Component {...props} routes={routes} />
          })
        }
      })} />
    )
  })
}

export function renderRedirect(routesConfig) {
  const { path } = routesConfig.find(route => route.redirect) || routesConfig[0];
  return <Redirect to={path} />
}
