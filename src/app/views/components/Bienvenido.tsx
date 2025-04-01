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
  const [fechaCorreoFederacion, setFechaCorreoFederacion] = useState<string>("");
  const [correoEnviado, setCorreoEnviado] = useState<boolean>(false);

  const [mostrarCard, setMostrarCard] = useState(false);
  const [mostrarChip, setMostrarChip] = useState(false);
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

 // Funcion que me obtiene la fecha actual y me verifica si ya se mando el correo corrependiente al mes
 const verificacionEnvioCorreo = () => {
  
    if(correoEnviado && fechaCorreoFederacion){
      const ultimoEnvio = new Date(fechaCorreoFederacion);
      const fechaActual = new Date();
      const diferencia = fechaActual.getTime() - ultimoEnvio.getTime();
      const dias = diferencia / (1000 * 60 * 60 * 24);
      console.log(dias);
      if(dias < 30){
        setMostrarCard(false);
      }else{
        setMostrarCard(true);
      }
    } else {
      setMostrarCard(true);
    }
 }

  const SimpleCard = () => {

    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
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
                mostrarChip && (
                  <Chip color="success" label="En curso" size="small"></Chip>
                )
              }

              {
                !mostrarChip && (
                  <Chip color="error" label="Atrasado" size="small"></Chip>
                )
              }


            </Stack>


            <Typography variant="body2" color="text.secondary">
            Envío del reporte de distribución de fondos de las <strong>Participaciones Federales</strong> correspondiente <br/>a <strong>{meses[(mes - 1)-1]}</strong> de <strong>{anio}</strong> a la UCEF.
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

  const Fnworkflow = (data:any) => {
    
    console.log(data.anio);
    console.log(data.mes);
    console.log(data.cuerpo);
  }

  useEffect(() => {

    
    //localStorage.removeItem("fechaCorreoFederacion");

    const fechaActual = new Date();
    const diaDelMes = fechaActual.getDate();

    if (diaDelMes <= 5) {
      setMostrarChip(true);
    } else {
      setMostrarChip(false);
    }

    if (user.Puesto === "Analista de CPH") {
      setAutoizadoEnvioCorreo(true);
    }

    consulta({
      NUMOPERACION: 5,
      CHUSER: user.Id,
    });

    setTimeout(() => {
      setCorreoEnviado(localStorage.getItem("correoEnviado") === "true");
      setFechaCorreoFederacion(localStorage.getItem("fechaCorreoFederacion") || "");
    }, 1000);
  }, [user.Id, user.Puesto, verificacionEnvioCorreo, consulta]);

  useEffect(() => {
    verificacionEnvioCorreo();
  }, [correoEnviado, fechaCorreoFederacion]);

  return (
    <Hidden smDown>
      <Grid height="85%" width="100%">
        <Grid item alignContent="center">
          {
            //  <CarouselAp />
          }
          {
            mostrarCard && fechaCorreoFederacion!="" && <SimpleCard />
          }
         
        </Grid>
      </Grid>
      {abrirModalCorreo && 
      <ModalCorreoEditable
      handleAccion={Fnworkflow}
      handleClose={handleClose} />
      }
      {/* <FavIconAvisos/> */}
    </Hidden>
  );
}
