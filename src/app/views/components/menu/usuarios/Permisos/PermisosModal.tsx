import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, DialogActions, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../../../../helpers/Alert';
import { Toast } from '../../../../../helpers/Toast';
import { RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AuthService } from '../../../../../services/AuthService';
import { getUser } from '../../../../../services/localStorage';
import ModalForm from '../../../componentes/ModalForm';




const PermisosModal = ({
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


  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));




  const handleSend = () => {
    if (nombre == "" || descripcion == "") {
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
        PERMISO: nombre,
        DESCRIPCION: descripcion,
      };
      handleRequest(data);
    }
  };


  const handleRequest = (data: any) => {
    console.log(data);
    let titulo = "";
    if (tipo == 1) {
      //AGREGAR
      titulo = "Registro Agregado!";
    } else if (tipo == 2) {
      //EDITAR
      titulo = "Registro Editado!";
    }

    AuthService.permisosindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: titulo,
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
      setNombre(dt?.row?.Permiso);
      setdescripcion(dt?.row?.Descripcion);
    }
  }, [dt]);


  return (
    <div>
      <Dialog open={open} fullScreen>
    <ModalForm title={modo} handleClose={handleClose}>


    <DialogContent>
          <Box>
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
              error={nombre == "" ? true : false}
              InputProps={{
                readOnly: tipo == 1 ? false : true,
                inputMode: "numeric",
              }}
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
              onChange={(v) => setdescripcion(v.target.value)}
              error={descripcion == "" ? true : false}

            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button className="actualizar" onClick={() => handleSend()}>Actualizar</Button>
          {/* <button className="cerrar" onClick={() => handleClose()}>Cancelar</button> */}
        </DialogActions>


    </ModalForm>

      </Dialog>
    </div>
  )
}

export default PermisosModal
