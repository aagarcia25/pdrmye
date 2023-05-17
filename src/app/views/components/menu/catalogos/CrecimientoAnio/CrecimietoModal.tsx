import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
} from "@mui/material";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";

const CrecimietoModal = ({
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
  const [anio, setAnio] = useState("");
  const [crecimiento, setCrecimiento] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));


  const handleSend = () => {
    if (anio === "" || crecimiento === "") {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
         CHUSER: user.id,
        ANIO: anio,
        CRECIMIENTO: crecimiento,
      };

      handleRequest(data);
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
    CatalogosServices.crecimientoAnio(data).then((res) => {
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
    CatalogosServices.crecimientoAnio(data).then((res) => {
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

  useEffect(() => {
    if (dt === "") {
      //console.log(dt);
    } else {
      setId(dt?.row?.id);
      setAnio(dt?.row?.Anio);
      setCrecimiento(dt?.row?.Crecimiento);
    }
  }, [dt]);

  return (
    <Dialog open={open} fullScreen>
      <DialogTitle>{modo}</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            
            margin="dense"
            required
            id="anio"
            label="Año"
            value={anio}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setAnio(v.target.value)}
            error={anio === "" ? true : false}
          />

          <TextField
            margin="dense"
            required
            id="crecimiento"
            label="Crecimiento"
            value={crecimiento}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setCrecimiento(v.target.value)}
            error={crecimiento === "" ? true : false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleSend()}>Guardar</Button>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrecimietoModal;
