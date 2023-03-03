import {
  Box,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { AlertS, InputAlert } from "../../../helpers/AlertS";
import { Moneda } from "../menu/CustomToolbar";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import { Toast } from "../../../helpers/Toast";
import Slider from "../Slider";
import { DataGrid, GridSelectionModel, GridToolbar, esES as gridEsES, } from "@mui/x-data-grid";
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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoneIcon from '@mui/icons-material/Done';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { CatalogosServices } from "../../../services/catalogosServices";
import CloseIcon from '@mui/icons-material/Close';
import SelectValues from "../../../interfaces/Select/SelectValues";
import SelectFrag from "../Fragmentos/SelectFrag";
import { fmeses } from "../../../share/loadMeses";
import { fanios } from "../../../share/loadAnios";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export const ORG = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(false);//cambiar a true
  //Constantes para llenar los select
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [sumaTotal, setSumaTotal] = useState<Number>();
  /////////// Cargar Permisos
  const [cargarPlant, setCargarPlant] = useState<boolean>(false);


  //MODAL
  const [openModalCabecera, setOpenModalCabecera] = useState<boolean>(false);

  const [openModalVerSpei, setOpenModalVerSpei] = useState<boolean>(false);


  ///// filtros

  const [organismos, setOrganismos] = useState<SelectValues[]>([]);
  const [idORG, setIdORG] = useState("");
  const [numOrdenPago, setNumOrdenPago] = useState("");
  const [idMes, setIdMes] = useState("");
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [idAnio, setIdAnio] = useState("");





  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [modo, setModo] = useState<string>("");
  const [orgData, setOrgData] = useState([]);
  const [vrows, setVrows] = useState({});
  const [openCheque, setOpenCheque] = useState(false);

  ///////////// modal
  const [openModal, setOpenModal] = useState(false);
  const [modoModal, setModoModal] = useState<string>("");
  const [inputModal, setInputModal] = useState<string>("  ");
  const [idRegistro, setIdRegistro] = useState<string>("");
  const [sigEstatus, setSigEstatus] = useState<string>("");
  const [columnaTabla, setColumnaTabla] = useState<string>("");





  const [tipo, setTipo] = useState(0);

  const [DAMOP_FSE, SETDAMOP_FSE] = useState<boolean>(false);
  const [DAMOP_ASE, SETDAMOP_ASE] = useState<boolean>(false);
  const [DAMOP_TE, SETDAMOP_TE] = useState<boolean>(false);
  const [DAMOP_AE, SETDAMOP_AE] = useState<boolean>(false);
  const [DAMOP_FE, SETDAMOP_FE] = useState<boolean>(false);
  const [DAMOP_VE, SETDAMOP_VE] = useState<boolean>(false);
  const [DAMOP_GSE, SETDAMOP_GSE] = useState<boolean>(false);

  const tipoSol =
    [
      {
        "value": "1",
        "label": "Solicitud egreso"
      },
      {
        "value": "2",
        "label": "Egreso"
      },
      {
        "value": "3",
        "label": "Aportación"
      },
      {
        "value": "4",
        "label": "Requerimiento de anticipo"
      },
    ]

  const damopORG = [
    { tSol: "1", proceso: 'SOLICITUD DE EGRESO', acc: "Finalizar Solicitud de Egreso", estREF: 'DAMOP_ORG_ING_OP', estSIG: 'DAMOP_ORG_FIN_SOL_EGRE', OpenMod: true, campo: "SolEgreso", ModModl: "Asignar Solicitud de Egreso", componente: <ArrowForwardIosIcon /> },
    { tSol: "1", proceso: 'SOLICITUD DE EGRESO', acc: "Autorizar Solicitud de Egreso", estREF: 'DAMOP_ORG_FIN_SOL_EGRE', estSIG: 'DAMOP_ORG_AUT_SOL_EGRE', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "1", proceso: 'SOLICITUD DE EGRESO', acc: "Enviar Solicitud de egreso", estREF: 'DAMOP_ORG_AUT_SOL_EGRE', estSIG: 'DAMOP_ORG_ENV_SOL_EGRE', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "1", proceso: 'SOLICITUD DE EGRESO', acc: "Finalizar Solicitud de Egreso", estREF: 'DAMOP_ORG_ENV_SOL_EGRE', estSIG: 'DAMOP_ORG_FIN_EGR', OpenMod: true, campo: "NumEgreso", ModModl: "Asignar Número de Egreso", componente: <ArrowForwardIosIcon /> },
    { tSol: "1", proceso: 'SOLICITUD DE EGRESO', acc: "Autorizar Egreso", estREF: 'DAMOP_ORG_FIN_EGR', estSIG: 'DAMOP_ORG_AUT_EGR', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "1", proceso: 'SOLICITUD DE EGRESO', acc: "Validar Egreso", estREF: 'DAMOP_ORG_AUT_EGR', estSIG: 'DAMOP_ORG_VAL_EGR', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "1", proceso: 'SOLICITUD DE EGRESO', acc: "Generar Orden de Pago", estREF: 'DAMOP_ORG_VAL_EGR', estSIG: 'DAMOP_ORG_GEN_ORD_PAG', OpenMod: true, campo: "NumOrdenPago", ModModl: "Asignar Orden de Pag", componente: <ArrowForwardIosIcon /> },
    { tSol: "1", proceso: 'SOLICITUD DE EGRESO', acc: "Finalizar Orden de Pago", estREF: 'DAMOP_ORG_GEN_ORD_PAG', estSIG: 'DAMOP_ORG_FIN_ORD_PAG', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "1", proceso: 'FINALIZAR ORDEN DE PAGO', acc: "Enviar a Autorizacion", estREF: 'DAMOP_ORG_FIN_ORD_PAG', estSIG: 'DAMOP_ORG_PEND_AUT_ORG_PAG', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "2", proceso: 'EGRESO', acc: "Finalizar Egreso ", estREF: 'DAMOP_ORG_ING_OP', estSIG: 'DAMOP_ORG_FIN_EGR', OpenMod: true, campo: "NumEgreso", ModModl: "Asignar Número de Egreso", componente: <ArrowForwardIosIcon /> },
    { tSol: "2", proceso: 'EGRESO', acc: "Autorizar Egreso", estREF: 'DAMOP_ORG_FIN_EGR', estSIG: 'DAMOP_ORG_AUT_EGR', OpenMod: false, campo: " ", ModModl: "Validar Registro Actual", componente: <DoneIcon /> },
    { tSol: "2", proceso: 'EGRESO', acc: "Validar Egreso", estREF: 'DAMOP_ORG_AUT_EGR', estSIG: 'DAMOP_ORG_VAL_EGR', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "2", proceso: 'EGRESO', acc: "Generar Orden de Pago", estREF: 'DAMOP_ORG_VAL_EGR', estSIG: 'DAMOP_ORG_GEN_ORD_PAG', OpenMod: true, campo: "NumOrdenPago", ModModl: "Asignar Orden de Pago", componente: <ArrowForwardIosIcon /> },
    { tSol: "2", proceso: 'EGRESO', acc: "Finalizar Orden de Pago", estREF: 'DAMOP_ORG_GEN_ORD_PAG', estSIG: 'DAMOP_ORG_FIN_ORD_PAG', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "2", proceso: 'FINALIZAR ORDEN DE PAGO', acc: "Enviar a Autorizacion", estREF: 'DAMOP_ORG_FIN_ORD_PAG', estSIG: 'DAMOP_ORG_PEND_AUT_ORG_PAG', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "3", proceso: 'APORTACION', acc: "Finalizar Aportacion", estREF: 'DAMOP_ORG_ING_OP', estSIG: 'DAMOP_ORG_FIN_APO', OpenMod: true, campo: "NumAportacion", ModModl: "Asignar Número de Aportación", componente: <ArrowForwardIosIcon /> },
    { tSol: "3", proceso: 'APORTACION', acc: "Autorizar Aportacion", estREF: 'DAMOP_ORG_FIN_APO', estSIG: 'DAMOP_ORG_AUT_APO', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "3", proceso: 'APORTACION', acc: "Enviar Aportacion a Egreso", estREF: 'DAMOP_ORG_AUT_APO', estSIG: 'DAMOP_ORG_ENV_APO', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "3", proceso: 'APORTACION', acc: "Finalizar Solicitud de Egreso", estREF: 'DAMOP_ORG_ENV_APO', estSIG: 'DAMOP_ORG_FIN_EGR', OpenMod: true, campo: "NumEgreso", ModModl: "Asignar Número de Egreso", componente: <ArrowForwardIosIcon /> },
    { tSol: "3", proceso: 'APORTACION', acc: "Autorizar Solicitud de Egreso", estREF: 'DAMOP_ORG_FIN_EGR', estSIG: 'DAMOP_ORG_AUT_EGR', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "3", proceso: 'APORTACION', acc: "Validad Egreso", estREF: 'DAMOP_ORG_AUT_EGR', estSIG: 'DAMOP_ORG_VAL_EGR', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "3", proceso: 'APORTACION', acc: "Generar Orden de Pago", estREF: 'DAMOP_ORG_VAL_EGR', estSIG: 'DAMOP_ORG_GEN_ORD_PAG', OpenMod: true, campo: "NumOrdenPago", ModModl: "Asignar Orden de Pag", componente: <ArrowForwardIosIcon /> },
    { tSol: "3", proceso: 'APORTACION', acc: "Finalizar Orden de Pago", estREF: 'DAMOP_ORG_GEN_ORD_PAG', estSIG: 'DAMOP_ORG_FIN_ORD_PAG', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "3", proceso: 'FINALIZAR ORDEN DE PAGO', acc: "Enviar a Autorizacion", estREF: 'DAMOP_ORG_FIN_ORD_PAG', estSIG: 'DAMOP_ORG_PEND_AUT_ORG_PAG', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "4", proceso: 'REQUERIMIENTO DE ANTICIPO', acc: "Finalizar Requerimiento de Anticipo", estREF: 'DAMOP_ORG_ING_OP', estSIG: 'DAMOP_ORG_FIN_REQ', OpenMod: true, campo: "NumReqAnticipo", ModModl: "Asignar Requerimiento de Anticipo ", componente: <ArrowForwardIosIcon /> },
    { tSol: "4", proceso: 'REQUERIMIENTO DE ANTICIPO', acc: "Autoriza Requerimiento de Anticipo", estREF: 'DAMOP_ORG_FIN_REQ', estSIG: 'DAMOP_ORG_AUT_REQ', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "4", proceso: 'REQUERIMIENTO DE ANTICIPO', acc: "Generar Orden de Pago", estREF: 'DAMOP_ORG_AUT_REQ', estSIG: 'DAMOP_ORG_GEN_REQ_ORD_PAG', OpenMod: true, campo: "NumOrdenPago", ModModl: "Asignar Orden de Pago", componente: <ArrowForwardIosIcon /> },
    { tSol: "4", proceso: 'REQUERIMIENTO DE ANTICIPO', acc: "Finalizar Orden de Pago", estREF: 'DAMOP_ORG_GEN_REQ_ORD_PAG', estSIG: 'DAMOP_ORG_FIN_ORD_PAG', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
    { tSol: "4", proceso: 'FINALIZAR ORDEN DE PAGO', acc: "Enviar a Autorizacion", estREF: 'DAMOP_ORG_FIN_ORD_PAG', estSIG: 'DAMOP_ORG_PEND_AUT_ORG_PAG', OpenMod: false, campo: " ", ModModl: " ", componente: <DoneIcon /> },
  ]

  const handleClose = () => {
    setOpenModalCabecera(false);
    setVrows({});
    Consulta();
    setOpenModal(false);
    setInputModal("")
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

  const handleUploadORG = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.id);
    formData.append("tipo", "MigraOrganimos");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      Consulta();
    });
  };

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "Operaciones",
      disableExport: true,
      headerName: "Operaciones",
      description: "Operaciones",
      sortable: false,
      width: 120,
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
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title={
              damopORG.find(({ tSol, estREF }) => tSol === String(v?.row.TipoSolicitud) && estREF === v?.row.EstConInt)?.acc
            }>
              <IconButton value="check" onClick={() =>
                handleEnviar(v)}>
                {damopORG.find(({ tSol, estREF }) => tSol === String(v?.row.TipoSolicitud) && estREF === v?.row.EstConInt)?.componente}
              </IconButton>
            </Tooltip>
            {
              damopORG.find(({ tSol }) => tSol === v?.TipoSolicitud)?.acc
            }

          </Box>
        );
      },
    },
    { field: "EstatusDes", headerName: "Estatus", description: "Estatus", width: 200, },
    { field: "NumOrdenPago", headerName: "N° Orden de Pago", description: "Numero Orden de Pago", width: 150, },
    { field: "NumProyecto", headerName: "N° de Proyecto", description: "Numero de Proyecto", width: 150, },
    { field: "NumEgreso", headerName: "N° de Egreso", description: "Numero de Egreso", width: 150, },
    { field: "NumCheque", headerName: "N° de Cheque", description: "Numero de Cheque", width: 150, },
    { field: "NumAportacion", headerName: "N° de Aportación", description: "Numero de Aportación", width: 150, },
    { field: "NumReqAnticipo", headerName: "N° de Requerimiento de Anticipo", description: "Numero de Requerimiento de Anticipo", width: 150, },
    { field: "total", headerName: "Total", width: 250, ...Moneda },
    {
      field: "TipoSolicitud", headerName: "Tipo Solicitud", description: "Tipo Solicitud", width: 200,
      renderCell: (v: any) => { return (<>{tipoSol.find(({ value }) => value === (String(v?.row?.TipoSolicitud)))?.label}</>); },
    },
    { field: "Organismo", headerName: "Organismo", description: "Organismo", width: 150, },
    { field: "UResponsable", headerName: "U Responsable", description: "U Responsable", width: 150, },
    { field: "Observaciones", headerName: "Observaciones", description: "Observaciones", width: 300, },
    { field: "Divisa", headerName: "Divisa", width: 100, },
    { field: "Anio", headerName: "Año", width: 100, description: "Ejercicio", },
    { field: "Mes", headerName: "Mes", width: 100, description: "Mes", },

  ];
  const Consulta = () => {

    DAMOPServices.indexCabecera(
      {
        NUMOPERACION: 4,
        P_IDORG: idORG === "false" ? "" : idORG,
        P_IDANIO: idAnio === "false" ? "" : idAnio,
        P_IDMES: idMes === "false" ? "" : idMes,
        P_ORPAG: numOrdenPago ? numOrdenPago : ""

      }
    ).then((res) => {
      if (res.SUCCESS) {
        setOrgData(res.RESPONSE)
        setslideropen(false);

      } else {
        setslideropen(false);
        AlertS.fire({
          title: "Error!",
          text: "Error!",
          icon: "error",
        });
      }
    });

  };

  const handleFiltroORG = (v: string) => {
    setIdORG(v);
  };

  const handleFiltroMes = (v: string) => {
    setIdMes(v);
  };
  const handleFiltroAnios = (v: string) => {
    setIdAnio(v);
  };


  const handleClick = () => {
    setslideropen(true);
    Consulta();

  };

  const handleEnviar = (v: any) => {
    const modMod = (String(damopORG.find(({ tSol, estREF }) => tSol === String(v?.row.TipoSolicitud) && estREF === v?.row.EstConInt)?.ModModl));
    const estSig = (String(damopORG.find(({ tSol, estREF }) => tSol === String(v?.row.TipoSolicitud) && estREF === v?.row.EstConInt)?.estSIG));
    setModoModal(modMod);
    setIdRegistro(v.row.id);
    setSigEstatus(estSig);


    if (Boolean(damopORG.find(({ tSol, estREF }) => tSol === String(v?.row.TipoSolicitud) && estREF === v?.row.EstConInt)?.OpenMod) === true) {
      setOpenModal(true);
      setColumnaTabla(String(damopORG.find(({ tSol, estREF }) => tSol === String(v?.row.TipoSolicitud) && estREF === v?.row.EstConInt)?.campo));

    } else {
      setOpenModal(false);
      handleEnviarSolicitud(v.row.id, estSig)
      setColumnaTabla("");
    }

  };

  const handleEnviarSolicitud = (idReg: string, estSig: string,) => {

    let data = {
      CHID: idReg ? idReg : idRegistro,
      NUMOPERACION: 5,
      CHUSER: user.id,
      ESTATUS: estSig ? estSig : sigEstatus,
      columnaTabla: columnaTabla,
      valor: inputModal
    }

    Swal.fire({
      icon: "warning",
      title: openModal ? "Enviar" : "Validar",
      text: "",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        DAMOPServices.indexCabecera(data).then((res) => {
          if (res.SUCCESS) {
            // SetRegGuardado(true);
            handleClose();
            Consulta();
            // handleCloseAñadirDetalle();
            Toast.fire({
              icon: "success",
              title: "Cabecera Agregada!",
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

  const handleBorrarSolicitud = (v: any) => {

    let data = {
      NUMOPERACION: 3,
      CHUSER: user?.id,
      CHID: v?.row?.id
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

  const loadFilter = (tipo: number) => {
    let data = { NUMOPERACION: tipo };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (tipo === 27) {
        setOrganismos(res.RESPONSE);
        setslideropen(false);
      }
    });
  };



  const handleTranEgreso = () => { };
  const handleAutEgresos = () => { };
  const handleFinEgreso = () => { };
  const handleValEgresos = () => { };
  const handleGenNumOrdenPago = () => { };


  useEffect(() => {
    setMeses(fmeses());
    setAnios(fanios());

    loadFilter(27);
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "TORG") {
        if (String(item.Referencia) === "AGREGPLANT") {
          setCargarPlant(true);
        }
      }
    });



    // Consulta();
  }, [openModal]);


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
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Organismos:
            </Typography>
            <SelectFrag
              value={idORG}
              options={organismos}
              onInputChange={handleFiltroORG}
              placeholder={"Seleccione Un Organismo"}
              label={""}
              disabled={false}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={2} lg={2}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Orden de Pago:
            </Typography>

            <FormControl >
              <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                fullWidth
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
          <Grid item xs={12} sm={8} md={2} lg={2}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Mes:
            </Typography>
            <SelectFrag
              value={idMes}
              options={meses}
              onInputChange={handleFiltroMes}
              placeholder={"Seleccione Un Mes"}
              label={""}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={2} lg={2}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Año:
            </Typography>
            <SelectFrag
              value={idAnio}
              options={anios}
              onInputChange={handleFiltroAnios}
              placeholder={"Seleccione Un Año"}
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
            disabled={String(Number(numOrdenPago)) === "NaN"}
            endIcon={<SendIcon sx={{ color: "white" }} />}
          >
            <Typography sx={{ color: "white" }}> Buscar </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={1.8} lg={1.8} paddingBottom={-1}>

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
                      onChange={(v) => handleUploadORG(v)}
                    />
                    <DriveFileMoveIcon />
                  </IconButton>
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
                rows={orgData}
                density="compact"
                rowsPerPageOptions={[10, 25, 50, 100, 200, 300, 400]}
                disableSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                getRowHeight={() => "auto"}
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


      <Dialog open={openModal} onClose={handleClose}>
        <Grid container justifyContent="space-between">
          <DialogTitle>{modoModal}</DialogTitle>
          <Button className="cerrar" onClick={handleClose} >
            <CloseIcon />
          </Button>
        </Grid>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(v) => setInputModal(v.target.value)}
            error={String(Number(inputModal)) === "NaN"}
            inputProps={{ maxLength: 40 }}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEnviarSolicitud("", "")} disabled={inputModal.trim() === "" || String(Number(inputModal)) === "NaN"}
          >Enviar</Button>
        </DialogActions>
      </Dialog>


    </div>


  );
};
