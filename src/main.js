import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'


Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

//bus传值
Vue.prototype.$bus=new Vue();

Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
