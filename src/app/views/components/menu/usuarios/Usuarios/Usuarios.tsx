import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DoneIcon from '@mui/icons-material/Done';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, IconButton, Tab, Tooltip, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { DatDAMOPSol, Datum } from "../../../../../interfaces/user/solicitudes";
import { AuthService } from "../../../../../services/AuthService";
import { ParametroServices } from "../../../../../services/ParametroServices";
import { UserServices, ValidaSesion } from "../../../../../services/UserServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import UsuarioOrg from "./UsuarioOrg";
import UsuarioRoles from "./UsuarioRoles";
import UsuariosModal from "./UsuariosModal";
import UsuariosMunicipios from "./UsuariosMunicipios";


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
  const [configRol, setConfigRol] = useState<boolean>(false);
  const [configOrg, setConfigOrg] = useState<boolean>(false);
  const [dataSolicitudNoAdmin, setDataSolicitudNoAdmin] = useState<DatDAMOPSol[]>([]);
  const [idApp, setIdApp] = useState("");


  const Estatus = [
    { estatus: '0', accion: <HourglassEmptyIcon />, },
    { estatus: '1', accion: <DoneIcon />, },
    { estatus: '2', accion: <DoDisturbIcon />, },
    { estatus: '3', accion: <VisibilityIcon />, },
  ]

  const tipoDepartamento = [
    { dep: 'DAMOP', idTipoConsulta: "6d8fefa8-50c1-11ed-ab6c-040300000000"    , idSelect:"6d8fefa8-50c1-11ed-ab6c-040300000000" ,},
    { dep: 'DAMOP_ORG', idTipoConsulta: "f99fe513-516d-11ed-ab6c-040300000000", idSelect:"f99fe513-516d-11ed-ab6c-040300000000" ,},
    { dep: 'DTI', idTipoConsulta: "724605b7-2b01-11ed-afdb-040300000000"      , idSelect: "none",},
  ]
  const [value, setValue] = useState('1');
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === '2') {
      let dataAppId = {
        NUMOPERACION: 5,
        NOMBRE: "AppID",
      };
      if (user?.PERFILES[0]?.Referencia === "ADMIN") {
        ParametroServices.ParametroGeneralesIndex(dataAppId).then((resAppId) => {
          UserServices.solicitudesapp('IdUsuario=' + user.id + '&IdApp=' + resAppId?.RESPONSE?.Valor).then((res) => {
            const sol: Datum[] = res.data.data;
            setDataSolicitud(sol);
          });
        });
      } else {
        AuthService.adminUser({ NUMOPERACION: 11, CHUSER: user?.id }).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Consulta Exitosa",
            });
            setDataSolicitudNoAdmin(res.RESPONSE);
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });


      }
    } else if (newValue === '1') {
      consulta();



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

  const handleClose = (v: string) => {
    setOpenConfigMun(false);
    setOpenNew(false);
    setOpenRolConf(false);
    setOpenOrgConf(false);
    consulta();
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
    {
      field: "Estatus", headerName: "Estatus", description: "Estatus", width: 150
      ,
      renderCell: (v) => {
        return (
          <Box >
            {Estatus.find(({ estatus }) => Number(estatus) === v.row.Estatus)?.accion}
          </Box>
        );
      },
    },
    { field: "tipoSoli", headerName: "Tipo Solicitud", description: "Tipo Solicitud", width: 150 },
    { field: "AppNombre", headerName: "Nombre de la aplicación", description: "Nombre de la aplicación", width: 200, },
    { field: "Mensaje", headerName: "Mensaje", description: "Mensaje", width: 120, },
  ];

  const columnsSolicitudNoAdmin: GridColDef[] = [
    { field: "Id", hide: true },
    { field: "FechaDeCreacion", headerName: "Fecha De Creación", description: "Fecha De Creación", width: 250 },
    {
      field: "Estatus", headerName: "Estatus", description: "Estatus", width: 150,
      renderCell: (v) => {
        return (
          <Box >
            {Estatus.find(({ estatus }) => Number(estatus) === v.row.Estatus)?.accion}
          </Box>
        );
      },

    },
    { field: "Nombre", headerName: "Nombre", description: "Nombre", width: 250 },
    { field: "ApellidoPaterno", headerName: "Apellido Paterno", description: "Apellido Paterno", width: 150, },
    { field: "ApellidoMaterno", headerName: "Apellido Materno", description: "Apellido Materno", width: 250 },
    { field: "DatosAdicionales", headerName: "Datos Adicionales", description: "Datos Adicionales", width: 150 },

  ];

  const columns: GridColDef[] = [
    { field: "id", hide: true, },
    {
      hide: !(configOrg || configRol || editar || eliminar),
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box >
            {configOrg ?
              <Tooltip title={"Configurar Organismos"}>
                <IconButton color="inherit" onClick={() => handleOrgConf(v)}>
                  <ApartmentIcon />
                </IconButton>
              </Tooltip>
              : ""}
            {
              configRol ?
                <Tooltip title={"Configurar Roles"}>
                  <IconButton color="inherit" onClick={() => handleRolConf(v)}>
                    <AssignmentIndIcon />
                  </IconButton>
                </Tooltip>
                : ""}

            {editar ?
              <Tooltip title={"Editar Registro"}>
                <IconButton color="inherit" onClick={() => handleEdit(v)}>
                  <ModeEditOutlineIcon />
                </IconButton>
              </Tooltip>
              : ""}

            {eliminar ?
              <Tooltip title={"Eliminar Registro"}>
                <IconButton color="inherit" onClick={() => handleDelete(v)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
              : ""}
          </Box>
        );
      },
    },
    {
      field: "EstatusPDRMYE", disableExport: true,
      headerName: "Estatus",
      description: "Estatus",
      sortable: false,
      width: 120,
      renderCell: (v) => {
        return (
          <Grid container>
            <Grid className="Grid-Usuarios-Solicitudes" container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Typography variant="h5" className={v.row.EstatusPDRMYE === "0" ? "label-UsuariosEnabled" : "label-UsuariosDisabled"} >
                {v.row.EstatusPDRMYE === "0" ? "Activo" : "Inactivo"}
              </Typography>
            </Grid>
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


  ];

  const consulta = () => {
    const data = {
      NUMOPERACION: user?.PERFILES[0]?.Referencia === "ADMIN" ? 4 : 12,
      CHUSER: user?.id,
      TIPO: tipoDepartamento.find(({ dep }) => dep === user?.DEPARTAMENTOS[0].NombreCorto)?.idTipoConsulta
    }

    AuthService.adminUser(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa",
        });
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const ObtenerIdApp = () => {
          let dataAppId = {
            NUMOPERACION: 5,
            NOMBRE: "AppID",
          };

          ParametroServices.ParametroGeneralesIndex(dataAppId).then(
            (resAppId) => {
              setIdApp(resAppId?.RESPONSE?.Valor)
            
            }
          );

  };

  useEffect(() => {
  ObtenerIdApp();
  ValidaSesion();

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
        if (String(item.Referencia) === "CONFIGROL") {
          setConfigRol(true);
        }
        if (String(item.Referencia) === "CONFIGORG") {
          setConfigOrg(true);
        }
      }
    });
    consulta();
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
            dt={dt} idApp={idApp}          ></UsuariosModal>
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
            <MUIXDataGrid
              columns={user?.PERFILES[0]?.Referencia === "ADMIN" ? columnsSolicitud : columnsSolicitudNoAdmin}
              rows={user?.PERFILES[0]?.Referencia === "ADMIN" ? dataSolicitud : dataSolicitudNoAdmin} />
          </TabPanel>
        </TabContext>


      </Grid>
    </div>
  );
};

export default Usuarios;
