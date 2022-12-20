import { login, getMe } from '@/services/me.service'

export default {
    sendLogin( { commit, dispatch }, data ) {
        return new Promise( ( resolve, reject ) => {
            login( data )
                .then( ( response ) => {
                    if( response.jwtToken ) {
                        commit( 'SET_TOKEN', response.jwtToken )
                        dispatch( 'fetchMe' )
                        resolve()
                    }
                } )
                .catch( ( err ) => {
                    reject( err )
                } )
        } )
    },
    fetchMe( { commit } ) {
        return new Promise( ( resolve ) => {
            getMe().then( ( data ) => {
                commit( 'SET_ME', { ...data.me, ...data.company } )
                commit( 'SET_ADMIN', data.me )
                resolve()
            } )
        } )
    },
    sendLogout( { commit } ) {
        return new Promise( ( resolve ) => {
            commit( 'LOGOUT' )
            resolve()
        } )
    }

}
