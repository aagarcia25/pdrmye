

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  LinearProgress,
  SelectChangeEvent,
  MenuItem,
  IconButton,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { currencyFormatter, CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { ArticulosServices } from "../../../../../services/ArticulosServices";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";
import { Titulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import { BtnRegresar } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import { SubTitulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
import { FormTextField } from "../../catalogos/Utilerias/AgregarCalculoUtil/FormTextField";
import { FormSelectedField } from "../../catalogos/Utilerias/AgregarCalculoUtil/FormSelectField";
import { BtnCalcular } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnCalcular";
import { calculosServices } from "../../../../../services/calculosServices";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Imeses from "../../../../../interfaces/filtros/meses";

export const Fpg = () => {


  const user = getUser();

  const navigate = useNavigate();

  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);
  const [periodo, setPeriodo] = useState("1");
  const [mes, setMes] = useState("1");

  const [fondo, setFondo] = useState("FGP");
  const [meses, setMeses] = useState<Imeses[]>();
  const periodoData = [
    {
      id: 1,
      valor: "MENSUAL",
    },
    {
      id: 2,
      valor: "AJUSTE",
    },
    {
      id: 3,
      valor: "1er AJUSTE CUATRIMESTRAL",
    },
    {
      id: 4,
      valor: "2do AJUSTE CUATRIMESTRAL",
    },
    {
      id: 5,
      valor: "3er AJUSTE CUATRIMESTRAL",
    },
    {
      id: 6,
      valor: "AJUSTE DEFINITIVO",
    },
    {
      id: 7,
      valor: "COMPENSACIONES FEIEF",
    },
    {
      id: 8,
      valor: "RETENCIONES FEIEF",
    },
  ];

  const mesesc = () => {
    let data = {};
    CatalogosServices.meses(data).then((res) => {
      setMeses(res.RESPONSE);
    });
  };
  const periodoMenuItems = periodoData.map((item) => (
    <MenuItem value={item.id}>{item.valor}</MenuItem>
  ));

  const mesData = [
    {
      id: 1,
      valor: "ENERO",
    },
    {
      id: 2,
      valor: "FEBREEO",
    },
    {
      id: 3,
      valor: "MARZO",
    },
    {
      id: 4,
      valor: "ABRIL",
    },
    {
      id: 5,
      valor: "MAYO",
    },
    {
      id: 6,
      valor: "JUNIO",
    },
    {
      id: 7,
      valor: "JULIO",
    },
    {
      id: 8,
      valor: "AGOSTO",
    },
    {
      id: 9,
      valor: "SEPTIEMBRE",
    },
    {
      id: 10,
      valor: "OCTUBRE",
    },
    {
      id: 11,
      valor: "NOVIEMBRE",
    },
    {
      id: 12,
      valor: "DICIEMBRE",
    },
  ];

  const mesMenuItems = mesData.map((item) => (
    <MenuItem value={item.id}>{item.valor}</MenuItem>
  ));

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
    console.log(v)
    navigate(`/inicio/participaciones/fpgd/${v.row.id}`)
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
   consulta({FONDO: fondo})
  }, []);


  
  const Details = () => {
    return (
      <Grid container spacing={3}>
        <Titulo name="Fondo Fomento Municipal 30%"></Titulo>
        <BtnRegresar onClick={handleClose} />
        <SubTitulo />
        <FormTextField id={1} text="Año" inputPlaceholder="2022" />
        <FormControl variant="standard" fullWidth>
            <InputLabel>Mes</InputLabel>
            <Select
              required
              onChange={(v) => setMes(v.target.value)}
              value={mes}
              label="Mes"
              // inputProps={{
              //   readOnly: tipo == 1 ? false : true,
              // }}
            >
              {meses?.map((item: Imeses) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.Descripcion}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

        <FormTextField id={2} text="Monto" inputPlaceholder="1,200,199" />
        <FormSelectedField
          id={2}
          text="Periodo"
          value={periodo}
          onChange={handleChange}
          items={periodoMenuItems}
        />
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
          <Details />
        </div>
      </Box>
    </>
  );
};


