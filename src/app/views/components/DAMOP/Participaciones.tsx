import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import EditOffIcon from "@mui/icons-material/EditOff";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import InsightsIcon from "@mui/icons-material/Insights";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MoneyOffOutlinedIcon from "@mui/icons-material/MoneyOffOutlined";
import PolylineIcon from "@mui/icons-material/Polyline";
import PrintIcon from "@mui/icons-material/Print";
import SegmentIcon from "@mui/icons-material/Segment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControlLabel,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import { esES as gridEsES, GridSelectionModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import IconCFDI from "../../../assets/img/CFDI.svg";
import IconSPEI from "../../../assets/img/SPEI.svg";
import { AlertS } from "../../../helpers/AlertS";
import { base64ToArrayBuffer, dowloandfile } from "../../../helpers/Files";
import { Toast } from "../../../helpers/Toast";
import {
  MigraData,
  resultmigracion,
} from "../../../interfaces/parametros/ParametrosGenerales";
import SelectValues from "../../../interfaces/Select/SelectValues";
import {
  PERMISO,
  ResponseDataAdicional,
  USUARIORESPONSE,
} from "../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../services/catalogosServices";
import { DAMOPServices } from "../../../services/DAMOPServices";
import { DPCPServices } from "../../../services/DPCPServices";
import {
  getcontrolInternoEntidad,
  getDatosAdicionales,
  getPermisos,
  getToken,
  getUser,
} from "../../../services/localStorage";
import { ReportesServices } from "../../../services/ReportesServices";
import { fanios } from "../../../share/loadAnios";
import { fmeses } from "../../../share/loadMeses";
import { ModalCheque } from "../componentes/ModalCheque";
import ModalDAMOP from "../componentes/ModalDAMOP";
import { ModalSegmentos } from "../componentes/ModalSegmentos";
import SpeisAdmin from "../DAF/SpeisAdmin";
import { ORGHeader } from "../DAMOP/ORGHeader";
import SelectFrag from "../Fragmentos/SelectFrag";
import SelectFragMulti from "../Fragmentos/SelectFragMulti";
import { currencyFormatter, Moneda } from "../menu/CustomToolbar";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import Slider from "../Slider";
import TrazabilidadSolicitud from "../TrazabilidadSolicitud";
import { Descuentos } from "./Descuentos";
import { Retenciones } from "./Retenciones";
const Participaciones = () => {
  ///////////////modal de adminisracion Spei cfdi
  const [modoSpeiCfdi, setModoSpeiCfdi] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [mes, setMes] = useState<string>("");
  const [anio, setAnio] = useState<string>("");
  const [nombreArchivoExport, setNombreArchivoExport] = useState<string>("");
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  //MODAL
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDescuento, setOpenModalDescuento] = useState<boolean>(false);
  const [openModalRetenciones, setOpenModalRetenciones] =
    useState<boolean>(false);
  const [openModalDetalle, setOpenModalDetalle] = useState<boolean>(false);
  const [openModalVerSpei, setOpenModalVerSpei] = useState<boolean>(false);
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [fondos, setFondos] = useState<[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tiposSolicitud, setTiposSolicitud] = useState<SelectValues[]>([]);
  const [tiposFondo, setTiposFondo] = useState<SelectValues[]>([]);
  const [estatus, setEstatus] = useState<SelectValues[]>([]);
  const [vrows, setVrows] = useState<{}>("");
  const [openCheque, setOpenCheque] = useState(false);
  const [openSegmento, setOpenSegmento] = useState(false);
  const [tipo, setTipo] = useState(0);
  //Constantes de los filtros
  const [nombreFondo, setNombreFondo] = useState("");
  const [nombreMunicipio, setNombreMunicipio] = useState("");
  const [nombreMes, setNombreMes] = useState("");
  const [nombreExport, setNombreExport] = useState("");
  const [numerooperacion, setnumerooperacion] = useState(0);
  const [idtipoFondo, setIdTipoFondo] = useState("");
  const [idtipoSolicitud, setIdTipoSolicitud] = useState("");
  const [idestatus, setIdEstatus] = useState("");
  const [idFondo, setIdFondo] = useState<SelectValues[]>([]);
  const [idMunicipio, setidMunicipio] = useState("");
  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const DA: ResponseDataAdicional = JSON.parse(String(getDatosAdicionales()));
  const [plantilla, setPlantilla] = useState("");
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [cargarPlant, setCargarPlant] = useState<boolean>(false);
  const [asignaObservacion, setasignaObservacion] = useState<boolean>(false);
  const [marcaMonex, setMarcaMonex] = useState<boolean>(false);
  const [cargaPrestamos, setCargaPrestamos] = useState<boolean>(false);
  const [descPlant, setDescPlant] = useState<boolean>(false);
  const [disFide, setDisFide] = useState<boolean>(false);
  const [intOperaciones, setIntOperaciones] = useState<boolean>(true);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [verSegmentar, setVerSegmentar] = useState<boolean>(false);
  const [SORGANISMOS, setSORGANISMOS] = useState<boolean>(false);
  const [SESTATUS, setSESTATUS] = useState<boolean>(false);
  const [STIPOSOLICITUD, setSTIPOSOLICITUD] = useState<boolean>(false);
  const [SFONDO, setSFONDO] = useState<boolean>(false);
  const [SMUNICIPIO, setSMUNICIPIO] = useState<boolean>(false);
  const [SMES, setSMES] = useState<boolean>(false);
  const [SANIO, setSANIO] = useState<boolean>(false);
  const [CG_PLANTILLA_ORG, setCG_PLANTILLA_ORG] = useState<boolean>(true);
  const [INTEGRAR_OPERACION, setINTEGRAR_OPERACION] = useState<boolean>(false);
  const [INTEGRACION_MASIVA, setINTEGRACION_MASIVA] = useState<boolean>(false);
  const [UNIFICACION, setUNIFICACION] = useState<boolean>(false);
  const [ELIMINA, setELIMINA] = useState<boolean>(false);
  const [ELIMINAMASIVO, setELIMINAMASIVO] = useState<boolean>(false);
  const [INSERTAREG, setINSERTAREG] = useState<boolean>(false);
  const [editCabecera, setEditCabecera] = useState<boolean>(false);
  const [permisoAgregarDetalle, setPermisoAgregarDetalle] =
    useState<boolean>(false);
  const [permisoAgregarRetencion, setPermisoAgregarRetencion] =
    useState<boolean>(false);
  const [permisoEditarRetencion, setPermisoEditarRetencion] =
    useState<boolean>(false);
  const [permisoEliminarRetencion, setPermisoEliminarRetencion] =
    useState<boolean>(false);
  const [permisoAgregarDescuento, setPermisoAgregarDescuento] =
    useState<boolean>(false);
  const [permisoEditarDescuento, setPermisoEditarDescuento] =
    useState<boolean>(false);
  const [permisoEliminarDescuento, setPermisoEliminarDescuento] =
    useState<boolean>(false);
  const [permisoEliminarDetalleCabecera, setPermisoEliminarDetalleCabecera] =
    useState<boolean>(false);
  const [permisoEditarDetalleCabecera, setPermisoEditarDetalleCabecera] =
    useState<boolean>(false);
  const [permisoAgregarNumeroSolicitud, setPermisoAgregarNumeroSolicitud] =
    useState<boolean>(false);

  const [munTieneFide, setMunTieneFide] = useState<boolean>(false);
  const [sumaTotal, setSumaTotal] = useState<Number>();
  const [openTraz, setOpenTraz] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState<string>();
  const [DAMOP_INI, SETDAMOP_INI] = useState<boolean>(false);
  const [DAMOP_FSE, SETDAMOP_FSE] = useState<boolean>(false);
  const [DAMOP_ASE, SETDAMOP_ASE] = useState<boolean>(false);
  const [DAMOP_TE, SETDAMOP_TE] = useState<boolean>(false);
  const [DAMOP_AE, SETDAMOP_AE] = useState<boolean>(false);
  const [DAMOP_FE, SETDAMOP_FE] = useState<boolean>(false);
  const [DAMOP_VE, SETDAMOP_VE] = useState<boolean>(false);
  const [DAMOP_GSE, SETDAMOP_GSE] = useState<boolean>(false);
  const [DAMOP_ASP, SETDAMOP_ASP] = useState<boolean>(false);
  const [DAMOP_FRA, SETDAMOP_FRA] = useState<boolean>(false);
  const [DAMOP_ARA, SETDAMOP_ARA] = useState<boolean>(false);
  const [DAMOP_FINALIZADO, SETDAMOP_FINALIZADO] = useState<boolean>(false);
  const [DAMOP_PFI, SETDAMOP_PFI] = useState<boolean>(false);
  const [DAMOP_PAUT, SETDAMOP_PAUT] = useState<boolean>(false);
  const [DAF_SPEI, SETDAF_SPEI] = useState<boolean>(false);
  const [anchoAcciones, setAnchoAcciones] = useState<number>(0);
  const [idORG, setIdORG] = useState("");
  const [openModalCabecera, setOpenModalCabecera] = useState<boolean>(false);
  const [modo, setModo] = useState<string>("");
  const [organismos, setOrganismos] = useState<SelectValues[]>([]);

  const handleprintsolicitud = (data: any) => {
    setslideropen(true);
    let body = {
      P_ID: data?.id,
      P_NO: data?.row?.NumOper,
      P_ANIO: data?.row?.Anio,
      P_MES: data?.row?.Mes,
      P_BENEFICIARIO: data?.row?.Nombre,
      P_TOTAL: data?.row?.total,
      P_TIPO: data?.row?.TipoSolicituds,
    };
    Toast.fire({
      icon: "success",
      title: "La base de cálculo se descargara en un momento!",
    });

    ReportesServices.formatoSolicitud(body).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE));
        var blobStore = new Blob([bufferArray], { type: "application/pdf" });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        link.download = body.P_NO + "_Solicitud.pdf";
        window.open(link.href, "_blank");
        setslideropen(false);
      } else {
        setslideropen(false);
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handledetalles = (data: any) => {
    setOpenModalCabecera(true);
    setVrows(data);
    setModo("Ver");
  };

  const handleBorrarSolicitud = (v: any) => {
    let data = {
      CHID: v?.row?.id,
    };

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
        DAMOPServices.DesintegraOperacion(data).then((res) => {
          if (res.SUCCESS) {
            handleClose();
            //   console.log(res.RESPONSE[0])
            if (res.RESPONSE[0].Respuesta == 200) {
              Toast.fire({
                icon: "success",
                title: "Operación Realizada!",
              });
            } else {
              Toast.fire({
                icon: "error",
                title: res.RESPONSE[0].Mensaje,
              });
            }
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      }
    });
  };

  const handleChangeMostrarTodo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(event.target.checked);
  };

  const handleclose = (data: any) => {
    setOpenCheque(false);
    setOpenTraz(false);
    setOpenSegmento(false);
    handleClick();
  };

  const handlecheque = (data: any, tipo: number) => {
    setTipo(tipo);
    setOpenCheque(true);
    setVrows(data);
  };

  const downloadplantilla = () => {
    let name = "PLANTILLA CARGA ANTICIPO PARTICIPACIONES.xlsx";
    let data = {
      TOKEN: JSON.parse(String(getToken())),
      RUTA: "/DAMOP/PLANTILLAS/",
      NOMBRE: name,
    };
    dowloandfile(data);
  };

  const handleDescuento = (data: any) => {
    setVrows(data);
    setOpenModalDescuento(true);
  };

  const handleRetenciones = (data: any) => {
    setVrows(data);
    setOpenModalRetenciones(true);
  };

  const handleVerTazabilidad = (v: any) => {
    setOpenTraz(true);
    setIdSolicitud(v.row.id);
  };

  const handleVerSegmentos = (v: any) => {
    setVrows(v);
    setOpenSegmento(true);
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenModalDetalle(true);
  };
  const handleVerSpei = (data: any, modo: string) => {
    setVrows(data);
    setOpenModalVerSpei(true);
    setModoSpeiCfdi(modo);
  };

  const columnasMunicipio = [
    { field: "id", hide: true, hideable: false },
    {
      field: "Operaciones",
      disableExport: true,
      headerName: "Operaciones",
      description: "Operaciones",
      sortable: false,
      width: 200 + anchoAcciones,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title={"Base de Cálculo"}>
              <IconButton value="check" onClick={() => handleprintsolicitud(v)}>
                <MenuBookIcon />
              </IconButton>
            </Tooltip>

            {verTrazabilidad ? (
              <Tooltip title={"Ver Trazabilidad"}>
                <IconButton
                  value="check"
                  onClick={() => handleVerTazabilidad(v)}
                >
                  <InsightsIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {v.row.orden > 13 ? (
              <>
                <Tooltip title="Ver Spei">
                  <IconButton onClick={() => handleVerSpei(v, "SPEI")}>
                    <img className="iconButton" src={IconSPEI} />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              ""
            )}
            {v.row.orden > 13 ? (
              <Tooltip title="Administrar CFDI">
                <IconButton onClick={() => handleVerSpei(v, "CFDI")}>
                  <img className="iconButton" src={IconCFDI} />
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
      headerName: "Estatus del pago",
      description: "Estatus del pago",
      width: 170,
    },
    // {
    //   field: "NumOper",
    //   headerName: "Nº De Operación",
    //   description: "Nº De Operación",
    //   width: 110,
    // },
    {
      field: "Anio",
      headerName: "Ejercicio",
      width: 100,
      description: "Ejercicio",
    },
    {
      field: "Mes",
      headerName: "Mes",
      width: 80,
      description: "Mes",
    },
    {
      field: "TipoSolicituds",
      headerName: "Tipo",
      width: 170,
      description: "Tipo de Solicitud",
    },
    // {
    //   field: "ClaveEstado",
    //   headerName: "Clave Estado",
    //   width: 100,
    //   description: "Clave Estado",
    // },
    // {
    //   field: "Nombre",
    //   headerName: "Proveedor",
    //   width: 200,
    //   description: "Proveedor",
    // },
    {
      field: "tipocalculo",
      headerName: "Tipo Cálculo",
      description: "Tipo Cálculo",
      width: 150,
    },
    {
      field: "a9",
      headerName: "Descripción",
      description: "Descripción",
      width: 250,
    },
    {
      field: "total",
      headerName: "Total Bruto",
      width: 140,
      description: "Total Bruto",
      ...Moneda,
    },
    {
      field: "Retenciones",
      headerName: "Retenciones",
      width: 120,
      description: "Retenciones",
      ...Moneda,
    },
    {
      field: "RecAdeudos",
      headerName: "Recaudación de Adeudos",
      width: 160,
      description: "Recaudación de Adeudos",
      ...Moneda,
    },
    {
      field: "Descuentos",
      headerName: "Descuentos",
      width: 100,
      description: "Descuentos",
      ...Moneda,
    },
    {
      field: "a5",
      headerName: "Total Neto",
      width: 200,
      description: "Total Neto = (Total Bruto - (Retenciones + Descuentos))",
      ...Moneda,
      renderHeader: () => (
        <>{"Total: " + currencyFormatter.format(Number(sumaTotal))}</>
      ),
    },
  ];

  const columnsParticipaciones = [
    { field: "id", hide: true, hideable: false },
    { field: "TipoSolicitud", hide: true, hideable: false },
    { field: "IdConCheque", hide: true, hideable: false },
    {
      field: "Operaciones",
      disableExport: true,
      headerName: "Operaciones",
      description: "Operaciones",
      sortable: false,
      width: 200 + anchoAcciones,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title={"Base de Cálculo"}>
              <IconButton value="check" onClick={() => handleprintsolicitud(v)}>
                <PrintIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Administrar Detalles"}>
              <IconButton value="check" onClick={() => handledetalles(v)}>
                <MenuBookIcon />
              </IconButton>
            </Tooltip>

            {ELIMINA && v.row.Integrado == 1 ? (
              <IconButton
                value="check"
                onClick={() => handleBorrarSolicitud(v)}
              >
                <Tooltip title={"Eliminar"}>
                  <DeleteForeverOutlinedIcon />
                </Tooltip>
              </IconButton>
            ) : (
              ""
            )}

            {verSegmentar && String(v.row.estatus) == "Ingresando Operación" ? (
              <Tooltip title={"Segmentar Operación"}>
                <IconButton value="check" onClick={() => handleVerSegmentos(v)}>
                  <SegmentIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {verTrazabilidad ? (
              <Tooltip title={"Ver Trazabilidad"}>
                <IconButton
                  value="check"
                  onClick={() => handleVerTazabilidad(v)}
                >
                  <InsightsIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {(String(v.row.estatus) == "Ingresando Operación" && cargarPlant) ||
            permisoAgregarNumeroSolicitud ? (
              <Tooltip title={"Asignar N° de Solicitud de Pago"}>
                <IconButton value="check" onClick={() => handlecheque(v, 5)}>
                  <MonetizationOnIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {v.row.orden >= 13 ? (
              <>
                <Tooltip title="Ver Spei">
                  <IconButton onClick={() => handleVerSpei(v, "SPEI")}>
                    <img className="iconButton" src={IconSPEI} />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              ""
            )}
            {v.row.orden >= 15 ? (
              <Tooltip title="Administrar CFDI">
                <IconButton onClick={() => handleVerSpei(v, "CFDI")}>
                  <img className="iconButton" src={IconCFDI} />
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
      field: "AccionesDescuentos",
      disableExport: true,
      headerName: "Descuentos",
      description: "Descuentos",
      sortable: false,
      width: 98,
      renderCell: (v: any) => {
        return (
          <Box>
            {String(v.row.estatusCI) == "DAMOP_INI" ? (
              <Tooltip title="Administrar Descuentos">
                <IconButton onClick={() => handleDescuento(v)}>
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
      field: "AccionesRetenciones",
      disableExport: true,
      headerName: "Retenciones",
      description: "Retenciones",
      sortable: false,
      width: 90,
      renderCell: (v: any) => {
        return (
          <Box>
            {String(v.row.estatusCI) == "DAMOP_INI" ? (
              <>
                <Tooltip title="Admistrar Retenciones">
                  <IconButton onClick={() => handleRetenciones(v)}>
                    <MoneyOffOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </>
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
      description: "Estatus",
      width: 170,
    },
    {
      field: "NumOper",
      headerName: "Nº De Operación",
      description: "Nº De Operación",
      width: 110,
    },
    {
      field: "NumParticipacion",
      headerName: "Número De Participación",
      width: 150,
      description: "Número De Participación",
    },
    {
      field: "NumSolEgreso",
      headerName: "Solicitud De Egreso",
      width: 145,
      description: "Número De Solicitud De Egreso",
    },
    {
      field: "NumEgreso",
      headerName: "Egreso",
      width: 80,
      description: "Número De Egreso",
    },
    {
      field: "a3",
      headerName: "Solicitud de Pago",
      width: 120,
      description: "Número De Solicitud de Pago",
    },

    {
      field: "NumRequerimientoAnt",
      headerName: "Req. De Anticipo",
      width: 120,
      description: "Número De Requerimiento De Anticipo",
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
      width: 80,
      description: "Mes",
    },
    {
      field: "TipoSolicituds",
      headerName: "Tipo",
      width: 170,
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
      headerName: "Proveedor",
      width: 200,
      description: "Proveedor",
    },
    {
      field: "tipocalculo",
      headerName: "Tipo Cálculo",
      description: "Tipo Cálculo",
      width: 150,
    },
    {
      field: "a9",
      headerName: "Descripción",
      description: "Descripción",
      width: 250,
    },
    {
      field: "ClaveBeneficiario",
      headerName: "Cve. Beneficiario",
      width: 100,
      description: "Clave de Beneficiario",
    },
    {
      field: "uresclave",
      headerName: "U. Resp",
      description: "Unidad Responsable",
      width: 80,
    },
    {
      field: "NumProyecto",
      headerName: "Número de Proyecto",
      description: "Número de Proyecto",
      width: 150,
    },

    {
      field: "Presupuesto",
      headerName: "Presupuesto SIREGOB",
      width: 170,
      description: "Presupuesto SIREGOB",
      ...Moneda,
    },
    {
      field: "total",
      headerName: "Total Bruto",
      width: 140,
      description: "Total Bruto",
      ...Moneda,
    },
    {
      field: "Retenciones",
      headerName: "Retenciones",
      width: 120,
      description: "Retenciones",
      ...Moneda,
    },
    {
      field: "RecAdeudos",
      headerName: "Recaudación de Adeudos",
      width: 160,
      description: "Recaudación de Adeudos",
      ...Moneda,
    },
    {
      field: "Descuentos",
      headerName: "Descuentos",
      width: 100,
      description: "Descuentos",
      ...Moneda,
    },
    {
      field: "a5",
      headerName: "Total Neto",
      width: 200,
      description: "Total Neto = (Total Bruto - (Retenciones + Descuentos))",
      ...Moneda,
      renderHeader: () => (
        <>{"Total: " + currencyFormatter.format(Number(sumaTotal))}</>
      ),
    },
    {
      field: "Proveedor",
      headerName: "Proveedor",
      width: 80,
      description: "Proveedor",
    },
    {
      field: "Deudor",
      headerName: "Deudor",
      width: 80,
      description: "Deudor",
    },
    {
      field: "clasificacion",
      headerName: "Clasificación",
      width: 100,
      description: "Clasificación de Solicitud de Pago",
    },
    {
      field: "FechadePago",
      headerName: "Fecha de Pago",
      width: 100,
      description: "Fecha de Pago",
    },
    {
      field: "Divisa",
      headerName: "Divisa",
      width: 80,
      description: "Divisa",
    },
    {
      field: "Monex",
      headerName: "Monex",
      width: 80,
      description: "Monex",
      renderCell: (v: any) => {
        return <>{v.row.Monex == 1 ? "SI" : "NO"}</>;
      },
    },
    {
      field: "Observaciones",
      headerName: "Observaciones",
      width: 400,
      description: "Observaciones",
    },
  ];

  const handleAgregarRegistro = () => {
    setOpenModalCabecera(true);
    setModo("Nuevo");
  };

  const handleUploadORG = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "MigraOrganimos");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      const obj: MigraData = res;
      if (obj.RESPONSE.length > 0) {
        let sp = "";
        obj.RESPONSE.map((item: resultmigracion) => {
          sp = sp + item.IDENTIFICADORC + ",";
        });
        AlertS.fire({
          title:
            "Favor de validar las siguientes solicitudes en el archivo de carga",
          text: sp,
          icon: "warning",
          footer: "No se registraron en el sistema",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const loadFilter = (operacion: number) => {
    setslideropen(true);
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion == 31) {
        setFondos(res.RESPONSE);
        setslideropen(false);
      } else if (operacion == 5) {
        setMunicipios(res.RESPONSE);
        setslideropen(false);
      } else if (operacion == 17) {
        setslideropen(false);
        setTiposFondo(res.RESPONSE);
      } else if (operacion == 24) {
        setTiposSolicitud(res.RESPONSE);
        setslideropen(false);
      } else if (operacion == 25) {
        setEstatus(res.RESPONSE);
        setIdEstatus(
          getcontrolInternoEntidad()
            ? getcontrolInternoEntidad() == "ORG" ||
              getcontrolInternoEntidad() == "MUN"
              ? ""
              : res.RESPONSE[0].value
            : ""
        );
        setslideropen(false);
      } else if (operacion == 38) {
        setOrganismos(res.RESPONSE);
        setslideropen(false);
      }
    });
  };

  const handleClose = () => {
    setOpenModalCabecera(false);
    setOpenModal(false);
    setOpenModalRetenciones(false);
    setOpenModalDescuento(false);
    setOpenModalDetalle(false);
    setOpenModalVerSpei(false);
    //handleClick();
  };
  const handleAccion = () => {};

  const handleFilterChange1 = (v: string) => {
    setIdTipoFondo(v);
  };

  const handleFilterChange2 = (v: SelectValues[]) => {
    setIdFondo(v);
    setIntOperaciones(true);
    setMunTieneFide(false);
  };

  const handleFilterChange3 = (v: string) => {
    setNombreMunicipio(
      municipio.find(({ value }) => value == v)?.label == undefined
        ? ""
        : String(municipio.find(({ value }) => value == v)?.label)
    );
    setidMunicipio(v);
    setIntOperaciones(true);
    setMunTieneFide(false);
  };

  const handleFilterChange4 = (v: string) => {
    setIdTipoSolicitud(v);
    setIntOperaciones(true);
    setMunTieneFide(false);
  };
  const handleSelectMes = (data: any) => {
    setNombreMes(
      meses.find(({ value }) => value == data)?.label == undefined
        ? ""
        : String(meses.find(({ value }) => value == data)?.label)
    );
    setMes(data);
  };

  const handleSelectAnio = (data: any) => {
    setAnio(data);
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
    SETDAF_SPEI(false);
    // setEditCabecera(false);
    SETDAMOP_FINALIZADO(false);
  };

  const Fnworkflow = (data: string) => {
    let obj = {
      NUMOPERACION: numerooperacion,
      OBJS: selectionModel,
      CHUSER: user.Id,
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
          title: "¡Error!",
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
        title: "¡Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    }
  };

  const handleUploadPA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "updatePA");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      handleClick();
    });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "anticipoParticipaciones");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      handleClick();
    });
  };

  const handleUploadprestamos = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "prestamosParticipaciones");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      handleClick();
    });
  };

  const Disitribuir = () => {
    if (selectionModel.length == 1) {
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
            CHUSER: user.Id,
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
                    title: "¡Consulta Exitosa!",
                  });
                  handleClick();
                } else {
                  AlertS.fire({
                    title: "¡Error!",
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
        title: "¡Error!",
        text: "Sólo se permite seleccionar un registro para La distribución",
        icon: "error",
      });
    } else {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    }
  };

  const handleMonex = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Seleccionar Registros",
        icon: "error",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Los registros se marcaran como Tipo Monex",
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
            CHUSER: user.Id,
          };

          DPCPServices.MarcaMonex(data).then((res) => {
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
                title: "¡Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
        }
      });
    }
  };

  const eliminar = () => {
    if (selectionModel.length !== 0) {
      Swal.fire({
        icon: "error",
        title: "Eliminación",
        text: "El Movimiento Seleccionado se Eliminará",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {
            OBJS: selectionModel,
            CHUSER: user.Id,
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
                title: "¡Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
        }
      });
    } else {
      AlertS.fire({
        title: "¡Error!",
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
        text: "Los Movimientos Seleccionados se integrarán en una sola operación",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {
            OBJS: selectionModel,
            CHUSER: user.Id,
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
                    title: "¡Consulta Exitosa!",
                  });
                  handleClick();
                } else {
                  AlertS.fire({
                    title: "¡Error!",
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
        title: "¡Error!",
        text: "Favor de Seleccionar más de un Registro",
        icon: "error",
      });
    }
  };

  const handleFiltroORG = (v: string) => {
    setIdORG(v);
  };

  const integracionMasiva = () => {
    if (idFondo.length == 1 && mes !== "false" && idestatus !== "false") {
      Swal.fire({
        icon: "info",
        title: "Integración Masiva ",
        text: "Los Movimientos de los diversos tipos de cálculos se unificarán en uno solo",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setslideropen(true);
          const formData = new FormData();
          formData.append("CHUSER", user.Id);
          formData.append("IDESTATUS", idestatus);
          formData.append("MES", mes);
          formData.append("FONDO", String(idFondo[0].value));
          formData.append("tipo", "integramasiva");
          CatalogosServices.migraData(formData).then((res) => {
            setslideropen(false);
            handleClick();
          });
        }
      });
    } else {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Seleccionar los filtros de fondo ,mes, estatus",
        icon: "error",
      });
    }
  };

  const unificarSolicitudes = () => {
    if (selectionModel.length > 1) {
      Swal.fire({
        icon: "info",
        title: "Unificación",
        text: "Los Movimientos Seleccionados se Unificarán en una sola operación",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {
            OBJS: selectionModel,
            CHUSER: user.Id,
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
                    title: "¡Consulta Exitosa!",
                  });
                  handleClick();
                } else {
                  AlertS.fire({
                    title: "¡Error!",
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
        title: "¡Error!",
        text: "Favor de Seleccionar más de un Registro",
        icon: "error",
      });
    }
  };

  const SolicitudOrdenPago = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
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
            CHUSER: user.Id,
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
                    title: "¡Error!",
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

  const handleFinalizarParticipacion = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
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
            CHUSER: user.Id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.FinParticipaciones(data).then((res) => {
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
                    title: "¡Error!",
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

  const handleTranEgreso = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
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
            CHUSER: user.Id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.TransferirEgreso(data).then((res) => {
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
                    title: "¡Error!",
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

  const handleAuthParticipacion = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
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
            CHUSER: user.Id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.AutParticipaciones(data).then((res) => {
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
                    title: "¡Error!",
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

  const handleFinEgreso = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
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
            CHUSER: user.Id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.FinEgreso(data).then((res) => {
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
                    title: "¡Error!",
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

  const handleAutEgresos = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
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
            CHUSER: user.Id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.AutEgreso(data).then((res) => {
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
                    title: "¡Error!",
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

  const handleGenNumOrdenPago = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
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
            CHUSER: user.Id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.GenNumOrdenePago(data).then((res) => {
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
                    title: "¡Error!",
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

  const handleValEgresos = () => {
    if (selectionModel.length == 0) {
      AlertS.fire({
        title: "¡Error!",
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
            CHUSER: user.Id,
          };

          AlertS.fire({
            title: "Solicitud Enviada",
            icon: "success",
          }).then(async (result) => {
            if (result.isConfirmed) {
              DPCPServices.ValidarEgreso(data).then((res) => {
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
                    title: "¡Error!",
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
    if (
      (DA?.MUNICIPIO?.length == 0 && getcontrolInternoEntidad() == "MUN") ||
      (DA?.ORG?.length == 0 && getcontrolInternoEntidad() == "ORG")
    ) {
      AlertS.fire({
        title:
          String(
            DA?.MUNICIPIO?.length == 0 && getcontrolInternoEntidad() == "MUN"
              ? "Sin Municipio asignado "
              : "234"
          ) +
          String(
            DA?.ORG?.length == 0 && getcontrolInternoEntidad() == "ORG"
              ? " Sin Organismo asignado"
              : "5677"
          ),
        // text: res.STRMESSAGE,
        icon: "error",
      });
    } else {
      if (nombreFondo !== "" || nombreMunicipio !== "" || nombreMes !== "") {
        setNombreExport(
          String(
            (nombreFondo == "" ? "" : nombreFondo) +
              (nombreMunicipio == "" ? "" : " " + nombreMunicipio) +
              (nombreMes == "" ? "" : " " + nombreMes)
          ).trim()
        );
      } else {
        setNombreExport("Participaciones y Aportaciones");
      }

      if (idtipoSolicitud || idFondo || idMunicipio) {
        setIntOperaciones(false);
      }

      if (idestatus == "a2d2adfc-8e12-11ed-a98c-040300000000") {
        SETDAMOP_INI(true);
      } else if (idestatus == "d117049e-8e12-11ed-a98c-040300000000") {
        SETDAMOP_FSE(true);
      } else if (idestatus == "e0f0d317-8e12-11ed-a98c-040300000000") {
        SETDAMOP_ASE(true);
      } else if (idestatus == "ef68291d-8e12-11ed-a98c-040300000000") {
        SETDAMOP_TE(true);
      } else if (idestatus == "fe7fae95-8e12-11ed-a98c-040300000000") {
        SETDAMOP_AE(true);
      } else if (idestatus == "0c1b887e-8e13-11ed-a98c-040300000000") {
        SETDAMOP_FE(true);
      } else if (idestatus == "1a7d41ed-8e13-11ed-a98c-040300000000") {
        SETDAMOP_VE(true);
      } else if (idestatus == "2a879241-8e13-11ed-a98c-040300000000") {
        SETDAMOP_GSE(true);
      } else if (idestatus == "399a2ffe-8e13-11ed-a98c-040300000000") {
        SETDAMOP_ASP(true);
      } else if (idestatus == "4a5cf61b-8e13-11ed-a98c-040300000000") {
        SETDAMOP_FRA(true);
      } else if (idestatus == "596e5f1e-8e13-11ed-a98c-040300000000") {
        SETDAMOP_ARA(true);
      } else if (idestatus == "67d9cdb6-8e13-11ed-a98c-040300000000") {
        SETDAMOP_FINALIZADO(true);
      } else if (idestatus == "e6fd8a34-9073-11ed-a98c-040300000000") {
        SETDAMOP_PFI(true);
      } else if (idestatus == "f747b03c-9073-11ed-a98c-040300000000") {
        SETDAMOP_PAUT(true);
      } else if (idestatus == "b825e8af-91e8-11ed-a912-705a0f328da6") {
        SETDAF_SPEI(true);
      }
      let data = {
        TIPO: 1,
        P_FONDO: idFondo.length > 0 ? idFondo : "",
        //   P_IDMUNICIPIO: user.MUNICIPIO.length > 0 ? user.MUNICIPIO[0].id : idMunicipio == "false" ? "" : idMunicipio,
        //  P_IDTIPO: user.MUNICIPIO.length > 0 || user.ORG.length > 0 || DEP0]?.NombreCorto == "MUN" || getcontrolInternoEntidad() == "ORG" ? "PROV" : idtipoFondo == "false" ? "" : idtipoFondo,
        P_IDTIPOSOL: idtipoSolicitud == "false" ? "" : idtipoSolicitud,
        P_IDESTATUS: idestatus == "false" ? "" : idestatus,
        P_IDMES: mes == "false" ? "" : mes,
        //  P_IDORGANISMO: user?.ORG[0] ? user.ORG[0].id : idORG == "false" ? "" : idORG,
        P_CHUSER: user.Id,
        P_GRUPO: getcontrolInternoEntidad(),
        P_ANIO: anio == "false" ? "" : anio,
      };
      setslideropen(true);
      DPCPServices.GetParticipaciones(data).then((res) => {
        if (res.SUCCESS) {
          setData(res.RESPONSE);
          var sumatotal = 0;
          res.RESPONSE.map((item: any) => {
            sumatotal = sumatotal + Number(item.a5);
            setSumaTotal(sumatotal);
          });
          setslideropen(false);
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
          setslideropen(false);
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
    }
  };

  useEffect(
    () => {
      var ancho = 0;
      setMeses(fmeses());
      setAnios(fanios());
      loadFilter(27);
      loadFilter(31);
      loadFilter(5);
      loadFilter(17);
      loadFilter(25);
      loadFilter(24);
      loadFilter(38);
      permisos.map((item: PERMISO) => {
        if (String(item.ControlInterno) == "PARTMUN") {
          if (String(item.ControlInterno) == "AGREGPLANT") {
            setCargarPlant(true);
          } else if (String(item.ControlInterno) == "DESCPLANT") {
            setDescPlant(true);
          } else if (String(item.ControlInterno) == "DISFIDE") {
            setDisFide(true);
          } else if (String(item.ControlInterno) == "TRAZASPEIDAF") {
            ancho = ancho + 50;
            setVerTrazabilidad(true);
          } else if (String(item.ControlInterno) == "SEGM") {
            ancho = ancho + 50;
            setVerSegmentar(true);
          } else if (String(item.ControlInterno) == "ASIGNAOBS") {
            ancho = ancho + 50;
            setasignaObservacion(true);
          } else if (String(item.ControlInterno) == "CGPRESTAMO") {
            ancho = ancho + 50;
            setCargaPrestamos(true);
          } else if (String(item.ControlInterno) == "AG_REGISTRO") {
            ancho = ancho + 50;
            //setCargaPrestamos(true);
          } else if (String(item.ControlInterno) == "CG_PLANTILLA_ORG") {
            ancho = ancho + 50;
            setCG_PLANTILLA_ORG(true);
          } else if (String(item.ControlInterno) == "INTEGRAR_OPERACION") {
            ancho = ancho + 50;
            setINTEGRAR_OPERACION(true);
          } else if (String(item.ControlInterno) == "INTEGRACION_MASIVA") {
            ancho = ancho + 50;
            setINTEGRACION_MASIVA(true);
          } else if (String(item.ControlInterno) == "UNIFICACION") {
            ancho = ancho + 50;
            setUNIFICACION(true);
          } else if (String(item.ControlInterno) == "SORGANISMOS") {
            setSORGANISMOS(true);
          } else if (String(item.ControlInterno) == "SESTATUS") {
            setSESTATUS(true);
          } else if (String(item.ControlInterno) == "STIPOSOLICITUD") {
            setSTIPOSOLICITUD(true);
          } else if (String(item.ControlInterno) == "SFONDO") {
            setSFONDO(true);
          } else if (String(item.ControlInterno) == "SMUNICIPIO") {
            setSMUNICIPIO(true);
          } else if (String(item.ControlInterno) == "SMES") {
            setSMES(true);
          } else if (String(item.ControlInterno) == "ELIMINA") {
            setELIMINA(true);
          } else if (String(item.ControlInterno) == "ELIMINAMASIVO") {
            setELIMINAMASIVO(true);
          } else if (String(item.ControlInterno) == "INSERTAREG") {
            setINSERTAREG(true);
          } else if (String(item.ControlInterno) == "EDITCAB") {
            setEditCabecera(true);
          } else if (String(item.ControlInterno) == "AGREGDETALLE") {
            setPermisoAgregarDetalle(true);
          } else if (String(item.ControlInterno) == "AGREGRETEN") {
            setPermisoAgregarRetencion(true);
          } else if (String(item.ControlInterno) == "EDITRETENCION") {
            setPermisoEditarRetencion(true);
          } else if (String(item.ControlInterno) == "DELETERETEN") {
            setPermisoEliminarRetencion(true);
          } else if (String(item.ControlInterno) == "ELIMDETCABECERA") {
            setPermisoEliminarDetalleCabecera(true);
          } else if (String(item.ControlInterno) == "EDITARDETALLECABECERA") {
            setPermisoEditarDetalleCabecera(true);
          } else if (String(item.ControlInterno) == "ELIMDESC") {
            setPermisoEliminarDescuento(true);
          } else if (String(item.ControlInterno) == "EDITDESC") {
            setPermisoEditarDescuento(true);
          } else if (String(item.ControlInterno) == "AGREGDESC") {
            setPermisoAgregarDescuento(true);
          } else if (String(item.ControlInterno) == "ASIGNANUMEROORDENPAGO") {
            setPermisoAgregarNumeroSolicitud(true);
          } else if (String(item.ControlInterno) == "MARCAMONEX") {
            setMarcaMonex(true);
          } else if (String(item.ControlInterno) == "SANIO") {
            setSANIO(true);
          }
        }
        setAnchoAcciones(ancho);
      });
      handleClick();
    },
    [
      // munTieneFide
    ]
  );
  const handleBorrarMasivo = (v: GridSelectionModel) => {
    setSelectionModel(v);
  };
  return (
    <div>
      <Slider open={slideropen}></Slider>

      <Grid container spacing={1} padding={0}>
        <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h4" paddingBottom={2}>
                Distribución de Recursos a Municipios y Organismos Públicos
                Descentralizados
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          spacing={1}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {SORGANISMOS ? (
            <Grid
              item
              xs={11.5}
              sm={6}
              md={4}
              lg={
                getcontrolInternoEntidad()
                  ? getcontrolInternoEntidad() == "ORG"
                    ? 4
                    : 2
                  : 2
              }
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                {getcontrolInternoEntidad()
                  ? getcontrolInternoEntidad() == "ORG"
                    ? DA?.ORG[0].Descripcion
                    : "Organismos"
                  : "Organismos"}
              </Typography>
              {getcontrolInternoEntidad() ? (
                getcontrolInternoEntidad() == "ORG" ? (
                  ""
                ) : (
                  <SelectFrag
                    value={idORG}
                    options={organismos}
                    onInputChange={handleFiltroORG}
                    placeholder={"Seleccione Un Organismo"}
                    label={""}
                    disabled={false}
                  />
                )
              ) : (
                ""
              )}
            </Grid>
          ) : (
            ""
          )}

          {SESTATUS ? (
            <Grid item xs={11.5} sm={6} md={4} lg={2}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Estatus:
              </Typography>
              <SelectFrag
                value={idestatus}
                options={estatus}
                onInputChange={handleFilterChange5}
                placeholder={"Seleccione Estatus"}
                label={""}
                disabled={false}
              />
            </Grid>
          ) : (
            ""
          )}

          {STIPOSOLICITUD ? (
            <Grid
              item
              xs={11.5}
              sm={6}
              md={4}
              lg={
                getcontrolInternoEntidad()
                  ? getcontrolInternoEntidad() == "ORG" ||
                    getcontrolInternoEntidad() == "MUN"
                    ? 4
                    : 2
                  : 2
              }
            >
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Tipo De Solicitud :
              </Typography>
              <SelectFrag
                value={idtipoSolicitud}
                options={tiposSolicitud}
                onInputChange={handleFilterChange4}
                placeholder={"Seleccione Tipo De Solicitud"}
                label={""}
                disabled={false}
              />
            </Grid>
          ) : (
            ""
          )}

          {SFONDO ? (
            <Grid
              item
              xs={11.5}
              sm={6}
              md={4}
              lg={
                getcontrolInternoEntidad()
                  ? getcontrolInternoEntidad() == "ORG" ||
                    getcontrolInternoEntidad() == "MUN"
                    ? 4
                    : 2
                  : 2
              }
            >
              <Typography sx={{ fontFamily: "sans-serif" }}>Fondo:</Typography>

              <SelectFragMulti
                options={fondos}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione Fondo(s)"}
                label={""}
                disabled={false}
              />
            </Grid>
          ) : (
            ""
          )}

          {SMUNICIPIO ? (
            <Grid
              item
              xs={11.5}
              sm={6}
              md={4}
              lg={
                getcontrolInternoEntidad()
                  ? getcontrolInternoEntidad() == "MUN"
                    ? 4
                    : 2
                  : 2
              }
            >
              <Typography sx={{ fontFamily: "sans-serif" }}>
                {getcontrolInternoEntidad()
                  ? getcontrolInternoEntidad() == "MUN"
                    ? DA.MUNICIPIO[0].Nombre
                    : "Municipios"
                  : "Municipios"}
              </Typography>

              {getcontrolInternoEntidad() ? (
                getcontrolInternoEntidad() == "MUN" ? (
                  ""
                ) : (
                  <SelectFrag
                    value={idMunicipio}
                    options={municipio}
                    onInputChange={handleFilterChange3}
                    placeholder={"Seleccione Municipio"}
                    label={""}
                    disabled={false}
                  />
                )
              ) : (
                ""
              )}
            </Grid>
          ) : (
            ""
          )}

          {SANIO ? (
            <Grid
              item
              xs={11.5}
              sm={6}
              md={4}
              lg={
                getcontrolInternoEntidad()
                  ? getcontrolInternoEntidad() == "ORG" ||
                    getcontrolInternoEntidad() == "MUN"
                    ? 4
                    : 2
                  : 2
              }
            >
              <Typography sx={{ fontFamily: "sans-serif" }}>Año :</Typography>
              <SelectFrag
                value={anio}
                options={anios}
                onInputChange={handleSelectAnio}
                placeholder={"Seleccione Año"}
                label={""}
                disabled={false}
              />
            </Grid>
          ) : (
            ""
          )}

          {SMES ? (
            <Grid
              item
              xs={11.5}
              sm={6}
              md={4}
              lg={
                getcontrolInternoEntidad()
                  ? getcontrolInternoEntidad() == "ORG" ||
                    getcontrolInternoEntidad() == "MUN"
                    ? 4
                    : 2
                  : 2
              }
            >
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
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={0}>
          <Button
            // className="enviar"
            onClick={handleClick}
            variant="contained"
            color="secondary"
          >
            <Typography sx={{ color: "white" }}> Buscar </Typography>
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={-1}>
          <ToggleButtonGroup>
            {INSERTAREG ? (
              <Tooltip title="Agregar Registro">
                <ToggleButton
                  value="check"
                  onClick={() => handleAgregarRegistro()}
                >
                  <AddIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {CG_PLANTILLA_ORG ? (
              <Tooltip title={"Cargar Plantilla Migración"}>
                <ToggleButton value="check">
                  <IconButton
                    color="secondary"
                    aria-label="upload documento"
                    component="label"
                    size="large"
                  >
                    <input
                      hidden
                      accept=".xlsx, .XLSX, .xls, .XLS"
                      type="file"
                      value=""
                      onChange={(v) => handleUploadORG(v)}
                    />
                    <DriveFileMoveIcon />
                  </IconButton>
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {INTEGRAR_OPERACION ? (
              <ToggleButton
                value="check"
                disabled={data.length == 0 || intOperaciones}
                onClick={() => integrarOperaciones()}
              >
                <Tooltip title={"Integrar Operaciones"}>
                  <CallMergeIcon
                    color={
                      data.length == 0 || intOperaciones ? "inherit" : "primary"
                    }
                  />
                </Tooltip>
              </ToggleButton>
            ) : (
              ""
            )}

            {asignaObservacion ? (
              <ToggleButton value="check" onClick={() => openmodalc(2)}>
                <Tooltip title={"Asignar Observación"}>
                  <FormatAlignLeftIcon color="primary" />
                </Tooltip>
              </ToggleButton>
            ) : (
              ""
            )}

            {marcaMonex ? (
              <ToggleButton value="check" onClick={() => handleMonex()}>
                <Tooltip title={"Marcar las operaciones a MONEX"}>
                  <CurrencyExchangeIcon />
                </Tooltip>
              </ToggleButton>
            ) : (
              ""
            )}

            {cargaPrestamos ? (
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
              <ToggleButton value="check" onClick={() => downloadplantilla()}>
                <Tooltip title={"Descargar Plantilla"}>
                  <ArrowDownwardIcon color="secondary" />
                </Tooltip>
              </ToggleButton>
            ) : (
              ""
            )}

            {cargarPlant ? (
              <Tooltip title={"Cargar Plantilla Anticipo de Participaciones"}>
                <ToggleButton value="check">
                  <IconButton
                    color="secondary"
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
              <ToggleButton
                value="check"
                disabled={!munTieneFide || idMunicipio.length < 6}
                onClick={() => Disitribuir()}
              >
                <Tooltip title={"Distribuir en Fideicomisos"}>
                  <AccountTreeIcon
                    color={
                      !munTieneFide || idMunicipio.length < 6
                        ? "inherit"
                        : "primary"
                    }
                  />
                </Tooltip>
              </ToggleButton>
            ) : (
              ""
            )}

            {ELIMINAMASIVO ? (
              <ToggleButton value="check" onClick={() => eliminar()}>
                <Tooltip title={"Eliminar Registro"}>
                  <DeleteForeverIcon color="secondary" />
                </Tooltip>
              </ToggleButton>
            ) : (
              ""
            )}

            {cargarPlant ? (
              <Tooltip title={"Cargar Plantilla Migración"}>
                <ToggleButton value="check">
                  <IconButton
                    color="secondary"
                    aria-label="upload documento"
                    component="label"
                    size="large"
                  >
                    <input
                      hidden
                      accept=".xlsx, .XLSX, .xls, .XLS"
                      type="file"
                      value=""
                      onChange={(v) => handleUploadPA(v)}
                    />
                    <DriveFileMoveIcon />
                  </IconButton>
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {INTEGRACION_MASIVA ? (
              <ToggleButton value="check" onClick={() => integracionMasiva()}>
                <Tooltip title={"Integración Masiva por Fondo"}>
                  <PolylineIcon color="secondary" />
                </Tooltip>
              </ToggleButton>
            ) : (
              ""
            )}

            {UNIFICACION ? (
              <ToggleButton
                value="check"
                disabled={
                  data.length == 0 || intOperaciones || idMunicipio.length < 6
                }
                onClick={() => unificarSolicitudes()}
              >
                <Tooltip title={"Unificar Registros"}>
                  <CloseFullscreenIcon
                    color={
                      data.length == 0 ||
                      intOperaciones ||
                      idMunicipio.length < 6
                        ? "inherit"
                        : "primary"
                    }
                  />
                </Tooltip>
              </ToggleButton>
            ) : (
              ""
            )}
          </ToggleButtonGroup>
        </Grid>

        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          {getcontrolInternoEntidad() == "ORG" ||
          getcontrolInternoEntidad() == "MUN" ? (
            ""
          ) : (
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Tooltip title={"Permite mostrar toda la información"}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChangeMostrarTodo}
                      color="secondary"
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Mostrar todo"
                />
              </Tooltip>
            </Grid>
          )}
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
                <ToggleButton
                  value="check"
                  onClick={() => handleFinalizarParticipacion()}
                >
                  <EditOffIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {DAMOP_PAUT ? (
              <Tooltip title={"Autorizar Participación"}>
                <ToggleButton
                  value="check"
                  onClick={() => handleAuthParticipacion()}
                >
                  <CheckCircleIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MUIXDataGridGeneral
            modulo={nombreExport}
            handleBorrar={handleBorrarMasivo}
            columns={
              getcontrolInternoEntidad() == "MUN" ||
              getcontrolInternoEntidad() == "ORG"
                ? columnasMunicipio
                : columnsParticipaciones
            }
            rows={data}
            controlInterno={""}
            multiselect={true}
          />
        </Grid>
      </Grid>
      {openModalVerSpei ? (
        <SpeisAdmin
          handleClose={handleClose}
          vrows={vrows}
          modo={modoSpeiCfdi}
        />
      ) : (
        ""
      )}
      {openCheque ? (
        <ModalCheque tipo={tipo} handleClose={handleclose} vrows={vrows} />
      ) : (
        ""
      )}
      {openSegmento ? (
        <ModalSegmentos handleClose={handleclose} vrows={vrows} />
      ) : (
        ""
      )}
      {openTraz ? (
        <TrazabilidadSolicitud
          dt={{ TIPO: 4, SP: idSolicitud }}
          open={openTraz}
          handleClose={handleclose}
        />
      ) : (
        ""
      )}
      {openModalCabecera ? (
        <ORGHeader
          dataCabecera={vrows}
          modo={modo}
          handleClose={handleClose}
          editCabecera={editCabecera}
          permisoAgregarDetalle={permisoAgregarDetalle}
          permisoEliminarDetalleCabecera={permisoEliminarDetalleCabecera}
          permisoEditarDetalleCabecera={permisoEditarDetalleCabecera}
        />
      ) : (
        ""
      )}
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
        <ORGHeader
          dataCabecera={vrows}
          modo={modo}
          handleClose={handleClose}
          editCabecera={editCabecera}
          permisoAgregarDetalle={permisoAgregarDetalle}
          permisoEliminarDetalleCabecera={permisoEliminarDetalleCabecera}
          permisoEditarDetalleCabecera={permisoEditarDetalleCabecera}
        />
      ) : (
        ""
      )}
      {openModalDescuento ? (
        <Descuentos
          tipo={1}
          handleClose={handleClose}
          dt={vrows}
          permisoEliminarDescuento={permisoEliminarDescuento}
          permisoEditarDescuento={permisoEditarDescuento}
          permisoAgregarDescuento={permisoAgregarDescuento}
        />
      ) : (
        ""
      )}
      {openModalRetenciones ? (
        <Retenciones
          tipo={1}
          handleClose={handleClose}
          dt={vrows}
          permisoAagregarRetenciones={permisoAgregarRetencion}
          permisoEditarRetencion={permisoEditarRetencion}
          permisoEliminarRetencion={permisoEliminarRetencion}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Participaciones;
