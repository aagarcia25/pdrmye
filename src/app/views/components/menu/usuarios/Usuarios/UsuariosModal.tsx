import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";

const UsuariosModal = ({
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



  const [id, setId] = useState("");
  const [Nombre, setNombre] = useState("");
  const [ApellidoPaterno, setApellidoPaterno] = useState("");
  const [ApellidoMaterno, setApellidoMaterno] = useState("");
  const [NombreUsuario, setNombreUsuario] = useState("");
  const [CorreoElectronico, setCorreoElectronico] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));


  const handleSend = () => {
    if (
      Nombre == "" ||
      ApellidoPaterno == "" ||
      ApellidoMaterno == "" ||
      NombreUsuario == "" ||
      CorreoElectronico == ""
    ) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHUSER: user.id,
        CHID: id,
        NOMBRE: Nombre,
        AP: ApellidoPaterno,
        AM: ApellidoMaterno,
        NUSER: NombreUsuario,
        CORREO: CorreoElectronico
      };
      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    console.log(data);
    AuthService.permisosindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: tipo == 1 ? "Registro Agregado!" : "Registro Editado!",
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
    console.log(dt);

    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setApellidoPaterno(dt?.row?.ApellidoPaterno);
      setApellidoMaterno(dt?.row?.ApellidoMaterno);
      setNombreUsuario(dt?.row?.NombreUsuario);
      setCorreoElectronico(dt?.row?.CorreoElectronico);
    }
  }, [dt]);

  return (
    <div>
      <Dialog open={open}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', }}>
          <label className="Titulo"> {tipo == 1 ? "Nuevo Registro" : "Editar Registro"}
          </label>
        </Box>

        <DialogContent>
          <Box>
            <TextField
              required
              margin="dense"
              id="nombre"
              label="Nombre"
              value={Nombre}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setNombre(v.target.value)}
              error={Nombre == "" ? true : false}
            />

            <TextField
              required
              margin="dense"
              id="ApellidoPaterno"
              label="Apellido Paterno"
              value={ApellidoPaterno}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setApellidoPaterno(v.target.value)}
              error={ApellidoPaterno == "" ? true : false}
            />

            <TextField
              required
              margin="dense"
              id="ApellidoMaterno"
              label="Apellido Materno"
              value={ApellidoMaterno}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setApellidoMaterno(v.target.value)}
              error={ApellidoMaterno == "" ? true : false}
            />

            <TextField
              required
              margin="dense"
              id="NombreUsuario"
              label="Nombre Usuario"
              value={NombreUsuario}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setNombreUsuario(v.target.value)}
              error={NombreUsuario == "" ? true : false}
            />

            <TextField
              required
              margin="dense"
              id="CorreoElectronico"
              label="Correo Electronico"
              value={CorreoElectronico}
              type="mail"
              fullWidth
              variant="standard"
              onChange={(v) => setCorreoElectronico(v.target.value)}
              error={CorreoElectronico == "" ? true : false}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <button className="guardar" onClick={() => handleSend()}>Guardar</button>
          <button className="cerrar" onClick={() => handleClose()}>Cancelar</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsuariosModal;
