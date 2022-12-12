import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  Grid,
} from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { CatalogosServices } from "../../../services/catalogosServices";
import { AlertS } from "../../../helpers/AlertS";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import { Toast } from "../../../helpers/Toast";

export const REQAnticipo = ({
  handleClose,
  tipo,
  dt,
}: {
  handleClose: Function;
  tipo: number;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (!nombre || !descripcion) {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.id,
        NOMBRE: nombre,
        DESCRIPCION: descripcion,
      };

      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
    //console.log(data);
    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
      //EDITAR

      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.Bancos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const editar = (data: any) => {
    CatalogosServices.Bancos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    if (dt === "") {
      //console.log(dt);
    } else {
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setDescripcion(dt?.row?.Descripcion);
    }
  }, [dt]);

  return (
    <>
      <ModalForm
        title={"Generación de Requerimiento de Anticipo"}
        handleClose={handleClose}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={0}>
            <Grid item xs={3}>
              Tipo:
            </Grid>
            <Grid item xs={3}>
              6
            </Grid>
            <Grid item xs={3}>
              Clave:
            </Grid>
            <Grid item xs={3}>
              6
            </Grid>
          </Grid>
        </Grid>


        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={0}>
            <Grid item xs={3}>
              Concepto:
            </Grid>
            <Grid item xs={3}>
              6
            </Grid>
            <Grid item xs={3}>
              Clave:
            </Grid>
            <Grid item xs={3}>
           
            </Grid>
          </Grid>
        </Grid>


        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={0}>
            <Grid item xs={3}>
              Importe:
            </Grid>
            <Grid item xs={3}>
              6
            </Grid>
            <Grid item xs={3}>
             
            </Grid>
            <Grid item xs={3}>
           
            </Grid>
          </Grid>
        </Grid>



        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={0}>
            <Grid item xs={3}>
              Clasificación:
            </Grid>
            <Grid item xs={3}>
              6
            </Grid>
            <Grid item xs={3}>
             
            </Grid>
            <Grid item xs={3}>
           
            </Grid>
          </Grid>
        </Grid>



        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={0}>
            <Grid item xs={3}>
              Observaciones:
            </Grid>
            <Grid item xs={9}>
              6
            </Grid>
            
          </Grid>
        </Grid>



        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item alignItems="center" justifyContent="center" xs={2}>
            <button
              className={tipo === 1 ? "guardar" : "actualizar"}
              onClick={() => handleSend()}
            >
              {tipo === 1 ? "Agregar" : "Editar"}
            </button>
          </Grid>
        </Grid>
      </ModalForm>
    </>
  );
};
