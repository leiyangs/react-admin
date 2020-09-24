import { Redirect, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

export function renderRoutes(routesConfig, app) {
  return routesConfig.map(({path, component: getComponents, routes, models=[]}, index) => {
    return (
      // <Route key={index} path={path} render={props=><Components {...props} routes={routes} />} />
      // 路由懒加载处理
      <Route key={index} path={path} routes={routes} component={dynamic({
        app,
        models: () => models,
        component: () => {
          return getComponents().then(result => {
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
