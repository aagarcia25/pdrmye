import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { Eo404 } from '../views/components/Eo404';
import Inicio from '../views/components/Inicio';
import Bienvenido from '../views/components/Bienvenido';

import { Fpg } from '../views/components/menu/participaciones/fpg/Fpg';

import { Foult } from '../views/components/menu/aportaciones/foult/Foult';
import { Fodem } from '../views/components/menu/aportaciones/fodem/Fodem';
import { Fodes } from '../views/components/menu/aportaciones/fodes/Fodes';
import { Fosegum } from '../views/components/menu/aportaciones/fosegum/Fosegum';

import { MunPoblacion } from '../views/components/menu/catalogos/MunPoblacion/MunPoblacion';
import { isAuthenticated } from '../services/authenticationService';
import CalendarC from '../views/components/CalendarC';
import { ListNotification } from '../views/components/ListNotification';
import { MunFacturacion } from '../views/components/menu/catalogos/MunFacturacion/MunFacturacion';
import { MunPobProyeccion } from '../views/components/menu/catalogos/MunPobProyeccion/MunPobProyeccion';
import { MunTerritorio } from '../views/components/menu/catalogos/MunTerritorio/MunTerritorio';
import { MunPobrezaExtrema } from '../views/components/menu/catalogos/MunPobrezaExtrema/MunPobrezaExtrema';
import { MunPobreza } from '../views/components/menu/catalogos/MunPobreza/MunPobreza';
import { MunRecaudacion } from '../views/components/menu/catalogos/MunRecaudacion/MunRecaudacion';
import { Umas } from '../views/components/menu/catalogos/Umas/Umas';
import { Coeficientes } from '../views/components/menu/catalogos/Coeficientes/Coeficientes';

import { Avisos } from '../views/components/menu/catalogos/Avisos/Avisos';

import { Perfil } from '../views/components/perfil/Perfil';
import { Art14f1 } from '../views/components/menu/articulos/Art14f1';

import { Eventos } from '../views/components/menu/catalogos/Eventos/Eventos';
import { Departamentos } from '../views/components/menu/catalogos/Departamentos/Departamentos';

import { TasaInteres } from '../views/components/menu/catalogos/TasaInteres/TasaInteres';
import { Municipios } from '../views/components/menu/catalogos/Municipios/Municipios';


import { Art14f2 } from '../views/components/menu/articulos/Art14f2';
import Art14f3 from '../views/components/menu/articulos/Art14f3';
import TipoFondo from '../views/components/menu/catalogos/TipoFondo/TipoFondo';
import InflacionMes from '../views/components/menu/catalogos/InflacionMes/InflacionMes';
import InflacionAnio from '../views/components/menu/catalogos/InflacionAnio/InflacionAnio';
import Fondos from '../views/components/menu/catalogos/Fondos/Fondos';
import CrecimientoAnio from '../views/components/menu/catalogos/CrecimientoAnio/CrecimientoAnio';

import Fism from '../views/components/menu/aportaciones/fism/Fism';
import Fortaum from '../views/components/menu/aportaciones/fortaum/Fortaum';
import DetalleFortamun from '../views/components/menu/aportaciones/fortaum/DetalleFortamun';
import DetalleFgp from '../views/components/menu/participaciones/fpg/DetalleFgp';
import DetalleFism from '../views/components/menu/aportaciones/fism/DetalleFism';
import Usuarios from '../views/components/menu/usuarios/Usuarios/Usuarios';
import Roles from '../views/components/menu/usuarios/Roles/Roles';
import Permisos from '../views/components/menu/usuarios/Permisos/Permisos';
import Menus from '../views/components/menu/usuarios/Menus/Menus';
import PensionesVitalicias from '../views/components/Organismos/PensionesVitalicias/PensionesVitalicias';
import Solicitudes from '../views/components/Organismos/Solicitudes/Solicitudes';
import ContactoMunicipios from '../views/components/Municipios/ContactoMunicipios';
import ContactoOrganismos from '../views/components/Organismos/contactoOrganismos/ContactoOrganismos';
import CFuenteFinanciamiento from '../views/components/menu/catalogos/CFuenteFinanciamiento/CFuenteFinanciamiento';
import Presupuesto from '../views/components/Organismos/Presupuesto/Presupuesto';
import Nomina from '../views/components/Organismos/Nomina/Nomina';


