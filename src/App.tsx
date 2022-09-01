import React from 'react';
import { useReducer } from "react";
import './App.css';
import { AuthContext } from './app/views/store/contexts/AuthContext';
import { AppRouter } from './app/router/AppRouter';
import { authReducer } from './app/views/store/reducers/authReducer';
import { getUser } from './app/helpers/localStorage';


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
  const [user, dispatchUser] = useReducer(authReducer, {}, init);
  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      <AppRouter />
      


    </AuthContext.Provider>
  );
}

export default App;
