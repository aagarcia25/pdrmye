import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RESPONSESTORAGE, USUARIORESPONSE } from "../interfaces/user/UserInfo";
import { getUser } from "../services/localStorage";
import Bienvenido from "../views/components/Bienvenido";
import { Ajanual } from "../views/components/CPH/AJANUAL/Ajanual";
import { AjSemestral } from "../views/components/CPH/AJSEMESTRAL/AjSemestral";
import { PEF } from "../views/components/CPH/PEF";
import CalendarC from "../views/components/CalendarC";
import AsigPago from "../views/components/DAF/AsigPago";
import Participaciones from "../views/components/DAMOP/Participaciones";
import AsigPresupuestal from "../views/components/DPCP/AsigPresupuestal";
import AuthSolicitudes from "../views/components/DPCP/AuthSolicitudes";
import { BandejaEnviados } from "../views/components/EFIRMA/BandejaEnviados";
import { BandejaRecibidos } from "../views/components/EFIRMA/BandejaRecibidos";
import { Configuracione } from "../views/components/EFIRMA/Configuracione";
import { Firma } from "../views/components/EFIRMA/Firma";
import { Eo404 } from "../views/components/Eo404";
import Inicio from "../views/components/Inicio";
import { ListNotification } from "../views/components/ListNotification";
import AgregarContactoMunicipio from "../views/components/Municipios/AgregarContactoMunicipio";
import ContactoMunicipios from "../views/components/Municipios/ContactoMunicipios";
import CPH from "../views/components/POWERBI/CPH";
import { Reporteador } from "../views/components/Reportes/Reporteador";
import { Art14f } from "../views/components/menu/articulos/Art14f";
import Art14fP from "../views/components/menu/articulos/Art14fP";
import { CalculoGarantiaComponente } from "../views/components/menu/articulos/CalculoGarantia/CalculoGarantiaComponente";
import IsnRecaudacion from "../views/components/menu/articulos/IsnRecaudacion/IsnRecaudacion";
import ISAI from "../views/components/menu/articulos/isai/ISAI";
import AjustesCalculos from "../views/components/menu/catalogos/AjustesCalculos/AjustesCalculos";
import { Avisos } from "../views/components/menu/catalogos/Avisos/Avisos";
import { Bancos } from "../views/components/menu/catalogos/Bancos/Bancos";
import CambiosMun from "../views/components/menu/catalogos/Cambios/CambiosMun";
import { CatRet } from "../views/components/menu/catalogos/CatDescuentos/CatRet";
import { ClasificadorSP } from "../views/components/menu/catalogos/ClasificadorSP/ClasificadorSP";
import { Coeficientes } from "../views/components/menu/catalogos/Coeficientes/Coeficientes";
import { CuentaBancaria } from "../views/components/menu/catalogos/CuentaBancaria/CuentaBancaria";
import { Divisas } from "../views/components/menu/catalogos/Divisas/Divisas";
import { Eventos } from "../views/components/menu/catalogos/Eventos/Eventos";
import Fondos from "../views/components/menu/catalogos/Fondos/Fondos";
import InflacionAnio from "../views/components/menu/catalogos/InflacionAnio/InflacionAnio";
import InflacionMes from "../views/components/menu/catalogos/InflacionMes/InflacionMes";
import { MunFacturacion } from "../views/components/menu/catalogos/MunFacturacion/MunFacturacion";
import { MunPobProyeccion } from "../views/components/menu/catalogos/MunPobProyeccion/MunPobProyeccion";
import { MunPoblacion } from "../views/components/menu/catalogos/MunPoblacion/MunPoblacion";
import { MunPobreza } from "../views/components/menu/catalogos/MunPobreza/MunPobreza";
import { MunPobrezaExtrema } from "../views/components/menu/catalogos/MunPobrezaExtrema/MunPobrezaExtrema";
import { MunRecaudacion } from "../views/components/menu/catalogos/MunRecaudacion/MunRecaudacion";
import { MunTerritorio } from "../views/components/menu/catalogos/MunTerritorio/MunTerritorio";
import { Municipios } from "../views/components/menu/catalogos/Municipios/Municipios";
import { ParametrosGenerales } from "../views/components/menu/catalogos/ParametrosGenerales/ParametrosGenerales";
import TipoFondo from "../views/components/menu/catalogos/TipoFondo/TipoFondo";
import TipoFondoCalculo from "../views/components/menu/catalogos/TipoFondoCalculo/TipoFondoCalculo";
import { Umas } from "../views/components/menu/catalogos/Umas/Umas";
import { CATORG } from "../views/components/menu/catalogos/org/CATORG";
import { Fpg } from "../views/components/menu/participaciones/Fpg";
import AdminVideos from "../views/components/menu/usuarios/AdminVideosTutoriales/AdminAyudas";
import Usuarios from "../views/components/menu/usuarios/Usuarios/Usuarios";
import { Perfil } from "../views/components/perfil/Perfil";
import { AuthRouter } from "./AuthRouter";
import { BandejaPorEnviar } from "../views/components/EFIRMA/BandejaPorEnviar";
import { BandejaHistorico } from "../views/components/EFIRMA/BandejaHistorico";
import EnviarDocumento from "../views/components/EFIRMA/EnviarDocumento";

