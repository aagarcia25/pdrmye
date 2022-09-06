import React from 'react';
import { useReducer } from "react";
import './App.css';
import { AuthContext } from './app/views/store/contexts/AuthContext';
import { AppRouter } from './app/router/AppRouter';
import { authReducer } from './app/views/store/reducers/authReducer';
import { getUser } from './app/helpers/localStorage';
import Inicio from "./app/views/components/Inicio";
import { isAuthenticated } from './app/helpers/localStorage';
import { Routes , Route } from 'react-router-dom';
import { AuthRouter } from './app/router/AuthRouter';
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
