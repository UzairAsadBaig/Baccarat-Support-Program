const mongoose=require( 'mongoose' );


//Optimize:  *********  Modal Schema ***********
const BaccaratSchema=new mongoose.Schema( {
  selAmount: {
    type:Number,
  },
  pattern:[Number]
}, {
  // TO SEE VIRTUAL FIELDS 
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },

} );





const Baccarat=mongoose.model( 'Baccarat', BaccaratSchema );


module.exports=Baccarat;