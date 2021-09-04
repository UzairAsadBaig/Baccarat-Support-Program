import React from "react";
import { Navigate } from 'react-router-dom';

import jwtDecode from "jwt-decode";

import Cookies from 'js-cookie';

const ProtectedRoute=( {
  redirectPath='/',
  children,
  role
} ) => {

  // Check user token here
  const jwt=Cookies.get( 'jwt',{domain:'baccaratapp.herokuapp.com' });
  console.log(jwt);

  if ( !jwt ) {
    return <Navigate to={redirectPath} replace />;
  }

  if ( role&&!role.includes( jwtDecode( jwt ).role ) ) {
    return <Navigate to={'/'} replace />;
  }

  return children;
};


export default ProtectedRoute;