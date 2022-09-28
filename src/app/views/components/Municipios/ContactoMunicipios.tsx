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
import React from "react";

const ContactoMunicipios = () => {


    const data = [{id:1,Municipio:"abasolo",Tesorerio: "Raúl Karr Vázquez", domicilio:" Morelos #100, Centro de Pesquería,    Nuevo León, México C.P. 66650    TEL: (825) 2440 780    contacto@pesqueria.gob.mx    HORARIO: De Lunes a Viernes    de 8:00a.m. a 4:00p.m.    www.pesqueria.gob.mx"},
                  {id:2,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:3,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:4,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:5,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:6,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:7,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:8,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:9,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:10,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:11,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:12,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:13,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:14,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:15,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:16,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:17,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:18,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:19,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:20,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:21,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:22,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:23,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:24,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:25,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:26,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:27,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"},
                  {id:28,Municipio:"china", Tesorerio:"Jane Doe", domicilio:"Presidencia municipal de China,               Escobedo S/N                  C.P. 67050 China, Nuevo León                  México"}
                ]

    

  return (
    <div>




      <Box sx={{ flexGrow: 1 }}>
        
        <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>



  {
data.map(mun =>

        <Grid item xs={2} sm={4} md={4} key ={mun.id}>
            <Card >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  variant="body2"
                  gutterBottom
                >
                 Municipio: {mun.Municipio}
                </Typography>

                <Typography
                  sx={{ fontSize: 14 }}
                  variant="body2"
                  gutterBottom
                >
                 Tesorerio: {mun.Tesorerio}
                </Typography>
                <Typography variant="body2">
                 Domicilio:  {mun.domicilio}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Enviar Mensaje</Button>
              </CardActions>
            </Card>
          </Grid>

)}
          

         
        </Grid>
      </Box>
    </div>
  );
};

export default ContactoMunicipios;
