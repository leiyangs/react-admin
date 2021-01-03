import { message } from 'antd';
import * as service from '../services/resource';
import { PAGE_SIZE } from '../constants';

const ENTITY = 'resource';

export default {
  namespace: ENTITY,

  state: {
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: PAGE_SIZE,
    isCreate: true,
    editVisible: false,
    setPermissionVisible: false,
    record: {}, // 当前编辑的行
    selectedRowKeys: [], // 多选key
    selectedRows: [], // 多选rowData
    where: {}, // 当前查询条件
    resources: [], // treeData
    checkedKeys: [], // tree选中的id
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
      const result = yield call(service.getResourceList, {pageNum, pageSize, ...where}); // 展平传入，qs处理

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
      const result = yield call(service.createResource, payload);
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
      const result = yield call(service.updateResource, payload);
      if(result.code === 0) {
        const { pageNum, pageSize, where } = yield select(state => state[ENTITY]);

        yield put({type: 'query', payload: {pageNum, pageSize, ...where}});
        yield put({type: 'hideModal'});
        message.success('编辑成功');
      }else {
        message.error(result.data);
      }
    },

    *delete({payload}, {put, call, select}) {
      const result = yield call(service.deleteResource, payload);
      if(result.code === 0) {
        const { pageNum, pageSize } = yield select(state => state[ENTITY]);
        yield put({type: 'query', payload: {pageNum, pageSize}});
        message.success('删除成功');
      }else {
        message.error(result.data);
      }
    },

    *multiDelete({payload},{put, call, select}) {
      const result = yield call(service.multiDeleteResource, payload);
      if(result.code === 0) {
        const { pageNum, pageSize } = yield select(state => state[ENTITY]);
        yield put({type: 'query', payload: {pageNum, pageSize}});
        message.success('删除成功');
      }else {
        message.error(result.data);
      }
    },
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