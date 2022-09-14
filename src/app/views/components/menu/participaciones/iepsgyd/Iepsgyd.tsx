import React, { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, MenuItem, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ArticulosServices } from "../../../../../services/ArticulosServices";
import { Titulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import { BtnRegresar } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import { SubTitulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
import { FormTextField } from "../../catalogos/Utilerias/AgregarCalculoUtil/FormTextField";
import { FormSelectedField } from "../../catalogos/Utilerias/AgregarCalculoUtil/FormSelectField";
import { BtnCalcular } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnCalcular";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";

export const Iepsgyd = () => {

  const user = getUser();

  const [step, setstep] = useState(0);

  const [periodo, setPeriodo] = useState("1");

  const [Facturacion, setFacturacion] = useState([]);

  const periodoData = [
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


  const periodoMenuItems = periodoData.map((item) => (
    <MenuItem value={item.id}>{item.valor}</MenuItem>
  ));

  const handleOpen = (v: any) => {
    setstep(1);
  };

  const handleClose = (v: any) => {
    setstep(0);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPeriodo(event.target.value);
  };

  const currency = function formatomoneda() {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 4,
    });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   ,hide: true},
    { field: "Municipio", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    { field: "Recaudacion", headerName: "Año", width: 150 ,description:"BGt-2"},
    { field: "Recaudacion", headerName: "Mes", width: 150 ,description:"RPt-1"},
    { field: "Proporcion", headerName: "Monto", width: 200 ,description:"P=RP/BG" },
   
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
      <Grid container spacing={3}>
        <Titulo name="Impuesto sobre la Venta Final de Gasolinas y Diesel"></Titulo>
        <BtnRegresar onClick={handleClose}/>
        <SubTitulo/>
        <FormTextField id={1} text="Año" inputPlaceholder="2022"/>
        <FormTextField id={2} text="Mes" inputPlaceholder="DICIEMBRE"/>
        <FormTextField id={3} text="Monto" inputPlaceholder="1,200,199"/>
        <FormSelectedField id={1} text="Periodo" value={periodo} onChange={handleChange} items={periodoMenuItems}/>
        <BtnCalcular onClick={handleClose}/>
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
