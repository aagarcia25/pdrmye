
import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Button,
  IconButton,
  Input,
  Container,
  Tooltip,
  FormLabel,
} from "@mui/material";
import { porcentage } from '../../CustomToolbar'
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";
import { FullscreenExitSharp, Label, PhotoCamera } from "@mui/icons-material";
import { devNull } from "os";
import { style } from "@mui/system";
import "../Eventos/globals.css";
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { eventNames } from "process";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { toDate } from "date-fns/esm";
import { TransitionProps } from "@mui/material/transitions";


const EventosModal = ({
  open,
  modo,
  handleClose,
  tipo,
  handleEditar,
  dt
}: {

  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function,
  handleEditar: Function;
  dt: any
}) => {

  //////// trassicion
 
  // CAMPOS DE LOS FORMULARIOS
 
  const today = new Date().toISOString();
  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [description, setDescription] = useState("");
  const [nameNewImage, setNameNewImage] = useState("");
  const [newNameEvent, setNewNameEvent] = useState("");
  const [nameEvent, setNameEvent] = useState("");
  const [newImage, setNewImage] = useState(Object);
  const [finEvento, setFinEvento] = useState("");
  const [image, setImage] = useState("");
  const [modoModal, setModoModal] = useState(modo);
  const [slideropen, setslideropen] = useState(false);
  const [IdMunicipio, setIdMunicipio] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();
  var hoy = new Date()
  var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
  var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
  var Fecha_min = fecha + 'T' + hora;
  const [editarInicioEvent, setEditarInicioEvento] = useState("");
  const [editarFinEvento, setEditarFinEvento] = useState("");
  const [inicioEventoMin, setInicioEventoMin] = useState(Fecha_min);
  const [inicioEvento, setInicioEvento] = useState(Fecha_min)

  const [errorEmpty, setErrorEmpty] = React.useState('');
  ////////////////////////////////
  const [preview, setPreview] = useState<string>();
  const [NewImagePreview, setNewImagePreviw] = useState<File>();
  const [cleanUp, setCleanUp] = useState<boolean>(false);
  const [editImage, setEditImage] = useState<boolean>(false);

  ///setInicioEvento (inicioEventoMin);

  //////////////////////////////////


  const testeoVariables = () => {
    console.log("inicio de evento seteado    " + inicioEvento)
    console.log("fin de evento   " + finEvento)
    console.log("det    " + dt)
    console.log("fecha y hora  minimo     " + inicioEventoMin);
    console.log("carga de imagen   " + newImage)
    console.log("nombre de imagen para cargar     " + nameNewImage)
    console.log("nombre   " + newNameEvent)
    console.log("DEscripcion  " + descripcion)
    console.log("DEscription  " + description)
    console.log("error de empty     " + errorEmpty)
    console.log("fecha de inicio evento minimo convertida  " + Date.parse(inicioEventoMin) + " sin convertir  " + inicioEventoMin)
    console.log("fecha de inicio evento " + Date.parse(editarInicioEvent) + "   sin convertir " + editarInicioEvent)

    console.log("inicio de evento al editar  " + editarInicioEvent)
    console.log("fin de evento al editar     " + String(editarFinEvento))

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
    formData.append("NUMOPERACION", String(tipo));
    formData.append("CHID", "");
    formData.append("NOMBRE", newNameEvent);
    formData.append("DESCRIPCION", description);
    formData.append("FECHAINICIO", inicioEvento);
    formData.append("FECHAFIN", finEvento);
    formData.append("CHUSER", "1");


    console.log(formData);
    console.log("nombre extraido de imagen name   " + nameNewImage);

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

    console.log(event.target);

    /////////////////////////////

    if (file && file.type.substr(0, 5) === "image") {

      setNewImagePreviw(file);
      setCleanUp(true);
      setEditImage(true);
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
  const handleSend = () => {
    if (nameEvent === "" || descripcion === "") {
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
        NOMBRE: newNameEvent,
        DESCRIPCION: description,
        IMAGEN: newImage,
        FECHAINICIO: inicioEvento,
        FECHAFIN: finEvento,

      };

      handleRequest(data);
      handleClose();
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
      console.log(dt)

    } else {
      setId(dt?.row?.id)
      setDescripcion(dt?.row?.Descripcion)
      setImage(dt?.row?.Imagen)
      setIdMunicipio(dt?.row?.idmunicipio)
      setNameEvent(dt?.row?.Nombre)
      setEditarInicioEvento(dt?.row?.FechaInicio)
      setEditarFinEvento(dt?.row?.FechaFin)
    }

  }, [dt]);

  useEffect(() => {
    if (NewImagePreview) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(NewImagePreview!);
    }
    else {
      setPreview("o");
    }
  }, [NewImagePreview]);


  return (


    <Dialog 
    open={open}  
    
    >

<Container maxWidth="sm" >
      <Box sx={{ bgcolor: 'rgb(222, 225, 225)', display: 'flex', justifyContent: 'center', }}>
        {/// se setea el modo del modal para ver el tipo de el evento
        }

        <DialogTitle>{modo}</DialogTitle>

      </Box>

      {(modoModal === "Agregar Evento") ?
      <Container maxWidth="sm" >
        <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', }}>

          {
            //////////empiezan debajo del titulo

            //// imagen carga y previsualizacion
          }
          <Box sx={{ width: '100%', flexDirection: 'column', }}>

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
              <Box>
              {(cleanUp) ?
                  <Box>
                    <img src={preview} className="rounded-corners" style={{ objectFit: "scale-down", width: '100%', }} />
                  </Box>
                  : ""}
                <Box>
                  <IconButton aria-label="upload picture" component="label">
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
                  <label>Inicio de evento </label>
                </Box>

                <Box>
                  <input
                    id="datetime-local"
                    required
                    type="datetime-local"
                    defaultValue={inicioEventoMin}
                    min={inicioEventoMin}
                    max={finEvento}
                    onChange={handleFechaInicio}
                  />

                </Box>
              </Box>
              <Box>  {"  " }</Box>
              <Box sx={{ justifyContent: 'center', }}>
                <Box>
                  <Box sx={{ justifyContent: 'center', display: 'flex', }} >
                    <label >Fin de evento</label>
                  </Box>
                  <Box>
                    <input
                      id="datetime-finaliza"
                      required
                      type="datetime-local"
                      defaultValue={inicioEventoMin}
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

         

                <TextField
                  required
                  multiline
                  margin="dense"
                  id="anio"
                  //value nombre de evento
                  label="Nombre"
                  type="string"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNewNameEvent(v.target.value)}
                  error={newNameEvent == "" ? true : false}



                />
                <TextField
                  multiline
                  required
                  margin="dense"
                  id="anio"
                  //value ={descripcion}
                  label="Descripcion"
                  type="string"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setDescription(v.target.value)}
                  error={description == "" ? true : false}

                />
              </Box>

              <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>
                <Button onClick={() => handleUpload()} >Guardar</Button>
                <Button onClick={() => handleClose()}  >Cerrar</Button>
              </Box>


        </Box>
        </Container>
        : ""}

      {(modoModal === "Evento") ?
        <Container maxWidth="sm" >
          <Box  >

            <Box >
              <img id="imagen" src={image} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
            </Box>

            <Box>


            <FormLabel
             focused
             filled
             >
             <h4>Nombre</h4>            
            {nameEvent}
            </FormLabel>
              
            <FormLabel
             focused
             filled
             >
             <h3>Descripcion</h3>            
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
             >
             <h3>Inicio</h3>            
            {editarInicioEvent}
            </FormLabel>

             <FormLabel
             focused
             filled
             >
             <h3>Inicio</h3>            
            {editarFinEvento}
            </FormLabel>
          
            </Box>


            <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>

              <Button onClick={() => handleClose()}>Cerrar</Button>
              <Button onClick={() => setModoModal("Editar")}>Editar</Button>
            </Box>
          </Box>
        </Container>
        : ""
      }

      {(modoModal === "Editar") ?


        ///// editar evento hora inicio fin y foto   


        (Date.parse(inicioEventoMin) >= Date.parse(editarInicioEvent)) ?
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
              <Button onClick={() => handleClose()}  >Cerrar</Button>

            </Box>
          </Box>
           </Container>
          :
          <Container maxWidth="sm">
          <Box>
            {/// input de infomacion 
            }
            <Box>
              <IconButton aria-label="upload picture" component="label">
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
            {(editImage) ?
              <Box>
                <img id="imagen" src={preview} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
              </Box>
              :
              <Box>
                <img id="imagen" src={image} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
              </Box>
            }


            <Box sx={{
              justifyContent: 'center',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}>
              <Box sx={{ justifyContent: 'center', }}>

                <Box  >
                  <label>Inicio de evento </label>
                </Box>


                <Box>


                  <input
                    id="datetime-inicia"
                    required
                    type="datetime-local"
                    defaultValue={editarInicioEvent}
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
                    defaultValue={editarFinEvento}
                    min={inicioEvento}
                    onChange={handleFechaFin}
                  />
                </Box>

              </Box>

            </Box>

            <Box>
              <Box>
                <TextField
                  margin="dense"
                  required
                  multiline
                  id="pob"
                  label="Nombre"
                  value={nameEvent}
                  type="string"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNameEvent(v.target.value)}
                  error={nameEvent == "" ? true : false}
                />
              </Box>


              <Box>
                <TextField
                  margin="dense"
                  required
                  id="pob"
                  label="Descripcion"
                  value={descripcion}
                  type="string"
                  fullWidth
                  multiline
                  variant="standard"
                  onChange={(v) => setDescripcion(v.target.value)}
                  error={descripcion == "" ? true : false}
                />
              </Box>
            </Box>

            {////// botones 
            }

            <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>
              <Button onClick={() => handleSend()} >Guardar</Button>
              <Button onClick={() => handleClose()}  >Cerrar</Button>

            </Box>
          </Box>
            </Container>

        //////////evento finalizado                     
        : ""}
</Container>
    </Dialog>

  );
};




export default EventosModal;

