import { decode } from 'jsonwebtoken';
import { routerRedux } from 'dva';

export default {
  namespace: 'admin',
  state: {
    user: null
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    }
  },
  effects: {
    *loadUser({payload}, {call, put}) {
      const token=localStorage.getItem('token');
      if (token) {
        const user = decode(token); // jwt中的decode
        yield put({type:'save',payload:{user}});
      } else {
        yield put(routerRedux.push('/login'));
      }
    }
  }
}
