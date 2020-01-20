import axios from 'axios'

export default async ({ store, Vue }) => {
  Vue.prototype.$axios = axios
  axios.interceptors.request.use(function (config) {
    const token = store.getters.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, function (err) {
    return Promise.reject(err)
  })
}
