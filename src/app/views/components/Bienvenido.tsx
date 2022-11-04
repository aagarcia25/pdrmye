import { Button, Grid, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import PlantillaBienvenido from "./PlantillaBienvenido";
import MobileStepper from "@mui/material/MobileStepper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { COLOR } from "../../styles/colors";
import CardComponente from "./CardComponente";

export default function Bienvenido({ user }: { user: any }) {
  //VARAIBLES PARA LA VISTA DE MUNICIPIOS
  //IMAGENES PRUEBA
  const images = [
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath:
        "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      label: "Bird",
      imgPath:
        "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      label: "Bali, Indonesia",
      imgPath:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
    },
    {
      label: "Goč, Serbia",
      imgPath:
        "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
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
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "83vh",
              // backgroundColor: "green"
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "15%",
                // backgroundColor: "skyblue"
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  // backgroundColor: "purple",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ml: 3, fontSize: "2vw" }}>
                  Bienvenido, Monterrey.
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "40%",
                  // backgroundColor: "violet",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ml: 3, fontSize: "1.4vw" }}>
                  Avisos:
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "80%",
                // backgroundColor: "yellow",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "15%",
                  // backgroundColor: "pink",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ml: 3, fontSize: "1.5vw" }}>
                  {images[activeStep].label}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "80%",
                  // backgroundColor: "aqua",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    objectFit: "contain",
                    borderRadius: 0,
                  }}
                  src={images[activeStep].imgPath}
                />
              </Box>
              <Box
                sx={{
                  width: "58%",
                  height: "5%",
                  // backgroundColor: "aquamarine",
                }}
              >
                <MobileStepper
                  variant="text"
                  steps={4}
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
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === 3}
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
                      size="small"
                      onClick={handleBack}
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
         {/* <Grid container  spacing={1} >
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <CardComponente></CardComponente>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <CardComponente></CardComponente>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <CardComponente></CardComponente>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <CardComponente></CardComponente>
          </Grid>
        </Grid>
        <br></br>  */}


        {/* <Grid container  spacing={1} >
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <CardComponente></CardComponente>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <CardComponente></CardComponente>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <CardComponente></CardComponente>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <CardComponente></CardComponente>
          </Grid>
        </Grid>
        <br></br>  */}


        <Grid container spacing={1}>
        <Grid item  xs={12} sm={12} md={12} lg={12}>
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
        </Grid>
        </Grid>
       
        
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
