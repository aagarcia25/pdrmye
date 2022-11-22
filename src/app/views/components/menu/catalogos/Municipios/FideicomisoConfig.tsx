import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  DialogActions,
  Grid,
  ToggleButton,
  Tooltip,
  Typography,
  ButtonGroup,
  Container,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { CatalogosServices } from "../../../../../services/catalogosServices";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getUser } from "../../../../../services/localStorage";
import validator from "validator";

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
  const [idFide, setIdFide] = useState<String>();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [data, setData] = useState([]);
  const [openSlider, setOpenSlider] = useState(false);
  const [nombre, setNombre] = useState<string>();
  const [porcentaje, setPorcentaje] = useState<number>(0);
  const [claveBan, setClaveBan] = useState<string>();
  const [cuenta, setCuenta] = useState<string>();
  const [cuentaValid, setCuentaValid] = useState<boolean>();
  const [claveValid, setClaveValid] = useState<boolean>();
  const [cuentaError, setCuentaError] = useState<string>();
  const [claveError, setClaveError] = useState<string>();


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
            <IconButton onClick={() => handleEdit(v)}>
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(v)}>
              <DeleteForeverIcon />
            </IconButton>

          </Box>
        );

      },
    },
  ];

  const validateCount = (e: any, tipo: number) => {

    var valor = e.target.value
    if (tipo === 1) {
      ///// clave
      setClaveBan(valor)
      if (validator.isNumeric(valor)) {
        setClaveError('')
        setClaveValid(true);
      } else {
        setClaveError('Ingrese Numeros')
        setClaveValid(false);
      }


    } else
      if (tipo === 2) {
        ///// cuenta
        setCuenta(valor)
        if (validator.isNumeric(valor)) {
          setCuentaError('')
          setCuentaValid(true);
        } else {
          setCuentaError('Ingrese Numeros')
          setCuentaValid(false);
        }


      }
  }

  const handleDelete = (v: any) => {
    setOpenSlider(true);
    let dat = {
      CHID: v?.row.id,
      NUMOPERACION: 3,
      CHUSER: user.id,
    };
    CatalogosServices.MunFideicomiso(dat).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Eliminado!",
        });
        consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
    setNombre("");
    setPorcentaje(0);
    setCuenta("");
    setClaveBan("");
    setModo("visualizar");

    setOpenSlider(false);
  };


  const handleEdit = (v: any) => {
    //console.log(v?.row)
    setOpenSlider(true);
    setModo("editar");
    setIdMun(v?.row?.IdMun);
    setIdFide(v?.row.id);
    setNombre(v?.row?.Nombre);
    setPorcentaje(v?.row?.Porcentaje);
    setCuenta(v?.row?.Cuenta);
    setClaveBan(v?.row?.ClaveBancaria);
    setOpenSlider(false);
    consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });

  };


  const handleNuevoFideicomiso = () => {
    setModo("nuevo");
  };


  const agregar = () => {

    if (
      claveValid === false ||
      cuentaValid === false ||
      nombre === null ||
      Number(porcentaje) >= 100 ||
      porcentaje === null ||
      cuenta === null ||
      claveBan === null) {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Verificar los Campos",
        icon: "error",
      });
    } else {
      let dat = {
        CHID: idFide,
        NUMOPERACION: modo === "nuevo" ? 1 : 2,
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
            title: "Registro" + (modo === "nuevo" ? "Agregado!" : "Editado!"),
          });
          //console.log("Sé pudo agregar");
        } else {
          AlertS.fire({
            title: "Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
          //console.log("No se pudo agregar");
        }
      });
      setNombre("");
      setPorcentaje(0);
      setCuenta("");
      setClaveBan("");
      setModo("visualizar");
      consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });
    }
  };


  const consulta = (data: any) => {
    setOpenSlider(true);
    CatalogosServices.MunFideicomiso(data).then((res) => {
      setData(res.RESPONSE);
      //console.log(res)
      setOpenSlider(false);
    });

  };

  useEffect(() => {
    //console.log(user);
    setModo("visualizar")
    setMunicipio(dt?.row?.Nombre)
    consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });
    //console.log(dt.row)
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

          <Grid container >
            <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
              <Typography
                sx={{ textAlign: "center", fontFamily: "MontserratMedium", fontSize: "3vw", color: "#000000", }}>
                Municipio: {municipio}
              </Typography>
            </Grid>


          <Grid container direction="row"
            justifyContent="space-between"
            alignItems="center">
            <Grid item >
              <ButtonGroup>
                {modo === "visualizar" ?
                  <Tooltip title="Agregar">
                    <ToggleButton value="check" onClick={() => { handleNuevoFideicomiso() }}>
                      <AddIcon />
                    </ToggleButton>
                  </Tooltip>
                  : ""}

                {modo === "nuevo" ?
                  <Tooltip title="Regresar">
                    <ToggleButton value="check" onClick={() => { setModo("visualizar") }}>
                      <ArrowBackIosIcon />
                    </ToggleButton>
                  </Tooltip>

                  : ""}
              </ButtonGroup>
            </Grid>
            <Grid item >
              <ButtonGroup>
                <Tooltip title="Cerrar">
                  <ToggleButton value="check" color="error" onClick={() => { handleClose() }}>
                    <CloseIcon />
                  </ToggleButton>
                </Tooltip>

              </ButtonGroup>
            </Grid>
          </Grid>

          {(modo === "visualizar") ?

              <Grid item xs={12} sx={{ width: "100%", height: 300, }}>
                <MUIXDataGridSimple columns={columns} rows={data} />
              </Grid>
            : ""}

        {(modo === "nuevo" || modo === "editar") ?
   

            <Grid item xs={12} sx={{ width: "100%" }}>
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
                  error={String(nombre).length === 0}
                  InputLabelProps={{ shrink: true }}
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
                  error={!porcentaje ? true : false || porcentaje >= 100}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  required
                  margin="dense"
                  label="Cuenta"
                  value={cuenta}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => validateCount(e, 2)}
                  error={cuentaValid === false || !cuenta ? true : false}
                  inputProps={{ maxLength: 10 }}
                  InputLabelProps={{ shrink: true }}
                />
                <label>{cuentaError}</label>
                <TextField
                  required
                  margin="dense"
                  label="Clave Bancaria"
                  value={claveBan}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => validateCount(e, 1)}
                  error={claveValid === false || !claveBan ? true : false}
                  inputProps={{ maxLength: 18 }}
                  InputLabelProps={{ shrink: true }}
                />
                <label>{claveError}</label>
                <DialogActions>

                  <Button className="guardar" onClick={() => { agregar() }}>
                    Guardar
                  </Button>
                  <Button className="regresar" onClick={() => { setModo("visualizar") }}>
                    Cancelar
                  </Button>
                </DialogActions>
              </Container>

            </Grid>
         
          : ""}
          </Grid>
      </DialogContent>
    </Dialog >
  );
};

export default FideicomisoConfig;


