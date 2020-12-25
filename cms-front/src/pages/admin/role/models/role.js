import { message } from 'antd';
import * as service from '../services/role';
import { PAGE_SIZE } from '../constants'

const ENTITY = 'role';

export default {
  namespace: 'role',

  state: {
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: PAGE_SIZE,
    isCreate: true,
    editVisible: false,
    setPermissionVisible: false,
    record: {}, // 当前编辑的行
    selectedRowKeys: [], // 多选
    where: {username: 'aaa'}, // 当前查询条件
  },

  reducers: {
    save(state,action) {
      return {...state, ...action.payload}
    },

    hideModal(state) {
      return { ...state, editVisible: false, setPermissionVisible: false }
    }
  },

  effects: {
    *query({payload: {pageNum, pageSize, ...where}}, {put,call}) { // 剩余参数，后面的参数通通放到where
      const result = yield call(service.getRoleList, {pageNum, pageSize, ...where}); // 展平传入，qs处理

      if(result.code === 0) {
        yield put({
          type: 'save', 
          payload: {
            list: result.data.list,
            total: result.data.total,
            pageNum: pageNum || 1,
            pageSize: pageSize || PAGE_SIZE,
            where
          }
        });
      } else {
        message.error(result.data);
      }
    },

    *create({payload}, {put, call, select}) { // 用来获取指定state中的值
      const result = yield call(service.createRole, payload);
      if(result.code === 0) {
        const pageSize = yield select(state => state[ENTITY].pageSize);
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
      const result = yield call(service.updateRole, payload);
      if(result.code === 0) {
        const pageNum = yield select(state => state[ENTITY].pageNum);
        const pageSize = yield select(state => state[ENTITY].pageSize);
        yield put({type: 'query', payload: {pageNum, pageSize}});
        yield put({type: 'hideModal'});
        message.success('编辑成功');
      }else {
        message.error(result.data);
      }
    },

    *delete({payload}, {put, call, select}) {
      const result = yield call(service.deleteRole, payload);
      if(result.code === 0) {
        const pageNum = yield select(state => state[ENTITY].pageNum);
        const pageSize = yield select(state => state[ENTITY].pageSize);
        yield put({type: 'query', payload: {pageNum, pageSize}});
        message.success('删除成功');
      }else {
        message.error(result.data);
      }
    },

    *multiDelete({payload},{put, call, select}) {
      const result = yield call(service.multiDeleteRole, payload);
      if(result.code === 0) {
        const pageNum = yield select(state => state[ENTITY].pageNum);
        const pageSize = yield select(state => state[ENTITY].pageSize);
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
        if(pathname === `/admin/${ENTITY}`) {
          dispatch({type: 'query', payload: {pageNum: 1, pageSize: PAGE_SIZE}}); // 在model内dispatch不用加前缀
        }
      })
    }
  }
}