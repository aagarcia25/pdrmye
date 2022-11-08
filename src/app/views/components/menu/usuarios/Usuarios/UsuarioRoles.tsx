import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { AuthService } from "../../../../../services/AuthService";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectFragMulti from "../../../Fragmentos/SelectFragMulti";
import CloseIcon from '@mui/icons-material/Close';
const UsuarioRoles = ({
  open,
  handleClose,
  dt,
}: {
  open: boolean;
  handleClose: Function;
  dt: any;
}) => {


    
  const [openSlider, setOpenSlider] = useState<boolean>(true);
  const [idRol, setIdRol] = useState<SelectValues[]>([]);
  const [roles, setRoles] = useState<[]>([]);
  const [data, setData] = useState([]);



  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <IconButton color="error" onClick={() => handleDel(v)}>
            <DeleteForeverIcon />
          </IconButton>
        );
      },
    },
    { field: "Nombre", headerName: "Rol", width: 300 },
    { field: "Descripcion", headerName: "Descripcion", width: 600 },
  ];

  const loadFilter = () => {
    let data = { NUMOPERACION: 13 };
    CatalogosServices.SelectIndex(data).then((res) => {
      setRoles(res.RESPONSE);
    });
  };

  const handleDel = (v: any) => {
    let data = { 
      TIPO: 2,
      IDUSUARIO:dt?.id,
      IDROL:v.id
    };
    console.log(data);
    AuthService.RelacionarUsuarioRol(data).then((res) => {
      consulta();

    });
  };


  const handleFilterChange1 = (v: SelectValues[]) => {
    setIdRol(v);
  };


  const handleMunicipios = () => {
    let data = {
        TIPO:1,
        OBJS: idRol,
        IDUSUARIO:dt.id
    };
    console.log(data);
    setOpenSlider(true);
    AuthService.RelacionarUsuarioRol(data).then((res) => {
       console.log(res.RESPONSE);
       setOpenSlider(false);
       consulta();
    });
  };



  const consulta = () => {
    console.log(dt)
    let data = {
      CHID: dt?.id,
      TIPO: 1,
    };
    AuthService.usuarioRol(data).then((res) => {
      setData(res.RESPONSE);
      setOpenSlider(false);
     
    });
  };



  useEffect(() => {
    loadFilter();
    consulta();
  }, [dt]);





  return (
    <div>
      <Slider open={openSlider}></Slider>
      <Dialog open={open }
        fullScreen
        
        >

        <Grid container spacing={1}>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Box sx={{ display:"flex",justifyContent:"center"}}>
          <Typography><h2>Roles Relacionados al Usuario</h2></Typography>
          </Box>
       
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
        <Button variant="outlined" >
        <IconButton
          aria-label="close"
          color="error"
          onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
        </Button>
       
        </Grid>
         </Grid>

        <DialogContent dividers={true}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}></Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                sx={{
                  margin: 0,
                }}
              >
                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                  Seleccione Rol
                </Typography>

                <SelectFragMulti
                  options={roles}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Rol"}
                  label={""}
                  disabled={false}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                color="success"
                variant="contained"
                onClick={() =>handleMunicipios()}
              >
                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                  Relacionar Roles
                </Typography>
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Roles Relacionados
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} >
            <div style={{ height: 300, width: "100%" }}>
              <MUIXDataGridSimple columns={columns} rows={data} />
              </div>
            </Grid>
          </Grid>
        </DialogContent>

        {/* <DialogActions>
          <button className="cerrar" onClick={() => handleClose()}>
            Cerrar
          </button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default UsuarioRoles;
