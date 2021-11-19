import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  actions: {
    setToken({ commit }, token) {
      commit('SETTOKEN', token)
    }
  },
  mutations: {
    SETTOKEN(state, token) {
      state.token = token
    }
  },
  modules: {}
})
