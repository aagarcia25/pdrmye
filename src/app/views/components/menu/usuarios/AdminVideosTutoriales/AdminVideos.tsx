import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import MUIXDataGrid from "../../../MUIXDataGrid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import EditIcon from "@mui/icons-material/Edit";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import Swal from "sweetalert2";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { AlertS } from "../../../../../helpers/AlertS";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { Titulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import AdminVideosModal from "./AdminVideosModal";
import { handleClickDelet } from "../../catalogos/Utilerias/ButtonsTutorial";

const AdminVideos = () => {
  const [ataVideos, setDataVideos] = useState([]);
  const [dt, setDt] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRolesConf, setOpenRolesconf] = useState(false);
  const [idMenu, setIdMenu] = useState("");
  const [nameRol, setNameRol] = useState("");
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminarP, setEliminarP] = useState<boolean>(false);

  const handleClose = (v: string) => {
    setOpen(false);
    setOpenRolesconf(false);
    setIdMenu("");
    setDt([]);
    consulta();

    {
      if (v === "saved") consulta();
    }
  };

  const eliminar = (v: any) => {
    console.log(v.row);
    handleClickDelet(v.row.nombreVideo,"/VIDEOS/TUTORIALES/");
    consulta();
  };


  const handleOpen = () => {
    setTipoOperacion(1);
    setModo("Agregar");
    setOpen(true);
  };

  const handleEditarRegistro = (v: any) => {
    console.log(v.row.idMenu)
    
    setTipoOperacion(2);
    setModo("Editar Nombre Video");
    setOpen(true);
    setIdMenu(v.row.idMenu);
    setDt(v);
  };


  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
    },
    {
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>

            {editar ? (
              <Tooltip title={"Editar nombre de video"}>
                <IconButton color="inherit" onClick={() => handleEditarRegistro(v)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {eliminarP ? (
              <Tooltip title={"Eliminar video"}>
                <IconButton color="inherit" onClick={() => eliminar(v)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", description: "Fecha Creación", width: 200, },
    { field: "nombreVideo", headerName: "Video", description: "Nombre del video", width: 250, },

  ];

  const consulta = () => {
    let data = {
      NUMOPERACION: 5
    };


    CatalogosServices.AdminVideoTutoriales(data).then((res) => {
      if (res.SUCCESS) {
        setDataVideos(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "ADMINVIDEOS") {
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminarP(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta();
  }, []);

  return (
    <>
    {open? 
    <AdminVideosModal IdMenu={idMenu} modo={modo} tipo={0} handleClose={handleClose} dt={dt} />
    :"" }
      <div style={{ height: 600, width: "100%", padding: "1%" }}>
        <NombreCatalogo controlInterno={"ADMINVIDEOS"} />
        <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        <MUIXDataGrid columns={columns} rows={ataVideos} />
      </div>
    </>
  );
};

export default AdminVideos;
