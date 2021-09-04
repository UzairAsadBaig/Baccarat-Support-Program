/* eslint-disable no-console */
const mongoose=require( "mongoose" );
const dotenv=require( "dotenv" );
const express=require( 'express' );

//! Listener to be called when any uncaught error(programming error) occurs
process.on( "uncaughtException", ( err ) => {
    console.error( `${err.name} ${err.message}` );
    process.exit( 1 );

} )


dotenv.config( {
    path: "./config.env"
} ); // read all the variables from config.env file and put them in nodejs environment
const app=require( "./app" );

// ! Connecting our App with hoisted datatbase on Atlas Cloud
const DB=process.env.DATABASE.replace( "<password>", process.env.DATABASE_PASSWORD );
// const DB=process.env.DATABASE;
mongoose.connect( DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} )
    .then( () => console.log( "Database connection successfull!✨✨" ) );



// if ( process.env.NODE_ENV==="production" ) {

// }


//Optimize:                    ************** Starting the server ***************

//! Starting the server at 127.0.0.1:30001
// let port=process.env.PORT
let port=process.env.PORT||30001;
const server=app.listen( process.env.PORT, () => {
    console.log( "Starting the server at 127.0.0.1:"+process.env.PORT );
} );




//! Listener to be called when any unhandle rejected promise occurs
process.on( "unhandledRejection", ( err ) => {
    console.error( `${err.name} ${err.message}` );

    server.close( () => {
        process.exit( 1 );
    } )





} )