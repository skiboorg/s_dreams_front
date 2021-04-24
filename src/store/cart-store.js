
import { uid } from 'quasar'

const state = () => ({
  items:{
    "id": 1,
    "items": [
        {
            "id": 0,
            "item": {
                "id": 0,
                "name": "",
                "image": ""
            },
            "size": {
                "id": 3,
                "sostav": "",
                "name": "",
                "price": 0,
                "is_selected": false
            },
            "quantity": 0,
            "price": 0
        }
    ],
    "total_price": 0
},
  bonuses:0,
  promo:0


})

const mutations = {
  updateBonuses(state,data){
    state.bonuses = data
  },
  updatePromo(state,data){
    state.promo = data
  },
  updateCart(state,data){
    state.items = data
    console.log(state)
  }
}

const actions = {
  async fetchCart({commit,state,dispatch}){

      console.log('fetchCart')

      let session_id = this._vm.$cook.get('session_id')
     // let session_id = Cookies.get('session_id')
      if (!session_id) {
        this._vm.$cook.set('session_id', uid())
        session_id = this._vm.$cook.get('session_id')
       // session_id = Cookies.get('session_id')
      }
      const response_cart = await this._vm.$api.get(`/api/get_cart?session_id=${session_id}`)
      commit('updateCart', response_cart.data)
      //commit('setCategories', cats.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))


  },

  eraseCart({commit,state}, data) {
    commit('updateCart', { "id": 13,
      "pizza_constructors": [],
      "souces": [],
      "items": [],
      "total_price": 0,
      "total_bonuses": 0,
      "created_at": "",
      "updated_at": "",
      "persons": 1,
      "client": null,
      "guest": null})
    commit('updatePromo',0)
    commit('updateBonuses',0)
  },
  addBonuses({commit},data){
    commit('updateBonuses',data)
  },
  addPromo({commit},data){
    commit('updatePromo',data)
  },

}

export const getters = {
  items_in_cart: (state) => state.items,
  cart_total_price: (state) => state.items.total_price,
  cart_items_count: (state) => {
    return (state.items.items.length)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
