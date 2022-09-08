import { Box, Divider, Fab, Input, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLOR } from "../../../styles/colors";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";

export function Perfil() {

    const tamanioTextField ="70%";

  return (
    <Box
      sx={{
        //Fondo
        backgroundColor:  COLOR.blanco,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          //Espacio para el Título
          width: "7%",
          height: "6%",
          backgroundColor: COLOR.grisTarjetaBienvenido,
        }}
      >
        <Typography
          sx={{
            //Perfil
            color: COLOR.negro,
          }}
          variant="h3"
        >
          Perfil
        </Typography>
      </Box>
      <Box
        sx={{
          //Fondo contenido
          backgroundColor:  COLOR.blanco,
          width: "100%",
          height: "85%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // Datos de Usuario
            
            width: "30%",
            height: "90%",
            borderColor: 'primary.main' ,
            border:1,
            borderBottom:0,
             }}
        >
          <Box
            sx={{
              //Caja de foto y nombre
              backgroundColor: COLOR.blanco,
              width: "100%",
              height: "20%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon sx={{ fontSize: 100 }} />
            <Typography sx={{ fontWeight: "Bold" }}>Cesar Garza</Typography>
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
                width: "80%",
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
                <Typography sx={{ fontWeight: "Bold" }}>Area:</Typography>
                <Typography>Coordinación de Planeación Hacendaria</Typography>
              </Box>
              <Divider
                sx={{
                  mt: 2,
                  backgroundColor: COLOR.grisDivisionEntreElementos,
                }}
              />
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography sx={{ fontWeight: "Bold" }}>Puesto:</Typography>
                <Typography>Coordinador</Typography>
              </Box>
              <Divider
                sx={{
                  mt: 2,
                  backgroundColor: COLOR.grisDivisionEntreElementos,
                }}
              />
              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography sx={{ fontWeight: "Bold" }}>Perfil:</Typography>
                <Typography>Usuario</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            //Espacio entre Boxes
            backgroundColor: COLOR.blanco,
            width: "2%",
            height: "90%",
          }}
        >
        </Box>
        <Box
          sx={{
            //Editar informacion
            backgroundColor: COLOR.blanco,
            width: "68%",
            height: "90%",
            border:1,
            borderBottom:0,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{ //Header de Editar contenido
              width: "100%", 
              height: "10%",
              backgroundColor: COLOR.grisTarjetaBienvenido,
              display: "flex",
              alignItems: "center",
            }}
          ><Typography variant="h4" sx={{
            //Perfil
            color: COLOR.negro,
          }}>Editar Información de Contacto</Typography>
            
          </Box>
          <Box
            sx={{
              //Padre del espacio 3 después del vacío
              height: "90%",
              width: "100%",
              backgroundColor:  COLOR.blanco,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "95%",
                width: "95%",
                backgroundColor:  COLOR.blanco,
              }}
            >
              <TextField
                sx={{ width: tamanioTextField, mt: 3 }}
                id="telefono"
                label="Teléfono"
                variant="outlined"
              />

              <TextField
                sx={{ width: tamanioTextField, mt: 3 }}
                id="ubicacion"
                label="Ubicación"
                variant="outlined"
              />
              
              <TextField
                sx={{ width: tamanioTextField, mt: 3 }}
                type="file"
                id="telefono"
                variant="outlined"
              />
                <Box sx={{width:"20%"}}>
                <Fab sx={{ mt: 6 }} variant="extended">
                <SaveIcon sx={{ mr: 1 }} />
                Actualizar
              </Fab>
                </Box>
              
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
