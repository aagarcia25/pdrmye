import {
  Box,
  Button,
  createTheme,
  Divider,
  Input,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLOR } from "../../../styles/colors";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import { BorderBottom } from "@mui/icons-material";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";

export function Perfil() {


  const user: RESPONSE =  JSON.parse(String(getUser()));

  
  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: "0.7rem",
    backgroundColor: "white",
    "@media (min-width:600px) ()": {
      fontSize: "0.2rem",
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "0.5rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.0rem",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "1.3rem",
    },
  };

  return (
    <Box
      sx={{
        //Fondo
        backgroundColor: COLOR.blanco,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          //Espacio para el Título
          width: "100%",
          height: "4.5vh",
          backgroundColor: COLOR.grisTarjetaBienvenido,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            //Perfil
            color: COLOR.negro,
            fontSize: "3vh",
          }}
        >
          Perfil
        </Typography>
      </Box>
      <Box
        sx={{
          //Fondo contenido
          bgcolor: COLOR.blanco,
          width: "100%",
          height: "85%",
          display: "flex",
          justifyContent: "center",
          alignItems: "top",
          mt: 3,
        }}
      >
        <Box
          sx={{
            // Datos de Usuario

            width: "45%",
            height: "60vh",
            borderColor: COLOR.negro,
            
          }}
        >
          <Box
            sx={{
              //Caja de foto y nombre
              backgroundColor: COLOR.blanco,
              width: "100%",
              height: "20vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border:1,
              borderBottom:0,
            }}
          >
            <PersonIcon sx={{ fontSize: "8vw" }} />
            <ThemeProvider theme={theme}>
              <Typography variant="h3" sx={{ fontWeight: "Bold" }}>
              {user.Nombre + ' ' + user.ApellidoPaterno + ' '+ user.ApellidoMaterno}
              </Typography>
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              //cuadro que contiene al cuadro de textos 1
              backgroundColor: COLOR.blanco,
              width: "100%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border:1,
              borderTop:0,
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                width: "90%",
                height: "90%",
                //Cuadro de textos 1
              }}
            >
              <Divider
                sx={{
                  mt: 2,
                  backgroundColor: COLOR.grisDivisionEntreElementos,
                }}
              />
              <Box sx={{ display: "flex", mt: 2 }}>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "Bold",
                      /*fontSize: tamanioTypoCuadro1*/
                      mr: 1,
                    }}
                  >
                    Area:
                  </Typography>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h3"
                    sx={
                      {
                        /*fontSize: tamanioTypoCuadro1*/
                      }
                    }
                  >
                    Coordinación de Planeación Hacendaria
                  </Typography>
                </ThemeProvider>
              </Box>
              <Divider
                sx={{
                  mt: 2,
                  backgroundColor: COLOR.grisDivisionEntreElementos,
                }}
              />
              <Box sx={{ display: "flex", mt: 2 }}>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "Bold",
                      /*fontSize: tamanioTypoCuadro1*/
                      mr: 1,
                    }}
                  >
                    Puesto:
                  </Typography>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h3"
                    sx={
                      {
                        /*fontSize: tamanioTypoCuadro1*/
                      }
                    }
                  >
                    Coordinador
                  </Typography>
                </ThemeProvider>
              </Box>
              <Divider
                sx={{
                  mt: 2,
                  backgroundColor: COLOR.grisDivisionEntreElementos,
                }}
              />
              <Box sx={{ display: "flex", mt: 2 }}>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "Bold",
                      /*fontSize: tamanioTypoCuadro1*/
                      mr: 1,
                    }}
                  >
                    Perfil:
                  </Typography>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h3"
                    sx={
                      {
                        /*fontSize: tamanioTypoCuadro1*/
                      }
                    }
                  >
                    Usuario
                  </Typography>
                </ThemeProvider>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            ml: 2,
            //Editar informacion
            backgroundColor: COLOR.blanco,
            width: "53%",
            height: "55vh",
            border: 1,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              //Header de Editar contenido
              width: "100%",
              height: "10%",
              backgroundColor: COLOR.grisTarjetaBienvenido,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemeProvider theme={theme}>
              <Typography
                variant="h3"
                sx={{
                  //Perfil
                  color: COLOR.negro,
                  /*fontSize: "2.1vw",*/
                  backgroundColor: COLOR.grisTarjetaBienvenido,
                }}
              >
                Editar Información de Contacto
              </Typography>
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              //Padre del espacio 3 después del vacío
              height: "90%",
              width: "85%",
              backgroundColor: COLOR.blanco,
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              ml:1
            }}
          >
            <Box
              sx={{
                height: "45vh",
                width: "35vw",
                backgroundColor: COLOR.blanco,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <ThemeProvider theme={theme}>
                <Typography variant="h3">Teléfono:</Typography>
              </ThemeProvider>
              <Box sx={{
                width:"20vw",
                height:"3vh",
                backgroundColor:COLOR.blanco,
                borderRadius:1,
                border:2,
                borderColor: COLOR.grisTarjetaBienvenido,
                display:"flex",
                alignItems:"center"
              }}>
                <Input sx={{width:"19vw",ml:0.5,fontSize: ".9vw"}} disableUnderline placeholder="811-955-5555"></Input>
                  </Box>
              <ThemeProvider theme={theme}>
                <Typography sx={{mt: 1,}} variant="h3">Area:</Typography>
              </ThemeProvider>
              <Box sx={{
                width:"20vw",
                height:"3vh",
                backgroundColor:COLOR.blanco,
                borderRadius:1,
                border:2,
                borderColor: COLOR.grisTarjetaBienvenido,
                display:"flex",
                alignItems:"center"
              }}>
              <Input sx={{width:"19vw",ml:0.5,fontSize: ".9vw"}} disableUnderline placeholder="Coordinación de Planeación Hacendaria"></Input>
              </Box>
              <ThemeProvider theme={theme}>
                <Typography sx={{mt: 1,}} variant="h3">Ubicación:</Typography>
              </ThemeProvider>
              <Box sx={{
                width:"20vw",
                height:"3vh",
                backgroundColor:COLOR.blanco,
                borderRadius:1,
                border:2,
                borderColor: COLOR.grisTarjetaBienvenido,
                display:"flex",
                alignItems:"center"
              }}>
              <Input sx={{width:"19vw",ml:0.5,fontSize: ".9vw"}} disableUnderline placeholder="4to Piso"></Input>
              </Box>
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h3"
                  sx={{
                    mt: 2,
                    /*fontSize: "1vw",*/
                  }}
                >
                  Cambiar Foto:
                </Typography>
              </ThemeProvider>
              <Input sx={{width:"19vw",ml:0.5,fontSize: ".9vw"}} disableUnderline type="file"></Input>
              <Button
                sx={{
                  color: COLOR.blanco,
                  backgroundColor: COLOR.negro,
                  mt: 2,
                  fontSize: "0.8vw",
                  "&:hover": {
                    color: COLOR.negro,
                    backgroundColor: COLOR.grisTarjetaBienvenido,
                  },
                }}
              >
                ACTUALIZAR
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


