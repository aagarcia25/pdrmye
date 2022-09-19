import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, LinearProgress, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from '@mui/icons-material/Info';
import { ArticulosServices } from "../../../../../services/ArticulosServices";
import { useNavigate } from "react-router-dom";
import Imeses from "../../../../../interfaces/filtros/meses";
import { calculosServices } from "../../../../../services/calculosServices";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { BtnCalcular } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnCalcular";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";

export const Icv = () => {

  const user = getUser();

  const navigate = useNavigate();

  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);
  const [periodo, setPeriodo] = useState("1");
  const [mes, setMes] = useState("1");

  const [fondo, setFondo] = useState("ICV");
  const [meses, setMeses] = useState<Imeses[]>();

  const [Facturacion, setFacturacion] = useState([]);

  const currency = function formatomoneda() {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 4,
    });
  };

  const mesesc = () => {
    let data = {};
    CatalogosServices.meses(data).then((res) => {
      setMeses(res.RESPONSE);
    });
  };

  const handleOpen = (v: any) => {
    setstep(1);
  };

  const handleClose = (v: any) => {
    setstep(0);
  };

  const handleChangePeriodo = (event: SelectChangeEvent) => {
    setPeriodo(event.target.value);
  };

  const handleChangeMes = (event: SelectChangeEvent) => {
    setMes(event.target.value);
  };

  const handleEdit = (v: any) => {
    console.log(v);
    navigate(`/inicio/participaciones/icvd/${v.row.id}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   ,hide: true},
    { field: "Municipio", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    { field: "Recaudacion", headerName: "Año", width: 150 ,description:"BGt-2"},
    { field: "Recaudacion", headerName: "Mes", width: 150 ,description:"RPt-1"},
    { field: "Proporcion", headerName: "Monto", width: 200 ,description:"P=RP/BG" },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Ver detalle de Cálculo">
            <IconButton onClick={() => handleEdit(v)}>
              <InfoIcon />
            </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },   
  ];

  const consulta = (data: any) => {
    calculosServices.calculosInfo(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setdata(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    mesesc();
    consulta({ FONDO: fondo });
    ArticulosServices.articulof1(data).then((res) => {
      console.log(res);
      setFacturacion(res.RESPONSE);
    });
  }, []);

  const AgregarCalculo = () => {
    return (
      <Grid container spacing={3}>
        <BtnCalcular onClick={handleClose} />
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
        <AgregarCalculo />
      </div>
    </Box>
  </>
  );
};

