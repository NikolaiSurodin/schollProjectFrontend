import axios from 'axios'
import { store } from '@/store'

export const instance = axios.create( {
    baseURL: process.env.VUE_APP_API_BASE_URL,
    params: {},
    options: {}
} )
instance.interceptors.request.use( ( config ) => {
    config.headers.Authorization = `Bearer ${ localStorage.getItem( 'token' ) } `
    return config
} )

instance.interceptors.response.use(
    response => response,
    error => {
        if ( error.response.status === 401 ) {
            store.dispatch( 'sendLogout' )
                .then( () => {
                window.location.reload()
            } )
        } else {
            return Promise.reject( { body: error.response.data || error.response.body, status: error.response.status } )
        }
    }
)

