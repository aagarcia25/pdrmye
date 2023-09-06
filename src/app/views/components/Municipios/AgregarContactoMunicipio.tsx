import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../helpers/AlertS";
import { Toast } from "../../../helpers/Toast";
import { ValidaSesion } from "../../../services/UserServices";
import { CatalogosServices } from "../../../services/catalogosServices";
import {
  getDatosAdicionales,
  getToken,
  getUser,
} from "../../../services/localStorage";
import SliderProgress from "../SliderProgress";
import { TextFieldFormatoMoneda } from "../componentes/TextFieldFormatoMoneda";
import { VisaulizarImagen } from "../componentes/VisaulizarImagen";
import {
  ResponseDataAdicional,
  USUARIORESPONSE,
} from "../../../interfaces/user/UserInfo";

const AgregarContactoMunicipio = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [primerInicio, setPrimerInicio] = useState(true);
  const [openSlider, setOpenSlider] = useState(true);
  const [uploadFile, setUploadFile] = useState("");
  const [escudo, setEscudo] = useState("");
  const [urlImagenPreview, setUrlImagenPreview] = useState("");

  const [nombreArchivo, setNombreArchivo] = useState("");
  const [newImage, setNewImage] = useState(Object);
  const [id, setId] = useState("");

  const [municipio, setMunicipio] = useState("");
  const [tesorero, setTesorero] = useState("");
  const [responsable, setResponable] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [telMun, setTelMun] = useState("");
  const [rfc, setRfc] = useState("");
  const [mailMun, setMailMun] = useState("");
  const [telTesorero, setTelTesorero] = useState("");
  const [extTelTesorero, setExtTelTesorero] = useState("");
  const [celTesorero, setCelTesorero] = useState("");
  const [mailTesorero, setMailTesorero] = useState("");
  const [enlace, setEnlace] = useState("");
  const [celEnlace, setCelEnlace] = useState("");
  const [mailEnlace, setMailEnlace] = useState("");
  const [horario, setHorario] = useState("");
  const [web, setWeb] = useState("");
  const [openDialogConfirmacion, setOpenDialogConfirmacion] = useState(false);
  const [editar, setEditar] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState(true);
  const [actualizarDatos, setActualizaaDatos] = useState(true);
  const formData = new FormData();

  const DA: ResponseDataAdicional = JSON.parse(String(getDatosAdicionales()));
  const consulta = () => {
    if (DA.MUNICIPIO[0].id) {
      setOpenSlider(true);
      formData.append("NUMOPERACION", "4");
      formData.append("IDMUNICIPIO", DA.MUNICIPIO[0]?.id);
      CatalogosServices.municipioInformacion(formData).then((res) => {
        if (res.SUCCESS) {
          if (res.RESPONSE.length !== 0) {
            if (primerInicio) {
              setValores(res.RESPONSE);
            }
            setNuevoRegistro(false);
            setValores(res.RESPONSE);
            setOpenSlider(false);
          } else {
            setNuevoRegistro(true);
            setOpenSlider(false);
          }
        } else {
        }
      });
    } else {
      Toast.fire({
        icon: "info",
        title:
          "¡No se pude mostrar información, No tiene un municipio relacionado!",
      });
    }
  };

  function enCambioFile(event: any) {
    if (event.target.files[0] !== undefined) {
      setUrlImagenPreview("");
      setNombreArchivo("");
      setNewImage("");
      setOpenSlider(true);
    }
    if (
      event?.target?.files[0]?.type?.split("/")[0] == "image" &&
      event.target.files[0] !== undefined
    ) {
      setUrlImagenPreview(URL.createObjectURL(event.target.files[0]));
      setNombreArchivo(event.target.value.split("\\")[2]);
      let file = event.target!.files[0]!;
      setNewImage(file);
      setOpenSlider(false);
    } else if (
      event?.target?.files[0]?.type?.split("/")[0] !== "image" &&
      event.target.files[0] !== undefined
    ) {
      setOpenSlider(false);
      Swal.fire("¡No es una imagen!", "", "warning");
      setOpenSlider(false);
    }
  }

  const onClick = () => {
    ValidaSesion();
    setOpenDialogConfirmacion(true);
  };

  const guardarRegistro = () => {
    setOpenSlider(true);
    ValidaSesion();
    var TOKEN = JSON.parse(String(getToken()));
    formData.append("NUMOPERACION", nuevoRegistro ? "1" : "2");
    formData.append("CHID", id);
    formData.append("CHUSER", user.Id);
    formData.append("IDMUNICIPIO", DA.MUNICIPIO[0].id);
    formData.append("MUNICIPIO", municipio);
    formData.append("TESORERO", tesorero);
    formData.append("RESPONSABLE", responsable);
    formData.append("DOMICILIO", domicilio);
    formData.append("TELEFONO", String(telMun));
    formData.append("HORARIO", horario);
    formData.append("WEB", web);
    formData.append("RFC", rfc);
    formData.append("CORREOMUNICIPIO", mailMun);
    formData.append("TELEFONOTESORERO", String(telTesorero));
    formData.append("CELULARTESORERO", String(celTesorero));
    formData.append("CORREOTESORERO", mailTesorero);
    formData.append("ENLACE", enlace);
    formData.append("CELULARENLACE", String(celEnlace));
    formData.append("CORREOENLACE", mailEnlace);
    formData.append("EXTTELEFONOTESORERO", String(extTelTesorero));
    formData.append("TIPO", "/FOTOPERFIL/");

    if (nombreArchivo !== "") {
      formData.append("ESCUDO", newImage, nombreArchivo);
      formData.append("TOKEN", TOKEN);
    } else {
      formData.append("ESCUDO", "");
    }
    agregar(formData);
  };

  const agregar = (data: any) => {
    CatalogosServices.municipioInformacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
        setActualizaaDatos(!actualizarDatos);
        setPrimerInicio(false);
        // consulta();
        setEscudo(res.RESPONSE);
        // limpiar();
        setEditar(false);
        setOpenSlider(false);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
      setOpenSlider(false);
    });
    setEditar(false);
  };

  const setValores = (data: IDatoMunicipio) => {
    setId(data.id);
    setEscudo(data.Escudo);
    setMunicipio(data.Municipio);
    setTesorero(data.Tesorero);
    setResponable(data.Enlace);
    setDomicilio(data.Domicilio);
    setTelMun(data.Telefono);
    setHorario(data.Horario);
    setWeb(data.Web);
    setTelMun(data.Telefono);
    setRfc(data.Rfc);
    setMailMun(data.CorreoMunicipio);
    setTelTesorero(data.TelefonoTesorero);
    setCelTesorero(data.CelularTesorero);
    setMailTesorero(data.CorreoTesorero);
    setEnlace(data.Enlace);
    setCelEnlace(data.CelularEnlace);
    setMailEnlace(data.CorreoEnlace);
    setExtTelTesorero(data.ExtTelefonoTesorero);
    setOpenSlider(false);
  };
  const handleChange = (value: number) => {};

  const limpiar = (modo: string) => {
    setUrlImagenPreview("");
    setEscudo("");
    setMunicipio("");
    setTesorero("");
    setResponable("");
    setDomicilio("");
    setTelMun("");
    setHorario("");
    setUploadFile("");
    setWeb("");
    setRfc("");
    setMailMun("");
    setTelTesorero("");
    setCelTesorero("");
    setMailTesorero("");
    setEnlace("");
    setCelEnlace("");
    setMailEnlace("");
    setExtTelTesorero("");
    if (modo == "cancelar") {
      consulta();
    }
  };

  useEffect(() => {
    ValidaSesion();
    consulta();
  }, [editar]);

  return (
    //Box padre
    <>
      <SliderProgress open={openSlider} />
      {editar ? (
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <div className="CargaDeArchivosCuenta">
              <Tooltip title={"Haz Clic para Cambiar o cargar la imagen"}>
                <IconButton
                  component="label"
                  sx={{ borderRadius: 1, width: "100%", height: "100%" }}
                >
                  <input
                    hidden
                    id="imagencargada"
                    accept="image/*"
                    onChange={(v) => {
                      enCambioFile(v);
                    }}
                    type="file"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  />
                  {urlImagenPreview ? (
                    <img
                      src={urlImagenPreview}
                      style={{
                        alignItems: "center",
                        objectFit: "scale-down",
                        width: "100%",
                        height: "100%",
                        borderRadius: "0",
                      }}
                    />
                  ) : escudo ? (
                    <VisaulizarImagen
                      ubicacion={"/USUARIOS/FOTOPERFIL/"}
                      name={escudo}
                    />
                  ) : (
                    <>
                      <AddPhotoAlternateIcon
                        sx={{ width: "100%", height: "100%" }}
                      />
                      {/* <img style={{ objectFit: "scale-down", width: "100%", height: "100%", borderRadius: '50%', }}
                                        src={"data:"+imgTipo+";base64," + imgData}
                                      /> */}
                    </>
                  )}
                </IconButton>
              </Tooltip>
            </div>
            {/* <img src={uploadFile} style={{ objectFit: "scale-down", width: "100%", height: "100%" }} /> */}
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding={3}
          >
            <div className="div-agregarcontactomunicipio">
              <Grid container sx={{ padding: "2%", width: "100%" }}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ paddingTop: "1.5%" }}
                >
                  <Grid item xs={12} sm={12} md={11} lg={11}>
                    <TextField
                      disabled
                      required
                      multiline
                      label="municipio"
                      value={municipio}
                      type="text"
                      size="small"
                      fullWidth
                      sx={{ paddingBottom: "2%" }}
                      variant="outlined"
                      onChange={(v) => setMunicipio(v.target.value)}
                      error={municipio == ""}
                      // helperText={(municipio == "" ) ? "No se pueden enviar campos vacios" : null}
                    />
                    <TextField
                      required
                      multiline
                      label="Domicilio"
                      value={domicilio}
                      type="text"
                      size="small"
                      fullWidth
                      sx={{ paddingBottom: "2%" }}
                      variant="outlined"
                      onChange={(v) => setDomicilio(v.target.value)}
                      error={domicilio == ""}
                      helperText={
                        domicilio == ""
                          ? "No se pueden enviar campos vacios"
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                <Grid container justifyContent="center" alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={11}
                    lg={11}
                    sx={{ paddingBottom: "2%" }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField
                          required
                          multiline
                          label="RFC"
                          value={rfc}
                          inputProps={{ maxLength: 12 }}
                          type="text"
                          size="small"
                          fullWidth
                          sx={{ paddingBottom: "2%" }}
                          variant="outlined"
                          onChange={(v) => setRfc(v.target.value)}
                          error={rfc == ""}
                          helperText={
                            rfc == ""
                              ? "No se pueden enviar campos vacios"
                              : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextFieldFormatoMoneda
                          valor={Number(telMun)}
                          handleSetValor={handleChange}
                          disable={editar}
                          error={String(Number(telMun)) == "NaN"}
                          modo={"telefono"}
                        />

                        <TextField
                          required
                          multiline
                          // margin="dense"
                          label="telefono"
                          inputProps={{ maxLength: 10 }}
                          value={telMun}
                          type=""
                          size="small"
                          fullWidth
                          sx={{ paddingBottom: "2%" }}
                          onChange={(v) => setTelMun(v.target.value)}
                          error={String(Number(telMun)) == "NaN"}
                          helperText={
                            telMun == ""
                              ? "No se pueden enviar campos vacios"
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={11}
                    lg={11}
                    sx={{ paddingBottom: "2%" }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField
                          required
                          multiline
                          label="Correo Municipio"
                          value={mailMun}
                          type="text"
                          size="small"
                          fullWidth
                          sx={{ paddingBottom: "2%" }}
                          variant="outlined"
                          onChange={(v) => setMailMun(v.target.value)}
                          error={mailMun == ""}
                          helperText={
                            mailMun == ""
                              ? "No se pueden enviar campos vacios"
                              : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField
                          required
                          multiline
                          // margin="dense"
                          label="Página Web"
                          value={web}
                          type="text"
                          size="small"
                          fullWidth
                          sx={{ paddingBottom: "2%" }}
                          onChange={(v) => setWeb(v.target.value)}
                          error={web == ""}
                          helperText={
                            web == ""
                              ? "No se pueden enviar campos vacios"
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justifyContent="left" alignItems="center">
                  <Grid item xs={12} sm={0.5} md={0.5} lg={0.5}></Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField
                      required
                      multiline
                      // margin="dense"
                      label="Horario"
                      value={horario}
                      type="text"
                      size="small"
                      fullWidth
                      sx={{ paddingBottom: "2%" }}
                      variant="outlined"
                      onChange={(v) => setHorario(v.target.value)}
                      error={horario == ""}
                      helperText={
                        horario == ""
                          ? "No se pueden enviar campos vacios"
                          : null
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container sx={{ padding: "2%", width: "100%" }}>
                <Grid
                  container
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  {/* ////////////// */}
                  <Grid item xs={12} sm={12} md={11} lg={11}>
                    <TextField
                      required
                      multiline
                      label="Tesorero"
                      value={tesorero}
                      type="text"
                      size="small"
                      fullWidth
                      sx={{ paddingBottom: "2%" }}
                      variant="outlined"
                      onChange={(v) => setTesorero(v.target.value)}
                      error={tesorero == ""}
                      helperText={
                        tesorero == ""
                          ? "No se pueden enviar campos vacios"
                          : null
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={12} md={11} lg={11}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                              required
                              multiline
                              label="Teléfono Tesorero"
                              value={telTesorero}
                              type="text"
                              size="small"
                              fullWidth
                              inputProps={{ maxLength: 10 }}
                              sx={{ paddingBottom: "2%" }}
                              variant="outlined"
                              onChange={(v) => setTelTesorero(v.target.value)}
                              error={String(Number(telTesorero)) == "NaN"}
                              helperText={
                                telTesorero == ""
                                  ? "No se pueden enviar campos vacios"
                                  : null
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4}>
                            <TextField
                              required
                              multiline
                              label="Ext "
                              value={extTelTesorero}
                              inputProps={{ maxLength: 5 }}
                              type="text"
                              size="small"
                              fullWidth
                              sx={{ paddingBottom: "2%" }}
                              variant="outlined"
                              onChange={(v) =>
                                setExtTelTesorero(v.target.value)
                              }
                              error={String(Number(extTelTesorero)) == "NaN"}
                              helperText={
                                extTelTesorero == ""
                                  ? "No se pueden enviar campos vacios"
                                  : null
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        item
                        justifyContent="space-between"
                        alignItems="center"
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
                        <Grid item xs={12} sm={10} md={10} lg={10}>
                          <TextField
                            required
                            // margin="dense"
                            label="Teléfono Móvil Tesorero"
                            value={celTesorero}
                            type="text"
                            inputProps={{ maxLength: 10 }}
                            size="small"
                            fullWidth
                            sx={{ paddingBottom: "2%" }}
                            variant="outlined"
                            onChange={(v) => setCelTesorero(v.target.value)}
                            error={String(Number(celTesorero)) == "NaN"}
                            helperText={
                              celTesorero == ""
                                ? "No se pueden enviar campos vacios"
                                : null
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        item
                        justifyContent="space-between"
                        alignItems="center"
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                      >
                        <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
                        <Grid item xs={12} sm={10} md={10} lg={10}>
                          <TextField
                            required
                            multiline
                            // margin="dense"
                            label="Correo Tesorero"
                            value={mailTesorero}
                            type="text"
                            size="small"
                            fullWidth
                            sx={{ paddingBottom: "2%" }}
                            variant="outlined"
                            onChange={(v) => setMailTesorero(v.target.value)}
                            error={mailTesorero == ""}
                            helperText={
                              mailTesorero == ""
                                ? "No se pueden enviar campos vacios"
                                : null
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ padding: "2%", width: "100%" }}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={11}
                    lg={11}
                    sx={{ paddingBottom: "2%" }}
                  >
                    <TextField
                      required
                      multiline
                      label="Enlace"
                      value={enlace}
                      type="text"
                      size="small"
                      fullWidth
                      sx={{ paddingBottom: "2%" }}
                      variant="outlined"
                      onChange={(v) => setEnlace(v.target.value)}
                      error={enlace == ""}
                      helperText={
                        enlace == ""
                          ? "No se pueden enviar campos vacios"
                          : null
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={12} sm={12} md={11} lg={11}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField
                          required
                          multiline
                          label="Teléfono Móvil Enlace"
                          value={celEnlace}
                          type="text"
                          size="small"
                          fullWidth
                          inputProps={{ maxLength: 10 }}
                          sx={{ paddingBottom: "2%" }}
                          variant="outlined"
                          onChange={(v) => setCelEnlace(v.target.value)}
                          error={String(Number(celEnlace)) == "NaN"}
                          helperText={
                            celEnlace == ""
                              ? "No se pueden enviar campos vacios"
                              : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField
                          required
                          multiline
                          // margin="dense"
                          label="Correo Enlace"
                          value={mailEnlace}
                          type="text"
                          size="small"
                          fullWidth
                          sx={{ paddingBottom: "2%" }}
                          variant="outlined"
                          onChange={(v) => setMailEnlace(v.target.value)}
                          error={mailEnlace == ""}
                          helperText={
                            mailEnlace == ""
                              ? "No se pueden enviar campos vacios"
                              : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box display="flex" flexDirection="row-reverse">
                          <Box display="flex" flexDirection="row">
                            <Box paddingRight={2}>
                              <Button
                                className="agregar"
                                variant="outlined"
                                onClick={() => {
                                  limpiar("");
                                }}
                              >
                                Limpiar
                              </Button>
                            </Box>
                            <Box paddingRight={2}>
                              <Button
                                className="cancelar"
                                variant="outlined"
                                onClick={() => {
                                  limpiar("cancelar");
                                  setEditar(false);
                                }}
                              >
                                Cancelar
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                className="agregar"
                                disabled={
                                  municipio == "" ||
                                  domicilio == "" ||
                                  telMun == "" ||
                                  telTesorero == "" ||
                                  extTelTesorero == "" ||
                                  celTesorero == "" ||
                                  celEnlace == "" ||
                                  String(Number(telMun)) == "NaN" ||
                                  String(Number(telTesorero)) == "NaN" ||
                                  mailMun == "" ||
                                  web == "" ||
                                  horario == "" ||
                                  tesorero == "" ||
                                  String(Number(telTesorero)) == "NaN" ||
                                  String(Number(extTelTesorero)) == "NaN" ||
                                  String(Number(celTesorero)) == "NaN" ||
                                  mailTesorero == "" ||
                                  enlace == "" ||
                                  String(Number(celEnlace)) == "NaN" ||
                                  mailEnlace == ""
                                }
                                variant="outlined"
                                onClick={() => {
                                  onClick();
                                }}
                              >
                                {nuevoRegistro ? "Guardar" : "Guardar Cambios"}
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingBottom: "5%" }}
        >
          <div className="CargaDeArchivosCuenta">
            {escudo ? (
              <VisaulizarImagen
                ubicacion={"/USUARIOS/FOTOPERFIL/"}
                name={escudo}
              />
            ) : (
              <AddPhotoAlternateIcon sx={{ width: "100%", height: "100%" }} />
            )}
          </div>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              item
              xs={12}
              md={11.5}
              lg={11.8}
              sx={{
                boder: "6px solid",
                borderRadius: "20px",
                bgcolor: "white",
                paddingTop: "1%",
                paddingBottom: "1%",
              }}
            >
              <div className="div-agregarcontactomunicipio">
                <Grid item xs={12} md={12} container paddingTop={1}>
                  <Grid item xs={6} md={2} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Municipio:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={4} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {municipio == "" ? "Sin información" : municipio}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={2} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Domicilio:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={4} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {domicilio == "" ? "Sin información" : domicilio}
                    </label>{" "}
                  </Grid>
                </Grid>

                <Grid item xs={12} md={12} container paddingTop={1}>
                  <Grid item xs={6} md={2} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray"> RFC: </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={4} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {rfc == null || rfc == "" || rfc == '""'
                        ? "Sin información"
                        : rfc}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={2} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray"> Teléfono: </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={4} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {telMun == "" ? "Sin información" : telMun}
                    </label>{" "}
                  </Grid>

                  <Grid item xs={6} md={2} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Correo Municipio:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={4} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {mailMun == "" || mailMun == null
                        ? "Sin información"
                        : mailMun}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={2} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Página Web:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={4} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {web == "" ? "Sin información" : web}
                    </label>{" "}
                  </Grid>
                </Grid>

                <Divider variant="middle" />

                <Grid item xs={12} md={12} container paddingTop={3}>
                  <Grid item xs={6} md={6} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray"> Tesorero: </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={6} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {tesorero == "" ? "Sin información" : tesorero}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={3} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Tel. Tesorero:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={3} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {telTesorero == "" ? "Sin información" : telTesorero}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={3} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Teléfono Móvil Tesorero:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} md={3} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {celTesorero == "" ? "Sin información" : celTesorero}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Ext Tel. Tesorero:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {extTelTesorero == ""
                        ? "Sin información"
                        : extTelTesorero}
                    </label>{" "}
                  </Grid>
                </Grid>

                <Divider variant="middle" />

                <Grid item xs={12} md={12} container paddingTop={3}>
                  <Grid item xs={6} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray"> Enlace: </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {enlace == "" ? "Sin información" : enlace}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Teléfono Móvil Enlace:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {celEnlace == "" ? "Sin información" : celEnlace}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray">
                      {" "}
                      Correo Enlace:{" "}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {mailEnlace == "" ? "Sin información" : mailEnlace}
                    </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    {" "}
                    <label className="TypographyH6Gray"> Horario: </label>{" "}
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    {" "}
                    <label className="TypographyH6Black">
                      {" "}
                      {horario == "" ? "Sin información" : horario}
                    </label>{" "}
                  </Grid>
                </Grid>

                <Grid item xs={12} container justifyContent="flex-end">
                  <Grid
                    container
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    lg={2}
                    paddingBottom={2}
                    paddingRight={2}
                  >
                    <Button
                      className="agregar"
                      variant="outlined"
                      onClick={() => {
                        setEditar(true);
                      }}
                    >
                      {nuevoRegistro ? "Registrar" : "Editar"}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Dialog
        open={openDialogConfirmacion}
        onClose={() => setOpenDialogConfirmacion(false)}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5" className="TooltipPersonalizado">
            {" "}
            Agregar Contacto de Municipio
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6">
              {" "}
              ¿ Desea guardar la información de {municipio} ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={5.5}>
              <Button
                className="cancelar"
                sx={{}}
                onClick={() => {
                  setOpenDialogConfirmacion(false);
                }}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={5.5}>
              <Button
                className="agregar"
                sx={{}}
                onClick={() => {
                  setOpenDialogConfirmacion(false);
                  guardarRegistro();
                }}
              >
                Aceptar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AgregarContactoMunicipio;

export interface IDatoMunicipio {
  id: string;
  idMunicipio: string;
  Municipio: string;
  NombreArchivo: string;
  Escudo: string;
  Domicilio: string;
  Rfc: string;
  Telefono: string;
  CorreoMunicipio: string;
  Web: string;
  Tesorero: string;
  TelefonoTesorero: string;
  CelularTesorero: string;
  CorreoTesorero: string;
  Enlace: string;
  CelularEnlace: string;
  CorreoEnlace: string;
  Horario: string;
  ExtTelefonoTesorero: string;
}
