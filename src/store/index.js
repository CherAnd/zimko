import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import notes from 'src/store/modules/notes'

import { User } from 'src/models/classes'
// TODO: Сделать записи в стиле дневника. Привязанные к дате

Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    notes
  },
  state: {
    accessToken: null,
    user: new User.CreateGuest(),
    loggingIn: false,
    loginError: null,
    // notes: [],
    isLoading: false
  },
  getters: {
    getLoading (state) {
      return state.isLoading
    },
    token (state) {
      return state.accessToken
    }
  },
  mutations: {
    loginStart (state) { state.loggingIn = true },
    loginStop (state, errorMessage) {
      state.loggingIn = false
      state.loginError = errorMessage
    },
    updateUser (state, user) {
      state.user = new User(user.id, user.name, user.email)
    },
    updateAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    setLoading (state, val) {
      state.isLoading = val
    }
  },
  actions: {
    doRegister ({ commit }, registerData) {
      return new Promise((resolve, reject) => {
        commit('loginStart')
        axios.post('/api/register', {
          ...registerData
        })
          .then((response) => {
            commit('loginStop', null)
            commit('updateAccessToken', response.data.accessToken)
            resolve(response)
          })
          .catch((error) => {
            commit('loginStop', error)
            commit('updateAccessToken', null)
            reject(error)
          })
      })
    },
    doLogin ({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        commit('loginStart')

        axios.post('/api/login', {
          ...loginData
        })
          .then((response) => {
            commit('loginStop', null)
            commit('updateAccessToken', response.data.accessToken)
            commit('updateUser', response.data.user)
            resolve(response)
          })
          .catch((error) => {
            commit('loginStop', error)
            commit('updateAccessToken', null)
            reject(error)
          })
      })
    }
  }
})

export default store
