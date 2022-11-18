import { useEffect, useState } from "react";
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

import { AuthService } from "../../../../../services/AuthService";
import { GridColDef } from '@mui/x-data-grid';
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";
import ModalForm from "../../../componentes/ModalForm";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const AsignarPermisoRol = ({
  id,
  dt,
  open,
  handleCloseAsignar,
  handleClose,
}: {
  id: string;
  dt: any;
  open: boolean;
  handleCloseAsignar: Function;
  handleClose: Function;
}) => {
  const [data, setData] = useState([]);
  const [openSlider, setOpenSlider] = useState(false);

  const consulta = (data: any) => {
    setOpenSlider(true);
    AuthService.menuPermisosSinRel(data).then((res) => {
      setData(res.RESPONSE);
      setOpenSlider(false);
    });

  };


  const handleChange = (v: any) => {
    let data = {
      TIPO: 1,
      IDPERMISO: v.row.id,
      IDMENU: dt?.row?.id,
      IDROL: id,
    }
    AuthService.menuPermisosRelacionar(data).then((res) => {
      setData(res.RESPONSE);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Permiso Asignado!",
        });
        consulta({ CHID: dt?.row?.id, IDROL: id });
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
    consulta({ CHID: dt?.row?.id, IDROL: id });
    console.log(dt);
  }, []);

  return (
    <div>

<ModalForm title={"Asignar Permisos al Rol"} handleClose={handleClose}>
<Grid
        container
        sx={{
          width: "100%",
          height: "60vh",
        }}
      >
        <Slider open={openSlider} ></Slider>

        <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: "2vw",
              color: "#454545",
            }}
          >
            
          </Typography>
        </Grid>
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

        <Grid sm={11} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
          <Typography
            sx={{
              textAlign: "left",
              fontFamily: "sans-serif",
              fontSize: "1.5vw",
              color: "#808080",
            }}
          >
            Para Asignar el Permiso solo Marcar la Casilla
          </Typography>
        </Grid>

        <Grid sm={12}
          sx={{
            mt: "2vh",
            width: "100%",
            height: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",

          }}
        >
          <MUIXDataGridSimple columns={columns} rows={data} />
        </Grid>

      </Grid>

</ModalForm>


    </div>
  );
};
export default AsignarPermisoRol;
