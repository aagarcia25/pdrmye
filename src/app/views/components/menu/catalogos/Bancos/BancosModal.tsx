import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  Grid,
} from "@mui/material";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";

export const BancosModal = ({
  open,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  tipo: number;
  handleClose: Function;
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
    } else {
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setDescripcion(dt?.row?.Descripcion);
    }
  }, [dt]);

  return (


    <>
      <ModalForm title={tipo === 1 ? "Agregar Registro" : "Editar Registro"} handleClose={handleClose} >
        <Box boxShadow={3}>
        <Grid container direction="row" justifyContent="center" alignItems="center"  sx={{ padding:"2%" }}  >
        <Grid item alignItems="center" justifyContent="center" xs={4}></Grid>
          <Grid item alignItems="center" justifyContent="center" xs={4}>
            <TextField
              required
              margin="dense"
              id="Nombre"
              label="Nombre"
              value={nombre}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setNombre(v.target.value)}
              error={nombre === "" ? true : false}
              InputProps={{
                readOnly: tipo === 1 ? false : true,
              }}
            />

            <TextField
              required
              margin="dense"
              id="Descripcion"
              label="Descripción"
              value={descripcion}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setDescripcion(v.target.value)}
              error={descripcion === "" ? true : false}
              InputProps={{

              }}
            />
          </Grid>
          <Grid item alignItems="center" justifyContent="center" xs={4}></Grid>
          <Grid item alignItems="center" justifyContent="center" xs={12} height={40}></Grid>
          <Grid item alignItems="center" justifyContent="center" xs={5}></Grid>
          <Grid item alignItems="center" justifyContent="center" xs={2}>
            <button  className={tipo === 1 ? "guardar" : "actualizar"}  onClick={() => handleSend()} >
              {tipo === 1 ? "Agregar" : "Editar"}
            </button>
          </Grid>

        </Grid>
        </Box>
      </ModalForm>
    </>
  );

};
