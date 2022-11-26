import { useEffect, useState } from 'react'

import { Checkbox, Typography, Grid, Tooltip, IconButton, Box } from '@mui/material';
import { AuthService } from '../../../../../services/AuthService';
import { Toast } from '../../../../../helpers/Toast';
import { AlertS } from '../../../../../helpers/AlertS';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGridSimple from '../../../MUIXDataGridSimple';
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AsignarPermisoRol from './AsignarPermisoRol';
import EliminarPermisosRol from './EliminarPermisosRol';
import ModalForm from '../../../componentes/ModalForm';
import Slider from '../../../Slider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const RolesMenu = ({
  idRol,
  open,
  handleClose,
}: {
  idRol: string,
  open: boolean;
  handleClose: Function,
}) => {
  const [dataRolesMenu, setDataRolesMenu] = useState([]);
  const [dtRolesMenu, setDtRolesMenu] = useState([]);
  const [openRelRolesMenu, setOpenRelRolesMenu] = useState(false);
  const [openPerRelRolesMenu, setOpenPerRelRolesMenu] = useState(false);
  const [dataAsignarMenuRol, setDataAsignarMenuRol] = useState([]);
  const [openSliderAsignarMenuRol, setOpenSliderAsignarMenuRol] = useState(false);
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
      width: 200,
      renderCell: (v) => {
        return (
          <>
            <Tooltip title={"Ver Permisos Relaciados al Menú"}>
              <IconButton onClick={() => handleViewPermisos(v)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Relacionar Permiso a Rol"}>
              <IconButton onClick={() => handleRel(v)}>
                <AccountTreeIcon />
              </IconButton>
            </Tooltip>





          </>
        );
      },
    },
    {
      field: "acciones",
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
      field: "acciones",
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
  const handleRel = (v: any) => {
    setDtRolesMenu(v);
    setOpenRelRolesMenu(true);

  };

  const handleViewPermisos = (v: any) => {

    setDtRolesMenu(v);
    setOpenPerRelRolesMenu(true);

  };

  const handleCloseAsignar = (v: string) => {

    setOpenPerRelRolesMenu(false);
    setOpenRelRolesMenu(false);


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
      setOpenSliderAsignarMenuRol(false);
    });
  };

  const handleChangeAsignarMenuRol = (v: any) => {
    let dataAsignarMenuRol = {
      TIPO: 1,
      IDROL: idRol,
      IDMENU: v.id
    }
    AuthService.rolespermisorelacionar(dataAsignarMenuRol).then((res) => {
      setDataAsignarMenuRol(res.RESPONSE);
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

  const consultaAsignarMenuRol = (data: any) => {
    setOpenSliderAsignarMenuRol(true);
    AuthService.menusinrelacionararol(data).then((res) => {
      setDataAsignarMenuRol(res.RESPONSE);
      setOpenSliderAsignarMenuRol(false);
    });

  };

  useEffect(() => {
    consultaAsignarMenuRol({ CHID: idRol });
    consulta({ CHID: idRol });
  }, []);



  return (
    <div>
      <Slider open={false} ></Slider>
      <ModalForm title={' Relacion Menú a Rol'} handleClose={handleClose}>

        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box sx={{ boxShadow: 3 }} >
              <Grid container sx={{ left: "50%", width: "100%", height: "80vh", bgcolor: "rgb(255,255,255)", boxShadow: 50, borderRadius: 3, justifyContent: "center" }} >
                <Grid item sm={12} sx={{ height: "100%" }}>
                  <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <Typography sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "1.5vw", color: "#808080", }}>
                      Menús Relacionados al Rol
                    </Typography>
                  </Grid>
                  <Grid item sm={12} sx={{ height: "95%", }}>
                    <MUIXDataGridSimple columns={columns} rows={dataRolesMenu} />
                  </Grid>
                </Grid>
                <Grid >
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box sx={{ boxShadow: 3 }} >
              <Grid container sx={{ left: "50%", width: "100%", height: "80vh", bgcolor: "rgb(255,255,255)", justifyContent: "center" }} >
                <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                  <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <Typography sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "1.5vw", color: "#808080", }} >
                      Menús Disponibles Para Relacionar al Rol
                    </Typography>
                  </Grid>
                  <Grid sx={{ height: "90%", margin: "1%" }} >
                    <MUIXDataGridSimple columns={columnsAsignarMenuRol} rows={dataAsignarMenuRol} />
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        
      </ModalForm>

      {openRelRolesMenu ? (
        <AsignarPermisoRol
          id={idRol}
          open={openRelRolesMenu}
          handleCloseAsignar={handleCloseAsignar}
          handleClose={handleClose}
          dt={dtRolesMenu}
        ></AsignarPermisoRol>
      ) : (
        ""
      )}

      {openPerRelRolesMenu ? (
        <EliminarPermisosRol
          id={idRol}
          open={openPerRelRolesMenu}
          handleCloseAsignar={handleCloseAsignar}
          handleClose={handleClose}
          dt={dtRolesMenu}
        ></EliminarPermisosRol>
      ) : (
        ""
      )}


    </div>
  );
}


export default RolesMenu
