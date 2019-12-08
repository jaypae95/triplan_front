import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: undefined,
    user: undefined,
    date: undefined,
    country: undefined,
    title: undefined,
    idPlan: undefined
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
    saveDateInfo (state, date) {
      state.date = date
    },
    saveCountryPosition (state, country) {
      state.country = country
    },
    saveTitle (state, title) {
      state.title = title
    },
    savePlanId (state, idPlan) {
      state.idPlan = idPlan
    },
    removeModal (state) {
      state.title = undefined
      state.country = undefined
      state.position = undefined
      state.idPlan = undefined
    }
  },
  plugins: [createPersist({
    namespace: 'triplan',
    initialState: {},
    expires: 7 * 24 * 60 * 60 * 1000 // a week
  })]
})
