import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import { UserInfo } from "./app/interfaces/user/UserInfo";
import { UserReponse } from "./app/interfaces/user/UserReponse";
import { AppRouter } from "./app/router/AppRouter";
import { AuthService } from "./app/services/AuthService";
import { CatalogosServices } from "./app/services/catalogosServices";
import {
  getPU,
  islogin,
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

function App() {
 
  //cambiar a 5 minutos
  const timeout = 600000;
  const [isIdle, setIsIdle] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const jwt = query.get("jwt");
  const [openSlider, setOpenSlider] = useState(false);
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
    let data = {};
    if (!validaLocalStorage("FiltroMunicipios")) {
      CatalogosServices.Filtromunicipios(data).then((res) => {
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
      const us: UserInfo = res2;
      setUser(us.RESPONSE);
      setPermisos(us.RESPONSE.PERMISOS);
      setRoles(us.RESPONSE.ROLES);
      setMenus(us.RESPONSE.MENUS);
    });
  };

  const verificatoken = (token: string) => {
    // SE VALIDA EL TOKEN
    setToken(jwt);
    UserServices.verify({}, token).then((res) => {
      if (res.status == 200) {
        setlogin(true);
        setAcceso(true);
        //SE OBTIENE LA INFORMACION DE DETALLE DEL USUARIO
        setPU(res.data.data);
        const user: UserReponse = JSON.parse(String(getPU()));
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
            window.location.replace("http://10.200.4.106/");
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
      } else if (res.status == 401) {
        Swal.fire({
          title: res.data.msg,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            window.location.replace("http://10.200.4.106/");
          }
        });
      }
    });
  };

  const handleOnIdle = () => setIsIdle(true);

  const {} = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    //setTimeout(() => {
   
    
      if (String(jwt) != null && String(jwt) != "") {
        verificatoken(String(jwt));

        console.log("validando municipios");
        loadMunicipios();
        loadMeses();
        loadAnios();
        setOpenSlider(false);

      } else {
        Swal.fire({
          title: "Token no valido",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("http://10.200.4.106/");
          }
        });
      }
   

    // }, 2000);
  }, []);



  return (
    <div>
      <Slider open={openSlider}></Slider>
      {isIdle ? (
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
