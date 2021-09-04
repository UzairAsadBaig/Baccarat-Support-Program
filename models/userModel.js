const mongoose=require( 'mongoose' );
const validator=require( "validator" );
const bcrypt=require( 'bcryptjs' );
const crypto=require( 'crypto' );

//Optimize:  ************************** User Modal Schema ******************************
const userSchema=new mongoose.Schema( {
    userId: {
        type: String,
        required: [ true, "Enter the user ID" ],
        unique: [ true, "User with this user ID already exist" ],
        lowercase:true,
        trim: true
    },

    phone:{
        type:String,
        required: [ true, "Enter your phone number" ],
        unique: [ true, "User with this phone number already exist" ],
    },

    role: {
        type: String,
        enum: [ "user", "admin"],
        default: "user"
    },
    active: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [ true, 'Please provide your password' ],
        // minLength: [ 8, "Password must be of atleast 8 characters long" ],
        select: false
    },
   
    endingTime: {
        type:Date,
        default:Date.now()
    },
 

    changePasswordAt:Date,
} ,
{
    // TO SEE VIRTUAL FIELDS 
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },

});





//Todo: ************************** Document/query/aggregation middlewares ******************************
userSchema.pre( 'save', async function ( next ) {
    // Function runs only when we are modifying password field or on creating new user
    if ( !this.isModified( 'password' ) ) return next();
    // Encrypting the password before saving it to database 
    this.password=await bcrypt.hash( this.password, 12 );
    next();
} )


userSchema.pre( 'save', function ( next ) {
    if ( !this.isModified( 'password' )||this.isNew ) return next();
    this.changePasswordAt=Date.now()-1000;
    next()
} )


//Fix:  ************************** instance methods of documents ******************************

//Fix:Function to check password entered by user and encrypted password in db are same
userSchema.methods.correctPassword=async function ( userPassword, encryptedPassword ) {
    return await bcrypt.compare( userPassword, encryptedPassword );
}

//Fix:Function to check if user has changed the password after sign in is generated
userSchema.methods.changePasswordAfter=function ( jwtTimestamp ) {
    if ( this.changePasswordAt ) {
        const changePasswordTimestamp=parseInt( this.changePasswordAt/1000, 10 );
        return jwtTimestamp<changePasswordTimestamp //200<300
    }
    return false;

}

//Fix:Funtion to create reset-token and put that in databse of particular user
userSchema.methods.createResetToken=function () {

    const resetToken=crypto.randomBytes( 32 ).toString( 'hex' );

    this.passwordResetToken=crypto.createHash( 'sha256' ).update( resetToken ).digest( 'hex' );
    this.passwordResetTokenExpires=Date.now()+( 10*60*1000 );

    return resetToken;
}

const User=mongoose.model( 'User', userSchema );


module.exports=User;