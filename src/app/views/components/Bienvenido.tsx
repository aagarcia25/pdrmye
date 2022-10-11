import { useLayoutEffect } from "react";
import { RESPONSE } from "../../interfaces/user/UserInfo";
import { getUser } from "../../services/localStorage";
import PlantillaBienvenido from "./PlantillaBienvenido";

export default function Bienvenido({
  user
}:{
  user: any
}) {

 
 
  return (
    //Traer los datos por name el nombre de la persona y lastConnection la última conexión del usuario
    <PlantillaBienvenido id={1} name={user.Nombre + ' ' + user.ApellidoPaterno + ' '+ user.ApellidoMaterno} lastConnnection=""/>
  );



}


