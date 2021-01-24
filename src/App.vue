<template>
  <div id="app">
    <ProductList />
    <hr />
    <CartList />
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import CartList from "./components/CartList.vue";

export default {
  name: "App",
  components: {
    ProductList,
    CartList,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
