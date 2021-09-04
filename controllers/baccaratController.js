
// const User=require( "../models/userModel" );
const catchAsync=require( "../utils/catchAysnc" );
const AppError=require( "../utils/appError" );
const factory=require( './FactoryHandler' );
const Baccarat = require('../models/baccaratModel');

// Optimize: get single baccarat
exports.getBaccarat=catchAsync( async ( req, res, next ) => {
  
  let {selAmount,selLevel}=req.body;
  let bac=await Baccarat.find( { selAmount: Number( selAmount ) } );

  (bac);

  if ( !bac ) {
      return next( new AppError( `Could not found pattern`, 404 ) );
  }

  let finalPattern=[];

  for (let i = 0, j = 0; i < 66; i++ , j++) {
    if ( j>=Number( selLevel ) )
    j=0;
   finalPattern.push(bac[0].pattern[j]); 
  }

  res.status( 200 ).json( {
      status: 'success',
      data: finalPattern
  } );

} );

// Optimize: Create  
// exports.createBaccarat=factory.createOne( Baccarat );

// Optimize: update based on id 
// exports.updateBaccarat=factory.updateOne( Baccarat )

// Optimize: delete  based on id 
// exports.deleteBaccarat=factory.deleteOne( Baccarat );