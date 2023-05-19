import { useEffect, useState } from 'react'
import { Typography, Grid, Tooltip, IconButton, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { GridColDef } from '@mui/x-data-grid';
import { Toast } from '../../../helpers/Toast';
import { AlertS } from '../../../helpers/AlertS';
import MUIXDataGridSimple from '../MUIXDataGridSimple';
import ModalForm from '../componentes/ModalForm';
import Slider from '../Slider';
import { CatalogosServices } from '../../../services/catalogosServices';

const ReportesControlAsignacion = ({
  idRol,
  NameRol,
  handleClose,
}: {
  idRol: string,
  NameRol: string,
  handleClose: Function,
}) => {
  const [dataReporteMenu, setReporteMenu] = useState([]);
  const [openSlider, setOpenSlider] = useState(false);
  const [dataReporteMenuAsignado, setDataReporteMenuAsignado] = useState([]);


  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true, hideable:false,
    },
    { field: "Nombre", headerName: "Nombre", width: 300,description:"Nombre" },
    {
      field: "acciones", disableExport: true,
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

  const columnsAsignarReporteRol: GridColDef[] = [
    {
      field: "id",
      hide: true, hideable:false,
    },
    {
      field: "acciones", disableExport: true,
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
    { field: "Nombre", headerName: "Nombre", width: 150,description:"Nombre" },
    { field: "Descripcion", headerName: "Descripcion", description:"Descripcion", width: 200 },
  ];

  const handleChange = (v: any) => {
    let data = {
      TIPO: 2,
      IDROL: idRol,
      IDMENU: v.id
    }
    setOpenSlider(true)
    CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
      setReporteMenu(res.RESPONSE);

      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Reporte Eliminado!",
        });
        consultaAsignarMenuRol({ CHID: idRol });
        consulta({ CHID: idRol });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  const consulta = (data: any) => {
    CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
      setReporteMenu(res.RESPONSE);
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
    CatalogosServices.reportesAdministracionRelacion(dataAsignarMenuRol).then((res) => {
      setDataReporteMenuAsignado(res.RESPONSE);
      setOpenSlider(false)

      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Reporte Relacionado!",
        });
        consultaAsignarMenuRol({ CHID: idRol });
        consulta({ CHID: idRol });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consultaAsignarMenuRol = (data: any) => {
    CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
      setDataReporteMenuAsignado(res.RESPONSE);
      setOpenSlider(false);

    });

  };

  useEffect(() => {
    consultaAsignarMenuRol({ CHID: idRol });
    consulta({ CHID: idRol,TIPO:4 } );
  }, []);



  return (
    <>
      <Slider open={openSlider} ></Slider>
      <ModalForm title={' Configuración de Rol: ' + NameRol} handleClose={handleClose}>

        <Grid container sx={{ boxShadow: 50, borderRadius: 20, }} spacing={2}>
   
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Grid container sx={{ left: "50%", width: "100%", height: "80vh", bgcolor: "rgb(255,255,255)", boxShadow: 50, borderRadius: 3, justifyContent: "center" }} >
              <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                <Grid item sm={12} sx={{ height: "100%" }}>
                  <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      Reportes Relacionados al Rol
                    </Typography>
                  </Grid>
                  <Grid item sm={12} sx={{ height: "90%", }}>
                    <MUIXDataGridSimple columns={columns} rows={dataReporteMenuAsignado} />
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
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Reportes Disponibles Para Relacionar al Rol
                  </Typography>
                </Grid>
                <Grid item sm={12} sx={{ height: "90%", }}>
                  <MUIXDataGridSimple columns={columnsAsignarReporteRol} rows={dataReporteMenu} />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>

      </ModalForm>




    </>
  );
}


export default ReportesControlAsignacion
