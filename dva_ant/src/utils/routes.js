import { Router, Route } from 'dva/router';

export function renderRoutes(routesConfig) {
  return routesConfig.map(({path, component: Components, routes}, index) => {
    return (
      <Route key={index} path={path} render={props=><Components {...props} routes={routes} />} />
    )
  })
}
