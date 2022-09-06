import PlantillaBienvenido from "./PlantillaBienvenido";

export default function Bienvenido() {
  return (
    //Traer los datos por name el nombre de la persona y lastConnection la última conexión del usuario
    <PlantillaBienvenido id={1} name="Cesar Rivera" lastConnnection="Última Conexión 27 de Julio del 2022"/>
  );
}
