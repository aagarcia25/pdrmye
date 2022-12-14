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
import { Moneda } from "../menu/CustomToolbar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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
import { REQAnticipo } from "./REQAnticipo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Descuentos } from "./Descuentos";

const Participaciones = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  //MODAL
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDescuento, setOpenModalDescuento] = useState<boolean>(false);
  const [openModalAnticipo, setOpenModalAnticipo] = useState<boolean>(false);
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [fondos, setFondos] = useState<SelectValues[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tipos, setTipos] = useState<SelectValues[]>([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [vrows, setVrows] = useState<{}>("");
  //Constantes de los filtros
  const [numerooperacion, setnumerooperacion] = useState(0);
  const [idtipo, setIdTipo] = useState("");
  const [idFondo, setIdFondo] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [plantilla, setPlantilla] = useState("");
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [cargarPlant, setCargarPlant] = useState<boolean>(false);
  const [descPlant, setDescPlant] = useState<boolean>(false);
  const [disFide, setDisFide] = useState<boolean>(false);

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "PLANTILLA CARGA ANTICIPO PARTICIPACIONES",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  const handleDescuento = (data: any) => {
    setVrows(data);
    setOpenModalDescuento(true);

  };

  const columnsParticipaciones = [
    { field: "id", hide: true },
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
      field: "acciones",
      disableExport: true,
      headerName: "Agregar Descuentos",
      description: "Agregar Descuentos",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            {String(v.row.Clave) === "FGP" ? (
              <Tooltip title="Agregar Descuentos">
                <IconButton onClick={() => handleDescuento(v)}>
                  <AttachMoneyIcon />
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
      field: "Clave",
      headerName: "Fondo",
      width: 150,
      description: "Fondo",
    },
    {
      field: "fondodes",
      headerName: "Descripci??n de Fondo",
      width: 250,
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
      field: "tipocalculo",
      headerName: "Tipo C??lculo",
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
      field: "Divisa",
      headerName: "Divisa",
      width: 80,
      description: "Divisa",
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
      headerName: "Clasificaci??n",
      width: 100,
      description: "Clasificaci??n de Solicitud de Pago",
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

    {
      field: "Observaciones",
      headerName: "Observaciones",
      width: 400,
      description: "Observaciones",
    },
    {
      field: "NumSolEgreso",
      headerName: "N?? De Solicitud De Egreso",
      width: 200,
      description: "N??mero De Solicitud De Egreso",
    },
    {
      field: "NumEgreso",
      headerName: "N?? De Egreso",
      width: 200,
      description: "N??mero De Egreso",
    },
    {
      field: "NumOrdenPago",
      headerName: "N?? De Orden De Pago",
      width: 200,
      description: "N??mero De Orden De Pago",
    },
    {
      field: "NumRequerimientoAnt",
      headerName: "N?? De Requerimiento De Anticipo",
      width: 200,
      description: "N??mero De Requerimiento De Anticipo",
    },
    {
      field: "NumCheque",
      headerName: "N?? De Cheque",
      width: 200,
      description: "N??mero De Cheque",
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

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalAnticipo(false);
    setOpenModalDescuento(false);
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
    let obj = {
      NUMOPERACION: numerooperacion,
      OBJS: selectionModel,
      CHUSER: user.id,
      COMENTARIO: data,
      ESTATUS: "DPCP_INICIO",
    };

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

  const openmodalc = (operacion: number) => {
    if (selectionModel.length > 1) {
      setnumerooperacion(operacion);
      setOpenModal(true);
    } else {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    }
  };

  const openmodalAnticipo = () => {
    setOpenModalAnticipo(true);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.id);
    formData.append("tipo", "anticipoParticipaciones");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      handleClick();
    });
  };

  const Disitribuir = () => {
    if (selectionModel.length === 1) {
      Swal.fire({
        icon: "info",
        title: "Distribucion",
        text: "El Movimiento Seleccionado se distribura entre los Fideicomisos Relacionados al Municipio",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {
            OBJS: selectionModel,
            CHUSER: user.id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.DistribucionFideicomisos(data).then((res) => {
                if (res.SUCCESS) {
                  Toast.fire({
                    icon: "success",
                    title: "Consulta Exitosa!",
                  });
                  handleClick();
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
      });
    } else if (selectionModel.length > 1) {
      AlertS.fire({
        title: "Error!",
        text: "Solo se permite seleccionar un registro para La distribuci??n",
        icon: "error",
      });
    } else {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    }
  };

  const eliminar = () => {
    
    if (selectionModel.length !== 0) {
      Swal.fire({
        icon: "error",
        title: "Eliminaci??n",
        text: "El Movimiento Seleccionado se Eliminara",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {
            OBJS: selectionModel,
            CHUSER: user.id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.eliminarSolicitudes(data).then((res) => {
                if (res.SUCCESS) {
                  Toast.fire({
                    icon: "success",
                    title: "Consulta Exitosa!",
                  });
                  handleClick();
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
      });
  
    } else {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    }
  };

  const integrarOperaciones = () => {
    
    if (selectionModel.length >1) {
      Swal.fire({
        icon: "info",
        title: "Integraci??n",
        text: "Los Movimientos, Seleccionados se integraci??n en una sola operaci??n",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {
            OBJS: selectionModel,
            CHUSER: user.id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.integraSolicitudes(data).then((res) => {
                if (res.SUCCESS) {
                  Toast.fire({
                    icon: "success",
                    title: "Consulta Exitosa!",
                  });
                  handleClick();
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
      });
  
    } else {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Seleccionar mas de un Registros",
        icon: "error",
      });
    }
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
            TIPO: 1,
            OBJS: selectionModel,
            CHUSER: user.id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              handleClick();
            }
          });
        }
      });
    }
  };

  const handleClick = () => {
    //console.log("EJECUTANDO LA CONSULTA CON LOS SIGUIENTES FILTROS");

    let data = {
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
    loadFilter(5);
    loadFilter(17);
    handleClick();
    downloadplantilla();
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "PARTMUN") {
        //console.log(item);
        if (String(item.Referencia) === "AGREGPLANT") {
          setCargarPlant(true);
        } else if (String(item.Referencia) === "DESCPLANT") {
          setDescPlant(true);
        } else if (String(item.Referencia) === "DISFIDE") {
          setDisFide(true);
        }
      }
    });
  }, []);

  return (
    <div>
      <Slider open={slideropen}></Slider>

      {openModal ? (
        <ModalDAMOP
          tipo={"Comentarios"}
          handleClose={handleClose}
          handleAccion={Fnworkflow}
        />
      ) : (
        ""
      )}

      {openModalAnticipo ? (
        <REQAnticipo tipo={1} handleClose={handleClose} dt={""} />
      ) : (
        ""
      )}

     {openModalDescuento ? (
        <Descuentos
         tipo={1} handleClose={handleClose} dt={vrows} />
      ) : (
        ""
      )}

      <Grid container spacing={1} padding={2}>
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} sx={{ textAlign: "center" }}>
              <Typography variant="h4" paddingBottom={2}>
                Generaci??n de Solicitudes de Participaciones y Aportaciones
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Tipo:</Typography>
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
            <Typography sx={{ fontFamily: "sans-serif" }}>Fondo:</Typography>
            <SelectFrag
              value={idFondo}
              options={fondos}
              onInputChange={handleFilterChange2}
              placeholder={"Seleccione Fondo"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={2} sm={2} md={2} lg={2} paddingBottom={1}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
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

        <Grid item xs={12} sm={12} md={1.8} lg={1.8} paddingBottom={1}>
          <ToggleButtonGroup>
          <Tooltip title={"Integrar Operaciones"}>
              <ToggleButton value="check" onClick={() => integrarOperaciones()}>
                <CallMergeIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title={"Solicitar Suficiencia Presupuestal"}>
              <ToggleButton value="check" onClick={() => openmodalc(1)}>
                <AttachMoneyIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title={"Generar Solicitud"}>
              <ToggleButton value="check" onClick={() => SolicitudOrdenPago()}>
                <SettingsSuggestIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title={"Asignar Comentario"}>
              <ToggleButton value="check" onClick={() => openmodalc(2)}>
                <FormatAlignLeftIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title={"Generar Anticipo"}>
              <ToggleButton value="check" onClick={() => openmodalAnticipo()}>
                <CurrencyExchangeIcon />
              </ToggleButton>
            </Tooltip>

            {descPlant ? (
              <Tooltip title={"Descargar Plantilla"}>
                <ToggleButton value="check">
                  <IconButton
                    aria-label="upload documento"
                    component="label"
                    size="large"
                  >
                    <Link href={plantilla}>
                      <ArrowDownwardIcon />
                    </Link>
                  </IconButton>
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {cargarPlant ? (
              <Tooltip title={"Cargar Plantilla"}>
                <ToggleButton value="check">
                  <IconButton
                    aria-label="upload documento"
                    component="label"
                    size="large"
                  >
                    <input
                      hidden
                      accept=".xlsx, .XLSX, .xls, .XLS"
                      type="file"
                      value=""
                      onChange={(v) => handleUpload(v)}
                    />
                    <DriveFolderUploadIcon />
                  </IconButton>
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}
            {disFide ? (
              <Tooltip title={"Distribuir en Fideicomisos"}>
                <ToggleButton value="check" onClick={() => Disitribuir()}>
                  <AccountTreeIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {cargarPlant ? ( 
              <Tooltip title={"Eliminar Registro"}>
                <ToggleButton  value="check"  onClick={() => eliminar()}>
                  <DeleteForeverIcon />
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
                getRowClassName={(params) => {
                  if (params.row.Presupuesto == null) {
                    return "";
                  }
                  return clsx("super-app", {
                    negative: params.row.Presupuesto !== params.row.total,
                    positive: params.row.Presupuesto == params.row.total,
                  });
                }}
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
                  noResultsOverlayLabel: "No se ha encontrado ning??n resultado",
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
