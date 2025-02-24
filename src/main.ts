import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/styles'
import router from './router'
import store from './store'

import "@/styles/main.scss";

createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .mount('#app')
