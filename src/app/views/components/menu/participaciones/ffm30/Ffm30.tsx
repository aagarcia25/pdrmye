import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  LinearProgress,
  SelectChangeEvent,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { currencyFormatter, CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { ArticulosServices } from "../../../../../services/ArticulosServices";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";
import { BtnCalcular } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnCalcular";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { calculosServices } from "../../../../../services/calculosServices";
import { useNavigate } from "react-router-dom";
import Imeses from "../../../../../interfaces/filtros/meses";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import InfoIcon from '@mui/icons-material/Info';

export const Ffm30 = () => {
  
  const user = getUser();

  const navigate = useNavigate();

  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);
  const [periodo, setPeriodo] = useState("1");
  const [mes, setMes] = useState("1");

  const [fondo, setFondo] = useState("FFM30");
  const [meses, setMeses] = useState<Imeses[]>();

  const mesesc = () => {
    let data = {};
    CatalogosServices.meses(data).then((res) => {
      setMeses(res.RESPONSE);
    });
  };

  const handleOpen = (v: any) => {
    setstep(1);
  };

  const handleClose = (v: any) => {
    setstep(0);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPeriodo(event.target.value);
  };

  const handleChangeMes = (event: SelectChangeEvent) => {
    setMes(event.target.value);
  };

  const handleEdit = (v: any) => {
    console.log(v);
    navigate(`/inicio/participaciones/ffm30d/${v.row.id}`);
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
      ...currencyFormatter
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Ver detalle de Cálculo">
            <IconButton onClick={() => handleEdit(v)}>
              <InfoIcon />
            </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

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

  useEffect(() => {
    mesesc();
    consulta({ FONDO: fondo });
    
  }, []);

  const AgregarCalculo = () => {
    return (
      <Grid container spacing={3}>
        <BtnCalcular onClick={handleClose} />
      </Grid>
    );
  };

  return (
    <>
    <Box sx={{ display: step == 0 ? "block" : "none" }}>
      <div style={{ height: 600, width: "100%" }}>
        <ButtonsCalculo handleOpen={handleOpen} />
        <DataGrid
          //checkboxSelection
          pagination
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{
            Toolbar: CustomToolbar,
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          rows={data}
          columns={columns}
        />
      </div>
    </Box>
    <Box sx={{ display: step == 1 ? "block" : "none" }}>
      <div style={{ height: 600, width: "100%" }}>
        <AgregarCalculo />
      </div>
    </Box>
  </>
  );
};
