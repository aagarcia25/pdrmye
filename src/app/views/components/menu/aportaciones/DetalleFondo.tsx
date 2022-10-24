import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Dialog, Grid } from "@mui/material";
import { Moneda } from "../CustomToolbar";
import { Toast } from "../../../../helpers/Toast";
import { Alert } from "../../../../helpers/Alert";
import { calculosServices } from "../../../../services/calculosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import { columnasCal } from "../../../../interfaces/calculos/columnasCal";
import Slider from "../../Slider";
import BotonesOpciones from "../../componentes/BotonesOpciones";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import { PERMISO } from "../../../../interfaces/user/UserInfo";
import { getPermisos } from "../../../../services/localStorage";


const DetalleFondo = ({
  openDetalles,
  idDetalle,
  nombreFondo,
  handleClose,
  clave,
  estatus,
  anio,
  mes,
  handleTras,
  fondo

}: {
  openDetalles: Boolean;
  idDetalle: String;
  nombreFondo: String;
  handleClose: Function;
  clave: string;
  estatus: string;
  anio: number;
  mes: string;
  handleTras: Function;
  fondo: string;

}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [openSlider, setOpenSlider] = useState(false);
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

  const [slideropen, setslideropen] = useState(false);


  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [autorizar, setAutorizar] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [enviar, setEnviar] = useState<boolean>(false);



  const columnas = (data: any) => {
    setOpenSlider(true);
    calculosServices.getColumns(data).then((res) => {
      if (res.SUCCESS) {
        const cl: columnasCal[] = res.RESPONSE;
        cl.map((item) => {
          console.log("items key  " + item.keys);
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
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  const consulta = (data: any) => {
    setOpenSlider(true);
    calculosServices.calculosInfodetalle(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
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
      width: 200,
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
      width: 200,
      description: "Total",
      ...Moneda,
    },
  ];

  useEffect(() => {

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === String(clave)) {

        if (String(item.Referencia) == "AUT" && estatus != "CERRADO") {
          setAutorizar(true);
        }

        if (String(item.Referencia) == "CANC" && estatus != "CERRADO") {
          setCancelar(true);
        }

        if (String(item.Referencia) == "TRAZA") {
          setVerTrazabilidad(true);
        }

        if (String(item.Referencia) == "ENV" && estatus != "CERRADO") {
          setEnviar(true);
        }
      }
    });


    setTimeout(() => {
      columnas({ IDCALCULOTOTAL: idDetalle });
      consulta({ IDCALCULOTOTAL: idDetalle });
    }, 2000);
  }, []);

  return (
    <div style={{ height: 600, width: "80%" }}>
      <Box>

        <Slider open={openSlider}></Slider>


        <Dialog open={Boolean(openDetalles)} fullScreen={true} >

          <Grid container spacing={2} sx={{ justifyContent: "center", }} >
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
                <Titulo name={String(nombreFondo)} />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container spacing={1}
            sx={{ display: "flex", justifyContent: "center", }} >

            <Grid item xs={1} sx={{ alignItems: "center", }} >

              <label className="subtitulo">{anio}<br /><br /><br /></label>
            </Grid>
          </Grid>
          <Grid
            container spacing={1}
            sx={{ justifyContent: "center", width: "100%" }} >

            <Grid item xs={1} >

              <label className="subtitulo">{mes} <br /><br /><br /></label>
            </Grid>
          </Grid>
          <Grid
            container spacing={1}
            sx={{ justifyContent: "center", width: '100%' }} >

            <Grid item xs={7} md={8} lg={8} sx={{ justifyContent: "center", width: '100%' }}>
              <BotonesOpciones
                handleAccion={handleClose}
                autorizar={autorizar}
                cancelar={cancelar}
                verTrazabilidad={verTrazabilidad}
                enviar={enviar}
                presupuesto={true} 
                estatus={""}                />

              <MUIXDataGrid columns={columns} rows={data} />

            </Grid>
          </Grid>

        </Dialog>
      </Box>
    </div>
  );
};

export default DetalleFondo;
