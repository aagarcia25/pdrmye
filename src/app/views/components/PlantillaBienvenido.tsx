import * as React from "react";
import Box from "@mui/material/Box";
import {Typography, createTheme, ThemeProvider} from "@mui/material";
import { COLOR } from "../../styles/colors";
import PersonIcon from "@mui/icons-material/Person";
interface UserProps{
  name: string;
  lastConnnection: string;
  id:any;
  children?: React.ReactNode;
}

export default function PlantillaBienvenido(props: UserProps) {

  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: "0.7rem",
    "@media (min-width:600px) ()": {
      fontSize: "0.2rem",
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.7rem",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "1.9rem",
    },
  };

  theme.typography.h2 = {
    fontSize: "0.7rem",
    "@media (min-width:600px) ()": {
      fontSize: "0.2rem",
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.7rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.2rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "3rem",
    },
  };

  theme.typography.h4 = {
    fontSize: "0.7rem",
    "@media (min-width:600px) ()": {
      fontSize: "0.1rem",
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "0.4rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.6rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "1.2rem",
    },
  };

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
            <ThemeProvider theme={theme}>
            <Typography variant="h2" >BIENVENIDO</Typography>
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "15%",
              mt:2
            }}
          >
            <ThemeProvider theme={theme}>
            <Typography variant="h3">{props.name}</Typography>
            </ThemeProvider>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "15%",
            }}
          >
            <ThemeProvider theme={theme}>
            <Typography variant="h4" sx={{mt:9}}>
            {props.lastConnnection}
            </Typography>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
