import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admin from './components/Admin/Admin';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useBeforeunload } from 'react-beforeunload';
import jwt_decode from 'jwt-decode'


window.onbeforeunload=function () {
  fetch( 'http://127.0.0.1:3001/api/v1/users/logout', {
    method: 'POST',
    body: JSON.stringify( { id: jwt_decode( document.cookie.split( '=' )[ 1 ] ).id } ),
    headers: {
      'Content-Type': 'application/json'
    },
  } )
}
window.onunload=function () {

  fetch( 'http://127.0.0.1:3001/api/v1/users/logout', {
    method: 'POST',
    body: JSON.stringify( { id: jwt_decode( document.cookie.split( '=' )[ 1 ] ).id } ),
    headers: {
      'Content-Type': 'application/json'
    },
  } )


}
// let x=document.cookie;
console.log( "COoKIES", document.cookie.split( '=' )[ 1 ] )

// window.addEventListener( "beforeunload", ( ev ) => {
//   ev.preventDefault();
//   let text="Press a button!\nEither OK or Cancel.";
//   if ( window.confirm( text )===true ) {
//     text="You pressed OK!";
//   } else {
//     text="You canceled!";
//   }
//   return ev.returnValue='Are you sure you want to close?';
// } );
function App() {





  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route exact path="admin" element={
            <ProtectedRoute role={[ 'admin' ]}>  <Admin /> </ProtectedRoute>
          } />

          <Route exact path="dashboard" element={
            <ProtectedRoute role={[ 'user' ]}>  <Dashboard /> </ProtectedRoute>
          } />

          <Route path='/' element={<Login />} />
          <Route path='signup' element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
