import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CachedIcon from "@mui/icons-material/Cached";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InsightsIcon from "@mui/icons-material/Insights";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import {
  FPGDetalle,
  IdetalleCalculo,
  PERMISO,
  USUARIORESPONSE,
} from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getPermisos, getUser } from "../../../../services/localStorage";
import MUIXDataGrid from "../../MUIXDataGrid";
import Slider from "../../Slider";
import Trazabilidad from "../../Trazabilidad";
import ModalCalculos from "../../componentes/ModalCalculos";
import { Moneda, currencyFormatter } from "../CustomToolbar";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { ReportesServices } from "../../../../services/ReportesServices";
import { base64ToArrayBuffer } from "../../../../helpers/Files";
const DetalleFgp = ({
  idCalculo,
  idDetalle,
  nombreFondo,
  handleClose,
  clave,
}: {
  idCalculo: string;
  idDetalle: string;
  nombreFondo: string;
  handleClose: Function;
  clave: string;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [status, setStatus] = useState<SelectValues>();
  const [responsable, setResponsable] = useState<SelectValues>();
  const [openSlider, setOpenSlider] = useState(true);
  const [estatusDestino, setEstatusDestino] = useState("");
  const [perfilDestino, setperfilDestino] = useState("");
  const [area, setArea] = useState("");
  const [sumaTotal, setSumaTotal] = useState<Number>();
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [nummes, setNumMes] = useState<Number>();
  const [tipoCalculo, setTipoCalculo] = useState("");
  const [fase, setFase] = useState<Number>();
  //Permisos
  const [data, setData] = useState([]);
  const [row, setRow] = useState<IdetalleCalculo>();
  const [autorizar, setAutorizar] = useState<boolean>(true);
  const [cancelar, setCancelar] = useState<boolean>(true);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(true);
  const [recalcular, setrecalcular] = useState<boolean>(false);
  const [ajustar, setAjustar] = useState<boolean>(true);
  //Modals
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalAjuste, setopenModalAjuste] = useState<boolean>(false);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const [tipoAccion, setTipoAccion] = useState("");
  //Columnas
  const [visibleselect, setvisibleselect] = useState<Number>(0);
  const [importemensual, setimportemensual] = useState<Number>();
  const [showDecimal, setshowDecimal] = useState<boolean>(false);

  const handleClick = () => {
    setshowDecimal(!showDecimal);
  };

  const handleRenviarCorreo = () => {
    setOpenSlider(true);
    let obj = {
      CHID: idDetalle,
    };

    calculosServices.renviarCorreo(obj).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Notificación Enviada!",
        });
        setOpenSlider(false);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        setOpenSlider(false);
      }
    });
  };

  const closeTraz = () => {
    setOpenSlider(false);
    setOpenTrazabilidad(false);
  };

  // MANEJO DE ACCIONES
  const handleAcciones = (v: any) => {
    setOpenSlider(true);
    if (v.tipo == 1) {
    } else if (v.tipo == 2) {
    } else {
      switch (v) {
        case 1: //Regresar
          handleClose();
          break;
        case 2: //Trazabilidad
          setOpenTrazabilidad(true);
          break;
        case 3: //Cancelar
          setvisibleselect(1);
          setTipoAccion("Favor de ingresar un comentario para la Autorización");
          setEstatusDestino("CPH_ENV_VAL");
          setperfilDestino("VAL");
          setArea("CPH");
          setOpenModal(true);
          break;

        case 4: //AUTORIZAR CAPTURISTA
          setvisibleselect(1);
          setTipoAccion("Favor de ingresar un comentario para la Autorización");
          setEstatusDestino("CPH_ENV_COOR");
          setperfilDestino("COOR");
          setArea("CPH");
          setOpenModal(true);
          break;

        case 5: //AUTORIZAR CAPTURISTA
          setvisibleselect(0);
          setTipoAccion("Favor de ingresar un comentario para la Autorización");
          setEstatusDestino("DAMOP_INICIO");
          setperfilDestino("ANA");
          setArea("DAMOP");
          setOpenModal(true);
          break;

        case 6: //REGRESAR A VALIDADOR
          BorraCalculo();
          break;

        case 7: //REGRESAR A analista
          setvisibleselect(1);
          setTipoAccion("Favor de ingresar un comentario para la Autorización");
          setEstatusDestino("CPH_REG_CAP");
          setperfilDestino("ANA");
          setArea("CPH");
          setOpenModal(true);
          break;

        case 8: //REGRESAR A validador
          setvisibleselect(1);
          setTipoAccion("Favor de ingresar un comentario para la Autorización");
          setEstatusDestino("CPH_REG_ANA");
          setperfilDestino("VAL");
          setArea("CPH");
          setOpenModal(true);
          break;

        default:
          break;
      }
    }
  };

  const Fnworkflow = (data: any) => {
    setOpenSlider(true);
    console.log(data.usuario);
    console.log(data.mensaje);

    if (data.usuario != "" || area == "DAMOP") {
      if (!perfilDestino || !data.mensaje!) {
        AlertS.fire({
          title: "Verifique Los Campos",
          icon: "error",
        });
      } else {
        let obj = {
          CHID: idCalculo,
          ESTATUS_DESTINO: estatusDestino,
          CHUSER: user.Id,
          TEXTO: data.mensaje,
          PERFIL_DESTINO: perfilDestino,
          CHUSERASIGNADO: data.usuario,
          AREA: area,
        };

        calculosServices.indexCalculo(obj).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Consulta Exitosa!",
            });
            setOpenSlider(false);
            handleClose();
          } else {
            setOpenSlider(false);
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      }
    } else {
      AlertS.fire({
        title: "Favor de Seleccionar al responsable de Validación",
        icon: "error",
      });
    }
  };

  const ReCalculo = () => {
    let data = {
      IDCALCULO: idDetalle,
      CHUSER: user.Id,
    };

    Swal.fire({
      icon: "question",
      title: "recalcular",
      text: "Al generar el Recálculo los movimientos pueden verse afectados",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      color: "rgb(175, 140, 85)",
    }).then((result) => {
      if (result.isConfirmed) {
        calculosServices.ReCalculo(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "ReCalculo Exitoso!",
            });
            handleClose();
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

  const grabacentavos = (data: any) => {
    setimportemensual(0);
    console.log(data);
    let obj = {
      IDCALCULO: data.id,
      CHUSER: user.Id,
      MONTO: importemensual,
      IDCALCULOPADRE: idDetalle,
    };

    calculosServices.grabacentavos(obj).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "ReCalculo Exitoso!",
        });
        consulta({ IDCALCULOTOTAL: idDetalle });
        setopenModalAjuste(false);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const BorraCalculo = () => {
    let data = {
      IDCALCULO: idDetalle,
      CHUSER: user.Id,
      CLAVE: clave,
      ANIO: anio,
      MES: nummes,
    };

    Swal.fire({
      icon: "question",
      title: "Borrar Cálculo",
      text: "El cálculo de eliminara, favor de confirmar",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      color: "rgb(175, 140, 85)",
    }).then((result) => {
      if (result.isConfirmed) {
        calculosServices.BorraCalculo(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Borrado Exitoso!",
            });
            handleClose();
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

  const EstatusCalculo = () => {
    let data = {
      IDCALCULO: idDetalle,
    };
    calculosServices.getEstatusCalculo(data).then((res) => {
      if (res.SUCCESS) {
        setStatus(res.RESPONSE[0]);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleAjustar = (row: any) => {
    console.log(row.row);
    setRow(row.row);
    setopenModalAjuste(true);
    // let data = {
    //   IDCALCULO: idDetalle,
    // };
    // calculosServices.getEstatusCalculo(data).then((res) => {
    //   if (res.SUCCESS) {
    //     setStatus(res.RESPONSE[0]);
    //   } else {
    //     AlertS.fire({
    //       title: "¡Error!",
    //       text: res.STRMESSAGE,
    //       icon: "error",
    //     });
    //   }
    // });
  };

  const getResponsable = () => {
    let data = {
      IDCALCULO: idDetalle,
    };
    calculosServices.getResponsable(data).then((res) => {
      if (res.SUCCESS) {
        setResponsable(res.RESPONSE[0]);
      } else if (res.RESPONSE[0] == null || res.RESPONSE[0] == "") {
        AlertS.fire({
          title: "¡Error!",
          text: "No se ha asignado a un responsable", //res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consulta = (data: any) => {
    calculosServices.calculosInfodetalle(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        var sumatotal = 0;
        res.RESPONSE.map((item: FPGDetalle) => {
          sumatotal = sumatotal + Number(item.total);
          setSumaTotal(sumatotal);
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
      setOpenSlider(false);
    });
  };

  const init = (data: any) => {
    calculosServices.calculosdetail(data).then((res) => {
      if (res.SUCCESS) {
        setNumMes(Number(res.RESPONSE[0].nummes));
        setAnio(res.RESPONSE[0].anio);
        setMes(res.RESPONSE[0].mes);
        setTipoCalculo(res.RESPONSE[0].tipocalculo);
        setFase(res.RESPONSE[0].Fase);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
      hide: true,
      hideable: false,
    },

    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      width: 150,
      description: "Identificador del Municipio",
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      width: 250,
      description: "Nombre del Municipio",
    },
    {
      field: "Mensual",
      headerName: "Mensual",
      width: 220,
      description: "Mensual",
      ...Moneda,
    },

    {
      field: "AjusteEstatal",
      headerName: clave == "ISR SALARIOS" ? "Devoluciones" : "AjusteEstatal",
      width: 150,
      description: clave == "ISR SALARIOS" ? "Devoluciones" : "AjusteEstatal",
    },

    {
      field: "total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
      renderHeader: () => (
        <>{"Total: " + currencyFormatter.format(Number(sumaTotal))}</>
      ),
    },
    {
      disableExport: true,
      field: "acciones",
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            {ajustar ? (
              <Tooltip title="Ajustar Cifra">
                <IconButton onClick={() => handleAjustar(v)}>
                  <MonetizationOnIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
  ];

  const columnssinde = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
      hide: true,
      hideable: false,
    },

    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      width: 150,
      description: "Identificador del Municipio",
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      width: 250,
      description: "Nombre del Municipio",
    },
    {
      field: "Mensual",
      headerName: "Mensual",
      width: 220,
      description: "Mensual",
    },

    {
      field: "AjusteEstatal",
      headerName: clave == "ISR SALARIOS" ? "Devoluciones" : "AjusteEstatal",
      width: 150,
      description: clave == "ISR SALARIOS" ? "Devoluciones" : "AjusteEstatal",
    },

    {
      field: "total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
      renderHeader: () => (
        <>{"Total: " + currencyFormatter.format(Number(sumaTotal))}</>
      ),
    },
    {
      disableExport: true,
      field: "acciones",
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            {ajustar ? (
              <Tooltip title="Ajustar Cifra">
                <IconButton onClick={() => handleAjustar(v)}>
                  <MonetizationOnIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
  ];

  const EstablecePermisos = () => {
    permisos.map((item: PERMISO) => {
      if (String(item.menu) == String(clave).replace(/\s/g, "")) {
        if (String(item.ControlInterno) == "AUT") {
          setAutorizar(true);
        }
        if (String(item.ControlInterno) == "CANC") {
          setCancelar(true);
        }
        if (String(item.ControlInterno) == "TRAZA") {
          setVerTrazabilidad(true);
        }

        if (String(item.ControlInterno) == "ELIM") {
          // setEliminar(true);
        }
        if (String(item.ControlInterno) == "EDIT") {
          //  setEditar(true);
        }
        if (String(item.ControlInterno) == "RECALCULAR") {
          setrecalcular(true);
        }

        if (String(item.ControlInterno) == "AJUSTAR") {
          setAjustar(true);
        }
      }
    });
  };

  const descargaPlantilla = () => {
    setOpenSlider(true);
    let data = {
      P_IDDETALLE: idDetalle,
    };

    ReportesServices.requerimientoPresupuestal(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE));
        var blobStore = new Blob([bufferArray], {
          type: "application/vnd.ms-excel",
        });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        link.download = "Requerimiento Prespuestal.xlsx";
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };
  useEffect(() => {
    EstablecePermisos();
    EstatusCalculo();
    getResponsable();
    init({ P_ID: idDetalle });
    consulta({ IDCALCULOTOTAL: idDetalle });
  }, []);

  return (
    <div>
      <Box>
        <Dialog open={true} fullScreen={true}>
          <Slider open={openSlider}></Slider>

          {openModal ? (
            <ModalCalculos
              tipo={tipoAccion}
              handleClose={handleClose}
              handleAccion={Fnworkflow}
              perfil={perfilDestino}
              area={area}
              visibleselect={visibleselect}
            />
          ) : (
            ""
          )}

          {openTrazabilidad ? (
            <Trazabilidad
              open={openTrazabilidad}
              handleClose={closeTraz}
              id={idCalculo}
            ></Trazabilidad>
          ) : (
            ""
          )}

          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: "rgb(245,245,245)",
                }}
              >
                <Titulo name={String(nombreFondo)} />
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={1} container sx={{ justifyContent: "center" }}>
              <label className="subtitulo">
                {anio}
                <br />
              </label>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ justifyContent: "center", width: "100%" }}
          >
            <Grid item container xs={1} sx={{ justifyContent: "center" }}>
              <label className="subtitulo">
                {mes}
                <br />
              </label>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid
              item
              container
              xs={6}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <label className="subtitulo">
                {"*" + tipoCalculo + "*"}
                <br />
              </label>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ justifyContent: "center", width: "100%" }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <label>
                Estatus del Cálculo: {status?.label} <br />
              </label>
              <label>
                Asignado a: {responsable?.label} <br />
              </label>
            </Grid>
          </Grid>

          <Box sx={{ height: 600, width: "100%" }}>
            <Box>
              <ToggleButtonGroup>
                <Tooltip title={"Regresar"}>
                  <ToggleButton
                    className="aceptar"
                    value="check"
                    onClick={() => handleAcciones(1)}
                  >
                    <ArrowBackIcon />
                  </ToggleButton>
                </Tooltip>
                {fase == 4 ? (
                  <Tooltip title={"Renviar Correo"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => handleRenviarCorreo()}
                    >
                      <MailOutlineIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}

                {recalcular ? (
                  <Tooltip title={"Generar Recálculo"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => ReCalculo()}
                    >
                      <CachedIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                {verTrazabilidad ? (
                  <Tooltip title={"Ver Trazabilidad"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => handleAcciones(2)}
                    >
                      <InsightsIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                {autorizar && user.Id == responsable?.value && fase == 1 ? (
                  <Tooltip title={"Enviar a Validación"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => handleAcciones(3)}
                    >
                      <DoneAllIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                {autorizar && user.Id == responsable?.value && fase == 2 ? (
                  <Tooltip title={"Enviar a Coordinador"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => handleAcciones(4)}
                    >
                      <DoneAllIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                {autorizar && user.Id == responsable?.value && fase == 3 ? (
                  <Tooltip title={"Enviar a DAMOP"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => handleAcciones(5)}
                    >
                      <DoneAllIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                {cancelar && user.Id == responsable?.value && fase == 1 ? (
                  <Tooltip title={"Cancelar"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => handleAcciones(6)}
                    >
                      <CancelPresentationIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                {cancelar && user.Id == responsable?.value && fase == 2 ? (
                  <Tooltip title={"Regresar a Analista"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => handleAcciones(7)}
                    >
                      <CompareArrowsIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                {cancelar && user.Id == responsable?.value && fase == 3 ? (
                  <Tooltip title={"Regresar a Validador"}>
                    <ToggleButton
                      className="aceptar"
                      value="check"
                      onClick={() => handleAcciones(8)}
                    >
                      <CompareArrowsIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                <Tooltip
                  title={"Descarfar Formato de Requerimiento Presupuestal"}
                >
                  <ToggleButton
                    className="aceptar"
                    value="check"
                    onClick={() => descargaPlantilla()}
                  >
                    <TextSnippetIcon />
                  </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
            </Box>

            <MUIXDataGrid
              columns={columns}
              rows={data}
              modulo={nombreFondo + " " + tipoCalculo + "-" + mes + "-" + anio}
            />
          </Box>
        </Dialog>
      </Box>
      {openModalAjuste ? (
        <Box>
          <Dialog open={true}>
            <Grid container justifyContent="space-between">
              <DialogTitle>Ajuste de Cifras</DialogTitle>
              <Tooltip title={"Cerrar"}>
                <Button
                  className="CerrarModal"
                  variant="outlined"
                  color="error"
                  onClick={() => handleClose()}
                >
                  X
                </Button>
              </Tooltip>
            </Grid>

            <DialogContent dividers={true}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <h3> {row?.Nombre}</h3>
                </Grid>
                <Grid item xs={12}>
                  <h3> {row?.Mensual}</h3>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Introduce el nuevo importe</Typography>
                  <TextField
                    required
                    // disabled
                    margin="dense"
                    id="NumOperacion"
                    value={importemensual}
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setimportemensual(Number(v.target.value))}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button
                color="success"
                className="guardar"
                onClick={() => grabacentavos(row)}
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default DetalleFgp;
