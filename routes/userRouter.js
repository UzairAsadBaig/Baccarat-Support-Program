const express=require( "express" );
const { createUser, getUser, getAllUser, changePassword, setDuration, deleteUser, checkAlreadyLoginState }=require( `./../controllers/userController` );
const {logIn,signUp,protect,restrictTo, logout}=require( "../controllers/authController" );
const userRouter=express.Router();


//TODO:                     ************** Routes ***************

//Create user
userRouter.post('/',createUser);

// Login
userRouter.post( '/login', checkAlreadyLoginState, logIn );

// Signup
userRouter.post('/signup',signUp);
userRouter.post('/logout',logout);



// Get users
userRouter.route( "/:id" )
.get( protect,getUser )

// Get all users
userRouter.route('/').get(protect,restrictTo('admin'),getAllUser);

// Change user password
userRouter.route( "/password/:id" ).patch( protect, restrictTo( 'admin' ), changePassword )

userRouter.route( "/deleteuser/:id" ).delete( protect, restrictTo( 'admin' ), deleteUser )

// Set Duration
userRouter.route("/duration/:id").patch(protect,restrictTo('admin'),setDuration)


module.exports=userRouter;