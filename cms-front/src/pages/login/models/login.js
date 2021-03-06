import { message } from 'antd';
import * as service from '../services/login';
import { decode } from 'jsonwebtoken';
import { routerRedux } from 'dva';

export default {
  namespace: 'login',
  state: {
    isLogin: true,
    user: null, // 当前登录用户的信息
  },
  reducers: { // 用来保存更新state值 effects中的put方法调用这里的方法
    save(state, action) {
      return {...state, ...action.payload}; // action.payload是组件中dispatch过来的isLogin，覆盖state中的isLogin
    }
  },
  effects: { // saga generator 用来做异步处理的
    *signup({payload}, {put, call}) {
      const result = yield call(service.signup, payload); // param参数传给接口
      if(result.code === 0) {
        yield put({type: 'save', payload: {isLogin: true}}) // 调用reducers 改变state中的值
        message.success(result.data);
      }else {
        message.error(result.data);
      }
    },
    *signin({payload}, {put, call}) {
      const result = yield call(service.signin, payload);
      if(result.code === 0) {
        // 把返回的token存到localstorage中，方便重新获取
        const token = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('isLogin', true);
        const user = decode(token); // decode可以解密
        yield put({type: 'save', payload: {user}}); // 将当前登录用户信息放到仓库中去
        // 如果登录成功跳转到首页
        yield put(routerRedux.push('/admin'));
      }else {
        message.error(result.data);
        localStorage.setItem('isLogin', false);
      }
    },
    *loadUser({payload}, {call, put}) {
      const token=localStorage.getItem('token');
      if (token) {
        const user = decode(token); // jwt中的decode
        yield put({type:'save',payload:{user}});
      } else {
        yield put(routerRedux.push('/login'));
      }
    }
  },
  // subscriptions: {
  //   setup({dispatch, history}) {
  //     history.listen(({pathname,query}) => {
  //       if(pathname === '/admin') {
  //         dispatch({type:'login/loadUser'});
  //       }
  //     })
  //   }
  // }
}