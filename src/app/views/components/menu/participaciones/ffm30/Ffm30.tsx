import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Input,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ArticulosServices } from "../../../../../services/ArticulosServices";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";
import { styled } from "@mui/material/styles";
import CalculateIcon from "@mui/icons-material/Calculate";
import { COLOR } from "../../../../../styles/colors";

export const Ffm30 = () => {
  const user = getUser();
  const [Facturacion, setFacturacion] = useState([]);

  const [step, setstep] = useState(0);

  const [calculo, setCalculo] = useState("1");
  const calculoData = [
    {
      id: 1,
      valor: "MENSUAL",
    },
    {
      id: 2,
      valor: "AJUSTE",
    },
    {
      id: 3,
      valor: "1er AJUSTE CUATRIMESTRAL",
    },
    {
      id: 4,
      valor: "2do AJUSTE CUATRIMESTRAL",
    },
    {
      id: 5,
      valor: "3er AJUSTE CUATRIMESTRAL",
    },
    {
      id: 6,
      valor: "AJUSTE DEFINITIVO",
    },
    {
      id: 7,
      valor: "COMPENSACIONES FEIEF",
    },
    {
      id: 8,
      valor: "RETENCIONES FEIEF",
    },
  ];

  const calculoMenuItems = calculoData.map((item) => (
    <MenuItem value={item.id}>{item.valor}</MenuItem>
  ));

  const handleOpen = (v: any) => {
    setstep(1);
  };

  const handleClose = (v: any) => {
    setstep(0);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCalculo(event.target.value);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    {
      field: "Municipio",
      headerName: "Municipio",
      width: 150,
      description: "Nombre del Municipio",
    },
    {
      field: "Recaudacion",
      headerName: "Año",
      width: 150,
      description: "BGt-2",
    },
    {
      field: "Recaudacion",
      headerName: "Mes",
      width: 150,
      description: "RPt-1",
    },
    {
      field: "Proporcion",
      headerName: "Monto",
      width: 200,
      description: "P=RP/BG",
    },
  ];

  let data = {
    NUMOPERACION: 4,
    CHID: "",
    NUMANIO: "",
    NUMTOTALPOB: "",
    CHUSER: 1,
  };

  useEffect(() => {
    ArticulosServices.articulof1(data).then((res) => {
      console.log(res);
      setFacturacion(res.RESPONSE);
    });
  }, []);

  const Details = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography sx={{ mb: 3, fontWeight: "Bold" }}>
            Fondo Fomento Municipal 30%
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "start" }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Regresar
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mb: 5, display: "flex", justifyContent: "start" }}
        >
          <Typography sx={{ ml: 20, fontWeight: "Bold" }}>
            Ingrese año y mes de carga
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontWeight: "Bold" }}>Año:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input placeholder="2022"></Input>
        </Grid>
        <Grid item xs={6}>
          <Item hidden>Fin de anio</Item>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontWeight: "Bold" }}>Mes:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input placeholder="DICIEMBRE"></Input>
        </Grid>
        <Grid item xs={6}>
          <Item hidden>Fin de mes</Item>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontWeight: "Bold" }}>Monto:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input placeholder="1,200,300"></Input>
        </Grid>
        <Grid item xs={6}>
          <Item hidden>Fin de monto</Item>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "Bold" }}>Cálculo:</Typography>
        </Grid>
        <Grid item xs={1.6} sx={{}}>
          <Select
            fullWidth
            value={calculo}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {calculoMenuItems}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Item hidden>Espacio5</Item>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        >
          <IconButton
            sx={{
              borderRadius: 1,
              border: 1,
              bgcolor: COLOR.negro,
              color: COLOR.blanco,
              "&:hover": {
                bgcolor: COLOR.blanco,
                color: COLOR.negro,
              },
            }}
          >
            <CalculateIcon />
            Calcular
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Box sx={{ display: step == 0 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <ButtonsCalculo handleOpen={handleOpen} />
          <DataGrid
            //checkboxSelection
            pagination
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            components={{
              Toolbar: CustomToolbar,
              LoadingOverlay: LinearProgress,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            rows={Facturacion}
            columns={columns}
          />
        </div>
      </Box>
      <Box sx={{ display: step == 1 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <Details />
        </div>
      </Box>
    </>
  );
};
