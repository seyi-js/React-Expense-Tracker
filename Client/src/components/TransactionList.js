import React from 'react'
import { connect } from 'react-redux'
import Transaction from './Transaction'
import { deleteItem } from '../actions/Action'

const TransactionList = (props) => {

  const {transactions} = props.transaction
    return (
        <React.Fragment>
           
      <h3>History</h3>
        <ul className="list">
          { transactions.map( transaction => (
            <Transaction transaction={ transaction } key={ transaction.id } deleteItem={ deleteItem}/>
          ))}
        
      </ul> 
        </React.Fragment>
    )
}

const mapStateToProps = ( state ) => ({
  transaction: state.transaction
})
export default connect(mapStateToProps, {deleteItem})(TransactionList)