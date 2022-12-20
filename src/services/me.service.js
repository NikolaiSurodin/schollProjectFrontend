import { instance } from '@/helpers/http.helper'

export const login = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        instance.post( '/user/login', data )
            .then( response => {
                resolve( response.data )
            } )
            .catch( (err) => {
                reject(err)
            } )
    } )
}

export const register = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        instance.post( '/user/registration', data )
            .then( response => {
                resolve( response.data )
            } )
            .catch( ( err ) => {
                reject( err )
            } )
    } )
}

export const getMe = () => {
    return new Promise( ( resolve, reject ) => {
        instance.get( '/user/me' )
            .then( response => {
                resolve( response.data )
            } )
            .catch( () => {
                reject()
            } )
    } )
}