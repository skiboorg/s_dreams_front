import axios from 'axios'
import {Cookies} from 'quasar'

const api = axios.create({ baseURL: process.env.API })

export default ({ app, router, Vue, store, ssrContext }) => {
  const cook = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
  Vue.prototype.$cook = cook
  Vue.prototype.$api = api
  store.dispatch('cart/fetchCart')
}
export { api }
