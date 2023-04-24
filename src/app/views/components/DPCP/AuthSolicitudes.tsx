import {
  Button,
  createTheme,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import clsx from 'clsx';
import React, { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import SendIcon from "@mui/icons-material/Send";
import { AlertS } from "../../../helpers/AlertS";
import { Moneda, currencyFormatter } from "../menu/CustomToolbar";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Swal from "sweetalert2";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
const AuthSolicitudes = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  const [numOrdenPago, setNumOrdenPago] = useState("");
  //MODAL
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
  const [sumaTotal, setSumaTotal] = useState<Number>();
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const handleDescuento = (data: any) => { };

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "a2",
      headerName: "Estatus",
      width: 150,
      description: "Estatus",

    },
    {
      field: "a3",
      headerName: "Nº De Solicitud De Pago",
      width: 200,
      description: "Nº De Solicitud De Pago",
    },
    {
      field: "a6",
      headerName: "Año",
      width: 100,
      description: "Año",
    },
    {
      field: "a13",
      headerName: "Mes",
      width: 100,
      description: "Mes",
    },
    {
      field: "a18",
      headerName: "U. Resp",
      width: 100,
      description: "Unidad Responsable",

    },

    {
      field: "a8",
      headerName: "Proveedor",
      width: 150,
      description: "Proveedor",
    },
    {
      field: "a9",
      headerName: "Descripción",
      width: 250,
      description: "Descripción",

    },
   /* {
      field: "ClavePresupuestal",
      headerName: "Clave Presupuestal",
      description: "Clave Presupuestal",
      width: 600,
      hide: false,
    },*/
    {
      field: "a10",
      headerName: "Total Neto",
      width: 280,
      description: "Total Neto = (Total Bruto - (Retenciones + Descuentos))",
      ...Moneda,
      renderHeader: () => (
        <>
        <Tooltip  title={"Total Neto = (Total Bruto - (Retenciones + Descuentos))"}>
          <Typography >
          {"Total Neto: " + currencyFormatter.format(Number(sumaTotal))}
          </Typography>
          </Tooltip>
        </>
      ),

    },

  ];

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 12) {
        setFondos(res.RESPONSE);
      } else if (operacion === 32) {
        setMunicipios(res.RESPONSE);
      } else if (operacion === 17) {
        setTipos(res.RESPONSE);
        setslideropen(false);
      }
    });
  };


  const handleFilterChange3 = (v: string) => {
    setidMunicipio(v);
  };



  const SolicitudOrdenPago = () => {
    if (selectionModel.length === 0) {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Solicitar",
        text: selectionModel.length + " Elementos Seleccionados",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {

        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 1,
            OBJS: selectionModel,
            CHUSER: user.id,
          };

          DPCPServices.AuthSolicitudPago(data).then((res) => {
            if (res.SUCCESS) {
              AlertS.fire({
                icon: "success",
                title: res.RESPONSE,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  handleClick();
                }
              });
            } else {
              AlertS.fire({
                title: "Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
        }


      });


    }
  };




  const handleClick = () => {

    let data = {
      TIPO: 3,
      P_FONDO: idFondo === "false" ? "" : idFondo,
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDTIPO: idtipo === "false" ? "" : idtipo,
      P_SOLICITUDPAGO: numOrdenPago ? numOrdenPago : "",
    };
    DPCPServices.GetParticipaciones(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);

        var sumatotal = 0;
        res.RESPONSE.map((item: any) => {
          sumatotal = sumatotal + Number(item.a10)
          setSumaTotal(sumatotal)
        });


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
    loadFilter(32);
    loadFilter(17);
    handleClick();
    /*  permisos.map((item: PERMISO) => {
        if (
          String(item.ControlInterno) === "PARTMUN"
        ) {
          //console.log(item);
          if (String(item.Referencia) === "AGREGPLANT") {
            setCargarPlant(true);
          }
          else if (String(item.Referencia) === "DESCPLANT") {
            setDescPlant(true);
          }
          else if (String(item.Referencia) === "DISFIDE") {
            setDisFide(true);
          }
        }
      });*/
  }, []);

  return (
    <div>
      <Slider open={slideropen}></Slider>









      <Grid container spacing={1} padding={2}>
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} sx={{ textAlign: "center" }}>
              <Typography variant="h4" paddingBottom={2}>
                Módulo de Autorización de Solicitudes de Pago
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Proveedor:
            </Typography>
            <SelectFrag
              value={idMunicipio}
              options={municipio}
              onInputChange={handleFilterChange3}
              placeholder={"Seleccione Proveedor"}
              label={""}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Solicitud de Pago:
              </Typography>
              <FormControl sx={{ width: "100%" }}  >
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={'text'}
                  size="small"
                  fullWidth
                  placeholder="Solicitud de Pago"
                  onChange={(v) => setNumOrdenPago(v.target.value.trim())}
                  value={numOrdenPago}
                  inputProps={{ maxLength: 10 }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Tooltip title={"Limpiar campo"} >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setNumOrdenPago("")}
                          edge="end"
                          disabled={!numOrdenPago}
                        >
                          <ClearOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  }
                  error={String(Number(numOrdenPago)) === "NaN"}
                />
              </FormControl>
            </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={2}>
          <Button
            onClick={handleClick}
            variant="contained"
            color="success"
            endIcon={<SendIcon sx={{ color: "white" }} />}
          >
            <Typography sx={{ color: "white" }}> Buscar </Typography>
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={1.8} lg={1.8} paddingBottom={1}>
          <ToggleButtonGroup>
            <Tooltip title={"Autorizar Solicitudes"}>
              <ToggleButton
                value="check"
                onClick={() => SolicitudOrdenPago()}>
                <CheckCircleIcon />
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
                getRowClassName={(params) => {
                  if (params.row.Presupuesto == null) {
                    return '';
                  }
                  return clsx('super-app', {
                    negative: params.row.Presupuesto !== params.row.total,
                    positive: params.row.Presupuesto == params.row.total,
                  });
                }
                }
                components={{ Toolbar: GridToolbar }}
                sx={{
                  fontFamily: "Poppins,sans-serif", fontWeight: '500',
                  fontSize:"12px",
                  '& .super-app.negative': {
                    color: "rgb(84, 3, 3)",
                    backgroundColor: "rgb(196, 40, 40, 0.384)",
                  },
                  '& .super-app.positive': {
                    backgroundColor: 'rgb(16, 145, 80, 0.567)',

                  },
                }}
                componentsProps={{
                  toolbar: {
                    label: "buscar",
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                    csvOptions: {
                      fileName: 'AuthSolicitudes',
                      utf8WithBom: true,
                    }
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
                  toolbarExportCSV: 'Descargar como CSV',
                  toolbarExportPrint: 'Imprimir',
                  checkboxSelectionSelectRow: "Filas seleccionadas",
                  checkboxSelectionSelectAllRows: 'Seleccionar todas las filas',
                  errorOverlayDefaultLabel: 'Ha ocurrido un error.',
                  footerRowSelected: (count) =>
                    count > 1 ?
                      `${count.toLocaleString()} filas seleccionadas`
                      :
                      `${count.toLocaleString()} fila seleccionada`,
                  footerTotalRows: 'Filas Totales:',
                  columnMenuLabel: 'Menú',
                  columnMenuShowColumns: 'Mostrar columnas',
                  columnMenuFilter: 'Filtro',
                  columnMenuHideColumn: 'Ocultar',
                  columnMenuUnsort: 'Desordenar',
                  columnMenuSortAsc: 'Ordenar ASC',
                  columnMenuSortDesc: 'Ordenar DESC',
                  columnHeaderFiltersTooltipActive: (count) =>
                    count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
                  columnHeaderFiltersLabel: 'Mostrar filtros',
                  columnHeaderSortIconLabel: 'Ordenar',
                }}
              />
            </ThemeProvider>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthSolicitudes;
