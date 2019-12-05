import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: undefined,
    user: undefined,
    department: undefined,
    position: undefined
  },
  mutations: {
    saveUser (state, user) {
      state.user = user
    },
    saveToken (state, token) {
      state.token = token
    },
    removeUser (state) {
      state.user = undefined
      state.token = undefined
    },
    saveDepartmentInfo (state, department) {
      state.department = department
    },
    saveCountryPosition (state, position) {
      state.position = position
    },
    removeModal (state) {
      state.department = undefined
      state.position = undefined
    }
  },
  plugins: [createPersist({
    namespace: 'triplan',
    initialState: {},
    expires: 7 * 24 * 60 * 60 * 1000 // a week
  })]
})
