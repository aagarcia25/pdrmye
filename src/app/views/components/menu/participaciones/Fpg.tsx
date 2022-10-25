import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Moneda } from "../CustomToolbar";
import ButtonsCalculo from "../catalogos/Utilerias/ButtonsCalculo";
import { calculosServices } from "../../../../services/calculosServices";
import { Toast } from "../../../../helpers/Toast";
import { Alert } from "../../../../helpers/Alert";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import ModalFgp from "./ModalFgp";
import MUIXDataGrid from "../../MUIXDataGrid";
import { fondoinfo } from "../../../../interfaces/calculos/fondoinfo";
import Trazabilidad from "../../Trazabilidad";
import Slider from "../../Slider";
import DetalleFgp from "./DetalleFgp";
import { PERMISO } from "../../../../interfaces/user/UserInfo";
import { getPermisos } from "../../../../services/localStorage";

export const Fpg = () => {
  const [slideropen, setslideropen] = useState(false);
  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [fondo, setFondo] = useState("");
  const [modo, setModo] = useState<string>("");
  const [anio, setAnio] = useState<number>(0);
  const [mes, setMes] = useState<string>("");
  const [idtrazabilidad, setIdtrazabilidad] = useState("");
  const [openDetalles, setOpenDetalles] = useState(false);
  const [clave, setClave] = useState("");
  const [agregar, setAgregar] = useState<boolean>(false);
  const [agregarajuste, setAgregarAjuste] = useState<boolean>(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [nombreFondo, setNombreFondo] = useState("");
  const [idDetalle, setIdDetalle] = useState("");
 


  const closeTraz = (v: any) => {
    setOpenTrazabilidad(false);
  };
  const handleTraz = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setOpenTrazabilidad(true);
  };


  const handleOpen = (v: any) => {
    setModo("calculo");
    setstep(1);
  };

  const handleClose = (v: any) => {
    consulta({ FONDO: fondo });
    setstep(0);
    setOpenDetalles(false);
  };

  const handleAjuste = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setModo("ajuste");
    setAnio(Number(v.row.Anio));
    setMes(v.row.Mes);
    setstep(1);
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


            {agregarajuste &&  String(v.row.estatus) == "INICIO" ? (
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
          </Box>
        );
      },
    },
  ];

  const consultafondo = (data: any) => {
    calculosServices.fondoInfo(data).then((res) => {
      if (res.SUCCESS) {
        const obj: fondoinfo[] = res.RESPONSE;
        setFondo(obj[0].Clave);
        setNombreFondo(obj[0].Descripcion);
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
        Alert.fire({
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
   
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === String(params.fondo)) {
        if (String(item.Referencia) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) == "TRAZA") {
          setVerTrazabilidad(true);
        }
        if (String(item.Referencia) == "AAJUSTE") {
          setAgregarAjuste(true);
        }
      }else{
        setAgregar(false);
        setVerTrazabilidad(false);
        setAgregarAjuste(false);
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
  


    
    



      <Box sx={{ display: step == 0 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <ButtonsCalculo handleOpen={handleOpen} agregar={agregar} />
          <MUIXDataGrid columns={columns} rows={data} />
        </div>
      </Box>
      <Box sx={{ display: step == 1 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <ModalFgp
            step={step}
            clave={fondo}
            titulo={nombreFondo}
            onClickBack={handleClose}
            modo={modo}
            anio={anio}
            mes={mes} 
            idCalculo={idtrazabilidad}  
            />

          {openDetalles ?
            <DetalleFgp
              idCalculo={idtrazabilidad}  
              openDetalles={openDetalles}
              nombreFondo={nombreFondo}
              idDetalle={idDetalle}
              handleClose={handleClose}
              clave={clave}
              anio={anio}
              mes={mes}
                        />
            : ""}
        </div>
      </Box>
    </>
  );
};
