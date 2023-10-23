import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { Toast } from "../../../helpers/Toast";
import { USUARIORESPONSE } from "../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getUser } from "../../../services/localStorage";
import ListNotificationsModal from "../ListNotificationsModal";
import Slider from "../Slider";

const ContactoMunicipios = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [dato, setDato] = useState<Array<IData>>([]);
  const [mostrar, setMostrar] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);

  const [idDestinatario, setIdDestinatario] = useState<string>("");

  useEffect(() => {
    consulta();
    setMostrar(true);
  }, []);

  const handleSend = (idMun: string) => {
    setOpenSlider(true);
    const formData = new FormData();
    formData.append("NUMOPERACION", "7");
    formData.append("IDMUNICIPIO", idMun);
    CatalogosServices.municipios(formData).then((res) => {
      if (res.SUCCESS) {
        setIdDestinatario(res?.RESPONSE[0]?.idUsuario);
        setOpenSlider(false);
        setOpen(true);
      } else {
        AlertS.fire({
          title: "¡Error!",
          icon: "error",
        });
      }
    });
  };

  const consulta = () => {
    const formData = new FormData();
    formData.append("NUMOPERACION", "5");
    obtenerLista(formData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const obtenerLista = (data: any) => {
    CatalogosServices.municipioInformacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setDato(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  return (
    <div>
      <Slider open={openSlider}></Slider>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {mostrar
            ? dato?.map((registro, x) => (
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  key={x}
                  sx={{ bgcolor: "#EEEEEE", margin: "0", padding: "0" }}
                >
                  <Card sx={{ margin: "2%" }}>
                    <CardContent
                      sx={{ display: "flex", justifyContent: "space-evenly" }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* <Box sx={{ width: "50%", height:"50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img  src={registro.Escudo} style={{ objectFit:"scale-down", }} />
                       </Box> */}

                        <Box
                          sx={{
                            width: "50%",
                            height: "200px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <InsertPhotoIcon
                            fontSize="small"
                            sx={{ fontSize: 40 }}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            paddingTop: "3%",
                          }}
                        >
                          <Box sx={{ width: "100%", display: "flex" }}>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              Municipio:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 500,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: "1em",
                              }}
                              gutterBottom
                            >
                              {registro?.Municipio}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex" }}>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              Tesorero:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 500,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: "1em",
                              }}
                              gutterBottom
                            >
                              {registro?.Tesorero}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex" }}>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              Responsable:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 500,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: "1em",
                              }}
                              gutterBottom
                            >
                              {registro?.Responsable}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex" }}>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              Domicilio:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 500,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: "1em",
                              }}
                              gutterBottom
                            >
                              {registro?.Domicilio}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex" }}>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              Teléfono:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 500,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: "1em",
                              }}
                              gutterBottom
                            >
                              {registro?.Telefono}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex" }}>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              Horario:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 500,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: "1em",
                              }}
                              gutterBottom
                            >
                              {registro?.Horario}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex" }}>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              Página Web:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "sans-serif",
                                fontWeight: 500,
                                fontSize: 14,
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: "1em",
                              }}
                              gutterBottom
                            >
                              {registro?.Web}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>

                    <CardActions>
                      <Box
                        display="flex"
                        justifyContent="center"
                        sx={{ width: "100%" }}
                      >
                        <Box>
                          <Button
                            className="enviar-mensaje"
                            size="medium"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleSend(String(registro?.idMunicipio))
                            }
                          >
                            {" "}
                            <Typography color="white">
                              {" "}
                              Enviar Mensaje{" "}
                            </Typography>{" "}
                          </Button>
                        </Box>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
      {open ? (
        <ListNotificationsModal
          open={open}
          modo={"NewMessage"}
          tipo={1}
          handleClose={handleClose}
          dt={true}
          destinatario={String(idDestinatario)}
          remitente={user.Id}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ContactoMunicipios;

export interface IData {
  idMunicipio: string;
  Municipio: string;
  Tesorero: string;
  Responsable: string;
  Domicilio: string;
  Horario: string;
  Telefono: string;
  Web: string;
  Escudo: string;
}
