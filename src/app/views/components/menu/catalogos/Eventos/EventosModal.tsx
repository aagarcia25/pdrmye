
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Button,
  IconButton,
  Input,
} from "@mui/material";
import {  porcentage } from '../../CustomToolbar'
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";
import { PhotoCamera } from "@mui/icons-material";





const EventosModal = ({
  open,
  modo,
  handleClose,
  tipo,
  nuevoEvento,
  dt
}: {
    
  open: boolean;
  modo: string;
  tipo:number;
  handleClose:Function,
  nuevoEvento:boolean;
  dt:any
}) => {




  // CAMPOS DE LOS FORMULARIOS
  const today = new Date();
  const year = today.getFullYear();


  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [inicioEvento, setInicioEvento] = useState("");
  const [finEvento, setFinEvento] = useState("");
  const [fechaActual, setFechaActual] = useState(year);
  const [slideropen, setslideropen] = useState(false);

  const [IdMunicipio, setIdMunicipio] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();
 


  
  const municipiosc = () => {
    let data = {};
    if (!validaLocalStorage("FiltroMunicipios")) {
      CatalogosServices.Filtromunicipios(data).then((res) => {
        setMunicipios(res.RESPONSE);
      });
    }
    let m: Imunicipio[] = JSON.parse(getMunicipios() || "");
    setValues(m);
  };


  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "MunFacturacion");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
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

  const handleSend = () => {
    if (imagen == "") {
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
      
        IDMUNICIPIO: IdMunicipio,
        KM2: imagen,
 

        
      };

      handleRequest(data);
    }
  };

  const handleFechaInicio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInicioEvento(event.target.value);
  };


  const handleFechaFin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinEvento(event.target.value);
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
    CatalogosServices.eventos(data).then((res) => {
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
    CatalogosServices.eventos(data).then((res) => {
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
        setDescripcion(dt?.row?.Descripcion)
        setImagen(dt?.row?.Imagen)
        setIdMunicipio(dt?.row?.idmunicipio)
   
       
        {console.log(finEvento)}

        console.log(dt)
   
console.log(fechaActual.toLocaleString())

   
    }
   console.log(dt)
  }, [dt] );



  return (


    <Dialog open={open} >
    <DialogTitle>{modo}</DialogTitle>
   
 { (nuevoEvento=== true)?

   <Box  sx={{ bgcolor: 'rgb(255, 255, 255)',   }}>


          <Box  sx={{ bgcolor: 'rgb(255, 255, 255)',width: '100%', display: 'flex', flexDirection: 'row-reverse',}}>
       
       <TextField
        id="datetime-finaliza"
        required
        label="Fin"
        type="datetime-local"
     
        onChange={handleFechaFin}
        InputLabelProps={{
          shrink: true,
        }}
      
      />
      <TextField
        id="datetime-inicia"
        required
        label="Inicio"
        type="datetime-local"
        defaultValue={Date()}
        //minValue= {Date()}
        onChange={handleFechaInicio}
        InputLabelProps={{
          shrink: true,
        }}
        
      />


          <IconButton  color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          < PhotoCamera/>
          </IconButton>
          </Box>
 
           <Box  sx={{ bgcolor: 'rgb(255, 255, 255)',width: '100%', display: 'flex', flexDirection: 'row-reverse',}}>
            <Button onClick={() => handleClose()}>Guardar</Button>
            <Button onClick={() => handleClose()}>Cerrar</Button>
            </Box>


  </Box>
  
  : 
     <Box  >
        <Box >
        <img id="imagen" src={imagen} style={{ width: "100%" }}/>
        </Box>

     <TextField
            required
            margin="dense"
            id="anio"
            value ={descripcion}
        
            type="string"
            fullWidth
            variant="standard"
         
            InputProps={{
            readOnly: true,
          
             }}
          />  
                <Box  sx={{ bgcolor: 'rgb(255, 255, 255)',width: '100%', display: 'flex', flexDirection: 'row-reverse',}}>

                <Button onClick={() => handleClose()}>Cerrar</Button>
                </Box>           
    </Box>
 } 


    </Dialog>
  
  );
};

export default EventosModal;

function dayjs(arg0: string): any {
  throw new Error("Function not implemented.");
}

