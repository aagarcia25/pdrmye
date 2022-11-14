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
import { Alert } from "../../../helpers/Alert";
import { Toast } from "../../../helpers/Toast";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getUser } from "../../../services/localStorage";

const ContactoMunicipios = () => {

  const user: RESPONSE = JSON.parse(String(getUser()));

  const [dato, setDato] = useState<Array<IData>>([])

  const [mostrar,setMostrar]=useState(false)

  const formData = new FormData();

  useEffect(() => {
    consulta()
    console.log(dato);
    setMostrar(true);
  }, [])


  const consulta = () => {
    formData.append("NUMOPERACION", "5");
    formData.append("IDMUNICIPIO", "6bcf4613-3f7f-11ed-af5a-040300000000");
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
        Alert.fire({
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
            mostrar?dato?.map((registro, x) =>

            <Grid item xs={2} sm={4} md={4} key={x}>
              <Card >
                <CardContent>
                  <Box sx={{width:"100%",}}>
                    <img src={user.RutaFoto} style={{ objectFit: "scale-down", }} />
                    </Box>
                
                  <Typography
                    sx={{ fontSize: 14 }}
                    variant="body2"
                    gutterBottom
                  >
                    Municipio: {registro?.Municipio}
                  </Typography>

                  <Typography
                    sx={{ fontSize: 14 }}
                    variant="body2"
                    gutterBottom
                  >
                    Tesorerio: {registro?.Responsable}
                  </Typography>
                  <Typography variant="body2">
                    Domicilio:  {registro?.Domicilio}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Enviar Mensaje</Button>
                </CardActions>
              </Card>
            </Grid>
          ):null
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
