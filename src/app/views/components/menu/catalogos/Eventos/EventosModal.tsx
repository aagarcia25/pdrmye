
import React, { useEffect, useState } from "react";
import {
  Dialog,
  Box,
  TextField,
  IconButton,
  Container,

} from "@mui/material";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, getPermisos, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";
import { PhotoCamera } from "@mui/icons-material";
import { PERMISO } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";


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


  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nameNewImage, setNameNewImage] = useState("");
  const [newImage, setNewImage] = useState(Object);
  const [nameEvent, setNameEvent] = useState("");
  const [edit, setEditar] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
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
  const [previewImage, setPreviewImage] = useState<string>();
  const [NewImagePreview, setNewImagePreviw] = useState<File>();
  const [cleanUp, setCleanUp] = useState<boolean>(false);
  const [editImage, setEditImage] = useState<boolean>(false);

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
    (editImage) ? formData.append("IMAGEN", newImage, nameNewImage) : formData.append("IMAGEN", "");
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
        AlertS.fire({
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
    if (event.target.files.length === 0) {
    } else {
      setNameNewImage(event.target!.files[0]!.name);
    }


    if (file && file.type.substr(0, 5) === "image") {

      setNewImagePreviw(file);
      setCleanUp(true);
      setEditImage(true);
      setNewImage(null);

    }    

    setNewImage(file);
  };
  const handleRequest = (data: any) => {

    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
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
        AlertS.fire({
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
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "EVENTOS") {
        //console.log(item)
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
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
        <Box sx={{ display: 'flex', justifyContent: 'center', }}>

          <label className="Titulo">{modoModal}</label>

        </Box>

        
        <ModalForm title={modoModal} handleClose={handleClose}>
          {(modoModal === "Agregar Evento") ?

            <Box boxShadow={3} padding="1%">
            <Container  maxWidth="sm" >
              <Box sx={{  width: '100%' }}>

                {
                  //////////empiezan debajo del titulo

                  //// imagen carga y previsualizacion
                }
                <Box  sx={{ width: '100%' }}>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 0,
                  }}>
                    <Box   sx={{ display: 'flex', width: '100%', justifyContent: 'center', }}>
                      {(cleanUp) ?
                        <Box 
                        >
                          <img src={previewImage} style={{ objectFit: "scale-down", width: '100%', borderRadius:"0"}} />
                        </Box>
                        : ""}
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', }}>
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

                  <Box sx={{
                    bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                  }}>
                    <Box>

                      <Box sx={{ justifyContent: 'center', display: 'flex', }} >
                        <label >Inicio </label>
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
                          <label >Fin</label>
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
                <Box paddingBottom={3}>


                  <label >Nombre</label>
                  <TextField
                    required
                    multiline
                    margin="dense"
                    type="string"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setNameEvent(v.target.value)}
                    error={nameEvent === "" ? true : false}
                  />
                  <label
                  >Descripción</label>
                  <TextField
                    multiline
                    required
                    margin="dense"
                    id="anio"

                    type="string"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setDescripcion(v.target.value)}
                    error={descripcion === "" ? true : false}

                  />
                </Box>

                <Box  paddingBottom={2} sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>

                  <button className="guardar" onClick={() => handleUpload()} >Guardar</button>



                </Box>


              </Box>
            </Container>
            </Box>
            : ""}

          {(modoModal === "Evento") ?
          <Box boxShadow={3} padding={2}> 
            <Container maxWidth="sm" >
              <Box >

                <Box >
                  <img id="imagen" src={urlImage} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
                </Box>

                <Box>
                  <Box
                    sx={{ bgcolor: 'rgb(222, 225, 225)', borderRadius: '0px', textAlign:"center" }}>
                    <h4>Nombre</h4>
                  </Box>

                  <label>
                    {"Nombre " + nameEvent}
                  </label>

                  <Box
                    sx={{ bgcolor: 'rgb(222, 225, 225)', borderRadius: '0px', textAlign:"center"  }}>
                    <h4>Descripción</h4>
                  </Box>
                  <label>
                    {descripcion}
                  </label>
                </Box>

                <Box
                  sx={{
                    bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                  }}>

                  <label>
                    <h3>Inicio</h3>
                    {inicioEvento}

                  </label>

                  <label  >
                    <h3>Fin</h3>
                    {finEvento}
                  </label>

                </Box>


                <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>

                  {edit ? <button className="editar" onClick={() => setModoModal("Editar")}> Editar </button>
                    : ""}
                </Box>
              </Box>
            </Container>
            </Box>
            : ""
          }

          {(modoModal === "Editar") ?

            ///// editar evento hora inicio fin y foto        

            (Date.parse(inicioEventoMin) >= Date.parse(inicioEvento)) ?

              ////// SI EL EVENTO YA INICIO NO DEJA EDITARLO
              <Box> 
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

                  </Box>
                </Box>
              </Container>
              </Box>
              :
              /////   EDITAR EVENTO SI ESTE AUN NO FINALIZA Y/O INICIA
              <Container maxWidth="sm">

                {/// input de infomacion 
                }

                {(editImage) ?
                  <Box style={{ width: '80%', height: '80%'}}>
                    <img id="imagen" src={previewImage} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
                  </Box>
                  :
                  <Box  style={{ width: '80%', height: '80%'}}>
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
                    sx={{ bgcolor: 'rgb(222, 225, 225)' }}>
                    <label>Nombre</label>
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
                    error={nameEvent === "" ? true : false}
                  />

                  <Box
                    sx={{ bgcolor: 'rgb(222, 225, 225)' }}>
                    <label>Descripción</label>
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
                    error={descripcion === "" ? true : false}

                  />
                </Box>


                <Box sx={{
                  bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                  p: 1,
                  m: 1,
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

                <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                  <button className="guardar" onClick={() => handleUpload()} > Guardar </button>
                </Box>

              </Container>

            //////////evento finalizado                     
            : ""}
        </ModalForm>
      </Container>
    </Dialog>

  );
};

export default EventosModal;