export const AppRouter = () => {
  const log = isAuthenticated();
  //console.log(log);

  
  return (
    <Inicio>
      <Routes>
             
        
        <Route path='/*' element={log ? <Eo404 /> : <AuthRouter />} />
        <Route path='/'  element={log ? <Bienvenido /> : <AuthRouter />}     />


        {/* SECCION DE CATALOGOS */}
        <Route path='/inicio/catalogos/mun'                        element={<Municipios />} />
        <Route path='/inicio/catalogos/tasa'                       element={<TasaInteres />} />
        <Route path='/inicio/catalogos/munpob'                     element={<MunPoblacion />} />
        <Route path='/inicio/catalogos/munfacturacion'             element={<MunFacturacion />}        />
        <Route path='/inicio/catalogos/munproyec'                  element={<MunPobProyeccion />}        />
        <Route path='/inicio/catalogos/munterritorio'              element={<MunTerritorio />}        />
        <Route path='/inicio/catalogos/munpobrezaext'              element={<MunPobrezaExtrema />}     />
        <Route path='/inicio/catalogos/munpobreza'                 element={<MunPobreza />}     />
        <Route path='/inicio/catalogos/munrecaudacion'             element={<MunRecaudacion />}        />
        <Route path='/inicio/catalogos/umas'                       element={<Umas />} />
        <Route path='/inicio/catalogos/coeficientes'               element={<Coeficientes />}        />
        <Route path='/inicio/catalogos/avisos'                     element={<Avisos />} />
        <Route path='/inicio/catalogos/eventos'                    element={<Eventos />} />
        <Route path='/inicio/catalogos/departamentos'              element={<Departamentos />}      />
        <Route path='/inicio/catalogos/tipoFondo'                  element={<TipoFondo />}      />
        <Route path='/inicio/catalogos/inflacionMes'               element={<InflacionMes />}      />
        <Route path='/inicio/catalogos/inflacionAnio'              element={<InflacionAnio />}      />
        <Route path='/inicio/catalogos/fondos'                     element={<Fondos />}      />
        <Route path='/inicio/catalogos/crecimientoAnio'            element={<CrecimientoAnio />}      />
        {/* FIN SECCION DE CATALOGOS */}

        {/* SECCION DE CALENDARIO */}
        <Route path='/Calendario' element={<CalendarC />} />
        {/* FIN SECCION DE CALENDARIO */}

        {/* SECCION DE NOTIFICACIONES */}
        <Route path='/Notification' element={<ListNotification />} />
        {/* FIN SECCION DE NOTIFICACIONES */}

        {/* SECCION DE PERFIL */}
        <Route path='/perfil' element={<Perfil />} />
        {/* FIN SECCION DE PERFIL */}

        {/* SECCION DE ARTICULOS */}
        <Route path='/inicio/articulos/art14f1' element={<Art14f1 />} />
        <Route path='/inicio/articulos/art14f2' element={<Art14f2 />} />
        <Route path='/inicio/articulos/art14f3' element={<Art14f3 />} />
        {/* FIN SECCION DE ARTICULOS */}


        {/* SECCION PARTICIPACIONES FEDERALES Y ESTATALES */}
        
        <Route path='/inicio/participaciones/:fondo' element={log ? <Fpg /> : <AuthRouter />} />
        <Route path='/inicio/participaciones/:fondo/:id/' element={log ? <DetalleFgp /> : <AuthRouter />} />

        {/* FIN SECCION PARTICIPACIONES FEDERALES */}

       

        {/* SECCION APORTACIONES FEDERALES */}
        <Route path='/inicio/aportaciones/fism'    element={log ? <Fism /> : <AuthRouter />} />
        <Route path='/inicio/aportaciones/fism/:id' element={log ? <DetalleFism /> : <AuthRouter />} />

        <Route path='/inicio/aportaciones/fortaum' element={log ? <Fortaum /> : <AuthRouter />} />
        <Route path='/inicio/aportaciones/fortaum/:id' element={log ? <DetalleFortamun /> : <AuthRouter />} />
        {/* FIN SECCION APORTACIONES FEDERALES */}

       
        {/* SECCION APORTACIONES ESTATALES */}
        <Route path='/inicio/aportaciones/foult'   element={log ? <Foult /> : <AuthRouter />}        />
        <Route path='/inicio/aportaciones/fodes'   element={log ? <Fodes /> : <AuthRouter />}        />
        <Route path='/inicio/aportaciones/fosegum' element={log ? <Fosegum /> : <AuthRouter />}        />
        <Route path='/inicio/aportaciones/fodem'   element={log ? <Fodem /> : <AuthRouter />}        />
        {/* FIN PARTICIPACIONES ESTATALES */}
       
       {/* SECCION USUARIOS, ROLES, PERMISOS */}
       <Route path='/inicio/usuario'   element={log ? <Usuarios /> : <AuthRouter />} />
       <Route path='/inicio/roles'     element={log ? <Roles /> : <AuthRouter />} />
       <Route path='/inicio/menus'     element={log ? <Menus /> : <AuthRouter />} />
       <Route path='/inicio/permisos'  element={log ? <Permisos /> : <AuthRouter />} />
       {/* FIN SECCION USUARIOS, ROLES, PERMISOS */}

       {/* SECCION ORGANISMOS */}
       <Route path='/inicio/pensionesvitalicias'  element={log ? <PensionesVitalicias /> : <AuthRouter />} />
       <Route path='/inicio/org/solicitudes'  element={log ? <Solicitudes /> : <AuthRouter />} />
       <Route path='/inicio/contactoorganismos'  element={log ? <ContactoOrganismos /> : <AuthRouter />} />
       <Route path='/inicio/ff'  element={log ? <CFuenteFinanciamiento /> : <AuthRouter />} />
       <Route path='/inicio/presupuesto'  element={log ? <Presupuesto /> : <AuthRouter />} />
       <Route path='/inicio/nomina'  element={log ? <Nomina /> : <AuthRouter />} />
       
       {/* FIN DE SECCION DE ORGANISMOS */}
       {/* SECCION MUNICIPIOS */}
       <Route path='/inicio/contactomunicipio'  element={log ? <ContactoMunicipios /> : <AuthRouter />} />
       {/* SECCION MUNICIPIOS */}


      </Routes>
    </Inicio>
  );
};
