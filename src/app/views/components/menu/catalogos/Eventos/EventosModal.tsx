
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Button,
  IconButton,
  Input,
  Container,
} from "@mui/material";
import {  porcentage } from '../../CustomToolbar'
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";
import { Label, PhotoCamera } from "@mui/icons-material";
import { devNull } from "os";
import { style } from "@mui/system";
import "../Eventos/globals.css";

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
  const today = new Date().toISOString();
  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nameNewImage, setNameNewImage] = useState("");
  const [nameEvent, setNameEvent] = useState("");
  const [newImage, setNewImage] = useState(Object);
  const [finEvento, setFinEvento] = useState("");
  const [image, setImage] = useState("");
  
  const [slideropen, setslideropen] = useState(false);
  const [IdMunicipio, setIdMunicipio] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();
  var hoy = new Date()
  var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
  var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
  var fechaInicioEvento:"";
  var Fecha_min = fecha +'T'+ hora;
  const [inicioEventoMin, setInicioEventoMin] = useState(Fecha_min);
  const [inicioEvento, setInicioEvento] = useState( Fecha_min);
////////////////////////////////
const [preview, setPreview]=useState<string>();
const [NewImagePreview, setNewImagePreviw] =useState<File>();
const [cleanUp, setCleanUp] =useState<boolean>(false);



//////////////////////////////////


  const testeoVariables = () => {
    console.log("inicio de evento seteado    "+inicioEvento)
    console.log("fin de evento   "+finEvento)
    console.log("det"+ dt)
  console.log("fecha y hora  minimo     "+inicioEventoMin);
console.log("carga de imagen "+ newImage)
console.log("nombre de imagen para cargar     "+ nameNewImage)

  }

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

  const handleUpload = () => {
      setslideropen(true);
    
    const formData = new FormData();
    formData.append("IMAGEN", newImage, nameNewImage);
    formData.append("NUMOPERACION", "1");
    formData.append("CHID", "");
    formData.append("NOMBRE", nameEvent);
    formData.append("DESCRIPCION", descripcion);
    formData.append("FECHAINICIO", inicioEvento);
    formData.append("FECHAFIN", finEvento);
    formData.append("CHUSER", "1");


    console.log(formData);
    console.log("nombre extraido de imagen name   "+nameNewImage);
    


    CatalogosServices.eventos(formData).then((res) => {
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

  const handleFechaInicio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInicioEvento(event.target.value.toString());
  };

  const handleFechaFin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinEvento(event.target.value.toString());
  };
  const handleNewImage = (event:any) => {

    let file = event.target!.files[0]!;
    ///// SE VALIDA SI NO SE CARGO ARCHIVO EN EL INPUT PARA PODER EXTRAER EL NOMBRE
    if (event.target.files.length===0){
    }else{
      setNameNewImage (event.target!.files[0]!.name);
    }
    
    console.log(event.target);

    /////////////////////////////

if (file && file.type.substr (0,5)=== "image"){

  setNewImagePreviw(file);
  setCleanUp(true);
  setNewImage(null);

}    /////////////////////////

    setNewImage(file);
    console.log(newImage)

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
        setImage(dt?.row?.Imagen)
        setIdMunicipio(dt?.row?.idmunicipio)
   
    }
 
  }, [dt] );

  useEffect(()=>{
    if (NewImagePreview){
    
      const reader = new FileReader();
      reader.onloadend =()=>{
        setPreview (reader.result as string);
      };
      reader.readAsDataURL (NewImagePreview!);
    }
    else{
      setPreview("o");
      }
    }, [NewImagePreview]);
    
    
  return (


    <Dialog open={open} >
    <DialogTitle>{modo}</DialogTitle>
   
 { (nuevoEvento=== true)?



   <Box  sx={{ bgcolor: 'rgb(255, 255, 255)',   }}>


          <Box  sx={{ bgcolor: 'rgb(255, 255, 255)',width: '100%', display: 'flex',}}>
                <div >
                
                <Box>  


                           
                {(cleanUp)?
                <Box>  
                <img src={preview} style={{objectFit:"scale-down"}} />
                </Box> 

                :
                ""               
                }

              <IconButton color="primary" aria-label="upload picture" component="label">
                 <input                
                required                
                type="file"
                hidden
                accept="image/*"
                
           
                onChange={(event) =>{         
                  handleNewImage(event)  } } />

                <PhotoCamera/>
                </IconButton>
                  
               
                  </Box>
                  </div>


            <Box sx={{alignItems:"center"}}>
        <label >Fin de evento</label>
          <input
            id="datetime-finaliza"
        required      
        type="datetime-local"
        defaultValue={inicioEventoMin}
        min = {inicioEvento}
        onChange={handleFechaFin}
           
          />
           </Box>


             <Box>
        <label >Inicio de evento </label>
        <input
        id="datetime-inicia"
        required
        type="datetime-local"
        defaultValue={inicioEventoMin}
        min = {inicioEventoMin}  
        max = {finEvento}     
        onChange={handleFechaInicio}
     
        
              />
            </Box>

           

          </Box>
 
 

            <TextField
            required
            margin="dense"
            id="anio"
            //value ={descripcion}
            label="Nombre"
            type="string"
            fullWidth
            variant="standard"
            onChange={(v) => setNameEvent(v.target.value)}
            
         
            
          />
          <TextField
            required
            margin="dense"
            id="anio"
            //value ={descripcion}
             label ="Descripcion"
            type="string"
            fullWidth
            variant="standard"
            onChange={(v) => setDescripcion(v.target.value)}
         
           
          />


            <Box  sx={{ bgcolor: 'rgb(255, 255, 255)',width: '100%', display: 'flex', flexDirection: 'row-reverse',}}>
            <Button onClick={() => handleUpload() } >Guardar</Button>
            <Button onClick={() => testeoVariables() } >test</Button>
            <Button onClick={() => handleClose()}  >Cancelar</Button>
            </Box>


  </Box>
  
  : 

  <Container maxWidth="sm">


     <Box  >
        <Box >
        <img id="imagen" src={image} style={{ width: '100%' ,height: '100%' ,objectFit:"scale-down" }}/>
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

                <Button onClick={() => handleClose() }>Cerrar</Button>
                </Box>           
    </Box>
    </Container>
 } 


    </Dialog>
  
  );
};




export default EventosModal;

