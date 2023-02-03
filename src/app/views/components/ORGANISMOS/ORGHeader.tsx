import {
    Box,
    Button,
    createTheme,
    Grid,
    IconButton,
    Link,
    ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
  } from "@mui/material";
  import clsx from "clsx";
  import React, { useEffect, useState } from "react";
  import SelectValues from "../../../interfaces/Select/SelectValues";
  import { CatalogosServices } from "../../../services/catalogosServices";
  import SelectFrag from "../Fragmentos/SelectFrag";
  import SendIcon from "@mui/icons-material/Send";
  import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
  import { AlertS } from "../../../helpers/AlertS";
  import { Moneda, currencyFormatter } from "../menu/CustomToolbar";
  import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
  import { getPermisos, getUser } from "../../../services/localStorage";
  import { DPCPServices } from "../../../services/DPCPServices";
  import { Toast } from "../../../helpers/Toast";
  import Slider from "../Slider";
  import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
  import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
  import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
  import AccountTreeIcon from "@mui/icons-material/AccountTree";
  import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
  import CallMergeIcon from "@mui/icons-material/CallMerge";
  import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
  import InfoIcon from "@mui/icons-material/Info";
  import {
    DataGrid,
    GridSelectionModel,
    GridToolbar,
    esES as gridEsES,
  } from "@mui/x-data-grid";
  import { esES as coreEsES } from "@mui/material/locale";
  import Swal from "sweetalert2";
  import { DAMOPServices } from "../../../services/DAMOPServices";
  import ModalDAMOP from "../componentes/ModalDAMOP";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
  import ModalForm from "../componentes/ModalForm";
  import AddIcon from "@mui/icons-material/Add";
  import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
  import EditOffIcon from "@mui/icons-material/EditOff";
  import ThumbUpIcon from "@mui/icons-material/ThumbUp";
  import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
  import ArticleIcon from "@mui/icons-material/Article";
  import SpeisAdmin from "../DAF/SpeisAdmin";
  
  import LoopIcon from "@mui/icons-material/Loop";
  import MenuBookIcon from "@mui/icons-material/MenuBook";
  import MoneyIcon from "@mui/icons-material/Money";
  import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
  import LocalAtmIcon from "@mui/icons-material/LocalAtm";
  import { ModalCheque } from "../componentes/ModalCheque";
  import { ORGService } from "../../../services/ORGService";
  import ButtonsCalculo from "../menu/catalogos/Utilerias/ButtonsCalculo";

export const ORGHeader = ({
    idrow,
  }: {
    idrow: string;
  }) => {
  const theme = createTheme(coreEsES, gridEsES);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [slideropen, setslideropen] = useState(false);//cambiar a true
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [sumaTotal, setSumaTotal] = useState<Number>();
  const [openModalDetalle, setOpenModalDetalle] = useState<boolean>(false);
  const [vrows, setVrows] = useState<{}>("");


  const handleClose = () => {
    setOpenModalDetalle(false);
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenModalDetalle(true);
  };


  return (
    <div>
    <Slider open={slideropen}></Slider>

    {openModalDetalle ? (
      <ModalForm title={"Detalle de Solicitud"} handleClose={handleClose}>
        <ORGHeader idrow={""}           />
      </ModalForm>
    ) : (
      ""
    )}  



    <Grid container spacing={1} padding={0}>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
          <Tooltip title="Agregar Registro">
            <ToggleButton value="check" onClick={() => handleDetalle({})} >
              <AddIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <div
          style={{
            height: "58vh",
            width: "100%",
          }}
        >
          {/* <ThemeProvider theme={theme}>
            <DataGrid
            //  columns={columnsParticipaciones}
            //  rows={data}
              density="compact"
              rowsPerPageOptions={[10, 25, 50, 100, 200, 300, 400]}
              disableSelectionOnClick
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              getRowHeight={() => "auto"}
              components={{ Toolbar: GridToolbar }}
              sx={{
                fontFamily: "Poppins,sans-serif",
                fontWeight: "600",
                "& .super-app.negative": {
                  color: "rgb(84, 3, 3)",
                  backgroundColor: "rgb(196, 40, 40, 0.384)",
                },
                "& .super-app.positive": {
                  backgroundColor: "rgb(16, 145, 80, 0.567)",
                },
              }}
              componentsProps={{
                toolbar: {
                  label: "buscar",
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              checkboxSelection
              onSelectionModelChange={(newSelectionModel: any) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              localeText={{
                noRowsLabel: "No se ha encontrado datos.",
                noResultsOverlayLabel: "No se ha encontrado ningún resultado",
                toolbarColumns: "Columnas",
                toolbarExport: "Exportar",
                toolbarColumnsLabel: "Seleccionar columnas",
                toolbarFilters: "Filtros",
                toolbarFiltersLabel: "Ver filtros",
                toolbarFiltersTooltipHide: "Quitar filtros",
                toolbarFiltersTooltipShow: "Ver filtros",
                toolbarQuickFilterPlaceholder: "Buscar",
              }}
            />
          </ThemeProvider> */}
        </div>
      </Grid>
    </Grid>
 
 
 
  </div>
  )
}
