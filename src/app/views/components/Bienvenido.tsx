import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PlantillaBienvenido from "./PlantillaBienvenido";
import { Carousel } from 'antd';
import { CatalogosServices } from "../../services/catalogosServices";
import { AlertS } from "../../helpers/AlertS";
import { imagen } from "../../interfaces/user/User";
import { RESPONSE } from "../../interfaces/user/UserInfo";
import { COLOR } from "../../styles/colors";
import { Hidden } from '@mui/material';




export default function Bienvenido({ user }: { user: any }) {

  const [imagen, setImagenes] = useState<Array<imagen>>([]);
  const userInfo: RESPONSE = user;

  const consulta = (data: any) => {
    CatalogosServices.eventos(data).then((res) => {
      if (res.SUCCESS) {
        setImagenes(res.RESPONSE);
      } 
    });
  };

  const CarouselAp: React.FC = () => (

    <Carousel autoplay >
      {
        imagen.map((item: imagen) => {
          return (
            <Box  display="flex" justifyContent="center" >
              <Box
                component="img"
                style={{ objectFit: "scale-down", }}
                sx={{
                  height: "60vh",
                  width: "100%",
                  background: '#FFFFFF',
                  borderRadius:"0",
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
    <Grid padding={0} >
      
      <Grid item paddingTop="2%" paddingBottom="2%"> 
      <Box display="flex" justifyContent="center">
      <Box >
      <Typography variant="h4" color= {COLOR.azul}> {(" ¡Bienvenid@! ")} </Typography>
      </Box>
      </Box>
      </Grid>

      <Hidden smDown>
      <Grid height="100%" width="100%" bgcolor= {COLOR.grisBotones}  >
      <Grid item alignContent="center">
      <Box boxShadow={3}> 
      <CarouselAp />
      </Box>
      </Grid>
      </Grid>
      </Hidden>

    </Grid>
  );
}

