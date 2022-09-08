import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLOR } from "../../styles/colors";
import PersonIcon from "@mui/icons-material/Person";

interface UserProps{
  name: string;
  lastConnnection: string;
  id:any;
  children?: React.ReactNode;
}

export default function PlantillaBienvenido(props: UserProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOR.blanco,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "85%",
          height: "60%",
          backgroundColor: COLOR.grisTarjetaBienvenido,
          justifyContent: "center",
          
          display: "flex",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: COLOR.grisTarjetaBienvenido,
            width: "45vw",
            height: "40vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "5%",
            }}
          ></Box>
          <Box
            sx={{
              width: "100%",
              height: "35%",
            }}
          >
            <PersonIcon sx={{ width:"100%", height:"100%", color: COLOR.blanco }} />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "15%",
            }}
          >
            <Typography sx={{fontSize:"4.5vw"}}>BIENVENIDO</Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "15%",
              mt:2
            }}
          >
            <Typography sx={{fontSize:"3vw"}}>{props.name}</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "15%",
            }}
          >
            <Typography sx={{fontSize:"1vw", mt:4}}>
            {props.lastConnnection}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
