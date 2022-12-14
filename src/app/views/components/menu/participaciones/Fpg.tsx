import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
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
import { FPG, PERMISO } from "../../../../interfaces/user/UserInfo";
import { getPermisos } from "../../../../services/localStorage";
import ModalNew from "./ModalNew";
import ModalAjuste from "./ModalAjuste";
import MUIXDataGridMun from "../../MUIXDataGridMun";

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
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [objfondo, setObjFondo] = useState<fondoinfo>();
  const [idDetalle, setIdDetalle] = useState("");
  const [nombreMenu, setNombreMenu] = useState("");
  const [sumaTotal, setSumaTotal] = useState<Number>();



  const closeTraz = (v: any) => {
    setOpenTrazabilidad(false);
  };
  const handleTraz = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setOpenTrazabilidad(true);
  };

  const handleHeader = (v: any) => {
    console.log(v)
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
    console.log(v.row)
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
            <Tooltip title="Ver detalle de C??lculo">
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
          </Box>
        );
      },

    },
    {
      field: "FechaCreacion",
      headerName: "Fecha Creaci??n",
      width: 180,
      description: "Fecha Creaci??n",
    },
    {
      field: "Clave",
      headerName: "Clave",
      width: 150,
      description: "Clave Fondo",
    },
    {
      field: "Descripcion",
      headerName: "Descripci??n",
      width: 300,
      description: "Descripci??n del Fondo",
    },
    {
      field: "Tipo",
      headerName: "Tipo De C??lculo",
      width: 150,
      description: "Tipo De C??lculo",
    },
    {
      field: "Anio",
      headerName: "A??o",
      width: 80,
      description: "A??o",
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
      renderHeader: () => (
        <>
          {"Total: " + currencyFormatter.format(Number(sumaTotal))}
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
          title: "Error!",
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
  };



  const handleBorrar = () => {

  };

  let params = useParams();

  useEffect(() => {
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
      }
    });


    consultafondo({ FONDO: params.fondo });
    consulta({ FONDO: params.fondo });


  }, [params.fondo, nombreMenu]);

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
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Tooltip title={objfondo?.Comentarios}>
            <Typography>
              <h1>{objfondo?.Descripcion}</h1>
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>

      {openDetalles ?
        <DetalleFgp
          idCalculo={idtrazabilidad}
          openDetalles={openDetalles}
          nombreFondo={objfondo?.Descripcion || ""}
          idDetalle={idDetalle}
          handleClose={handleClose}
          clave={clave}
          anio={anio}
          mes={mes} tipoCalculo={tipoCalculo} />
        : ""}

      {step === 0 ?
        <div style={{ height: 600, width: "100%" }}>
          <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center", }} >
            <Grid item sm={12} sx={{ display: "flex", alignItems: "left", justifyContent: "left", }}>
              <ButtonsCalculo handleOpen={handleOpen} agregar={agregar} />
            </Grid>

            <Grid item sm={12} sx={{
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
          onClickBack={handleClose}
        />
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


