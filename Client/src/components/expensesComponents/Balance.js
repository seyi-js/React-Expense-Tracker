import React from 'react'
import { connect } from 'react-redux'
const Balance = (props) => {

    const {transactions} = props.transaction

    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    return (
        <React.Fragment>
        <h4>Your Balance</h4>
            <h1 >{ total}</h1>
        </React.Fragment>
    )
}

const mapStateToProps = ( state ) => ({
    transaction: state.transaction
  })
  export default connect(mapStateToProps, null)(Balance)