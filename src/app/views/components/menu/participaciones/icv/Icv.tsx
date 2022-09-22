import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Input, LinearProgress, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { currencyFormatter, CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import Imeses from "../../../../../interfaces/filtros/meses";
import { calculosServices } from "../../../../../services/calculosServices";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { BtnCalcular } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnCalcular";
import ButtonsCalculo from "../../catalogos/Utilerias/ButtonsCalculo";
import { Titulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import { SubTitulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
import { AnioReadOnly } from "../../catalogos/Utilerias/AgregarCalculoUtil/AnioReadOnly";
import SelectMes from "../Utilerias/SelectMes";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { BtnRegresar } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import ModalIcv from "./ModalIcv";

export const Icv = () => {

  const user = getUser();

  const navigate = useNavigate();

  const [data, setdata] = useState([]);
  const [step, setstep] = useState(0);

  const [fondo, setFondo] = useState("ICV");
  const [nombreFondo, setNombreFondo] = useState("ICV");

  const [meses, setMeses] = useState<Imeses[]>();


  
  const handleOpen = (v: any) => {
    setstep(1);
  };

  const handleClose = (v: any) => {
    setstep(0);
  };

  

  const handleView = (v: any) => {
    navigate(`/inicio/participaciones/icvd/${v.row.id}`);
  };

  const onClickBtnCalculator = () => {};

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
            <IconButton onClick={() => handleView(v)}>
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
    consulta({ FONDO: fondo });
    
  }, []);
     



 
  return (
    <>
      <Box sx={{ display: step == 0 ? "block" : "none" }}>
        <div style={{ height: 600, width: "100%" }}>
          <ButtonsCalculo handleOpen={handleOpen} />
          <DataGrid
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
        <ModalIcv titulo={nombreFondo} onClickBack={handleClose} />
        </div>
      </Box>
    </>
  );
};

