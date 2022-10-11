import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect,  useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { messages } from "../../../../styles";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import MUIXDataGrid from "../../../MUIXDataGrid";
import RolesMenu from "./RolesMenu";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import RolesModal from "./RolesModal";
import RolesAsignaPermisos from "./RolesAsignarPermisos";
import EditIcon from '@mui/icons-material/Edit';
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";

const Roles = () => {
  const [data, setData] = useState([]);
  const [dt, setDt] = useState([]);
  const [openRel, setOpenRel] = useState(false);
  const [open, setOpen] = useState(false);
  const [openRolesModalAdd, setOpenRolesModalAdd] = useState(false);
  const [openAsignaRol, setOpenAsignaRol] = useState(false);
  const [id, setId] = useState("");
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleClose = (v: string) => {
    setOpen(false);
    setOpenRolesModalAdd(false);
    setOpenRel(false);
    {
      if (v === "saved")
        consulta({ NUMOPERACION: 4 });
    }
  };

  const handleRel = (v: any) => {
    setId(v.row.id);
    setOpenRel(true);

  };
  const handleTeste = (v: any) => {
    console.log(v.row);

  };
  const eliminar = (v: any) => {

    let data = {
      NUMOPERACION: 3,
      CHUSER: user.id,
      CHID: String(v.row.id),



    };
    AuthService.rolesindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Rol Eliminado!",
        });
        consulta({ NUMOPERACION: 4 });
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleView = (v: any) => {
    setId(v.id);
    setOpen(true);

  };
  const handleNuevoRegistro = () => {
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
      description: messages.dataTableColum.id,
    },
    {
      field: "Nombre",
      headerName: "Rol",
      width: 150,
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
            <Tooltip title={"Ver Menús Relaciados al Rol"}>
              <IconButton onClick={() => handleView(v)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Relacionar Menú"}>
              <IconButton onClick={() => handleRel(v)}>
                <AccountTreeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Editar Menú"}>
              <IconButton onClick={() => handleEditarRegistro(v)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Relacionar Menú"}>
              <IconButton onClick={() => eliminar(v)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>

          </Box>
        );
      },
    },
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
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div>
      {openRel ? (
        <RolesAsignaPermisos
          open={openRel}
          handleClose={handleClose}
          id={id}
        ></RolesAsignaPermisos>
      ) : (
        ""
      )}
      {open ? (
        <RolesMenu open={open} handleClose={handleClose} id={id}></RolesMenu>
      ) : (
        ""
      )}
      {openRolesModalAdd ? <RolesModal
        open={openRolesModalAdd}
        modo={modo}
        handleClose={handleClose}
        tipo={tipoOperacion}
        dt={dt}
      />
        : ""}


      <ButtonsAdd handleOpen={handleNuevoRegistro} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  );
};

export default Roles;
function setOpenRel(arg0: boolean) {
  throw new Error("Function not implemented.");
}

