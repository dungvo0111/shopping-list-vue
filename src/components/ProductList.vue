<template>
  <div class="wrapper">
    <h1>Product List</h1>
    <ul class="products">
      <li v-for="product in products" :key="product.id" class="product">
        <p>
          {{ product.title }} - {{ product.price | toCurrency }} - {{ product.inventory }}
        </p>
        <button
          @click="addItem(product.id)"
          :disabled="product.inventory === 0"
        >
          Add
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ProductList",
  computed: mapState("products", {
    products: (state) => state.products,
  }),
  methods: {
    ...mapActions("products", {
      fetchProducts: "fetchProducts",
    }),
    ...mapActions("cart", {
      addItem: "addItem",
    }),
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.products {
  max-width: 400px;
  width: 100%;
  margin-top: 30px;
}

.product {
  list-style: none;
  margin-bottom: 30px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

button {
  float: right;
  padding: 2px 8px;
}

button:not(:disabled) {
  cursor: pointer;
}
</style>