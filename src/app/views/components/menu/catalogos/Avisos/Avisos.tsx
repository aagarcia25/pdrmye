import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import {
  PERMISO,
  USUARIORESPONSE,
} from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import MUIXDataGrid from "../../../MUIXDataGrid";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import AvisosModal from "./AvisosModal";

export const Avisos = () => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [conAvisos, setAvisos] = useState([]);
  const [open, setOpen] = useState(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const columns: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <BotonesAcciones
            handleAccion={handleAccion}
            row={v}
            editar={editar}
            eliminar={eliminar}
          ></BotonesAcciones>
        );
      },
    },
    {
      field: "Documento",
      headerName: "Documento",
      description: "Documento",
      width: 100,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Visualizar">
              <IconButton onClick={() => handleVisualizar(v)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "fechaInicio",
      headerName: "Fecha",
      description: "Fecha",
      width: 200,
    },
    {
      field: "FechaFin",
      headerName: "Expiración",
      description: "Expiración",
      width: 200,
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      description: "Nombre",
      width: 250,
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      description: "Descripción",
      width: 500,
    },
    {
      field: "NombreDocumento",
      headerName: "Documento",
      description: "Documento",
      hide: true,
      width: 150,
    },
  ];

  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo == 2) {
      handleBorrar(v.data);
    }
  };

  const handleBorrar = (v: any) => {
    Swal.fire({
      icon: "question",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: String(user.Id),
        };

        CatalogosServices.avisos(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });

            let data = {
              NUMOPERACION: 4,
            };
            consulta(data);
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Aviso");
    setOpen(true);
    //setData(v);
  };
  const handleVisualizar = (v: any) => {
    setTipoOperacion(2);
    setModo("Aviso");
    setOpen(true);
    setData(v);
  };

  const handleClose = (v: string) => {
    if (v == "save") {
      let data = {
        NUMOPERACION: 4,
        CHUSER: String(user.Id),
      };
      consulta(data);
    }

    setOpen(false);
  };

  const consulta = (data: any) => {
    CatalogosServices.avisos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setAvisos(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  let dat = {
    NUMOPERACION: 4,
    CHUSER: String(user.Id),
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.menu) == "AVISOS") {
        if (String(item.ControlInterno) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) == "EDIT") {
          setEditar(true);
        }
      }
    });
    CatalogosServices.avisos(dat).then((res) => {
      setAvisos(res.RESPONSE);
    });
  }, []);

  return (
    <>
      {open ? (
        <AvisosModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}

      <div
        style={{
          height: 600,
          width: "100%",
          paddingTop: "2%",
          paddingLeft: "1%",
          paddingRight: "1%",
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item md={12} textAlign="center">
            <Typography variant="h3">{"Avisos"}</Typography>
          </Grid>
        </Grid>

        <Box></Box>
        <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        <MUIXDataGrid columns={columns} rows={conAvisos} />
      </div>
    </>
  );
};
