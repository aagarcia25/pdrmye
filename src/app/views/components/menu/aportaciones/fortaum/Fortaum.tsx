import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { currencyFormatter, CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { calculosServices } from "../../../../../services/calculosServices";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";
import { BtnCalcular } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnCalcular";
import InfoIcon from "@mui/icons-material/Info";
import { CatalogosServices } from "../../../../../services/catalogosServices";

const Fortaum = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [slideropen, setslideropen] = useState(false);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);

  const [fondo, setFondo] = useState("FORTAMUN");
  const [idfondo,setIdFondo] = useState("");
  const [step, setstep] = useState(0);

  const handleEdit = (v: any) => {
    console.log(v);
    navigate(`/inicio/aportaciones/fortaum/${v.row.id}`);
  };

  const consulta = (data: any) => {
    calculosServices.calculosInfodetalle(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const getidfondo = () => {
    let data = {
      NUMOPERACION: 5,
      CLAVE: fondo,
    };
    CatalogosServices.fondos(data).then((res) => {
      setIdFondo(res.RESPONSE.id);
    });
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
      headerName: "Año",
      width: 300,
      description: "Año",
    },

    {
      field: "Total",
      headerName: "Total",
      width: 200,
      description: "Total",
      ...currencyFormatter,
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

  useEffect(() => {
    consulta({ FONDO: fondo });
    getidfondo();
  }, []);

  const handleOpen = (v: any) => {
    setstep(1);
  };

  const handleClose = (v: any) => {
    setstep(0);
  };

  const AgregarCalculo = () => {
    return (
      <Grid container spacing={3}>
        <BtnCalcular onClick={handleClose} />
      </Grid>
    );
  };

  return (
    <div>
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
    </div>
  );
};

export default Fortaum;
