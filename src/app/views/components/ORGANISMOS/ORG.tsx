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
  import CallMergeIcon from '@mui/icons-material/CallMerge';
  import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
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
  import AddIcon from '@mui/icons-material/Add';
  import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  import EditOffIcon from '@mui/icons-material/EditOff';
  import ThumbUpIcon from '@mui/icons-material/ThumbUp';
  import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
  import ArticleIcon from '@mui/icons-material/Article';
  import SpeisAdmin from "../DAF/SpeisAdmin";
  
  
  import LoopIcon from '@mui/icons-material/Loop';
  import MenuBookIcon from '@mui/icons-material/MenuBook';
  import MoneyIcon from '@mui/icons-material/Money';
  import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
  import LocalAtmIcon from '@mui/icons-material/LocalAtm';
  import { ModalCheque } from "../componentes/ModalCheque";
import { ORGService } from "../../../services/ORGService";

export const ORG = () => {
    const theme = createTheme(coreEsES, gridEsES);
    const [slideropen, setslideropen] = useState(true);
    //Constantes para llenar los select
   const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
   const [sumaTotal, setSumaTotal] = useState<Number>();
   //MODAL
   const [openModalDetalle, setOpenModalDetalle] = useState<boolean>(false);
   const [openModalVerSpei, setOpenModalVerSpei] = useState<boolean>(false);




  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));

  const [vrows, setVrows] = useState<{}>("");
  const [openCheque, setOpenCheque] = useState(false);
  const [tipo, setTipo] = useState(0);

  const [DAMOP_FSE, SETDAMOP_FSE] = useState<boolean>(false);
  const [DAMOP_ASE, SETDAMOP_ASE] = useState<boolean>(false);
  const [DAMOP_TE,  SETDAMOP_TE] = useState<boolean>(false);
  const [DAMOP_AE,  SETDAMOP_AE] = useState<boolean>(false);
  const [DAMOP_FE,  SETDAMOP_FE] = useState<boolean>(false);
  const [DAMOP_VE,  SETDAMOP_VE] = useState<boolean>(false);
  const [DAMOP_GSE, SETDAMOP_GSE] = useState<boolean>(false);


  const handlecheque = (data: any ,tipo: number) => {
    setTipo(tipo);
    setOpenCheque(true)
    setVrows(data)
  };


  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenModalDetalle(true);
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
         
          
          { String(v.row.NumSolEgreso) === 'null'  && v.row.estatusCI ==="DAMOP_INI"  ?
            <Tooltip title={"Asignar N° de Solicitud de Egreso"}>
              <IconButton value="check" onClick={() => handlecheque(v,3)}>
                <MenuBookIcon/>
              </IconButton>
            </Tooltip>
           :"" 
          }
            
            { String(v.row.NumEgreso) === 'null'  && v.row.estatusCI ==="DAMOP_TE"?
                        <Tooltip title={"Asignar N° de Egreso"}>
                          <IconButton value="check" onClick={() => handlecheque(v,4)}>
                            <MoneyIcon/>
                          </IconButton>
                        </Tooltip>
                      :""
                     }
            
            { String(v.row.NumOrdenPago) === 'null' ?
                        <Tooltip title={"Asignar N° de Solicitud de Pago"}>
                          <IconButton value="check" onClick={() => handlecheque(v,5)}>
                            <MonetizationOnIcon/>
                          </IconButton>
                        </Tooltip>
             :""
            }
                      </Box>
                    );
                  },
                },
            
                {
      field: "Detalle",
      disableExport: true,
      headerName: "Ver Detalle",
      description: "Ver Detalle",
      sortable: false,
      width: 150,
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
                {v.row.estatusCI==="DAF_SPEI"? (
              <Tooltip title="Ver Spei">
                <IconButton onClick={() => handleVerSpei(v)}>
                  <ArticleIcon />
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
      field: "estatus",
      headerName: "Estatus",
      width: 200,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Descuentos",
      description: "Descuentos",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            { String(v.row.Clave) === 'FGP' && String(v.row.NumParticipacion) !== 'null' ? (
              <Tooltip title="Agregar Descuentos">
                <IconButton
                  onClick={() => handleDescuento(v)}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
             ) : ( "")} 
          </Box>
        );
      },
    },
    {
      field: "Anio",
      headerName: "Ejercicio",
      width: 100,
      description: "Ejercicio",
    },
    {
      field: "Mes",
      headerName: "Mes",
      width: 100,
      description: "Mes",
    },
    {
      field: "TipoSolicitud",
      headerName: "Tipo",
      width: 140,
      description: "Tipo de Solicitud",
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
      field: "tipocalculo",
      headerName: "Tipo Cálculo",
      width: 150,
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
      field: "ClaveBeneficiario",
      headerName: "Cve. Beneficiario",
      width: 150,
      description: "Beneficiario",
    },
    {
      field: "DescripcionBeneficiario",
      headerName: "Beneficiario",
      width: 150,
      description: "Beneficiario",
    },
    {
      field: "uresclave",
      headerName: "U. Resp",
      width: 100,
    },
    {
      field: "NumProyecto",
      headerName: "Proyecto",
      width: 150,
    },
    {
      field: "ConceptoEgreso",
      headerName: "Cpto. de  egreso",
      width: 150,
    },
    {
      field: "conceptoCheque",
      headerName: "Cpto. de  Cheque",
      width: 270,
    },
    {
      field: "Presupuesto",
      headerName: "Presupuesto SIREGOB",
      width: 150,
      description: "Presupuesto SIREGOB",
      ...Moneda,
    },
    {
      field: "total",
      headerName: "Total Bruto",
      width: 150,
      description: "Total Bruto",
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
      headerName: "Total Neto",
      width: 150,
      description: "Total Neto = (Total Bruto - (Retenciones + Descuentos))",
      ...Moneda,
      renderHeader: () => (
        <>
          {"Total: " + currencyFormatter.format(Number(sumaTotal))}
        </>
      ),

    },
    {
      field: "Proveedor",
      headerName: "Proveedor",
      width: 100,
      description: "Proveedor",
    },
    {
      field: "Deudor",
      headerName: "Deudor",
      width: 100,
      description: "Deudor",
    },
    {
      field: "clasificacion",
      headerName: "Clasificación",
      width: 100,
      description: "Clasificación de Solicitud de Pago",
    },
    {
      field: "NumSolEgreso",
      headerName: "Nº De Solicitud De Egreso",
      width: 200,
      description: "Número De Solicitud De Egreso",
    },
    {
      field: "NumEgreso",
      headerName: "Nº De Egreso",
      width: 200,
      description: "Número De Egreso",
    },
    {
      field: "NumOrdenPago",
      headerName: "Nº De Orden De Pago",
      width: 200,
      description: "Número De Orden De Pago",
    },
    {
      field: "NumCheque",
      headerName: "Nº De Cheque",
      width: 200,
      description: "Número De Cheque",
    },
    {
      field: "Divisa",
      headerName: "Divisa",
      width: 80,
      description: "Divisa",
    },
    {
      field: "Observaciones",
      headerName: "Observaciones",
      width: 400,
      description: "Observaciones",
    },
  ];


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
          sumatotal = sumatotal + Number(item.importe)
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


  const handleTranEgreso      = () => {}
  const handleAutEgresos      = () => {}
  const handleFinEgreso       = () => {}
  const handleValEgresos      = () => {}
  const handleGenNumOrdenPago = () => {}
  return (
    <div>
    <Slider open={slideropen}></Slider>

    







    

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

      <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12} direction="row"
        justifyContent="center"
        alignItems="center" >

        {/* <Grid item xs={6} sm={4} md={2} lg={2}>
          <Typography sx={{ fontFamily: "sans-serif" }}>Estatus:</Typography>
          <SelectFrag
            value={idestatus}
            options={estatus}
            onInputChange={handleFilterChange5}
            placeholder={"Seleccione Estatus"}
            label={""}
            disabled={false}
          />
        </Grid> */}

      
       


     

      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={0}>
        <Button
          onClick={handleClick}
          variant="contained"
          color="success"
          endIcon={<SendIcon sx={{ color: "white" }} />}
        >
          <Typography sx={{ color: "white" }}> Buscar </Typography>
        </Button>
      </Grid>

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
            <ToggleButton value="check"  onClick={() => handleTranEgreso()}>
              <ArrowUpwardIcon />
            </ToggleButton>
          </Tooltip>
) : (
""
    )}

{DAMOP_AE ? (
          <Tooltip title={"Autorizar egresos"}>
            <ToggleButton value="check"  onClick={() => handleAutEgresos()}>
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
            <ToggleButton value="check"  onClick={() => handleValEgresos()}>   
              <ThumbUpIcon />
            </ToggleButton>
          </Tooltip>
) : (
""
    )}

{DAMOP_GSE ? (
 
          <Tooltip title={"Generar solicitud de pago"}>
            {/* // GENERA N DE ORDEN DE PAGO */}
            <ToggleButton value="check" onClick={() => handleGenNumOrdenPago()}>
              <AttachMoneyIcon />
            </ToggleButton>
          </Tooltip>
) : (
""
    )}




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
              isRowSelectable={(params) => (
               // params.row.NumCheque === null
                // ||params.row.NumEgreso===null
                // ||params.row.NumRequerimientoAnt===null
                // ||params.row.NumOrdenPago===null
              )}
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
          </ThemeProvider>
        </div>
      </Grid>
    </Grid>
  </div>
  )
}
