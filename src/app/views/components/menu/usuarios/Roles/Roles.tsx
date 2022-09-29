import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { messages } from "../../../../styles";
import AccionesGrid from "../../../AccionesGrid";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import MUIXDataGrid from "../../../MUIXDataGrid";
import RolesMenu from "./RolesMenu";
import RolAsignaMenu from "./RolAsignaMenu";

const Roles = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAsignaRol, setOpenAsignaRol] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => {
    setOpen(false);
    setOpenAsignaRol(false);
  };

  const handleView = (v: any) => {
    setId(v.row.id);
    setOpen(true);

    /* setTipoOperacion(2);
       setModo("Editar Registro");
       setOpen(true);
       setData(v);*/
  };

  const handleEdit = (v: any) => {
    /* setTipoOperacion(2);
         setModo("Editar Registro");
         setOpen(true);
         setData(v);*/
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
      width: 100,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title={"Ver Menús Relaciados al Rol"}>
              <IconButton onClick={() => handleView(v)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Relacionar Menú"}>
              <IconButton onClick={() => handleDelete(v)}>
                <AccountTreeIcon />
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
      {open ? (
        <RolesMenu open={open} handleClose={handleClose} id={id}></RolesMenu>
      ) : (
        ""
      )}

      {openAsignaRol ? (
        <RolAsignaMenu
          open={openAsignaRol}
          handleClose={handleClose}
          id={id}
        ></RolAsignaMenu>
      ) : (
        ""
      )}

      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  );
};

export default Roles;
