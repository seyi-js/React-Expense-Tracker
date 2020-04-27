const express = require( 'express' );
const router = express.Router();
const User = require( '../../models/user' );
const bcrypt = require( 'bcryptjs' );
const jwt = require('jsonwebtoken')
const {redirectLogin, findCurrentUser} = require('../../middleware/auth')
//@route POST api/user/register
//@desc  POST Register User
//@ccess  Public

router.post( '/register', ( req, res ) => {
    const { name, email, password, password2} = req.body;
    // console.log(req.body)
    if ( name === '' || email === '' || password === '' || password2 === '' ) {
        res.status(400).json({msg: 'Please Enter all Fields'})
    } else {
        if ( password !== password2 ) {
            res.status(400).json({msg: 'Password not equal'})
        } else[
            User.findOne( { email } )
                .then( user => {
                    if ( user ) {
                        res.status(400).json({msg: 'User already Exist'})
                    } else {
                        const newUser = new User( {
                            name,
                            email,
                            password
                        } );
    
                        bcrypt.genSalt( 10, ( err, salt ) => {
                            if ( err ) {
                                console.log(err)
                            } else {
                                bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                                    if ( err ) {
                                        console.log(err)
                                    } else {
                                        newUser.password = hash;
                                        newUser.save()
                                            .then( user => {
    
    
                                                jwt.sign(
                                                    { id: user._id },
                                                    process.env.SESSION_SECRET,
                                                    { expiresIn: 3600 },
                                                    ( err, token ) => {
                                                        if ( err ) console.log( err );
                                                        res.json( {
                                                            token,
                                                            user: {
                                                                id: user._id,
                                                                name: user.name,
                                                                email: user.email
                                                            }
                                                    })
                                                    }
                                                )
                                              
                                        })
                                    }
                                })
                            }
                        })
                }
            }).catch(err=> console.log(err))
        ]
    }
    

})

//@route POST api/user/login
//@desc  Login Users
//@ccess  Public

router.post( '/login', ( req, res ) => {
    const { email, password } = req.body;
    if ( !email || !password ) {
        res.status( 400 ).json( { msg: 'Please Enter All Fields' } );
    } else [
        User.findOne({email})
        .then(user => {
            if(!user){
                res.status(400).json({msg: 'Invalid Credentials'})
            } else {

               bcrypt.compare(password, user.password)
               .then(isMatch => {
                   if(!isMatch){
                       res.status(400).json({msg: 'Invalid Credentials'})
                   }else{
                    jwt.sign(
                        { id: user._id },
                        process.env.SESSION_SECRET,
                        { expiresIn: 3600 },
                        ( err, token ) => {
                            if ( err ) console.log( err );
                            res.json( {
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                        })
                        }
                    )
                   }
               }).catch(err => res.json(err))
            }
        }).catch(err => res.json(err))
    ]
})


router.get( '/verify', redirectLogin, findCurrentUser, ( req, res ) => {
  res.json(userdata)
})

module.exports = router