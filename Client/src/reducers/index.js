import { combineReducers } from 'redux';
import Reducer from './Reducer'
import error from './errorReducer'



export default combineReducers({
  transaction: Reducer,
  error: error
  
  
  
});