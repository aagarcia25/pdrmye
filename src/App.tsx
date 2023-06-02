import jwt_decode from "jwt-decode";
import { useLayoutEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { HashRouter } from "react-router-dom";
import Swal from "sweetalert2";
import "./Fonts.css";
import "./Globals.css";
import { UserLogin } from "./app/interfaces/user/User";
import { RESPONSE, UserInfo } from "./app/interfaces/user/UserInfo";
import { AppRouter } from "./app/router/AppRouter";
import { AuthService } from "./app/services/AuthService";
import { ParametroServices } from "./app/services/ParametroServices";
import { UserServices } from "./app/services/UserServices";
import { CatalogosServices } from "./app/services/catalogosServices";
import {
  getRfToken,
  getToken,
  getUser,
  setDepartamento,
  setMenus,
  setMunicipio,
  setMunicipios,
  setOrganismo,
  setPerfilFoto,
  setPerfiles,
  setPermisos,
  setRfToken,
  setRoles,
  setToken,
  setUser,
  validaLocalStorage,
} from "./app/services/localStorage";
import { BloqueoSesion } from "./app/views/components/BloqueoSesion";
import Slider from "./app/views/components/Slider";
import Validacion from "./app/views/components/Validacion";


function App() {
  //cambiar a 5 minutos
  const timeout = 960000;
  const urlParams = window.location.search;
  const query = new URLSearchParams(urlParams);
  const jwt = query.get("jwt");
  const refjwt = query.get("rf");
  const [openSlider, setOpenSlider] = useState(true);
  const [bloqueoStatus, setBloqueoStatus] = useState<boolean>();
  const [login, setlogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>();
  const [acceso, setAcceso] = useState(false);
  const [contrseñaValida, setContraseñaValida] = useState(true);





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

  const mensaje = (icon: string, title: string, text: string) => {
    setlogin(false);
    setAcceso(false);
    Swal.fire({
      icon: icon === "info" ? "info" : "warning",
      title: title,
      text: text,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        var ventana = window.self;
        ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN));
      }
    });
  }

  const GetImage = (tipo: string, nameImagen: string) => {
    AuthService.GetImagenProfile(tipo,nameImagen).then((res) => {
      if (res.SUCCESS) {
        setPerfilFoto(res.RESPONSE.RESPONSE);
      }
    });
  };
  const buscaUsuario = (id: string) => {
    let data = {
      NUMOPERACION: 1,
      ID: id,
    };
    AuthService.adminUser(data).then((res2) => {
      const us: UserInfo = res2;
      setUser(us.RESPONSE);

      if (String(us.RESPONSE) === "PrimerInicio") {
        Swal.fire({
          icon: "info",
          title: 'Bienvenid@',
          text: 'Su cuenta Se Confirmo Correctamente',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            var ventana = window.self;
            ventana.location.reload();
          }
        });

      }
      else if (us.SUCCESS && String(us.RESPONSE) !== "PrimerInicio") {
        setRoles(us.RESPONSE.ROLES);
        setPermisos(us.RESPONSE.PERMISOS);
        setMenus(us.RESPONSE.MENUS);
        setPerfiles(us.RESPONSE.PERFILES);
        setDepartamento(us.RESPONSE.DEPARTAMENTOS);
        setMunicipio(us.RESPONSE.MUNICIPIO);
        setOrganismo(us.RESPONSE.ORG);
        loadMunicipios();
        loadMeses();
        loadAnios();
        parametros();
        setOpenSlider(false);
        setlogin(true);
        setAcceso(true);
        setBloqueoStatus(false);
        GetImage("/FOTOPERFIL/", us?.RESPONSE?.RutaFoto);

      }
      else if (us.SUCCESS) {
        mensaje('', 'Información', us.STRMESSAGE==="Exito"?"":us.STRMESSAGE + " Contactar Al Departamento Correspondiente");
      }
      else if (us.SUCCESS === false && !us.RESPONSE) {
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
            ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN))


          }
        });
      }
      else if (us.SUCCESS === false && us.RESPONSE) {
        Swal.fire({
          icon: "info",
          title: us.RESPONSE,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            var ventana = window.self;
            ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN));


          }
        });
      }
    });
  };


  const verificatoken = (primerInicio: boolean) => {
 console.log("Verificando el token");
    UserServices.verify({}).then((res) => {
      console.log(res);
      if (res?.status === 200) {
        setUserName(res.data.data.NombreUsuario)
        buscaUsuario(res.data.data.IdUsuario);
        setBloqueoStatus(false);
        setOpenSlider(false);
        if(!primerInicio){
          var ventana = window.self;
          ventana.location.reload();

        }
      } else if (res.status === 401) {
        setOpenSlider(false);
        setlogin(false);
        setAcceso(false);

      }
    });
  };

  const handleOnActive = (password: string, user:string) => {
    const decoded: UserLogin = jwt_decode(String(getToken()));
    const userInfo: RESPONSE = JSON.parse(String(getUser()));
    let data = {
      NombreUsuario: decoded.NombreUsuario?decoded.NombreUsuario: userInfo.NombreUsuario,
      Contrasena: password,
    };
    setOpenSlider(true);
    UserServices.login(data).then((res) => {

      if (res.status === 200) {
        setContraseñaValida(true);
        setToken(res.data.token);
        setRfToken(res.data.refreshToken);
        var ventana = window.self;
        ventana.location.reload();
        
        if (!getUser() || getUser()===undefined){
          verificatoken(false);
        }
      } else if (res.status === 401) {
        setContraseñaValida(false);
        Swal.fire({
          title: res.data.msg,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            setAcceso(false);
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN));
          }
        });
      }
    });
  };

  const handleOnIdle = () => {
    setBloqueoStatus(true);
    setAcceso(false);
  }

  const { } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  useLayoutEffect(() => {
    if (jwt && refjwt && getToken() && getRfToken()) {
      localStorage.clear();
    }

    if (!getToken() && !getRfToken() && jwt !== null && refjwt !== null && !acceso && bloqueoStatus===undefined ) {
      const decoded: UserLogin = jwt_decode(String(jwt));
      if (((decoded.exp - (Date.now() / 1000)) / 60) > 1) {
        setToken(jwt);
        setRfToken(refjwt);
        var ventana = window.self;
        ventana.location.replace("/");
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
            ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN));

          }
        });
      }
    }


    if (!jwt && !refjwt && bloqueoStatus===undefined  && !acceso && !login && getToken() && getRfToken()) {
      const decoded: UserLogin = jwt_decode(String(getToken()));
      if (((decoded.exp - (Date.now() / 1000)) / 60) > 44.5) {
        verificatoken(true);
      } else{
        handleOnIdle();
      }

    }
    else {
      setOpenSlider(false);

    }
    

  }, [bloqueoStatus]);



  return (
    <div>
      <Slider open={openSlider}></Slider>
      {bloqueoStatus ? (
        <BloqueoSesion handlePassword={handleOnActive} />
      ) : acceso ?
        <>
          <HashRouter basename={"/"}>
            <AppRouter login={login} />
          </HashRouter>
        </> :
        !contrseñaValida ? <Validacion /> : ""
      }
    </div>
  );
}

export default App;


