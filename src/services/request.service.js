import { instance } from '@/helpers/http.helper'

export const requestList = () => {
    return new Promise( ( resolve, reject ) => {
        instance.get( '/request' )
            .then( response => {
                resolve( response.data )
            } )
            .catch( () => {
                reject()
            } )
    } )
}

export const userRequestList = () => {
    return new Promise( ( resolve, reject ) => {
        instance.get( '/request/my' )
            .then( response => {
                resolve( response.data )
            } )
            .catch( () => {
                reject()
            } )
    } )
}

export const sendRequest = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        instance.post( '/request', data )
            .then( response => {
                resolve( response.data )
            } )
            .catch( ( err ) => {
                reject( err )
            } )
    } )
}

export const updateRequest = ( data, id ) => {
    return new Promise( ( resolve, reject ) => {
        instance.patch( `/request/{:id}`.replace( '{:id}', id ), data )
            .then( response => {
                resolve( response.data )
            } )
            .catch( ( err ) => {
                reject( err )
            } )
    } )
}