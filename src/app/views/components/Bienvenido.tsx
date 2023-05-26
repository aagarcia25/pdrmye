import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Carousel } from 'antd';
import { CatalogosServices } from "../../services/catalogosServices";
import { imagen } from "../../interfaces/user/User";
import { COLOR } from "../../styles/colors";
import { Hidden } from '@mui/material';
import { VisaulizarImagen } from "./componentes/VisaulizarImagen";
import { AuthService } from "../../services/AuthService";
import { RESPONSESTORAGE } from "../../interfaces/user/UserInfo";

export default function Bienvenido({ user }: { user: any }) {
  const [imagenesListas, setImagenesListas] = useState<Array<RESPONSESTORAGE>>([]);

  const [listo, setListo] = useState<boolean>(false);

  const imagenData: any[] = [];


  const GetImageCarrucel = (largo: number, ubicacion: string, name: string) => {
    AuthService.GetImagen(ubicacion, name).then((res) => {

      if (res.RESPONSE.SUCCESS) {
        imagenData.push({ TIPO: res.RESPONSE.RESPONSE.TIPO, FILE: res.RESPONSE.RESPONSE.FILE });
        if (largo === imagenData.length) {
          setImagenesListas(imagenData);
        }
      }
    });
  };
  const consulta = (data: any) => {
    CatalogosServices.eventos(data).then((res) => {
      if (res.SUCCESS) {
        obtenerImagenes(res.RESPONSE, res.RESPONSE.length)
      }
    });
  };

  const obtenerImagenes = (data: any, n: number) => {
    for (var i = 0; i < n; i++) {
      GetImageCarrucel(n, '/EVENTOS/', data[i].Imagen)
    }
  };

  const CarouselAp: React.FC = () => (

    <Carousel autoplay >
      {
        imagenesListas.map((item: RESPONSESTORAGE) => {
          return (
            <Box key={Math.random()} display="flex" justifyContent="center"
              sx={{ height: "85vh", width: "100%", }}>
              <div className='containerCarrucelBienvenido' >
                <img className="imgrCarrucelBienvenido" style={{ objectFit: "scale-down", width: "100%", height: "100%", }}
                  src={"data:" + item.TIPO + ";base64," + item.FILE} />
              </div>
            </Box>
          );
        })
      }
    </Carousel>
  );

  useEffect(() => {
    consulta({
      NUMOPERACION: 5,
      CHUSER: user.id
    });
  }, []);

  return (
      <Hidden smDown>
        <Grid  height="85%" width="100%" >
          <Grid item alignContent="center">
              <CarouselAp />
          </Grid>
        </Grid>
      </Hidden>
  );
}

