import { message } from 'antd';
import * as service from '../services/user';
import { PAGE_SIZE } from '../constants'

export default {
  namespace: 'user',
  state: {
    list: [],
    total: 0,
    pageNum: 1,
  },
  reducers: {
    save(state,action) {
      return {...state, ...action.payload}
    }
  },
  effects: {
    *getUserList({payload}, {put,call}) {
      const result = yield call(service.getUserList, payload);
      if(result.code === 0) {
        yield put({type: 'save', payload: {list: result.data.list, total: result.data.total, pageNum: payload.pageNum}});
      } else {
        message.error(result.data);
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => { // query是url后的参数
        if(pathname === '/admin/user') {
          dispatch({type: 'getUserList', payload: {pageNum: 1, pageSize: PAGE_SIZE}}); // 在model内dispatch不用加前缀
        }
      })
    }
  }
}