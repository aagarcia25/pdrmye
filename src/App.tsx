import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import "./Fonts.css";
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
  setMunicipio,
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
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();
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

     // if(us.RESPONSE.DEPARTAMENTOS.length !==0 ){
     // if(us.RESPONSE.PERFILES.length !==0){
     // if(us.RESPONSE.ROLES.length !==0){
        setRoles(us.RESPONSE.ROLES);
        setPermisos(us.RESPONSE.PERMISOS);
        setMenus(us.RESPONSE.MENUS);
        setPerfiles(us.RESPONSE.PERFILES);
        setDepartamento(us.RESPONSE.DEPARTAMENTOS);
        setMunicipio(us.RESPONSE.MUNICIPIO);
        loadMunicipios();
        loadMeses();
        loadAnios();
        setOpenSlider(false);
        setlogin(true);
        setAcceso(true);
    //            }else{
    //      mensaje("No tienes Relacionado un Rol","Favor de Verificar sus Permisos con el área de TI");
    //    }
    //  }else{
    //     mensaje("No tienes Relacionado un Perfil","Favor de Verificar sus Permisos con el área de TI");
    //  }
   // }else{
  //       mensaje("No tienes Relacionado un Departamento","Favor de Verificar sus Permisos con el área de TI");
  //}




    });
  };

  const verificatoken = (token: string) => {

    UserServices.verify({}, token.replaceAll('"','')).then((res) => {
      console.log(token)
      console.log(token.replaceAll('"',''))
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
        }else {
          setTimeout(() => {
            navigate("/Calendario");
          }, 10000);
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
