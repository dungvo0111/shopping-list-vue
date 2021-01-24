import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
  },
  getters: {
    cartTotal: (state) => {
      return state.cart.reduce(
        (total, product) => total + product.price * product.inventory,
        0
      );
    },
  },
  mutations: {
    getAllProducts(state, products) {
      state.products = products;
    },

    decreaseInventory(state, id) {
      state.products.map((product) => {
        if (product.id === id) product.inventory--;
      });
    },

    increaseCartItemInventory(state, id) {
      state.cart.map((product) => {
        if (product.id === id) product.inventory++;
      });
    },

    addItemToCart(state, newItem) {
      state.cart = [...state.cart, newItem];
    },
  },
  actions: {
    fetchProducts({ commit }) {
      shop.getProducts((products) => commit("getAllProducts", products));
    },

    addItem({ commit, state }, id) {
      const product = state.products.find((product) => product.id === id);
      if (product && product.inventory > 0) {
        commit("decreaseInventory", id);
        const inCart = state.cart.find((product) => product.id === id);
        if (inCart) {
          commit("increaseCartItemInventory", id);
        } else {
          commit("addItemToCart", { ...product, inventory: 1 });
        }
      }
    },
  },
  modules: {},
});