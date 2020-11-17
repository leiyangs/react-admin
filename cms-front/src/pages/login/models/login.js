import { message } from 'antd';
import * as service from '../services/login';
import { decode } from 'jsonwebtoken';
import { routerRedux } from 'dva';

export default {
  namespase: 'login',
  state: {
    isLogin: false,
    user: null, // 当前登录用户的信息
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}; // action.payload是组件中dispatch过来的isLogin，覆盖state中的isLogin
    }
  },
  effects: { // saga generator
    *signup({payload}, {put, call}) {
      let result = yield call(service.signup, payload);
      if(result.code === 0) {
        yield put({type: 'save', payload: {isLogin: true}})
        message.success(result.data);
      }else {
        message.error(result.data);
      }
    },
    *signin({payload}, {put, call}) {
      let result = yield call(service.signin, payload);
      if(result.code === 0) {
        // 把返回的token存到localstorage中，方便重新获取
        const token = result.data;
        localStorage.setItem('token', token);
        const user = decode(token); // decode可以解密
        yield put({type: 'save', payload: {user}}); // 将当前登录用户信息放到仓库中去
        // 如果登录成功跳转到首页
        yield put(routerRedux.push('/admin'));
      }else {
        message.error(result.data);
      }
    }
  }
}