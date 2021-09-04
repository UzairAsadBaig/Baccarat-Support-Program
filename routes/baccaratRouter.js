const express=require( "express" );
const { getAllBaccarat,  deleteBaccarat, updateBaccarat, createBaccarat, getBaccarat } = require("../controllers/baccaratController");
const Router=express.Router();


//Optimize:   ***** Routes ******
Router.route( "/pattern" ).post(getBaccarat);
// Router.route( "/" ).post(createBaccarat);
// Router.route( "/:id" )
//   .delete( deleteBaccarat )
//   .patch( updateBaccarat );



module.exports=Router;