import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { messages } from "../../../../styles";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { AuthService } from "../../../../../services/AuthService";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PerfilesUsuarioModal } from "./PerfilesUsuarioModal";



export const PerfilesUsuario = () => {
    const [perfilUsuario, setPerfilUsuario] = useState([]);
    const [modo, setModo] = useState("");
    const [open, setOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = useState(0);
    const [vrows, setVrows] = useState({});

    const columns: GridColDef[] = [
        {
          field: "id",
          hide: true,
          headerName: "Identificador",
          width: 150,
          description: messages.dataTableColum.id,
        },
        {
          field: "Descripcion",
          headerName: "Descripción de perfil",
          width: 420,
        },
        {
          field: "Referencia",
          headerName: "Referencia",
          width: 120,
        },
        {
          field: "acciones",
          headerName: "Acciones",
          description: "Campo de Acciones",
          sortable: false,
          width: 150,
          renderCell: (v) => {
            return (
              <Box>
                <IconButton onClick={() => handleEdit(v)}>
                  <ModeEditOutlineIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(v)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            );
          },
        },
      ];

      const handleClose = () => {
        setOpen(false);
        consulta({ NUMOPERACION: 4 });
      };
    
      const handleOpen = (v: any) => {
        setTipoOperacion(1);
        setModo("Agregar Registro");
        setOpen(true);
        setVrows("");
      };
    
      const handleEdit = (v: any) => {
        console.log(v);
        setTipoOperacion(2);
        setModo("Editar Registro");
        setOpen(true);
        setVrows(v);
      };

      const handleDelete = (v: any) => {
        Swal.fire({
          icon: "info",
          title: "Estas seguro de eliminar este registro?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(v);
            const user: RESPONSE = JSON.parse(String(getUser()));
    
            let data = {
              NUMOPERACION: 3,
              CHID: v.row.id,
              CHUSER: user.id,
            };
            console.log(data);
    
            AuthService.perfilindex(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Registro Eliminado!",
                });
    
                let data = {
                  NUMOPERACION: 4,
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
        });
      };
    
      const consulta = (data: any) => {
        AuthService.perfilindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Consulta Exitosa!",
            });
            console.log(data);
            setPerfilUsuario(res.RESPONSE);
            console.log("parametroGeneral consulta", perfilUsuario);
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
        <div style={{ height: 600, width: "100%" }}>
           {open ? (
            <PerfilesUsuarioModal
              open={open}
              modo={modo}
              tipo={tipoOperacion}
              handleClose={handleClose}
              dt={vrows}
            />
          ) : (
            ""
          )}
          <ButtonsAdd handleOpen={handleOpen} />
          <MUIXDataGrid columns={columns} rows={perfilUsuario} />
        </div>
      );

}