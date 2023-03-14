import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AuthService } from "../../../../../services/AuthService";
import { GridColDef } from '@mui/x-data-grid';
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";
import ModalForm from "../../../componentes/ModalForm";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const ConfigurarPermisosMenu = ({
  id,
  dt,
  NameRol,
  handleClose,
  handleCloseAsignar,
}: {
  id: string;
  NameRol: string,
  dt: any;
  handleClose: Function;
  handleCloseAsignar: Function;
}) => {
  const [data, setData] = useState([]);
  const [openSlider, setOpenSlider] = useState(true);
  const [dataAsignarPermisoRol, setDataAsignarPermisoRol] = useState([]);



  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    { field: "Permiso",     headerName: "Permiso",    description: "Permiso",     width: 150 },
    { field: "Descripcion", headerName: "Descripción",description: "Descripción", width: 300 },
    {
      field: "acciones",  disableExport: true,
      headerName: "",
      description: "Relacionar Menus",
      sortable: false,
      width: 10,
      renderCell: (v) => {
        return (
          <Tooltip title={"Eliminar Permiso"}>
            <IconButton onClick={() => handleChange(v)}>
              <ArrowForwardIosIcon color='error' />
            </IconButton>
          </Tooltip>
        );

      },
    },

  ];

  const columnsAsignarPermisoRol: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "",
      description: "Relacionar Menus",
      sortable: false,
      width: 10,
      renderCell: (v) => {
        return (

          <Tooltip title={"Asignar Permiso"}>
            <IconButton onClick={() => handleChangeAsignarPermisoRol(v)}>
              <ArrowBackIosIcon color='success' />
            </IconButton>
          </Tooltip>
        );



      },
    },
    { field: "Permiso",     headerName: "Permiso",    description: "Permiso",     width: 300 },
    { field: "Descripcion", headerName: "Descripción",description: "Descripción", width: 300 },

  ];

  const consulta = (data: any) => {
    setOpenSlider(true);
    AuthService.menuPermisosRel(data).then((res) => {
      setData(res.RESPONSE);
      setOpenSlider(false);
    });

  };


  const handleChange = (v: any) => {
    let data = {
      TIPO: 2,
      IDPERMISO: v.row.id,
      IDMENU: dt?.row?.id,
      IDROL: id,
    }
    setOpenSlider(true);
    AuthService.menuPermisosRelacionar(data).then((res) => {
      setData(res.RESPONSE);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Permiso Eliminado!",
        });
        consulta({ CHID: dt?.row?.id, IDROL: id, });
        consultaAsignarPermisoRol({ CHID: dt?.row?.id, IDROL: id });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consultaAsignarPermisoRol = (data: any) => {
    setOpenSlider(true);
    AuthService.menuPermisosSinRel(data).then((res) => {
      setDataAsignarPermisoRol(res.RESPONSE);
      setOpenSlider(false);
    });

  };

  const handleChangeAsignarPermisoRol = (v: any) => {
    let dataAsignarPermisoRol = {
      TIPO: 1,
      IDPERMISO: v.row.id,
      IDMENU: dt?.row?.id,
      IDROL: id,
    }
    AuthService.menuPermisosRelacionar(dataAsignarPermisoRol).then((res) => {
      setDataAsignarPermisoRol(res.RESPONSE);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Permiso Asignado!",
        });
        consulta({ CHID: dt?.row?.id, IDROL: id, });
        consultaAsignarPermisoRol({ CHID: dt?.row?.id, IDROL: id });
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
    consulta({ CHID: dt?.row?.id, IDROL: id, });
    consultaAsignarPermisoRol({ CHID: dt?.row?.id, IDROL: id });
  }, []);

  return (
      <ModalForm title={"Configuración de Permisos"} handleClose={handleClose}>
        <Slider open={openSlider} ></Slider>
          <Grid container sx={{ width: "100%", height: "60vh", bgcolor: "rgb(255,255,255)", borderRadius: 3, justifyContent: "flex-start", }} >
            <Grid item xs={1}>
              <Button variant="outlined" onClick={() => handleCloseAsignar()}>
                <Tooltip title="Salir">
                  <IconButton aria-label="close" color="info" onClick={() => handleCloseAsignar()}>
                    <ArrowBackIosIcon/>
                  </IconButton>
                </Tooltip>
              </Button>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="h4" sx={{textAlign: "center"}}>
                {("Rol: " + NameRol)}
              </Typography>
              <Typography variant="h4" sx={{textAlign: "center"}}>
                {("Menú: ") + dt?.row?.MENU}
              </Typography>
            </Grid>
            <Grid container sx={{ borderRadius: 3, justifyContent: "space-evenly", }} >

              <Grid item xs={12} sm={12} md={5.6} lg={5}>
                <Grid container sx={{ left: "50%", width: "100%", height: "75vh", bgcolor: "rgb(255,255,255)", boxShadow: 50, borderRadius: 3, justifyContent: "center" }} >
                  <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                    <Grid item sm={12} sx={{ height: "100%" }}>
                      <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                        <Typography variant="h6"  sx={{ textAlign: "center"}}>
                          Permisos Asignado
                        </Typography>
                      </Grid>
                      <Grid item sm={12} sx={{ height: "90%", }}>
                        <MUIXDataGridSimple columns={columns} rows={data} />
                      </Grid>
                    </Grid>
                    <Grid >
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={5.6} lg={5}>
                <Grid container sx={{ left: "50%", width: "100%", height: "75vh", bgcolor: "rgb(255,255,255)", justifyContent: "center" }} >
                  <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                    <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                      <Typography variant="h6"  sx={{ textAlign: "center"}}>
                        Permisos Disponibles
                      </Typography>
                    </Grid>
                    <Grid item sm={12} sx={{ height: "90%", }}>
                      <MUIXDataGridSimple columns={columnsAsignarPermisoRol} rows={dataAsignarPermisoRol} />
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
      </ModalForm>
  );
};
export default ConfigurarPermisosMenu;
