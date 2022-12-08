import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import PlantillaBienvenido from "./PlantillaBienvenido";
import { Carousel } from 'antd';
import imga1 from '../../assets/img/imagen1.jpg'
import imga2 from '../../assets/img/imagen2.png'
import imga3 from '../../assets/img/imagen3.png'
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { AlertS } from "../../helpers/AlertS";
import { imagen } from "../../interfaces/user/User";

// import "@fontsource/poppins"; 


const img1 = imga1;
const img2 = imga2;
const img3 = imga3;
const img4 = imga2;

const contentStyle: React.CSSProperties = {
  height: "65vh",
  alignContent: "center",
  margin: "1%",
};




export default function Bienvenido({ user }: { user: any }) {

  const [imagen, setImagenes] = useState<Array<imagen>>([]);
  const consulta = (data: any) => {
    CatalogosServices.eventos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setImagenes(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
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

      {/* <div>
          <Box style={contentStyle} display="flex" justifyContent="center" >
            <Box
              boxShadow={3}
              component="img"
              style={{ objectFit: "scale-down", }}
              sx={{
                height: "100%",
                width: "100%",
                maxHeight: { xs: "40%", md: "100%" },
                background: '#05a7e8',
              }}
              alt="NUEVO LEÓN"
              src={img2}
            />
          </Box>
        </div>
    
        <div>
          <Box style={contentStyle} display="flex" justifyContent="center">
            <Box
              boxShadow={3}
              component="img"
              style={{ objectFit: "scale-down", }}
              sx={{
                height: "100%",
                width: "100%",
                maxHeight: { xs: "40%", md: "100%" },
                background: '#08c4b3',
              }}
              alt="NUEVO LEÓN"
              src={img3}
            />
          </Box>
        </div> */}

      {/* <div>
        <Box style={contentStyle} display="flex" justifyContent="center" > 
        <Box
            boxShadow={3}
            component="img"
            style={{ objectFit: "scale-down", }}
            sx={{
              height: "100%",
              width: "100%",
              maxHeight:{xs:"40%", md:"100%"},
              background: '#05a7e8', 
            }}
            alt="NUEVO LEÓN"
            src={img4}
          />
        </Box>
        </div> */}


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
