export default {
  namespase: 'login',
  state: {
    isLogin: false
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    }
  }
}