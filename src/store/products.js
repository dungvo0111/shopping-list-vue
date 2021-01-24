import shop from "@/api/shop";

const products = {
  namespaced: true,
  state: {
    products: [],
    loading: false,
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

    setLoading(state) {
      state.loading = !state.loading;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      commit("setLoading");
      shop.getProducts((products) => {
        commit("setLoading");
        commit("getAllProducts", products);
      });
    },
  },
};

export default products;
