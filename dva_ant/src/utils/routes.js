import { Redirect, Route } from 'dva/router';

export function renderRoutes(routesConfig) {
  return routesConfig.map(({path, component: Components, routes}, index) => {
    return (
      <Route key={index} path={path} render={props=><Components {...props} routes={routes} />} />
    )
  })
}

export function renderRedirect(routesConfig) {
  const { path } = routesConfig.find(route => route.redirect) || routesConfig[0];
  return <Redirect to={path} />
}
