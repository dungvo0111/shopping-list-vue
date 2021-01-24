import shop from "@/api/shop";

const products = {
  namespaced: true,
  state: {
    products: [],
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
  },
  actions: {
    fetchProducts({ commit }) {
      shop.getProducts((products) => commit("getAllProducts", products));
    },
  },
};

export default products;
