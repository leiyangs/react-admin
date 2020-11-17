import { message } from 'antd';
import * as service from '../services/login';

export default {
  namespase: 'login',
  state: {
    isLogin: false
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
        message.success(result.data);
        // 把返回的token存到localstorage中，方便重新获取
        // 如果登录成功跳转到首页
      }else {
        message.error(result.data);
      }
    }
  }
}