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
    
    /*{ field: "Nombre", headerName: "Personas En Pobreza 2015", width: 150 ,description:"PP2i" },
    { field: "Nombre", headerName: "Personas En Pobreza 2020", width: 150  ,description:"PP1i"},
    { field: "Nombre", headerName: "Carencias Promedio En Situacion De Pobreza 2015", width: 150 ,description:"CPP1i" },
    { field: "Nombre", headerName: "Incidencia De La Pobreza 2015", width: 150 ,description:"ICPi=(PP1i/∑PP1i)" },
    { field: "Nombre", headerName: "Intensidad De La Pobreza", width: 150  ,description:"IP=(ICPi*CPP!i)"},
    { field: "Nombre", headerName: "Proporción De Intensidad De La Pobreza", width: 150 ,description:"IP/∑IP" },
    { field: "Nombre", headerName: "Distribucion Del 85% Por Pobreza ", width: 150  ,description:"(0.85*IP/∑IP)(Monto)"},
    { field: "Nombre", headerName: "Mejora En Pobreza Municipal", width: 150 ,description:"EP=PP2i/PP1i" },
    { field: "Nombre", headerName: "Proporción De La Eficacia En Pobreza", width: 150  ,description:"EP/∑EP"},
    { field: "Nombre", headerName: "Distribución Del 15% Por Eficacia De Pobreza ", width: 150  ,description:"(0.15*(EP/∑EP)(Monto)"},
    { field: "Nombre", headerName: "Distribución Por Índice De Pobreza", width: 150  ,description:"DIPi"},
    { field: "Nombre", headerName: "Coeficiente  Índice Municipal De Pobreza", width: 150  ,description:"CDPEi"},
*/
    

   
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
