import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { Toast } from "../../../helpers/Toast";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getUser } from "../../../services/localStorage";


const ContactoMunicipios = () => {

  const user: RESPONSE = JSON.parse(String(getUser()));

  const [dato, setDato] = useState<Array<IData>>([])

  const [mostrar, setMostrar] = useState(false)

  const formData = new FormData();

  useEffect(() => {
    consulta()
    console.log(dato);
    setMostrar(true);
  }, [])


  const consulta = () => {
    formData.append("NUMOPERACION", "5");
    obtenerLista(formData);
  }

  const obtenerLista = (data: any) => {
    CatalogosServices.municipioInformacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Lista Obtenida!",
        });

        setDato(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });

      }
    });
  };

  return (
    <div>




      <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>



          {
            mostrar ?
              dato?.map((registro, x) =>

                <Grid item xs={2} sm={4} md={4} key={x}>
                  <Card  >
                    <CardContent sx={{display:"flex",justifyContent:"space-evenly"}}>
                      <Box sx={{ width: "100%", display: "flex", flexDirection:'column', alignItems:'center', justifyContent:'center'}}>

                        <Box sx={{ width: "35%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <img src={registro.Escudo} style={{ objectFit: "scale-down", }} />
                        </Box>
                        <Box sx={{  display: "flex", justifyContent: "center", flexDirection: "column" }}>
                          <Box sx={{ width: "100%", display: "flex", }}>
                            <Typography sx={{ fontFamily: "MontserratBold", fontSize: 14, display: "flex", justifyContent: "flex-end",alignItems:"center" }} variant="body2" gutterBottom>
                              Municipio: 
                            </Typography>
                            <Typography sx={{ fontFamily: "MontserratMedium", fontSize: 14, display: "flex", justifyContent: "flex-start", ml: "1em"  }} variant="body2" gutterBottom>
                              {registro?.Municipio}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex", }}>
                            <Typography sx={{ fontFamily: "MontserratBold", fontSize: 14, display: "flex", justifyContent: "flex-end",alignItems:"center" }} variant="body2" gutterBottom>
                              Tesorero: 
                            </Typography>
                            <Typography sx={{ fontFamily: "MontserratMedium", fontSize: 14, display: "flex", justifyContent: "flex-start", ml: "1em"  }} variant="body2" gutterBottom>
                               {registro?.Tesorero}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex", }}>
                            <Typography sx={{ fontFamily: "MontserratBold", fontSize: 14, display: "flex", justifyContent: "flex-end",alignItems:"center" }} variant="body2" gutterBottom>
                              Responsable: 
                            </Typography>
                            <Typography sx={{ fontFamily: "MontserratMedium", fontSize: 14, display: "flex", justifyContent: "flex-start" , ml: "1em" }} variant="body2" gutterBottom>
                              {registro?.Responsable}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex", }}>
                            <Typography sx={{ fontFamily: "MontserratBold", fontSize: 14, display: "flex", justifyContent: "flex-end",alignItems:"center" }} variant="body2" gutterBottom>
                              Domicilio: 
                            </Typography>
                            <Typography sx={{ fontFamily: "MontserratMedium", fontSize: 14, display: "flex", justifyContent: "flex-start" , ml: "1em" }} variant="body2" gutterBottom>
                              {registro?.Domicilio}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex", }}>
                            <Typography sx={{ fontFamily: "MontserratBold", fontSize: 14, display: "flex", justifyContent: "flex-end",alignItems:"center" }} variant="body2" gutterBottom>
                              Teléfono: 
                            </Typography>
                            <Typography sx={{ fontFamily: "MontserratMedium", fontSize: 14, display: "flex", justifyContent: "flex-start", ml: "1em"  }} variant="body2" gutterBottom>
                              {registro?.Telefono}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex", }}>
                            <Typography sx={{ fontFamily: "MontserratBold", fontSize: 14, display: "flex", justifyContent: "flex-end",alignItems:"center" }} variant="body2" gutterBottom>
                              Horario: 
                            </Typography>
                            <Typography sx={{ fontFamily: "MontserratMedium", fontSize: 14, display: "flex", justifyContent: "flex-start", ml: "1em"  }} variant="body2" gutterBottom>
                              {registro?.Horario}
                            </Typography>
                          </Box>

                          <Box sx={{ width: "100%", display: "flex", }}>
                            <Typography sx={{ fontFamily: "MontserratBold", fontSize: 14, display: "flex", justifyContent: "flex-end",alignItems:"center" }} variant="body2" gutterBottom>
                              Página Web: 
                            </Typography>
                            <Typography sx={{ fontFamily: "MontserratMedium", fontSize: 14, display: "flex", justifyContent: "flex-start", ml: "1em" }} variant="body2" gutterBottom>
                              {registro?.Web}
                            </Typography>
                          </Box>
                        </Box>

                      </Box>


                    </CardContent>
                    <CardActions>
                      <Button size="small">Enviar Mensaje</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )

              : null
          }

        </Grid>

      </Box>
    </div>
  );
};

export default ContactoMunicipios;

export interface IData {
  idMunicipio: string;
  Municipio: string;
  Tesorero: string;
  Responsable: string;
  Domicilio: string;
  Horario: string;
  Telefono: string;
  Web: string;
  Escudo: string;
}
