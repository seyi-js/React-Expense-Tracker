import {
  DELETE_ITEM,
  ADD_ITEM,
  LOAD_TRANSACTIONS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADING,
    USER_LOADED,
  } from '../actions/types';
const initialState = {
  token: localStorage.getItem('token'),
  transactions: [],
  userLoading:false,
  isAuthenticated: null,
  user: null
    
}

export default (state = initialState, action)=>{
  
  switch ( action.type ) {
    case DELETE_ITEM:
      return {
        ...state,
        transactions: state.transactions.filter( transaction => transaction._id !== action.payload )
      };
    case ADD_ITEM:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case LOAD_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem( 'token', action.payload.token )
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        user: action.payload.user
        
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem( 'token' )
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    case USER_LOADING:
      return {
        ...state,
        userLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        userLoading: false,
        user: action.payload,
      }
      default:
        return state;
       
    }
}

