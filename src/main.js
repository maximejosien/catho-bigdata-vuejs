import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: {
    base: 'catho-bigdata-vuejs'
  }
}).$mount('#app')
