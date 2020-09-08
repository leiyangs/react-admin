// @ts-nocheck
import { ApplyPluginsType } from 'C:/Users/user/AppData/Roaming/npm/node_modules/umi/node_modules/_@umijs_runtime@3.2.19@@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.js').default
  },
  {
    "path": "/profile",
    "exact": true,
    "component": require('@/pages/profile.js').default
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
