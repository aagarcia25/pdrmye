import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";

const CoeficientesModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const user = getUser();
  const [id, setId] = useState("");
  const [vigente, setVigente] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregar = (data: any) => {
    CatalogosServices.coeficientes(data).then((res) => {
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
    CatalogosServices.coeficientes(data).then((res) => {
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

  const handleSend = () => {
    if (descripcion == "") {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: 1,
        VIGENTE: vigente,
        DESCRIPCION: descripcion,
      };

      handleRequest(data);
    }
  };

  useEffect(() => {
    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);
      setDescripcion(dt?.row?.Descripcion);
      setVigente(dt?.row?.Vigente);
    }
  }, [dt]);

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{modo}</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              margin="dense"
              required
              id="descripcion"
              label="Descripción"
              value={descripcion}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setDescripcion(v.target.value)}
              error={descripcion == "" ? true : false}
            />

            <TextField
              required
              margin="dense"
              id="vigente"
              label="Vigente"
              value={vigente}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setVigente(v.target.value)}
              error={vigente == "" ? true : false}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleSend()}>Guardar</Button>
          <Button onClick={() => handleClose()}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CoeficientesModal;
