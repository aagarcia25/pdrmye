import { Routes, Route } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { Eo404 } from '../views/components/Eo404';
import Inicio from '../views/components/Inicio';
import Bienvenido from '../views/components/Bienvenido';
import { Fpg } from '../views/components/menu/participaciones/Fpg';
import { MunPoblacion } from '../views/components/menu/catalogos/MunPoblacion/MunPoblacion';
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
import { Eventos } from '../views/components/menu/catalogos/Eventos/Eventos';
import { Departamentos } from '../views/components/menu/catalogos/Departamentos/Departamentos';
import { TasaInteres } from '../views/components/menu/catalogos/TasaInteres/TasaInteres';
import { Municipios } from '../views/components/menu/catalogos/Municipios/Municipios';
import TipoFondo from '../views/components/menu/catalogos/TipoFondo/TipoFondo';
import InflacionMes from '../views/components/menu/catalogos/InflacionMes/InflacionMes';
import InflacionAnio from '../views/components/menu/catalogos/InflacionAnio/InflacionAnio';
import Fondos from '../views/components/menu/catalogos/Fondos/Fondos';
import CrecimientoAnio from '../views/components/menu/catalogos/CrecimientoAnio/CrecimientoAnio';
import Usuarios from '../views/components/menu/usuarios/Usuarios/Usuarios';
import Roles from '../views/components/menu/usuarios/Roles/Roles';
import Permisos from '../views/components/menu/usuarios/Permisos/Permisos';
import Menus from '../views/components/menu/usuarios/Menus/Menus';
import ContactoMunicipios from '../views/components/Municipios/ContactoMunicipios';
import { Art14f } from '../views/components/menu/articulos/Art14f';
import Art14fP from '../views/components/menu/articulos/Art14fP';
import { getUser, islogin } from '../services/localStorage';
import { RESPONSE } from '../interfaces/user/UserInfo';
import { ParametrosGenerales } from '../views/components/menu/catalogos/ParametrosGenerales/ParametrosGenerales';
import { CalculoGarantiaComponente } from '../views/components/menu/articulos/CalculoGarantia/CalculoGarantiaComponente';
import { PerfilesUsuario } from '../views/components/menu/usuarios/Perfiles de Usuario/PerfilesUsuario';
import SolicitudRecursos from '../views/components/Municipios/SolicitudRecursos';
import RecepcionRecursos from '../views/components/Municipios/RecepcionRecursos';
import Op from '../views/components/DAMOP/Op';
import { Bancos } from '../views/components/menu/catalogos/Bancos/Bancos';
import { CuentaBancaria } from '../views/components/menu/catalogos/CuentaBancaria/CuentaBancaria';
import { AnticipoParticipaciones } from '../views/components/menu/catalogos/Municipios/anticipoParticipaciones/AnticipoParticipaciones';
import AsigPresupuestal from '../views/components/DPCP/AsigPresupuestal';
import AsigPago from '../views/components/DAF/AsigPago';
import AgregarContactoMunicipio from '../views/components/Municipios/AgregarContactoMunicipio';
import TipoFondoCalculo from '../views/components/menu/catalogos/TipoFondoCalculo/TipoFondoCalculo';
import ISAI from '../views/components/menu/articulos/isai/ISAI';
import CambiosMun from '../views/components/menu/catalogos/Cambios/CambiosMun';
import AuthSolicitudes from '../views/components/DPCP/AuthSolicitudes';
import Participaciones from '../views/components/DAMOP/Participaciones';
import { Divisas } from '../views/components/menu/catalogos/Divisas/Divisas';
import AjustesCalculos from '../views/components/menu/catalogos/AjustesCalculos/AjustesCalculos';
import { Reportes } from '../views/components/componentes/CPH/Estadisticas/Reportes/Reportes';
import { Graficas } from '../views/components/componentes/CPH/Estadisticas/Graficas/Graficas';
import IsnRecaudacion from '../views/components/menu/articulos/IsnRecaudacion/IsnRecaudacion';

