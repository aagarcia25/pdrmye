import { Tooltip, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { messages } from "../../../../styles";
import AccionesGrid from "../../../AccionesGrid";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import RolesRelModal from "./RolesRelModal";
import RolesSinRel from "./RolesSinRel";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import UsuariosModal from "./UsuariosModal";

const Usuarios = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSinRel, setOpenSinRel] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [row, setRow] = useState({});
  const [id, setId] = useState("");

  const handleOpen = () => {
    setTipoOperacion(1);
    setRow("");
    setOpenNew(true);
  };

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setRow(v);
    setOpenNew(true);
  };

  const handleDelete = (v: any) => {
    /*  Swal.fire({
        icon: "info",
        title: "Estas seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(v);
  
          let data = {
            NUMOPERACION: 3,
            CHID: v.row.id,
            CHUSER: 1,
          };
          console.log(data);
  
          CatalogosServices.munfacturacion(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });
  
              let data = {
                NUMOPERACION: 4,
                ANIO: filterAnio,
              };
              consulta(data);
  
            } else {
              Alert.fire({
                title: "Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
  
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });*/
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSinRel(false);
    setOpenNew(false);
  };

  const handleView = (v: any) => {
    setId(v.row.id);
    setOpen(true);
  };

  const handleRel = (v: any) => {
    setId(v.row.id);
    setOpenSinRel(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
    },
    { field: "Nombre", headerName: "Nombre", width: 150 },
    { field: "ApellidoPaterno", headerName: "Apellido Paterno", width: 150 },
    { field: "ApellidoMaterno", headerName: "Apellido Materno", width: 150 },
    { field: "NombreUsuario", headerName: "Usuario", width: 150 },
    {
      field: "CorreoElectronico",
      headerName: "Correo Electronico",
      width: 200,
    },
    { field: "Tipo", headerName: "Tipo", width: 200 },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title={"Ver Roles Relaciados al Usuario"}>
              <IconButton onClick={() => handleView(v)}>
                <DeviceHubIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Relacionar Rol"}>
              <IconButton onClick={() => handleRel(v)}>
                <AccountBoxIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Editar Registro"}>
            <IconButton color="info" onClick={() => handleEdit(v)}>
              <ModeEditOutlineIcon />
            </IconButton>
          </Tooltip>
          
          </Box>
        );
      },
    },
  ];

  const consulta = (data: any) => {
    AuthService.adminUser(data).then((res) => {
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
      {open ? (
        <RolesRelModal
          key={Math.random()}
          open={open}
          handleClose={handleClose}
          id={id}
        ></RolesRelModal>
      ) : (
        ""
      )}

      {openSinRel ? (
        <RolesSinRel
          key={Math.random()}
          open={openSinRel}
          handleClose={handleClose}
          id={id}
        ></RolesSinRel>
      ) : (
        ""
      )}

      {openNew ? (
        <UsuariosModal
          open={openNew}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={row}
        ></UsuariosModal>
      ) : (
        ""
      )}

      <ButtonsAdd handleOpen={handleOpen} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  );
};

export default Usuarios;
