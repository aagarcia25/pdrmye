import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
} from "@mui/material";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { municipiosc } from "../../../../../share/loadMunicipios";


const MunPoblacionProyeccionModal = ({
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
  const [anio, setAnio] = useState("");
  const [poblacion, setPoblacion] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [IdMunicipio, setIdMunicipio] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [mun, setMun] = useState<SelectValues[]>([]);
 
 



 

  const handleSend = () => {
    if (poblacion == "") {
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
        ANIO: anio,
        IDMUNICIPIO: IdMunicipio,
        POB: poblacion,
 

        
      };

      handleRequest(data);
    }
  };

  const handleFilterChange = (event:SelectValues) => { 
    setIdMunicipio(event.value);
 
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
    CatalogosServices.munproyec(data).then((res) => {
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
    CatalogosServices.munproyec(data).then((res) => {
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
    setMun(municipiosc());

    if(dt === ''  ){
        console.log(dt)
       
    }else{
        setId(dt?.row?.id)
        setAnio(dt?.row?.anio)
        setPoblacion(dt?.row?.Pob)
        setIdMunicipio(dt?.row?.idmunicipio)
        setMunicipio(dt?.row?.Nombre)
   

        console.log(dt)


   
    }
   
  }, [dt]);



  return (
    <Dialog open={open} fullScreen>
      <DialogTitle>{modo}</DialogTitle>
      <DialogContent>
        <Box>
          <FormControl variant="standard" fullWidth>
    
            <Box>
            <label ><br /> Municipio: <br />{municipio}</label>
          </Box>
        

          <Box>
            <label > <br />Año <br />{anio}</label>
          </Box>

          <Box>
            <label ><br /> Poblacion <br /></label>
          </Box>
          <TextField
            margin="dense"
            required
            id="pob"
            value={poblacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setPoblacion(v.target.value)}
            error={poblacion == "" ? true : false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
         
         </FormControl>
        </Box>
        
      </DialogContent>

      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>Guardar</button>
        <button className="cerrar" onClick={() => handleClose()}>Cerrar</button>
      </DialogActions>
    </Dialog>
  );
};

export default MunPoblacionProyeccionModal;
