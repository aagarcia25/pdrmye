import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PlantillaBienvenido from "./PlantillaBienvenido";
import { Carousel } from 'antd';
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { AlertS } from "../../helpers/AlertS";
import { imagen } from "../../interfaces/user/User";
import { RESPONSE } from "../../interfaces/user/UserInfo";
import { COLOR } from "../../styles/colors";




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
      <Typography variant="h5" color="initial"> {(" ¡Bienvenid@! ")} </Typography>
      </Box>
      </Box>
      </Grid>

      <Grid height="100%" width="100%" bgcolor= {COLOR.grisBotones}  >
      <Grid item alignContent="center" bgcolor= "white">
      <Box boxShadow={3}> 
      {userInfo?.PERFILES[0]?.Referencia==="MUN"?
      <CarouselAp />
      :""}
      </Box>
      </Grid>
      </Grid>
      {/* <Grid height="3%" width="100%"> </Grid>
      <Grid bgcolor= {COLOR.grisTarjetaBienvenido} height="15%" width="100%" paddingTop="2%"> </Grid> */}

    </Grid>
  );
}

