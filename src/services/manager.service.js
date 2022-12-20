import { instance } from '@/helpers/http.helper'

export const managerList = ( value ) => {
    return new Promise( ( resolve, reject ) => {
        instance.get( '/manager', {
            params: {
                search: value
            }
        } )
            .then( response => {
                resolve( response.data )
            } )
            .catch( ( err ) => {
                reject( err )
            } )
    } )
}

export const create = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        instance.post( '/manager', data )
            .then( response => {
                resolve( response.data )
            } )
            .catch( ( err ) => {
                reject( err )
            } )
    } )
}