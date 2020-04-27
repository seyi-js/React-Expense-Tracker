import Axios from 'axios'
import {
    DELETE_ITEM,
    ADD_ITEM,
    LOAD_TRANSACTIONS,
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADING,
} from './types';
import { returnErrors } from './errorActions';
const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export const verifyUser = () => (dispatch, getState) => {
    dispatch( {
        type: USER_LOADING
    } );
 
    Axios
        .get( 'api/user/verify', tokenConfig(getState))
        .then( res => dispatch( {
            type: USER_LOADED,
            payload: res.data
        } ) )
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch( {
                
                type: AUTH_ERROR
            })
        })
}


export const deleteItem = ( id ) => (dispatch, getState) => {
    
    Axios.delete( `api/transactions/delete/${ id }`, tokenConfig(getState) )
        .then( res => dispatch( {
             type: DELETE_ITEM,
             payload: res.data
         } ) ).catch(err => console.log(err))
}

export const addItem = ( body) => (dispatch,getState) => {
    // const Body = JSON.stringify({text,amount})
    Axios
        .post( 'api/transactions/add',body,  tokenConfig(getState))
        .then( res => dispatch( {
            type: ADD_ITEM,
            payload: res.data
        } ) )
    .catch(err => console.log(err))
}

export const getTransactions = () => (dispatch, getState) => {
    Axios
        .get( 'api/transactions',  tokenConfig(getState) )
        .then( res => dispatch( {
            type: LOAD_TRANSACTIONS,
            payload: res.data
        } ) )
    .catch(err => console.log(err))
}

//Register User

export const register = ( { name, email, password, password2 } ) => dispatch => {
    const body = JSON.stringify( { name, email, password, password2 } );
    Axios
        .post( 'api/user/register', body, config )
        .then( res => dispatch( {
            type: REGISTER_SUCCESS,
            payload:res.data
        } ) )
        .catch( err => {
            dispatch( returnErrors( err.response.data, err.response.status, 'REGISTER_FAIL' ) )
            dispatch( {
                type:REGISTER_FAIL
            })
        })
}


//Login User

export const login = ( {email, password,} ) => dispatch => {
    const body = JSON.stringify( {  email, password} );
    Axios
        .post( 'api/user/login', body, config )
        .then( res => dispatch( {
            type: LOGIN_SUCCESS,
            payload:res.data
        } ) )
        .catch( err => {
            dispatch( returnErrors( err.response.data, err.response.status, 'LOGIN_FAIL' ) )
            dispatch( {
                type:LOGIN_FAIL
            })
        })
}

export const tokenConfig = getState => {
       //Get Token
       const token = getState().transaction.token;

       //Headers
       const conf = {
           headers: {
               "Content-Type":"application/json"
           }
       }
   
       if ( token ) {
           config.headers['x-auth-token']= token
       }
    console.log( token )
    
    return config;
}