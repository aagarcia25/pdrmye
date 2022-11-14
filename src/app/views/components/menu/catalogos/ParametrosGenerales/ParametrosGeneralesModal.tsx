import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
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

  //IMPRESIONES DE CAMPOS
  console.log("---------Impresión de CAMPOS------");
  console.log("id", id);
  console.log("nombre", nombre);
  console.log("valor", valor);
  console.log("user", user);
  console.log("---------FIN-de-Impresión de CAMPOS------");

  const handleSend = () => {
    if (nombre === null || valor === null) {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        CHID:id,
        NUMOPERACION: tipo,
        NOMBRE: nombre,
        VALOR: valor,
      };
      console.log("data de modal", data);
      handleRequest(data);
      handleClose();
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
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
        console.log("Sé pudo agregar");
      } else {
        AlertS.fire({
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
      //SE PINTAN LOS CAMPOS
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setValor(dt?.row?.Valor);
    }
  }, [dt]);

  return (
    <Dialog open={open} fullScreen>
      <DialogContent>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label className="Titulo">{modo}</label>
          </Box>
          {(modo === "Agregar Registro") ?
            <Container maxWidth="sm">
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
            error={!nombre ? true : false}
            InputProps={{}}
          />
          <TextField
            required
            margin="dense"
            id="Valor"
            label="Valor"
            value={valor}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setValor(v.target.value)}
            error={!valor ? true : false}
            InputProps={{}}
          />
            </Container>
          : ""
          }

{(modo === "Editar Registro") ?
            <Container maxWidth="sm">
                <TextField
                disabled
            required
            margin="dense"
            id="Nombre"
            label="Nombre"
            value={nombre}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setNombre(v.target.value)}
            InputProps={{}}
          />
          <TextField
            required
            margin="dense"
            id="Valor"
            label="Valor"
            value={valor}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setValor(v.target.value)}
            error={!valor ? true : false}
            InputProps={{}}
          />
            </Container>
          : ""
          }
          
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
