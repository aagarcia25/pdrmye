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
import { AlertS } from "../../../helpers/AlertS";
import { Moneda} from "../menu/CustomToolbar";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import { Toast } from "../../../helpers/Toast";
import Slider from "../Slider";
import {DataGrid,GridSelectionModel, GridToolbar, esES as gridEsES,} from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import { DAMOPServices } from "../../../services/DAMOPServices";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditOffIcon from "@mui/icons-material/EditOff";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ORGService } from "../../../services/ORGService";
import { ORGHeader } from "./ORGHeader";
import Swal from "sweetalert2";


export const ORG = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(false);//cambiar a true
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [sumaTotal, setSumaTotal] = useState<Number>();
  //MODAL
  const [openModalCabecera, setOpenModalCabecera] = useState<boolean>(false);

  const [openModalVerSpei, setOpenModalVerSpei] = useState<boolean>(false);

  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [modo, setModo] = useState<string>("");
  const [orgData, setOrgData] = useState([]);
  const [vrows, setVrows] = useState({});
  const [openCheque, setOpenCheque] = useState(false);
  const [tipo, setTipo] = useState(0);

  const [DAMOP_FSE, SETDAMOP_FSE] = useState<boolean>(false);
  const [DAMOP_ASE, SETDAMOP_ASE] = useState<boolean>(false);
  const [DAMOP_TE, SETDAMOP_TE] = useState<boolean>(false);
  const [DAMOP_AE, SETDAMOP_AE] = useState<boolean>(false);
  const [DAMOP_FE, SETDAMOP_FE] = useState<boolean>(false);
  const [DAMOP_VE, SETDAMOP_VE] = useState<boolean>(false);
  const [DAMOP_GSE, SETDAMOP_GSE] = useState<boolean>(false);


  const handleClose = () => {
      setOpenModalCabecera(false);
      setVrows({});
      Consulta();

  };


  const handledetalles = (data: any) => {
    setOpenModalCabecera(true);
    setVrows(data);
    setModo("Ver")
  };

  const handleAgregarRegistro = () => {
    setOpenModalCabecera(true);
    setModo("Nuevo")

  };

  const handleVer = (data: any) => {
    setVrows(data);
    setOpenModalCabecera(true);
    setModo("Ver")
  };

  const handleEditar = (data: any) => {
    setVrows(data);
    setOpenModalCabecera(true);
    setModo("Editar")
  };

  const handleVerSpei = (data: any) => {
    setVrows(data);
    setOpenModalVerSpei(true);
  };

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "Operaciones",
      disableExport: true,
      headerName: "Operaciones",
      description: "Operaciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
              <Tooltip title={"Administrar Detalles"}>
                <IconButton value="check" onClick={() => handledetalles(v)}>
                  <MenuBookIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Eliminar"}>
                <IconButton value="check" onClick={() => handleBorrarSolicitud(v)}>
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Tooltip>
              
          </Box>
        );
      },
    },
    { field: "estatus",      headerName: "Estatus",             description: "Estatus",               width: 200, },
    { field: "Organismo",    headerName: "Organismo",           description: "Organismo",             width: 150, },
    { field: "UResponsable", headerName: "U Responsable",       description: "U Responsable",         width: 150, },
    { field: "Observaciones",headerName: "Observaciones",       description: "Observaciones",         width: 140, },
    { field: "NumProyecto",  headerName: "Numero de Proyecto",  description: "Numero de Proyecto",    width: 100, },
    { field: "NumEgreso",    headerName: "Numero de Egreso",    description: "Numero de Egreso",      width: 150, },
    { field: "NumOrdenPago", headerName: "Numero Orden de Pago",description: "Numero Orden de Pago",  width: 150, },
    { field: "NumCheque",    headerName: "Numero de Cheque",    description: "Numero de Cheque",      width: 150,  },
    { field: "total",        headerName: "Total", width: 250,...Moneda },
   
    { field: "Divisa", headerName: "Divisa", width: 100, },
    { field: "Anio", headerName: "Año", width: 100, description: "Ejercicio", },
    { field: "Mes", headerName: "Mes", width: 100, description: "Mes", },
    
  ];
  const Consulta = () => {

    DAMOPServices.indexCabecera({NUMOPERACION: 4}).then((res) => {
          if (res.SUCCESS) {
            // setTotalRetenciones((totalRetenciones) + (importe));
            // setDescRet("");
            // setValRet("");
            // setIdRetencion("")
            // setImporte(0)
            // consulta("add");
            // setOpenModalDes(false)
            // setNumOperacion("");
            // setClaveRet("");
            // setEditar(false);
            setOrgData(res.RESPONSE)
           
          } else {
            AlertS.fire({
              title: "Error!",
              text: "Error!",
              icon: "error",
            });
          }
        });
      
   
  };

  const handleBorrarSolicitud = (v:any) => {

    let data = {
      NUMOPERACION: 3,
      CHUSER: user?.id,
      CHID : v?.row?.id
    }

    Swal.fire({
      icon: "warning",
      title: "Eliminar registro actual",
      text: "",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        DAMOPServices.indexCabecera(data).then((res) => {
          if (res.SUCCESS) {
            handleClose();
            Toast.fire({
              icon: "success",
              title: "Cabecera Borrada!",
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

  };


  const handleClick = () => {
    let data = {
      /* TIPO: 1,
      P_FONDO: idFondo === "false" ? "" : idFondo,
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDTIPO: idtipoFondo === "false" ? "" : idtipoFondo,
      P_IDTIPOSOL: idtipoSolicitud === "false" ? "" : idtipoSolicitud,
      P_IDESTATUS: idestatus === "false" ? "" : idestatus,*/
    };
    ORGService.ListORG(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        var sumatotal = 0;
        res.RESPONSE.map((item: any) => {
          sumatotal = sumatotal + Number(item.importe);
          setSumaTotal(sumatotal);
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

  const handleTranEgreso = () => { };
  const handleAutEgresos = () => { };
  const handleFinEgreso = () => { };
  const handleValEgresos = () => { };
  const handleGenNumOrdenPago = () => { };


  useEffect(() => {

    Consulta();
  }, []);


  return (
    <div>
      <Slider open={slideropen}></Slider>

      {openModalCabecera ?
        <ORGHeader dataCabecera={vrows} modo={modo} handleClose={handleClose} />
        :
        ""
      }

      



      <Grid container spacing={1} padding={0}>
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} sx={{ textAlign: "center" }}>
              <Typography variant="h4" paddingBottom={2}>
                Generación de Solicitudes de Organismos
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={0}>
          <Button
            onClick={Consulta}
            variant="contained"
            color="success"
            endIcon={<SendIcon sx={{ color: "white" }} />}
          >
            <Typography sx={{ color: "white" }}> Buscar </Typography>
          </Button>
        </Grid> */}

        <Grid item xs={12} sm={12} md={1.8} lg={1.8} paddingBottom={-1}>
          {/* <ToggleButtonGroup>
          <Tooltip title={"Integrar Operaciones"}>
            <ToggleButton value="check"
              disabled={data.length === 0 || intOperaciones || idtipoSolicitud.length < 6 || idFondo.length < 6 || idMunicipio.length < 6}
              onClick={() => integrarOperaciones()}>
              <CallMergeIcon color={data.length === 0 || intOperaciones || idtipoSolicitud.length < 6 || idFondo.length < 6 || idMunicipio.length < 6 ? "inherit" : "primary"} />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup> */}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={-1}>
          <ToggleButtonGroup>
            {DAMOP_FSE ? (
              <Tooltip title={"Finalizar solicitud de egreso"}>
                <ToggleButton value="check">
                  <EditOffIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {DAMOP_ASE ? (
              <Tooltip title={"Autorizar solicitud de egreso"}>
                <ToggleButton value="check">
                  <CheckCircleIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {DAMOP_TE ? (
              <Tooltip title={"Transferir a egreso"}>
                {/* // GENERA EL NUM DE EGRESO */}
                <ToggleButton value="check" onClick={() => handleTranEgreso()}>
                  <ArrowUpwardIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {DAMOP_AE ? (
              <Tooltip title={"Autorizar egresos"}>
                <ToggleButton value="check" onClick={() => handleAutEgresos()}>
                  <CheckCircleIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {DAMOP_FE ? (
              <Tooltip title={"Finalizar egreso"}>
                <ToggleButton value="check" onClick={() => handleFinEgreso()}>
                  <EditOffIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {DAMOP_VE ? (
              <Tooltip title={"Validar egreso"}>
                <ToggleButton value="check" onClick={() => handleValEgresos()}>
                  <ThumbUpIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {DAMOP_GSE ? (
              <Tooltip title={"Generar solicitud de pago"}>
                {/* // GENERA N DE ORDEN DE PAGO */}
                <ToggleButton
                  value="check"
                  onClick={() => handleGenNumOrdenPago()}
                >
                  <AttachMoneyIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
            <Tooltip title="Agregar Registro">
              <ToggleButton value="check" onClick={() => handleAgregarRegistro()} >
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
            <ThemeProvider theme={theme}>
              <DataGrid
                columns={columnsParticipaciones}
                rows={orgData}
                density="compact"
                rowsPerPageOptions={[10, 25, 50, 100, 200, 300, 400]}
                disableSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                getRowHeight={() => "auto"}
                //   getRowClassName={(params) => {
                //     if (params.row.Presupuesto == null) {
                //       return "";
                //     }
                //     return clsx("super-app", {
                //       negative: params.row.Presupuesto !== params.row.total,
                //       positive: params.row.Presupuesto == params.row.total,
                //     });
                //   }}
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
                }}
              />
            </ThemeProvider>
          </div>
        </Grid>
      </Grid>



    </div>


  );
};
