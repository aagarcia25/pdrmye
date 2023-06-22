import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PdfLogo from "../../../../../../app/assets/img/PDF_file_icon.svg";
import imagenGenerica from "../../../../../../app/assets/img/archivoImagen.jpg";
import docxLogo from "../../../../../../app/assets/img/docx_Logo.png";
import PptxLogo from "../../../../../../app/assets/img/pptx_Logo.png";
import xlsxLogo from "../../../../../../app/assets/img/xlsx_Logo.png";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import {
  getMunicipios,
  getPermisos,
  getToken,
  getUser,
  setMunicipios,
  validaLocalStorage,
} from "../../../../../services/localStorage";
import ModalForm from "../../../componentes/ModalForm";
import { ValidaSesion } from "../../../../../services/UserServices";
import { base64ToArrayBuffer } from "../../../../../helpers/Files";

const AvisosModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  ////////////////////////////
  const [cleanUp, setCleanUp] = useState<boolean>(false);
  const [previewDoc, setPreviewDoc] = useState<string>();
  var hoy = new Date();
  var fecha =
    hoy.getFullYear() +
    "-" +
    ("0" + (hoy.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + hoy.getDate()).slice(-2);
  var hora =
    ("0" + hoy.getHours()).slice(-2) + ":" + ("0" + hoy.getMinutes()).slice(-2);
  var Fecha_min = fecha + "T" + hora;
  const [inicioEventoMin, setInicioEventoMin] = useState(Fecha_min);
  const [inicioEvento, setInicioEvento] = useState<string>(inicioEventoMin);
  const [finEvento, setFinEvento] = useState<string>();
  const [finEventoMax, setFinEventoMax] = useState("2200-09-30 13:16:00");
  const [descripcion, setDescripcion] = useState<string>();
  const [nameAviso, setNameAviso] = useState<string>();
  const [editDoc, setEditDoc] = useState<boolean>(false);
  const [nameNewDoc, setNameNewDoc] = useState<string>("INIC");
  const [newDoc, setNewDoc] = useState(Object);
  const [NewDocPreview, setNewDocPreviw] = useState<File>();
  const [modoModal, setModoModal] = useState(modo);
  const [urlDoc, setUrlDoc] = useState("");
  const [nameDocDownload, setNameDocDownload] = useState("");
  ////////////////////////////
  const [slideropen, setslideropen] = useState(false);
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [Avisos, setAvisos] = useState("");
  const [IdMunicipio, setIdMunicipio] = useState("");
  const [values, setValues] = useState<Imunicipio[]>();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [editar, setEditar] = useState<boolean>(false);

  const Imagenes = [
    { extencion: ".PDF", imagen: PdfLogo },
    { extencion: "PPTX", imagen: PptxLogo },
    { extencion: "PPT", imagen: PptxLogo },
    { extencion: "XLSX", imagen: xlsxLogo },
    { extencion: ".XLS", imagen: xlsxLogo },
    { extencion: "DOCX", imagen: docxLogo },
    { extencion: ".DOC", imagen: docxLogo },
    { extencion: "INIC", imagen: imagenGenerica },
    { extencion: ".BPM", imagen: previewDoc },
    { extencion: ".JPG", imagen: previewDoc },
    { extencion: ".PNG", imagen: previewDoc },
  ];

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
    editDoc
      ? formData.append("DOCUMENTO", newDoc, nameNewDoc)
      : formData.append("DOCUMENTO", "");
    formData.append("TOKEN", JSON.parse(String(getToken())));
    formData.append("NUMOPERACION", String(tipo));
    formData.append("CHID", id);
    formData.append("NOMBRE", String(nameAviso));
    formData.append("DESCRIPCION", String(descripcion));
    formData.append("FECHAINICIO", String(inicioEvento));
    formData.append("FECHAFIN", String(finEvento));
    formData.append("CHUSER", String(user.id));

    if (
      inicioEvento === null ||
      finEvento === null ||
      nameAviso === null ||
      descripcion === null ||
      nameAviso === null ||
      editDoc
        ? newDoc === null
        : newDoc == !null
    ) {
      AlertS.fire({
        title: "¡Error!",
        text: "Campos Vacios",
        icon: "error",
      });
    } else {
      CatalogosServices.avisos(formData).then((res) => {
        setslideropen(false);
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });

          handleClose("save");
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: "Campos Requeridos Vacios",
            icon: "error",
          });
          handleClose("cerrar");
        }
      });
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
      setEditDoc(true);
    }
    /////////////////////////////
    if (file && file.type.substr(0, 5) === "image") {
      setNewDocPreviw(file);
      setCleanUp(true);
      setEditDoc(true);
      setNewDoc(null);
    } /////////////////////////
    setNewDoc(file);
  };

  const getdocumento = (name: string) => {
    setslideropen(true);
    let data = {
      TOKEN: JSON.parse(String(getToken())),
      RUTA: "/AVISOS/",
      NOMBRE: name,
    };
    if (name !== "" && name !== null) {
      ValidaSesion();
      CatalogosServices.obtenerDoc(data).then((res) => {
        if (res.SUCCESS) {
          var bufferArray = base64ToArrayBuffer(res.RESPONSE.RESPONSE.FILE);
          var blobStore = new Blob([bufferArray], {
            type: res.RESPONSE.RESPONSE.TIPO,
          });
          var data = window.URL.createObjectURL(blobStore);
          var link = document.createElement("a");
          document.body.appendChild(link);
          link.href = data;
          setUrlDoc(link.href);
          setslideropen(false);
        } else {
          setslideropen(false);
        }
      });
    } else {
      setslideropen(false);
    }
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "AVISOS") {
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });

    municipiosc();
    if (dt === "") {
    } else {
      setId(dt?.row?.id);
      setIdMunicipio(dt?.row?.idmunicipio);
      getdocumento(dt?.row?.Documento);
      setFinEvento(dt?.row?.FechaFin);
      setInicioEvento(dt?.row?.fechaInicio);
      setNameAviso(dt?.row?.Nombre);
      setDescripcion(dt?.row?.Descripcion);
      setNameDocDownload(dt?.row?.NombreDocumento);
    }
  }, [dt]);

  return (
    <ModalForm title={modoModal} handleClose={handleClose}>
      {modoModal === "Agregar Aviso" ? (
        <Box component={Grid} container boxShadow={3} xs={12} md={12}>
          <Box component={Grid} xs={12} md={3}></Box>
          <Box component={Grid} xs={12} md={6} container sx={{ padding: "3%" }}>
            <Grid container justifyContent="center">
              <Grid item xs={6}>
                <Tooltip title="Haz click para cargar o cambiar la imagen">
                  <IconButton component="label" sx={{ borderRadius: 1 }}>
                    <input
                      required
                      type="file"
                      hidden
                      onChange={(event) => {
                        handleNewFile(event);
                      }}
                    />
                    {Imagenes.find(
                      ({ extencion }) =>
                        extencion === String(nameNewDoc).slice(-4).toUpperCase()
                    ) ? (
                      <img
                        style={{
                          objectFit: "scale-down",
                          width: "100%",
                          borderRadius: 15,
                        }}
                        src={String(
                          Imagenes.find(
                            ({ extencion }) =>
                              extencion ===
                              String(nameNewDoc).slice(-4).toUpperCase()
                          )?.imagen
                        )}
                      />
                    ) : (
                      <img
                        style={{
                          objectFit: "scale-down",
                          width: "100%",
                          borderRadius: 1,
                        }}
                        src={imagenGenerica}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <label className="nombre-archivo">
                {nameNewDoc === "INIC" ? "" : nameNewDoc}
              </label>
            </Grid>

            <Grid container item xs={12} paddingTop={4}>
              <Grid item xs={6}>
                <Grid>
                  <label>Inicio </label>
                </Grid>

                <Grid>
                  <input
                    id="datetime-local"
                    required
                    type="datetime-local"
                    min={inicioEventoMin}
                    max={finEventoMax}
                    onChange={handleFechaInicio}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid sx={{ justifyContent: "center" }}>
                  <label>Fin</label>
                </Grid>
                <Grid>
                  <input
                    id="datetime-finaliza"
                    required
                    type="datetime-local"
                    min={inicioEvento}
                    onChange={handleFechaFin}
                  />
                </Grid>
              </Grid>
            </Grid>

            {
              //////////
              //// añadir nombre y descripcion
            }
            <Grid paddingTop={4}>
              <label>Nombre</label>
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
                error={nameAviso === "" ? true : false}
              />
              <label>Descripcion</label>
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
            </Grid>

            <Box
              sx={{
                bgcolor: "rgb(255, 255, 255)",
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
                paddingTop: "2%",
              }}
            >
              <button className="guardar" onClick={() => handleUpload()}>
                Guardar
              </button>
            </Box>
          </Box>
        </Box>
      ) : (
        ""
      )}

      {modoModal === "Aviso" ? (
        <Container maxWidth="lg">
          <Box>
            <Box sx={{ bgcolor: "rgb(222, 225, 225)", borderRadius: "5px" }}>
              <h4> {nameDocDownload}</h4>
            </Box>

            {/* <Box
              sx={{
                bgcolor: "rgb(255, 255, 255)",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                p: 1,
                m: 1,
              }}
            >
              <label>
                <h3>Inicio</h3>
                {inicioEvento}
              </label>

              <label>
                <h3>Fin</h3>
                {finEvento}
              </label>
            </Box> */}

            <Box>
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="100%"
                height="490"
                src={urlDoc}
              />
            </Box>
            <Box>
              {urlDoc.slice(-4).toUpperCase() === ".PDF" ||
              urlDoc.slice(-4).toUpperCase() === ".BPM" ||
              urlDoc.slice(-4).toUpperCase() === ".JPG" ||
              urlDoc.slice(-4).toUpperCase() === ".PNG" ? (
                <Box>
                  <button>
                    <a href={urlDoc} target="_blank" download={nameDocDownload}>
                      Ver
                    </a>
                  </button>
                </Box>
              ) : (
                <Box>
                  <button>
                    <a href={urlDoc} target="_blank" download={nameDocDownload}>
                      Descargar
                    </a>
                  </button>
                </Box>
              )}
            </Box>

            <Box>
              <Box sx={{ bgcolor: "rgb(222, 225, 225)", borderRadius: "5px" }}>
                <h4>Nombre</h4>
              </Box>

              <label>{nameAviso}</label>

              <Box sx={{ bgcolor: "rgb(222, 225, 225)", borderRadius: "5px" }}>
                <h4>Descripcion</h4>
              </Box>
              <label>{descripcion}</label>
            </Box>

            <Box
              sx={{
                bgcolor: "rgb(255, 255, 255)",
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              {editar ? (
                <button
                  className="editar"
                  onClick={() => setModoModal("Editar")}
                >
                  Editar
                </button>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Container>
      ) : (
        ""
      )}

      {modoModal === "Editar" ? (
        ///// editar evento hora inicio fin y foto

        Date.parse(inicioEventoMin) >= Date.parse(inicioEvento) ? (
          ////// SI EL EVENTO YA INICIO NO DEJA EDITARLO
          <Container maxWidth="sm">
            <Box
              sx={{
                bgcolor: "rgb(255, 255, 255)",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <TextField
                  margin="dense"
                  multiline
                  value=" El evento ya Inicio y/o Finalizó"
                  type="string"
                  fullWidth
                  variant="outlined"
                  color="warning"
                  focused
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Box>
          </Container>
        ) : (
          /////   EDITAR EVENTO SI ESTE AUN NO FINALIZA Y/O INICIA
          <Container maxWidth="sm">
            {
              /// input de infomacion
            }

            <Box>
              <img
                id="imagen"
                src={imagenGenerica}
                style={{
                  width: "350px",
                  height: "100%",
                  objectFit: "scale-down",
                }}
              />
            </Box>

            <Box>
              <IconButton
                aria-label="upload picture"
                component="label"
                size="large"
              >
                <input
                  required
                  type="file"
                  hidden
                  onChange={(event) => {
                    handleNewFile(event);
                  }}
                />
                <UploadFileIcon />
              </IconButton>
            </Box>
            <Box>
              <label>{nameNewDoc ? nameNewDoc : nameDocDownload}</label>
            </Box>

            <Box>
              <Box sx={{ bgcolor: "rgb(222, 225, 225)" }}>
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
                error={nameAviso === "" ? true : false}
              />

              <Box sx={{ bgcolor: "rgb(222, 225, 225)" }}>
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
                error={descripcion === "" ? true : false}
              />
            </Box>

            <Box
              sx={{
                bgcolor: "rgb(255, 255, 255)",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                p: 1,
                m: 1,
              }}
            >
              <Box sx={{ justifyContent: "center" }}>
                <Box>
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
              </Box>

              <Box sx={{ justifyContent: "center" }}>
                <Box>
                  <label>Fin de evento</label>
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
            {
              ////// botones
            }

            <Box
              sx={{
                bgcolor: "rgb(255, 255, 255)",
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <button className="guardar" onClick={() => handleUpload()}>
                Guardar
              </button>
            </Box>
          </Container>
        )
      ) : (
        //////////evento finalizado
        ""
      )}
    </ModalForm>
  );
};

export default AvisosModal;
