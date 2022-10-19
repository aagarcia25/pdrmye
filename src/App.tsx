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
  setBloqueo,
  setlogin,
  setMenus,
  setMunicipios,
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
import { ParametroServices } from "./app/services/ParametroServices";

function App() {
 
  //cambiar a 5 minutos
  const timeout = 600000;
  const [isIdle, setIsIdle] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const jwt = query.get("jwt");
  const [openSlider, setOpenSlider] = useState(false);
  const [acceso, setAcceso] = useState(false);

  const loadParametrosGenerales = () => {
    let data = {
      NUMOPERACION: 5,
      NOMBRE: "URL_LOGIN"
    }
    ParametroServices.ParametroGeneralesIndex(data).then((restApp) => {
      console.log(restApp.RESPONSE.Valor);
      localStorage.setItem("RUTA_LOGIN", JSON.stringify(restApp.RESPONSE.Valor));
    });
  };

  
 

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

  const buscaUsuario = (id: string) => {
    let data = {
      NUMOPERACION: 1,
      ID: id,
    };
    AuthService.adminUser(data).then((res2) => {
      console.log('Respuesta de usuario');
      console.log(res2);
      const us: UserInfo = res2;
      setUser(us.RESPONSE);
      console.log(us.RESPONSE.ROLES.length);
     if(us.RESPONSE.ROLES.length !==0){
        setRoles(us.RESPONSE.ROLES);
        setPermisos(us.RESPONSE.PERMISOS);
        setMenus(us.RESPONSE.MENUS);
        loadMunicipios();
        loadMeses();
        loadAnios();
        setOpenSlider(false);
        setlogin(true);
        setAcceso(true);
      }
    




    });
  };

  const verificatoken = (token: string) => {
    // SE VALIDA EL TOKEN
    setToken(jwt);
    console.log("verificando")
    UserServices.verify({}, token).then((res) => {
      console.log(res)
      if (res.status == 200) {
        //SE OBTIENE LA INFORMACION DE DETALLE DEL USUARIO
        setPU(res.data.data);
        const user: UserReponse = JSON.parse(String(getPU()));
        console.log('BUSCANDO USUARIO')
        console.log(user.IdUsuario)
        buscaUsuario(user.IdUsuario);
       
      } else if (res.status == 401) {
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
               ventana.opener = window.self;
               ventana.close();
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
        //SE OBTIENE LA INFORMACION DE DETALLE DEL USUARIO
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
            window.location.replace(getItem("RUTA_LOGIN")||"");
          }
        });
      }
    });
  };

  const handleOnIdle = () => {
    setBloqueo(true);
    setIsIdle(true);
  }

  const {} = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  function isbloqueado(): boolean {
    let resul = false;
    if (getBloqueo()){
        resul = true;
    }else{
        resul = isIdle;
    }
    return resul;
  }


  useLayoutEffect(() => {
    localStorage.clear();
    //SE CARGAN LOS PARAMETROS GENERALES
    loadParametrosGenerales();
    //setTimeout(() => {
      if (String(jwt) != null && String(jwt) != "") {
        console.log("verificando token");
        verificatoken(String(jwt));
       
      } else {
        Swal.fire({
          title: "Token no valido",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace(getItem("RUTA_LOGIN")||"");
          }
        });
      }
    //}, 2000);

  }, []);



  return (
    <div>
      <Slider open={openSlider}></Slider>
      {isbloqueado() ? (
        <BloqueoSesion handlePassword={handleOnActive} />
      ) : acceso ? (
        <AppRouter />
      ) : (
        <Validacion />
      )}
    </div>
  );




}

export default App;
