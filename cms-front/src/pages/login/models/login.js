export default {
  namespase: 'login',
  state: {
    isLogin: true
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    }
  }
}