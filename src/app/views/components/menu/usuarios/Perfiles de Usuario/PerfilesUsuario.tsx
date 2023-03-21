import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { messages } from "../../../../styles";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PerfilesUsuarioModal } from "./PerfilesUsuarioModal";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import { AlertS } from "../../../../../helpers/AlertS";
import { Grid, Typography } from "@mui/material";



export const PerfilesUsuario = () => {

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);

  const [perfilUsuario, setPerfilUsuario] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      headerName: "Identificador",
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "acciones",  disableExport: true,
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
          />
        );
      },
    },
    {field: "FechaCreacion",   headerName: "Fecha Creación", description: "Fecha Creación",   width: 200,},
    {field: "CreadoPor",    headerName: "Creado Por", description: "Creado Por",   width: 420,},
    {field: "Descripcion",    headerName: "Descripción de perfil", description: "Descripción de perfil",   width: 420,},
    {field: "Referencia",    headerName: "Referencia",  description: "Referencia",  width: 120,},

  ];

  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
    consulta({ NUMOPERACION: 4 });
  };




  const handleAccion = (v: any) => {
    console.log(v)

    if (v.tipo === 1) {
      //
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo === 2) {

      Swal.fire({
        icon: "info",
        title: "Estas seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {   
          //console.log(data);
          let data = {
            CHID: v.data.row.id,
            CHUSER: user.id,
            NUMOPERACION: 3,
      
          };
          AuthService.perfilindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });
  
              handleClose();
            } else {
              AlertS.fire({
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

    }

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const consulta = (data: any) => {
    AuthService.perfilindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        //console.log(data);
        setPerfilUsuario(res.RESPONSE);
        //console.log("parametroGeneral consulta", perfilUsuario);
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
      if (String(item.ControlInterno) === "PU") {
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
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
            <Grid container >
            <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
              <Typography
                sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "3vw", color: "#000000", }}>
                Perfil de usuario
              </Typography>
            </Grid>
            </Grid>

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={perfilUsuario} />
    </div>
  );

}