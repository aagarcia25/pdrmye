import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { AuthContext } from "../views/store/contexts/AuthContext";
import { Eo404 } from "../views/components/Eo404";
import HomePage from "../views/ahome/HomePage";
import Inicio from "../views/components/Inicio";

import { Login } from "../views/auth/LoginPage";

import { LoginPage } from "../auth/LoginPage";
import Bienvenido from "../views/components/Bienvenido";

import Base from "../views/components/Inicio";

import { Icv } from "../views/components/menu/participaciones/icv/Icv";
import { Isn } from "../views/components/menu/participaciones/isn/Isn";
import { Fpg } from "../views/components/menu/participaciones/fpg/Fpg";
import { Ffm30 } from "../views/components/menu/participaciones/ffm30/Ffm30";
import { Ffm70 } from "../views/components/menu/participaciones/ffm70/Ffm70";
import { Ieps } from "../views/components/menu/participaciones/ieps/Ieps";
import { Fofir } from "../views/components/menu/participaciones/fofir/Fofir";
import { Isan } from "../views/components/menu/participaciones/isan/Isan";
import { Fexhi } from "../views/components/menu/participaciones/fexhi/Fexhi";
import { Compisan } from "../views/components/menu/participaciones/comp-isan/Compisan";
import { Iepsgyd } from "../views/components/menu/participaciones/iepsgyd/Iepsgyd";
import { Isr } from "../views/components/menu/participaciones/isr/Isr";
import { Feief } from "../views/components/menu/participaciones/feief/Feief";

import { Foult } from "../views/components/menu/aportaciones/foult/Foult";
import { Fism } from "../views/components/menu/aportaciones/fism/Fism";
import { Fodem } from "../views/components/menu/aportaciones/fodem/Fodem";
import { Fodes } from "../views/components/menu/aportaciones/fodes/Fodes";
import { Fortaum } from "../views/components/menu/aportaciones/fortaum/Fortaum";
import { Fosegum } from "../views/components/menu/aportaciones/fosegum/Fosegum";
import { Art14 } from "../views/components/menu/articulos/Art14";
import { Calendario } from "../views/components/menu/calendario/Calendario";
import { MunPoblacion } from "../views/components/menu/catalogos/MunPoblacion";
import { isAuthenticated } from "../services/authenticationService";
import CalendarC from "../views/components/CalendarC";

export const AppRouter = () => {
  const log = isAuthenticated();
  console.log(log);
  return (
    <Inicio>
      <Routes>
        <Route path="/*" element={log ? <Eo404 /> : <AuthRouter />} />
        {/* <Route path="/auth/*"   element={ (log) ? <Bienvenido />:  <AuthRouter />    } /> */}
        <Route
          path="/bienvenido"
          element={log ? <Bienvenido /> : <AuthRouter />}
        />
        <Route path="/inicio/icv" element={log ? <Icv /> : <AuthRouter />} />
        <Route path="/inicio/isn" element={log ? <Isn /> : <AuthRouter />} />
        <Route
          path="/inicio/aportaciones/foult"
          element={log ? <Foult /> : <AuthRouter />}
        />
        <Route
          path="/inicio/aportaciones/fism"
          element={log ? <Fism /> : <AuthRouter />}
        />
        <Route
          path="/inicio/aportaciones/fodes"
          element={log ? <Fodes /> : <AuthRouter />}
        />
        <Route
          path="/inicio/aportaciones/fosegum"
          element={log ? <Fosegum /> : <AuthRouter />}
        />
        <Route
          path="/inicio/aportaciones/fodem"
          element={log ? <Fodem /> : <AuthRouter />}
        />
        <Route
          path="/inicio/aportaciones/fortaum"
          element={log ? <Fortaum /> : <AuthRouter />}
        />
        <Route
          path="/inicio/articulos/art14"
          element={log ? <Art14 /> : <AuthRouter />}
        />
        <Route
          path="/inicio/calendario"
          element={log ? <Calendario /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/feief"
          element={log ? <Feief /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/fexhi"
          element={log ? <Fexhi /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/ffm30"
          element={log ? <Ffm30 /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/ffm70"
          element={log ? <Ffm70 /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/fofir"
          element={log ? <Fofir /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/fpg"
          element={log ? <Fpg /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/icv"
          element={log ? <Icv /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/iepsgyd"
          element={log ? <Iepsgyd /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/isan"
          element={log ? <Isan /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/isn"
          element={log ? <Isn /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/isr"
          element={log ? <Isr /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/ieps"
          element={log ? <Ieps /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/comp-isan"
          element={log ? <Compisan /> : <AuthRouter />}
        />
        <Route
          path="/inicio/participaciones/iepsgyd"
          element={log ? <Iepsgyd /> : <AuthRouter />}
        />

        {/* SECCION DE CATALOGOS */}
        <Route path="/inicio/catalogos/munpob" element={<MunPoblacion />} />
        {/* FIN SECCION DE CATALOGOS */}

        {/* SECCION DE CALENDARIO */}
        <Route path="/calendario" element={<CalendarC />} />
        {/* FIN SECCION DE CALENDARIO */}
      </Routes>
    </Inicio>
  );
};
