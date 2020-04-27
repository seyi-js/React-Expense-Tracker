const mongoose = require( 'mongoose' );

const transShcema = new mongoose.Schema( {
    text: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Transact = mongoose.model( 'transactions', transShcema );
module.exports = Transact