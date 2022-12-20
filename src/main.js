import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { store } from '@/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.config.productionTip = false


Vue.config.productionTip = false

Vue.use( BootstrapVue )
Vue.use( IconsPlugin )
Vue.use( VueSweetalert2 )
Vue.use( VueLodash, { lodash: lodash } )
new Vue( {
    render: h => h( App ),
    router,
    store

} ).$mount( '#app' )