import {
  DELETE_ITEM,
  ADD_ITEM
  } from '../actions/types';
const initialState = {
  transactions: [
      { id: 1, text: 'Flower', amount: -20 },
      { id: 2, text: 'Salary', amount: 300 },
      { id: 3, text: 'Book', amount: -10 },
      { id: 4, text: 'Camera', amount: 150 }
    ] 
    
}

export default (state = initialState, action)=>{
  
  switch ( action.type ) {
    case DELETE_ITEM:
      return {
        ...state,
        transactions: state.transactions.filter( transaction => transaction.id !== action.payload )
      };
    case ADD_ITEM:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
      default:
        return state;
       
    }
}

