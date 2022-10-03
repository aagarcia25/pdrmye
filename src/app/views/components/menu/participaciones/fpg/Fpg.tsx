import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { Box,  IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Moneda } from "../../CustomToolbar";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";
import { calculosServices } from "../../../../../services/calculosServices";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from '@mui/icons-material/Insights';
import ModalFgp from "./ModalFgp";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { fondoinfo } from "../../../../../interfaces/calculos/fondoinfo";


export const Fpg = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);

  const [fondo, setFondo] = useState("");
  const [nombreFondo, setNombreFondo] = useState("");


  const handleOpen = (v: any) => {
    setstep(1);
  };

  const handleClose = (v: any) => {
    setstep(0);
  };

  const handleView = (v: any) => {
    navigate(`/inicio/participaciones/${fondo}/${v.row.id}`);
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
      width: 150,
      description: "Año",
    },
    {
      field: "Mes",
      headerName: "Mes",
      width: 200,
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
              <IconButton onClick={() => handleView(v)}>
                <AttachMoneyIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Ver Trazabilidad">
              <IconButton onClick={() => handleView(v)}>
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
        const obj : fondoinfo[] = res.RESPONSE;
       
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
   
  }, []);



  return (
    <>
      <Box sx={{ display: step == 0 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <ButtonsCalculo handleOpen={handleOpen} />
          <MUIXDataGrid columns={columns} rows={data} />
        </div>
      </Box>
      <Box sx={{ display: step == 1 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <ModalFgp titulo={nombreFondo} onClickBack={handleClose} />
        </div>
      </Box>
    </>
  );
};
