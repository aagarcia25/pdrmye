import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../helpers/AlertS";
import { Toast } from "../../helpers/Toast";
import SelectValues from "../../interfaces/Select/SelectValues";
import { USUARIORESPONSE } from "../../interfaces/user/UserInfo";
import { MailServices } from "../../services/MailServices";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import { COLOR } from "../../styles/colors";
import SelectFrag from "./Fragmentos/SelectFrag";
import Slider from "./Slider";

const ListNotificationsModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
  destinatario,
  remitente,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
  destinatario: string;
  remitente: string;
}) => {
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  ////////////////////////////
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [encabezado, setEncabezado] = useState<string>();
  const [mensaje, setMensaje] = useState<string>();
  const [newEncabezado, setNewEncabezado] = useState<string>();
  const [newMensaje, setNewMensaje] = useState<string>();
  const [id, setId] = useState<string>();
  const [usuarioSelect, setUsuarioSelect] = useState<SelectValues[]>([]);
  const [chuserDestin, setChuserDestin] = useState<string>("");
  const [openSlider, setOpenSlider] = useState<boolean>(false);

  const [name, setName] = useState<string>();

  const handleViewChange = () => {
    let data = {
      NUMOPERACION: tipo,
      CHUSER: user.Id,
      CHID: id,
    };
    CatalogosServices.Notificaciones(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Mensaje Leído!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
    handleClose("8");
  };

  const handleUpload = () => {
    if (newEncabezado == null || newMensaje == null || chuserDestin == null) {
      AlertS.fire({
        title: "Verificar!",
        text: "Verificar los campos!",
        icon: "warning",
      });
    } else {
      let data = {
        NUMOPERACION: 1,
        CHUSER: user.Id,
        DELETED: 0,
        VISTO: 0,
        ENCABEZADO: newEncabezado,
        DESCRIPCION: newMensaje,
        DESTINATARIO: chuserDestin,
      };
      CatalogosServices.Notificaciones(data).then((res) => {
        if (res.SUCCESS) {
          let jsonobj = {
            texto: newMensaje,
          };

          let obj = {
            referencia: 1,
            data: jsonobj,
            to: "aagarcia@cecapmex.com",
            subject: newEncabezado,
          };

          MailServices.sendMail(obj).then(() => {});

          Toast.fire({
            icon: "success",
            title: "Mensaje Enviado!",
          });
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: "Revisar Valores",
            icon: "error",
          });
        }
      });
      handleClose("9");
    }
  };

  const loadSelectUser = () => {
    let data = {
      NUMOPERACION: 1,
      CHUSER: user.Id,
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (res.SUCCESS) {
        setUsuarioSelect(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleSelectUser = (e: any) => {
    setChuserDestin(e);
  };

  useEffect(() => {
    loadSelectUser();
    setChuserDestin(destinatario);
    if (dt == true) {
      setOpenSlider(true);
      setChuserDestin(destinatario);
      setOpenSlider(false);
    }
    if (dt == "") {
    } else {
      setId(dt?.row?.id);
      setMensaje(dt?.row?.Descripcion);
      setEncabezado(dt?.row?.Encabezado);
      setName(dt?.row?.Nombre);
    }
  }, [dt]);

  ////previsualizar imagen

  return (
    <Dialog
      fullWidth
      fullScreen
      open={open}
      sx={{ margin: "0%", padding: "0%" }}
    >
      <Slider open={openSlider} />

      <Box
        maxWidth="100%"
        sx={{
          // justifyContent: 'space-between',
          position: "relative",
          flexDirection: "column",
          margin: "4.5%",
          // borderRadius: 2
        }}
      >
        {modo == "NewMessage" ? (
          <Box boxShadow={2} maxWidth="95%">
            <Box
              sx={{
                height: "60%",
                justifyContent: "space-between",
                position: "relative",
                flexDirection: "column",
                // borderRadius: 1,
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                item
                className="HeaderModalH5"
              >
                <Typography
                  variant="h5"
                  className="HeaderEnviarMensaje"
                  paddingTop={1}
                  paddingLeft={1}
                  paddingBottom={1}
                >
                  {" "}
                  Nuevo Mensaje{" "}
                </Typography>

                <Box padding={1}>
                  <button
                    className="cerrar-nuevo-mensaje"
                    color="error"
                    onClick={() => handleClose("cerrar")}
                  >
                    <CloseIcon />
                  </button>
                </Box>
              </Grid>
              <Box
                sx={{
                  height: "100px",
                  position: "relative",
                  flexDirection: "column",
                  top: 10,
                  left: 7,
                  width: "95%",
                  display: "flex",
                  borderRadius: 1,
                  marginLeft: "2%",
                }}
              >
                <Typography variant="h6" paddingBottom={0.5}>
                  {" "}
                  Para..{" "}
                </Typography>
                <SelectFrag
                  value={chuserDestin}
                  options={usuarioSelect}
                  onInputChange={handleSelectUser}
                  placeholder={"Seleccionar Usuario"}
                  label={""}
                  disabled={dt == true}
                />
              </Box>
              <Box
                sx={{
                  height: "90%",
                  width: "95%",
                  justifyContent: "space-between",
                  position: "relative",
                  left: 5,
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "2%",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    paddingBottom: "1%",
                  }}
                >
                  <Typography variant="h6" paddingBottom={0.2}>
                    {" "}
                    Asunto..{" "}
                  </Typography>
                  <TextField
                    required
                    spellCheck="true"
                    rows={2}
                    multiline
                    onChange={(v) => setNewEncabezado(v.target.value)}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      fontFamily: "sans-serif",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    paddingTop: "1%",
                    borderRadius: 2,
                    height: "95%",
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" paddingBottom={0.2}>
                    {" "}
                    Mensaje..{" "}
                  </Typography>

                  <TextField
                    required
                    spellCheck="true"
                    multiline
                    rows={8}
                    onChange={(v) => setNewMensaje(v.target.value)}
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                </Box>
              </Box>

              {
                ////// boton de enviar mensaje nuevo
              }
              <Box
                sx={{
                  position: "relative",
                  right: 5,
                  top: -3,
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Box sx={{ width: "12%", padding: "1%" }}>
                  <Button
                    className="enviar-mensaje"
                    color="success"
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleUpload()}
                  >
                    Enviar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}

        {modo == "ViewMessage" ? (
          <Box boxShadow={3}>
            <Grid container>
              <Grid item xs={12} sx={{ bgcolor: "grey", padding: ".8%" }}>
                <Box display="flex" flexDirection="row-reverse">
                  <Box>
                    <button
                      className="cerrar-mensaje"
                      color="error"
                      onClick={() => handleViewChange()}
                    >
                      <CloseIcon />
                    </button>
                  </Box>
                </Box>
              </Grid>

              <Grid
                container
                sx={{
                  bgcolor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: 0,
                  padding: "2%",
                }}
              >
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Box sx={{ width: "5%", textAlign: "center" }}>
                      <Typography variant="h6"> De: </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "20%",
                        background: COLOR.grisBotones,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body1">
                        {" "}
                        {" " + remitente}{" "}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "75%" }}></Box>

                    <Box sx={{ width: "5%", textAlign: "center" }}>
                      <Typography variant="h6"> Para: </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "20%",
                        background: COLOR.grisBotones,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body1">
                        {" "}
                        {" " + destinatario}{" "}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "75%" }}></Box>
                  </Box>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "2%",
                  paddingRight: "2%",
                  borderRadius: 0,
                  paddingTop: "1%",
                }}
              >
                <Box>
                  <Typography variant="h6">Asunto</Typography>
                </Box>

                <Box sx={{ width: "98%", alignItems: "center" }}>
                  <TextField
                    value={encabezado}
                    disabled
                    rows={2}
                    multiline
                    style={{ width: "100%", borderRadius: 15 }}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "space-between",
                  borderRadius: 0,
                  paddingLeft: "2%",
                  paddingRight: "2%",
                  paddingBottom: "2%",
                }}
              >
                <Grid container>
                  <Box>
                    <Typography variant="h6"> Mensaje </Typography>
                  </Box>

                  <Box sx={{ width: "98%", alignItems: "center" }}>
                    <TextField
                      value={mensaje}
                      disabled
                      rows={15}
                      multiline
                      onChange={(v) => setMensaje(v.target.value)}
                      style={{ width: "100%", borderRadius: 15 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : (
          ""
        )}

        {modo == "viewMessageReading" ? (
          <Box boxShadow={3}>
            <Grid container>
              <Grid item xs={12} sx={{ bgcolor: "grey", padding: ".8%" }}>
                <Box display="flex" flexDirection="row-reverse">
                  <Box>
                    <button
                      className="cerrar-mensaje"
                      color="error"
                      onClick={() => handleClose("7")}
                    >
                      <CloseIcon />
                    </button>
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: 0,
                  padding: "2%",
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      alignItems="center"
                      sx={{ width: "100%" }}
                    >
                      <Box sx={{ width: "5%", textAlign: "center" }}>
                        <Typography variant="h6"> De: </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "20%",
                          background: COLOR.grisBotones,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body1">
                          {" "}
                          {" " + remitente}{" "}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "75%" }}></Box>

                      <Box sx={{ width: "5%", textAlign: "center" }}>
                        <Typography variant="h6"> Para: </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "20%",
                          background: COLOR.grisBotones,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body1">
                          {" "}
                          {" " + destinatario}{" "}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "75%" }}></Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "space-between",
                  paddingLeft: "2%",
                  paddingRight: "2%",
                  borderRadius: 0,
                }}
              >
                <Box>
                  <Typography variant="h6">Asunto</Typography>
                </Box>

                <Box
                  sx={{ width: "98%", alignItems: "center", paddingTop: "1%" }}
                >
                  <TextField
                    value={encabezado}
                    disabled
                    rows={2}
                    multiline
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "space-between",
                  borderRadius: 0,
                  paddingLeft: "2%",
                  paddingRight: "2%",
                  paddingBottom: "2%",
                }}
              >
                <Grid container>
                  <Box>
                    <Typography variant="h6"> Mensaje </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "98%",
                      alignItems: "center",
                      paddingTop: "1%",
                    }}
                  >
                    <TextField
                      value={mensaje}
                      disabled
                      rows={15}
                      multiline
                      onChange={(v) => setMensaje(v.target.value)}
                      style={{ width: "100%", borderRadius: 15 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : (
          ""
        )}

        {modo == "MessageSend" ? (
          <Box boxShadow={3}>
            <Grid container>
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{ borderRadius: 0, bgcolor: "grey", padding: ".8%" }}
                >
                  <Box
                    display="flex"
                    flexDirection="row-reverse"
                    sx={{ width: "100%" }}
                  >
                    <Box>
                      <button
                        className="cerrar-mensaje"
                        color="error"
                        onClick={() => handleClose("9")}
                      >
                        <CloseIcon />
                      </button>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  container
                  sx={{
                    bgcolor: "white",
                    paddingTop: ".8%",
                    paddingLeft: "2%",
                    paddingRight: "2%",
                  }}
                >
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      alignItems="center"
                      sx={{ width: "100%" }}
                    >
                      <Box sx={{ width: "5%", textAlign: "center" }}>
                        <Typography variant="h6"> De: </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "20%",
                          background: COLOR.grisBotones,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body1">
                          {" "}
                          {" " + remitente}{" "}
                        </Typography>{" "}
                      </Box>
                      <Box sx={{ width: "75%" }}></Box>
                      <Box sx={{ width: "5%", textAlign: "center" }}>
                        <Typography variant="h6"> Para:</Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "20%",
                          background: COLOR.grisBotones,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body1">
                          {" "}
                          {" " + destinatario}{" "}
                        </Typography>{" "}
                      </Box>
                      <Box sx={{ width: "75%" }}></Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "space-between",
                  paddingLeft: "2%",
                  paddingRight: "2%",
                  borderRadius: 0,
                  paddingTop: "1%",
                }}
              >
                <Box>
                  <Typography variant="h6"> Asunto </Typography>
                </Box>
                <Box sx={{ width: "98%", alignItems: "center" }}>
                  <TextField
                    value={encabezado}
                    disabled
                    rows={2}
                    multiline
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "space-between",
                  borderRadius: 0,
                  paddingLeft: "2%",
                  paddingRight: "2%",
                  paddingBottom: "2%",
                }}
              >
                <Grid container>
                  <Box>
                    <Typography variant="h6"> Mensaje </Typography>
                  </Box>

                  <Box sx={{ width: "98%", alignItems: "center" }}>
                    <TextField
                      value={mensaje}
                      disabled
                      rows={15}
                      multiline
                      onChange={(v) => setMensaje(v.target.value)}
                      style={{ width: "100%", borderRadius: 15 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Dialog>
  );
};

export default ListNotificationsModal;
