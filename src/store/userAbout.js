// 初始 state 对象
const initState = {
  token: ''
}
const initToken = localStorage.getItem('token')

if (initToken) {
  initState.token = initToken
}

// 用户相关的 store 实例
export default {
  namespaced: true,
  state: initState,
  actions: {},
  mutations: {
    updateToken(state, value) {
      state.token = value
      this.commit('userAbout/saveStateToStorage')
    },
    saveStateToStorage(state) {
      localStorage.setItem('token', state.token)
    },
    clearState(state) {
      state.token = ''
      this.commit('userAbout/saveStateToStorage')
    }
  },
  getters: {}
}
