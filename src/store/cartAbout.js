import { getCart } from '@/api/cartAPI.js'

export default {
  namespaced: true,
  state: {
    cartInfo: []
  },
  actions: {
    async updateCart(context) {
      const { data: res } = await getCart()
      if (res.resultCode === 200) {
        context.commit('addCart', res.data)
      }
    }
  },
  mutations: {
    addCart(state, value) {
      state.cartInfo = value
    }
  },
  getters: {}
}
