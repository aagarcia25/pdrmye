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
import MUIXDataGrid from "../../MUIXDataGrid";
import { fondoinfo } from "../../../../interfaces/calculos/fondoinfo";
import Trazabilidad from "../../Trazabilidad";
import ModalFondo from "../aportaciones/ModalFondo";
import DetalleFondo from "./DetalleFondo";
import { PERMISO } from "../../../../interfaces/user/UserInfo";
import { getPermisos } from "../../../../services/localStorage";

export const Fondo = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const [openDetalles, setOpenDetalles] = useState(false);
  const [agregar, setAgregar] = useState<boolean>(false);
  const [agregarajuste, setAgregarAjuste] = useState<boolean>(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));

  const [fondo, setFondo] = useState("");
  const [clave, setClave] = useState("");
  const [estatus, setEstatus] = useState("");
  const [nombreFondo, setNombreFondo] = useState("");
  const [modo, setModo] = useState<string>("");
  const [anio, setAnio] = useState<number>(0);
  const [mes, setMes] = useState<string>("");
  const [idtrazabilidad, setIdtrazabilidad] = useState("");
  const [idDetalle, setIdDetalle] = useState("");




  const closeTraz = (v: any) => {
    setOpenTrazabilidad(false);
  };
  const handleTraz = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setOpenTrazabilidad(true);
  }
    const handleTras = (v: string) => {
      setIdtrazabilidad(v);
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
    setOpenTrazabilidad(false);

  };
  const handleDetalle = (v: any) => {    
 
 
    setClave(v.row.Clave)
    setIdDetalle(String(v.row.id));
    setMes(v.row.Mes);
    setstep(2);
    setOpenDetalles(true);
    setAnio(Number(v.row.Anio));
    setEstatus(v.row.estatus);


  };

  const handleAjuste = (v: any) => {
    setModo("ajuste");
    setAnio(Number(v.row.Anio));
    setMes(v.row.Mes);
    setstep(1);
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
      width: 450,
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
            {agregarajuste ? (
            <Tooltip title="Agregar Ajuste">
              <IconButton
                onClick={() => handleAjuste(v)}
                disabled={
                  String(v.row.Clave) == "FISM" ||
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
    calculosServices.calculosInfo(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setdata(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  let params = useParams();

  useEffect(() => {
    console.log(permisos);
    console.log(params.fondo);
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
      }
    });



    consultafondo({ FONDO: params.fondo });
    consulta({ FONDO: params.fondo });

   
  }, [params.fondo]);

  return (
    <>
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
          <ModalFondo
            titulo={nombreFondo}
            onClickBack={handleClose}
            modo={modo}
            anio={anio}
            mes={mes}
            clave={fondo}
          />
        </div>
      </Box>

      {openDetalles ?
        <DetalleFondo
          openDetalles={openDetalles}
          nombreFondo={nombreFondo}
          idDetalle={idDetalle}
          handleClose={handleClose}
          handleTras={handleTras}
          clave={clave}
          anio={anio}
          mes={mes}
          fondo={fondo}
           estatus={estatus}        />
        : ""}

    </>
  );
};
