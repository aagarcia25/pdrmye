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
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import SendIcon from "@mui/icons-material/Send";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { AlertS } from "../../../helpers/AlertS";
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
import Swal from "sweetalert2";
import ModalCalculos from "../componentes/ModalCalculos";
import { DAMOPServices } from "../../../services/DAMOPServices";

const Participaciones = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  //MODAL
  const [openModal, setOpenModal] = useState<boolean>(false);
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [fondos, setFondos] = useState<SelectValues[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tipos, setTipos] = useState<SelectValues[]>([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [vrows, setVrows] = useState<{}>("");
  //Constantes de los filtros
  const [idtipo, setIdTipo] = useState("");
  const [idFondo, setIdFondo] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));


  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "Anio",
      headerName: "Año",
      width: 100,
      description: "Año",
    },
    {
      field: "Mes",
      headerName: "Mes",
      width: 100,
      description: "Mes",
    },
    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      width: 100,
      description: "Clave Estado",
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      width: 150,
      description: "Municipio",
    },
    {
      field: "Clave",
      headerName: "Fondo",
      width: 150,
      description: "Fondo",
    },
    {
      field: "fondodes",
      headerName: "Descripción de Fondo",
      width: 250,
    },
    {
      field: "tipocalculo",
      headerName: "Tipo Cálculo",
      width: 150,
    },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 200,
    },
    {
      field: "ClavePresupuestal",
      headerName: "Clave Presupuestal",
      width: 600,
      hide: false,
    },
    {
      field: "total",
      headerName: "Importe",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
  ];

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion == 12) {
        setFondos(res.RESPONSE);
      } else if (operacion == 5) {
        setMunicipios(res.RESPONSE);
      }  else if (operacion == 17) {
        setTipos(res.RESPONSE);
        setslideropen(false);
      }
    });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleFilterChange1 = (v: string) => {
    setIdTipo(v);
  };

  const handleFilterChange2 = (v: string) => {
    setIdFondo(v);
  };

  const handleFilterChange3 = (v: string) => {
    setidMunicipio(v);
  };


  const Fnworkflow = (data: string) => {
    console.log(data);

    let obj = {
      NUMOPERACION:1,
      OBJS: selectionModel,
      CHUSER: user.id,
      COMENTARIO:data,
      ESTATUS:'DPCP_INICIO'
    
    };
    console.log(obj);

    DAMOPServices.PA(obj).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        handleClick();
        handleClose();
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };



  const SolicitudOrdenPago = () => {
    console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");
    console.log(selectionModel);
    //setOpenModal(true);

    Swal.fire({
      icon: "warning",
      title:"Solicitar",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {
          TIPO:1,
          OBJS: selectionModel,
          CHUSER:user.id
      };
console.log(data);
          // CatalogosServices.BitacoraAjustes({
          //     NUMOPERACION: v == "autorizar" ? 2 : 3,
          //     CHID: idCambio,
          //     CHUSER: user.id,
          //     COMENTARIO: comentario
          // }).then((res) => {
          //     if (res.SUCCESS) {
          //         console.log(res.RESPONSE)
          //         handleClose();
          //     } else {

                  AlertS.fire({
                      title: "Solicitud Enviada",
                      icon: "success",

                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      handleClick();
            
                              
                    }
                    
                });
                
             // }
        //  });
      }
      
  });


  };

  const handleClick = () => {
    console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");

    let data = {
      P_FONDO: idFondo == "false" ? "" : idFondo,
      P_IDMUNICIPIO: idMunicipio == "false" ? "" : idMunicipio,
      P_IDTIPO: idtipo == "false" ? "" : idtipo,
    };
    console.log(data);
    DPCPServices.GetParticipaciones(data).then((res) => {
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
    });
  };

  useEffect(() => {
    loadFilter(12);
    loadFilter(5);
    loadFilter(17);
    handleClick();
  }, []);

  return (
    <div>
      <Slider open={slideropen}></Slider>

      {openModal ? (
        <ModalCalculos
          tipo={"Comentarios"}
          handleClose={handleClose}
          handleAccion={Fnworkflow}
        />
      ) : (
        ""
      )}
      
      <Grid container spacing={1}>
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} sx={{ textAlign: "center" }}>
              <Typography>
                <h1>
                  Generación de Solicitudes de Participaciones y Aportaciones
                </h1>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Tipo:
            </Typography>
            <SelectFrag
              value={idtipo}
              options={tipos}
              onInputChange={handleFilterChange1}
              placeholder={"Seleccione Tipo"}
              label={""}
              disabled={false}
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Fondo:
            </Typography>
            <SelectFrag
              value={idFondo}
              options={fondos}
              onInputChange={handleFilterChange2}
              placeholder={"Seleccione Fondo"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Municipio:
            </Typography>
            <SelectFrag
              value={idMunicipio}
              options={municipio}
              onInputChange={handleFilterChange3}
              placeholder={"Seleccione Municipio"}
              label={""}
              disabled={false}
            />
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
            <Tooltip title={"Solicitar Suficiencia Presupuestal"}>
              <ToggleButton value="check" onClick={() => setOpenModal(true)}>
                <AttachMoneyIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title={"Generar Solicitud"}>
            <ToggleButton value="check" onClick={() => SolicitudOrdenPago()}>
              <SettingsSuggestIcon />
            </ToggleButton>
          </Tooltip>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div
            style={{
              height: "60vh",
              width: "100%",
            }}
          >
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
                getRowHeight={() => "auto"}
                components={{ Toolbar: GridToolbar }}
                sx={{ fontFamily: "Poppins,sans-serif" }}
                componentsProps={{
                  toolbar: {
                    label: "buscar",
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
                  toolbarExport: "Exportar",
                  toolbarColumnsLabel: "Seleccionar columnas",
                  toolbarFilters: "Filtros",
                  toolbarFiltersLabel: "Ver filtros",
                  toolbarFiltersTooltipHide: "Quitar filtros",
                  toolbarFiltersTooltipShow: "Ver filtros",
                  toolbarQuickFilterPlaceholder: "Buscar",
                }}
              />
            </ThemeProvider>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Participaciones;
