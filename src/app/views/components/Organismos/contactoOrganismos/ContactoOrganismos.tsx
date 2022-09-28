import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const ContactoOrganismos = () => {
 
    const data = [{id:1,Municipio:"ICIFED",Tesorerio: "Javier Fidencio Martínez Lankenau", domicilio:" Av Raúl Rangel Frías 4700, Valle de Las Mitras, 64300 Monterrey, N.L."},
                  {id:2,Municipio:"Colegio Militarizado General Mariano Escobedo", Tesorerio:"Director General", domicilio:"Prol. Aztlán No. 9610            Col. San Bernabé, VIII Sector                Monterrey, Nuevo León               CP 64350"},
                  {id:3,Municipio:"Instituto de Capacitación y Educación para el Trabajo del Estado de Nuevo León (ICET)", Tesorerio:"Jane Doe", domicilio:"Calle Félix U. Gómez 750 Norte      Col. Centro          Monterrey, Nuevo León    CP 64000"},
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
                 Organismo: {mun.Municipio}
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
}

export default ContactoOrganismos
