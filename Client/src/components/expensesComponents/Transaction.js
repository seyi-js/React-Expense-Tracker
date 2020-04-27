import React from 'react'
import store from '../../store'

const Transaction = ({transaction, deleteItem}) => {

     // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const delItem =( id ) => {
    store.dispatch(deleteItem(id))
  }
    return (
        <>
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
                { transaction.text } <span>{ sign }${Math.abs(transaction.amount)}</span><button onClick={()=>delItem(transaction._id)} className="delete-btn">x</button>
      </li>  
        </>
    )
}

export default Transaction