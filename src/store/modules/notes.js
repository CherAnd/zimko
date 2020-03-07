
// Dependencies ===============
import axios from 'axios'
import Vue from 'vue'
const store = { namespaced: true }

// State ======================

store.state = {
  all: {},
  active: false
}

// Mutations ==================

store.mutations = {
  active (state, active) {
    state.active = active
  },
  flush (state) {
    state.all = {}
  },
  add (state, note) {
    Vue.set(state.all, note.id, note)
  },
  update (state, { id, note }) {
    state.all[id] = note
  },
  remove (state, id) {
    Vue.delete(state.all, id)
  }
}

// Actions ====================

store.actions = {
  all ({ commit }, all) {
    for (let note of all) { commit('add', note) }
  },
  list ({ commit, dispatch, state }) {
    axios.get('/api/notes').then((response) => {
      commit('flush')
      dispatch('all', response.data.data)
    })
  },
  insert ({ commit, dispatch, state }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/api/notes', {
        ...data
      })
        .then((response) => {
          commit('add', response.data.data)
          commit('active', response.data.id)
          resolve(response.data.data.id)
        })
        .catch((error) => { reject(error) })
    })
  },
  update ({ commit, dispatch, state }, data) {
    axios.put('/api/notes/' + data.id, data.value).then((response) => {
      commit('update', { id: data.id || state.active, note: response.data.data })
    })
  },
  remove ({ commit, dispatch, state }, id) {
    axios.delete('/api/notes/' + id).then(() => {
      commit('remove', id)
    })
  }
}

// Getters ====================

store.getters = {
  active (state) {
    return state.active ? state.all[state.active] : false
  }
}

// Export =====================

export default store
