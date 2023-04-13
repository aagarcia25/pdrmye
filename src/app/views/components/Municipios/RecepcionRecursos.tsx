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
import InfoIcon from "@mui/icons-material/Info";
import ModalForm from "../componentes/ModalForm";
import ParticipacionesDetalle from "../DAMOP/ParticipacionesDetalle";
import SpeisAdmin from "../DAF/SpeisAdmin";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CfdiAdmin from "../DAF/CfdiAdmin";
import NombreCatalogo from "../componentes/NombreCatalogo";
const RecepcionRecursos = () => {
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
  const [openModalDetalle, setOpenModalDetalle] = useState<boolean>(false);
  const [openVerSpei, setOpenVerSpei] = useState<boolean>(false);
  const [openVerCfdi, setOpenVerCfdi] = useState<boolean>(false);

  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const handleDescuento = (data: any) => { };

  const handleAccion = () => { };

  const handleVerSpei = (data: any) => {
    setOpenVerSpei(true);
    setData(data.row);
  };

  const handleSubirCfdi = (data: any) => {
    setOpenVerCfdi(true);
    setData(data.row);
  };

  const handleClose = () => {
    setOpenModalDetalle(false);
    setOpenVerSpei(false);
    setOpenVerCfdi(false);
    handleClick();
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenModalDetalle(true);

  };
  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "Detalle",
      disableExport: true,
      headerName: "Ver Detalle",
      description: "Ver Detalle",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            {v.row.detalle === 1 ? (
              <Tooltip title="Ver Detalle del Registro">
                <IconButton onClick={() => handleDetalle(v)}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acción",
      description: "Acción",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>


            {v.row.estatusCI === "DAF_SPEI" || v.row.estatusCI === "MUN_CFDI" ?
              <Tooltip title="Subir CFDI">
                <IconButton onClick={() => handleSubirCfdi(v)}>
                  <DriveFolderUploadIcon />
                </IconButton>
              </Tooltip>
              : ""}
            {v.row.estatusCI === "DAF_SPEI" || v.row.estatusCI === "MUN_CFDI" ?
              <Tooltip title="Descargar SPEI">
                <IconButton onClick={() => handleVerSpei(v)}>
                  <FolderOpenIcon />
                </IconButton>
              </Tooltip>
              : ""}




          </Box>
        );
      },
    },
    {
      field: "NumOper",
      headerName: "Nº De Operación",
      description: "Numero De Operación",
      width: 200,
    },
    {
      field: "Anio",
      headerName: "Ejercicio",
      width: 80,
      description: "Ejercicio",
    },
    {
      field: "Mes",
      headerName: "Mes",
      width: 100,
      description: "Mes",
    },

    {
      // hide: (user.DEPARTAMENTOS[0]?.NombreCorto === "ORG") ,
      hide: true,

      field: "ClaveEstado",
      headerName: "Clave Estado",
      width: 100,
      description: "Clave Estado",
    },
    {
      hide: (user.DEPARTAMENTOS[0]?.NombreCorto === "MUN"),
      field: "Nombre",
      headerName: "Municipio",
      width: 150,
      description: "Municipio",
    },

    // {
    //   field: "NumOrdenPago",
    //   headerName: "Nº De Orden De Pago",
    //   width: 200,
    //   description: "Número De Orden De Pago",
    // },

    {
      field: "NumCheque",
      headerName: "Nº De Cheque",
      width: 200,
      description: "Póliza de Pago",
    },
    {
      hide: true,
      field: "fondodes",
      headerName: "Descripción de Fondo",
      description: "Descripción de Fondo",
      width: 250,
    },


    {
      field: "estatus",
      headerName: "Estatus",
      width: 150,
    },

    {
      field: "total",
      headerName: "Total Neto",
      width: 150,
      description: "Total Neto",
      ...Moneda,
    },
    {
      field: "Retenciones",
      headerName: "Retenciones",
      width: 150,
      description: "Retenciones",
      ...Moneda,
    },
    {
      field: "Descuentos",
      headerName: "Descuentos",
      width: 150,
      description: "Descuentos",
      ...Moneda,
    },
    {
      field: "importe",
      headerName: "Importe Total",
      width: 150,
      description: "Importe Total = Total Neto - (Retenciones + Descuentos)",
      ...Moneda,
    },

  ];

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 12) {
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

  const handleClick = () => {

    let data = {
      TIPO: 6,
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      DEP: user.MUNICIPIO[0]?.id ? "MUN" : ""
    };
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
    // handleClick();
    /*  permisos.map((item: PERMISO) => {
        if (
          String(item.ControlInterno) === "PARTMUN"
        ) {
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

      {openModalDetalle ? (
        <ModalForm title={"Detalles de Registro"} handleClose={handleClose}>
          <ParticipacionesDetalle
            data={vrows} />
        </ModalForm>
      ) : (
        ""
      )}

      <NombreCatalogo controlInterno={"RESTRANS"} />
      <Grid container spacing={1} padding={2}>

        {user.DEPARTAMENTOS[0]?.NombreCorto !== "MUN" ?
          <>
            <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={3} sm={3} md={3} lg={3}>
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
          </>
          :
          ""
        }

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
                // getRowClassName={(params) =>
                //   {
                //     if (params.row.Presupuesto == null) {
                //       return '';
                //     }
                //     return clsx('super-app', {
                //       negative: params.row.Presupuesto !== params.row.total,
                //       positive: params.row.Presupuesto == params.row.total,
                //     });
                //   }
                // } 
                components={{ Toolbar: GridToolbar }}
                sx={{
                  fontFamily: "Poppins,sans-serif", fontWeight: '600',
                  //   '& .super-app.negative': {
                  //     color: "rgb(84, 3, 3)",
                  //     backgroundColor: "rgb(196, 40, 40, 0.384)",
                  //   },
                  //   '& .super-app.positive': {
                  //     backgroundColor: 'rgb(16, 145, 80, 0.567)',

                  //   },
                }}
                componentsProps={{
                  toolbar: {
                    label: "buscar",
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                    csvOptions: {
                      fileName: 'Export',
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
      {openVerSpei ?
        <SpeisAdmin handleClose={handleClose} handleAccion={handleAccion} vrows={data} modo ={"SPEI"} />
        : ""}
      {openVerCfdi ?
        <SpeisAdmin handleClose={handleClose} handleAccion={handleAccion} vrows={data} modo ={"CFDI"} />
        : ""}

    </div>
  );
};

export default RecepcionRecursos;
