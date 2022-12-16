import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";

const TipoFondoModal = ({
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
  const [clave, setClave] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));



  const agregar = (data: any) => {
    CatalogosServices.tipofondo(data).then((res) => {
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
    CatalogosServices.tipofondo(data).then((res) => {
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

  const handleSend = () => {
    if (descripcion === "") {
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
        CLAVE: clave,
        DESCRIPCION: descripcion,
      };

      handleRequest(data);
    }
  };


  useEffect(() => {

    if (dt === '') {
      //console.log(dt)
    } else {
      setId(dt?.row?.id)
      setDescripcion(dt?.row?.Descripcion)
      setClave(dt?.row?.Clave)
    }

  }, [dt]);



  return (
    <div>
      <Dialog open={open} fullScreen>
        <DialogTitle>{modo}</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              required
              margin="dense"
              id="clave"
              label="Clave"
              value={clave}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setClave(v.target.value)}
              error={clave === "" ? true : false}
            />

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
              error={descripcion === "" ? true : false}
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

export default TipoFondoModal;
