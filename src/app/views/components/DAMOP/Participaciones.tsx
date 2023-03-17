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
import { AlertS } from "../../../helpers/AlertS";
import { Moneda, currencyFormatter } from "../menu/CustomToolbar";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getToken, getUser } from "../../../services/localStorage";
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
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
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
import InsightsIcon from "@mui/icons-material/Insights";
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
import ArticleIcon from '@mui/icons-material/Article';
import SpeisAdmin from "../DAF/SpeisAdmin";
import SegmentIcon from '@mui/icons-material/Segment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ModalCheque } from "../componentes/ModalCheque";
import { Retenciones } from "./Retenciones";
import { fmeses } from "../../../share/loadMeses";
import SelectFragMulti from "../Fragmentos/SelectFragMulti";
import PolylineIcon from '@mui/icons-material/Polyline';
import TrazabilidadSolicitud from "../TrazabilidadSolicitud";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { base64ToArrayBuffer, dowloandfile } from "../../../helpers/Files";



const Participaciones = () => {

  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [mes, setMes] = useState<string>("");
  const [nombreArchivoExport, setNombreArchivoExport] = useState<string>("");
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(true);
  //MODAL
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDescuento, setOpenModalDescuento] = useState<boolean>(false);
  const [openModalRetenciones, setOpenModalRetenciones] = useState<boolean>(false);
  const [openModalDetalle, setOpenModalDetalle] = useState<boolean>(false);
  const [openModalVerSpei, setOpenModalVerSpei] = useState<boolean>(false);
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [fondos, setFondos] = useState<[]>([]);
  const [municipio, setMunicipios] = useState<SelectValues[]>([]);
  const [tiposSolicitud, setTiposSolicitud] = useState<SelectValues[]>([]);
  const [tiposFondo, setTiposFondo] = useState<SelectValues[]>([]);
  const [estatus, setEstatus] = useState<SelectValues[]>([]);
  const [vrows, setVrows] = useState<{}>("");
  const [openCheque, setOpenCheque] = useState(false);
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
  const [openTraz, setOpenTraz] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState<string>();
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [verSegmentar, setVerSegmentar] = useState<boolean>(false);
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


  const handleclose = (data: any) => {
    setOpenCheque(false);
    setOpenTraz(false)
  };

  const handlecheque = (data: any, tipo: number) => {
    setTipo(tipo);
    setOpenCheque(true)
    setVrows(data)
  };


  const downloadplantilla = () => {
    let name ="PLANTILLA CARGA ANTICIPO PARTICIPACIONES.xlsx";
    let data = {
      TOKEN:JSON.parse(String(getToken())),
      RUTA:'/PDRMYE/DAMOP/PLANTILLAS/',
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
       console.log(v.row.id);
    setIdSolicitud(v.row.id);
    //console.log(v.row.id);
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
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>


             {verTrazabilidad ? ( 
              <Tooltip title={"Ver Trazabilidad"}>
                <IconButton value="check" onClick={() => handleVerTazabilidad(v)}>
                  <InsightsIcon />
                </IconButton>
              </Tooltip>
             ) : (
              ""
            )} 

            {/* {String(v.row.NumParticipacion) === 'null' ?
              <Tooltip title={"Asignar N° de Participación"}>
                <IconButton value="check" onClick={() => handlecheque(v, 2)}>
                  <LoopIcon />
                </IconButton>
              </Tooltip>
              : ""
            }

            {String(v.row.NumSolEgreso) === 'null' && v.row.estatusCI === "DAMOP_INI" ?
              <Tooltip title={"Asignar N° de Solicitud de Egreso"}>
                <IconButton value="check" onClick={() => handlecheque(v, 3)}>
                  <MenuBookIcon />
                </IconButton>
              </Tooltip>
              : ""
            }

            {String(v.row.NumEgreso) === 'null' && v.row.estatusCI === "DAMOP_TE" ?
              <Tooltip title={"Asignar N° de Egreso"}>
                <IconButton value="check" onClick={() => handlecheque(v, 4)}>
                  <MoneyIcon />
                </IconButton>
              </Tooltip>
              : ""
            } */}

             {String(v.row.estatus)  === 'Ingresando Operación' ? 
              <Tooltip title={"Asignar N° de Solicitud de Pago"}>
                <IconButton value="check" onClick={() => handlecheque(v, 5)}>
                  <MonetizationOnIcon />
                </IconButton>
              </Tooltip>
               : "" 
            } 

            {/* {String(v.row.NumRequerimientoAnt) === 'null' && v.row.estatusCI === "DAMOP_TE" ?
              <Tooltip title={"Asignar N° de Requerimiento de Anticipo"}>
                <IconButton value="check" onClick={() => handlecheque(v, 6)}>
                  <LocalAtmIcon />
                </IconButton>
              </Tooltip>
              : ""
            } */}

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
            {v.row.estatusCI === "DAF_SPEI" ? (
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
      field: "AccionesDescuentos",
      disableExport: true,
      headerName: "Descuentos",
      description: "Descuentos",
      sortable: false,
      width: 98,
      renderCell: (v: any) => {
        return (
          <Box>
            {/* {String(v.row.estatus) === 'Pendiente de finalizar participación' && String(v.row.Clave) === 'FGP' && String(v.row.NumParticipacion) !== 'null' ? ( */}
            {String(v.row.Clave) === 'FGP' && String(v.row.estatusCI) === 'DAMOP_INI' ? (
              <Tooltip title="Administrar Descuentos">
                <IconButton
                  onClick={() => handleDescuento(v)}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            ) : ("")}

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
      width: 98,
      renderCell: (v: any) => {
        return (
          <Box>
            {String(v.row.estatusCI) === 'DAMOP_INI' ? (
              <>

                <Tooltip title="Admistrar Retenciones">
                  <IconButton
                    onClick={() => handleRetenciones(v)}>
                    <MoneyOffOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : ("")}


          </Box>
        );
      },
    },

    {
      field: "estatus",
      headerName: "Estatus",
      description: "Estatus",

      width: 200,
    },
    {
      field: "NumOper",
      headerName: "Nº De Operación",
      description: "Nº De Operación",
      width: 130,
    },
    {
      field: "NumParticipacion",
      headerName: "Numero De Participacion",
      width: 200,
      description: "Número De Participación",
    },
    {
      field: "NumSolEgreso",
      headerName: "Número De Solicitud De Egreso",
      width: 200,
      description: "Número De Solicitud De Egreso",
    },
    {
      field: "NumEgreso",
      headerName: "Numero De Egreso",
      width: 200,
      description: "Número De Egreso",
    },
    {
      field: "NumOrdenPago",
      headerName: "Solicitud de Pago",
      width: 140,
      description: "Numero De Solicitud de Pago",
    },
   
    {
      field: "NumRequerimientoAnt",
      headerName: "Numero De Requerimiento De Anticipo",
      width: 200,
      description: "Numero De Requerimiento De Anticipo",
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
      description: "Tipo Cálculo",
      width: 150,
    },
    /* {
       field: "Clave",
       headerName: "Fondo",
       width: 150,
       description: "Fondo",
     },*/
    {
      field: "fondodes",
      headerName: "Descripción de Fondo",
      description: "Descripción de Fondo",
      width: 250,
    },
    {
      field: "ClaveBeneficiario",
      headerName: "Cve. Beneficiario",
      width: 150,
      description: "Clave de Beneficiario",
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
      description: "Unidad Responsable",

      width: 100,
    },
    {
      field: "NumProyecto",
      headerName: "Proyecto",
      description: "Numero de Proyecto",
      width: 150,
    },
    {
      field: "ConceptoEgreso",
      headerName: "Cpto. de  egreso",
      description: "Concepto de Egreso",
      width: 150,
    },
    {
      field: "conceptoCheque",
      headerName: "Cpto. de  Cheque",
      description: "Concepto de Cheque",

      width: 270,
    },


    {
      field: "ClavePresupuestal",
      headerName: "Clave Presupuestal",
      description: "Clave Presupuestal",
      width: 550,
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
      width: 200,
      description: "Retenciones",
      ...Moneda,
    },
    {
      field: "RecAdeudos",
      headerName: "Recaudación de Adeudos",
      width: 200,
      description: "Recaudación de Adeudos",
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
   
    // {
    //   field: "NumCheque",
    //   headerName: "Numero De Cheque",
    //   width: 200,
    //   description: "Numero De Cheque",
    // },

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
      if (operacion === 31) {
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
        setIdEstatus(res.RESPONSE[0].value);
      }
    });
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalRetenciones(false);
    setOpenModalDescuento(false);
    setOpenModalDetalle(false);
    setOpenModalVerSpei(false);
  };
  const handleAccion = () => {

  };

  const handleFilterChange1 = (v: string) => {
    setIdTipoFondo(v);

  };

  const handleFilterChange2 = (v: SelectValues[]) => {
    setIdFondo(v);
    setIntOperaciones(true);
    setMunTieneFide(false);
  };

  const handleFilterChange3 = (v: string) => {
    setNombreMunicipio(municipio.find(({ value }) => value === v)?.label === undefined ? "" : String(municipio.find(({ value }) => value === v)?.label));
    setidMunicipio(v);
    setIntOperaciones(true); setMunTieneFide(false)
  };

  const handleFilterChange4 = (v: string) => {
    setIdTipoSolicitud(v);
    setIntOperaciones(true); setMunTieneFide(false)
  };
  const handleSelectMes = (data: any) => {
    setNombreMes(meses.find(({ value }) => value === data)?.label === undefined ? "" : String(meses.find(({ value }) => value === data)?.label));
    setMes(data);
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
    SETDAMOP_FINALIZADO(false);

    // if (v ==='a2d2adfc-8e12-11ed-a98c-040300000000'){
    //  SETDAMOP_INI(true);
    // }else if(v ==='d117049e-8e12-11ed-a98c-040300000000'){
    //   SETDAMOP_FSE(true);
    // }else if(v ==='e0f0d317-8e12-11ed-a98c-040300000000'){
    //   SETDAMOP_ASE(true);
    // }else if(v ==='ef68291d-8e12-11ed-a98c-040300000000'){
    //   SETDAMOP_TE(true);
    // }else if(v ==='fe7fae95-8e12-11ed-a98c-040300000000'){
    //   SETDAMOP_AE(true);
    // }else if(v ==='0c1b887e-8e13-11ed-a98c-040300000000'){
    //   SETDAMOP_FE(true);
    // }else if(v ==='1a7d41ed-8e13-11ed-a98c-040300000000'){
    //   SETDAMOP_VE(true);
    // }else if(v ==='2a879241-8e13-11ed-a98c-040300000000'){
    //   SETDAMOP_GSE(true);
    // }else if(v ==='399a2ffe-8e13-11ed-a98c-040300000000'){
    //   SETDAMOP_ASP(true);
    // }else if(v ==='4a5cf61b-8e13-11ed-a98c-040300000000'){
    //   SETDAMOP_FRA(true);
    // }else if(v ==='596e5f1e-8e13-11ed-a98c-040300000000'){
    //   SETDAMOP_ARA(true);
    // }else if(v ==='67d9cdb6-8e13-11ed-a98c-040300000000'){
    //   SETDAMOP_FINALIZADO(true);
    // }else if(v ==='e6fd8a34-9073-11ed-a98c-040300000000'){
    //   SETDAMOP_PFI(true);
    // }else if(v ==='f747b03c-9073-11ed-a98c-040300000000'){
    //   SETDAMOP_PAUT(true);
    // }else if(v ==='b825e8af-91e8-11ed-a912-705a0f328da6'){
    //   SETDAF_SPEI(true);
    // }



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

  const handleUploadPA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.id);
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



  const integracionMasiva = () => {

    if (idFondo.length == 1 &&  mes !== "false" &&  idestatus !== "false") {
      Swal.fire({
        icon: "info",
        title: "Integración Masiva ",
        text: "Los Movimientos de los diversos tipos de cálculos se unificaran en uno solo",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
         
          setslideropen(true);
          const formData = new FormData();
          formData.append("CHUSER", user.id);
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
        title: "Error!",
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

  const handleFinalizarParticipacion = () => {
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

  const handleTranEgreso = () => {
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

  const handleAuthParticipacion = () => {
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

  const handleFinEgreso = () => {
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

  const handleAutEgresos = () => {
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

  const handleGenNumOrdenPago = () => {
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


  const handleValEgresos = () => {
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
    if (nombreFondo !== "" || nombreMunicipio !== "" || nombreMes !== "") {
      setNombreExport(String(
        (nombreFondo === "" ? "" : nombreFondo)
        + (nombreMunicipio === "" ? "" : (" " + nombreMunicipio))
        + (nombreMes === "" ? "" : (" " + nombreMes))).trim());

      // console.log(String(
      //   (nombreFondo === "" ? "" : nombreFondo)
      //   + (nombreMunicipio === "" ? "" : (" " + nombreMunicipio))
      //   + (nombreMes === "" ? "" : (" " + nombreMes))).trim());

    } else {
      setNombreExport("Participaciones y Aportaciones");
    }

    if (idtipoSolicitud || idFondo || idMunicipio) {
      setIntOperaciones(false)

    }

    if (idestatus === 'a2d2adfc-8e12-11ed-a98c-040300000000') {
      SETDAMOP_INI(true);
    } else if (idestatus === 'd117049e-8e12-11ed-a98c-040300000000') {
      SETDAMOP_FSE(true);
    } else if (idestatus === 'e0f0d317-8e12-11ed-a98c-040300000000') {
      SETDAMOP_ASE(true);
    } else if (idestatus === 'ef68291d-8e12-11ed-a98c-040300000000') {
      SETDAMOP_TE(true);
    } else if (idestatus === 'fe7fae95-8e12-11ed-a98c-040300000000') {
      SETDAMOP_AE(true);
    } else if (idestatus === '0c1b887e-8e13-11ed-a98c-040300000000') {
      SETDAMOP_FE(true);
    } else if (idestatus === '1a7d41ed-8e13-11ed-a98c-040300000000') {
      SETDAMOP_VE(true);
    } else if (idestatus === '2a879241-8e13-11ed-a98c-040300000000') {
      SETDAMOP_GSE(true);
    } else if (idestatus === '399a2ffe-8e13-11ed-a98c-040300000000') {
      SETDAMOP_ASP(true);
    } else if (idestatus === '4a5cf61b-8e13-11ed-a98c-040300000000') {
      SETDAMOP_FRA(true);
    } else if (idestatus === '596e5f1e-8e13-11ed-a98c-040300000000') {
      SETDAMOP_ARA(true);
    } else if (idestatus === '67d9cdb6-8e13-11ed-a98c-040300000000') {
      SETDAMOP_FINALIZADO(true);
    } else if (idestatus === 'e6fd8a34-9073-11ed-a98c-040300000000') {
      SETDAMOP_PFI(true);
    } else if (idestatus === 'f747b03c-9073-11ed-a98c-040300000000') {
      SETDAMOP_PAUT(true);
    } else if (idestatus === 'b825e8af-91e8-11ed-a912-705a0f328da6') {
      SETDAF_SPEI(true);
    }
    let data = {
      TIPO: 1,
      P_FONDO: idFondo.length > 0 ? idFondo : "",
      P_IDMUNICIPIO: idMunicipio === "false" ? "" : idMunicipio,
      P_IDTIPO: idtipoFondo === "false" ? "" : idtipoFondo,
      P_IDTIPOSOL: idtipoSolicitud === "false" ? "" : idtipoSolicitud,
      P_IDESTATUS: idestatus === "false" ? "" : idestatus,
      P_IDMES: mes === "false" ? "" : mes,


    };
    setslideropen(true);
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
        setslideropen(false);
      } else {
        AlertS.fire({
          title: "Error!",
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
  };


  useEffect(() => {
    setMeses(fmeses());
    loadFilter(31);
    loadFilter(5);
    loadFilter(17);
    loadFilter(25);
    loadFilter(24);
    // handleClick();
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "PARTMUN") {
        if (String(item.Referencia) === "AGREGPLANT") {
          setCargarPlant(true);
        } else if (String(item.Referencia) === "DESCPLANT") {
          setDescPlant(true);
        } else if (String(item.Referencia) === "DISFIDE") {
          setDisFide(true);
        } else if (String(item.Referencia) === "TRAZASPEIDAF") {
          setVerTrazabilidad(true);
        }else if (String(item.Referencia) === "SEGM"){
          setVerSegmentar(true)
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

      {openModalRetenciones ? (
        <Retenciones
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

          {/* <Grid item xs={6} sm={4} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Tipo De Fondo:</Typography>
            <SelectFrag
              value={idtipoFondo}
              options={tiposFondo}
              onInputChange={handleFilterChange1}
              placeholder={"Seleccione Tipo De Fondo"}
              label={""}
              disabled={false}
            />
          </Grid> */}
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
            <SelectFragMulti
              options={fondos}
              onInputChange={handleFilterChange2}
              placeholder={"Seleccione Fondo(s)"}
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
          <Grid item xs={6} sm={4} md={2} lg={2}>
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
                disabled={data.length === 0 || intOperaciones }
                onClick={() => integrarOperaciones()}>
                <CallMergeIcon color={data.length === 0 || intOperaciones  ? "inherit" : "primary"} />
              </ToggleButton>
            </Tooltip>

           


            {/* <Tooltip title={"Generar Solicitud"}>
              <ToggleButton disabled={idtipoSolicitud.length < 6 || intOperaciones} value="check" onClick={() => SolicitudOrdenPago()}>
                <SettingsSuggestIcon color={idtipoSolicitud.length < 6 || intOperaciones ? "inherit" : "primary"} />
              </ToggleButton>
            </Tooltip> */}

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
                <ToggleButton value="check" onClick={() => downloadplantilla()}>
                      <ArrowDownwardIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {cargarPlant ? (
              <Tooltip title={"Cargar Plantilla Anticipo de Participaciones"}>
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
                  disabled={!munTieneFide || idMunicipio.length < 6}
                  onClick={() => Disitribuir()}>
                  <AccountTreeIcon color={!munTieneFide || idMunicipio.length < 6 ? "inherit" : "primary"} />
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

            {cargarPlant ? (
              <Tooltip title={"Cargar Plantilla Migración"}>
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
                      onChange={(v) => handleUploadPA(v)}
                    />
                    <DriveFileMoveIcon />
                  </IconButton>
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

          {cargarPlant ? (
               <Tooltip title={"Integración Masiva por Fondo"}>
               <ToggleButton value="check" onClick={() => integracionMasiva()}>
                 <PolylineIcon  />
               </ToggleButton>
             </Tooltip>
            ) : (
              ""
            )}

             <Tooltip title={"Unificar Registros"}>
              <ToggleButton value="check"
                disabled={data.length === 0 || intOperaciones  || idMunicipio.length < 6}
                onClick={() => unificarSolicitudes()}>
                <CloseFullscreenIcon color={data.length === 0 || intOperaciones  || idMunicipio.length < 6 ? "inherit" : "primary"} />
              </ToggleButton>
            </Tooltip>


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
                <ToggleButton value="check" onClick={() => handleGenNumOrdenPago()}>
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
                <ToggleButton value="check" onClick={() => handleFinalizarParticipacion()} >
                  <EditOffIcon />
                </ToggleButton>
              </Tooltip>
            ) : (
              ""
            )}

            {DAMOP_PAUT ? (
              <Tooltip title={"Autorizar Participación"}>
                <ToggleButton value="check" onClick={() => handleAuthParticipacion()}>
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
                // localeText={nlNL.components.MuiDataGrid.defaultProps.localeText.}
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
                    // negative: params.row.Presupuesto !== params.row.total,
                    // positive: params.row.Presupuesto == params.row.total,
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
                    csvOptions: {
                      fileName: nombreExport
                      ,
                      utf8WithBom: true,
                    }
                  },
                }}
                isRowSelectable={(params) => (
                 // params.row.NumCheque === null
                  // ||params.row.NumEgreso===null
                  // ||params.row.NumRequerimientoAnt===null
                   params.row.NumOrdenPago===null
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
      {openModalVerSpei ?
        <SpeisAdmin handleClose={handleClose} handleAccion={handleAccion} vrows={vrows} /> : ""}
      {openCheque ? <ModalCheque tipo={tipo} handleClose={handleclose} vrows={vrows} /> : ""}
      {openTraz ? <TrazabilidadSolicitud dt={{ TIPO:4, SP:idSolicitud, }} open={openTraz} handleClose={handleclose} />
                :
                ""
            }
    </div>
  );
};

export default Participaciones;
