import Box from "@mui/material/Box";
import PlantillaBienvenido from "./PlantillaBienvenido";

export default function Bienvenido({
  user
}:{
  user: any
}) {

 
 
  return (
    //Traer los datos por name el nombre de la persona y lastConnection la última conexión del usuario
    <>
    <Box sx={{ display: user.PERFILES[0].Referencia == "MUN" ? "block" : "none" }}>
    MUNICIPIOS
    </Box>

    <Box sx={{ display: user.PERFILES[0].Referencia == "ORG" ? "block" : "none" }}>
    MUNICIPIOS
    </Box>

    <Box sx={{ display: user.PERFILES[0].Referencia == "ADMIN" ? "block" : "none" }}>
    <PlantillaBienvenido id={1} name={user.Nombre + ' ' + user.ApellidoPaterno + ' '+ user.ApellidoMaterno} lastConnnection=""/>
    </Box>

    <Box sx={{ display: user.PERFILES[0].Referencia == "ANA" ? "block" : "none" }}>
    <PlantillaBienvenido id={1} name={user.Nombre + ' ' + user.ApellidoPaterno + ' '+ user.ApellidoMaterno} lastConnnection=""/>
    </Box>

    <Box sx={{ display: user.PERFILES[0].Referencia == "COOR" ? "block" : "none" }}>
    <PlantillaBienvenido id={1} name={user.Nombre + ' ' + user.ApellidoPaterno + ' '+ user.ApellidoMaterno} lastConnnection=""/>
    </Box>

    <Box sx={{ display: user.PERFILES[0].Referencia == "DIR" ? "block" : "none" }}>
    <PlantillaBienvenido id={1} name={user.Nombre + ' ' + user.ApellidoPaterno + ' '+ user.ApellidoMaterno} lastConnnection=""/>
    </Box>
   
   </>

  );



}


