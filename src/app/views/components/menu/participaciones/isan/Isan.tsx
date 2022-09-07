import React, { useEffect, useState } from "react";
import { Box, LinearProgress, TextField, Typography } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ArticulosServices } from "../../../../../services/ArticulosServices";

export const Isan = () => {


  const currency = function formatomoneda() {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 4,
    });
  };

  const user = getUser();
  const [Facturacion, setFacturacion] = useState([]);

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

  return (
    <div style={{ height: 600, width: "100%" }}>
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

        // loading //agregar validacion cuando se esten cargando los registros
      />
    </div>
  );
};
