 import { useEffect, useState } from "react";
 import {
    Box,
    Checkbox,
    Grid,
    Modal,
    Typography,
  } from "@mui/material";
 
  import { AuthService } from "../../../../../services/AuthService";
  import { GridColDef } from '@mui/x-data-grid';
  import { Toast } from "../../../../../helpers/Toast";
  import { Alert } from "../../../../../helpers/Alert";
  import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
  import Slider from "../../../Slider";
  
  
  const AsignarPermisoRol = ({
    id,
    dt,
    open,
    handleCloseAsignar,
    handleClose,
  }: {
    id:string;
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
        TIPO:1,
        IDPERMISO: v.row.id,
        IDMENU: dt?.row?.id,
        IDROL:id,
      }
      AuthService.menuPermisosRelacionar(data).then((res) => {
        setData(res.RESPONSE);
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Menu Eliminado!",
          });
          consulta({CHID: dt?.row?.id });
        } else {
          Alert.fire({
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
      consulta({ CHID: dt?.row?.id });
      console.log(dt);
    }, []);
  
    return (
      <div>
        <Slider open={openSlider} ></Slider>
        <Box >
          <Modal open={open}>
            <Grid
              container
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50vw",
                height: "60vh",
                bgcolor: "rgb(255,255,255)",
                boxShadow: 50,
                p: 2,
                borderRadius: 3,
              }}
            >
              <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "MontserratBold",
                    fontSize: "2vw",
                    color: "#454545",
                  }}
                >
                  Asignar Permisos al Rol
                </Typography>
              </Grid>
             
              <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                <Typography
                  sx={{
                    textAlign: "left",
                    fontFamily: "MontserratMedium",
                    fontSize: "1.5vw",
                    color: "#808080",
                  }}
                >
                  Para Asignar el Permiso solo Marcar la Casilla
                </Typography>
              </Grid>
              <button
                  className="atras"
                  onClick={() => handleCloseAsignar()}
                >
                  Regresar
                </button>
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
              <Grid md={12}
                sx={{
                  display: "flex",
                  alignItems: "right",
                  justifyContent: "right",
                  mt: "2vh",
  
                }}
              >
                 <button
                  className="cerrar"
                  onClick={() => handleClose("")}
                >
                  Salir
                </button>
              </Grid>
            </Grid>
          </Modal>
        </Box>
      </div>
    );
  };
  export default AsignarPermisoRol;
  