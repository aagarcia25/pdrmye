import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { AuthContext } from "../views/store/contexts/AuthContext";
import { Eo404 } from "../views/components/Eo404";
import HomePage from "../views/ahome/HomePage";
import { LoginPage } from "../auth/LoginPage";
import Bienvenido from "../views/components/Bienvenido";

import { isAuthenticated } from "../helpers/localStorage";
import Base from "../views/components/Inicio";
import { Icv } from "../views/components/menu/participaciones/icv/Icv";
import { Isn } from "../views/components/menu/participaciones/isn/Isn";
import { Fpg } from "../views/components/menu/participaciones/fpg/Fpg";
import { Ffm30 } from "../views/components/menu/participaciones/ffm30/Ffm30";
import { Ffm70 } from "../views/components/menu/participaciones/ffm70/Ffm70";
import {Ieps} from "../views/components/menu/participaciones/ieps/Ieps";
import { Fofir } from "../views/components/menu/participaciones/fofir/Fofir";
import { Isan } from "../views/components/menu/participaciones/isan/Isan";
import { Fexhi } from "../views/components/menu/participaciones/fexhi/Fexhi";
import { Compisan } from "../views/components/menu/participaciones/comp-isan/Compisan";
import { Iepsgyd } from "../views/components/menu/participaciones/iepsgyd/Iepsgyd";
import {Isr} from "../views/components/menu/participaciones/isr/Isr";
import { Feief } from "../views/components/menu/participaciones/feief/Feief";






import {Foult} from "../views/components/menu/aportaciones/foult/Foult";
import {Fism} from "../views/components/menu/aportaciones/fism/Fism";
import {Fodem} from "../views/components/menu/aportaciones/fodem/Fodem";
import {Fodes} from "../views/components/menu/aportaciones/fodes/Fodes";
import {Fortamun} from "../views/components/menu/aportaciones/fortamun/Fortamun";
import {Fosegum} from "../views/components/menu/aportaciones/fosegum/Fosegum";
import { Art14 } from "../views/components/menu/articulos/Art14";
import { Calendario } from "../views/components/menu/calendario/Calendario";



export const AppRouter = () => {
 const log = isAuthenticated();
 console.log(log);
  return (







        <Routes>
        
        <Route path="/auth/*"   element={   <AuthRouter />    } />
        <Route path="/inicio"   element={(log) ? <Base /> : <AuthRouter />    } />
        <Route path="/bienvenido"   element={(log) ? <Bienvenido /> : <AuthRouter />} />



        <Route path="/inicio/icv"   element={  <Icv />} />
        <Route path="/inicio/isn"   element={  <Isn />} />
        <Route path="/login"   element={  <LoginPage />} />
        <Route path="/inicio/aportaciones/foult"   element={  <Foult />} />
        <Route path="/inicio/aportaciones/fodes"      element={<Fodes/>} />
        <Route path="/inicio/aportaciones/fosegum"      element={<Fosegum/>} />
        <Route path="/inicio/aportaciones/fodem"      element={<Fodem />}/>
        <Route path="/inicio/articulos/art14"      element={<Art14/>} />
        <Route path="/inicio/calendario"      element={<Calendario/>} />
        <Route path="/inicio/participaciones/feief"      element={<Feief/>} />
        <Route path="/inicio/participaciones/fexhi"      element={<Fexhi/>} />
        <Route path="/inicio/participaciones/ffm30"      element={<Ffm30/>} />
        <Route path="/inicio/participaciones/ffm70"      element={<Ffm70/>} />
        <Route path="/inicio/participaciones/fofir"      element={<Fofir/>} />
        <Route path="/inicio/participaciones/fpg"      element={<Fpg/>} />
        <Route path="/inicio/participaciones/icv"      element={<Icv/>} />
        <Route path="/inicio/participaciones/iepsgyd"      element={<Iepsgyd/>} />
        <Route path="/inicio/participaciones/isan"      element={<Isan/>} />
        <Route path="/inicio/participaciones/isn"      element={<Isn/>} />
        <Route path="/inicio/participaciones/isr"      element={<Isr/>} />
        <Route path="/inicio/participaciones/ieps"      element={<Ieps/>} />
        <Route path="/inicio/participaciones/comp-isan"      element={<Compisan/>} />
        <Route path="/inicio/participaciones/iepsgyd"      element={<Iepsgyd/>} />
       
     




      </Routes>
  );
};
