import IndexPage from './routes/IndexPage';
import Home from './routes/Home';
import User from './routes/User';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Register from './routes/Register';

// 配置式路由 集中式路由
export default [
  { 
    path: '/',
    component: IndexPage,
    routes: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/profile',
        component: Profile
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      },
    ]
  }
]