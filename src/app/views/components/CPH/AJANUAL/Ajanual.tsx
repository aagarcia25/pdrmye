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
import MUIXDataGrid from "../../MUIXDataGrid";
import Slider from "../../Slider";
import { Moneda } from "../../menu/CustomToolbar";
import { ADetail } from "./ADetail";
import { AjanualModal } from "./AjanualModal";

export const Ajanual = () => {
  const [slideropen, setslideropen] = useState(false);
  //MODAL
  //Constantes para las columnas
  const [vrows, setVrows] = useState<{}>("");
  const [data, setData] = useState([]);
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  ///// Modal de Administración de Speis
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [agregar, setagregar] = useState(false);
  const [eliminar, setEliminar] = useState(false);

  const handleclose = (data: any) => {
    handleClick();
    setOpenModal(false);
    setOpenDetail(false);
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenDetail(true);
  };

  const handleDeleted = (v: any) => {
    Swal.fire({
      icon: "error",
      title: "Eliminación",
      text: "El Movimiento Seleccionado se Eliminará",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 4,
          P_IDANIO: v.row.anio,
          P_FONDO: v.row.id,
        };

        calculosServices.AjusteAnualIndex(data).then((res) => {
          if (res.SUCCESS) {
            AlertS.fire({
              title: res.RESPONSE,
              icon: "success",
            }).then(async (result) => {
              if (result.isConfirmed) {
                handleClick();
              }
            });
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      }
    });
  };

  const columnsParticipaciones = [
    { field: "id", hide: true },
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

            {eliminar ? (
              <Tooltip title={"Eliminar Registro"}>
                <IconButton color="inherit" onClick={() => handleDeleted(v)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    {
      field: "anio",
      headerName: "Año",
      width: 100,
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
    calculosServices.AjusteAnualIndex(data).then((res) => {
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
      if (String(item.ControlInterno) === "AJUSTESEMESTRAL") {
        if (String(item.Referencia) === "AGREGAR") {
          setagregar(true);
        }
        if (String(item.Referencia) === "ELIMINAR") {
          setEliminar(true);
        }
      }
    });
  }, []);

  return (
    <>
      {openModal ? <AjanualModal handleClose={handleclose} /> : ""}
      {openDetail ? <ADetail handleClose={handleclose} row={vrows} /> : ""}

      <Grid container spacing={1} padding={2}>
        <Slider open={slideropen}></Slider>
        <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid className="Titulo" container item xs={12}>
              <Typography variant="h4" paddingBottom={2}>
                Ajuste Anual
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
    </>
  );
};
