import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MUIXDataGrid from "../../../MUIXDataGrid";
import RolesMenu from "./RolesMenu";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import RolesModal from "./RolesModal";
import AsignarMenuRol from "./AsignarMenuRol";
import EditIcon from "@mui/icons-material/Edit";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import Swal from "sweetalert2";

const Roles = () => {
  const [data, setData] = useState([]);
  const [dt, setDt] = useState([]);
  const [openRel, setOpenRel] = useState(false);
  const [open, setOpen] = useState(false);
  const [openRolesModalAdd, setOpenRolesModalAdd] = useState(false);
  const [id, setId] = useState("");
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: RESPONSE = JSON.parse(String(getUser()));

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminarP, setEliminarP] = useState<boolean>(false);

  const handleClose = (v: string) => {
    setOpen(false);
    setOpenRel(false);
    setOpenRolesModalAdd(false);

    {
      if (v === "saved") consulta({ NUMOPERACION: 4 });
    }
  };

  const handleRel = (v: any) => {
    setId(v.row.id);
    setOpenRel(true);
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
    setOpen(true);
  };
  const handleOpen = () => {
    setTipoOperacion(1);
    setModo("Agregar Rol");
    setOpenRolesModalAdd(true);
  };

  const handleEditarRegistro = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Rol");
    setOpenRolesModalAdd(true);
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
      field: "Nombre",
      headerName: "Rol",
      width: 250,
    },
    { field: "Descripcion", headerName: "Descripcion", width: 450 },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title={"Ver y Eliminar menus de el Rol"}>
              <IconButton onClick={() => handleView(v)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={"Ver opciones de menu dsiponibles y asignarlas al Rol"}
            >
              <IconButton onClick={() => handleRel(v)}>
                <AccountTreeIcon />
              </IconButton>
            </Tooltip>

            {editar ? (
              <Tooltip title={"Editar Descripcion del Rol"}>
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
  ];

  const consulta = (data: any) => {
    AuthService.rolesindex(data).then((res) => {
      console.log(res);
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
        if (String(item.Referencia) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) == "ELIM") {
          setEliminarP(true);
        }
        if (String(item.Referencia) == "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div>
      {openRel ? (
        <AsignarMenuRol
          open={openRel}
          handleClose={handleClose}
          id={id}
        ></AsignarMenuRol>
      ) : (
        ""
      )}
      {open ? (
        <RolesMenu open={open} handleClose={handleClose} id={id}></RolesMenu>
      ) : (
        ""
      )}
      {openRolesModalAdd ? (
        <RolesModal
          open={openRolesModalAdd}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={dt}
        />
      ) : (
        ""
      )}

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  );
};

export default Roles;
