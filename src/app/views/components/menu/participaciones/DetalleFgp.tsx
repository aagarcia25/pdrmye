import { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { Moneda } from "../CustomToolbar";
import { Toast } from "../../../../helpers/Toast";
import { AlertS } from "../../../../helpers/AlertS";
import { calculosServices } from "../../../../services/calculosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import { columnasCal } from "../../../../interfaces/calculos/columnasCal";
import Slider from "../../Slider";
import { getPermisos, getUser } from "../../../../services/localStorage";
import { PERMISO, RESPONSE } from "../../../../interfaces/user/UserInfo";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import Trazabilidad from "../../Trazabilidad";
import Swal from "sweetalert2";
import ModalAlert from "../../componentes/ModalAlert";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InsightsIcon from "@mui/icons-material/Insights";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const DetalleFgp = ({
  idCalculo,
  openDetalles,
  idDetalle,
  nombreFondo,
  handleClose,
  clave,
  anio,
  mes,
}: {
  idCalculo: string;
  openDetalles: Boolean;
  idDetalle: string;
  nombreFondo: string;
  handleClose: Function;
  clave: string;
  anio: number;
  mes: string;
}) => {
  // Dire
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [status, setStatus] = useState<SelectValues>();
  const [perfil, setPerfil] = useState<SelectValues>();
  const [direccion, setDireccion] = useState<SelectValues>();
  const [openSlider, setOpenSlider] = useState(true);
  const [estatusDestino, setEstatusDestino] = useState("");
  const [perfilDestino, setperfilDestino] = useState("");
  //Permisos
  const [data, setData] = useState([]);
  const [vrows, setvrows] = useState({});
  const [autorizar, setAutorizar] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  //Modals
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);

  const [tipoAccion, setTipoAccion] = useState("");

  //Columnas
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
    setOpenTrazabilidad(false);
  };

  // MANEJO DE ACCIONES
  const handleAcciones = (v: any) => {
    if (v.tipo == 1) {
      console.log(v);
    } else if (v.tipo == 2) {
    } else {
      switch (v) {
        case 1: //Regresar
          handleClose();
          break;
        case 2: //Trazabilidad
          setOpenTrazabilidad(true);
          break;
        case 3: //Autorizar Analista
          setTipoAccion("Favor de ingresar un comentario para la Autorización");
          setEstatusDestino('CPH_ENV_COOR');
          setvrows(data);
          setOpenModal(true);
          setperfilDestino('COOR');
          break;
        case 4: //Autorizar Coordinador
          setTipoAccion("Favor de ingresar un comentario para la Autorización");
          setEstatusDestino('CPH_ENV_DIR');
          setvrows(data);
          setOpenModal(true);
          setperfilDestino('DIR');
          break;
        case 6: //Cancelar
          BorraCalculo()
          break;
        case 7: //Regresar a Analista
          setTipoAccion("Favor de ingresar un comentario para la Autorización");
          setEstatusDestino('CPH_REG_ANA');
          setperfilDestino('ANA');
          setvrows(data);
          setOpenModal(true);
          break;

        default:
          break;
      }
    }
  };

 



  const Fnworkflow = (data: any) => {
    console.log(data);

    let obj = {
      CHID: idCalculo,
      ESTATUS_DESTINO: estatusDestino,
      CHUSER: user.id,
      TEXTO: data.texto,
      PERFIL_DESTINO: perfilDestino,
    };

    calculosServices.indexCalculo(obj).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
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



  const BorraCalculo = () => {
    let data = {
      IDCALCULO: idDetalle,
      CHUSER: user.id,
      CLAVE: clave,
      ANIO: anio,
      MES: mes.split(",")[0],
    };

    console.log(data);
    Swal.fire({
      icon: "question",
      title: "Borrar Cálculo",
      text: "El cálculo de eliminara, favor de confirmar",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
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
              title: "Error!",
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
          title: "Error!",
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
          title: "Error!",
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
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };
  const columnas = (data: any) => {
    calculosServices.getColumns(data).then((res) => {
      if (res.SUCCESS) {
        const cl: columnasCal[] = res.RESPONSE;
        cl.map((item) => {
          console.log(item.keys);
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
          title: "Error!",
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
      setOpenSlider(false);
    });
  };
  const columns = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    // {
    //   field: "acciones",
    //   headerName: "Acciones",
    //   width: 100,
    //   renderCell: (v: any) => {
    //     return (
    //       <BotonesAcciones
    //         handleAccion={handleAcciones}
    //         row={v}
    //         editar={editar}
    //         eliminar={eliminar}
    //       />
    //     );
    //   },
    // },
    // {

    //   field: "ComentarioPresupuesto",
    //   headerName: "Observación DPCP",
    //   width: 300,
    //   description: "Observación DPCP",
    // },
    // {

    //   field: "RutaArchivo",
    //   headerName: "Documento DPCP",
    //   width: 100,
    //   renderCell: (v: any) => {
    //     return v.row.RutaArchivo !== null ? (
    //       <Box>
    //         <Link href={v.row.RutaArchivo} underline="always">
    //           Descargar
    //         </Link>
    //       </Box>
    //     ) : (
    //       ""
    //     );
    //   },
    // },

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
      headerName: "Importe",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: pa ? false : true,
      field: "PrimerAjuste",
      headerName: "Primer Ajuste",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: sa ? false : true,
      field: "SegundoAjuste",
      headerName: "Segundo Ajuste",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: ta ? false : true,
      field: "TercerAjuste",
      headerName: "Tercer Ajuste",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: ca ? false : true,
      field: "CuartoAjuste",
      headerName: "Cuarto Ajuste",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: ad ? false : true,
      field: "AjusteAnual",
      headerName: "Ajuste Anual",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: as ? false : true,
      field: "AjusteSemestral",
      headerName: "Ajuste Semestral",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: aa ? false : true,
      field: "AjusteDefinitivo",
      headerName: "Ajuste Definitivo",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: ae ? false : true,
      field: "AjusteEstatal",
      headerName: "Ajuste Estatal",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: rf ? false : true,
      field: "CompensacionFEIF",
      headerName: "Compensación FEIF",
      width: 150,
      description: "Compensación FEIF",
      ...Moneda,
    },
    {
      hide: cf ? false : true,
      field: "RetencionFEIF",
      headerName: "Retención FEIF",
      width: 150,
      description: "Retención FEIF",
      ...Moneda,
    },
    {
      hide: af ? false : true,
      field: "AjusteFofir",
      headerName: "Ajuste FOFIR",
      width: 150,
      description: "Ajuste FOFIR",
      ...Moneda,
    },
    {
      field: "total",
      headerName: "Total",
      width: 150,
      description: "Total",
      ...Moneda,
    },
  ];
  const EstablecePermisos = () => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === String(clave)) {
        if (String(item.Referencia) == "AUT") {
          setAutorizar(true);
        }
        if (String(item.Referencia) == "CANC") {
          setCancelar(true);
        }
        if (String(item.Referencia) == "TRAZA") {
          setVerTrazabilidad(true);
        }
       
        if (String(item.Referencia) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) == "EDIT") {
          setEditar(true);
        }
      }
    });
  };

  useEffect(() => {
    EstablecePermisos();
    EstatusCalculo();
    getPerfilCalculo();
    getAreaCalculo();
    columnas({ IDCALCULOTOTAL: idDetalle });
    consulta({ IDCALCULOTOTAL: idDetalle });
  }, []);

  return (
    <div>
      <Box>
        <Dialog open={Boolean(openDetalles)} fullScreen={true}>
         
         {openModal ? (
            <ModalAlert
              open={openModal}
              tipo={tipoAccion}
              handleClose={handleClose}
              vrows={vrows}
              handleAccion={Fnworkflow} 
              accion={0}      
              ></ModalAlert>
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
            <Grid item xs={1} sx={{ alignItems: "center" }}>
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
            <Grid item xs={1}>
              <label className="subtitulo">
                {mes.split(",")[1]}
                <br />
              </label>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ justifyContent: "center", width: "100%" }}
          >
            <Grid item xs={7} md={8} lg={8}>
              <label>
                Estatus del Cálculo: {status?.label} <br />
              </label>
              <label>
                Perfil Asignado: {perfil?.label} <br />
              </label>
              <label>
                Área Asignada: {direccion?.label} <br />
              </label>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ justifyContent: "center", width: "100%" }}
          >
            <Grid
              item
              xs={7}
              md={8}
              lg={8}
              sx={{ justifyContent: "center", width: "100%" }}
            >
              <Slider open={openSlider}></Slider>

              <Box>
                <ToggleButtonGroup>
                  <Tooltip title={"Regresar"}>
                    <ToggleButton
                      value="check"
                      onClick={() => handleAcciones(1)}
                    >
                      <ArrowBackIcon />
                    </ToggleButton>
                  </Tooltip>

                  {verTrazabilidad ? (
                    <Tooltip title={"Ver Trazabilidad"}>
                      <ToggleButton
                        value="check"
                        onClick={() => handleAcciones(2)}
                      >
                        <InsightsIcon />
                      </ToggleButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {autorizar && perfil?.value == "ANA"  &&  user.PERFILES[0].Referencia  == "ANA"  ? (
                    <Tooltip title={"Autorizar Analista"}>
                      <ToggleButton
                        value="check"
                        onClick={() => handleAcciones(3)}
                      >
                        <DoneAllIcon />
                      </ToggleButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {autorizar && perfil?.value == "COOR"  &&  user.PERFILES[0].Referencia  == "COOR" ? (
                    <Tooltip title={"Autorizar Coordinador"}>
                      <ToggleButton
                        value="check"
                        onClick={() => handleAcciones(4)}
                      >
                        <DoneAllIcon />
                      </ToggleButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

              

                  {cancelar &&  perfil?.value == "ANA"  &&  user.PERFILES[0].Referencia  == "ANA"   ? (
                    <Tooltip title={"Cancelar"}>
                      <ToggleButton
                        value="check"
                        onClick={() => handleAcciones(6)}
                      >
                        <CancelPresentationIcon />
                      </ToggleButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {cancelar && perfil?.value == "COOR" && user.PERFILES[0].Referencia  == "COOR" ? (
                    <Tooltip title={"Regresar a Analista"}>
                      <ToggleButton
                        value="check"
                        onClick={() => handleAcciones(7)}
                      >
                        <CompareArrowsIcon />
                      </ToggleButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                
                </ToggleButtonGroup>
              </Box>

              <MUIXDataGrid columns={columns} rows={data} />
            </Grid>
          </Grid>
        </Dialog>
      </Box>
    </div>
  );
};

export default DetalleFgp;
