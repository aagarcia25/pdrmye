import { Tooltip, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { messages } from "../../../../styles";
import MUIXDataGrid from "../../../MUIXDataGrid";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import UsuariosModal from "./UsuariosModal";
import PerfilesConfiguracion from "./PerfilesConfiguracion";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import DepartamentoConfig from "./DepartamentoConfig";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RolesConfig from "./RolesConfig";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { UserServices } from "../../../../../services/UserServices";
const Usuarios = () => {
  const [data, setData] = useState([]);
  const [openRolConf, setOpenRolConf] = useState(false);
  const [openConfigPerfil, setOpenConfigPerfil] = useState(false);
  const [openConfigDep, setOpenConfigDep] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [userActive, setUserActive] = useState<boolean>();
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [row, setRow] = useState({});
  const [id, setId] = useState("");
  const [dt, setDt] = useState([]);


  const handleOpen = () => {
    setTipoOperacion(3);
    setRow("");
    setOpenNew(true);
  };

  const handleEdit = (v: any) => {
    setTipoOperacion(5);
    setRow(v);
    setOpenNew(true);
  };

  const handleActivo = (v: any) => {
   
    let data = {
      userId: v.row.id,
    }

    UserServices.ActivateUser(data).then((res) => {
      console.log(res);
      console.log(v.row.id);

      if (res.status == 200) {
        Toast.fire({
          icon: "success",
          title: "Activacion exitosa!",
        });
      }
      else if (res.status == 409) {
        Alert.fire({
          title: "Error!",
          text: res.data.msg,
          icon: "error",
        });
      }
    });


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
            CHUSER: user.id
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
    setOpenNew(false);
    setOpenConfigPerfil(false);
    setOpenConfigDep(false);
    setOpenRolConf(false);
  };
  const handlePerfilConfiguracion = (v: any) => {
    setDt(v);
    setOpenConfigPerfil(true);
  };
  const handleDepartConfiguracion = (v: any) => {
    setDt(v);
    setOpenConfigDep(true);
  };
  const handleRolConf = (v: any) => {
    setId(v.row.id);
    setOpenRolConf(true);
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
    { field: "Tipo", headerName: "Tipo", width: 100 },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 220,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title={"Configurar Roles"}>
              <IconButton color="success" onClick={() => handleRolConf(v)}>
                <AssignmentIndIcon />
              </IconButton>
            </Tooltip>


            <Tooltip title={"Configurar Perfil"}>
              <IconButton color="warning" onClick={() => handlePerfilConfiguracion(v)}>
                <AdminPanelSettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Configurar Departamento"}>
              <IconButton color="warning" onClick={() => handleDepartConfiguracion(v)}>
                <AddToQueueIcon />
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
    {
      field: "EstaActivo", headerName: "Activo", width: 100,
      renderCell: (v: any) => {
        return (
          (Number(v.row.EstaActivo) == 0) ?
            <Box>
              <Tooltip title={"Activar Usuario"}>
                <IconButton color="info" onClick={() => handleActivo(v)}>
                  <HowToRegIcon />
                </IconButton>
              </Tooltip>

            </Box>
            : ""

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

      {openRolConf ?
        <RolesConfig
          id={id}
          open={openRolConf}
          handleClose={handleClose}></RolesConfig>
        :
        ""
      }

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
      {openConfigPerfil ? (
        <PerfilesConfiguracion
          open={openConfigPerfil}
          modo={""}
          tipo={0}
          handleClose={handleClose}
          dt={dt}
        ></PerfilesConfiguracion>
      ) : (
        ""
      )}
      {openConfigDep ? (
        <DepartamentoConfig
          open={openConfigDep}
          modo={""}
          tipo={0}
          handleClose={handleClose}
          dt={dt}
        ></DepartamentoConfig>
      ) : (
        ""
      )}


      <ButtonsAdd handleOpen={handleOpen} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  );
};

export default Usuarios;