import { CatRet } from '../views/components/menu/catalogos/CatDescuentos/CatRet';
import { CatTP  } from '../views/components/menu/catalogos/CatTiposDePago/CatTP';
import { ClasificadorSP } from '../views/components/menu/catalogos/ClasificadorSP/ClasificadorSP';
import { CATORG } from '../views/components/menu/catalogos/org/CATORG';
import { ORG } from '../views/components/ORGANISMOS/ORG';
import { Firma } from '../views/components/EFIRMA/Firma';
import { Configuracione } from '../views/components/EFIRMA/Configuracione';
import { TablaDocse } from '../views/components/EFIRMA/TablaDocse';
import RecepcionRecursosORG from '../views/components/ORGANISMOS/RecepcionRecursosORG';


export const AppRouter = (
  {
login 
}:{
login : boolean
}

) => {
  const log = login;
  const user: RESPONSE = JSON.parse(String(getUser()));

  return (
    <Inicio user={user}>
      <Routes>
        <Route path='/*' element={log ? <Eo404 /> : <AuthRouter />} />
        <Route path='/' element={log ? <Bienvenido user={user} /> : <AuthRouter />} />
        {/* SECCION DE CATALOGOS */}
        <Route path='/inicio/catalogos/mun' element={<Municipios />} />
        <Route path='/inicio/catalogos/tasa' element={<TasaInteres />} />
        <Route path='/inicio/catalogos/munpob' element={<MunPoblacion />} />
        <Route path='/inicio/catalogos/munfacturacion' element={<MunFacturacion />} />
        <Route path='/inicio/catalogos/munproyec' element={<MunPobProyeccion />} />
        <Route path='/inicio/catalogos/munterritorio' element={<MunTerritorio />} />
        <Route path='/inicio/catalogos/munpobrezaext' element={<MunPobrezaExtrema />} />
        <Route path='/inicio/catalogos/munpobreza' element={<MunPobreza />} />
        <Route path='/inicio/catalogos/munrecaudacion' element={<MunRecaudacion />} />
        <Route path='/inicio/catalogos/umas' element={<Umas />} />
        <Route path='/inicio/catalogos/coeficientes' element={<Coeficientes />} />
        <Route path='/inicio/catalogos/avisos' element={<Avisos />} />
        <Route path='/inicio/catalogos/eventos' element={<Eventos />} />
        <Route path='/inicio/catalogos/departamentos' element={<Departamentos />} />
        <Route path='/inicio/catalogos/tipoFondo' element={<TipoFondo />} />
        <Route path='/inicio/catalogos/TipoFondoCalculo' element={<TipoFondoCalculo />} />
        <Route path='/inicio/catalogos/inflacionMes' element={<InflacionMes />} />
        <Route path='/inicio/catalogos/inflacionAnio' element={<InflacionAnio />} />
        <Route path='/inicio/catalogos/fondos' element={<Fondos />} />
        <Route path='/inicio/catalogos/crecimientoAnio' element={<CrecimientoAnio />} />
        <Route path='/inicio/catalogos/parametrosgenerales' element={<ParametrosGenerales />} />
        <Route path='/inicio/catalogos/bancos' element={<Bancos />} />
        <Route path='/inicio/catalogos/cuentabancaria' element={<CuentaBancaria idmunicipio={''} municipio={''} />} />
        <Route path='/inicio/catalogos/SolicitudCambios' element={<CambiosMun />} />
        <Route path='/inicio/catalogos/divisas' element={<Divisas />} />
        <Route path='/inicio/catalogos/ajustes' element={<AjustesCalculos />} />
        <Route path='/inicio/catalogos/org' element={log ? <CATORG/> : <AuthRouter />} /> 
        <Route path='/inicio/catalogos/catretenciones' element={log ? <CatRet/> : <AuthRouter />} /> 
        <Route path='/inicio/catalogos/catTiposDePago' element={log ? <CatTP/> : <AuthRouter />} /> 
        <Route path='/inicio/catalogos/catClasificacion' element={log ? <ClasificadorSP/> : <AuthRouter />} /> 

        
       
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
        <Route path='/inicio/articulos/art14f/:tipo' element={<Art14fP />} />
        <Route path='/inicio/articulos/art14d/:tipo/:id/:activo/:version' element={<Art14f />} />
        <Route path='/inicio/articulos/calculogarantia' element={<CalculoGarantiaComponente />} />
        <Route path='/inicio/articulos/isai' element={<ISAI />} />
        <Route path='/inicio/articulos/isnR' element={<IsnRecaudacion />} />
        {/* FIN SECCION DE ARTICULOS */}


        {/* SECCION PARTICIPACIONES FEDERALES Y ESTATALES */}
        <Route path='/inicio/participaciones/:fondo' element={log ? <Fpg /> : <AuthRouter />} />
        <Route path='/inicio/convenios/:fondo' element={log ? <Fpg /> : <AuthRouter />} />
        {/* FIN SECCION PARTICIPACIONES FEDERALES */}

        {/* SECCION USUARIOS, ROLES, PERMISOS */}
        <Route path='/inicio/usuario' element={log? <Usuarios /> : <AuthRouter />} />
        <Route path='/inicio/roles' element={log ? <Roles /> : <AuthRouter />} />
        <Route path='/inicio/menus' element={log ? <Menus /> : <AuthRouter />} />
        <Route path='/inicio/permisos' element={log ? <Permisos /> : <AuthRouter />} />
        <Route path='/inicio/perfilesusuario' element={log ? <PerfilesUsuario /> : <AuthRouter />} />
        {/* FIN SECCION USUARIOS, ROLES, PERMISOS */}

        {/* SECCION ORGANISMOS */}
        <Route path='/inicio/org/operaciones' element={log ? <ORG /> : <AuthRouter />} />
        <Route path='/inicio/org/resumenOperaciones' element={log ? <RecepcionRecursosORG /> : <AuthRouter />} />

        
        {/* FIN DE SECCION DE ORGANISMOS */}
        {/* SECCION MUNICIPIOS */}
        <Route path='/inicio/contactomunicipio' element={log ? <ContactoMunicipios /> : <AuthRouter />} />
        <Route path='/inicio/agregarcontactomunicipio' element={log ? <AgregarContactoMunicipio /> : <AuthRouter />} />
        <Route path='/inicio/recursos' element={log ? <RecepcionRecursos /> : <AuthRouter />} />
        <Route path='/inicio/anticipop' element={log ? <SolicitudRecursos /> : <AuthRouter />} />
        <Route path='/inicio/listado/op' element={log ? <Op /> : <AuthRouter />} />
        {/* SECCION MUNICIPIOS */}

        {/* DCCP */}
        <Route path='/inicio/dpcp' element={log ? <AsigPresupuestal /> : <AuthRouter />} />
        <Route path='/inicio/dpcp/auth' element={log ? <AuthSolicitudes /> : <AuthRouter />} />
        {/* FIN DCCP */}
        {/* DAF */}
        <Route path='/inicio/daf' element={log ? <AsigPago /> : <AuthRouter />} />
        {/* FIN DAF */}

        {/* DAMOP */}
        <Route path='/inicio/Municipio/anticipo/APD' element={<AnticipoParticipaciones />} />
        <Route path='/inicio/Municipio/participaciones' element={<Participaciones />} />
        {/* FIN DAMOP */}

        {/* /// Estadisticas */}
        <Route path='/estadisticas/reportes' element={<Reportes />} />
        <Route path='/estadisticas/graficas' element={<Graficas />} />
        {/* /// Fin Estadisticas */}

        {/* /// Firma Electronica */}
        <Route path='/efirm/firma'  element={<Firma />} />
        <Route path='/efirm/config' element={<Configuracione />} />
        <Route path='/efirm/tabla'  element={<TablaDocse />} />
        {/* /// Fin Firma Electronica */}

      </Routes>
    </Inicio>
  );
};
