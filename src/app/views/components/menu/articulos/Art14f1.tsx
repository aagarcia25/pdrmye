import React, { useEffect, useState } from "react";
import { Box, LinearProgress, TextField, Typography } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { CustomNoRowsOverlay } from "../CustomNoRowsOverlay";
import { CustomToolbar } from "../CustomToolbar";
import { getUser } from "../../../../services/localStorage";
import { CatalogosServices } from "../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ArticulosServices } from "../../../../services/ArticulosServices";

export const Art14f1 = () => {


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
    { field: "Facturacion", headerName: "Facturación", width: 150 ,description:"BGt-2"},
    { field: "Recaudacion", headerName: "Recaudación", width: 150 ,description:"RPt-1"},
    { field: "Proporcion", headerName: "Proporcion De Recaudación", width: 200 ,description:"P=RP/BG" },
    { field: "Ponderado", headerName: "Recaudación Ponderado Por Eficiencia", width: 280 ,description:"ER=P*RP" },
    { field: "Coeficiente", headerName: "Coeficiente Efectividad Rec Predial", width: 250  ,description:"CER= ER/∑ER"},
    { field: "Poblacion", headerName: "Población", width: 150  ,description:"PO"},
    { field: "EstructuraP", headerName: "Estructura  %", width: 150  ,description:"POi/∑POi"},
    { field: "EstructuraP85", headerName: "85%", width: 150  ,description:"0.85(PO/∑PO)" },
    { field: "Km", headerName: "Territorio (Km2)", width: 150  ,description:"TE"},
    { field: "EstructuraT", headerName: "Estructura %", width: 150  ,description:"TEi/∑TEi "},
    { field: "EstructuraT15", headerName: "15%", width: 150  ,description:"0.15(TE/∑TE)"},
    { field: "Coeficientecpt", headerName: "Coeficiente  Población Y Territorio", width: 250 ,description:"CEPT=0.85(PO/∑PO)+0.15(TE/∑TE)" },
    
    { field: "a", headerName: "Población en Pobreza del Municipio i", width: 300 ,description:"PP2i" },
    { field: "b", headerName: "Población en Pobreza del Municipio i", width: 300  ,description:"PP1i"},
    { field: "c", headerName: "Incidencia de la pobreza en el Municipio i ", width: 300 ,description:"ICPi" },
    { field: "d", headerName: "Carencias promedio en situación de pobreza 2020", width: 350 ,description:"CPP1i" },
    { field: "e", headerName: "Intensidad de la pobreza en el Municipio i", width: 300  ,description:"IPi =CPP1i*ICPi"},
    { field: "f", headerName: "Coeficiente Intensidad de la pobreza en el Municipio i", width: 350 ,description:"IPi/∑IPi" },
    { field: "g", headerName: "Coeficiente Intensidad de la pobreza en el Municipio i 85%", width: 350  ,description:"80% * IPi/∑IPi"},
    { field: "h", headerName: "Eficacia en la disminución de la pobreza del Municipio i", width: 350 ,description:"EPi =PP2i/PP1i" },
    { field: "i", headerName: "Coeficiente de Eficacia en disminución de la pobreza del Municipio i", width: 300  ,description:"EPi/∑EPi"},
    { field: "j", headerName: "15% Coeficiente de Eficacia", width: 200  ,description:"20% EPi/∑EPi"},
    { field: "k", headerName: "Coeficiente  Índice Municipal De Pobreza", width: 300  ,description:"CIMP=0.85(CS2/∑CS2)+0.15(MS/∑MS)"},

    

   
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
