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
import InsightsIcon from '@mui/icons-material/Insights';

import MUIXDataGrid from "../../MUIXDataGrid";
import { fondoinfo } from "../../../../interfaces/calculos/fondoinfo";
import Trazabilidad from "../../Trazabilidad";
import ModalFondo from "../aportaciones/ModalFondo";



export const Fondo = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const [fondo, setFondo] = useState("");
  const [nombreFondo, setNombreFondo] = useState("");
  const [modo, setModo] = useState<string>("");
  const [anio, setAnio] = useState<number>(0);
  const [mes, setMes] = useState<string>("");

 

  const closeTraz = (v: any) => {
    setOpenTrazabilidad(false);
  };
  const handleTraz = (v: any) => {
    setOpenTrazabilidad(true);
  };
  const handleOpen = (v: any) => {
    setModo("calculo");
    setstep(1);
  };
  const handleClose = (v: any) => {
    setstep(0);
  };
  const handleAjuste = (v: any) => {     
    setModo("ajuste");
    setAnio(Number(v.row.Anio));
    setMes(v.row.Mes);
    setstep(1); 
  };

  const handleView = (v: any) => {
    navigate(`/inicio/aportaciones/${fondo}/${v.row.id}`);
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
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (

          <Box>
            <Tooltip title="Ver detalle de Cálculo">
              <IconButton onClick={() => handleView(v)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Agregar Ajuste">
              <IconButton 
              onClick={() => handleAjuste(v)}
              disabled ={(String(v.row.Clave)=="FISM"||String(v.row.Clave)=="FORTAMUN")}
              
              >
                <AttachMoneyIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Ver Trazabilidad">
              <IconButton onClick={() => handleTraz(v)}>
                <InsightsIcon />
              </IconButton>
            </Tooltip>



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
    consultafondo({ FONDO: params.fondo });
    consulta({ FONDO: params.fondo });

  }, [params.fondo]);



  return (
    <>
      {openTrazabilidad ? (
        <Trazabilidad
          open={openTrazabilidad}
          handleClose={closeTraz}
        ></Trazabilidad>
      ) : (
        ""
      )}

      <Box sx={{ display: step == 0 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <ButtonsCalculo handleOpen={handleOpen} />
          <MUIXDataGrid columns={columns} rows={data} />
        </div>
      </Box>
      <Box sx={{ display: step == 1 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <ModalFondo titulo={nombreFondo} onClickBack={handleClose} modo={modo} anio={anio} mes={mes}/>
        </div>
      </Box>
    </>
  );
};
