import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { AuthService } from "../../../../../services/AuthService";
import { getUser } from "../../../../../services/localStorage";

export const PerfilesUsuarioModal = ({
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
  const [descripcion, setDescripcion] = useState("");
  const [referencia, setReferencia] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));

  //IMPRESIONES DE CAMPOS
  console.log("---------Impresión de CAMPOS------");
  console.log("id", id);
  console.log("descripcion :", descripcion);
  console.log("referencia :", referencia);
  console.log("---------FIN-de-Impresión de CAMPOS------");

  const handleSend = () => {
    if (!descripcion || !referencia) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        CHID: id,
        CHUSER: user.id,
        NUMOPERACION: tipo,
        DESCRIPCION: descripcion,
        REFERENCIA: referencia,
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
    AuthService.perfilindex(data).then((res) => {
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
    AuthService.perfilindex(data).then((res) => {
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
    } else {
      //SE PINTAN LOS CAMPOS
      setId(dt?.row?.id);
      setDescripcion(dt?.row?.Descripcion);
      setReferencia(dt?.row?.Referencia);
    }
  }, [dt]);

  return (
    <Dialog open={open} fullScreen>
      <DialogContent>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label className="Titulo">{modo}</label>
          </Box>
          {modo === "Agregar Registro" ? (
            <Container maxWidth="sm">
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
                error={!descripcion ? true : false}
                InputProps={{}}
              />
              <TextField
                required
                margin="dense"
                id="Referencia"
                label="Referencia"
                value={referencia}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setReferencia(v.target.value)}
                error={!referencia ? true : false}
                InputProps={{}}
              />
            </Container>
          ) : (
            ""
          )}

          {modo === "Editar Registro" ? (
            <Container maxWidth="sm">
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
                error={!descripcion ? true : false}
                InputProps={{}}
              />
              <TextField
                disabled
                required
                margin="dense"
                id="Referencia"
                label="Referencia"
                value={referencia}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setReferencia(v.target.value)}
                error={!referencia ? true : false}
                InputProps={{}}
              />
            </Container>
          ) : (
            ""
          )}
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
