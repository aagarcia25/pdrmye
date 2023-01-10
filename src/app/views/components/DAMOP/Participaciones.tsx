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
import { Descuentos } from "./Descuentos";
import ParticipacionesDetalle from "./ParticipacionesDetalle";
import ModalForm from "../componentes/ModalForm";
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditOffIcon from '@mui/icons-material/EditOff';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const Participaciones = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  //MODAL
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDescuento, setOpenModalDescuento] = useState<boolean>(false);
  const [openModalAnticipo, setOpenModalAnticipo] = useState<boolean>(false);
  const [openModalDetalle, setOpenModalDetalle] = useState<boolean>(false);
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [fondos, setFondos] = useState<SelectValues[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tiposFondo, setTiposFondo] = useState<SelectValues[]>([]);
  const [tiposSolicitud, setTiposSolicitud] = useState<SelectValues[]>([]);
  const [estatus, setEstatus] = useState<SelectValues[]>([]);

  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [vrows, setVrows] = useState<{}>("");
  //Constantes de los filtros
  const [numerooperacion, setnumerooperacion] = useState(0);
  const [idtipoFondo, setIdTipoFondo] = useState("");
  const [idtipoSolicitud, setIdTipoSolicitud] = useState("");
  const [idestatus, setIdEstatus] = useState("");

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
  const [intOperaciones, setIntOperaciones] = useState<boolean>(true);
  const [munTieneFide, setMunTieneFide] = useState<boolean>(false);
  const [sumaTotal, setSumaTotal] = useState<Number>();


  const [DAMOP_INI,SETDAMOP_INI] = useState<boolean>(false);
  const [DAMOP_FSE,SETDAMOP_FSE] = useState<boolean>(false);
  const [DAMOP_ASE,SETDAMOP_ASE] = useState<boolean>(false);
  const [DAMOP_TE,SETDAMOP_TE] = useState<boolean>(false);
  const [DAMOP_AE,SETDAMOP_AE] = useState<boolean>(false);
  const [DAMOP_FE,SETDAMOP_FE] = useState<boolean>(false);
  const [DAMOP_VE,SETDAMOP_VE] = useState<boolean>(false);
  const [DAMOP_GSE,SETDAMOP_GSE] = useState<boolean>(false);
  const [DAMOP_ASP,SETDAMOP_ASP] = useState<boolean>(false);
  const [DAMOP_FRA,SETDAMOP_FRA] = useState<boolean>(false);
  const [DAMOP_ARA,SETDAMOP_ARA] = useState<boolean>(false);
  const [DAMOP_FINALIZADO,SETDAMOP_FINALIZADO] = useState<boolean>(false);
  const [DAMOP_PFI,SETDAMOP_PFI]= useState<boolean>(false);
  const [DAMOP_PAUT,SETDAMOP_PAUT]= useState<boolean>(false);

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
            {String(v.row.estatus) === 'Pendiente de finalizar participación' && String(v.row.Clave) === 'FGP' && String(v.row.NumParticipacion) !== 'null' ? (
              <Tooltip title="Agregar Descuentos">
                <IconButton
                  onClick={() => handleDescuento(v)}>
                  <AddIcon />
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
      field: "ClavePresupuestal",
      headerName: "Clave Presupuestal",
      width: 600,
      hide: false,
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
      field: "NumParticipacion",
      headerName: "Nº De Participación",
      width: 200,
      description: "Número De Participación",
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
      field: "NumRequerimientoAnt",
      headerName: "Nº De Requerimiento De Anticipo",
      width: 200,
      description: "Número De Requerimiento De Anticipo",
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

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 12) {
        setFondos(res.RESPONSE);
      } else if (operacion === 5) {
        setMunicipios(res.RESPONSE);
      } else if (operacion === 17) {
        setTiposFondo(res.RESPONSE);
      } else if (operacion === 24) {
        setTiposSolicitud(res.RESPONSE);
        setslideropen(false);
      } else if (operacion === 25) {
        setEstatus(res.RESPONSE);
      }
    });
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalAnticipo(false);
    setOpenModalDescuento(false);
    setOpenModalDetalle(false);
    handleClick();
  };

  const handleFilterChange1 = (v: string) => {
    setIdTipoFondo(v);

  };

  const handleFilterChange2 = (v: string) => {
    setIdFondo(v);
    setIntOperaciones(true); setMunTieneFide(false);
    // if (v.length < 6) { setIntOperaciones(true); setMunTieneFide (false);  }
  };

  const handleFilterChange3 = (v: string) => {
    setidMunicipio(v);
    setIntOperaciones(true); setMunTieneFide(false)
    // if (v.length < 6) { setIntOperaciones(true); setMunTieneFide (false) }



  };
  const handleFilterChange4 = (v: string) => {
    setIdTipoSolicitud(v);
    setIntOperaciones(true); setMunTieneFide(false)
    // if (v.length < 6) { setIntOperaciones(true); setMunTieneFide (false) }
  };

  const handleFilterChange5 = (v: string) => {
    setIdEstatus(v);
    SETDAMOP_PFI(false);
    SETDAMOP_PAUT(false);
    SETDAMOP_INI(false);
    SETDAMOP_FSE(false);
    SETDAMOP_ASE(false);
    SETDAMOP_TE(false);
    SETDAMOP_AE(false);
    SETDAMOP_FE(false);
    SETDAMOP_VE(false);
    SETDAMOP_GSE(false);
    SETDAMOP_ASP(false);
    SETDAMOP_FRA(false);
    SETDAMOP_ARA(false);
    SETDAMOP_FINALIZADO(false);

    if (v ==='a2d2adfc-8e12-11ed-a98c-040300000000'){
     SETDAMOP_INI(true);
    }else if(v ==='d117049e-8e12-11ed-a98c-040300000000'){
      SETDAMOP_FSE(true);
    }else if(v ==='e0f0d317-8e12-11ed-a98c-040300000000'){
      SETDAMOP_ASE(true);
    }else if(v ==='ef68291d-8e12-11ed-a98c-040300000000'){
      SETDAMOP_TE(true);
    }else if(v ==='fe7fae95-8e12-11ed-a98c-040300000000'){
      SETDAMOP_AE(true);
    }else if(v ==='0c1b887e-8e13-11ed-a98c-040300000000'){
      SETDAMOP_FE(true);
    }else if(v ==='1a7d41ed-8e13-11ed-a98c-040300000000'){
      SETDAMOP_VE(true);
    }else if(v ==='2a879241-8e13-11ed-a98c-040300000000'){
      SETDAMOP_GSE(true);
    }else if(v ==='399a2ffe-8e13-11ed-a98c-040300000000'){
      SETDAMOP_ASP(true);
    }else if(v ==='4a5cf61b-8e13-11ed-a98c-040300000000'){
      SETDAMOP_FRA(true);
    }else if(v ==='596e5f1e-8e13-11ed-a98c-040300000000'){
      SETDAMOP_ARA(true);
    }else if(v ==='67d9cdb6-8e13-11ed-a98c-040300000000'){
      SETDAMOP_FINALIZADO(true);
    }else if(v ==='e6fd8a34-9073-11ed-a98c-040300000000'){
      SETDAMOP_PFI(true);
    }else if(v ==='f747b03c-9073-11ed-a98c-040300000000'){
      SETDAMOP_PAUT(true);
    }

   
   
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
        AlertS.fire({
          title: res.RESPONSE,
          icon: "success",
        }).then(async (result) => {
          if (result.isConfirmed) {
            handleClick();
            handleClose();
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
  };

  const openmodalc = (operacion: number) => {
    if (selectionModel.length >= 1) {
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

  const handleUploadprestamos = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.id);
    formData.append("tipo", "prestamosParticipaciones");
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
        text: "Solo se permite seleccionar un registro para La distribución",
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
        title: "Eliminación",
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

          DPCPServices.eliminarSolicitudes(data).then((res) => {
            if (res.SUCCESS) {
              AlertS.fire({
                title: res.RESPONSE,
                icon: "success",
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

    } else {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    }
  };

  const integrarOperaciones = () => {

    if (selectionModel.length > 1) {
      Swal.fire({
        icon: "info",
        title: "Integración",
        text: "Los Movimientos Seleccionados se integraran en una sola operación",
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

  const unificarSolicitudes = () => {

    if (selectionModel.length > 1) {
      Swal.fire({
        icon: "info",
        title: "Unificación",
        text: "Los Movimientos Seleccionados se Unificaran en una sola operación",
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
              DPCPServices.unificarSolicitudes(data).then((res) => {
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
            NUMOPERACION: 1,
            OBJS: selectionModel,
            CHUSER: user.id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.GenSolParticipaciones(data).then((res) => {
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
      });
    }
  };

  const handleClick = () => {
    if (idtipoSolicitud || idFondo || idMunicipio) {
      setIntOperaciones(false)

    }
    let data = {
      TIPO: 1,
      P_FONDO: idFondo === "false" ? "" : idFondo,
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDTIPO: idtipoFondo === "false" ? "" : idtipoFondo,
      P_IDTIPOSOL: idtipoSolicitud === "false" ? "" : idtipoSolicitud,
      P_IDESTATUS: idestatus === "false" ? "" : idestatus,

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
    let dataDis = {
      TIPO: 2,
      P_IDMUNICIPIO: idMunicipio,

    };
    DPCPServices.GetParticipaciones(dataDis).then((res) => {
      if (res.SUCCESS) {
        if (res.RESPONSE[0].numFideicomisos !== 0) {
          setMunTieneFide(true);
        }
      } else {
      }
    });
  };

  // useEffect(() => {
  // }, [
  //    selectionModel
  // ]);


  useEffect(() => {
    loadFilter(12);
    loadFilter(5);
    loadFilter(17);
    loadFilter(25);
    loadFilter(24);
    handleClick();
    downloadplantilla();
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "PARTMUN") {
        if (String(item.Referencia) === "AGREGPLANT") {
          setCargarPlant(true);
        } else if (String(item.Referencia) === "DESCPLANT") {
          setDescPlant(true);
        } else if (String(item.Referencia) === "DISFIDE") {
          setDisFide(true);
        }
      }
    });
  }, [
    // munTieneFide
  ]);

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


      {openModalDetalle ? (
        <ModalForm title={"Detalles de Registro"} handleClose={handleClose}>
          <ParticipacionesDetalle
            data={vrows} />
        </ModalForm>
      ) : (
        ""
      )}





      {openModalDescuento ? (
        <Descuentos
          tipo={1} handleClose={handleClose} dt={vrows} />
      ) : (
        ""
      )}

      <Grid container spacing={1} padding={0}>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} sx={{ textAlign: "center" }}>
              <Typography variant="h4" paddingBottom={2}>
                Generación de Solicitudes de Participaciones y Aportaciones
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12} direction="row"
          justifyContent="center"
          alignItems="center" >

          <Grid item xs={6} sm={4} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Estatus:</Typography>
            <SelectFrag
              value={idestatus}
              options={estatus}
              onInputChange={handleFilterChange5}
              placeholder={"Seleccione Estatus"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={6} sm={4} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Tipo De Fondo:</Typography>
            <SelectFrag
              value={idtipoFondo}
              options={tiposFondo}
              onInputChange={handleFilterChange1}
              placeholder={"Seleccione Tipo De Fondo"}
              label={""}
              disabled={false}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Tipo De Solicitud :</Typography>
            <SelectFrag
              value={idtipoSolicitud}
              options={tiposSolicitud}
              onInputChange={handleFilterChange4}
              placeholder={"Seleccione Tipo De Solicitud"}
              label={""}
              disabled={false}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} lg={2}>
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

          <Grid item xs={6} sm={4} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Municipio:</Typography>
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
          <ToggleButtonGroup>

            <Tooltip title={"Integrar Operaciones"}>
              <ToggleButton value="check"
                disabled={data.length === 0 || intOperaciones || idtipoSolicitud.length < 6 || idFondo.length < 6 || idMunicipio.length < 6}
                onClick={() => integrarOperaciones()}>
                <CallMergeIcon color={data.length === 0 || intOperaciones || idtipoSolicitud.length < 6 || idFondo.length < 6 || idMunicipio.length < 6 ? "inherit" : "primary"} />
              </ToggleButton>
            </Tooltip>

            <Tooltip title={"Unificar Registros"}>
              <ToggleButton value="check"
                disabled={data.length === 0 || intOperaciones || idtipoSolicitud.length < 6 || idMunicipio.length < 6}
                onClick={() => unificarSolicitudes()}>
                <CloseFullscreenIcon color={data.length === 0 || intOperaciones || idtipoSolicitud.length < 6 || idMunicipio.length < 6 ? "inherit" : "primary"} />
              </ToggleButton>
            </Tooltip>


            <Tooltip title={"Generar Solicitud"}>
              <ToggleButton disabled={idtipoSolicitud.length < 6 || intOperaciones} value="check" onClick={() => SolicitudOrdenPago()}>
                <SettingsSuggestIcon color={idtipoSolicitud.length < 6 || intOperaciones ? "inherit" : "primary"} />
              </ToggleButton>
            </Tooltip>

            <Tooltip title={"Asignar Observación"}>
              <ToggleButton value="check" onClick={() => openmodalc(2)}>
                <FormatAlignLeftIcon color="primary" />
              </ToggleButton>
            </Tooltip>




            {cargarPlant ? (
              <Tooltip title={"Generar Anticipos"}>
                <ToggleButton value="check">
                  <IconButton
                    color="primary"
                    aria-label="upload documento"
                    component="label"
                    size="large"
                  >
                    <input
                      hidden
                      accept=".xlsx, .XLSX, .xls, .XLS"
                      type="file"
                      value=""
                      onChange={(v) => handleUploadprestamos(v)}
                    />
                    <CurrencyExchangeIcon />
                  </IconButton>
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}



            {descPlant ? (
              <Tooltip title={"Descargar Plantilla"}>
                <ToggleButton value="check">
                  <IconButton
                    color="primary"
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
                    color="primary"
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
                <ToggleButton value="check"
                  disabled={!munTieneFide || data.length === 0 || idtipoSolicitud.length < 6 || idFondo.length < 6 || idMunicipio.length < 6}
                  onClick={() => Disitribuir()}>
                  <AccountTreeIcon color={!munTieneFide || data.length === 0 || idtipoSolicitud.length < 6 || idFondo.length < 6 || idMunicipio.length < 6 ? "inherit" : "primary"} />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {cargarPlant ? (
              <Tooltip title={"Eliminar Registro"}>
                <ToggleButton value="check" onClick={() => eliminar()}>
                  <DeleteForeverIcon color="error" />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}
          </ToggleButtonGroup>
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
              <ToggleButton value="check">
                <ArrowUpwardIcon />
              </ToggleButton>
            </Tooltip>
) : (
  ""
      )}

{DAMOP_AE ? (
            <Tooltip title={"Autorizar egresos"}>
              <ToggleButton value="check">
                <CheckCircleIcon />
              </ToggleButton>
            </Tooltip>
) : (
  ""
      )}

{DAMOP_FE ? (
            <Tooltip title={"Finalizar egreso"}>
              <ToggleButton value="check">
                <EditOffIcon />
              </ToggleButton>
            </Tooltip>
) : (
  ""
      )}

{DAMOP_VE ? (
            <Tooltip title={"Validar egreso"}>
              <ToggleButton value="check">
                <ThumbUpIcon />
              </ToggleButton>
            </Tooltip>
) : (
  ""
      )}

{DAMOP_GSE ? (
            <Tooltip title={"Generar solicitud de pago"}>
              <ToggleButton value="check">
                <AttachMoneyIcon />
              </ToggleButton>
            </Tooltip>
) : (
  ""
      )}

{DAMOP_FRA ? (
            <Tooltip title={"Finalizar requerimiento de anticipo"}>
              <ToggleButton value="check">
                <EditOffIcon />
              </ToggleButton>
            </Tooltip>
) : (
  ""
      )}

{DAMOP_ARA ? (
            <Tooltip title={"Autorizar requerimiento de anticipo"}>
              <ToggleButton value="check">
                <CheckCircleIcon />
              </ToggleButton>
            </Tooltip>
) : (
  ""
      )}


{DAMOP_PFI ? (
            <Tooltip title={"Finalizar Participación"}>
              <ToggleButton value="check">
                <EditOffIcon />
              </ToggleButton>
            </Tooltip>
) : (
  ""
      )}

{DAMOP_PAUT ? (
            <Tooltip title={"Autorizar Participación"}>
              <ToggleButton value="check">
                <CheckCircleIcon />
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
                isRowSelectable={(params) => (
                  params.row.NumCheque === null
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
  );
};

export default Participaciones;
