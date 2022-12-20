import router from '@/router'

export default {
    SET_ME( state, me ) {
        state.me = me
        localStorage.setItem( 'me', JSON.stringify( me ) )

    },
    SET_ADMIN( state, me ) {
        if( me.role === 'ADMIN' ) {
            state.isAdmin = true
            localStorage.setItem( 'admin', JSON.stringify( true ) )
            router.push( '/list' )
        } else {
            localStorage.setItem( 'admin', JSON.stringify( false ) )
            router.push( '/new-request' )
        }
    },
    SET_TOKEN( state, token ) {
        state.token = token
        localStorage.setItem( 'token', token )
        state.isLoggedIn = true
    },
    LOGOUT( state ) {
        state.me = {}
        localStorage.removeItem( 'token' )
        localStorage.removeItem( 'me' )
        localStorage.removeItem( 'admin' )
        state.token = null
        state.isLoggedIn = false
        state.isAdmin = false
    }
}