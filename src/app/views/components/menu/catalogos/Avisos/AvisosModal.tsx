
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
} from "@mui/material";
import {  porcentage } from '../../CustomToolbar'
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";


const AvisosModal = ({
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



    const [tipoOperacion, setTipoOperacion] = useState(0);
    const [data, setData] = useState({});
  
  
    const [Facturacion, setFacturacion] = useState([]);
    const [plantilla, setPlantilla] = useState("");
    const [slideropen, setslideropen] = useState(false)

  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [Avisos, setAvisos] = useState("");


  const [IdMunicipio, setIdMunicipio] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();
 
 

  
  const municipiosc = () => {
    let data = {};
    if (!validaLocalStorage("FiltroMunicipios")) {
      CatalogosServices.Filtromunicipios(data).then((res) => {
        setMunicipios(res.RESPONSE);
      });
    }
    let m: Imunicipio[] = JSON.parse(String(getMunicipios()));
    setValues(m);
  };


 

  const handleSend = () => {
    if (Avisos == "") {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: 1,
        ANIO: anio,
        IDMUNICIPIO: IdMunicipio,
        KM2: Avisos,
 

        
      };

      handleRequest(data);
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
    CatalogosServices.avisos(data).then((res) => {
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
    CatalogosServices.avisos(data).then((res) => {
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
    municipiosc();

    if(dt === ''  ){
        console.log(dt)
       
    }else{
        setId(dt?.row?.id)
        setAnio(dt?.row?.Anio)
        setAvisos(dt?.row?.Documento)
        setIdMunicipio(dt?.row?.idmunicipio)
   
   

        console.log(dt)


   
    }
   console.log(dt)
  }, [dt] );



  return (
    <Dialog open={open}>
      <DialogTitle>{modo}</DialogTitle>
      <DialogContent>
        <Box>
        <a href= {Avisos}>descargar</a>,
         
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleSend()}>Guardar</Button>
        <Button onClick={() => handleClose()}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvisosModal;
