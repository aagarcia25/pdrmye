
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Container,
  IconButton,
 
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, getPU, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";

import imagenGenerica from '../../../../../../app/assets/img/archivoImagen.jpg'
import PdfLogo from '../../../../../../app/assets/img/PDF_file_icon.svg'
import PptxLogo from '../../../../../../app/assets/img/pptx_Logo.png'
import xlsxLogo from '../../../../../../app/assets/img/xlsx_Logo.png'
import docxLogo from '../../../../../../app/assets/img/docx_Logo.png'
import "../../../../../styles/globals.css";
import { UserReponse } from "../../../../../interfaces/user/UserReponse";
const AvisosModal = ({
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
  const [inicioEvento, setInicioEvento] = useState(inicioEventoMin);
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
  const [nameDocDownload, setNameDocDownload] = useState("");
  ////////////////////////////
  const [slideropen, setslideropen] = useState(false)
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [Avisos, setAvisos] = useState("");
  const [IdMunicipio, setIdMunicipio] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();
  const user: UserReponse = JSON.parse(String(getPU()));

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
    (editDoc) ? formData.append("DOCUMENTO", newDoc, nameNewDoc) : formData.append("DOCUMENTO", "");
    formData.append("NUMOPERACION", String(tipo));
    formData.append("CHID", id);
    formData.append("NOMBRE", nameAviso);
    formData.append("DESCRIPCION", descripcion);
    formData.append("FECHAINICIO", inicioEvento);
    formData.append("FECHAFIN", finEvento);
    formData.append("CHUSER", String(user.IdUsuario));

    CatalogosServices.avisos(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        }
        
        
        );
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }

    });
    handleClose("save");
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
      setEditDoc(true);
    }
    /////////////////////////////
    if (file && file.type.substr(0, 5) === "image") {
      setNewDocPreviw(file);
      setCleanUp(true);
      setEditDoc(true);
      setNewDoc(null);
    }    /////////////////////////
    setNewDoc(file);

  };
  const testeoVariables = () => {
    console.log("inicio de evento   " + inicioEvento);
    //console.log("fin de evento   " + finEvento);
    //console.log("noombre de evento    " + nameAviso);
   console.log("modo   " + modoModal);
    console.log("nameDocDownload   " + nameDocDownload); 
    console.log("SE AÑADE DOCUMENTO   " + editDoc);
    console.log("url doc total caracteres    " + urlDoc.length);
    console.log("url doc en string1  " + urlDoc);
    console.log("url doc en string 2    " + urlDoc.search("AVISOS"));
    console.log("url doc en string  3  " + urlDoc.slice((urlDoc.search("AVISOS") + 7), urlDoc.length));
    console.log("nombre de descarga archivo  " + nameDocDownload)

  }

  useEffect(() => {
 
    municipiosc();
    if (dt === '') {    
    } else {
      setId(dt?.row?.id);
      setIdMunicipio(dt?.row?.idmunicipio);
      setUrlDoc(dt?.row?.Documento);
      setFinEvento(dt?.row?.FechaFin);
      setInicioEvento(dt?.row?.fechaInicio);
      setNameAviso(dt?.row?.Nombre);
      setDescripcion(dt?.row?.Descripcion);
      setNameDocDownload(dt?.row?.NombreDocumento)
    }
  }, [dt]);

  ////previsualizar imagen
  useEffect(() => {
    if (NewDocPreview) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewDoc(reader.result as string);
      };
      reader.readAsDataURL(NewDocPreview!);
    }
    else {
      setPreviewDoc("o");
    }
  }, [NewDocPreview]);


  return (
    <Dialog open={open} keepMounted>
   


      {(modoModal === "Agregar Aviso") ?
        <Container maxWidth="sm" >
          <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', }}>
          <Box
          sx={{ display: 'flex', justifyContent: 'center',}}>
            <label className="Titulo">{modoModal}</label>
          </Box>

            { //////////empiezan debajo del titulo
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
                {/////  mostrar logo y nombre de el archivo a cargar
                }
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', }}>
                  {(nameNewDoc.slice(-4) === ".bpm" || nameNewDoc.slice(-4) === ".BPM" ||
                    nameNewDoc.slice(-4) === ".jpg" || nameNewDoc.slice(-4) === ".JPG" || nameNewDoc.slice(-4) === ".png" || nameNewDoc.slice(-4) === ".PNG") ?
                    <Box>
                      <img src={previewDoc} style={{ objectFit: "scale-down", width: '100%', }} />
                    </Box>
                    : (nameNewDoc.slice(-4) === ".pdf" || nameNewDoc.slice(-4) === ".PDF") ?

                      <Box>
                        <img src={PdfLogo} style={{ objectFit: "scale-down", width: '100%', }} />
                      </Box>

                      : (nameNewDoc.slice(-5) === ".pptx" || nameNewDoc.slice(-5) === ".PPTX") ?

                        <Box>
                          <img src={PptxLogo} style={{ objectFit: "scale-down", width: '100%', }} />
                        </Box>

                        : (nameNewDoc.slice(-5) === ".xlsx" || nameNewDoc.slice(-5) === ".XLSX" || nameNewDoc.slice(-4) === ".xls" || nameNewDoc.slice(-4) === ".XLS") ?

                          <Box>
                            <img src={xlsxLogo} style={{ objectFit: "scale-down", width: '100%', }} />
                          </Box>

                          : (nameNewDoc.slice(-5) === ".docx" || nameNewDoc.slice(-5) === ".DOCX" || nameNewDoc.slice(-4) === ".doc" || nameNewDoc.slice(-4) === ".DOC") ?

                            <Box>
                              <img src={docxLogo} style={{ objectFit: "scale-down", width: '100%', }} />
                            </Box>

                            : <Box>
                              <img src={imagenGenerica} style={{ objectFit: "scale-down", width: '100%', }} />
                            </Box>}

                  <Box>
                    <label >{nameNewDoc}</label>
                  </Box>
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
            <Box>


              <label >Nombre</label>
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
              <label >Descripcion</label>
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

              <button className="button cerrar" onClick={() => handleClose()}  >Cerrar</button>
              <button className="guardar" onClick={() => handleUpload()} >Guardar</button>
             

            </Box>

          </Box>
        </Container>
        :
        ""}



      {(modoModal === "Aviso") ?

        <Container maxWidth="sm" >

          <Box >

            <Box >

              {(urlDoc.slice(-4) === ".pdf" || urlDoc.slice(-4) === ".PDF") ?

                <iframe id="inlineFrameExample"
                  title="Inline Frame Example"
                  width="500"
                  height="350"
                  src={urlDoc}
                />

                : (urlDoc.slice(-4) === ".bpm" || urlDoc.slice(-4) === ".BPM" ||
                  urlDoc.slice(-4) === ".jpg" || urlDoc.slice(-4) === ".JPG" || urlDoc.slice(-4) === ".png" || urlDoc.slice(-4) === ".PNG") ?
                  <Box>
                    <img id="imagen" src={urlDoc} style={{ objectFit: "scale-down" }} />
                  </Box>

                  : (urlDoc.slice(-5) === ".pptx" || urlDoc.slice(-5) === ".PPTX") ?

                    <Box>
                      <img src={PptxLogo} style={{ objectFit: "scale-down", width: '100%', }} />
                    </Box>
                    : (urlDoc.slice(-5) === ".xlsx" || urlDoc.slice(-5) === ".XLSX" || urlDoc.slice(-4) === ".xls" || urlDoc.slice(-4) === ".XLS") ?

                      <Box>
                        <img src={xlsxLogo} style={{ objectFit: "scale-down", width: '100%', }} />
                      </Box>

                      : (urlDoc.slice(-5) === ".docx" || urlDoc.slice(-5) === ".DOCX" || urlDoc.slice(-4) === ".doc" || urlDoc.slice(-4) === ".DOC") ?

                        <Box>
                          <img src={docxLogo} style={{ objectFit: "scale-down", width: '100%', }} />
                        </Box>

                        : <Box>
                          <img src={imagenGenerica} style={{ objectFit: "scale-down", width: '100%', }} />
                        </Box>


              }

            </Box>


            <Box>
              <Box>
                <label >
                  {nameDocDownload}
                </label>

              </Box>
              {(urlDoc.slice(-4) === ".pdf" || urlDoc.slice(-4) === ".PDF" || urlDoc.slice(-4) === ".bpm" || urlDoc.slice(-4) === ".BPM" ||
                urlDoc.slice(-4) === ".jpg" || urlDoc.slice(-4) === ".JPG" || urlDoc.slice(-4) === ".png" || urlDoc.slice(-4) === ".PNG") ?
                <Box>
                  <button >
                    <a href={urlDoc} target="_blank" download={nameDocDownload}>
                      Ver
                    </a>

                  </button>
                </Box>
                :
                <Box>
                  <button >
                    <a href={urlDoc} target="_blank" download={nameDocDownload}>
                      Descargar
                    </a>

                  </button>
                </Box>

              }


            </Box>

            <Box>
              <Box
                sx={{ bgcolor: 'rgb(222, 225, 225)', borderRadius: '5px' }}>
                <h4>Nombre</h4>
              </Box>

              <label >
                {nameAviso}
              </label>

              <Box
                sx={{ bgcolor: 'rgb(222, 225, 225)', borderRadius: '5px' }}>
                <h4>Descripcion</h4>
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

              <label >
                <h3>Inicio</h3>
                {inicioEvento}

              </label>

              <label>
                <h3>Fin</h3>
                {finEvento}
              </label>

            </Box>


            <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>

              <button className="cerrar" onClick={() => handleClose()}>Cerrar</button>
              <button className="editar" onClick={() => setModoModal("Editar")}>Editar</button>

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
                <label >
                {(nameNewDoc)? nameNewDoc: nameDocDownload}
                </label>

              </Box>

            <Box>
              <Box
                sx={{ bgcolor: 'rgb(222, 225, 225)' }}>
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
                sx={{ bgcolor: 'rgb(222, 225, 225)' }}>
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

                    onChange={handleFechaFin}
                  />
                </Box>

              </Box>

            </Box>



            {////// botones 
            }

            <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', display: 'flex', flexDirection: 'row-reverse', }}>
              <button className="cerrar" onClick={() => handleClose()}  >Cerrar</button>            
              <button className="guardar" onClick={() => handleUpload()} >Guardar</button>



            </Box>

          </Container>

        //////////evento finalizado                     
        : ""}

    </Dialog>



  );
};

export default AvisosModal;
