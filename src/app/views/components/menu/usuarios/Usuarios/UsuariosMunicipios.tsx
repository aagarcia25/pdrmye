import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { AuthService } from "../../../../../services/AuthService";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectFragMulti from "../../../Fragmentos/SelectFragMulti";
import CloseIcon from '@mui/icons-material/Close';

const UsuariosMunicipios = ({
  open,
  handleClose,
  dt,
}: {
  open: boolean;
  handleClose: Function;
  dt: any;
}) => {

  const [openSlider, setOpenSlider] = useState<boolean>(true);
  const [idMunicipios, setIdMunicipios] = useState<SelectValues[]>([]);
  const [Municipios2, setMunicipios2] = useState<[]>([]);
  const [data, setData] = useState([]);
  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true, hideable:false,
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <IconButton color="error">
            <DeleteForeverIcon />
          </IconButton>
        );
      },
    },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 200 },
  ];

  const loadFilter = () => {
    let data = { NUMOPERACION: 5 };
    CatalogosServices.SelectIndex(data).then((res) => {
      setMunicipios2(res.RESPONSE);
    });
  };

  const handleFilterChange1 = (v: SelectValues[]) => {
    setIdMunicipios(v);
  };


  const handleMunicipios = () => {
    let data = {
        TIPO:1,
        OBJS: idMunicipios,
        IDUSUARIO:dt.row.id
    };

    setOpenSlider(true);
    AuthService.RelacionarUsuarioMunicipio(data).then((res) => {
       setOpenSlider(false);
      });
  };



  const consulta = () => {
    let data = {
      ID: dt.row.id,
      NUMOPERACION: 8,
    };
    AuthService.adminUser(data).then((res) => {
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
      <Dialog open={open} fullScreen>
     
     
      <Grid container spacing={1} sx={{ bgcolor:"#CCCCCC", paddingTop:"1%", paddingBottom:"1%" }}>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Box sx={{ display:"flex",justifyContent:"center"}}>
          <Typography variant='h4'> Roles Relacionados al Usuario </Typography>
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
        <Box boxShadow={3}>
          <Grid container spacing={1}  sx={{ padding:"1%"}}>
            <Grid item xs={12} sm={12} md={12} lg={12}></Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                sx={{
                  margin: 0,
                }}
              >
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Seleccione Municipios
                </Typography>

                <SelectFragMulti
                  options={Municipios2}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Municipio"}
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
                <Typography sx={{ fontFamily: "sans-serif", color:"white"  }}>
                  Relacionar Municipios
                </Typography>
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Municipios Relacionados
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} >
            <div style={{ height: 300, width: "100%" }}>
              <MUIXDataGridSimple columns={columns} rows={data} />
              </div>
            </Grid>
          </Grid>
          </Box>
        </DialogContent>

      </Dialog>
    </div>
  );
};

export default UsuariosMunicipios;
