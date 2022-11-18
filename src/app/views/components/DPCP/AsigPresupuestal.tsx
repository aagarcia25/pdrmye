import {
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Moneda } from "../menu/CustomToolbar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import { DPCPServices } from "../../../services/DPCPServices";
import { Toast } from "../../../helpers/Toast";
import Slider from "../Slider";
import {
  DataGrid,
  GridSelectionModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import ModalPresupuesto from "./ModalPresupuesto";
import { AlertS } from "../../../helpers/AlertS";

const AsigPresupuestal = () => {

  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  //MODAL
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [vrows, setVrows] = useState<{}>("");


  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));

  const agregarPresupuesto = (data: any) => {
    setVrows(data);
    setOpenModal(true);
  };

  
  const columnsParticipaciones = [
    { field: "id", headerName: "Identificador", width: 100, hide: true },
    {field: "Anio",headerName: "Año",width: 150,description: "Año",},
    {field: "Mes",      headerName: "Mes",      width: 250,      description: "Mes",    },
    {field: "ClaveEstado",      headerName: "Clave Estado",      width: 150,      description: "Clave Estado",    },
    {field: "Nombre",      headerName: "Municipio",      width: 150,      description: "Municipio",    },
    {field: "Clave",      headerName: "Fondo",      width: 150,      description: "Fondo",    },
    {field: "ClavePresupuestal", headerName: "Clave Presupuestal", width: 600, hide: false },
    {field: "total",      headerName: "Importe",      width: 150,      description: "Importe",      ...Moneda,    },

  ];



  const handleClose = () => {
    setOpenModal(false);
  };

  const Fnworkflow = () => {
    //setIdFondo(v);
  };



  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const FinalizarProceso = () => {
    console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");
    console.log(selectionModel);
    setOpenModal(true);
  };

  const AsignarPresupuesto = () => {
    console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");
    console.log(selectionModel);
    setOpenModal(true);
  };

  const handleClick = () => {
    DPCPServices.GetPartFedv2(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
      setslideropen(false);
    });
  };
  

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div>
      <Slider open={slideropen}></Slider>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
      
        <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography>
            <h1>  Módulo de Validación de Presupuesto</h1>
          </Typography>
        </Grid>
      </Grid>
      </Grid>
     
    



        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Button
            onClick={handleClick}
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
          >
            Buscar
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ToggleButtonGroup>
            <Tooltip title={"Asignar Presupuesto"}>
              <ToggleButton value="check" onClick={() => AsignarPresupuesto()}>
                <AttachMoneyIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>

       

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={{ height: "60vh", width: "100%" }}>
            <ThemeProvider theme={theme}>
        <DataGrid
        columns={columnsParticipaciones}
        rows={data}
        density="compact"
        rowsPerPageOptions={[10, 25, 50, 100]}
        disableSelectionOnClick 
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        getRowHeight={() => 'auto'}
        components={{ Toolbar: GridToolbar }}
        sx={{ fontFamily: "Poppins,sans-serif"}}
        componentsProps={{
          toolbar: {
            label:"buscar",
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}  
        checkboxSelection={checkboxSelection}
        onSelectionModelChange={(newSelectionModel: any) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        localeText={{
          noRowsLabel: "No se ha encontrado datos.",
          noResultsOverlayLabel: "No se ha encontrado ningún resultado",
          toolbarColumns: "Columnas",
          toolbarExport:"Exportar",
          toolbarColumnsLabel: "Seleccionar columnas",
          toolbarFilters: "Filtros",
          toolbarFiltersLabel: "Ver filtros",
          toolbarFiltersTooltipHide: "Quitar filtros",
          toolbarFiltersTooltipShow: "Ver filtros",
          toolbarQuickFilterPlaceholder:"Buscar",
          
      }}
       
      />
            </ThemeProvider>
          </div>
        </Grid>
      </Grid>

      {/* MODALES */}

      {openModal ? (
        <ModalPresupuesto
          handleClose={handleClose}
          vrows={vrows}
          handleAccion={Fnworkflow}
        ></ModalPresupuesto>
      ) : (
        ""
      )}
    </div>
  );
};

export default AsigPresupuestal;
