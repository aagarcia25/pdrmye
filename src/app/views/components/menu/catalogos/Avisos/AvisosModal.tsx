
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
  Container,
  IconButton,
  FormLabel,
  Link,
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";

import imagenGenerica from '../../../../../../app/assets/img/archivoImagen.jpg'
import { url } from "inspector";
import "../../../../../styles/globals.css";
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
  ////////////////////////////
  const [cleanUp, setCleanUp] = useState<boolean>(false);
  const [previewDoc, setPreviewDoc] = useState<string>();

  var hoy = new Date()
  var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
  var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
  var Fecha_min = fecha + 'T' + hora;
  const [inicioEventoMin, setInicioEventoMin] = useState(Fecha_min);
  const [inicioEvento, setInicioEvento] = useState("")
  const [finEvento, setFinEvento] = useState("");
  const [finEventoMax, setFinEventoMax] = useState("2100-09-30 13:16:00");
  const [descripcion, setDescripcion] = useState("");
  const [nameAviso, setNameAviso] = useState("");
  const [editDoc, setEditDoc] = useState<boolean>(false);
  const [nameNewDoc, setNameNewDoc] = useState("");
  const [newDoc, setNewDoc] = useState(Object);
  const [NewDocPreview, setNewDocPreviw] = useState<File>();
  const [modoModal, setModoModal] = useState(modo);
  const [urlDoc, setUrlDoc] = useState("");


  ////////////////////////////
  
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


  const handleUpload = () => {

    setslideropen(true);

    const formData = new FormData();
    (editDoc)?formData.append("DOCUMENTO", newDoc, nameNewDoc):formData.append("DOCUMENTO",""); 
    formData.append("NUMOPERACION", String(tipo));
    formData.append("CHID", id);
    formData.append("NOMBRE", nameAviso);
    formData.append("DESCRIPCION", descripcion);
    formData.append("FECHAINICIO", inicioEvento);
    formData.append("FECHAFIN", finEvento);
    formData.append("CHUSER", "1");


    console.log(formData);
    console.log("nombre extraido de imagen name   " + nameNewDoc);

    CatalogosServices.avisos(formData).then((res) => {
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
   
    handleClose();
  };

  const testeoVariables = () => {
    console.log("inicio de evento   " + inicioEvento);
    console.log("fin de evento   " + finEvento);
    console.log("noombre de evento    " + nameAviso);
    console.log("detalles de evento   " + descripcion);
    console.log("url doc    " + urlDoc.length);
    console.log("nombree  "+  urlDoc);
 
    console.log("fecha de hoy   "+ Fecha_min);
    console.log("numero de operacion  "+tipo);
    console.log("testeo de dt  "+ dt?.row );

   

  }
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

  const handleFechaInicio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInicioEvento(event.target.value.toString());
  };

  const handleFechaFin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinEvento(event.target.value.toString());
  };




  const handleNewFile = (event: any) => {

    let file = event.target!.files[0]!;
    ///// SE VALIDA SI NO SE CARGO ARCHIVO EN EL INPUT PARA PODER EXTRAER EL NOMBRE
    if (event.target.files.length === 0) {
    } else {
      setNameNewDoc(event.target!.files[0]!.name);
    }

    console.log(event.target);

    /////////////////////////////

    if (file && file.type.substr(0, 5) === "image") {

      setNewDocPreviw(file);
      setCleanUp(true);
      setEditDoc(true);
      setNewDoc(null);

    }    /////////////////////////

    setNewDoc(file);
    console.log(newDoc)

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
        setIdMunicipio(dt?.row?.idmunicipio)
        setUrlDoc(dt?.row?.Documento)
        setFinEvento(dt?.row?.FechaFin)
        setInicioEvento(dt?.row?.fechaInicio)
        setNameAviso (dt?.row?.Nombre)
        setDescripcion(dt?.row?.Descripcion)

      
        console.log(dt)


   
    }
    
   console.log(dt)
  }, [dt] );



  return (
    <Dialog open={open}>
      <DialogTitle>{modoModal}</DialogTitle>


      {(modoModal==="Agregar Aviso")?
      <Container maxWidth="sm" >
        <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', }}>

          {
            //////////empiezan debajo del titulo

            //// imagen carga y previsualizacion
          }
          <Box sx={{ width: '100%', }}>

            <Box sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}>
              <Box   sx={{display: 'flex', width: '100%', justifyContent: 'center', }}>
              {(cleanUp) ?
                  <Box 
                    >
                    <img src={previewDoc} style={{ objectFit: "scale-down", width: '100%', }} />
                  </Box>
                  : ""}    
                <FormLabel focused>{"DOCUMENTO:  " +nameNewDoc}</FormLabel>

              </Box>
              <Box>
                  <IconButton aria-label="upload picture" component="label" size="large" >
                    <input
                      required
                      type="file"
                      hidden
                      onChange={(event) => {
                        handleNewFile(event)
                      }} />
                    <UploadFileIcon />
                  </IconButton>
                </Box> 
            </Box>

          </Box>

          {
            //////////

            //// inicio y fin de evento
          }
          <Box sx={{           
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}>

            <Box  sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            p: 1,
            m: 1,}}>
              <Box>

                <Box sx={{ justifyContent: 'center', display: 'flex', }} >
                  <FormLabel focused>Inicio </FormLabel>
                </Box>

                <Box>
                  <input
                    id="datetime-local"
                    required
                    type="datetime-local"
                    defaultValue={inicioEventoMin}
                    min={inicioEventoMin}
                    max={finEventoMax}
                    onChange={handleFechaInicio}
                  />

                </Box>
              </Box>
          
              <Box sx={{ justifyContent: 'center', }}>
                <Box>
                  <Box sx={{ justifyContent: 'center', display: 'flex', }} >
                  <FormLabel focused>Fin</FormLabel>
                  </Box>
                  <Box>
                    <input
                      id="datetime-finaliza"
                      required
                      type="datetime-local"
                      min={inicioEvento}
                      onChange={handleFechaFin}
                    />
                  </Box>

                </Box>

              </Box>            
            </Box>
          </Box>
          {
            //////////

            //// añadir nombre y descripcion
          }
          <Box>

         
          <FormLabel focused>Nombre</FormLabel>
                <TextField
                  required
                  multiline
                  margin="dense"
                  id="anio"
                  //value nombre de evento
                 
                  type="string"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNameAviso(v.target.value)}
                  error={nameAviso == "" ? true : false}
                />
                 <FormLabel focused>Descripcion</FormLabel>
                <TextField
                  multiline
                  required
                  margin="dense"
                  id="anio"
                  
                  type="string"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setDescripcion(v.target.value)}
                  error={descripcion == "" ? true : false}

                />
              </Box>

              <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>
               
              <button  className="button cerrar" onClick={() => handleClose()}  >Cerrar</button>
               <button className= "guardar" onClick={() => handleUpload()} >Guardar</button>
          
          
               
              </Box>


        </Box>
        </Container>
    :  
    ""  }  


    {(modoModal === "Aviso") ?

        <Container maxWidth="sm" >
          
          <Box >

            <Box >

       {(urlDoc.slice(-4)===".pdf"||urlDoc.slice(-4)===".PDF")?
              
        <iframe id="inlineFrameExample"
            title="Inline Frame Example"
            width="500"
           height="350"
          src ={urlDoc} 
          />      
          
          : ""}

            {(urlDoc.slice(-4)===".bpm"||urlDoc.slice(-4)===".BPM"||
            urlDoc.slice(-4)===".jpg"||urlDoc.slice(-4)===".JPG"||urlDoc.slice(-4)===".png"||urlDoc.slice(-4)===".PNG")?
              
              <iframe id="inlineFrameExample"
                  title="Inline Frame Example"
                  width="500"
                 height="350"
                src ={urlDoc} 
                style={{ width: '100%', height: '100%', objectFit: "scale-down" }}
                >
                  
             
            <form action={urlDoc}>
              <input className="Descargar" type="submit" value="Descargar" />

              </form>
               
                </iframe>   
                
                : ""}

          
          <Box>
           
          <Box sx={{width: "500px", display: 'flex', justifyContent: 'center'}}>
          <img id="imagen" src={imagenGenerica} style={{ objectFit: "scale-down" }} />
        
          </Box> 
          </Box>
                            
           

           </Box>


            <Box>
            <Link href={urlDoc} target="_blank" rel="noopener">
              Download Label
            </Link>
              </Box>

            <Box>
            <Box
             sx={{ bgcolor: 'rgb(222, 225, 225)', borderRadius:'5px'}}>
              <h4>Nombre</h4>  
            </Box>

            <FormLabel
             focused
             filled             
             >                        
            {nameAviso}
            </FormLabel>

            <Box
             sx={{ bgcolor: 'rgb(222, 225, 225)', borderRadius:'5px'}}>
              <h4>Descripcion</h4>  
            </Box>              
            <FormLabel
             focused
             filled           
             >                     
            {descripcion}
            </FormLabel>           
            </Box>

            <Box 
            sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            p: 1,
            m: 1,}}>

            <FormLabel
             focused
             filled
             sx={{ bgcolor: 'rgb(222, 225, 225)', borderRadius:'5px' }}
         
             >
             <h3>Inicio</h3>            
            {inicioEvento}           
            
            </FormLabel>

             <FormLabel
             focused
             filled
             sx={{ bgcolor: 'rgb(222, 225, 225)', borderRadius:'5px' }}
             >
             <h3>Fin</h3>            
            {finEvento}
            </FormLabel>
          
            </Box>


            <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>

              <button  className= "cerrar" onClick={() => handleClose()}>Cerrar</button>
              <button  className= "cerrar" onClick={() => testeoVariables()}>test</button>
              <button className= "editar" onClick={() => setModoModal("Editar")}>Editar</button>
        
            </Box>
          </Box>
        </Container>
        : ""
      }

