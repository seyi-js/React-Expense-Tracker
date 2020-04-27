const jwt = require( 'jsonwebtoken' )
const User = require('../models/user')

const redirectLogin = ( req, res, next ) => {
    const token = req.header( 'x-auth-token' )
    
    if ( !token ) {
        res.status( 401 ).json( { msg: 'No token, authorization Denied' } )
    } else {
        if ( token ) {
            try {
                const decoded = jwt.verify( token, process.env.SESSION_SECRET );
                req.user = decoded;
                // console.log( decoded )
                next();
            } catch ( e ) {
                res.status( 400 ).json( { msg: 'Ivalid Token' } )
            }
        }
    }
    
};

const findCurrentUser = ( req, res, next ) => {
    User.findById( req.user.id )
        .populate('transactions')
    .select("-password")
    .then(user => {
      userdata = user;
      next();
    });
} 


module.exports = { redirectLogin, findCurrentUser };

