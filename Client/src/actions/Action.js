
import {
    DELETE_ITEM,
    ADD_ITEM
} from './types';

 export const deleteItem = ( id ) => dispatch => {
    return dispatch( {
        type: DELETE_ITEM,
        payload: id
    })
}

export const addItem = (body) => dispatch => {
    return dispatch( {
        type: ADD_ITEM,
        payload: body
    })
}
