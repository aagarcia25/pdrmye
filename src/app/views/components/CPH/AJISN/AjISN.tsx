import AutoModeIcon from "@mui/icons-material/AutoMode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import { PERMISO } from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getPermisos } from "../../../../services/localStorage";
import { Moneda } from "../../menu/CustomToolbar";
import MUIXDataGrid from "../../MUIXDataGrid";
import Slider from "../../Slider";
import { USUARIORESPONSE } from "../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../services/localStorage";
import { AjSemestralDetail } from "../AJSEMESTRAL/AjSemestralDetail";
import { AjISNModal } from "../AJISN/AjISNModal";

import { GridColDef } from "@mui/x-data-grid";
import { messages } from "../../../styles";

import { CleaningServices } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const AjISN = () => {
  
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const [slideropen, setslideropen] = useState(false);
  //MODAL
  //Constantes para las columnas
  const [vrows, setVrows] = useState<{}>("");
  const [data, setData] = useState([]);
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [agregar, setagregar] = useState(false);
  const [eliminar, setEliminar] = useState(false);

  const navigate = useNavigate();


  const handleclose = () => {
    handleClick();
    setOpenModal(false);
    setOpenDetail(false);
  };

  const handleDetalle = (params: any) => {
    const row = params.row;
    navigate(`/inicio/articulos/AISN/AjISNDetalle/${row.anio}`);
  };

  const columnsParticipaciones: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    {
      disableExport: true,
      field: "acciones",
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Ver Detalle">
              <IconButton onClick={() => handleDetalle(v)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>

          </Box>
        );
      },
    },
    { field: "fecha_creacion", headerName: "Fecha Creación", width: 180 },
    { field: "creadoPor", headerName: "Creado Por",  width: 250, description: messages.dataTableColum.creadoPor,},
    { field: "anio", headerName: "Año", width: 120 },
    
  ];

  const handleVersion = () => {
    setOpenModal(true);
  };

  const handleClick = () => {
    setslideropen(true);
    let data = {
      NUMOPERACION: 2,
      
    };
    calculosServices.AjusteISNIndex(data).then((res) => {
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

  useEffect(() => {
    handleClick();

    permisos.map((item: PERMISO) => {
      if (String(item.menu) == "AJUSTESEMESTRAL") {
        if (String(item.ControlInterno) == "AGREGAR") {
          setagregar(true);
        }
        if (String(item.ControlInterno) == "ELIMINAR") {
          setEliminar(true);
        }
      }
    });
  }, []);

  return (
    <>
      <Slider open={slideropen}></Slider>
      {openModal ? <AjISNModal handleClose={handleclose} /> : ""}

      {openDetail ? (
        <AjSemestralDetail handleClose={handleclose} row={vrows} />
      ) : (
        ""
      )}

      <div>
        <Grid container spacing={1} padding={2}>
          <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid className="Titulo" container item xs={12}>
                <Typography variant="h4" paddingBottom={2}>
                  Ajuste ISN
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {agregar ? (
            <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
              <Tooltip title="Generar">
                <ToggleButton
                  className="enviar-mensaje"
                  value="check"
                  onClick={() => handleVersion()}
                >
                  <AutoModeIcon />
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          ) : (
            ""
          )}

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MUIXDataGrid columns={columnsParticipaciones} rows={data} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
