import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { Eo404 } from "../views/components/Eo404";
import Inicio from "../views/components/Inicio";
import Bienvenido from "../views/components/Bienvenido";

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

import { Calendario } from "../views/components/menu/calendario/Calendario";
import { MunPoblacion } from "../views/components/menu/catalogos/MunPoblacion/MunPoblacion";
import { isAuthenticated } from "../services/authenticationService";
import CalendarC from "../views/components/CalendarC";
import { ListNotification } from "../views/components/ListNotification";
import { MunFacturacion } from "../views/components/menu/catalogos/MunFactguracion/MunFacturacion";
import { MunPobrezaModerada } from "../views/components/menu/catalogos/MunPobrezaModerada/MunPobrezaModerada";
import { MunPobProyeccion } from "../views/components/menu/catalogos/MunPobProyeccion/MunPobProyeccion";
import { MunTerritorio } from "../views/components/menu/catalogos/MunTerritorio/MunTerritorio";
import { MunPobrezaExtrema } from "../views/components/menu/catalogos/MunPobrezaExtrema/MunPobrezaExtrema";
import { MunRecaudacion } from "../views/components/menu/catalogos/MunRecaudacion/MunRecaudacion";
import { Umas } from "../views/components/menu/catalogos/Umas/Umas";
import { Coeficientes } from "../views/components/menu/catalogos/Coeficientes/Coeficientes";

import { Avisos } from "../views/components/menu/catalogos/Avisos/Avisos";

import { Perfil } from "../views/components/perfil/Perfil";
import { Art14f1 } from "../views/components/menu/articulos/Art14f1";

import { Eventos } from "../views/components/menu/catalogos/Eventos/Eventos";
import { Departamentos } from "../views/components/menu/catalogos/Departamentos/Departamentos";

import { TasaInteres } from "../views/components/menu/catalogos/TasaInteres/TasaInteres";
import { Municipios } from "../views/components/menu/catalogos/Municipios/Municipios";
import { Art14f2 } from "../views/components/menu/articulos/Art14f2";
import Art14f3 from "../views/components/menu/articulos/Art14f3";
import { BloqueoSesion } from "../views/components/BloqueoSesion";
import TipoFondo from "../views/components/menu/catalogos/TipoFondo/TipoFondo";


export const AppRouter = () => {
  const log = isAuthenticated();
  //console.log(log);
  return (
    <Inicio>
      <Routes>
             
             <Route path="/bloqueosesion" element={log?<Eo404/>:<BloqueoSesion />} />
        
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

        <Route path="/inicio/catalogos/mun" element={<Municipios />} />
        <Route path="/inicio/catalogos/tasa" element={<TasaInteres />} />
        <Route path="/inicio/catalogos/munpob" element={<MunPoblacion />} />
        <Route
          path="/inicio/catalogos/munfacturacion"
          element={<MunFacturacion />}
        />
        <Route
          path="/inicio/catalogos/munpobmod"
          element={<MunPobrezaModerada />}
        />
        <Route
          path="/inicio/catalogos/munproyec"
          element={<MunPobProyeccion />}
        />
        <Route
          path="/inicio/catalogos/munterritorio"
          element={<MunTerritorio />}
        />
        <Route
          path="/inicio/catalogos/munpobrezaext"
          element={<MunPobrezaExtrema />}
        />
        <Route
          path="/inicio/catalogos/munrecaudacion"
          element={<MunRecaudacion />}
        />
        <Route path="/inicio/catalogos/umas" element={<Umas />} />
        <Route
          path="/inicio/catalogos/coeficientes"
          element={<Coeficientes />}
        />
        <Route path="/inicio/catalogos/avisos" element={<Avisos />} />
        <Route path="/inicio/catalogos/eventos" element={<Eventos />} />
        <Route  path="/inicio/catalogos/departamentos"      element={<Departamentos />}      />
        <Route  path="/inicio/catalogos/tipoFondo"      element={<TipoFondo />}      />

        {/* FIN SECCION DE CATALOGOS */}

        {/* SECCION DE CALENDARIO */}
        <Route path="/Calendar" element={<CalendarC />} />
        {/* FIN SECCION DE CALENDARIO */}

        {/* SECCION DE NOTIFICACIONES */}
        <Route path="/Notification" element={<ListNotification />} />
        {/* FIN SECCION DE NOTIFICACIONES */}

        {/* SECCION DE PERFIL */}
        <Route path="/perfil" element={<Perfil />} />
        {/* FIN SECCION DE PERFIL */}

   

        {/* SECCION DE ARTICULOS */}
        <Route path="/inicio/articulos/art14f1" element={<Art14f1 />} />
        <Route path="/inicio/articulos/art14f2" element={<Art14f2 />} />
        <Route path="/inicio/articulos/art14f3" element={<Art14f3 />} />
        {/* FIN SECCION DE ARTICULOS */}
      </Routes>
    </Inicio>
  );
};
