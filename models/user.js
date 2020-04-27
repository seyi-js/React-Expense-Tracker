const mongoose = require( 'mongoose' );
var ObjectId = mongoose.Schema.Types.ObjectId;
const userShcema = new mongoose.Schema( {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    transactions:[{
        type: ObjectId,
        ref: 'transactions'/*the colection i'm linking to  */// Purchased items id would be saved here
        } ],
    date: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model( 'users', userShcema );
module.exports = User