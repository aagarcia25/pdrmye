import {
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import { DPCPServices } from "../../../services/DPCPServices";
import { Toast } from "../../../helpers/Toast";
import Slider from "../Slider";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  DataGrid,
  GridSelectionModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";




const AsigPresupuestal = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
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

  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const handleDescuento = (data: any) => { };

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "a3",
      headerName: "Ejercicio",
      description: "Ejercicio",
      width: 80,

    },
    {
      field: "a5",
      headerName: "Mes",
      description: "Mes",
      width: 100,

    },
    {
      field: "a4",
      headerName: "Nº De Operación",
      description: "Número De Operación",
      width: 150,
    },
    {
      field: "a16",
      headerName: "U. Resp",
      description: "Unidad Responsable",
      width: 80,
    },
   /* {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      description: "Clave Estado",
      width: 100,
    },*/
    {
      field: "a7",
      headerName: "Proveedor",
      description: "Proveedor",
      width: 150,
    },
    {
      field: "a13",
      headerName: "Descripción",
      description: "Descripción",
      width: 250,
    },
    {
      field: "a14",
      headerName: "Clave Presupuestal",
      description: "Clave Presupuestal",
      width: 500,
    },
    {
      field: "a12",
      headerName: "Presupuesto SIREGOB",
      width: 200,
      description: "Presupuesto SIREGOB",
      ...Moneda,
    },
    {
      field: "a11",
      headerName: "Total Neto",
      width: 200,
      description: "Total Neto",
      ...Moneda,
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



  const handleFilterChange1 = (v: string) => {
    setIdTipo(v);
  };

  const handleFilterChange2 = (v: string) => {
    setIdFondo(v);
  };

  const handleFilterChange3 = (v: string) => {
    setidMunicipio(v);
  };








  const handleClick = () => {
    //console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");

    let data = {
      TIPO: 5,
      P_FONDO: idFondo === "false" ? "" : idFondo,
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDTIPO: idtipo === "false" ? "" : idtipo,
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
                Módulo de Validación de Presupuesto
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={6} md={4} lg={3.5}>
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
          <Grid item xs={12} sm={6} md={4} lg={3.5}>
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

          <Grid item xs={12} sm={6} md={4} lg={3.5}>
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
                // getRowClassName={(params) => {
                //   if (params.row.Presupuesto == null) {
                //     return '';
                //   }
                //   return clsx('super-app', {
                //     negative: params.row.Presupuesto !== params.row.total,
                //     positive: params.row.Presupuesto == params.row.total,
                //   });
                // }
                // }
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
                    label: "buscar",
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                    csvOptions: {
                      fileName: 'AsignacionPresup',
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

export default AsigPresupuestal;

