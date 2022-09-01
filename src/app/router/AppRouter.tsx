import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { AuthContext } from "../views/store/contexts/AuthContext";
import { Eo404 } from "../views/components/Eo404";
import HomePage from "../views/ahome/HomePage";
import { Login } from "../views/auth/LoginPage";

import { isAuthenticated } from "../helpers/localStorage";
import Base from "../views/components/Inicio";
import { Icv } from "../views/components/menu/participaciones/icv/Icv";
import { Isn } from "../views/components/menu/participaciones/isn/Isn";
import {Foult} from "../views/components/menu/aportaciones/Foult";
import {Fism} from "../views/components/menu/aportaciones/Fism";
import {Fodem} from "../views/components/menu/aportaciones/Fodem";
import {Fodes} from "../views/components/menu/aportaciones/Fodes";
import {Fortamun} from "../views/components/menu/aportaciones/Fortamun";
import {Fosegum} from "../views/components/menu/aportaciones/Fosegum";
import { Art14 } from "../views/components/menu/articulos/Art14";




export const AppRouter = () => {
 const log = isAuthenticated();
 console.log(log);
  return (
      <Routes>
        <Route path="/auth/*"   element={   <AuthRouter />    } />
        <Route path="/inicio"   element={(log) ? <Base /> : <AuthRouter />    } />
        <Route path="home"   element={(log) ? <HomePage /> : <AuthRouter />} />
        <Route path="/inicio/icv"   element={  <Icv />} />
        <Route path="/inicio/isn"   element={  <Isn />} />
        <Route path="/login"   element={  <Login />} />
        <Route path="/inicio/aportaciones/foult"   element={  <Foult />} />
        <Route path="/inicio/aportaciones/fodes"      element={<Fodes/>} />
        <Route path="/inicio/aportaciones/fosegum"      element={<Fosegum/>} />
        <Route path="/inicio/aportaciones/fodem"      element={<Fodem />}/>
        <Route path="/inicio/articulos/art14"      element={<Art14/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
        <Route path="/*"      element={<Eo404/>} />
     




      </Routes>
  );
};
