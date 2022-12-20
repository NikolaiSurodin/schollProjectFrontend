import Vue from "vue"
import Vuex from "vuex"

import meModule from "@/store/meModule/meModule"


Vue.use( Vuex )


export const store = new Vuex.Store( {
    modules: {
        meModule,
    }
} )