
import React, { useEffect, useState } from "react";
import { AppBar, Box, Button, LinearProgress, Step, StepButton, StepLabel, Stepper, Tab, Tabs, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ArticulosServices } from "../../../../../services/ArticulosServices";




interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}





export const Fpg = () => {


  

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



const [value, setValue] = useState(0);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};


  return (




    <Box sx={{ }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Generar Cálculo" {...a11yProps(0)} />
          <Tab label="Visualizar Cálculo" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
     
        <TabPanel value={value} index={0} >
          Generar Cálculo
        </TabPanel>
        <TabPanel value={value} index={1} >

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




        </TabPanel>
       
      
    </Box>

  
 
  );
};
