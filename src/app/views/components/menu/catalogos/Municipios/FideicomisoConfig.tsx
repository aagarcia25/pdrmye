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
  TextField,
  IconButton,
  Button,
  RadioGroup,
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import ModalForm from "../../../componentes/ModalForm";
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
  const [nombre, setNombre] = useState<string>("");
  const [porcentaje, setPorcentaje] = useState<string>('0');
  const [claveBan, setClaveBan] = useState<string>("");
  const [claveSireGob, setClaveSiregob] = useState<string>("");
  const [cuenta, setCuenta] = useState<string>("");
  const [cuentaValid, setCuentaValid] = useState<boolean>(false);
  const [claveValid, setClaveValid] = useState<boolean>(false);
  const [cuentaError, setCuentaError] = useState<string>();
  const [claveError, setClaveError] = useState<string>();
  const [municipio, setMunicipio] = useState<string>("");
  const [modo, setModo] = useState<string>("visualizar");
  const [monex, setMonex] = useState('0');



  //Valores de chequeo de los Switch

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
      hide: true
    }, {
      field: "deleted",
      hideable: false,
      hide: true
    },
    {
      field: "IdMun",
      hide: true,
      hideable: false,

    },
    {
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title={"Editar Fideicomiso"}>
              <IconButton onClick={() => handleEdit(v)}>
                <ModeEditOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Eliminar Fideicomiso"}>
              <IconButton onClick={() => handleDelete(v)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );

      },
    },
    { field: "FechaCreacion", headerName: "Fecha de Creación", description: "Fecha de Creación", width: 200, },
    { field: "CreadoP", headerName: "Creador Por", description: "Creador Por", width: 300, },
    { field: "ClaveSiregob", headerName: "Clave", description: "Clave", width: 150, },
    { field: "Nombre", headerName: "Nombre", description: "Nombre", width: 500, },
    { field: "Porcentaje", headerName: "Porcentaje", description: "Porcentaje", width: 120, },
    { field: "ClaveBancaria", headerName: "Clave Bancaria", description: "Clave Bancaria", width: 250, },
    { field: "Cuenta", headerName: "Cuenta", description: "Cuenta", width: 250, },

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
          title: "¡Registro Eliminado!",
        });
        consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
    setNombre("");
    setPorcentaje("");
    setCuenta("");
    setClaveBan("");
    setModo("visualizar");
    setOpenSlider(false);
  };


  const handleEdit = (v: any) => {
    setOpenSlider(true);
    setModo("editar");
    setIdMun(v?.row?.IdMun);
    setIdFide(v?.row.id);
    setNombre(v?.row?.Nombre);
    setPorcentaje(v?.row?.Porcentaje);
    setCuenta(v?.row?.Cuenta);
    setClaveBan(v?.row?.ClaveBancaria);
    setClaveSiregob(v?.row?.ClaveSiregob);
    setOpenSlider(false);
    v?.row?.Cuenta ? setClaveValid(true) : setClaveValid(false);
    v?.row?.ClaveBancaria ? setCuentaValid(true) : setCuentaValid(false);
    consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });

  };


  const handleNuevoFideicomiso = () => {
    setModo("nuevo");
    setNombre("");
    setPorcentaje("0");
    setCuenta("");
    setClaveBan("");
    setClaveSiregob("");
  };

  const handleCloseFideicomiso = () => {
    if (modo === "editar") {
      setModo("visualizar");
    }
    else if (modo === "visualizar") {
      handleClose();
    }
    else if (modo === "nuevo") {
      setModo("visualizar");
    }

  };


  const agregar = () => {

    if (
      claveValid === false
      || cuentaValid === false
      || nombre === null
      || (Number(porcentaje) >= 100 && Number(porcentaje) <= 0)
      || porcentaje === null
      || cuenta === null
      || claveBan === null
      || claveSireGob === null) {
      AlertS.fire({
        title: "¡Error!",
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
        CLAVESIREGOB: claveSireGob,
        PORCENTAJE: porcentaje,
        CLAVEBANCARIA: claveBan,
        CUENTA: cuenta,
      };
      CatalogosServices.MunFideicomiso(dat).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro" + (modo === "nuevo" ? "Agregado!" : "Editado!"),
          });
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });
      setNombre("");
      setPorcentaje("0");
      setCuenta("");
      setClaveBan("");
      setModo("visualizar");
      setClaveSiregob("");
      consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });
    }
  };


  const consulta = (data: any) => {
    setOpenSlider(true);
    CatalogosServices.MunFideicomiso(data).then((res) => {
      setData(res.RESPONSE);
      setOpenSlider(false);
    });

  };


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonex((event.target as HTMLInputElement).value);
  };
  useEffect(() => {
    setModo("visualizar")
    setMunicipio(dt?.row?.Nombre)
    setMonex(dt?.row?.Monex ? dt?.row?.Monex : 0)
    consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });
    if (dt === "") {
    } else {
      setIdMun(dt?.row?.id);
    }
  }, [dt]);

  return (
    <ModalForm title={"Municipio:" + municipio} handleClose={handleCloseFideicomiso} >
      <Slider open={openSlider} />
      <Grid container direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingLeft: "1%", paddingRight: "1%", paddingTop: "1%" , paddingBottom:"1%"}}>
        <Grid item >
          <ButtonGroup>
            {modo === "visualizar" ?
              <Tooltip title="Agregar">
                <ToggleButton
                className="agregarToggleButton"
                value="check" onClick={() => { handleNuevoFideicomiso() }}>
                  <AddIcon />
                </ToggleButton>
              </Tooltip>
              : ""}

            {modo === "nuevo" || modo === "editar" ?
              <Tooltip title="Regresar">
                <ToggleButton
                className="cancelarToggleButton"
                value="check" onClick={() => { setModo("visualizar") }}>
                  <ArrowBackIosIcon />
                </ToggleButton>
              </Tooltip>

              : ""}
          </ButtonGroup>
        </Grid >
       
      </Grid>

      {(modo === "visualizar") ?

        <Grid item xs={12} sx={{ bgcolor: "white", width: "100%", height: 800, }}>
          <Box boxShadow={2} sx={{ width: "100%", height: "97%" }}>
            <MUIXDataGridSimple columns={columns} rows={data} />
          </Box>
        </Grid>
        : ""}

      {(modo === "nuevo" || modo === "editar") ?


        <Grid
          container
          paddingTop={2}
          direction="column"
          justifyContent="center"
          alignItems="center" 
          boxShadow={2}>
          <Grid item xs={12} md={5} paddingTop={2}>
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
              inputProps={{ maxLength: 150 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              margin="dense"
              label="Clave Fideicomiso"
              value={claveSireGob}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setClaveSiregob(v.target.value)}
              error={claveSireGob === ""}
              inputProps={{ maxLength: 18 }}
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
              onChange={(v) => setPorcentaje(v.target.value)}
              inputProps={{ maxLength: 20 }}
              error={Number(porcentaje) <= 0 || Number(porcentaje) >= 100}
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
              error={cuentaValid === false || cuenta === ""}
              inputProps={{ maxLength: 10 }}
              InputLabelProps={{ shrink: true }}
            />
            <Typography variant="body2" > {cuentaError} </Typography>
            <TextField
              required
              margin="dense"
              label="Clave Bancaria"
              value={claveBan}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => validateCount(e, 1)}
              error={claveValid === false || claveBan === ""}
              inputProps={{ maxLength: 18 }}
              InputLabelProps={{ shrink: true }}
            />
            <Typography variant="body2" > {claveError} </Typography>
            <label> Monex</label> <br />
            <RadioGroup
              row
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={monex}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="0" control={<Radio color="error" />} label="No Aplica" />
              <FormControlLabel value="1" control={<Radio color="success" />} label="Si Aplica" />

            </RadioGroup>

            <DialogActions>
              <Grid container justifyContent="center" alignItems="center" alignContent="center">
                <Grid item paddingTop="5%" xs={6}>
                  <Button
                  disabled={
                    !nombre||
                    !claveSireGob||
                    (Number(porcentaje) <= 0 || Number(porcentaje) >= 100)||
                    (cuentaValid === false || cuenta === "")||
                    (claveValid === false || claveBan === "")
                  }
                    onClick={() => agregar()}
                    className="agregar"
                    fullWidth variant="outlined">
                    {modo === "nuevo" ? "Guardar" : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>

        </Grid>

        : ""}
    </ModalForm >
  );
};

export default FideicomisoConfig;


