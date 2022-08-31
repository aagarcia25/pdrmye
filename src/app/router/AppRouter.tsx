import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";

import { AuthContext } from "../views/store/contexts/AuthContext";
import { Eo404 } from "../views/components/Eo404";
import HomePage from "../views/ahome/HomePage";
//import {PDRMyE} from "../../PDRMyE";
import { isAuthenticated } from "../helpers/localStorage";
import Base from "../views/components/Inicio";
import { Icv } from "../views/components/icv/Icv";
import { Isn } from "../views/components/isn/Isn";

/*
interface Context {
  dispatchUser?: any;
  user?: User;
}

interface User {
  loggedIn: boolean;
}*/



export const AppRouter = () => {
 // const { user }: Context = useContext(AuthContext);
 // console.log((user?.loggedIn));
 const log = isAuthenticated();
 console.log(log);
  return (
      <Routes>
        <Route path="/auth/*"   element={   <AuthRouter />    } />
        <Route path="/inicio"   element={(log) ? <Base /> : <AuthRouter />    } />
        <Route path="home"   element={(log) ? <HomePage /> : <AuthRouter />} />
        <Route path="/inicio/icv"   element={  <Icv />} />
        <Route path="/inicio/isn"   element={  <Isn />} />
        <Route path="/*"      element={<Eo404/>} />
      </Routes>
  );
};
