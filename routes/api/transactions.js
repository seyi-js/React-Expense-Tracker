const express = require( 'express' );
const router = express.Router();
const Transact = require( '../../models/transactions' );
const { redirectLogin, findCurrentUser } = require( '../../middleware/auth' );


//@route GET api/transactions/
//@desc  GET ALL Transactions
//@ccess  Private

router.get( '/', redirectLogin,findCurrentUser, ( req, res ) => {
    res.json(userdata.transactions)
} );


//@route POST api/transactions/add
//@desc  Add Transactions
//@ccess  Private

router.post( '/add', redirectLogin, findCurrentUser, ( req, res ) => {
    
    
    const { text, amount } = req.body;
    //Validation
    if ( !text || !amount ) {
        res.status( 400 ).json( { msg: 'Please Enter all Fields' } )
    } else {
        const newTransact = new Transact( {
            text,
            amount: parseInt( amount )
        } );

        Transact.create( newTransact )
            .then( data => {
                userdata.transactions.push( data._id )
                userdata.save()
                res.status( 200 ).json( data )
            } )
            .catch( err => res.status( 500 ).json( { msg: 'oops! something went wrong' } ) )
    }
} );

//@route DELETE api/transactions/delete/:id
//@desc  DELETE Transaction
//@ccess  Private

router.delete( '/delete/:id',redirectLogin, ( req, res ) => {
    const id = req.params.id
    //Validation
    if ( !id ) {
        res.status(400).json({msg: "Transaction not found"})
    } else {
        Transact.findById( id )
            .then( data => {
                data.remove(),
                res.status(200).json(id)
            } )
        .catch(err => res.status(400).json({msg: "Transaction not Found"}))
    }
})


module.exports = router;