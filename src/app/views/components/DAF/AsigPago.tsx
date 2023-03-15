import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
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
import { Moneda } from "../menu/CustomToolbar";
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
import SpeisAdmin from "./SpeisAdmin";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ApprovalIcon from '@mui/icons-material/Approval';
import { ModalCheque } from "../componentes/ModalCheque";
import SelectFragMulti from "../Fragmentos/SelectFragMulti";
import { fmeses } from "../../../share/loadMeses";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


const AsigPago = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  //MODAL
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [mes, setMes] = useState<string>("");
  const [fondos, setFondos] = useState<[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tipos, setTipos] = useState<SelectValues[]>([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [checked, setChecked] = React.useState(true);
  const [vrows, setVrows] = useState<{}>("");
  //Constantes de los filtros
  const [idtipo, setIdTipo] = useState("");
  const [idFondo, setIdFondo] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  const [idestatus, setIdEstatus] = useState("");
  const [nombreMes, setNombreMes] = useState("");
  const [numOrdenPago, setNumOrdenPago] = useState("");
  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  ///// Modal de Administración de Speis
  const [openSpeis, setOpenSpeis] = useState(false);
  const [openCheque, setOpenCheque] = useState(false);


  const handleSpeis = (data: any) => {
    setOpenSpeis(true)
    setVrows(data)
  };

  const handlecheque = (data: any) => {
    setOpenCheque(true)
    setVrows(data)
  };

  const handleChangeMostrarTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleclose = (data: any) => {
    setOpenSpeis(false)
    setOpenCheque(false);
  };

  const handleAccion = (data: any) => {
  };

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Administración de SPEI´S">
              <IconButton onClick={() => handleSpeis(v)}>
                <FolderOpenIcon />
              </IconButton>
            </Tooltip>


            {String(v.row.NumCheque) === 'null' ?
              <Tooltip title="Agregar Póliza de Pago">
                <IconButton onClick={() => handlecheque(v)}>
                  <ApprovalIcon />
                </IconButton>
              </Tooltip>
              : ""
            }


          </Box>
        );
      },
    },
    {field: "estatus",      headerName: "Estatus",      width: 150, description: "Estatus",   },
    {field: "NumOrdenPago",      headerName: "Solicitud de Pago",      width: 200,description: "Solicitud de Pago",    },
    {field: "NumCheque",      headerName: "Póliza de Pago",      width: 200,      description: "Póliza de Pago",    },
    {field: "importe",      headerName: "Importe Total",      width: 150,      description: "Importe Total = Total Neto - (Retenciones + Descuentos)", ...Moneda,    },
    {field: "Anio",      headerName: "Ejercicio",      width: 80,      description: "Ejercicio",    },
    {field: "Mes",      headerName: "Mes",      width: 100,      description: "Mes",    },
    {field: "ClaveEstado",      headerName: "Clave Estado",      width: 100,      description: "Clave Estado",    },
    {field: "Nombre",      headerName: "Municipio",      width: 150,      description: "Municipio",},
    {field: "fondodes",      headerName: "Descripción de Fondo",      width: 250,   description: "Descripción de Fondo" },
    {field: "total",      headerName: "Total Neto",      width: 150,      description: "Total Neto",      ...Moneda,    },
    {field: "RecAdeudos",      headerName: "Retenciones",      width: 150,      description: "Retenciones",      ...Moneda,    },
    {field: "Descuentos",      headerName: "Descuentos",      width: 150,      description: "Descuentos",      ...Moneda,    },
    

  ];

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 31) {
        setFondos(res.RESPONSE);
      } else if (operacion === 5) {
        setMunicipios(res.RESPONSE);
      } else if (operacion === 17) {
        setTipos(res.RESPONSE);
        setslideropen(false);
      }
    });
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


  const handleSelectMes = (data: any) => {
    setNombreMes(meses.find(({ value }) => value === data)?.label === undefined ? "" : String(meses.find(({ value }) => value === data)?.label));

    setMes(data);
  };


  const handleClick = () => {
    //console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");

    

    let data = {
      TIPO: 4,
      P_FONDO: idFondo.length > 0 ? idFondo : "",
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDESTATUS: idestatus === "false" ? "" : idestatus,
      P_IDMES: mes === "false" ? "" : mes,
      P_SOLICITUDPAGO: numOrdenPago ? numOrdenPago : "",
      P_MOSTRARTODOS: checked 

    };
    //console.log(data);
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
    setMeses(fmeses());
    loadFilter(31);
    loadFilter(5);
    loadFilter(17);
    // handleClick();
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
    <>
      <div>
        <Slider open={slideropen}></Slider>
        <Grid container spacing={1} padding={2}>
          <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item xs={10} sx={{ textAlign: "center" }}>
                <Typography variant="h4" paddingBottom={2}>
                  Módulo de Administración Financiera
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>

          <Grid item xs={12} sm={6} md={3} lg={2}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
          Solicitud de Pago:
              </Typography>
          <FormControl sx={{ width:"100%" }}  >
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

            <Grid item xs={12} sm={6} md={3} lg={2}>
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
            <Grid item xs={12} sm={6} md={3} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Fondo:</Typography>
            <SelectFragMulti
              options={fondos}
              onInputChange={handleFilterChange2}
              placeholder={"Seleccione Fondo(s)"}
              label={""}
              disabled={false}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Mes :</Typography>
            <SelectFrag
              value={mes}
              options={meses}
              onInputChange={handleSelectMes}
              placeholder={"Seleccione Mes"}
              label={""}
              disabled={false}
            />
            </Grid>
          </Grid>

          <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={2} sm={2} md={2} lg={2}>
          <FormControlLabel control={
            <Checkbox
          checked={checked}
          onChange={handleChangeMostrarTodo}
          inputProps={{ 'aria-label': 'controlled' }}
          />
          }
          label="Mostrar Todo" />
          
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
                    fontFamily: "Poppins,sans-serif", fontWeight: '600',
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
                      label: "Buscar",
                      showQuickFilter: true,
        
                      quickFilterProps: { debounceMs: 500, },
        
                      csvOptions: {
                        fileName: 'Distribucion',
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

      {openSpeis ? <SpeisAdmin handleClose={handleclose} handleAccion={handleAccion} vrows={vrows} /> : ""}
      {openCheque ? <ModalCheque tipo={1} handleClose={handleclose} vrows={vrows} /> : ""}
    </>
  );
};

export default AsigPago;
