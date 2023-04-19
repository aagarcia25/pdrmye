
import React, { useEffect, useState } from "react";
import {
  Button,
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
import ModalForm from "../../../componentes/ModalForm";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
const UsuarioOrg = ({
  handleClose,
  dt,
}: {
  handleClose: Function;
  dt: any;
}) => {



  const [openSlider, setOpenSlider] = useState<boolean>(true);
  const [idOrg, setIdOrg] = useState<SelectValues[]>([]);
  const [organismos, setOrganismos] = useState<[]>([]);
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));


  const columns: GridColDef[] = [
    {
      field:  "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",  disableExport: true,
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
    { field: "Descripcion", headerName: "Descripción", description: "Descripción",width: 1000 },
  ];

  const loadFilter = () => {
    
    let data = { NUMOPERACION: 39, CHUSER: dt?.id };
    CatalogosServices.SelectIndex(data).then((res) => {
      setIdOrg([]);
      setOrganismos(res.RESPONSE);
    });
  };

  const handleDel = (v: any) => {
    console.log(v)
    console.log(dt)
    let data = {
      TIPO: 2,
      IDUSUARIO: dt?.id,
      ID: v.id
    };
    AuthService.RelacionarUsuarioOrg(data).then((res) => {
      consulta();
      setIdOrg([]);
      setOrganismos([]);
      loadFilter();
    });
  };


  const handleFilterChange1 = (v: SelectValues[]) => {
    setIdOrg(v);
  };


  const handleOrganismos = () => {
    let data = {
      TIPO: 1,
      OBJS: idOrg,
      IDUSUARIO: dt.id
    };
    console.log(data);
    setOpenSlider(true);
    AuthService.RelacionarUsuarioOrg(data).then((res) => {
      console.log(res.RESPONSE);
      setOpenSlider(false);
      consulta();
      loadFilter();
    });
  };



  const consulta = () => {
    //console.log(dt)
    let data = {
      CHID: dt?.id,
      TIPO: 1,
    };
    AuthService.usuarioOrg(data).then((res) => {
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

      <ModalForm title={("Organismos relacionados a: "+ dt?.Nombre+" "+ dt?.ApellidoPaterno+" "+dt?.ApellidoMaterno)} handleClose={handleClose}>
        <DialogContent dividers={true} >
          <Box boxShadow={3}>
            <Grid container spacing={1} sx={{ padding: "1%" }}>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{ margin: 0, }}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Seleccione Organismo
                  </Typography>

                  <SelectFragMulti
                    options={organismos}
                    onInputChange={handleFilterChange1}
                    placeholder={"Seleccione Organismo"}
                    label={""}
                    disabled={false}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => handleOrganismos()}
                >
                  <Typography sx={{ fontFamily: "sans-serif", color: "white" }}>
                    Relacionar Organismos
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Organismos Relacionados
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
      </ModalForm>

    </div>
  );
};

export default UsuarioOrg;
