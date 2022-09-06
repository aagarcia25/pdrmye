import React, { useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'
import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'
import { messages } from '../../../../component/styles'
import { CustomNoRowsOverlay } from '../CustomNoRowsOverlay'
import { CustomToolbar } from '../CustomToolbar'
import { getUser } from '../../../../services/localStorage'
import { CatalogosServices } from '../../../../services/catalogosServices'



const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   , description:messages.dataTableColum.id},
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "totalPob", headerName: "Total Población", width: 150 },
   
   
  ];



export const MunPoblacion = () => {

    const user = getUser();
    const [poblacion, setPoblacion] = useState([]);
  
    let data = ({
      NUMOPERACION: 4,
      CHID: "",
      NUMANIO: "",
      NUMTOTALPOB: "",
      CHUSER:1
    })
  
  
    useEffect(() => {
      CatalogosServices.munpoblacion (data).then((res) => {
        console.log(res);
        setPoblacion(res.RESPONSE);
      });
    }, []);






  return (


    <div style={{ height: 600, width: "100%" }} >
    <DataGrid
      checkboxSelection
      pagination
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      components={{
        Toolbar: CustomToolbar,
        LoadingOverlay: LinearProgress ,
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      rowsPerPageOptions={[5,10,20,50,100]}
      rows={poblacion}
      columns={columns}
      
     // loading //agregar validacion cuando se esten cargando los registros
    />
  </div>

  
  )
}