export const AppRouter = ({ login }: { login: boolean }) => {
  const log = login;
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [responseStorage, setResponseStorage] = useState<RESPONSESTORAGE>();
  const [ClearresponseStorage, setClearResponseStorage] =
    useState<RESPONSESTORAGE>();

  const handleCloseModal = () => {};
  const handleChangeImg = () => {
    //  GetImage("/FOTOPERFIL/", user.RutaFoto);
  };

  /*const GetImage = (tipo: string, nameImagen: string) => {
    AuthService.GetImagenProfile(tipo, nameImagen).then((res) => {
      if (res.SUCCESS) {
        setResponseStorage(res.RESPONSE.RESPONSE);
      } else {
        setResponseStorage(responseStorage);
      }
    });
  };
*/
  useEffect(() => {
    handleChangeImg();
  }, []);

  return (
    <Inicio
      user={user}
      imgData={String(responseStorage?.FILE)}
      imgTipo={String(responseStorage?.TIPO)}
    >
      <Routes>
        <Route path="/*" element={log ? <Eo404 /> : <AuthRouter />} />
        <Route
          path="/"
          element={log ? <Bienvenido user={user} /> : <AuthRouter />}
        />
        {/* SECCION DE CATALOGOS */}
        <Route path="/inicio/catalogos/mun" element={<Municipios />} />
        <Route path="/inicio/catalogos/munpob" element={<MunPoblacion />} />
        <Route
          path="/inicio/catalogos/munfacturacion"
          element={<MunFacturacion />}
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
        <Route path="/inicio/catalogos/munpobreza" element={<MunPobreza />} />
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
        <Route path="/inicio/catalogos/tipoFondo" element={<TipoFondo />} />
        <Route
          path="/inicio/catalogos/TipoFondoCalculo"
          element={<TipoFondoCalculo />}
        />
        <Route
          path="/inicio/catalogos/inflacionMes"
          element={<InflacionMes />}
        />
        <Route
          path="/inicio/catalogos/inflacionAnio"
          element={<InflacionAnio />}
        />
        <Route path="/inicio/catalogos/fondos" element={<Fondos />} />
        <Route
          path="/inicio/catalogos/parametrosgenerales"
          element={<ParametrosGenerales />}
        />
        <Route path="/inicio/catalogos/bancos" element={<Bancos />} />
        <Route
          path="/inicio/catalogos/cuentabancaria"
          element={
            <CuentaBancaria
              idmunicipio={""}
              municipio={""}
              handleCloseModal={handleCloseModal}
              fullScrean={false}
            />
          }
        />
        <Route
          path="/inicio/catalogos/SolicitudCambios"
          element={<CambiosMun />}
        />
        <Route path="/inicio/catalogos/divisas" element={<Divisas />} />
        <Route path="/inicio/catalogos/ajustes" element={<AjustesCalculos />} />
        <Route
          path="/inicio/catalogos/org"
          element={log ? <CATORG /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/catretenciones"
          element={log ? <CatRet /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/catClasificacion"
          element={log ? <ClasificadorSP /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/PEF"
          element={log ? <PEF /> : <AuthRouter />}
        />
        {/* FIN SECCION DE CATALOGOS */}

        {/* SECCION DE CALENDARIO */}
        <Route path="/Calendario" element={<CalendarC />} />
        {/* FIN SECCION DE CALENDARIO */}

        {/* SECCION DE NOTIFICACIONES */}
        <Route path="/Notification" element={<ListNotification />} />
        {/* FIN SECCION DE NOTIFICACIONES */}

        {/* SECCION DE PERFIL */}
        <Route
          path="/perfil"
          element={
            <Perfil
              handleChangeImg={handleChangeImg}
              imgData={String(responseStorage?.FILE)}
              imgTipo={String(responseStorage?.TIPO)}
            />
          }
        />
        {/* FIN SECCION DE PERFIL */}

        {/* SECCION DE ARTICULOS */}
        <Route path="/inicio/articulos/art14f/:tipo" element={<Art14fP />} />
        <Route
          path="/inicio/articulos/art14d/:tipo/:id/:activo/:version"
          element={<Art14f />}
        />
        <Route
          path="/inicio/articulos/calculogarantia"
          element={<CalculoGarantiaComponente />}
        />
        <Route path="/inicio/articulos/isai" element={<ISAI />} />
        <Route path="/inicio/articulos/isnR" element={<IsnRecaudacion />} />
        <Route path="/inicio/articulos/AS" element={<AjSemestral />} />
        <Route path="/inicio/articulos/AA" element={<Ajanual />} />
        {/* FIN SECCION DE ARTICULOS */}

        {/* SECCION PARTICIPACIONES FEDERALES Y ESTATALES */}
        <Route
          path="/inicio/participaciones/:fondo"
          element={log ? <Fpg /> : <AuthRouter />}
        />
        <Route
          path="/inicio/convenios/:fondo"
          element={log ? <Fpg /> : <AuthRouter />}
        />
        {/* FIN SECCION PARTICIPACIONES FEDERALES */}

        {/* SECCION USUARIOS, ROLES, PERMISOS */}
        <Route
          path="/inicio/usuario"
          element={log ? <Usuarios /> : <AuthRouter />}
        />
        <Route
          path="/inicio/adminVideos"
          element={
            log ? (
              <AdminVideos
                IdMenu={""}
                modo={""}
                tipo={0}
                dt={undefined}
                handleClose={handleCloseModal}
              />
            ) : (
              <AuthRouter />
            )
          }
        />
        {/* FIN SECCION USUARIOS, ROLES, PERMISOS */}

        {/* SECCION MUNICIPIOS */}
        <Route
          path="/inicio/contactomunicipio"
          element={log ? <ContactoMunicipios /> : <AuthRouter />}
        />
        <Route
          path="/inicio/agregarcontactomunicipio"
          element={log ? <AgregarContactoMunicipio /> : <AuthRouter />}
        />
        {/* SECCION MUNICIPIOS */}

        {/* DCCP */}
        <Route
          path="/inicio/dpcp"
          element={log ? <AsigPresupuestal /> : <AuthRouter />}
        />
        <Route
          path="/inicio/dpcp/auth"
          element={log ? <AuthSolicitudes /> : <AuthRouter />}
        />
        {/* FIN DCCP */}
        {/* DAF */}
        <Route
          path="/inicio/daf"
          element={log ? <AsigPago /> : <AuthRouter />}
        />
        {/* FIN DAF */}

        {/* DAMOP */}
        <Route
          path="/inicio/Municipio/participaciones"
          element={log ? <Participaciones /> : <AuthRouter />}
        />
        {/* FIN DAMOP */}

        {/* /// Firma Electronica */}
        <Route path="/efirm/firma" element={<Firma />} />
        <Route path="/efirm/config" element={<Configuracione />} />
        <Route path="/efirm/BandejaEnviados" element={<BandejaEnviados />} />
        <Route path="/efirm/BandejaRecibidos" element={<BandejaRecibidos />} />
        <Route path="/efirm/BandejaPorEnviar" element={<BandejaPorEnviar />} />
        <Route path="/efirm/BandejaHistorico" element={<BandejaHistorico />} />
        <Route path="/enviar/:IdDoc" element={<EnviarDocumento />} />

        {/* /// Fin Firma Electronica */}

        {/* /// herramientas */}
        <Route
          path="/estadisticas/reportes"
          element={log ? <Reporteador /> : <AuthRouter />}
        />
        <Route path="/powerbicph/" element={log ? <CPH /> : <AuthRouter />} />
        {/* /// herramientas */}
      </Routes>
    </Inicio>
  );
};
