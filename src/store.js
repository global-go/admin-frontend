import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    users: []
  },
  mutations: {
    login(state, payload) {
      state.token = payload
    },
    setUserList(state, payload) {
      state.users = payload
    },
    modifytype(state, payload) {
      Vue.set(this.state.users[payload.index], "type", payload.type)
      // state.users[index].type = payload.type
    },
    modifybalance(state, payload) {
      Vue.set(this.state.users[payload.index], "balance", payload.balance)
    },
    deleteuser(state, payload) {
      state.users.splice(payload.index, 1)
    }
  },

  actions: {

  }
})
