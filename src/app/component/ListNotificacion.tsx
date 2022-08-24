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
import { colores } from '../component/styles';


const rows: GridRowsProp = [
     { id: 1, col1: "Hello", col2: "World" },
     { id: 2, col1: "DataGridPro", col2: "is Awesome" },
     { id: 3, col1: "MUI", col2: "is Amazing" },
     { id: 4, col1: "Hello", col2: "World" },
     { id: 5, col1: "DataGridPro", col2: "is Awesome" },
     { id: 6, col1: "MUI", col2: "is Amazing" },
     { id: 7, col1: "Hello", col2: "World" },
     { id: 8, col1: "DataGridPro", col2: "is Awesome" },
     { id: 9, col1: "MUI", col2: "is Amazing" },
     { id: 10, col1: "Hello", col2: "World" },
     { id: 11, col1: "DataGridPro", col2: "is Awesome" },
     { id: 12, col1: "MUI", col2: "is Amazing" },
     { id: 13, col1: "Hello", col2: "World" },
     { id: 14, col1: "DataGridPro", col2: "is Awesome" },
     { id: 15, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Columna 1", width: 150 },
  { field: "col2", headerName: "columna 2", width: 150 },
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
  return (
    <Layout>
    {/* <div style={{ height: 300, width: "100%" }}> */}
    <div style={{ backgroundColor : colores.blanco}}>
      <DataGrid
        pagination
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress ,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        rowsPerPageOptions={[5,10,20,50,100]}
        rows={rows}
        columns={columns}
       // loading //agregar validacion cuando se esten cargando los registros
      />
    </div>
    </Layout>
  );
};

export default ListNotificacion;
