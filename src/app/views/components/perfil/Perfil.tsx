import {
  Box,
  Button,
  createTheme,
  Divider,
  Fab,
  Input,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLOR } from "../../../styles/colors";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";

export function Perfil() {

  const theme = createTheme();

  theme.typography.h3={
    fontSize:'0.7rem',
    backgroundColor: "white",
    '@media (min-width:600px) ()':{
        fontSize:'0.2rem',
    },
    [theme.breakpoints.up('xs')]:{
      fontSize: '0.5rem',
    },
    [theme.breakpoints.up('sm')]:{
      fontSize: '0.4rem',
    },
    [theme.breakpoints.up('md')]:{
      fontSize: '0.8rem',
    },
    [theme.breakpoints.up('lg')]:{
      fontSize: '1.0rem',
    },
    [theme.breakpoints.up('xl')]:{
      fontSize: '1.3rem',
    }
  }

  const tamanioWidthTextField = "28vw";

  const tamanioHeightTextField = "15vh";

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
          height: "5.5vh",
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
          backgroundColor: COLOR.blanco,
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
            height: "65vh",
            borderColor: "primary.main",
            border: 1,
            borderBottom: 0,
          }}
        >
          <Box
            sx={{
              //Caja de foto y nombre
              backgroundColor: COLOR.blanco,
              width: "100%",
              height: "15vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon sx={{ fontSize: "8vw" }} />
            <ThemeProvider theme={theme}>
            <Typography variant="h3" sx={{ fontWeight: "Bold", }}>Cesar Garza</Typography>
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
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                width: "90%",
                height: "70%",
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
                <Typography variant="h3"
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
                <Typography variant="h3" sx={{ /*fontSize: tamanioTypoCuadro1*/ }}>
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
                <Typography variant="h3"
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
                <Typography variant="h3" sx={{ /*fontSize: tamanioTypoCuadro1*/ }}>
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
                <Typography variant="h3"
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
                <Typography variant="h3" sx={{ /*fontSize: tamanioTypoCuadro1*/ }}>
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
            borderBottom: 0,
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
            <Typography variant="h3"
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
              width: "100%",
              backgroundColor: COLOR.blanco,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "95%",
                width: "95%",
                backgroundColor: COLOR.blanco,
                display: "flex",
                flexDirection: "column",
                alignItems:"center"
              }}
            >
              <TextField
                sx={{ width: tamanioWidthTextField,height:tamanioHeightTextField, mt: 2,  }}
                id="telefono"
                label="Teléfono"
                variant="outlined"
              />

              <TextField
                sx={{ width: tamanioWidthTextField,height:tamanioHeightTextField, mt: 2 }}
                id="area"
                label="Area"
                variant="outlined"
              />

              <TextField
                sx={{ width: tamanioWidthTextField,height:tamanioHeightTextField, mt: 2 }}
                id="ubicacion"
                label="Ubicación"
                variant="outlined"
              />
              <ThemeProvider theme={theme}>
              <Typography variant="h3"
                sx={{
                  mt: 3,
                  /*fontSize: "1vw",*/
                }}
              >
                Subir Foto:
              </Typography>
              </ThemeProvider>
              <TextField
                sx={{ width: tamanioWidthTextField, mt: 1 }}
                type="file"
                id="archivo"
                variant="outlined"
              />
              <Button
                  sx={{
                    color: COLOR.blanco,
                    backgroundColor: COLOR.negro,
                    mt: 3,
                    fontSize: "1vw",
                    "&:hover": {color: COLOR.negro, backgroundColor: COLOR.grisTarjetaBienvenido },
                  }}
                >
                  ACTUALIZAR
                </Button>
              <Box sx={{ width: "20%" }}>
                
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
