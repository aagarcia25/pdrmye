import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  DialogActions,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  ButtonGroup,
  Container,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import AddIcon from "@mui/icons-material/Add";

import { CatalogosServices } from "../../../../../services/catalogosServices";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import { AuthService } from "../../../../../services/AuthService";
import Slider from "../../../Slider";
import { SendToMobileOutlined } from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getUser } from "../../../../../services/localStorage";

const FideicomisoConfig = ({
  open,
  handleClose,
  dt,
}: {
  open: boolean;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [idMun, setIdMun] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [data, setData] = useState([]);
  const [openSlider, setOpenSlider] = useState(false);
  const [nombre, setNombre] = useState<string>();
  const [porcentaje, setPorcentaje] = useState<number>();
  const [claveBan, setClaveBan] = useState<string>();
  const [cuenta, setCuenta] = useState<string>();
  const [municipio, setMunicipio] = useState<string>();
  const [modo, setModo] = useState<string>("visualizar");



  //Valores de chequeo de los Switch

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
    }, {
      field: "deleted",
      hide: true,
    }, {
      field: "IdMun",
      hide: true,
    }, {
      field: "Nombre",
      headerName: "Nombre",
      width: 500,
    }, {
      field: "Porcentaje",
      headerName: "Porcentaje",
      width: 120,
    }, {
      field: "ClaveBancaria",
      headerName: "Clave Bancaria",
      width: 250,
    }, {
      field: "Cuenta",
      headerName: "cuenta",
      width: 250,
    },
    {
      field: "Acciones",
      headerName: "Acciones",
      description: "Relacionar Roles",
      sortable: false,
      width: 400,
      renderCell: (v) => {
        return (
 
          <Box>
            TE
           
          </Box>
        );

      },
    },
  ];

  const handleSend = () => {
  };


  const handleNuevoFideicomiso = () => {
    setModo("nuevo");

  };


  const agregar = () => {
    if (
      nombre === null ||
      porcentaje === null ||
      cuenta === null ||
      claveBan === null) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    }else{
      let dat = {
        NUMOPERACION: 1,
        IDMUN: idMun,
        CHUSER: user.id,
        NOMBRE: nombre,
        PORCENTAJE: porcentaje,
        CLAVEBANCARIA: claveBan,
        CUENTA: cuenta,
      };
      CatalogosServices.MunFideicomiso(dat).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Registro Agregado!",
          });
          console.log("Sé pudo agregar");
        } else {
          Alert.fire({
            title: "Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
          console.log("No se pudo agregar");
        }
      });
    }
  };

  const editar = (data: any) => {
    CatalogosServices.MunFideicomiso(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
        console.log("Sé pudo editar");
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        console.log("No se pudo editar");
      }
    });
  };

  const consulta = (data: any) => {
    setOpenSlider(true);
    CatalogosServices.MunFideicomiso(data).then((res) => {
      setData(res.RESPONSE);
      console.log(res)
      setOpenSlider(false);
    });

  };

  useEffect(() => {
    console.log(user);
    setModo("visualizar")
    setMunicipio(dt?.row?.Nombre)
    consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });
    console.log(dt.row)
    if (dt === "") {
    } else {
      //SE PINTAN LOS CAMPOS
      setIdMun(dt?.row?.id);
    }
  }, [dt]);

  return (
    <Dialog open={open} fullScreen={true} >
      <Slider open={openSlider} />

      <DialogContent>
        <Box>
          <DialogActions>
            <button className="cerrar" onClick={() => handleClose()}>
              <h2>X</h2>        </button>
          </DialogActions>

          <Grid
            container

          >
            <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
              <Typography
                sx={{ textAlign: "center", fontFamily: "MontserratMedium", fontSize: "4vw", color: "#000000", }}>
                <p></p> Municipio: {municipio}
              </Typography>
            </Grid>

          </Grid>
          <ButtonGroup>
            {modo == "visualizar" ?
              <Tooltip title="Agregar">
                <ToggleButton value="check" onClick={() => { handleNuevoFideicomiso() }}>
                  <AddIcon />
                </ToggleButton>
              </Tooltip>
              : ""}

            {modo == "nuevo" ?
              <Tooltip title="Regresar">
                <ToggleButton value="check" onClick={() => { setModo("visualizar") }}>
                  <ArrowBackIosIcon />
                </ToggleButton>
              </Tooltip>

              : ""}

          </ButtonGroup>
          {(modo == "visualizar") ?
            <Grid
              container
              sx={{ width: "100%", height: "100%", bgcolor: "rgb(255,255,255)", boxShadow: 50, p: 2, borderRadius: 3, }} >

              <Grid item xs={12} sx={{ width: "100%", height: 300, }}>
                <MUIXDataGridSimple columns={columns} rows={data} />
              </Grid>
            </Grid>
            : ""}
        </Box>

        {(modo == "nuevo") ?
          <Grid
            container
            sx={{ width: "100%", height: "100%", bgcolor: "rgb(255,255,255)", boxShadow: 50, p: 2, borderRadius: 3, }} >

            <Grid item xs={12} sx={{ width: "100%", height: 300, }}>
              <Container maxWidth="sm">
                <TextField
                  required
                  margin="dense"
                  label="Nombre"
                  value={nombre}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNombre(v.target.value)}
                  error={!nombre ? true : false}
                  InputProps={{}}
                />
                <TextField
                  required
                  margin="dense"
                  label="Porcentaje"
                  value={porcentaje}
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setPorcentaje(Number(v.target.value))}
                  error={!porcentaje ? true : false}
                  InputProps={{}}
                />
                <TextField
                  required
                  margin="dense"
                  label="Cuenta"
                  value={cuenta}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setCuenta(v.target.value)}
                  error={!cuenta ? true : false}
                  InputProps={{}}
                />
                <TextField
                  required
                  margin="dense"
                  label="Clave Bancaria"
                  value={claveBan}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClaveBan(v.target.value)}
                  error={!claveBan ? true : false}
                  InputProps={{}}
                />
                <DialogActions>

                  <button className="guardar" onClick={() => agregar()}>
                    Guardar
                  </button>
                </DialogActions>
              </Container>

            </Grid>
          </Grid>
          : ""}

      </DialogContent>



    </Dialog>
  );
};

export default FideicomisoConfig;


