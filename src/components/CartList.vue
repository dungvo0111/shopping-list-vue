<template>
  <div class="wrapper">
    <h1>Cart List</h1>
    <ul class="products">
      <li v-for="product in products" :key="product.id" class="product">
        <p>
          {{ product.title }} - {{ product.price | toCurrency }} -
          {{ product.inventory }}
        </p>
      </li>
    </ul>
    <div class="totalWrapper" v-if="products.length > 0">
      <p>Total: {{ total | toCurrency }}</p>
    </div>
    <button v-if="products.length" @click="checkOut">Check out</button>
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "CartList",
  computed: {
    ...mapState("cart", {
      products: (state) => state.cart,
      message: (state) => state.message,
    }),
    ...mapGetters("cart", {
      total: "cartTotal",
    }),
  },
  methods: {
    ...mapActions("cart", {
      checkOut: "checkOut",
    }),
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
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

.totalWrapper {
  text-align: left;
  max-width: 400px;
  width: 100%;
  font-weight: bold;
  margin-bottom: 30px;
}

button {
  float: right;
  padding: 2px 8px;
}

button:not(:disabled) {
  cursor: pointer;
}

.message {
  margin-top: 30px;
  font-weight: bold;
}
</style>