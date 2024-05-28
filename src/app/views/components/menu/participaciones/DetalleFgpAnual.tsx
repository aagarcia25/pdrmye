import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Dialog,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { GridColumnGroupingModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import { USUARIORESPONSE } from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getUser } from "../../../../services/localStorage";
import MUIXDataGridGroup from "../../MUIXDataGridGroup";
import Slider from "../../Slider";
import { Moneda } from "../CustomToolbar";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
const DetalleFgpAnual = ({
  nombreFondo,
  anio,
  clave,
  handleClose,
}: {
  nombreFondo: string;
  anio: number;
  clave: string;
  handleClose: Function;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [openSlider, setOpenSlider] = useState(true);
  const [estatus, setEstatus] = useState<boolean>(false);
  //Permisos
  const [data, setData] = useState([]);

  const cancelar = () => {
    setOpenSlider(true);
    let data = {
      ClaveFondo: clave,
      anio: anio,
      CHUSER: user.Id,
    };
    calculosServices.BorraCalculoAnual(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        handleClose();
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

  const validar = () => {
    setOpenSlider(true);
    let data = {
      ClaveFondo: clave,
      anio: anio,
      CHUSER: user.Id,
    };
    calculosServices.aprovarcalculoanual(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setOpenSlider(false);
        handleClose();
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

  const Cestatus = () => {
    let data = {
      ClaveFondo: clave,
      anio: anio,
    };
    calculosServices.estatusanual(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        console.log(res.RESPONSE[0].estatus);
        if (res.RESPONSE[0].estatus === "Inicio") {
          setEstatus(true);
        }
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

  const consulta = (data: any) => {
    calculosServices.calculosanualdetalle(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
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

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "Enero",
      children: [
        { field: "Enero_mensual" },
        { field: "Enero_ajuste" },
        { field: "Enero_total" },
      ],
    },
    {
      groupId: "Febrero",
      children: [
        { field: "Febrero_mensual" },
        { field: "Febrero_ajuste" },
        { field: "Febrero_total" },
      ],
    },
    {
      groupId: "Marzo",
      children: [
        { field: "Marzo_mensual" },
        { field: "Marzo_ajuste" },
        { field: "Marzo_total" },
      ],
    },
    {
      groupId: "Abril",
      children: [
        { field: "Abril_mensual" },
        { field: "Abril_ajuste" },
        { field: "Abril_total" },
      ],
    },
    {
      groupId: "Mayo",
      children: [
        { field: "Mayo_mensual" },
        { field: "Mayo_ajuste" },
        { field: "Mayo_total" },
      ],
    },
    {
      groupId: "Junio",
      children: [
        { field: "Junio_mensual" },
        { field: "Junio_ajuste" },
        { field: "Junio_total" },
      ],
    },
    {
      groupId: "Julio",
      children: [
        { field: "Julio_mensual" },
        { field: "Julio_ajuste" },
        { field: "Julio_total" },
      ],
    },
    {
      groupId: "Agosto",
      children: [
        { field: "Agosto_mensual" },
        { field: "Agosto_ajuste" },
        { field: "Agosto_total" },
      ],
    },
    {
      groupId: "Septiembre",
      children: [
        { field: "Septiembre_mensual" },
        { field: "Septiembre_ajuste" },
        { field: "Septiembre_total" },
      ],
    },
    {
      groupId: "Octubre",
      children: [
        { field: "Octubre_mensual" },
        { field: "Octubre_ajuste" },
        { field: "Octubre_total" },
      ],
    },
    {
      groupId: "Noviembre",
      children: [
        { field: "Noviembre_mensual" },
        { field: "Noviembre_ajuste" },
        { field: "Noviembre_total" },
      ],
    },
    {
      groupId: "Diciembre",
      children: [
        { field: "Diciembre_mensual" },
        { field: "Diciembre_ajuste" },
        { field: "Diciembre_total" },
      ],
    },
  ];

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
      field: "Enero_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Enero_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Enero_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Febrero_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Febrero_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Febrero_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Marzo_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Marzo_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Marzo_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Abril_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Abril_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Abril_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Mayo_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Mayo_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Mayo_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Junio_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Junio_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Junio_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Julio_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Julio_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Julio_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Agosto_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Agosto_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Agosto_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Septiembre_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Septiembre_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Septiembre_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Octubre_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Octubre_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Octubre_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Noviembre_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Noviembre_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Noviembre_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },

    {
      field: "Diciembre_mensual",
      headerName: "Mensual",
      width: 250,
      description: "Mensual",
      ...Moneda,
    },
    {
      field: "Diciembre_ajuste",
      headerName: "Ajustes",
      width: 250,
      description: "Ajustes",
      ...Moneda,
    },
    {
      field: "Diciembre_total",
      headerName: "Total",
      width: 250,
      description: "Total",
      ...Moneda,
    },
  ];

  useEffect(() => {
    consulta({ ClaveFondo: clave, anio: anio });
    Cestatus();
  }, []);

  return (
    <>
      <Box>
        <Dialog open={true} fullScreen={true}>
          <Slider open={openSlider}></Slider>

          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: "rgb(245,245,245)",
                }}
              >
                {<Titulo name={String(nombreFondo)} />}
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={1} container sx={{ justifyContent: "center" }}>
              <label className="subtitulo">{anio}</label>
            </Grid>
          </Grid>
          <Box sx={{ height: 600, width: "100%" }}>
            <Box>
              <ToggleButtonGroup>
                <Tooltip title={"Regresar"}>
                  <ToggleButton
                    className="aceptar"
                    value="check"
                    onClick={() => handleClose()}
                  >
                    <ArrowBackIcon />
                  </ToggleButton>
                </Tooltip>
                {estatus ? (
                  <>
                    <Tooltip title={"Validar"}>
                      <ToggleButton
                        className="aceptar"
                        value="check"
                        onClick={() => validar()}
                      >
                        <DoneAllIcon />
                      </ToggleButton>
                    </Tooltip>

                    <Tooltip title={"Cancelar"}>
                      <ToggleButton
                        className="aceptar"
                        value="check"
                        onClick={() => cancelar()}
                      >
                        <CancelPresentationIcon />
                      </ToggleButton>
                    </Tooltip>
                  </>
                ) : (
                  ""
                )}
              </ToggleButtonGroup>
            </Box>
            <MUIXDataGridGroup
              columns={columns}
              rows={data}
              modulo={"export"}
              group={columnGroupingModel}
            />
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default DetalleFgpAnual;
