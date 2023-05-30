import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InsightsIcon from "@mui/icons-material/Insights";
import { Box, Dialog, Grid, ToggleButton, ToggleButtonGroup, Tooltip, } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import { columnasCal } from "../../../../interfaces/calculos/columnasCal";
import { FPGDetalle, PERMISO, RESPONSE } from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getPermisos, getUser } from "../../../../services/localStorage";
import MUIXDataGrid from "../../MUIXDataGrid";
import Slider from "../../Slider";
import Trazabilidad from "../../Trazabilidad";
import ModalCalculos from "../../componentes/ModalCalculos";
import { Moneda, currencyFormatter } from "../CustomToolbar";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import CachedIcon from '@mui/icons-material/Cached';

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
  // Dire
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [status, setStatus] = useState<SelectValues>();
  const [perfil, setPerfil] = useState<SelectValues>();
  const [direccion, setDireccion] = useState<SelectValues>();
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


  //Permisos
  const [data, setData] = useState([]);
  const [autorizar, setAutorizar] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [recalcular, setrecalcular] = useState<boolean>(false);
  //Modals
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const [tipoAccion, setTipoAccion] = useState("");
  //Columnas
  const [visibleselect, setvisibleselect] = useState<Number>(0);
  const [pa, setPa] = useState(false);
  const [sa, setSa] = useState(false);
  const [ta, setTa] = useState(false);
  const [ca, setCa] = useState(false);
  const [ad, setAd] = useState(false);
  const [as, setAs] = useState(false);
  const [aa, setAa] = useState(false);
  const [rf, setRf] = useState(false);
  const [cf, setCf] = useState(false);
  const [ae, setAe] = useState(false);
  const [af, setAf] = useState(false);
  const closeTraz = () => {
    setOpenSlider(false);
    setOpenTrazabilidad(false);
  };

  // MANEJO DE ACCIONES
  const handleAcciones = (v: any) => {
    setOpenSlider(true);
    if (v.tipo === 1) {
      //console.log(v);
    } else if (v.tipo === 2) {
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
          setArea("CPH")
          setOpenModal(true);
          break;

        default:
          break;
      }
    }
  };

  const Fnworkflow = (data: any) => {
    setOpenSlider(true);

    if (!perfilDestino || !data.mensaje) {

      AlertS.fire({
        title: "Verifique Los Campos",
        icon: "error",
      });
    }
    else {
      let obj = {
        CHID: idCalculo,
        ESTATUS_DESTINO: estatusDestino,
        CHUSER: user.id,
        TEXTO: data.mensaje,
        PERFIL_DESTINO: perfilDestino,
        CHUSERASIGNADO: data.usuario,
        AREA: area
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
  };

  const ReCalculo = () => {
    let data = {
      IDCALCULO: idDetalle,
      CHUSER: user.id
    };

    Swal.fire({
      icon: "question",
      title: "recalcular",
      text: "Al generar el Recálculo los movimientos pueden verse afectados",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      color: 'rgb(175, 140, 85)',
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

  const BorraCalculo = () => {
    let data = {
      IDCALCULO: idDetalle,
      CHUSER: user.id,
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
      color: 'rgb(175, 140, 85)',
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
  const getPerfilCalculo = () => {
    let data = {
      IDCALCULO: idDetalle,
    };
    calculosServices.getPerfilCalculo(data).then((res) => {
      if (res.SUCCESS) {
        setPerfil(res.RESPONSE[0]);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };
  const getAreaCalculo = () => {
    let data = {
      IDCALCULO: idDetalle,
    };
    calculosServices.getAreaCalculo(data).then((res) => {
      if (res.SUCCESS) {
        setDireccion(res.RESPONSE[0]);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };
  const getResponsable = () => {
    let data = {
      IDCALCULO: idDetalle,
    };
    calculosServices.getResponsable(data).then((res) => {
      if (res.SUCCESS) {
        setResponsable(res.RESPONSE[0]);
      }else if(res.RESPONSE[0] === null || res.RESPONSE[0] === ""){
        AlertS.fire({
          title: "¡Error!",
          text: "No se ha asignado a un responsable",//res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const columnas = (data: any) => {
    calculosServices.getColumns(data).then((res) => {
      if (res.SUCCESS) {
        const cl: columnasCal[] = res.RESPONSE;
        cl?.map((item) => {
          //console.log(item.keys);
          switch (item.keys) {
            case 0:
              break;
            case 1:
              setPa(true);
              break;
            case 2:
              setSa(true);
              break;
            case 3:
              setTa(true);
              break;
            case 4:
              setCa(true);
              break;
            case 5:
              setAd(true);
              break;
            case 6:
              setAa(true);
              break;
            case 7:
              setAs(true);
              break;
            case 8:
              setRf(true);
              break;
            case 9:
              setCf(true);
              break;
            case 10:
              setAe(true);
              break;
            case 11:
              setAf(true);
              break;
            default:
              break;
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
          sumatotal = sumatotal + Number(item.total)
          setSumaTotal(sumatotal)
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
      // console.log(res.RESPONSE[0])
        setNumMes(Number(res.RESPONSE[0].nummes));
        setAnio(res.RESPONSE[0].anio);
        setMes(res.RESPONSE[0].mes);
        setTipoCalculo(res.RESPONSE[0].tipocalculo);
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
    { field: "id", headerName: "Identificador", width: 150, hide: true  , hideable:false },

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
    // {
    //   hide: true  , 
    //   field: "PrimerAjuste",
    //   headerName: "Primer Ajuste",
    //   width: 200,
    //   description: "Primer Ajuste",
    //   ...Moneda,
    // },
    // {
    //   hide: sa ? false : true,
    //   field: "SegundoAjuste",
    //   headerName: "Segundo Ajuste",
    //   width: 150,
    //   description: "Segundo Ajuste",
    //   ...Moneda,

    // },
    // {
    //   hide: ta ? false : true,
    //   field: "TercerAjuste",
    //   headerName: "Tercer Ajuste",
    //   width: 150,
    //   description: "Tercer Ajuste",
    //   ...Moneda,

    // },
    // {
    //   hide: ca ? false : true,
    //   field: "CuartoAjuste",
    //   headerName: "Cuarto Ajuste",
    //   width: 150,
    //   description: "Cuarto Ajuste",
    //   ...Moneda,

    // },
    // {
    //   hide: ad ? false : true,
    //   field: "AjusteAnual",
    //   headerName: "Ajuste Anual",
    //   width: 150,
    //   description: "Ajuste Anual",
    //   ...Moneda,

    // },
    // {
    //   hide: as ? false : true,
    //   field: "AjusteSemestral",
    //   headerName: "Ajuste Semestral",
    //   width: 150,
    //   description: "Ajuste Semestral",
    //   ...Moneda,

    // },
    // {
    //   hide: aa ? false : true,
    //   field: "AjusteDefinitivo",
    //   headerName: "Ajuste Definitivo",
    //   width: 150,
    //   description: "Ajuste Definitivo",
    //   ...Moneda,

    // },
    {
      hide: ae ? false : true,
      field: "AjusteEstatal",
      headerName: "Ajuste Estatal",
      width: 150,
      description: "Ajuste Estatal",
      ...Moneda,

    },
    // {
    //   hide: rf ? false : true,
    //   field: "CompensacionFEIF",
    //   headerName: "Compensación FEIF",
    //   width: 150,
    //   description: "Compensación FEIF",
    //   ...Moneda,

    // },
    // {
    //   hide: cf ? false : true,
    //   field: "RetencionFEIF",
    //   headerName: "Retención FEIF",
    //   width: 150,
    //   description: "Retención FEIF",
    //   ...Moneda,

    // },
    // {
    //   hide: af ? false : true,
    //   field: "AjusteFofir",
    //   headerName: "Ajuste FOFIR",
    //   width: 150,
    //   description: "Ajuste FOFIR",
    //   ...Moneda,

    // },
    {
      field: "total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
      renderHeader: () => (
        <>
          {"Total: " + currencyFormatter.format(Number(sumaTotal))}
        </>
      ),

    },
  ];
  const EstablecePermisos = () => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === String(clave).replace(/\s/g, "")) {
        if (String(item.Referencia) === "AUT") {
          setAutorizar(true);
        }
        if (String(item.Referencia) === "CANC") {
          setCancelar(true);
        }
        if (String(item.Referencia) === "TRAZA") {
          setVerTrazabilidad(true);
        }

        if (String(item.Referencia) === "ELIM") {
          // setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          //  setEditar(true);
        }
       // if (String(item.Referencia) === "RECALCULAR") {
           setrecalcular(true);
      //  }
      }
    });
  };

  useEffect(() => {
    EstablecePermisos();
    EstatusCalculo();
    getPerfilCalculo();
    getAreaCalculo();
    getResponsable();
    init({ P_ID: idDetalle })
    columnas({ IDCALCULOTOTAL: idDetalle });
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
              area={area} visibleselect={visibleselect}            />
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
            <Grid item container xs={6} sx={{ alignItems: "center", justifyContent: "center" }}>
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
                Perfil Asignado: {perfil?.label} <br />
              </label>
              <label>
                Área Asignada: {direccion?.label} <br />
              </label>
              <label>
                Asignado a: {responsable?.label} <br />
              </label>
            </Grid>
          </Grid>

          <Box sx={{ height: 600, width: "100%", }}>
            <Box>
              <ToggleButtonGroup>
                <Tooltip title={"Regresar"}>
                  <ToggleButton
                  className="regresar"
                    value="check"
                    onClick={() => handleAcciones(1)}
                  >
                    <ArrowBackIcon />
                  </ToggleButton>
                </Tooltip>

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



                {
                  autorizar &&
                    user.id === responsable?.value &&
                    direccion?.value === "CPH" &&
                    perfil?.value === "ANA" &&
                    user.PERFILES[0].Referencia === "ANA" ? (
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


                {
                  autorizar &&
                    user.id === responsable?.value &&
                    direccion?.value === "CPH" &&
                    perfil?.value === "VAL" &&
                    user.PERFILES[0].Referencia === "VAL" ? (
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



                {autorizar &&
                  user.id === responsable?.value &&
                  direccion?.value === "CPH" &&
                  perfil?.value === "COOR" &&
                  user.PERFILES[0].Referencia === "COOR" ? (
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

                {cancelar &&
                  user.id === responsable?.value &&
                  direccion?.value === "CPH" &&
                  perfil?.value === "ANA" &&
                  user.PERFILES[0].Referencia === "ANA" ? (
                  <Tooltip title={"Cancelar"}>
                    <ToggleButton
                     className="regresar"
                      value="check"
                      onClick={() => handleAcciones(6)}
                    >
                      <CancelPresentationIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}

                {cancelar &&
                  user.id === responsable?.value &&
                  direccion?.value === "CPH" &&
                  perfil?.value === "VAL" &&
                  user.PERFILES[0].Referencia === "VAL" ? (
                  <Tooltip title={"Regresar a Analista"}>
                    <ToggleButton
                     className="regresar"
                      value="check"
                      onClick={() => handleAcciones(7)}
                    >
                      <CompareArrowsIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}

                {cancelar &&
                  user.id === responsable?.value &&
                  direccion?.value === "CPH" &&
                  perfil?.value === "COOR" &&
                  user.PERFILES[0].Referencia === "COOR" ? (
                  <Tooltip title={"Regresar a Validador"}>
                    <ToggleButton
                    className="regresar"
                      value="check"
                      onClick={() => handleAcciones(8)}
                    >
                      <CompareArrowsIcon />
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  ""
                )}

              </ToggleButtonGroup>
            </Box>
            <MUIXDataGrid columns={columns} rows={data} modulo={nombreFondo+"-"+mes+"-"+anio} />
          </Box>
        </Dialog>
      </Box>
    </div>
  );
};

export default DetalleFgp;
