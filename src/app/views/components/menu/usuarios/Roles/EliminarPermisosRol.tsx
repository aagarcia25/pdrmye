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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const EliminarPermisosRol = ({
  id,
  dt,
  open,
  handleClose,
  handleCloseAsignar,
}: {
  id: string;
  dt: any;
  open: boolean;
  handleClose: Function;
  handleCloseAsignar: Function;
}) => {
  const [data, setData] = useState([]);
  const [openSlider, setOpenSlider] = useState(false);

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
    AuthService.menuPermisosRelacionar(data).then((res) => {
      setData(res.RESPONSE);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Permiso Eliminado!",
        });
        consulta({ CHID: dt?.row?.id });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",
      headerName: "",
      description: "Relacionar Menus",
      sortable: false,
      width: 10,
      renderCell: (v) => {
        return <Checkbox onChange={() => handleChange(v)} />;
      },
    },
    { field: "Permiso", headerName: "Permiso", width: 300 },
    { field: "Descripcion", headerName: "Descripcion", width: 300 },

  ];



  useEffect(() => {
    consulta({ CHID: dt?.row?.id, IDROL: id, });
  }, []);

  return (
    <div>

      <ModalForm title={"Permisos Relacionados al Menú"} handleClose={handleClose}>
        <Slider open={openSlider} ></Slider>
        <Box >
          <Grid container
            sx={{
              width: "100%",
              height: "60vh",
              bgcolor: "rgb(255,255,255)",
              borderRadius: 3,
              justifyContent: "center"
            }}
          >

            <Grid item xs={1}>

              <Button variant="outlined">
                <Tooltip title="Salir">
                  <IconButton
                    aria-label="close"
                    color="info"
                    onClick={() => handleCloseAsignar()}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                </Tooltip>
              </Button>

            </Grid>

            <Grid item xs={11} >
              <Typography
                sx={{
                  textAlign: "center",
                  fontFamily: "MontserratMedium",
                  fontSize: "2vw",
                  color: "#808080",
                }}
              >
                Para Eliminar el Permiso solo Marcar la Casilla
              </Typography>

            </Grid>


            <Grid item sm={12}
              sx={{
                mt: "2vh",
                width: "100%",
                height: "100%",
              }}
            >

              <MUIXDataGridSimple columns={columns} rows={data} />
            </Grid>

          </Grid>
        </Box>
      </ModalForm>
    </div>
  );
};
export default EliminarPermisosRol;