{(modoModal === "Editar") ?

///// editar evento hora inicio fin y foto        

(Date.parse(inicioEventoMin) >= Date.parse(inicioEvento)) ?

////// SI EL EVENTO YA INICIO NO DEJA EDITARLO
<Container maxWidth="sm" >
   
  <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'column', }}>

    <Box>

      <TextField
        margin="dense"
        multiline
        value=" El evento ya Inicio y/o Finalizo"
        type="string"
        fullWidth
        variant="outlined"
        color="warning"
        focused
        InputProps={{
          readOnly: true,
        }} />
    </Box>
    <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }} >
      <button className="cerrar" onClick={() => handleClose()}  >Cerrar</button>
    
    </Box>
  </Box>
   </Container>
  :
  /////   EDITAR EVENTO SI ESTE AUN NO FINALIZA Y/O INICIA
  <Container maxWidth="sm">
  
    {/// input de infomacion 
    }
   
       <Box>
        <img id="imagen" src={imagenGenerica} style={{ width: '350px', height: '100%', objectFit: "scale-down" }} />
      </Box>
  
     <Box>
      <IconButton aria-label="upload picture" component="label" size="large">
        <input
          required                  
          type="file"
          hidden
          onChange={(event) => {
            handleNewFile(event)
          }} />
        <UploadFileIcon />
      </IconButton>
    </Box>

    <Box>
    <Box
     sx={{ bgcolor: 'rgb(222, 225, 225)'}}>
      <h4>Nombre</h4>  
    </Box>

      <TextField
          required
          multiline
          defaultValue={nameAviso}
          margin="dense"
          id="anio"
          type="string"
          fullWidth
          variant="standard"
          onChange={(v) => setNameAviso(v.target.value)}
          error={nameAviso == "" ? true : false}
        />

    <Box
     sx={{ bgcolor: 'rgb(222, 225, 225)'}}>
      <h4>Descripcion</h4>  
    </Box>              
    <TextField
          multiline
          required
          margin="dense"
          id="anio"
          defaultValue={descripcion}
          type="string"
          fullWidth
          variant="standard"
          onChange={(v) => setDescripcion(v.target.value)}
          error={descripcion == "" ? true : false}

        />          
    </Box>


    <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
    p: 1,
    m: 1,}}>
      <Box sx={{ justifyContent: 'center', }}>

        <Box  >
          <label>Inicio de evento </label>
        </Box>


        <Box>


          <input
            id="datetime-inicia"
            required
            type="datetime-local"
            defaultValue={inicioEvento}
            min={inicioEventoMin}
            max={finEvento}
            onChange={handleFechaInicio}
          />


        </Box>

      </Box >

      <Box sx={{ justifyContent: 'center', }}>

        <Box>
          <label >Fin de evento</label>
        </Box>

        <Box>
          <input
            id="datetime-local"
            required
            type="datetime-local"
            defaultValue={finEvento}
            
            onChange={handleFechaFin}
          />
        </Box>

      </Box>

    </Box>

   

    {////// botones 
    }

    <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>
      <button className="cerrar" onClick={() => handleClose()}  >Cerrar</button>
      <button className= "guardar" onClick={() => handleUpload()} >Guardar</button>

      

    </Box>
  
    </Container>

//////////evento finalizado                     
: ""}

    </Dialog>
    
   

  );
};

export default AvisosModal;
