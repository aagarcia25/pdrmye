import React, { useEffect, useState } from 'react'
import { Details } from '@mui/icons-material'
import { Box, IconButton, LinearProgress } from '@mui/material'
import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'
import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
import { currencyFormatter, CustomToolbar } from '../../CustomToolbar'
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getUser } from '../../../../../services/localStorage'
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { calculosServices } from '../../../../../services/calculosServices'
import { useParams } from 'react-router-dom'


//interface Props{
//    id? :  string
//   }

const DetalleFgp = () => {

    const user = getUser();
    const [modo, setModo] = useState("");
    const [open, setOpen] = useState(false);
    const [slideropen, setslideropen] = useState(false);
    const [vrows, setVrows] = useState({});
    const [data, setData] = useState([]);


    
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
        { field: "id", headerName: "Identificador", width: 150, hide: true },
        {
          field: "ClaveEstado",
          headerName: "ClaveEstado",
          width: 150,
          description: "Clave de Estado",
        },
        {
          field: "Nombre",
          headerName: "Municipio",
          width: 300,
          description: "Municipio",
        },
       

        {
          field: "Total",
          headerName: "Total",
          width: 200,
          description: "Total",
          ...currencyFormatter
        },
    
      
    
    
      ];
    


      let params = useParams();
      useEffect(() => {
        consulta({IDCALCULOTOTAL: params.id})
      }, []);


  return (
    <div>
      <Box >
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
            rows={data}
            columns={columns}
          />
        </div>
      </Box>
     
    </div>
  )
}

export default DetalleFgp
