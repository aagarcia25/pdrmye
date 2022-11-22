import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Moneda } from "../CustomToolbar";
import ButtonsCalculo from "../catalogos/Utilerias/ButtonsCalculo";
import { calculosServices } from "../../../../services/calculosServices";
import { Toast } from "../../../../helpers/Toast";
import { AlertS } from "../../../../helpers/AlertS";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import MUIXDataGrid from "../../MUIXDataGrid";
import { fondoinfo } from "../../../../interfaces/calculos/fondoinfo";
import Trazabilidad from "../../Trazabilidad";
import Slider from "../../Slider";
import DetalleFgp from "./DetalleFgp";
import { PERMISO } from "../../../../interfaces/user/UserInfo";
import { getPermisos } from "../../../../services/localStorage";
import ModalNew from "./ModalNew";
import ModalAjuste from "./ModalAjuste";

export const Fpg = () => {
  const [openSlider, setOpenSlider] = useState(true);
  const [slideropen, setslideropen] = useState(false);
  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [anio, setAnio] = useState<number>(0);
  const [mes, setMes] = useState<string>("");
  const [idtrazabilidad, setIdtrazabilidad] = useState("");
  const [openDetalles, setOpenDetalles] = useState(false);
  const [clave, setClave] = useState("");
  const [agregar, setAgregar] = useState<boolean>(false);
  const [agregarajuste, setAgregarAjuste] = useState<boolean>(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [objfondo, setObjFondo] = useState<fondoinfo>();
  const [idDetalle, setIdDetalle] = useState("");
  const [nombreMenu, setNombreMenu] = useState("");


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
    setOpenSlider(false);
    consulta({ FONDO: objfondo?.Clave });
    setstep(0);
    setOpenDetalles(false);
  };

  const handleAjuste = (v: any) => {
    setIdDetalle(String(v.row.id));
    setstep(2);
  };

  const handleDetalle = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setClave(v.row.Clave)
    setIdDetalle(String(v.row.id));
    setMes(v.row.nummes +","+v.row.Mes);
    setstep(2);
    setOpenDetalles(true);
    setAnio(Number(v.row.Anio));

  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Ver detalle de Cálculo">
              <IconButton onClick={() => handleDetalle(v)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>


            {agregarajuste &&  String(v.row.estatus) === "INICIO" ? (
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
      headerName: "Fecha Creación",
      width: 150,
      description: "Fecha Creación",
    },
    {
      field: "Clave",
      headerName: "Clave",
      width: 150,
      description: "Clave Fondo",
    },
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 300,
      description: "Descripcion del Fondo",
    },
    {
      field: "Tipo",
      headerName: "Tipo",
      width: 150,
      description: "Tipo Cálculo",
    },
    {
      field: "Anio",
      headerName: "Anio",
      width: 60,
      description: "Año",
    },
    {
      field: "Mes",
      headerName: "Mes",
      width: 90,
      description: "Mes",
    },
    {
      field: "Total",
      headerName: "Total",
      width: 200,
      description: "Total",
      ...Moneda,
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

  }, [params.fondo]);

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
            <h1>{nombreMenu}</h1>
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
              mes={mes}
                        />
            : ""}

<<<<<<< Updated upstream




=======
>>>>>>> Stashed changes
      {step === 0 ?
        <div style={{ height: 600, width: "100%" }}>
          <ButtonsCalculo handleOpen={handleOpen} agregar={agregar} />
          <MUIXDataGrid columns={columns} rows={data} />
        </div>
       : ""}

  
      {step === 1 ?
          <ModalNew
            clave={objfondo?.Clave || ""}
            titulo={objfondo?.Descripcion || ""}
            onClickBack={handleClose }
            />
       : ""}

     {step === 2 ?
          <ModalAjuste
            idCalculo={idDetalle}
            clave={objfondo?.Clave || ""}
            titulo={objfondo?.Descripcion || ""}
            onClickBack={handleClose }
            />
       : ""}



    </>
  );
};
