 import React from "react";
 import { Grid, Typography } from "@mui/material";
import PlantillaBienvenido from "./PlantillaBienvenido";
import { Carousel } from 'antd';
import { Box } from "@mui/system";
import imga1 from '../../assets/img/imagen1.jpg'
import imga2 from '../../assets/img/imagen2.png'
import imga3 from '../../assets/img/imagen3.png'
import { COLOR } from "../../styles/colors";

// import "@fontsource/poppins"; 


const img1 = imga1;
const img2 = imga2;
const img3 = imga3;
const img4 = imga2;

const contentStyle: React.CSSProperties = {
  height:"65vh",
  // color: '#fff',
  // lineHeight: '160px',
  // background: '#808080',
  alignContent: "center",
  margin:"1%",
};


const CarouselAp: React.FC = () => (
  <Carousel autoplay>

    <div>
    <Box style={contentStyle} display="flex" justifyContent="center" > 
    <Box
        boxShadow={3}
        component="img"
        style={{ objectFit: "scale-down", }}
        sx={{
          height: "100%",
          width: "100%",
          maxHeight:{xs:"40%", md:"100%"},
          background: '#08c4b3',
        }}
        alt="NUEVO LEÓN"
        src={img1}
      />
    </Box>
    </div>

    <div>
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
          maxHeight:{xs:"40%", md:"100%"},
          background: '#08c4b3', 
        }}
        alt="NUEVO LEÓN"
        src={img3}
      />
    </Box>
    </div>

    <div>
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
    </div>
    

  </Carousel>
);

export default function Bienvenido({ user }: { user: any }) {

  return (
      <Grid >

        <Grid item>
        <Box paddingTop={1} paddingBottom={1}>
        <Typography sx={{ 
          ml:2,
          fontSize:"2rem",
          textAlign:"center",
          color: COLOR.doradoNL,
          fontFamily:"sans-serif" 
          }}> 
          {("¡Bienvenid@!")} 
        </Typography>
        </Box>
        </Grid>

        <Grid item padding={0} sx={{ 
          height: "100%",
          width: "100%",
          background: COLOR.grisBotones,
           }}> 
        <CarouselAp />
        </Grid>
      </Grid>
  );
}

