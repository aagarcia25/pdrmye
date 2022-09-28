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
import { useNavigate } from "react-router-dom";
import ButtonsBack from "../../catalogos/Utilerias/ButtonsBack";


//interface Props{
//    id? :  string
//   }

const DetalleIepsgyd = () => {

    const user = getUser();
    const navigate = useNavigate();
    const [modo, setModo] = useState("");
    const [open, setOpen] = useState(false);
    const [slideropen, setslideropen] = useState(false);
    const [vrows, setVrows] = useState({});
    const [data, setData] = useState([]);

    const handleBack = (v: any) => {
      navigate(`/inicio/participaciones/iepsgyd`)
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
        { field: "Municipio", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
        { field: "Recaudacion", headerName: "Año", width: 150 ,description:"BGt-2"},
        { field: "Recaudacion", headerName: "Mes", width: 150 ,description:"RPt-1"},
        { field: "Proporcion", headerName: "Monto", width: 200 ,description:"P=RP/BG" },
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

export default DetalleIepsgyd
