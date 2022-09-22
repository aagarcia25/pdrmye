import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import "./App.css";
import { AuthContext } from "./app/views/store/contexts/AuthContext";
import { AppRouter } from "./app/router/AppRouter";
import { authReducer } from "./app/views/store/reducers/authReducer";
import {
  getPU,
  getUser,
  setMenus,
  setPermisos,
  setPU,
  setRoles,
  setUser,
} from "./app/services/localStorage";
import { isAuthenticated } from "./app/services/authenticationService";
import Validacion from "./app/views/components/Validacion";
import { useLocation, useParams } from "react-router-dom";
import { UserServices } from "./app/services/UserServices";
import Swal from "sweetalert2";
import { BloqueoSesion } from "./app/views/components/BloqueoSesion";
import { useIdleTimer } from "react-idle-timer";
import { AuthService } from "./app/services/AuthService";
import { UserReponse } from "./app/interfaces/user/UserReponse";
import { UserDetail } from "./app/interfaces/user/UserDetail";
import { UserInfo } from "./app/interfaces/user/UserInfo";

function App() {



  //const log = true; //isAuthenticated();
  const [log, setLog] = useState(false);
  const registerUser = (rs: UserDetail) => {
    let data = {
      NUMOPERACION: 1,
      ID: rs.Id,
      NOMBRE: rs.Nombre,
      AP: rs.ApellidoPaterno,
      AM: rs.ApellidoMaterno,
      NUSER: rs.NombreUsuario,
      CORREO: rs.CorreoElectronico,
    };
    AuthService.adminUser(data).then((res2) => {
      const us: UserInfo = res2;
      setUser(us.RESPONSE);
      setPermisos(us.RESPONSE.PERMISOS);
      setRoles(us.RESPONSE.ROLES);
      setMenus(us.RESPONSE.MENUS);
    });
  };

  const validaUser = (token: string) => {
    const user: UserReponse = JSON.parse(String(getPU()));
    UserServices.userDetail({ IdUsuario: user.IdUsuario }, token).then(
      (res1) => {
        const userd: UserDetail = res1.data.data;
        registerUser(userd);
      }
    );
  };

  const verificatoken = (token: string) => {
    // SE VALIDA EL TOKEN
    UserServices.verify({}, token).then((res) => {
      if (res.status == 200) {
        setLog(true);
        //SE OBTIENE LA INFORMACION DE DETALLE DEL USUARIO
        setPU(res.data.data);
        validaUser(token);
      } else if (res.status == 401) {

        Swal.fire({
          title: res.data.msg,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
           // localStorage.clear();
           // window.location.replace("http://10.200.4.106/");
          }
        });
      }
    });
  };

  const query = new URLSearchParams(useLocation().search);
  const jwt = query.get("jwt");




  //cambiar a 5 minutos
  const timeout = 600000;
 

  const [isIdle, setIsIdle] = useState(false);

  const handleOnActive = (v: string) => {
    console.log("PAssword");
    console.log(v);
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

  const {
    reset,
    pause,
    resume,
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime,
  } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    if (String(jwt) != null && String(jwt) != "") {
      verificatoken(String(jwt));
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
  }, [log]);

  return (
    <div>
      {isIdle ? (
        <BloqueoSesion handlePassword={handleOnActive} />
      ) : log ? (
        <AppRouter />
      ) : (
        <Validacion />
      )}

      {/* {log ? <AppRouter /> : <Validacion />} */}
    </div>
  );
}

export default App;
