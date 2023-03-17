import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ConfiguracionRoles from "./ConfiguracionRoles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import RolesModal from "./RolesModal";
import EditIcon from "@mui/icons-material/Edit";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import Swal from "sweetalert2";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; 
import { AlertS } from "../../../../../helpers/AlertS";

const Roles = () => {
  const [data, setData] = useState([]);
  const [dt, setDt] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRolesConf, setOpenRolesconf] = useState(false);
  const [id, setId] = useState("");
  const [nameRol, setNameRol] = useState("");
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminarP, setEliminarP] = useState<boolean>(false);

  const handleClose = (v: string) => {
    setOpen(false);
    setOpenRolesconf(false);

    {
      if (v === "saved") consulta({ NUMOPERACION: 4 });
    }
  };

  const eliminar = (v: any) => {
    let data = {
      NUMOPERACION: 3,
      CHUSER: user.id,
      CHID: String(v.row.id),
    };
    Swal.fire({
      icon: "error",
      title: "Borrar El Rol",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        AuthService.rolesindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Rol Eliminado!",
            });
            consulta({ NUMOPERACION: 4 });
          } else {
            AlertS.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      }
    });
  };

  const handleView = (v: any) => {
    setId(v.id);
    setNameRol(v.row.Nombre)
    setOpen(true);
  };
  const handleOpen = () => {
    setTipoOperacion(1);
    setModo("Agregar Rol");
    setOpenRolesconf(true);
  };

  const handleEditarRegistro = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Rol");
    setOpenRolesconf(true);
    setDt(v);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title={"Ver y Eliminar menus de el Rol"}>
              <IconButton onClick={() => handleView(v)}>
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>

             {editar ? (
              <Tooltip title={"Editar  Descripción del Rol"}>
                <IconButton onClick={() => handleEditarRegistro(v)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {eliminarP ? (
              <Tooltip title={"Eliminar Rol"}>
                <IconButton onClick={() => eliminar(v)}>
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
    {field: "FechaCreacion",  headerName: "Fecha Creación",  description:"Fecha Creación",  width: 200,},
    {field: "CreadoPor",      headerName: "Creado Por",      description:"Creado por",      width: 250,},
    {field: "Nombre",         headerName: "Rol",             description:"Rol",             width: 250,},
    { field: "Descripcion",   headerName: "Descripción",     description:"Descripción",     width: 450 },
   
  ];

  const consulta = (data: any) => {
    AuthService.rolesindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "ROLUSER") {
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminarP(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%", padding: "1%" }}>

      {open ? (
        <ConfiguracionRoles handleClose={handleClose} idRol={id} NameRol={nameRol} open={false}></ConfiguracionRoles>
      ) : (
        ""
      )}
      {openRolesConf ? (
        <RolesModal
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={dt} openRoles={false}        />
      ) : (
        ""
      )}
            <Grid container >
            <Grid item container sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
              <Typography variant="h4">
                Roles
              </Typography>
            </Grid>
            </Grid>

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  );
};

export default Roles;
