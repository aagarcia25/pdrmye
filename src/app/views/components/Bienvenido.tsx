import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import PlantillaBienvenido from "./PlantillaBienvenido";
import { Carousel } from 'antd';
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { AlertS } from "../../helpers/AlertS";
import { imagen } from "../../interfaces/user/User";

const contentStyle: React.CSSProperties = {
  height: "70vh",
  alignContent: "center",
  margin: "1%",
};


export default function Bienvenido({ user }: { user: any }) {

  const [imagen, setImagenes] = useState<Array<imagen>>([]);
  const consulta = (data: any) => {
    CatalogosServices.eventos(data).then((res) => {
      if (res.SUCCESS) {
        setImagenes(res.RESPONSE);
      } 
    });
  };

  const CarouselAp: React.FC = () => (

    <Carousel autoplay dotPosition={"top"}>
      {
        imagen.map((item: imagen) => {
          return (
            <Box style={contentStyle} display="flex" justifyContent="center" >
              <Box
                boxShadow={3}
                component="img"
                style={{ objectFit: "scale-down", }}
                sx={{
                  height: "100%",
                  width: "100%",
                  maxHeight: { xs: "40%", md: "100%" },
                  background: '#FFFFFF',
                }}
                alt="NUEVO LEÓN"
                src={item.Imagen}
              />
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
    <Grid padding={1}>
      <Grid item>
      </Grid>
      <CarouselAp />
      <Box > </Box>
    </Grid>
  );
}

