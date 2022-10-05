
import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  IconButton,
  Container,
  FormLabel,
  } from "@mui/material";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";
import { Label, PhotoCamera, Preview } from "@mui/icons-material";
import "../../../../../styles/globals.css";


const EventosModal = ({
  open,
  modo,
  handleClose,
  tipo,
 
  dt
}: {

  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function,
  
  dt: any
}) => {

  //////// trassicion
 
  // CAMPOS DE LOS FORMULARIOS
 

  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [nameNewImage, setNameNewImage] = useState("");
  const [newImage, setNewImage] = useState(Object);
  const [nameEvent, setNameEvent] = useState("");
 
  const [finEventoMax, setFinEventoMax] = useState("2100-09-30 13:16:00");
  const [finEvento, setFinEvento] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [modoModal, setModoModal] = useState(modo);
  const [slideropen, setslideropen] = useState(false);
  const [IdMunicipio, setIdMunicipio] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();
  var hoy = new Date()
  var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
  var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
  var Fecha_min = fecha + 'T' + hora;
  const [inicioEventoMin, setInicioEventoMin] = useState(Fecha_min);
  const [inicioEvento, setInicioEvento] = useState("")

  ////////////////////////////////
  const [previewImage, setPreviewImage] = useState<string>();
  const [NewImagePreview, setNewImagePreviw] = useState<File>();
  const [cleanUp, setCleanUp] = useState<boolean>(false);
  const [editImage, setEditImage] = useState<boolean>(false);

  //setInicioEvento(Fecha_min);
  //////////////////////////////////


  const testeoVariables = () => {
    console.log("inicio de evento   " + inicioEvento)
    console.log("fin de evento   " + finEvento)
    console.log("noombre de evento    " + nameEvent)
    console.log("detalles de evento   " + descripcion);
    console.log("imagen   " + urlImage)
    console.log("nuevo usl de imagen   "+ previewImage)
    console.log("hoy   "+ hoy.getFullYear())
    console.log("fecha de hoy   "+ Fecha_min)
    console.log("numero de operacion  "+tipo)
   
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
    (editImage)?formData.append("IMAGEN", newImage, nameNewImage):formData.append("IMAGEN","");    
    formData.append("NUMOPERACION", String(tipo));
    formData.append("CHID", id);
    formData.append("NOMBRE", nameEvent);
    formData.append("DESCRIPCION", descripcion);
    formData.append("FECHAINICIO", inicioEvento);
    formData.append("FECHAFIN", finEvento);
    formData.append("CHUSER", "1");




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
   
    handleClose();
  };

  const handleFechaInicio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInicioEvento(event.target.value.toString());

  };
  const handleFechaFin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinEvento(event.target.value.toString());
  };
  const handleNewImage = (event: any) => {

    let file = event.target!.files[0]!;
    ///// SE VALIDA SI NO SE CARGO ARCHIVO EN EL INPUT PARA PODER EXTRAER EL NOMBRE
    if (event.target.files.length === 0) {
    } else {
      setNameNewImage(event.target!.files[0]!.name);
    }


    

    /////////////////////////////

    if (file && file.type.substr(0, 5) === "image") {

      setNewImagePreviw(file);
      setCleanUp(true);
      setEditImage(true);
      setNewImage(null);

    }    /////////////////////////

    setNewImage(file);
 

  };
  const handleRequest = (data: any) => {
   
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
    

    if (dt === '') {    

     } else {
      setId(dt?.row?.id)
      setDescripcion(dt?.row?.Descripcion)
      setUrlImage(dt?.row?.Imagen)
      setIdMunicipio(dt?.row?.idmunicipio)
      setNameEvent(dt?.row?.Nombre)
      setInicioEvento(dt?.row?.FechaInicio)
      setFinEvento(dt?.row?.FechaFin)

      
    }

  }, [dt]);

  useEffect(() => {
    if (NewImagePreview) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(NewImagePreview!);
    }
    else {
      setPreviewImage("o");
    }
  }, [NewImagePreview]);


  return (


    <Dialog 
    open={open}  
    
    >

<Container maxWidth="sm" >
      <Box sx={{ bgcolor: 'rgb(222, 225, 225)', display: 'flex', justifyContent: 'center', }}>

        {/// se setea el modo en modoModal para ver el tipo de el evento
        }

        <DialogTitle>{modoModal}</DialogTitle>

      </Box>

      {(modoModal === "Agregar Evento") ?
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
                    <img src={previewImage} style={{ objectFit: "scale-down", width: '100%', }} />
                  </Box>
                  : ""}                              
              </Box>
              <Box>
                  <IconButton aria-label="upload picture" component="label" size="large" >
                    <input
                      required
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(event) => {
                        handleNewImage(event)
                      }} />
                    <PhotoCamera />
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
                  type="string"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNameEvent(v.target.value)}
                  error={nameEvent == "" ? true : false}
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
        : ""}

      {(modoModal === "Evento") ?
        <Container maxWidth="sm" >
          <Box  >

            <Box >
              <img id="imagen" src={urlImage} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
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
            {"Nombre "+nameEvent}
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
                value=" El evento ya Inicio y/o Finalizo no se puede editar"
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
           
            {(editImage) ?
              <Box>
                <img id="imagen" src={previewImage} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
              </Box>
              : 
              <Box>
                <img id="imagen" src={urlImage} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
              </Box>
            }
             <Box>
              <IconButton aria-label="upload picture" component="label" size="large">
                <input
                  required                  
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(event) => {
                    handleNewImage(event)
                  }} />
                <PhotoCamera />
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
                  defaultValue={nameEvent}
                  margin="dense"
                  id="anio"
                  type="string"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNameEvent(v.target.value)}
                  error={nameEvent == "" ? true : false}
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
                    min={inicioEvento}
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
</Container>
    </Dialog>

  );
};

export default EventosModal;

