import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  esES,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Layout from "../layout/Layout";
import {  messages } from '../component/styles';
import { getUser } from "../services/localStorage";
import { useEffect, useState } from "react";
import { Notificaciones } from "../services/catalogosServices";



const columns: GridColDef[] = [
  { field: "id", headerName: "Identificador", width: 150   , description:messages.dataTableColum.id},
  { field: "FechaCreacion", headerName: "Fecha Creación", width: 200 },
  { field: "UMNAME", headerName: "Modificado por", width: 150 },
  { field: "UCNAME", headerName: "Creado por", width: 150 },
  { field: "Descripcion", headerName: "Descripción", width: 150 },
  { field: "UDNAME", headerName: "Destinatario", width: 150 },
 
];

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
        <ErrorOutlineOutlinedIcon />
      <Box sx={{ mt: 1 }}>Sin Registros para mostrar</Box>
    </StyledGridOverlay>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


const ListNotificacion = () => {
  const user = getUser();
  const [notificacion, setNotificacion] = useState([]);

  let data = ({
    CHID: 1,
    NUMOPERACION: 4,
    DESCRIPCION: "",
    DESTINATARIO: "",
    MODIFICADOPOR: "",
    CREADOPOR: "",
    DELETED: ""
   
  })


  useEffect(() => {
    Notificaciones(data).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  }, []);


  return (
    <Layout>
    {/* <div style={{ height: 300, width: "100%" }}> */}
    <div style={{ height: 900, width: "100%" }} >
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
        rows={notificacion}
        columns={columns}
        
       // loading //agregar validacion cuando se esten cargando los registros
      />
    </div>
    </Layout>
  );
};

export default ListNotificacion;
