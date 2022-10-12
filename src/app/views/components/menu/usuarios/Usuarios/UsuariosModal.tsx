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
import { getToken, getUser } from "../../../../../services/localStorage";
import validator from 'validator';
import { UserServices } from "../../../../../services/UserServices";
import { Token } from "@mui/icons-material";
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



  const [id, setId] = useState<string>();
  const [Nombre, setNombre] = useState<string>();
  const [ApellidoPaterno, setApellidoPaterno] = useState<string>();
  const [ApellidoMaterno, setApellidoMaterno] = useState<string>();
  const [NombreUsuario, setNombreUsuario] = useState<string>();
  const [CorreoElectronico, setCorreoElectronico] = useState<string>();
  const [emailValid, setEmailValid] = useState<boolean>();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const token = JSON.parse(String(getToken()));
  const [emailError, setEmailError] = useState('')


  const validateEmail = (e:any) => {
    var email = e.target.value
  setCorreoElectronico (email);
    if (validator.isEmail(email)) {
      setEmailError('Email Valido')
      setEmailValid(true);
    } else {
      setEmailError('Ingrese Email Valido')
      setEmailValid(false);
    }
  }

  
  const handleSend = () => {
    if (
      Nombre == null ||
      ApellidoPaterno == null ||
      ApellidoMaterno == null ||
      NombreUsuario == null ||
      CorreoElectronico == null||
      emailValid==false
    ) {
      Alert.fire({
        title: "Error!",
        text: "Verificar los campos",
        icon: "error",
      });
    } else {
      let data = {
        /*NUMOPERACION: tipo,
        CHUSER: user.id,
        CHID: id,
        NOMBRE: Nombre,
        AP: ApellidoPaterno,
        AM: ApellidoMaterno,
        NUSER: NombreUsuario,
        CORREO: CorreoElectronico
*/
        Nombre: Nombre,
        ApellidoPaterno:ApellidoPaterno ,
        ApellidoMaterno: ApellidoMaterno,
        NombreUsuario: NombreUsuario,
        CorreoElectronico: CorreoElectronico,
        IdUsuarioModificador: user.id,
        

      };
      handleRequest(data);
    }
  };



  const handleRequest = (data: any) => {
    console.log(data);
    UserServices.signup(data , String(Token)).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: tipo == 3 ? "Registro Agregado!" : "Registro Editado!",
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
          <label className="Titulo"> {tipo == 3 ? "Nuevo Registro" : "Editar Registro"}
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
              error={Nombre == null ? true : false}
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
              error={ApellidoPaterno == null ? true : false}
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
              error={ApellidoMaterno == null ? true : false}
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
              error={NombreUsuario == null ? true : false}
            />

            <TextField
              required
              margin="dense"
              id="CorreoElectronico"
              label="Correo Electronico"
              fullWidth
              value={CorreoElectronico}
              variant="standard"
              onChange={(e) => validateEmail(e)}
              error={emailValid==false||CorreoElectronico==null}
            />
            <label>{emailError}</label>
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
