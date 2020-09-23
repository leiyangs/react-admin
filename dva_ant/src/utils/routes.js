import { Router, Route } from 'dva/router';

export function renderRoutes(routesConfig) {
  return routesConfig.map(({path, component, routes}) => {
    return (
      <Route />
    )
  })
}
