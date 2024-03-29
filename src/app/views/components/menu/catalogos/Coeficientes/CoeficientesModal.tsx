import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
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

  const [id, setId] = useState("");
  const [vigente, setVigente] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [checked, setChecked] = useState(true);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const handleChangeVigencia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setVigente(event.target.checked);
  };

  const agregar = (data: any) => {
    CatalogosServices.coeficientes(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
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
          title: "¡Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleRequest = (data: any) => {
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
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        VIGENTE: vigente,
        DESCRIPCION: descripcion,
      };

      handleRequest(data);
    }
  };

  useEffect(() => {
    if (dt == "") {
    } else {
      setId(dt?.row?.id);
      setDescripcion(dt?.row?.Descripcion);
      if (dt?.row?.Vigente == "1") {
        setChecked(true);
        setVigente(true);
      } else {
        setChecked(false);
        setVigente(false);
      }
    }
  }, [dt]);

  return (
    <div>
      <Dialog open={open} fullScreen>
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

            <FormControlLabel
              value={vigente}
              control={
                <Checkbox checked={checked} onChange={handleChangeVigencia} />
              }
              label="Vigente"
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
