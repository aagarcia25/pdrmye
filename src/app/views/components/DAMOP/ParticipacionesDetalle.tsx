import { Box, Button, Dialog, DialogContent, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import MUIXDataGrid from '../MUIXDataGrid';
import { Moneda } from "../menu/CustomToolbar";
import { GridColDef } from "@mui/x-data-grid";
import { DPCPServices } from "../../../services/DPCPServices";

const ParticipacionesDetalle = (
    {
     data
    }
    :
    {
     data: any;
    }
) => {

    const [rows, setRows] = useState([]);

    const columns: GridColDef[] = [
        {field: "id",headerName: "Identificador",hide: true,width: 150,},
        { field: "Uresp",         headerName: "U. Resp.",description:"Unidad Responsable", width: 100 },
        { field: "NumProyecto",   headerName: "Clave Proyecto", description:"Clave Proyecto" ,width: 150 },
        { field: "ConceptoEgreso",headerName: "Cve. Egreso", description:"Cve. Egreso", width: 100 },
        { field: "Descripcion",   headerName: "Concepto Egreso", description:"Concepto Egreso",width: 400 },
        { field: "Retenciones",   headerName: "Retenciones", description:"Retenciones",width: 200 ,...Moneda },
        { field: "Descuentos",    headerName: "Descuentos", description:"Descuentos",width: 200 ,...Moneda},
        { field: "importe",       headerName: "Total", description:"Total",width: 200 ,...Moneda},
      ];
    

      const consulta = (data: any) => {
        DPCPServices.GetDetalleRegistro(data).then((res) => {
          if (res.SUCCESS) {
            setRows(res.RESPONSE);
          }
        });
      };

      useEffect(() => {
        consulta({ P_ID: data?.row?.id });
      }, []);
      
  return (
       <>
      <MUIXDataGrid columns={columns} rows={rows} />
      </>
  )
}

export default ParticipacionesDetalle
