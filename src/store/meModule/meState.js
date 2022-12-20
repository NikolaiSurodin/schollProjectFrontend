export default {
    me: JSON.parse( localStorage.getItem( 'me' ) ) || {},
    token: localStorage.getItem( 'token' ),
    isLoggedIn: localStorage.getItem( 'token' ) !== null,
    isAdmin: JSON.parse( localStorage.getItem( 'admin' ) ) || false
}

