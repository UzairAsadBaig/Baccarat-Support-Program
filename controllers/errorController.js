const AppError=require( "../utils/appError" );


const handleCastErrorDB=( err ) => {
    const message=`Invalid ${err.path}: ${err.value}`;
    return new AppError( message, 400 );
}

const handleDuplicateKeyErrorDB=( err ) => {
    const message=`Duplicate field value: { ${err.keyValue.name} }, please use another value!`
    return new AppError( message, 400 )
}

const handleValidationError=( err ) => {
    const errArray=Object.values( err.errors ).map( el => el.message );
    const message=`Invalid input data. ${errArray.join( ". " )}`;
    return new AppError( message, 400 );
}


const handleJwtError=() => new AppError( 'Invalid Token! :(', 401 )

const handleJwtExpiredError=() => new AppError( "Your token has expired!, Please log in again :)", 401 )



const sendErrorDev=( err, req, res ) => {
    // FOR Api endpoints
    if ( req.originalUrl.startsWith( '/api' ) ) {
        res.status( err.statusCode ).json( {
            status: err.status,
            error: err,
            stackTrace: err.stack,
            message: err.message
        } )
    }

    // For normal endpoints
    else {
        res.status( 200 ).render( 'error', {
            title: "Something went very wrong!",
            msg:err.message,
        } );
    }

}

const sendErrorProd = ( err,req,res ) => {


    // Operational Error: send message to client
    if ( err.isOperational && req.originalUrl.startsWith( '/api' )) {
        res.status( err.statusCode ).json( {
            status: err.status,
            message: err.message
        } )
    }
    // Progamming or other unkown errorrs: don't leak details to client
    else if ( req.originalUrl.startsWith( '/api' )) {

        // console.error( 'ERROR 💥', err );

        res.status( 500 ).json( {
            status: 'error',
            message: "Something went wrong"
        } )
    }

    else {
        res.status( 200 ).render( 'error', {
            title: "Something went very wrong!",
            msg: err.message,
        } );
    }

}


module.exports=( err, req, res, next ) => {
    err.statusCode=err.statusCode||404;
    err.status=err.status||'error';

    if ( process.env.NODE_ENV.trim()==='development' ) {
        sendErrorDev( err, req, res );

    } else if ( process.env.NODE_ENV.trim()==='production' ) {

        const errorName=err.name;
        console.log("------------------->",errorName)
        let error={
            ...err
        };
        error.name=errorName;
        error.message="Please try again later!";

        if ( error.name==="CastError" ) error=handleCastErrorDB( error ); // converting our error to operational

        if ( error.code===11000 ) error=handleDuplicateKeyErrorDB( error ); // converting our error to operational

        if ( error.name==="ValidationError" ) error=handleValidationError( error ); // converting our error to operational

        if ( error.name==="JsonWebTokenError" ) error=handleJwtError(); // converting our error to operational

        if ( error.name==="TokenExpiredError" ) error=handleJwtExpiredError(); // converting our error to operational

        sendErrorProd( error, req ,res );

    }


}