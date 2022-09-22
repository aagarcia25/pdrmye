import React, { useEffect, useState } from 'react'
import { Box,  LinearProgress } from '@mui/material'
import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'
import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
import { currencyFormatter, CustomToolbar } from '../../CustomToolbar'
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { calculosServices } from '../../../../../services/calculosServices'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import ButtonsBack from "../../catalogos/Utilerias/ButtonsBack";



const DetalleFgp = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const handleBack = (v: any) => {
      navigate(`/inicio/participaciones/fpg`)
    };
    
    const consulta = (data: any) => {
        calculosServices.calculosInfodetalle(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Consulta Exitosa!",
            });
            setData(res.RESPONSE);
          } else {
            Alert.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      };
         
    const columns: GridColDef[] = [
      { field: "id", headerName: "Identificador", width: 150   ,hide: true},
      { field: "ClaveEstado", headerName: "ID", width: 150 , description:"Identificador del Municipio"},
      { field: "Nombre", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
      { field: "Total", headerName: "Año", width: 150 ,description:"Total"},
      ];
    
      let params = useParams();
      useEffect(() => {
        consulta({IDCALCULOTOTAL: params.id})
      }, []);



  return (
    <div>
      <Box >
        <div style={{ height: 600, width: "100%" }}>
        <ButtonsBack handleOpen={handleBack} />
          <DataGrid
            pagination
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            components={{
              Toolbar: CustomToolbar,
              LoadingOverlay: LinearProgress,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            rows={data}
            columns={columns}
          />
        </div>
      </Box>
     
    </div>
  )
}

export default DetalleFgp
