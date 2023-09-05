import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import {
  UserServices,
  ValidaSesion,
} from "../../../../../services/UserServices";
import {
  getIdApp,
  getToken,
  setToken,
} from "../../../../../services/localStorage";
import IFrame from "../../../Herramientas/IFrame";
import ModalForm from "../../../componentes/ModalForm";
const UsuariosModal = ({
  handleClose,
  tipo,
  dt,
}: {
  tipo: string;
  handleClose: Function;
  dt: any;
}) => {
  const RfToken = () => {
    UserServices.refreshToken().then((resAppRfToken) => {
      if (resAppRfToken?.status === 200) {
        setToken(resAppRfToken?.data.token);
      } else {
        Swal.fire({
          title: "Sesión Demasiado Antigua",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(
              String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)
            );
          }
        });
      }
    });
  };

  useEffect(() => {
    console.log(dt);
    ValidaSesion();
    UserServices.verify({}).then((resAppLogin) => {
      if (resAppLogin.status === 401) {
        RfToken();
      }
    });
  }, [dt]);

  return (
    <div>
      <ModalForm title={"Registro de Usuario"} handleClose={handleClose}>
        <IFrame
          source={
            "?jwt=" +
            JSON.parse(String(getToken())) +
            "&IdApp=" +
            JSON.parse(String(getIdApp())) +
            "&idUsuarioModificado=" +
            String(getidusuario(dt.Id))
          }
          baseURL={String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)}
        />
      </ModalForm>
    </div>
  );
};

export default UsuariosModal;

function getidusuario(Id: any) {
  console.log(Id);
  return Id;
}
