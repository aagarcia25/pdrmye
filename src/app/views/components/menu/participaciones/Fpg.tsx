import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import InfoIcon from "@mui/icons-material/Info";
import InsightsIcon from "@mui/icons-material/Insights";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import { fondoinfo } from "../../../../interfaces/calculos/fondoinfo";
import {
  FPG,
  PERMISO,
  USUARIORESPONSE,
} from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getPermisos, getUser } from "../../../../services/localStorage";
import MUIXDataGridMun from "../../MUIXDataGridMun";
import Slider from "../../Slider";
import Trazabilidad from "../../Trazabilidad";
import { TooltipPersonalizado } from "../../componentes/CustomizedTooltips";
import { Moneda, currencyFormatter } from "../CustomToolbar";
import ButtonsCalculo from "../catalogos/Utilerias/ButtonsCalculo";
import DetalleFgp from "./DetalleFgp";
import ModalAjuste from "./ModalAjuste";
import ModalNew from "./ModalNew";
import DetalleFgpAnual from "./DetalleFgpAnual";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { CatalogosServices } from "../../../../services/catalogosServices";
export const Fpg = () => {
  const [slideropen, setslideropen] = useState(false);
  const [data, setdata] = useState([]);
  const [dataanual, setdataanual] = useState([]);
  const [step, setstep] = useState(0);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [anio, setAnio] = useState<number>(0);
  const [mes, setMes] = useState<string>("");
  const [tipoCalculo, setTipoCalculo] = useState<string>("");
  const [idtrazabilidad, setIdtrazabilidad] = useState("");
  const [openDetalles, setOpenDetalles] = useState(false);
  const [openDetallesanual, setOpenDetallesanual] = useState(false);
  const [clave, setClave] = useState("");
  const [agregar, setAgregar] = useState<boolean>(false);
  const [agregarajuste, setAgregarAjuste] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);
  const [calculoAnual, setcalculoAnual] = useState<boolean>(false);

  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [objfondo, setObjFondo] = useState<fondoinfo>();
  const [idDetalle, setIdDetalle] = useState("");
  const [nombreMenu, setNombreMenu] = useState("");
  const [sumaTotal, setSumaTotal] = useState<Number>();
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [checked, setChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      setslideropen(true);
      let data = { FONDO: objfondo?.Clave, anual: true };
      calculosServices.calculosInfo(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Consulta Exitosa!",
          });
          setdataanual(res.RESPONSE);

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
    }
  };

  const closeTraz = (v: any) => {
    setOpenTrazabilidad(false);
  };
  const handleTraz = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setOpenTrazabilidad(true);
  };

  const handleOpen = (v: any) => {
    setstep(1);
  };

  const handleClose = (v: any) => {
    consulta({ FONDO: objfondo?.Clave });
    setstep(0);
    setOpenDetalles(false);
    setOpenTrazabilidad(false);
    setOpenDetallesanual(false);
  };

  const handleAjuste = (v: any) => {
    setIdDetalle(String(v.row.id));
    setstep(2);
  };

  const handleDetalle = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setClave(v.row.Clave);
    setIdDetalle(String(v.row.id));
    setMes(v.row.nummes + "," + v.row.Mes);
    setTipoCalculo(v.row.Tipo);
    setOpenDetalles(true);
    setAnio(Number(v.row.Anio));
  };

  const handleDetalleanual = (v: any) => {
    setClave(v.row.Clave);
    setAnio(Number(v.row.Anio));
    setOpenDetallesanual(true);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    {
      disableExport: true,
      field: "acciones",
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Ver Detalle de Cálculo">
              <IconButton onClick={() => handleDetalle(v)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            {agregarajuste && String(v.row.estatus) == "Inicio" ? (
              <Tooltip title="Agregar Ajuste">
                <IconButton
                  onClick={() => handleAjuste(v)}
                  disabled={
                    String(v.row.Clave) == "FISM" &&
                    String(v.row.Clave) == "FORTAMUN"
                  }
                >
                  <AttachMoneyIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {verTrazabilidad ? (
              <Tooltip title="Ver Trazabilidad">
                <IconButton onClick={() => handleTraz(v)}>
                  <InsightsIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {cancelar ? (
              <Tooltip title={"Cancelar"}>
                <IconButton onClick={() => BorraCalculo(v)}>
                  <CancelPresentationIcon />
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
      field: "FechaCreacion",
      headerName: "Fecha Creación",
      width: 180,
      description: "Fecha Creación",
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 300,
      description: "Descripción del Fondo",
    },
    {
      field: "Tipo",
      headerName: "Tipo De Cálculo",
      width: 150,
      description: "Tipo De Cálculo",
    },
    {
      field: "Anio",
      headerName: "Año",
      width: 80,
      description: "Año",
    },
    {
      field: "Mes",
      headerName: "Mes",
      width: 150,
      description: "Mes",
    },
    {
      field: "TotalCompleto",
      headerName: "Importe Total",
      width: 180,
      description: "Importe Total",
      ...Moneda,
    },
    {
      field: "Total",
      headerName: "Distribución",
      width: 200,
      description: "Distribución",
      ...Moneda,
      renderHeader: (v) => (
        <>
          {v.field
            ? "Distribución: " + currencyFormatter.format(Number(sumaTotal))
            : ""}
        </>
      ),
    },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 200,
      description: "Estatus",
    },
  ];

  const columnsAnio: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    {
      disableExport: true,
      field: "acciones",
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Ver Detalle de Cálculo">
              <IconButton onClick={() => handleDetalleanual(v)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "Anio",
      headerName: "Año",
      width: 80,
      description: "Año",
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 300,
      description: "Descripción del Fondo",
    },

    {
      field: "TOTALCOMPLETO",
      headerName: "Importe Total",
      width: 180,
      description: "Importe Total",
      ...Moneda,
    },
    {
      field: "TOTAL",
      headerName: "Distribución",
      width: 200,
      description: "Distribución",
      ...Moneda,
    },
  ];

  const consultafondo = (data: any) => {
    calculosServices.fondoInfo(data).then((res) => {
      if (res.SUCCESS) {
        const obj: fondoinfo[] = res.RESPONSE;
        setObjFondo(obj[0]);
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
    setslideropen(true);
    calculosServices.calculosInfo(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setdata(res.RESPONSE);
        var sumatotal = 0;
        res.RESPONSE.map((item: FPG) => {
          sumatotal = sumatotal + Number(item.Total);
          setSumaTotal(sumatotal);
        });
        if (!res.RESPONSE[0]) {
          setSumaTotal(0);
        }
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
  };

  const BorraCalculo = (row: any) => {
    let data = {
      IDCALCULO: row.id,
      CHUSER: user.Id,
      CLAVE: row.row.Clave,
      ANIO: row.row.Anio,
      MES: row.row.nummes,
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

            consultafondo({ FONDO: params.fondo });
            consulta({ FONDO: params.fondo });
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

  const handleUpload = (data: any) => {
    setslideropen(true);
    let file = data.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "CALANUAL");
    CatalogosServices.migraData(formData).then((res) => {
      handleClose("tes");
      setslideropen(false);
    });
  };

  const handleBorrar = () => {};

  let params = useParams();

  useEffect(() => {
    setChecked(false);
    setstep(0);
    setNombreMenu(String(params.fondo));
    permisos.map((item: PERMISO) => {
      if (String(item.menu) == String(params.fondo).replace(/\s/g, "")) {
        if (String(item.ControlInterno) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) == "TRAZA") {
          setVerTrazabilidad(true);
        }
        if (String(item.ControlInterno) == "AAJUSTE") {
          setAgregarAjuste(true);
        }
        if (String(item.ControlInterno) == "CCALCULO") {
          setCancelar(true);
        }
        if (String(item.ControlInterno) == "CANUAL") {
          setcalculoAnual(true);
        }
      }
    });

    consultafondo({ FONDO: params.fondo });
    consulta({ FONDO: params.fondo });
  }, [params.fondo, nombreMenu]);

  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    setstep(0);
    const jwt = query.get("id");
    if (String(jwt) != null && String(jwt) != "null" && String(jwt) != "") {
      setIdtrazabilidad(String(jwt));
      setIdDetalle(String(jwt));
      setClave(String(params.fondo));
      setOpenDetalles(true);
    }
  }, [agregar]);

  return (
    <>
      <Slider open={slideropen}></Slider>
      {openTrazabilidad ? (
        <Trazabilidad
          open={openTrazabilidad}
          handleClose={closeTraz}
          id={idtrazabilidad}
        ></Trazabilidad>
      ) : (
        ""
      )}

      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={10} sx={{ textAlign: "center" }}>
          <TooltipPersonalizado
            title={
              <React.Fragment>
                <Typography variant="h6" className="h6-justify">
                  {objfondo?.Comentarios}
                </Typography>
              </React.Fragment>
            }
          >
            <Typography variant="h3">{objfondo?.Descripcion}</Typography>
          </TooltipPersonalizado>
        </Grid>
      </Grid>
      {step == 0 ? (
        <Grid container>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Vista por Año"
            />
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      {openDetallesanual ? (
        <DetalleFgpAnual
          anio={anio}
          clave={clave}
          handleClose={handleClose}
        ></DetalleFgpAnual>
      ) : (
        ""
      )}
      {openDetalles ? (
        <DetalleFgp
          idCalculo={idtrazabilidad}
          nombreFondo={objfondo?.Descripcion || "" + objfondo?.Tipo}
          idDetalle={idDetalle}
          handleClose={handleClose}
          clave={clave}
        />
      ) : (
        ""
      )}

      {step == 0 ? (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              <ButtonsCalculo handleOpen={handleOpen} agregar={agregar} />

              {calculoAnual ? (
                <Box sx={{}}>
                  <Tooltip title={"Generar Cálculo Anual"}>
                    <IconButton
                      className="enviar-mensaje"
                      component="label"
                      size="large"
                    >
                      <input
                        id="CANUAL"
                        required
                        type="file"
                        hidden
                        onChange={(event) => {
                          handleUpload(event);
                        }}
                      />
                      <LocalAtmIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                ""
              )}
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {checked ? (
                <MUIXDataGridMun
                  columns={columnsAnio}
                  rows={dataanual}
                  modulo={nombreMenu}
                  handleBorrar={handleBorrar}
                  controlInterno={String(params.fondo).replace(/\s/g, "")}
                />
              ) : (
                <MUIXDataGridMun
                  columns={columns}
                  rows={data}
                  modulo={nombreMenu}
                  handleBorrar={handleBorrar}
                  controlInterno={String(params.fondo).replace(/\s/g, "")}
                />
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        ""
      )}

      {step == 1 ? (
        <ModalNew
          clave={objfondo?.Clave || ""}
          titulo={objfondo?.Descripcion || ""}
          onClickBack={handleClose}
          resetNum={0}
          resetSelect={""}
        />
      ) : (
        ""
      )}

      {step == 2 ? (
        <ModalAjuste
          idCalculo={idDetalle}
          clave={objfondo?.Clave || ""}
          titulo={objfondo?.Descripcion || ""}
          onClickBack={handleClose}
        />
      ) : (
        ""
      )}
    </>
  );
};
