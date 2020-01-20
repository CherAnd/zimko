import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import { User } from 'src/models/classes'
// TODO: Сделать записи в стиле дневника. Привязанные к дате

Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    accessToken: null,
    user: new User.CreateGuest(),
    loggingIn: false,
    loginError: null,
    notes: [],
    isLoading: false
  },
  getters: {
    notes (state) {
      return state.notes
    },
    // notesDated (state) {
    //   let byDate = {}
    //   for (let note of state.notes) {
    //     const t = new Date(note.timestamp)
    //     const noteDate = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
    //     if (noteDate in byDate) byDate[noteDate].push(note.id)
    //     else byDate[noteDate] = [note.id]
    //   }
    //   return byDate
    // },
    getNoteById: (state) => (id) => {
      let note = state.notes.find(n => n.id === parseInt(id))
      return note
    },
    // getNoteDateTimeById: (state) => (id) => {
    //   let t = new Date(state.notes.find(note => note.id === id).timestamp)
    //   return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.toLocaleTimeString()
    // },
    // getDates (state) {
    //   let dates = []
    //   for (let date in state.byDate) {
    //     dates.push(date)
    //   }
    //   return dates
    // },
    // getNotesByDate (state) {
    //   let byDate = {}
    //   for (let id in state.note) {
    //     const t = new Date(state.note[id].created_at)
    //     const noteDate = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
    //     if (noteDate in state.byDate) state.byDate[noteDate].push(id)
    //     else Vue.set(state.byDate, noteDate, [id])
    //   }
    //   return byDate
    // },
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
    updateNotes (state, data) {
      state.notes = data
    },
    addNote (state, data) {
      state.notes.push(data)
    },
    updateNote (state, data) {
      const index = state.notes.findIndex(note => note.id === data.id)
      state.notes[index].id = data.id
      state.notes[index].title = data.title
      state.notes[index].body = data.body
      state.notes[index].created_at = data.created_at
      state.notes[index].updated_at = data.updated_at
      state.notes[index].date = data.date
      state.notes[index].user_id = data.user_id
    },
    deleteNote (state, id) {
      const index = state.notes.findIndex(note => note.id === id)
      state.notes.splice(index, 1)
    },
    updateNotesList (state, notes) {
      state.notes = notes
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
    },
    fetchNotes ({ commit, dispatch, state }) {
      axios.get('/api/notes').then((response) => {
        store.commit('updateNotes', response.data.data)
      })
    },
    addNote ({ commit, dispatch, state }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/notes', {
          ...data
        })
          .then((response) => {
            commit('addNote', response.data.data)
            resolve(response.data.data.id)
          })
          .catch((error) => { reject(error) })
      })
    },
    updateNote ({ commit, dispatch, state }, data) {
      axios.put('/api/notes/' + data.id, data.value).then((response) => {
        commit('updateNote', response.data.data)
      })
    },
    deleteNote ({ commit, dispatch, state }, id) {
      return new Promise((resolve, reject) => {
        axios.delete('/api/notes/' + id).then((response) => {
          commit('deleteNote', id)
          resolve()
        })
      })
    }
  }
})

export default store
