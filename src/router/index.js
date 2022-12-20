import Vue from 'vue'
import VueRouter from 'vue-router'

import RequestForm from '@/views/RequestForm'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import RequestList from '@/views/RequestList'

import { store } from '@/store'

Vue.use( VueRouter )
const router = new VueRouter( {
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            props: true,
            component: Login,
            beforeEnter: ( to, from, next ) => {
                if( store.getters[ 'getIsLoggedIn' ] ) {
                    next( '/list' )
                }
                if( store.getters[ 'getIsLoggedIn' ] ) {
                    next( '/new-request' )
                }else {
                    next()
                }
            }
        },
        {
            path: '/login',
            name: 'Login',
            props: true,
            component: Login,
            beforeEnter: ( to, from, next ) => {
                if( store.getters[ 'getIsLoggedIn' ] ) {
                    next( '/list' )
                } else {
                    next()
                }
            }
        },
        {
            path: '/register',
            name: 'SignUp',
            props: true,
            component: SignUp,
            beforeEnter: ( to, from, next ) => {
                if( store.getters[ 'getIsLoggedIn' ] ) {
                    next( '/list' )
                } else {
                    next()
                }
            }
        },
        {
            path: '/list',
            name: 'RequestList',
            props: true,
            component: RequestList,
            meta: { auth: true }
        },
        {
            path: '/new-request',
            name: 'New request',
            props: true,
            meta: { auth: true },
            component: RequestForm
        }
    ]
} )
router.beforeEach( ( to, from, next ) => {
    if( to.matched.some( route => route.meta.auth ) && !store.getters[ 'getIsLoggedIn' ] ) {
        next( '/login' )
    } else {
        next()
    }
} )

export default router