import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { LocalizationProvider, StaticTimePicker } from "@mui/lab";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import {
  PERMISO,
  USUARIORESPONSE,
} from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import {
  getPermisos,
  getToken,
  getUser,
} from "../../../../../services/localStorage";
import ModalForm from "../../../componentes/ModalForm";
import { VisaulizarImagen } from "../../../componentes/VisaulizarImagen";

const EventosModal = ({
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
  var inicioEventoMin = Fecha_min;
  const [inicioEvento, setInicioEvento] = useState("");
  const [previewImage, setPreviewImage] = useState<string>();
  const [NewImagePreview, setNewImagePreviw] = useState<File>();
  const [cleanUp, setCleanUp] = useState<boolean>(false);
  const [editImage, setEditImage] = useState<boolean>(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const handleUpload = () => {
    setslideropen(true);
    if (
      finEvento == "" ||
      inicioEvento == "" ||
      descripcion == "" ||
      nameEvent == "" ||
      finEvento == undefined ||
      inicioEvento == undefined ||
      descripcion == undefined ||
      nameEvent == undefined
    ) {
      Swal.fire("!Falta información , revisar los campos!", "", "warning");
    } else {
      const formData = new FormData();
      editImage
        ? formData.append("IMAGEN", newImage, nameNewImage)
        : formData.append("IMAGEN", "");
      formData.append("NUMOPERACION", String(tipo));
      formData.append("CHID", id);
      formData.append("NOMBRE", nameEvent);
      formData.append("DESCRIPCION", descripcion);
      formData.append("FECHAINICIO", inicioEvento);
      formData.append("FECHAFIN", finEvento);
      formData.append("CHUSER", user.Id);
      formData.append("TOKEN", JSON.parse(String(getToken())));

      CatalogosServices.eventos(formData).then((res) => {
        setslideropen(false);
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
          handleClose();
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
          handleClose();
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
  const handleNewImage = (event: any) => {
    let file = event.target!.files[0]!;
    if (event.target.files.length == 0) {
    } else {
      setNameNewImage(event.target!.files[0]!.name);
    }

    if (file && file.type.substr(0, 5) == "image") {
      setNewImagePreviw(file);
      setCleanUp(true);
      setEditImage(true);
      setNewImage(null);
    } else {
      Swal.fire("No es una imagen!", "", "warning");
    }

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

  const handleModo = (modo: string) => {
    setModoModal(modo);
    if (modo == "Evento") {
      setInicioEvento("");
      setNameEvent("");
      setFinEvento("");
      setDescripcion("");
    }
  };
  const agregar = (data: any) => {
    CatalogosServices.eventos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
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
          title: "¡Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.menu) == "EVENTOS") {
        if (String(item.ControlInterno) == "EDIT") {
          setEditar(true);
        }
      }
    });
    if (dt) {
      setId(dt?.row?.id);
      setDescripcion(dt?.row?.Descripcion);
      setUrlImage(dt?.row?.Imagen);
      setIdMunicipio(dt?.row?.idmunicipio);
      setNameEvent(dt?.row?.Nombre);
      setInicioEvento(dt?.row?.FechaInicio);
      setFinEvento(dt?.row?.FechaFin);
    } else {
      // setDescripcion("");
      // setNameEvent("");
    }
  }, [dt]);

  useEffect(() => {
    if (NewImagePreview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(NewImagePreview!);
    } else {
      setPreviewImage("o");
    }
  }, [NewImagePreview]);

  return (
    <ModalForm title={modoModal} handleClose={handleClose}>
      <Grid container item xs={12} justifyContent="center" paddingBottom={2}>
        {" "}
        {modoModal == "Evento" || modoModal == "Editar" ? (
          <div className="containerVisualizaImagenEvento">
            <VisaulizarImagen ubicacion={"/EVENTOS/"} name={urlImage} />
          </div>
        ) : (
          ""
        )}
      </Grid>
      {modoModal == "Agregar Evento" ||
      modoModal == "Evento" ||
      modoModal == "Editar" ? (
        <Grid container item xs={12} justifyContent="center">
          <Box boxShadow={3} padding="1%">
            <Container maxWidth="sm">
              <Box sx={{ width: "100%" }}>
                {
                  //////////empiezan debajo del titulo
                  //// imagen carga y previsualizacion
                }
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 1,
                      bgcolor: "background.paper",
                      borderRadius: 0,
                    }}
                  >
                    <Grid item container justifyContent="center" xs={12}>
                      <Tooltip
                        title={
                          modoModal == "Evento"
                            ? ""
                            : "Click para cargar una imagen"
                        }
                      >
                        <IconButton>
                          <input
                            id="imagencargada"
                            accept="image/*"
                            disabled={modoModal == "Evento"}
                            onChange={(v) => {
                              handleNewImage(v);
                            }}
                            type="file"
                            style={{
                              zIndex: 2,
                              opacity: 0,
                              width: "100%",
                              height: "80%",
                              position: "absolute",
                              cursor: "pointer",
                            }}
                          />
                          {cleanUp ? (
                            <img
                              src={previewImage}
                              style={{
                                objectFit: "scale-down",
                                width: "500px",
                                height: "400px",
                                borderRadius: "15",
                              }}
                            />
                          ) : modoModal == "Evento" || modoModal == "Editar" ? (
                            ""
                          ) : (
                            // <img id="imagen" src={urlImage} style={{ width: '100%', height: '100%', objectFit: "scale-down" }} />
                            <ImageOutlinedIcon
                              sx={{ width: "100%", height: "100%" }}
                            />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
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
                    <Box>
                      <Box sx={{ justifyContent: "center", display: "flex" }}>
                        <label>Inicio </label>
                      </Box>
                      <LocalizationProvider>
                        <StaticTimePicker
                          ampm
                          orientation="landscape"
                          openTo="minutes"
                          value={inicioEvento}
                          onChange={(newValue: any) => {
                            setInicioEvento(newValue);
                          }}
                          // renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      <Box>
                        <input
                          id="datetime-local"
                          required
                          type="datetime-local"
                          value={inicioEvento}
                          disabled={modoModal == "Evento"}
                          min={inicioEventoMin}
                          max={finEventoMax}
                          onChange={handleFechaInicio}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ justifyContent: "center" }}>
                      <Box>
                        <Box sx={{ justifyContent: "center", display: "flex" }}>
                          <label>Fin</label>
                        </Box>
                        <Box>
                          <input
                            id="datetime-finaliza"
                            required
                            value={finEvento}
                            disabled={modoModal == "Evento"}
                            type="datetime-local"
                            min={inicioEvento}
                            onChange={handleFechaFin}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box paddingBottom={3}>
                  <label>Nombre</label>
                  <TextField
                    required
                    multiline
                    margin="dense"
                    type="string"
                    fullWidth
                    value={modoModal == "Evento" ? nameEvent : nameEvent}
                    disabled={modoModal == "Evento"}
                    variant="standard"
                    onChange={(v) => setNameEvent(v.target.value)}
                    error={nameEvent == "" ? true : false}
                  />
                  <label>Descripción</label>
                  <TextField
                    multiline
                    required
                    margin="dense"
                    id="anio"
                    value={modoModal == "Evento" ? descripcion : descripcion}
                    disabled={modoModal == "Evento"}
                    type="string"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setDescripcion(v.target.value)}
                    error={descripcion == "" ? true : false}
                  />
                </Box>

                <Box
                  paddingBottom={2}
                  sx={{
                    bgcolor: "rgb(255, 255, 255)",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  {modoModal == "Evento" ? (
                    Date.parse(inicioEventoMin) >= Date.parse(inicioEvento) ? (
                      ""
                    ) : (
                      <Grid container justifyContent="center">
                        <button
                          className="editar"
                          onClick={() => handleModo("Editar")}
                        >
                          {" "}
                          Editar{" "}
                        </button>
                      </Grid>
                    )
                  ) : (
                    <Button
                      disabled={
                        !nameEvent ||
                        !descripcion ||
                        !inicioEvento ||
                        !finEvento
                      }
                      className="guardar"
                      onClick={() => handleUpload()}
                    >
                      Guardar
                    </Button>
                  )}
                </Box>
              </Box>
            </Container>
          </Box>
        </Grid>
      ) : (
        ""
      )}
    </ModalForm>
  );
};

export default EventosModal;
