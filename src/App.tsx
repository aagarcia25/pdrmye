import React from 'react';
import { useReducer } from "react";
import './App.css';
import { AuthContext } from './app/views/store/contexts/AuthContext';
import { AppRouter } from './app/router/AppRouter';
import { authReducer } from './app/views/store/reducers/authReducer';
import { getUser } from './app/services/localStorage';
import { isAuthenticated } from './app/services/authenticationService';
import { Login } from './app/views/auth/LoginPage';



const init = () => {
  let sessionUser: any = getUser();
  let user: any;
 
  if (sessionUser !== null) {
    console.log(sessionUser);
    user = getUser();
  } 

  return user;
};


function App() {
  const log = isAuthenticated();
  const [user, dispatchUser] = useReducer(authReducer, {}, init);
  return (

          
  <AuthContext.Provider value={{ user, dispatchUser }}>

    {(log) ? <AppRouter />:<Login/> }

  </AuthContext.Provider>

        );

   
 
}

export default App;
