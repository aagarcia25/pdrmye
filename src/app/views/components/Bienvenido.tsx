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
import {COLOR} from "../../styles/colors";

export default function Bienvenido() {
  return (
    
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: COLOR.blanco,
          justifyContent: "center",
          alignItems: "center",
          display:"flex"
        }}
      >
        <Box
          sx={{
            width: "75%",
            height: "60%",
            backgroundColor: COLOR.grisTarjetaBienvenido,
            justifyContent: "center",
            display:"flex"
          }}
        >
          <Grid sx={{
            justifyContent: "center",
          }}>

            <Typography>Texto 1</Typography>
            <Typography>Texto 1</Typography>
            <Typography>Texto 1</Typography>
            <Typography>Texto 1</Typography>
          </Grid>
        </Box>
      </Box>
    
  );
}
