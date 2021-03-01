import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 第三方放一块
// import axios from 'axios'
// Vue.prototype.$axios = axios;
// import VCharts from 'v-charts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 自己的放一块
import * as filters from './filters';
import './permission';
import '@/assets/css/reset.css';   // reset css, use normalize.css
import '@/styles/index.scss';    // 重新命名 index.css,放置在src/styles/index.css 全局的一些样式

// excel, 导出为表格
// import JsonExcel from "vue-json-excel";
// Vue.component("downloadExcel", JsonExcel);


// Vue.use 放一起
Vue.use(ElementUI);

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Vue.use(VCharts);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
