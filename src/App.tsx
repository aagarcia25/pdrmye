import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import { UserInfo } from "./app/interfaces/user/UserInfo";
import { UserReponse } from "./app/interfaces/user/UserReponse";
import { AppRouter } from "./app/router/AppRouter";
import { AuthService } from "./app/services/AuthService";
import { CatalogosServices } from "./app/services/catalogosServices";
import {
  getBloqueo,
  getItem,
  getPU,
  getToken,
  setBloqueo,
  setDepartamento,
  setlogin,
  setMenus,
  setMunicipios,
  setPerfiles,
  setPermisos,
  setPU,
  setRoles,
  setToken,
  setUser,
  validaLocalStorage,
} from "./app/services/localStorage";
import { UserServices } from "./app/services/UserServices";
import { BloqueoSesion } from "./app/views/components/BloqueoSesion";
import Validacion from "./app/views/components/Validacion";
import { useIdleTimer } from "react-idle-timer";
import Slider from "./app/views/components/Slider";
import { env_var } from '../src/app/environments/env';

function App() {

  //cambiar a 5 minutos
  const timeout = 600000;
  const [isIdle, setIsIdle] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const jwt = query.get("jwt");
  const [openSlider, setOpenSlider] = useState(true);
  const [acceso, setAcceso] = useState(false);

  const loadAnios = () => {
    let data = { NUMOPERACION: 4 };
    if (!validaLocalStorage("Anios")) {
      CatalogosServices.SelectIndex(data).then((res) => {
        localStorage.setItem("Anios", JSON.stringify(res.RESPONSE));
      });
    }
  };

  const loadMeses = () => {
    let data = { NUMOPERACION: 2 };
    if (!validaLocalStorage("Meses")) {
      CatalogosServices.SelectIndex(data).then((res) => {
        localStorage.setItem("Meses", JSON.stringify(res.RESPONSE));
      });
    }
  };

  const loadMunicipios = () => {
    let data = { NUMOPERACION: 5 };
    if (!validaLocalStorage("FiltroMunicipios")) {
      CatalogosServices.SelectIndex(data).then((res) => {
        setMunicipios(res.RESPONSE);
      });
    }
  };

  const mensaje = (title: string, text: string) => {
    setlogin(false);
    setAcceso(false);
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        var ventana = window.self;
        ventana.opener = window.self;
        ventana.close();
      }
    });
  }
  const buscaUsuario = (id: string) => {
    let data = {
      NUMOPERACION: 1,
      ID: id,
    };
    AuthService.adminUser(data).then((res2) => {
      const us: UserInfo = res2;
      setUser(us.RESPONSE);
      if (us.RESPONSE.DEPARTAMENTOS.length !== 0) {
        // if (us.RESPONSE.PERFILES.length !== 0) {
          if (us.RESPONSE.ROLES.length !== 0) {
            setRoles(us.RESPONSE.ROLES);
            setPermisos(us.RESPONSE.PERMISOS);
            setMenus([{"id":"123bd3bd-518f-11ed-ab6c-040300000000","deleted":"0","UltimaActualizacion":"2022-10-21 17:24:04","FechaCreacion":"2022-10-21 17:24:04","ModificadoPor":"2a5a9661-38f9-11ed-aed0-040300000000","CreadoPor":"2a5a9661-38f9-11ed-aed0-040300000000","Menu":"Operaciones","Descripcion":"Operaciones para Municipios","MenuPadre":null,"Icon":null,"Path":"/","Nivel":0,"Orden":null,"ControlInterno":null,"items":[{"id":"3554e448-518f-11ed-ab6c-040300000000","deleted":"0","UltimaActualizacion":"2022-10-21 17:25:03","FechaCreacion":"2022-10-21 17:25:03","ModificadoPor":"2a5a9661-38f9-11ed-aed0-040300000000","CreadoPor":"2a5a9661-38f9-11ed-aed0-040300000000","Menu":"Recepción de Recursos","Descripcion":"Recepción de Recursos a Municipios","MenuPadre":"123bd3bd-518f-11ed-ab6c-040300000000","Icon":null,"Path":"/inicio/recursos","Nivel":1,"Orden":0,"ControlInterno":null,"subitems":[]},{"id":"a1a0fe21-5639-11ed-a988-040300000000","deleted":"0","UltimaActualizacion":"2022-11-02 10:14:37","FechaCreacion":"2022-10-27 15:55:04","ModificadoPor":"2a5a9661-38f9-11ed-aed0-040300000000","CreadoPor":"2a5a9661-38f9-11ed-aed0-040300000000","Menu":"Solicitud de Anticipo","Descripcion":"Solcitud de Anticipo","MenuPadre":"123bd3bd-518f-11ed-ab6c-040300000000","Icon":null,"Path":"/inicio/anticipop","Nivel":1,"Orden":3,"ControlInterno":"SOLIANT","subitems":[]}]},{"id":"0a653e2e-400b-11ed-af5a-040300000000","deleted":"0","UltimaActualizacion":"2022-10-11 12:53:41","FechaCreacion":"2022-09-29 10:26:06","ModificadoPor":"c3f329d8-3aa5-11ed-aed0-040300000000","CreadoPor":"1","Menu":"Catálogos","Descripcion":"Administración de Catalogos","MenuPadre":"","Icon":"<Article />","Path":"/","Nivel":0,"Orden":2,"ControlInterno":null,"items":[{"id":"c12ae0ca-5544-11ed-a988-040300000000","deleted":"0","UltimaActualizacion":"2022-10-26 11:20:30","FechaCreacion":"2022-10-26 10:42:10","ModificadoPor":"2a5a9661-38f9-11ed-aed0-040300000000","CreadoPor":"2a5a9661-38f9-11ed-aed0-040300000000","Menu":"Mis cuentas","Descripcion":"Listado de mis cuentas bancarias","MenuPadre":"0a653e2e-400b-11ed-af5a-040300000000","Icon":null,"Path":"/inicio/catalogos/cuentabancaria","Nivel":1,"Orden":27,"ControlInterno":"CUENTABANCARIA","subitems":[]},{"id":"a21e7880-40df-11ed-af5a-040300000000","deleted":"0","UltimaActualizacion":"2022-10-21 15:57:34","FechaCreacion":"2022-09-30 11:47:54","ModificadoPor":"1","CreadoPor":"1","Menu":"Avisos","Descripcion":"Avisos","MenuPadre":"0a653e2e-400b-11ed-af5a-040300000000","Icon":null,"Path":"/inicio/catalogos/avisos","Nivel":1,"Orden":16,"ControlInterno":"AVISOS","subitems":[]}]}]);
            setPerfiles(us.RESPONSE.PERFILES);
            setDepartamento(us.RESPONSE.DEPARTAMENTOS);
            loadMunicipios();
            loadMeses();
            loadAnios();
            setOpenSlider(false);
            setlogin(true);
            setAcceso(true);
          } else {
            mensaje("No tienes Relacionado un Rol", "Favor de Verificar sus Permisos con el área de TI");
          }
        // } else {
          // mensaje("No tienes Relacionado un Perfil", "Favor de Verificar sus Permisos con el área de TI");
        // }
      } else {
        mensaje("No tienes Relacionado un Departamento", "Favor de Verificar sus Permisos con el área de TI");
      }




    });
  };

  const verificatoken = (token: string) => {

    UserServices.verify({}, token).then((res) => {
      if (res.status == 200) {
        setPU(res.data.data);
        const user: UserReponse = JSON.parse(String(getPU()));
        buscaUsuario(user.IdUsuario);
      } else if (res.status == 401) {
        setOpenSlider(false);
        setlogin(false);
        setAcceso(false);
        Swal.fire({
          title: "Mensaje: " + res.data.msg,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(env_var.BASE_URL_LOGIN);
          }
        });
      }
    });
  };

  const handleOnActive = (v: string) => {
    const user: UserReponse = JSON.parse(String(getPU()));
    let data = {
      NombreUsuario: user.NombreUsuario,
      Contrasena: v,
    };

    UserServices.login(data).then((res) => {
      if (res.status == 200) {
        setIsIdle(false);
        setBloqueo(false);
      } else if (res.status == 401) {
        Swal.fire({
          title: res.data.msg,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(env_var.BASE_URL_LOGIN);
          }
        });
      }
    });
  };

  const handleOnIdle = () => {
    setBloqueo(true);
    setIsIdle(true);
  }

  const { } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  function isbloqueado(): boolean {
    let resul = false;
    if (getBloqueo()) {
      resul = true;
    } else {
      resul = isIdle;
    }
    return resul;
  }


  useLayoutEffect(() => {

    //SE CARGAN LOS PARAMETROS GENERALES
    if (String(jwt) != null && String(jwt) != 'null' && String(jwt) != "") {
      setToken(jwt);
      verificatoken(String(jwt));
    } else if (getToken() != null) {
      console.log('token');
      console.log(String(getToken()))
      verificatoken(String(getToken()));
    } else {
      Swal.fire({
        title: "Token no valido",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          var ventana = window.self;
          ventana.location.replace(env_var.BASE_URL_LOGIN);
        }
      });
    }

  }, []);



  return (
    <div>
      <Slider open={openSlider}></Slider>
      {isbloqueado() ? (
        <BloqueoSesion handlePassword={handleOnActive} />
      ) : acceso ? (
        <AppRouter />
      ) : (
        openSlider ? "" : <Validacion />
      )}
    </div>
  );




}

export default App;
