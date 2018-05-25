import Vue from 'vue';
import App from './App'
import router from './router';
import 'font-awesome/scss/font-awesome.scss';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import 'babel-polyfill'

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.axios = axios;

Vue.use(VueAwesomeSwiper);

import ActiveX from 'components/ActiveX';
import util from './utils/util';

Vue.use(util);

Vue.component('ActiveX', ActiveX);


// import store from './store';
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
})
