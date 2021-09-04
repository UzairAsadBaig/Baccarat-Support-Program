// ********* ALL REQUIRE MODULES ************
const express=require( 'express' );
const cors=require( 'cors' )
const morgan=require( 'morgan' );
const rateLimit=require( 'express-rate-limit' );
const helmet=require( 'helmet' );
const mongoSanitize=require( 'express-mongo-sanitize' );
const xss=require( 'xss-clean' );


const cookieParser=require( 'cookie-parser' );
const AppError=require( './utils/appError' );
const globalErrorHandler=require( './controllers/errorController' );
//TODO: Include Routers
const userRouter=require( './routes/userRouter' );
const baccaratRouter = require('./routes/baccaratRouter');
const path=require( 'path' );


const app=express();
app.use( cors() )



//Optimize:                    ************** Global Midle-Wares ***************

//! To set headers
app.use( helmet() );



//! Logging Middleware
if ( process.env.NODE_ENV.trim()==='development' ) {
    app.use( morgan( 'dev' ) ); // to see the information of request in console
}



//! limit the requests from same IP address (Rate-limiting middle-ware)
const limiter=rateLimit( {
    max: 100, //no of request per IP in below time
    windowMs: 60*60*1000, // 1-hour
    message: "Too many request from this IP, please try again in an hour!",
} );
// app.use( '/api', limiter );




//! Body parser MiddleWare
app.use( express.json( { limit: '10kb' } ) ); // to attached the content of body to request obj(req.body) (mostly for patch request)


//! Cookie parser MiddleWare
app.use( cookieParser() ); // to attached the cookies of request to req.cookies


//! attach form data to req.body
app.use( express.urlencoded( { extended: true, limit: '10kb' } ) );

//! Data Sanitization Middlewares

// Data Sanitization against NoSQL query injection
app.use( mongoSanitize() ); //basically remove all the '$' signs and 'dots' 

// Data sanitization against XSS attack
app.use( xss() ) //clean  malicious html code from user input 




//! MiddleWare for specfic routes

//TODO: Use Router middleware
app.use( '/api/v1/users', userRouter );
app.use( '/api/v1/baccarat', baccaratRouter );



//! Settings for Deployment

// app.use( express.static( "client/build" ) );

// app.get( "*", ( req, res ) => {
//     res.sendFile( path.resolve( __dirname, "client", "build", "index.html" ) );


// } );

//! Middleware for handling all other(ERROR) unhandled routes 
app.all( '*', ( req, res, next ) => {
    next( new AppError( `Can't find ${req.originalUrl} , on this server!`, 404 ) ); // express automatically knows that, this is an error, so it call error handling middleware
} );



// ! ERROR HANDLING MIDDLEWARE
app.use( globalErrorHandler )

module.exports=app;