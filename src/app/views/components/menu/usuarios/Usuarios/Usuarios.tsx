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
import UsuarioOrg from "./UsuarioOrg";
import { AlertS } from "../../../../../helpers/AlertS";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ParametroServices } from "../../../../../services/ParametroServices";
import { Datum } from "../../../../../interfaces/user/solicitudes";
import { getRowIdFromRowModel } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";
import { COLOR } from "../../../../../styles/colors";


const Usuarios = () => {
  const [data, setData] = useState([]);
  const [dataSolicitud, setDataSolicitud] = useState<Datum[]>([]);
  const [openRolConf, setOpenRolConf] = useState(false);
  const [openOrgConf, setOpenOrgConf] = useState(false);
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
    if (newValue === '2') {
      let dataAppId = {
        NUMOPERACION: 5,
        NOMBRE: "AppID",
      };

      ParametroServices.ParametroGeneralesIndex(dataAppId).then(
        (resAppId) => {
          UserServices.solicitudesapp('IdUsuario=' + user.id + '&IdApp=' + resAppId?.RESPONSE?.Valor).then((res) => {
            const sol: Datum[] = res.data.data;
            //const valo: Datum[] = sol;
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
      title: "¿Estás seguro de eliminar este registro??",
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
    setOpenOrgConf(false);
    consulta({ NUMOPERACION: 4 }, "Consulta Exitosa");
  };

const handleOrgConf = (v: any) => {
    setDt(v.row);
    setOpenOrgConf(true);
  };

  const handleRolConf = (v: any) => {
    setDt(v.row);
    setOpenRolConf(true);
  };


  const columnsSolicitud: GridColDef[] = [
    { field: "Id", hide: true },
    { field: "FechaDeCreacion", headerName: "Fecha De Creación", description: "Fecha De Creación", width: 250 },
    { field: "UltimaModificacion", headerName: "Ultima Modificación", description: "Ultima Modificación", width: 250 },
    { field: "NombreUsuario", headerName: "Nombre Usuario", description: "Nombre Usuario", width: 150, },
    { field: "DatosAdicionales", headerName: "Datos Adicionales", description: "Datos Adicionales", width: 250 },
    { field: "Estatus", headerName: "Estatus", description: "Estatus", width: 150 },
    { field: "tipoSoli", headerName: "Tipo Solicitud", description: "Tipo Solicitud", width: 150 },
    { field: "AppNombre", headerName: "Nombre de la aplicación", description: "Nombre de la aplicación", width: 200, },
    { field: "Mensaje", headerName: "Mensaje", description: "Mensaje", width: 120, },
  ];

  const columns: GridColDef[] = [
    { field: "id", hide: true, },
    {
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box >
            <Tooltip title={"Configurar Organismos"}>
              <IconButton color="success" onClick={() => handleOrgConf(v)}>
                <AssignmentIndIcon />
              </IconButton>
            </Tooltip>

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
    {
      field: "EstatusPDRMYE", disableExport: true,
      headerName: "Estatus",
      description: "Estatus",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <Grid container>
          <Box sx={{ borderRadius:10,  textAlign: "center", alignItem: "center", width: "100%", height: "100%", bgcolor: v.row.EstatusPDRMYE === "0" ? COLOR.verdeBAndera : COLOR.rojo }} >
            <Typography>
              {v.row.EstatusPDRMYE === "0" ? "Activo" : "Inactivo"}
            </Typography>
          </Box>
          </Grid>
        );
      },
    },
    { field: "UltimoInicioDeSesion", headerName: "Ultimo Inicio De Sesión", description: "Ultimo Inicio De Sesión", width: 250 },
    { field: "NombreUsuario", headerName: "Nombre Usuario", description: "Nombre Usuario", width: 250, },
    { field: "Nombre", headerName: "Nombre", description: "Nombre", width: 250 },
    { field: "ApellidoPaterno", headerName: "Apellido Paterno", description: "Apellido Paterno", width: 250 },
    { field: "ApellidoMaterno", headerName: "Apellido Materno", description: "Apellido Materno", width: 250 },
    { field: "Rfc", headerName: "RFC", description: "RFC", width: 200, },
    { field: "Curp", headerName: "CURP", description: "CURP", width: 250, },
    { field: "Telefono", headerName: "Teléfono", description: "Teléfono", width: 150, },
    { field: "Ext", headerName: "Extensión", description: "Extensión", width: 150, },
    { field: "Celular", headerName: "Teléfono Móvil", description: "Teléfono Móvil", width: 190, },
    { field: "Ubicación", headerName: "Ubicación", description: "Ubicación", width: 250, },
    { field: "CorreoElectronico", headerName: "Correo Electrónico", description: "Correo Electrónico", width: 300, },
    { field: "Puesto", headerName: "Puesto", description: "Puesto", width: 200, },
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
      {openOrgConf ?
          <UsuarioOrg
            handleClose={handleClose}
            dt={dt}
          ></UsuarioOrg>
          :
          ""
        }
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
            <Typography variant="h4" >
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
