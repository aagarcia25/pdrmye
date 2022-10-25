import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  DialogActions,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";

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
    if (!nombre || !descripcion ) {
      Alert.fire({
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
    }
  };

  const handleRequest = (data: any) => {
    console.log(data);
    if (tipo == 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo == 2) {
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
        Alert.fire({
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
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setDescripcion(dt?.row?.Descripcion);
    }
  }, [dt]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label className="Titulo">{tipo == 1 ?"Agregar Registro" : "Editar Registro"}</label>
          </Box>
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
            error={nombre == "" ? true : false}
            InputProps={{
              readOnly: tipo == 1 ? false : true,
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
            error={descripcion == "" ? true : false}
            InputProps={{
              
            }}
          />

        </Box>
      </DialogContent>

      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>
          Guardar
        </button>
        <button className="cerrar" onClick={() => handleClose()}>
          Cancelar
        </button>
      </DialogActions>
    </Dialog>
  );

};
