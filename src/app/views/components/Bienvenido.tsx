import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { Carousel } from "antd";
import { CatalogosServices } from "../../services/catalogosServices";
import { Hidden } from "@mui/material";
import { AuthService } from "../../services/AuthService";
import { RESPONSESTORAGE } from "../../interfaces/user/UserInfo";
import { Blanco } from "../../styles/imagen";
import { FavIconAvisos } from "../../avisosPAUA/componentes/FavIconAvisos";

import { Card, CardContent, Typography, Button, CardActions, Chip, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import ReactQuill from 'react-quill';
import { ModalCorreoEditable } from "./componentes/ModalEnvioCorreoFederacion";

export default function Bienvenido({ user }: { user: any }) {
  const [imagenesListas, setImagenesListas] = useState<Array<RESPONSESTORAGE>>(
    []
  );

  const [data, setData] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");

  const [mostrarCard, setMostrarCard] = useState(false);
  const [autoizadoEnvioCorreo, setAutoizadoEnvioCorreo] = useState(false);

  const [abrirModalCorreo, setAbrirModalCorreo] = useState(false);

  const imagenData: any[] = [];

  const handleOpen = () => {
    setAbrirModalCorreo(true);
  }
  const handleClose = () => {
    setAbrirModalCorreo(false);
  }

  const GetImageCarrucel = (largo: number, ubicacion: string, name: string) => {
    AuthService.GetImagen(ubicacion, name).then((res) => {
      if (res.RESPONSE.SUCCESS) {
        imagenData.push({
          TIPO: res.RESPONSE.RESPONSE.TIPO,
          FILE: res.RESPONSE.RESPONSE.FILE,
        });
        if (!data) {
          setData(res.RESPONSE.RESPONSE.FILE);
          setTipo(res.RESPONSE.RESPONSE.TIPO);
        }

        // setImagenesListas(imagenData);
        if (largo == imagenData.length) {
          setImagenesListas(imagenData);
        }
      }
    });
  };
  const consulta = (data: any) => {
    CatalogosServices.eventos(data).then((res) => {
      if (res.SUCCESS) {
        obtenerImagenes(res.RESPONSE, res.RESPONSE.length);
      }
    });
  };

  const obtenerImagenes = (data: any, n: number) => {
    for (var i = 0; i < n; i++) {
      GetImageCarrucel(n, "/EVENTOS/", data[i].Imagen);
    }
  };

  const CarouselAp: React.FC = () => (
    <Carousel autoplay>
      {!imagenesListas ? (
        <Box
          key={Math.random()}
          display="flex"
          justifyContent="center"
          sx={{ height: "85vh", width: "100%" }}
        >
          <div className="containerCarrucelBienvenido">
            <img
              className="imgrCarrucelBienvenido"
              style={{ objectFit: "scale-down", width: "100%", height: "100%" }}
              src={
                "data:" + tipo
                  ? tipo
                  : Blanco.Tipo + ";base64," + data
                    ? data
                    : Blanco.Data
              }
            />
          </div>
        </Box>
      ) : (
        imagenesListas.map((item: RESPONSESTORAGE) => {
          return (
            <Box
              key={Math.random()}
              display="flex"
              justifyContent="center"
              sx={{ height: "85vh", width: "100%" }}
            >
              <div className="containerCarrucelBienvenido">
                <img
                  className="imgrCarrucelBienvenido"
                  style={{
                    objectFit: "scale-down",
                    width: "100%",
                    height: "100%",
                  }}
                  src={"data:" + item.TIPO + ";base64," + item.FILE}
                />
              </div>
            </Box>
          );
        })
      )}
    </Carousel>
  );

 

  const SimpleCard = () => {
    return (

      <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
        <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
          <CardContent>

            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-start",
                alignItems: 'center',
                mb: 2
              }}
            >

              {
                mostrarCard && (
                  <Chip color="success" label="En curso" size="small"></Chip>
                )
              }

              {
                !mostrarCard && (
                  <Chip color="error" label="Atrasado" size="small"></Chip>
                )
              }


            </Stack>


            <Typography variant="body2" color="text.secondary">
              Envío del Reporte de Participaciones Federales de enero a la UCEF.
            </Typography>
          </CardContent>

          {
            autoizadoEnvioCorreo && (
              <Stack
                direction="row"
                sx={{
                  justifyContent: "flex-end",
                  alignItems: 'center',
                  m: 1
                }}
              >
                <Button variant="contained"
                  size="small"
                  color="primary"
                  sx={
                    {
                      "&:hover": {
                        color: "#333333",
                        backgroundColor: "#9e7c47",
                      }
                    }
                  }
                  onClick={handleOpen}
                >
                  Ver Más
                </Button>
              </Stack>

            )
          }


        </Card>
      </div>
    );
  }


  useEffect(() => {

    const fechaActual = new Date();
    const diaDelMes = fechaActual.getDate();

 
      setMostrarCard(false);
    

    if (user.Puesto === "Analista de CPH") {
      setAutoizadoEnvioCorreo(true);
    }

    consulta({
      NUMOPERACION: 5,
      CHUSER: user.Id,
    });
  }, []);

  return (
    <Hidden smDown>
      <Grid height="85%" width="100%">
        <Grid item alignContent="center">
          {
            //  <CarouselAp />
          }
          {/* <SimpleCard /> */}
         
        </Grid>
      </Grid>
      {/* {abrirModalCorreo && <ModalCorreoEditable handleClose={handleClose}/>} */}
      {/* <FavIconAvisos/> */}
    </Hidden>
  );
}
