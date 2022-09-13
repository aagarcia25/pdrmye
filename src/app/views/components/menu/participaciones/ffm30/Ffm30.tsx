import React, { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ArticulosServices } from "../../../../../services/ArticulosServices";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";
import { styled } from '@mui/material/styles';

export const Ffm30 = () => {
  const user = getUser();
  const [Facturacion, setFacturacion] = useState([]);

  const [step, setstep] = useState(0);

  const handleOpen = (v: any) => {
    setstep(1);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
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
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
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
          <Details/>
        </div>
      </Box>
    </>
  );
};
