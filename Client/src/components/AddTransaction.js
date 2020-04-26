import React, {useState} from 'react';
import { addItem } from '../actions/Action'
import { connect } from 'react-redux';
import store from '../store'

const AddTransaction = () => {
    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0)



  const add = e => {
    e.preventDefault();
    const newTrans = {
      id: Math.floor( Math.random() * 100000000 ),
      text,
      amount: parseInt( amount )
    };

    store.dispatch( addItem( newTrans ) );
    setText( '' )
    setAmount(0)

}


    return (
        <>
        <h3>Add new transaction</h3>
      <form onSubmit={add} >
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text"  value={text} onChange={e=>setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br />
            (negative - expense, positive - income)</label>
          <input type="number"  value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
        </>
    )
}
const mapStateToProps = ( state ) => ({
  transaction: state.transaction
})
export default connect(mapStateToProps, {addItem})(AddTransaction)