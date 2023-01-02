import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Tooltip, IconButton, Grid, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GridColDef } from "@mui/x-data-grid";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import UsuariosModal from "./UsuariosModal";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { UserServices } from "../../../../../services/UserServices";
import { getPermisos } from "../../../../../services/localStorage";
import { PERMISO } from "../../../../../interfaces/user/UserInfo";
import UsuariosMunicipios from "./UsuariosMunicipios";
import UsuarioRoles from "./UsuarioRoles";
import { AlertS } from "../../../../../helpers/AlertS";
import { COLOR } from "../../../../../styles/colors";


const Usuarios = () => {
  const [data, setData] = useState([]);
  const [openRolConf, setOpenRolConf] = useState(false);
  const [openConfigMun, setOpenConfigMun] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [dt, setDt] = useState({});
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  ///////////////////////////////////////////


  const handleMunicipios = (v: any) => {
    setDt(v);
    setOpenConfigMun(true);
  };


  const handleOpen = () => {
    setTipoOperacion(3);
    setDt("");
    setOpenNew(true);
  };

  const handleEdit = (v: any) => {
    //console.log(v);
    setTipoOperacion(5);
    setDt(v.row);
    setOpenNew(true);
  };

  const handleActivo = (v: any) => {
    /*
       let data = "?userId=" + v.row.id;
       //console.log(data)
     
       UserServices.ActivateUser(data).then((res) => {
         //console.log(res)
         //console.log(v.row.id);
   
        if (res.status === 200) {
   
           let dat = {
             NUMOPERACION: 6,
             CHID: v.row.id,
   
           };
   
           AuthService.adminUser(dat).then((res) => {
             if (res.SUCCESS) {
               consulta({ NUMOPERACION: 4 }, "Activado");
             } else {
               AlertS.fire({
                 title: "Error!",
                 text: res.STRMESSAGE,
                 icon: "error",
               });
             }
   
   
           });
   
         } else if (res.status === 409) {
           AlertS.fire({
             title: "Error!",
             text: res.data.msg,
             icon: "error",
           });
         }
       });
       */


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
          //console.log(v);
  
          let data = {
            NUMOPERACION: 3,
            CHID: v.row.id,
            CHUSER: user.id
          };
          //console.log(data);
  
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
      });*/
  };

  const handleClose = (v: string) => {
    setOpenConfigMun(false);
    setOpenNew(false);
    setOpenRolConf(false);
    consulta({ NUMOPERACION: 4 }, "Consulta Exitosa");
  };


  const handleRolConf = (v: any) => {
    setDt(v.row);
    setOpenRolConf(true);
  };


  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box >
            <Tooltip title={"Configurar Roles"}>
              <IconButton color="success" onClick={() => handleRolConf(v)}>
                <AssignmentIndIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Editar Registro"}>
              <IconButton color="info" onClick={() => handleEdit(v)}>
                <ModeEditOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Editar Registro"}>
              <IconButton color="error" onClick={() => handleDelete(v)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "EstaActivo", headerName: "Estado",
      width: 100,
      renderCell: (v: any) => {
        return (
          (Number(v.row.EstaActivo) === 1) ?
            <Box sx={{ borderRadius: "15px", display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: COLOR.verde }} >
              Activo
            </Box>
            : <Box sx={{ borderRadius: "15px", display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: COLOR.rojo }} >
              Inactivo
            </Box>

        );
      },
    },

    { field: "UltimoInicioDeSesion", headerName: "Ultimo Inicio De Sesion", width: 200 },
    { field: "NombreUsuario", headerName: "Nombre Usuario", width: 250, },
    { field: "Nombre", headerName: "Nombre", width: 150 },
    { field: "ApellidoPaterno", headerName: "Apellido Paterno", width: 150 },
    { field: "ApellidoMaterno", headerName: "Apellido Materno", width: 150 },
    { field: "Rfc", headerName: "Rfc", width: 200, },
    { field: "Curp", headerName: "Correo Curp", width: 120, },
    { field: "Telefono", headerName: "Telefono", width: 120, },
    { field: "Ext", headerName: "Ext", width: 100, },
    { field: "Celular", headerName: "Celular", width: 120, },
    { field: "Ubicacion", headerName: "Ubicacion", width: 250, },
    { field: "CorreoElectronico", headerName: "Correo Electronico", width: 250, },
    { field: "Puesto", headerName: "Puesto", width: 200, },
    { field: "idDepartamento", hide: true, },
    { field: "idPerfil", hide: true, },

  ];

  const consulta = (data: any, v: string) => {
    AuthService.adminUser(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: v,
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
      if (String(item.ControlInterno) === "USUARIOS") {
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
    consulta({ NUMOPERACION: 4 }, "Consulta Exitosa");
  }, []);
  return (
    <div>
      <Grid sx={{ paddingTop: "1%" }}>
        {openRolConf ?
          <UsuarioRoles
            open={openRolConf}
            handleClose={handleClose}
            dt={dt}
          ></UsuarioRoles>
          :
          ""
        }
        {openNew ? (
          <UsuariosModal
            open={openNew}
            tipo={tipoOperacion}
            handleClose={handleClose}
            dt={dt}
          ></UsuariosModal>
        ) : (
          ""
        )}

        {openConfigMun ? (
          <UsuariosMunicipios
            open={openConfigMun}
            handleClose={handleClose}
            dt={dt}
          ></UsuariosMunicipios>
        ) : (
          ""
        )}
        <Grid container >
          <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Typography
              sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "3vw", color: "#000000", }}>
              Usuarios
            </Typography>
          </Grid>
        </Grid>


        <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        <MUIXDataGrid columns={columns} rows={data} />
      </Grid>
    </div>
  );
};

export default Usuarios;
