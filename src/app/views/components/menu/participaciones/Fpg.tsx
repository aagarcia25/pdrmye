import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Grid, IconButton, ToggleButton, Tooltip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { currencyFormatter, Moneda } from "../CustomToolbar";
import ButtonsCalculo from "../catalogos/Utilerias/ButtonsCalculo";
import { calculosServices } from "../../../../services/calculosServices";
import { Toast } from "../../../../helpers/Toast";
import { AlertS } from "../../../../helpers/AlertS";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import { fondoinfo } from "../../../../interfaces/calculos/fondoinfo";
import Trazabilidad from "../../Trazabilidad";
import Slider from "../../Slider";
import DetalleFgp from "./DetalleFgp";
import { FPG, PERMISO, RESPONSE } from "../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../services/localStorage";
import ModalNew from "./ModalNew";
import ModalAjuste from "./ModalAjuste";
import MUIXDataGridMun from "../../MUIXDataGridMun";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Swal from "sweetalert2";
import { TooltipPersonalizado } from "../../componentes/CustomizedTooltips";
import React from "react";
import ButtonsTutorial from "../catalogos/Utilerias/ButtonsTutorial";

export const Fpg = () => {
  const [slideropen, setslideropen] = useState(false);
  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [anio, setAnio] = useState<number>(0);
  const [mes, setMes] = useState<string>("");
  const [tipoCalculo, setTipoCalculo] = useState<string>("");
  const [idtrazabilidad, setIdtrazabilidad] = useState("");
  const [openDetalles, setOpenDetalles] = useState(false);
  const [clave, setClave] = useState("");
  const [agregar, setAgregar] = useState<boolean>(false);
  const [agregarajuste, setAgregarAjuste] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);

  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [objfondo, setObjFondo] = useState<fondoinfo>();
  const [idDetalle, setIdDetalle] = useState("");
  const [nombreMenu, setNombreMenu] = useState("");
  const [sumaTotal, setSumaTotal] = useState<Number>();
  const user: RESPONSE = JSON.parse(String(getUser()));


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
  };

  const handleAjuste = (v: any) => {
    setIdDetalle(String(v.row.id));
    setstep(2);
  };

  const handleDetalle = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setClave(v.row.Clave)
    setIdDetalle(String(v.row.id));
    setMes(v.row.nummes + "," + v.row.Mes);
    setTipoCalculo(v.row.Tipo)
    setOpenDetalles(true);
    setAnio(Number(v.row.Anio));

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
            {agregarajuste && String(v.row.estatus) === "Inicio" ? (
              <Tooltip title="Agregar Ajuste">
                <IconButton
                  onClick={() => handleAjuste(v)}
                  disabled={
                    String(v.row.Clave) === "FISM" &&
                    String(v.row.Clave) === "FORTAMUN"
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
    /*{
      field: "Clave",
      headerName: "Clave",
      width: 150,
      description: "Clave Fondo",
    },*/
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
      field: "Total",
      headerName: "Total",
      width: 180,
      description: "Total",
      ...Moneda,
      renderHeader: (v) => (
        <>

          {v.field ? "Total: " + currencyFormatter.format(Number(sumaTotal)) : ""}
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
          title: "Consulta Exitosa!",
        });
        setdata(res.RESPONSE);
        var sumatotal = 0;
        res.RESPONSE.map((item: FPG) => {
          sumatotal = sumatotal + Number(item.Total)
          setSumaTotal(sumatotal)
        });
        if (!res.RESPONSE[0]) {
          setSumaTotal(0)
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
      CHUSER: user.id,
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
      color: 'rgb(175, 140, 85)',
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

  const handleBorrar = () => {

  };

  let params = useParams();

  useEffect(() => {
    setstep(0);
    setNombreMenu(String(params.fondo));
    permisos.map((item: PERMISO) => {

      if (String(item.ControlInterno) === String(params.fondo).replace(/\s/g, "")) {
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "TRAZA") {
          setVerTrazabilidad(true);
        }
        if (String(item.Referencia) === "AAJUSTE") {
          setAgregarAjuste(true);
        }
        if (String(item.Referencia) === "CCALCULO") {
          setCancelar(true);
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
    if (String(jwt) != null && String(jwt) != 'null' && String(jwt) != "") {
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

      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={2} >
          <ButtonsTutorial route={"/PDRMYE_DEV/VIDEOS/TUTORIALES/DPCP/"} />
        </Grid>
        <Grid item xs={12} sm={10} sx={{ textAlign: "center" }}>
          <TooltipPersonalizado title={
            <React.Fragment>
              <Typography variant="h6" className="h6-justify">
                {objfondo?.Comentarios}
              </Typography>
            </React.Fragment>
          }>
            <Typography variant="h3">
              {objfondo?.Descripcion}
            </Typography>
          </TooltipPersonalizado>

        </Grid>
      </Grid>

      {openDetalles ?
        <DetalleFgp
          idCalculo={idtrazabilidad}
          nombreFondo={objfondo?.Descripcion || ""}
          idDetalle={idDetalle}
          handleClose={handleClose}
          clave={clave}
        />
        : ""}

      {step === 0 ?
        <div style={{ height: 600, width: "100%" }}>
          <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center", }} >
            <Grid item xs={12} sx={{ display: "flex", alignItems: "left", justifyContent: "left", }}>
              <ButtonsCalculo handleOpen={handleOpen} agregar={agregar} />
            </Grid>

            <Grid item xs={12} sx={{
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MUIXDataGridMun columns={columns} rows={data} modulo={nombreMenu} handleBorrar={handleBorrar} controlInterno={String(params.fondo).replace(/\s/g, "")} />
            </Grid>
          </Grid>
        </div>
        : ""}


      {step === 1 ?
        <ModalNew
          clave={objfondo?.Clave || ""}
          titulo={objfondo?.Descripcion || ""}
          onClickBack={handleClose} resetNum={0} resetSelect={""} />
        : ""}

      {step === 2 ?
        <ModalAjuste
          idCalculo={idDetalle}
          clave={objfondo?.Clave || ""}
          titulo={objfondo?.Descripcion || ""}
          onClickBack={handleClose}
        />
        : ""}

    </>
  );
};


