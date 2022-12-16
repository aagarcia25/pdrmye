import { useEffect, useState } from 'react'
import { Typography, Grid, Tooltip, IconButton, Box } from '@mui/material';
import { AuthService } from '../../../../../services/AuthService';
import { Toast } from '../../../../../helpers/Toast';
import { AlertS } from '../../../../../helpers/AlertS';
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGridSimple from '../../../MUIXDataGridSimple';
import ConfigurarPermisosMenu from './ConfigurarPermisosMenu';
import ModalForm from '../../../componentes/ModalForm';
import Slider from '../../../Slider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const ConfiguracionRoles = ({
  idRol,
  NameRol,
  open,
  handleClose,
}: {
  idRol: string,
  NameRol: string,
open:boolean,
  handleClose: Function,
}) => {
  const [dataRolesMenu, setDataRolesMenu] = useState([]);
  const [dtRolesMenu, setDtRolesMenu] = useState([]);
  const [openPerRelRolesMenu, setOpenPerRelRolesMenu] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);

  const [dataAsignarMenuRol, setDataAsignarMenuRol] = useState([]);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },

    { field: "MENU", headerName: "Menu", width: 300 },
    {
      field: "Permisos",
      headerName: "Permisos",
      description: "Campo de Acciones",
      sortable: false,
      width: 120,
      renderCell: (v) => {
        return (
          <>
            <Tooltip title={"Configuracion de Permisos"}>
              <IconButton onClick={() => handleViewPermisos(v)}>
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "",
      description: "Relacionar Menus",
      sortable: false,
      width: 10,
      renderCell: (v) => {
        return (
          <>
            <Tooltip title={"Eliminar menus de el Rol"}>
              <IconButton onClick={() => handleChange(v)}>
                <ArrowForwardIosIcon color='error' />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },


  ];
  const columnsAsignarMenuRol: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "",
      description: "Relacionar Roles",
      sortable: false,
      width: 10,
      renderCell: (v) => {
        return (
          <>

            <Tooltip title={"Asignar menu a el Rol"}>
              <IconButton onClick={() => handleChangeAsignarMenuRol(v)}>
                <ArrowBackIosIcon color='success' />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },

    { field: "MENU", headerName: "Menu", width: 400 },

  ];


  const handleViewPermisos = (v: any) => {

    setDtRolesMenu(v);
    setOpenPerRelRolesMenu(true);

  };

  const handleCloseAsignar = (v: string) => {
    setOpenPerRelRolesMenu(false);

    if (v === "saved") {
      consulta({ NUMOPERACION: 4 });

    };
  };

  const handleChange = (v: any) => {
    let data = {
      TIPO: 2,
      IDROL: idRol,
      IDMENU: v.id
    }
    setOpenSlider(true)
    AuthService.rolespermisorelacionar(data).then((res) => {
      setDataRolesMenu(res.RESPONSE);

      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Menu Eliminado!",
        });
        consultaAsignarMenuRol({ CHID: idRol });
        consulta({ CHID: idRol });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  const consulta = (data: any) => {
    AuthService.menurelacionadosalrol(data).then((res) => {
      setDataRolesMenu(res.RESPONSE);
      setOpenSlider(false)
    });
  };

  const handleChangeAsignarMenuRol = (v: any) => {
    let dataAsignarMenuRol = {
      TIPO: 1,
      IDROL: idRol,
      IDMENU: v.id
    }
    setOpenSlider(true);
    AuthService.rolespermisorelacionar(dataAsignarMenuRol).then((res) => {
      setDataAsignarMenuRol(res.RESPONSE);
      setOpenSlider(false)

      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Menu Relacionado!",
        });
        consultaAsignarMenuRol({ CHID: idRol });
        consulta({ CHID: idRol });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consultaAsignarMenuRol = (data: any) =>
   {
    AuthService.menusinrelacionararol(data).then((res) => {
      setDataAsignarMenuRol(res.RESPONSE);
      setOpenSlider(false);

    });

  };

  useEffect(() => {
    consultaAsignarMenuRol({ CHID: idRol });
    consulta({ CHID: idRol });
  }, []);



  return (
    <>
      <Slider open={openSlider} ></Slider>
      <ModalForm title={' Configuración de Rol'} handleClose={handleClose}>

        <Grid container sx={{ boxShadow: 50, borderRadius: 20,  }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container sx={{ boxShadow: 50, borderRadius: 20, justifyContent: "center" }} >
              <Typography sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "1.5vw", color: "#808080", }}>
                {NameRol}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Grid container sx={{ left: "50%", width: "100%", height: "80vh", bgcolor: "rgb(255,255,255)", boxShadow: 50, borderRadius: 3, justifyContent: "center" }} >
              <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                <Grid item sm={12} sx={{ height: "100%" }}>
                  <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <Typography sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "1.5vw", color: "#808080", }}>
                      Menús Relacionados al Rol
                    </Typography>
                  </Grid>
                  <Grid item sm={12} sx={{ height: "90%", }}>
                    <MUIXDataGridSimple columns={columns} rows={dataRolesMenu} />
                  </Grid>
                </Grid>
                <Grid >
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Grid container sx={{ left: "50%", width: "100%", height: "80vh", bgcolor: "rgb(255,255,255)", justifyContent: "center" }} >
              <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                  <Typography sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "1.5vw", color: "#808080", }} >
                    Menús Disponibles Para Relacionar al Rol
                  </Typography>
                </Grid>
                <Grid item sm={12} sx={{ height: "90%", }}>
                  <MUIXDataGridSimple columns={columnsAsignarMenuRol} rows={dataAsignarMenuRol} />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>

      </ModalForm>

      {openPerRelRolesMenu ?
        <ConfigurarPermisosMenu
          id={idRol}
          handleCloseAsignar={handleCloseAsignar}
          handleClose={handleClose}
          dt={dtRolesMenu}
          NameRol={NameRol} />
        : ""
      }


    </>
  );
}


export default ConfiguracionRoles
