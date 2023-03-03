import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import "./Fonts.css";
import "./Globals.css"
import Swal from "sweetalert2";
import { UserInfo } from "./app/interfaces/user/UserInfo";
import { AppRouter } from "./app/router/AppRouter";
import { AuthService } from "./app/services/AuthService";
import { CatalogosServices } from "./app/services/catalogosServices";
import {
  getRfToken,
  getToken,
  setDepartamento,
  setMenus,
  setMunicipio,
  setMunicipios,
  setPerfiles,
  setPermisos,
  setRfToken,
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
import { ParametroServices } from "./app/services/ParametroServices";
import jwt_decode from "jwt-decode";
import { UserLogin } from "./app/interfaces/user/User";
import SelectValues from "./app/interfaces/Select/SelectValues";


function App() {
  //cambiar a 5 minutos
  const timeout = 300000;
  const query = new URLSearchParams(useLocation().search);
  const jwt = query.get("jwt");
  const refjwt = query.get("rf");
  const [openSlider, setOpenSlider] = useState(true);
  const [bloqueoStatus, setBloqueoStatus] = useState<boolean>();
  const [login, setlogin] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>();
  const [acceso, setAcceso] = useState(false);
  const [meses, setMeses] = useState<SelectValues[]>([]);

  const parametros = () => {
    let data = {
      NUMOPERACION: 5,
      NOMBRE: "AMBIENTE"
    }
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      localStorage.setItem("Ambiente", JSON.stringify(res.RESPONSE.Valor));
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
       
        setMeses(res.RESPONSE);
        // localStorage.setItem("Meses", JSON.stringify(res.RESPONSE));
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

  const mensaje = (icon: string, title: string, text: string) => {
    setlogin(false);
    setAcceso(false);
    Swal.fire({
      icon: icon === "info"? "info": "warning" ,
      title: title,
      text: text,
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
  const buscaUsuario = (id: string) => {
    let data = {
      NUMOPERACION: 1,
      ID: id,
    };
    AuthService.adminUser(data).then((res2) => {
      const us: UserInfo = res2;
      setUser(us.RESPONSE);
      // console.log(res2.RESPONSE[0])
      // if(us.RESPONSE.DEPARTAMENTOS.length !==0 ){
      // if(us.RESPONSE.PERFILES.length !==0){
      if (String(us.RESPONSE) === "Primer Inicio") {
        Swal.fire({
          icon: "info",
          title: 'Bienvenid@',
          text: 'Su cuenta Se Confirmo Correctamente; Contacte al Departamento Corresponiente Para Asignar Rol y Permisos',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            var ventana = window.self;
            ventana.location.replace(env_var.BASE_URL_LOGIN)
            // ventana.location.reload();
            // location.reload();
            // navigate("/Notification");

          }
        });

      } 
      if (us.RESPONSE) {
        setRoles(us.RESPONSE.ROLES);
        setPermisos(us.RESPONSE.PERMISOS);
        setMenus(us.RESPONSE.MENUS);
        setPerfiles(us.RESPONSE.PERFILES);
        setDepartamento(us.RESPONSE.DEPARTAMENTOS);
        setMunicipio(us.RESPONSE.MUNICIPIO);
        loadMunicipios();
        loadMeses();
        loadAnios();
        parametros();
        setOpenSlider(false);
        setlogin(true);
        setAcceso(true);
      } else if(us.SUCCESS) {
        mensaje('','Información', us.STRMESSAGE +" Contactar Al Departamento Correspondiente");
      }
      else if(us.SUCCESS ==false && us.RESPONSE===""){
        Swal.fire({
          icon: "info",
          title: 'Bienvenid@',
          text: us.STRMESSAGE,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            var ventana = window.self;
            ventana.location.replace(env_var.BASE_URL_LOGIN)
            // ventana.location.reload();
            // location.reload();
            // navigate("/Notification");

          }
        });
        // verificatoken();
      }
    });
  };


  const verificatoken = () => {

    UserServices.verify({}).then((res) => {

      if (res?.status === 200) {
        // console.log(res.data.data)
        setUserName(res.data.data.NombreUsuario)
        buscaUsuario(res.data.data.IdUsuario);
      } else if (res.status === 401) {
        setOpenSlider(false);
        setlogin(false);
        setAcceso(false);

      }
    });
  };

  const handleOnActive = (v: string) => {

    let data = {
      NombreUsuario: userName,
      Contrasena: v,
    };

    UserServices.login(data).then((res) => {

      if (res.status === 200) {
        setToken(res.data.token);
        setRfToken(res.data.refreshToken);

        setBloqueoStatus(false);
      } else if (res.status === 401) {
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
    setBloqueoStatus(true);
  }

  const { } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });




  useLayoutEffect(() => {

    if (!jwt === false && getToken() !== null && getRfToken() !== null) {
      localStorage.clear();

    }

    if (getToken() === null || getRfToken() === null) {
      const decoded: UserLogin = jwt_decode(String(jwt));
      // console.log((decoded.exp - (Date.now() / 1000)) / 60)
      if (((decoded.exp - (Date.now() / 1000)) / 60) > 1) {
        setToken(jwt);
        setRfToken(refjwt);
        verificatoken();
        // RfToken(String(refjwt));
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
    } else {
      verificatoken();
    }
  }, [bloqueoStatus]);



  return (
    <div>
      <Slider open={openSlider}></Slider>
      {bloqueoStatus ? (
        <BloqueoSesion handlePassword={handleOnActive} />
      ) : acceso ? (
        <AppRouter login={login} />
      ) : (
        openSlider ? "" : <Validacion />
      )}
    </div>
  );




}


export default App;
function setTokenValid(arg0: boolean) {
  throw new Error("Function not implemented.");
}

