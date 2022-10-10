import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  InputAdornment,
  DialogActions,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { AuthService } from "../../../../../services/AuthService";
import { UserReponse } from "../../../../../interfaces/user/UserReponse";
import { getPU } from "../../../../../services/localStorage";




const RolesModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt
}: {
  open: boolean;
  modo: string;
  tipo:number;
  handleClose:Function,
  dt:any
}) => {

  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");  
  const user: UserReponse = JSON.parse(String(getPU()));
  const [chuser, setChuser] = useState<string>(String());
  const [nombre, setNombre] = useState<string>();
  const [descripcion, setDescripcion] = useState<string>();
  const [values, setValues] = useState<Imunicipio[]>();
 

  const handleSend = () => {

    if (nombre==null||descripcion==null|| nombre==""||descripcion=="") {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHUSER: user.IdUsuario,
        NOMBRE: nombre,
        DESCRIPCION: descripcion,
        
      
      };
     
      handleRequest(data);
      handleClose("saved");
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

  const handleTeste = () => {
    console.log(user.IdUsuario);
  
  };


  const agregar = (data: any) => {
    AuthService.rolesindex(data).then((res) => {
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
    CatalogosServices.munpoblacion(data).then((res) => {
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
   
    if(dt === ''  ){
        console.log(dt)
       
    }else{
        setId(dt?.row?.id)
        setChuser(dt?.row?.Anio)
        setNombre(dt?.row?.totalPob)
        setDescripcion(dt?.row?.idmunicipio)
        console.log(dt.row)
    }
   
  }, [dt]);



  return (
    <Dialog open={open}>      
      <DialogContent>
        <Box>
          <Box
          sx={{ display: 'flex', justifyContent: 'center',}}>
            <label className="Titulo">{modo}</label>
          </Box>
        

          <TextField
            required
            margin="dense"
            id="anio"
            label="Nombre"
            value={nombre}
           
            fullWidth
            variant="standard"
            onChange={(v) => setNombre(String(v.target.value))}
            error={nombre == null ? true : false}
             InputProps={{
            readOnly: tipo == 1 ? false : true,
       
             }}
          />

          <TextField
            margin="dense"
            required
            id="fac"
            label="Descripcion"
            value={descripcion}
            multiline
            fullWidth
            variant="standard"
            onChange={(v) => setDescripcion(String(v.target.value))}
            error={descripcion == null ? true : false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>Guardar</button>
        <button className="cerrar" onClick={() => handleClose("cerrar")}>Cerrar</button>
      </DialogActions>
    </Dialog>
  );
};

export default RolesModal;
