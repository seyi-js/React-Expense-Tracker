const express = require('express');
const app = express();
const bodyParser = require( 'body-parser' );
const PORT = process.env.PORT || 2000
const path = require( 'path' );
const mongoose = require( 'mongoose' );
mongoose.set( 'useCreateIndex', true );
let db;

//Switch Dbs in Prod
( process.env.NODE_ENV !== 'production' ) ? db = 'mongodb://localhost:process.env.27017/expenseDB' : db = process.env.MONGO_URL;

//Connect to MongoDb
mongoose.connect( db, { useUnifiedTopology: true, useNewUrlParser: true } )
    .then( () => console.log( 'ExpenseDb Connected' ) )
    .catch( err => console.log( err ) );


//Body Parser config
app.use( bodyParser.json() );


//Routes
const transactions = require( './routes/api/transactions' )
const user = require( './routes/api/user' )

app.use( '/api/transactions', transactions );
app.use( '/api/user', user );

//Serving Files In Production

if ( process.env.NODE_ENV === 'production' ) {
    app.use(express.static('Client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'Client/build', 'index.html'));
    })
}

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))