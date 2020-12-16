import { message } from 'antd';
import * as service from '../services/user';
import { PAGE_SIZE } from '../constants'

export default {
  namespace: 'user',

  state: {
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: PAGE_SIZE,
    loading: false, // table loading
    isCreate: true,
    visible: false,
    record: {}, // 当前编辑的行
    selectedRowKeys: [], // 多选
    where: {}, // 当前查询条件
  },

  reducers: {
    save(state,action) {
      return {...state, ...action.payload}
    },

    hideModal(state) {
      return { ...state, visible: false }
    }
  },

  effects: {
    *query({payload}, {put,call}) {
      const result = yield call(service.getUserList, payload);
      if(result.code === 0) {
        yield put({
          type: 'save', 
          payload: {
            list: result.data.list,
            total: result.data.total,
            pageNum: payload.pageNum || 1,
            pageSize: payload.pageSize || PAGE_SIZE
          }
        });
      } else {
        message.error(result.data);
      }
    },

    // *filterQuery({payload}, {put,call}) {
    //   const result = yield call(service.getUserList, payload);
    //   if(result.code === 0) {
    //     yield put({
    //       type: 'save', 
    //       payload: {
    //         list: result.data.list,
    //         total: result.data.total,
    //         pageNum: payload.pageNum || 1,
    //         pageSize: payload.pageSize || PAGE_SIZE
    //       }
    //     });
    //   } else {
    //     message.error(result.data);
    //   }
    // }

    *create({payload}, {put, call, select}) { // 用来获取指定state中的值
      const result = yield call(service.createUser, payload);
      if(result.code === 0) {
        const pageSize = yield select(state => state.user.pageSize);
        // 重新查询 第一页
        yield put({type: 'query', payload: {pageNum: 1, pageSize}});
        // 关闭模态框
        yield put({type: 'hideModal'});
        message.success('新增成功');
      }else {
        message.error(result.data);
      }
    },

    *update({payload}, {put, call, select}) {
      const result = yield call(service.updateUser, payload);
      if(result.code === 0) {
        const pageNum = yield select(state => state.user.pageNum);
        const pageSize = yield select(state => state.user.pageSize);
        yield put({type: 'query', payload: {pageNum, pageSize}});
        yield put({type: 'hideModal'});
        message.success('编辑成功');
      }else {
        message.error(result.data);
      }
    },

    *delete({payload}, {put, call, select}) {
      const result = yield call(service.deleteUser, payload);
      if(result.code === 0) {
        const pageNum = yield select(state => state.user.pageNum);
        const pageSize = yield select(state => state.user.pageSize);
        yield put({type: 'query', payload: {pageNum, pageSize}});
        message.success('删除成功');
      }else {
        message.error(result.data);
      }
    },

    *multiDelete({payload},{put, call, select}) {
      const result = yield call(service.multiDeleteUser, payload);
      if(result.code === 0) {
        const pageNum = yield select(state => state.user.pageNum);
        const pageSize = yield select(state => state.user.pageSize);
        yield put({type: 'query', payload: {pageNum, pageSize}});
        message.success('删除成功');
      }else {
        message.error(result.data);
      }
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => { // query是url后的参数
        if(pathname === '/admin/user') {
          dispatch({type: 'query', payload: {pageNum: 1, pageSize: PAGE_SIZE}}); // 在model内dispatch不用加前缀
        }
      })
    }
  }
}