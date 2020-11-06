import { message } from 'antd';

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
  effects: { // saga
    *signup({payload}, {put, call}) {
      // let result = yield call(service.signup, payload);
      // if(result.code == 0) {
      //   yield put({type: 'save', payload: {isLogin: true}})
      // }else {
      //   message.error(result.error);
      // }
    }
  }
}