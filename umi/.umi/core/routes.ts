// @ts-nocheck
import { ApplyPluginsType } from 'C:/Users/Yanglei/AppData/Roaming/npm/node_modules/umi/node_modules/_@umijs_runtime@3.2.20@@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.js').default
      },
      {
        "path": "/profile",
        "exact": true,
        "component": require('@/pages/profile.js').default
      },
      {
        "path": "/user/add",
        "exact": true,
        "component": require('@/pages/user/add.js').default
      },
      {
        "path": "/user/list",
        "exact": true,
        "component": require('@/pages/user/list.js').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
