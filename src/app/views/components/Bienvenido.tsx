import { Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import PlantillaBienvenido from "./PlantillaBienvenido";
import MobileStepper from "@mui/material/MobileStepper";
import { AlignHorizontalCenter, ImageSearch, KeyboardArrowLeft, KeyboardArrowRight, Padding } from "@mui/icons-material";
import { COLOR } from "../../styles/colors";
import CardComponente from "./CardComponente";
import { AlertS } from "../../helpers/AlertS";
import { Toast } from "../../helpers/Toast";
import { CatalogosServices } from "../../services/catalogosServices";
import FilterIcon from '@mui/icons-material/Filter';
// import "@fontsource/poppins"; 

export default function Bienvenido({ user }: { user: any }) {
  //VARAIBLES PARA LA VISTA DE MUNICIPIOS
  //IMAGENES PRUEBA
  const [imagenes, setImagenes] = useState<Array<imagenen>>([]);

  let dat = ({
    NUMOPERACION: 5,
    CHUSER: user.id
  })

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

  useEffect(() => {
    consulta(dat)
  }, [])

  useEffect(() => {
    console.log(imagenes);

  }, [imagenes])


  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };


  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));

  function MyComponent() {
    if(isSm||isXs){
      return (<Box
        sx={{
  
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: 'cover', objectFit: "scale-down"
        }}
      >
        {imagenes.length === 0 ? <FilterIcon sx={{ height: "100%" }} />
          : <img src={imagenes[activeStep].Imagen} style={{ height: "auto", width: "80%" }} />}
      </Box>);
    }else{
      return (<Box
      sx={{

        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: 'cover', objectFit: "scale-down"
      }}
    >
      {imagenes.length === 0 ? <FilterIcon sx={{ height: "100%" }} />
        : <img src={imagenes[activeStep].Imagen} style={{ height: "80%", width: "auto" }} />}
    </Box>);
    }

    
  }


  //FIN DE VARIABLES PARA MUNICIPIOS

  return (
    //Traer los datos por name el nombre de la persona y lastConnection la última conexión del usuario
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: user.PERFILES[0].Referencia == "MUN" ? "block" : "none",
        }}
      >
        {/*CONTENIDO DE LA VISTA DE BIENVENIDA DE LOS MUNICIPIOS*/}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "1%"
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: COLOR.azul
            }}
          >
            <Box
              sx={{
                width: "100%",
                // height: "20%",
                // backgroundColor: "skyblue"
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  // backgroundColor: "purple",
                  display: "flow",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{
                  ml: 2,
                  fontSize: "2.5rem",
                  textAlign: "center",
                  color: COLOR.doradoNL,
                  fontFamily: "Poppins",
                }}>
                  ¡Bienvenido! Monterrey.
                </Typography>
              </Box>

            </Box>
            <Box
              sx={{
                width: "100%",
                height: "80%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  marginTop: "2%",
                  width: "100%",
                  // backgroundColor: "violet",
                  display: "flow",
                  alignContent: "center",
                }}
              >
                <Typography sx={{
                  fontSize: "2rem",
                  // bgcolor:"blue",  
                  width: "100%",
                  textAlign: "center",
                  fontFamily: "Poppins",
                }}>
                  Avisos:
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  // backgroundColor: "pink",
                  display: "flow",
                  alignItems: "center",
                  fontFamily: "Poppins",

                }}
              >
                <Typography sx={{ ml: 2, fontSize: "2rem", textAlign: "center", fontFamily: "Poppins" }}>
                  {imagenes[activeStep]?.Descripcion}
                </Typography>
              </Box>


              {/* <Box
                sx={{

                  width: "100%",
                  height: "80%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundSize:'cover',objectFit: "scale-down"
                }}
              >
                {imagenes.length === 0 ? <FilterIcon sx={{height: "100%" }} />
                  : <img src={imagenes[activeStep].Imagen}  style={{ height: "100%", width: "auto"}} />}
              </Box> */}
              {MyComponent()}

              <Box
                sx={{
                  width: "100%",
                  // height: "5%",
                  // backgroundColor: "aquamarine",
                }}
              >
                <MobileStepper
                  variant="text"
                  steps={imagenes.length}
                  position="static"
                  activeStep={activeStep}
                  sx={{
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  nextButton={
                    <Button
                      size="medium"
                      onClick={() => {
                        setActiveStep(activeStep + 1)
                      }}
                      disabled={activeStep === imagenes.length - 1}
                      sx={{ ml: 3 }}
                    >
                      Siguiente
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="medium"
                      onClick={() => {
                        setActiveStep(activeStep - 1)
                      }}
                      disabled={activeStep === 0}
                      sx={{ mr: 3 }}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Anterior
                    </Button>
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>



      <Box
        sx={{
          display: user.PERFILES[0].Referencia == "ORG" ? "block" : "none",
        }}
      >
        MUNICIPIOS
      </Box>

      <Box
        sx={{
          display: user.PERFILES[0].Referencia == "ADMIN" ? "block" : "none",
        }}
      >
        <PlantillaBienvenido
          id={1}
          name={
            user.Nombre +
            " " +
            user.ApellidoPaterno +
            " " +
            user.ApellidoMaterno
          }
          lastConnnection=""
        />
      </Box>

      <Box
        sx={{
          display: user.PERFILES[0].Referencia == "ANA" ? "block" : "none",
        }}
      >
        <PlantillaBienvenido
          id={1}
          name={
            user.Nombre +
            " " +
            user.ApellidoPaterno +
            " " +
            user.ApellidoMaterno
          }
          lastConnnection=""
        />
      </Box>

      <Box
        sx={{
          display: user.PERFILES[0].Referencia == "COOR" ? "block" : "none",
        }}
      >


        <PlantillaBienvenido
          id={1}
          name={
            user.Nombre +
            " " +
            user.ApellidoPaterno +
            " " +
            user.ApellidoMaterno
          }
          lastConnnection=""
        />



      </Box>

      <Box
        sx={{
          display: user.PERFILES[0].Referencia == "DIR" ? "block" : "none",
        }}
      >
        <PlantillaBienvenido
          id={1}
          name={
            user.Nombre +
            " " +
            user.ApellidoPaterno +
            " " +
            user.ApellidoMaterno
          }
          lastConnnection=""
        />
      </Box>
    </>
  );
}

export interface imagenen {
  CreadoPor: string;
  Descripcion: string;
  FechaCreacion: string;
  FechaFin: string;
  FechaInicio: string;
  Imagen: string;
  ModificadoPor: string;
  Nombre: string;
  UltimaActualizacion: string;
  deleted: string;
  id: string;
}
