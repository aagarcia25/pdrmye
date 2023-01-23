import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Tooltip, IconButton, Grid, Typography, Tab } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GridColDef } from "@mui/x-data-grid";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import UsuariosModal from "./UsuariosModal";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { UserServices } from "../../../../../services/UserServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import UsuariosMunicipios from "./UsuariosMunicipios";
import UsuarioRoles from "./UsuarioRoles";
import { AlertS } from "../../../../../helpers/AlertS";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ParametroServices } from "../../../../../services/ParametroServices";
import { Datum } from "../../../../../interfaces/user/solicitudes";
import { getRowIdFromRowModel } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";


const Usuarios = () => {
  const [data, setData] = useState([]);
  const [dataSolicitud, setDataSolicitud] = useState<Datum[]>([]);
  const [openRolConf, setOpenRolConf] = useState(false);
  const [openConfigMun, setOpenConfigMun] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState("");
  const [dt, setDt] = useState({});
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [value, setValue] = useState('1');
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if(newValue ==='2'){
      let dataAppId = {
        NUMOPERACION: 5,
        NOMBRE: "AppID",
      };

      ParametroServices.ParametroGeneralesIndex(dataAppId).then(
        (resAppId) => {
                 UserServices.solicitudesapp('IdUsuario='+user.id+'&IdApp='+resAppId?.RESPONSE?.Valor).then((res) => {
                 const sol: Datum[] = res.data.data;
                 //const valo: Datum[] = sol;
                 console.log(sol); 
                 setDataSolicitud(sol);
          });
    });
    }
    setValue(newValue);
  };

  const handleOpen = () => {
    setTipoOperacion("ALTA");
    setDt("");
    setOpenNew(true);
  };

  const handleEdit = (v: any) => {
    setTipoOperacion("MODIFICACION");
    setDt(v.row);
    setOpenNew(true);
  };
  
  const handleDelete = (v: any) => {
    setTipoOperacion("BAJA");
    setDt(v.row);
    setOpenNew(true);
  };
 


  // const handleDelete = (v: any) => {
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
  // };

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


  const columnsSolicitud: GridColDef[] = [
    { field: "Id",     hide: true},
    { field: "FechaDeCreacion",    headerName: "Fecha De Creación",      description: "Fecha De Creación",       width: 250 },
    { field: "UltimaModificacion", headerName: "Ultima Modificación",    description: "Ultima Modificación",     width: 250 },
    { field: "NombreUsuario",      headerName: "Nombre Usuario",         description: "Nombre Usuario",          width: 150, },
    { field: "DatosAdicionales",   headerName: "Datos Adicionales",      description: "Datos Adicionales",       width: 250 },
    { field: "Estatus",            headerName: "Estatus",                description: "Estatus",                 width: 150 },
    { field: "tipoSoli",           headerName: "Tipo Solicitud",         description: "Tipo Solicitud",          width: 150 },
    { field: "AppNombre",          headerName: "Nombre de la aplicación",description: "Nombre de la aplicación", width: 200, },
    { field: "Mensaje",            headerName: "Mensaje",                description: "Mensaje",                 width: 120, },
  ];

  const columns: GridColDef[] = [
    { field: "id", hide: true,},
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
            <Tooltip title={"Eliminar Registro"}>
              <IconButton color="error" onClick={() => handleDelete(v)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    { field: "UltimoInicioDeSesion",  headerName: "Ultimo Inicio De Sesion",description: "Ultimo Inicio De Sesion", width: 200 },
    { field: "NombreUsuario",         headerName: "Nombre Usuario",         description: "Nombre Usuario",          width: 250, },
    { field: "Nombre",                headerName: "Nombre",                 description: "Nombre",                  width: 150 },
    { field: "ApellidoPaterno",       headerName: "Apellido Paterno",       description: "Apellido Paterno",        width: 150 },
    { field: "ApellidoMaterno",       headerName: "Apellido Materno",       description: "Apellido Materno",        width: 150 },
    { field: "Rfc",                   headerName: "Rfc",                    description: "Rfc",                     width: 200, },
    { field: "Curp",                  headerName: "Correo Curp",            description: "Correo Curp",             width: 120, },
    { field: "Telefono",              headerName: "Telefono",               description: "Telefono",                width: 120, },
    { field: "Ext",                   headerName: "Ext",                    description: "Ext",                     width: 100, },
    { field: "Celular",               headerName: "Celular",                description: "Celular",                 width: 120, },
    { field: "Ubicación",             headerName: "Ubicación",              description: "Ubicación",               width: 250, },
    { field: "CorreoElectronico",     headerName: "Correo Electronico",     description: "Correo Electronico",      width: 250, },
    { field: "Puesto",                headerName: "Puesto",                 description: "Puesto",                  width: 200, },
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
            handleClose={handleClose}
            dt={dt}
          ></UsuarioRoles>
          :
          ""
        }
        {openNew ? (
          <UsuariosModal
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



        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Usuarios Activos" value="1" />
            <Tab label="Solicitudes Pendientes" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        <MUIXDataGrid columns={columns} rows={data} />
        </TabPanel>
        <TabPanel value="2">
         <MUIXDataGrid columns={columnsSolicitud} rows={dataSolicitud} />
        </TabPanel>
      </TabContext>


      </Grid>
    </div>
  );
};

export default Usuarios;
