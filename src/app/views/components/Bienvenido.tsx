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

export default function Bienvenido() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOR.blanco,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "85%",
          height: "60%",
          backgroundColor: COLOR.grisTarjetaBienvenido,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: COLOR.grisTarjetaBienvenido,
            width: "40%",
            height: "80%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "5%",
            }}
          ></Box>
          <Box
            sx={{
              width: "100%",
              height: "35%",
            }}
          >
            <PersonIcon sx={{ width:"100%", height:"100%", color: COLOR.blanco }} />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "15%",
            }}
          >
            <Typography variant="h2">BIENVENIDO</Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "15%",
            }}
          >
            <Typography variant="h4">Cesar Rivera</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "15%",
              backgroundColor: COLOR.grisTarjetaBienvenido,
            }}
          ></Box>
          <Box
            sx={{
              width: "100%",
              height: "15%",
            }}
          >
            <Typography variant="h6">
              Última Conexión 27 de Julio del 2022
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
