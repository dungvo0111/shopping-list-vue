import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
  });
  return formatter.format(value);
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
