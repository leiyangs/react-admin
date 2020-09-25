/* import IndexPage from './routes/IndexPage';
import Home from './routes/Home';
import User from './routes/User';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Register from './routes/Register'; */

// 配置式路由 集中式路由
export default [
  {
    path: '/',
    component: () => import('./routes/IndexPage'),
    routes: [
      {
        path: '/home',
        component: () => import('./routes/Home'),
        models: () => [import('./models/home.js')],
        redirect: true,
      },
      {
        path: '/user',
        component: () => import('./routes/User')
      },
      {
        path: '/profile',
        component: () => import('./routes/Profile')
      },
      {
        path: '/login',
        component: () => import('./routes/Login')
      },
      {
        path: '/register',
        component: () => import('./routes/Register')
      },
    ]
  }
]
