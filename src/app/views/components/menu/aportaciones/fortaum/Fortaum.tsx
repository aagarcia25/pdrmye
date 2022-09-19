import React, { useEffect, useState } from "react";
import { Box, Grid, LinearProgress } from "@mui/material";
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

const Fortaum = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [slideropen, setslideropen] = useState(false);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);

  const [fondo, setFondo] = useState("FORTAMUN");
  const [step, setstep] = useState(0);



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

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    {
      field: "ClaveEstado",
      headerName: "ClaveEstado",
      width: 150,
      description: "Clave de Estado",
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      width: 300,
      description: "Municipio",
    },

    {
      field: "anio",
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
  ];

  useEffect(() => {
    consulta({ FONDO: fondo });
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
