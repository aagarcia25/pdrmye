import AutoModeIcon from "@mui/icons-material/AutoMode";
import {
  createTheme,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  esES as gridEsES, GridSelectionModel
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import { PERMISO, RESPONSE } from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getPermisos, getUser } from "../../../../services/localStorage";
import { Moneda } from "../../menu/CustomToolbar";
import MUIXDataGridGeneral from "../../MUIXDataGridGeneral";
import Slider from "../../Slider";

export const AjSemestralDetail = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(false);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  //MODAL
  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  ///// Modal de Administración de Speis
  const [openModal, setOpenModal] = useState(false);


  const handleclose = (data: any) => {
    handleClick();
    setOpenModal(false);
  };


  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "anio", headerName: "Año", width: 100,
    },
    {
      field: "Descripcion",
      headerName: "Fondo",
      width: 300,
      description: "Fondo",
    },
    {
      field: "distribuido",
      headerName: "Importe Distribuido",
      width: 200,
      description: "Importe Distribuido",
      ...Moneda,
    },
    {
      field: "distribucionactualizada",
      headerName: "Distribución Actualizada",
      width: 200,
      description: "Importe Distribuido",
      ...Moneda,
    },
    
  ];

  
  const handleVersion = () => {
    setOpenModal(true);
  };

 
  const handleClick = () => {
    setslideropen(true);
    let data = {
      NUMOPERACION: 2,
    };
    calculosServices.AjusteSemestralIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        setslideropen(false);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        setslideropen(false);
      }
    });
  };
  
  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  useEffect(() => {
    handleClick();

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "AJUSTESEMESTRAL") {
        if (String(item.Referencia) === "TRAZASPEIDAF") {
        }
        if (String(item.Referencia) === "POLIZASPEIDAF") {
        }
      }
    });
  }, []);

  return (
    <>
      <Slider open={slideropen}></Slider>

      <div>
        <Grid container spacing={1} padding={2}>
          <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid className="Titulo" container item xs={12} >
                <Typography variant="h4" paddingBottom={2}>
                 Ajuste Semestral
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MUIXDataGridGeneral
              modulo={"DistribucionDaf"}
              handleBorrar={handleBorrar} columns={columnsParticipaciones} rows={data} controlInterno={"AJUSTESEMESTRAL"} multiselect={true} />
          </Grid>
        </Grid>
      </div>

    
     
    </>
  );
};

