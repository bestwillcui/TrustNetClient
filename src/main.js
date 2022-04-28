import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/css/main.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import './validation'
import VueObserveVisibility from 'vue-observe-visibility'
import vuetify from './plugins/vuetify';
import consts from './services/constants'
import Clipboard from 'v-clipboard'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGraduationCap)
Vue.component('font-awesome-icon', FontAwesomeIcon)
 
Vue.config.productionTip = false
Vue.prototype.$http = axios;

// Vue.use(Vuetify, {
//   iconfont: 'mdi',
// })
Vue.use(VueObserveVisibility);
Vue.use(Clipboard);

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify,

  created: function() {
  //  window.fbAsyncInit = function() {
  //    FB.init({
  //      appId      : consts.FB_APP_ID,
  //      xfbml      : true,
  //      version    : 'v4.0'
  //    });

  //   //  FB.getLoginStatus(function(response) {
  //   //    console.log(response);
  //   // });
  // };

  //  (function(d, s, id){
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) {return;}
  //   js = d.createElement(s); js.id = id;
  //   js.src = "//connect.facebook.net/en_US/sdk.js";
  //   fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));
 }
}).$mount('#app')
