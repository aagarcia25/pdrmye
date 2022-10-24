import { useEffect, useState } from "react";
import { Box, Dialog, Grid, IconButton, Tooltip } from "@mui/material";
import { Moneda } from "../CustomToolbar";
import { Toast } from "../../../../helpers/Toast";
import { Alert } from "../../../../helpers/Alert";
import { calculosServices } from "../../../../services/calculosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import { columnasCal } from "../../../../interfaces/calculos/columnasCal";
import Slider from "../../Slider";
import { getPermisos, getUser } from "../../../../services/localStorage";
import { PERMISO, RESPONSE } from "../../../../interfaces/user/UserInfo";
import BotonesOpciones from "../../componentes/BotonesOpciones";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import Trazabilidad from "../../Trazabilidad";
import Swal from "sweetalert2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ModalAlert from "../../componentes/ModalAlert";

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
  idDetalle: String;
  nombreFondo: String;
  handleClose: Function;
  clave: string;
  anio: number;
  mes: string;
}) => {


  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [status, setStatus] = useState<string>("");
  const [statusDestino, setStatusDestino] = useState<string>("");
  const [data, setData] = useState([]);
  const [autorizar, setAutorizar] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [enviar, setEnviar] = useState<boolean>(false);
  const [presupuesto, setPresupuesto] = useState<boolean>(false);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const [proceso, setProceso] = useState(""); //VARIABLE PARA DETERMINAR EL PROCESO QUE SE ESTA REALIZANDO
  const [tipoAccion, setTipoAccion] = useState("")
  const [openSlider, setOpenSlider] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

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
    switch (v) {
      case 1: //Regresar
        handleClose();
        break;

      case 2: //Autorizar
        setTipoAccion("Favor de ingresar un comentario para la Autorización");
        UpdateCalculo("AUTORIZADO");
        break;

      case 3: //Cancelar
        BorraCalculo();
        break;

      case 4: //Enviar
       setTipoAccion("Favor de ingresar un comentario para el Envio");
        UpdateCalculo("ENVIADO");
        break;

      case 5: //Ver Trazabilidad
        setOpenTrazabilidad(true);
        break;

      case 6: //Asignar Presupuesto
       setTipoAccion("Favor de ingresar un comentario para la asignación del Presupuesto");
        agregarPresupuesto(true);
        break;

      default:
        break;
    }
  };

  const agregarPresupuesto = (data: any) => {
    console.log(data);
  };

  const UpdateCalculo = (estatus: string) => 
  {
    setStatusDestino(estatus);
    setOpenModal(true);
  };

  const FnworkflowClose = () => {
    setOpenModal(false);
  };

  const Fnworkflow =(data: any)=>{
    console.log(data);
    let obj={
      IDCALCULO:       idCalculo,
      ESTATUS_DESTINO: statusDestino,
      ESTATUS_ORIGEN:  status,
      IDUSUARIO:       user.id,
      PROCESO:         proceso,
      TEXTO:           data.texto
    };

    console.log(obj);
  }
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
              title: "Consulta Exitosa!",
            });
            handleClose();
          } else {
            Alert.fire({
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
        setStatus(res.RESPONSE[0].ControlInterno);
      } else {
        Alert.fire({
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
        Alert.fire({
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
        console.log("Pasando estatus" + status);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const columns = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
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

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            {presupuesto ? (
              <Tooltip title="Asignar Presupuesto">
                <IconButton onClick={() => agregarPresupuesto(v)}>
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
  ];

  const EstablecePermisos = () => {
    if(clave === "ICV" || clave === "ISN"){
      setProceso("PARTICIPACIONES_ESTATALES_CPH");
    }else{
      setProceso("PARTICIPACIONES_FEDERALES_CPH");
    }

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
        if (String(item.Referencia) == "PRESUPUESTO") {
          setPresupuesto(true);
        }
        if (String(item.Referencia) == "ENV") {
          setEnviar(true);
        }
      }
    });
  };

  useEffect(() => {
    EstablecePermisos();
    EstatusCalculo();
    columnas({ IDCALCULOTOTAL: idDetalle });
    consulta({ IDCALCULOTOTAL: idDetalle });
   
  }, [status]);

  return (
    <div>
      <Box>
        <Dialog open={Boolean(openDetalles)} fullScreen={true}>
          {openModal ? (
            <ModalAlert
              open={openModal}
              tipo={tipoAccion}
              handleClose={FnworkflowClose}
              vrows={""}
              handleAccion={Fnworkflow}
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

          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
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
                {mes.split(",")[1]} <br />
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
              <label className="subtitulo">
                Estatus del Cálculo: {status} <br />
              </label>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ justifyContent: "center", width: "100%" }}
          >
            <Slider open={openSlider}></Slider>
            <Grid
              item
              xs={7}
              md={8}
              lg={8}
              sx={{ justifyContent: "center", width: "100%" }}
            >
              <BotonesOpciones
                handleAccion={handleAcciones}
                autorizar={autorizar}
                cancelar={cancelar}
                verTrazabilidad={verTrazabilidad}
                enviar={enviar}
                presupuesto={presupuesto}
                estatus={status}
              />

              <MUIXDataGrid columns={columns} rows={data} />
            </Grid>
          </Grid>
        </Dialog>
      </Box>
    </div>
  );
};

export default DetalleFgp;
