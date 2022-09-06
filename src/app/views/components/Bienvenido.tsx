import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Inicio from "../components/Inicio";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLOR } from "../../styles/colors";
import PersonIcon from "@mui/icons-material/Person";
import PlantillaBienvenido from "./PlantillaBienvenido";

export default function Bienvenido() {
  return (
    //Traer los datos por name el nombre de la persona y lastConnection la última conexión del usuario
    <PlantillaBienvenido id={1} name="Cesar Rivera" lastConnnection="Última Conexión 27 de Julio del 2022"/>
  );
}
