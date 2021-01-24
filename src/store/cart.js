import shop from "@/api/shop";

const cart = {
  namespaced: true,
  state: {
    cart: [],
    message: null,
    loading: false,
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
    increaseCartItemInventory(state, id) {
      state.cart.map((product) => {
        if (product.id === id) product.inventory++;
      });
    },

    addItemToCart(state, newItem) {
      state.cart = [...state.cart, newItem];
    },

    clearCart(state) {
      state.cart = [];
      state.message = "Checkout success!";
    },

    checkOutFailed(state) {
      state.message = "Check out failed! Please try again.";
    },

    clearMessage(state) {
      state.message = null;
    },

    setLoading(state) {
      state.loading = !state.loading;
    },
  },
  actions: {
    addItem({ commit, state, dispatch, rootState }, id) {
      const product = rootState.products.products.find(
        (product) => product.id === id
      );
      if (product && product.inventory > 0) {
        dispatch("clearMessage");
        commit("products/decreaseInventory", id, { root: true });
        const inCart = state.cart.find((product) => product.id === id);
        if (inCart) {
          commit("increaseCartItemInventory", id);
        } else {
          commit("addItemToCart", { ...product, inventory: 1 });
        }
      }
    },

    clearMessage({ commit }) {
      commit("clearMessage");
    },

    checkOut({ commit, state }) {
      commit("setLoading");
      if (state.cart) {
        shop.buyProducts(
          state.cart,
          () => {
            commit("setLoading");
            commit("clearCart");
          },
          () => {
            commit("setLoading");
            commit("checkOutFailed");
          }
        );
      }
    },
  },
};

export default cart;
