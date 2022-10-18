import { Box, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import { ParametroServices } from "../../../../../services/ParametroServices";

export const ParametrosGeneralesModal = ({
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
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (nombre || valor) {
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
        VALOR: valor,
        DELETED: 0,
      };
      console.log("user props", user);
      console.log("user id", user.id);
      console.log("data de modal", data);
      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
    console.log(data);
    if (tipo == 1) {
      //AGREGAR
      console.log("A AGREGAR");
      agregar(data);
    } else if (tipo == 2) {
      //EDITAR
      console.log("A EDITAR");

      editar(data);
    }
  };

  const agregar = (data: any) => {
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
        console.log("Sé pudo agregar");
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        console.log("No se pudo agregar");
      }
    });
  };

  const editar = (data: any) => {
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
        console.log("Sé pudo editar");
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        console.log("No se pudo editar");
      }
    });
  };

  useEffect(() => {
    if (dt === "") {
    } else {
      //SE PINTAN LOS CAMPOS
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setValor(dt?.row?.Valor);
    }
  }, [dt]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label className="Titulo">{modo}</label>
          </Box>
          <TextField
            required
            margin="dense"
            id="nombre"
            label="Nombre"
            value={nombre}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setNombre(v.target.value)}
            error={nombre ? true : false}
            InputProps={{}}
          />
          <TextField
            required
            margin="dense"
            id="valor"
            label="Valor"
            value={valor}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setValor(v.target.value)}
            error={valor ? true : false}
            InputProps={{}}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>
          Guardar
        </button>
        <button className="cerrar" onClick={() => handleClose()}>
          Cerrar
        </button>
      </DialogActions>
    </Dialog>
  );
};
