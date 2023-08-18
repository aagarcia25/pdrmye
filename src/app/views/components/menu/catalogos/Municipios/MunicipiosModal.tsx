import { useEffect, useState } from "react";
import {
  Box,
  InputLabel,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { getUser } from "../../../../../services/localStorage";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModalForm from "../../../componentes/ModalForm";

const MunFacturacionModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [claveEstado, setClaveEstado] = useState("");
  const [mam, setMam] = useState("");
  const [descentralizado, setDescentralizado] = useState("");
  const [nombreCorto, setNombreCorto] = useState("");
  const [ordenSFTGNL, setOrdenSFTGNL] = useState("");
  const [clavePSIREGOB, setClavePSIREGOB] = useState("");
  const [claveDSIREGOB, setClaveDSIREGOB] = useState("");

  const [claveINEGI, setClaveINEGI] = useState("");
  const [artF1, setArtF1] = useState("");
  const [artF2, setArtF2] = useState("");
  const [artF3, setArtF3] = useState("");
  const user: USUARIORESPONSE= JSON.parse(String(getUser()));
  //Valores de chequeo de los Switch


  const [checkedMam, setCheckedMam] = useState(dt?.row?.MAM === 1 ? true : false);
  const [checkedDescentralizado, setCheckedDescentralizado] = useState(dt?.row?.Descentralizado === 1 ? true : false);
  const [checkedArtF1, setCheckedArtF1] = useState(dt?.row?.ArtF1 === '1' ? true : false);
  const [checkedArtF2, setCheckedArtF2] = useState(dt?.row?.ArtF2 === '1' ? true : false);
  const [checkedArtF3, setCheckedArtF3] = useState(dt?.row?.ArtF3 === '1' ? true : false);

  const textoDeAfirmacion = "SI";
  const textoDeNegacion = "NO";

  const toggleCheckedMam = () => {
    setCheckedMam((prev) => !prev);
    if (checkedMam === true) {
      setMam("0");
    } else {
      setMam("1");
    }
  };

  const toggleCheckedDescentralizado = () => {
    setCheckedDescentralizado((prev) => !prev);
    if (checkedDescentralizado === true) {
      setDescentralizado("0");
    } else {
      setDescentralizado("1");
    }
  };

  const toggleCheckedArtF1 = () => {
    setCheckedArtF1((prev) => !prev);
    if (checkedArtF1 === true) {
      setArtF1("0");
    } else {
      setArtF1("1");
    }
  };

  const toggleCheckedArtF2 = () => {
    setCheckedArtF2((prev) => !prev);
    if (checkedArtF2 === true) {
      setArtF2("0");
    } else {
      setArtF2("1");
    }
  };

  const toggleCheckedArtF3 = () => {
    setCheckedArtF3((prev) => !prev);
    if (checkedArtF3 === true) {
      setArtF3("0");
    } else {
      setArtF3("1");
    }
  };

  const handleSend = () => {

    if (
      nombre === "" ||
      claveEstado === "" ||
      mam === "" ||
      descentralizado === "" ||
      nombreCorto === "" ||
      ordenSFTGNL === "" ||
      clavePSIREGOB === "" ||
      claveDSIREGOB === "" ||
      claveINEGI === "" ||
      artF1 === "" ||
      artF2 === "" ||
      artF3 === ""
    ) {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {

      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        NOMBRE: nombre,
        CLAVEESTADO: claveEstado,
        MAM: mam,
        DESCENTRALIZADO: descentralizado,
        NOMBRECORTO: nombreCorto,
        ORDENSFTGNL: ordenSFTGNL,
        CLAVEPSIREGOB: clavePSIREGOB,
        CLAVEDSIREGOB: claveDSIREGOB,
        CLAVEINEGI: claveINEGI,
        ARTF1: artF1,
        ARTF2: artF2,
        ARTF3: artF3,
        DELETED: 0,
      };
      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      agregar(data);
    } else if (tipo === 2) {
      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.municipios(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const editar = (data: any) => {
    CatalogosServices.municipios(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    if (dt === "") {
    } else {
      //SE PINTAN LOS CAMPOS
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setClaveEstado(dt?.row?.ClaveEstado? dt?.row?.ClaveEstado:"");
      setMam(dt?.row?.MAM);
      setDescentralizado(dt?.row?.Descentralizado===0? "0":"1");
      setNombreCorto(dt?.row?.NombreCorto?dt?.row?.NombreCorto:"");
      setOrdenSFTGNL(dt?.row?.OrdenSFTGNL?dt?.row?.OrdenSFTGNL:"");
      setClavePSIREGOB(dt?.row?.ClavePSIREGOB?dt?.row?.ClavePSIREGOB:"");
      setClaveDSIREGOB(dt?.row?.ClaveDSIREGOB?dt?.row?.ClaveDSIREGOB:"");
      setClaveINEGI(dt?.row?.ClaveINEGI?dt?.row?.ClaveINEGI:"");
      setArtF1(dt?.row?.ArtF1? dt?.row?.ArtF1:"");
      setArtF2(dt?.row?.ArtF2? dt?.row?.ArtF2:"");
      setArtF3(dt?.row?.ArtF3? dt?.row?.ArtF3:"");

    }
  }, [dt]);

  return (
    <ModalForm title={modo} handleClose={handleClose}>

      <Grid container direction="row" justifyContent="center" alignItems="center"  >
        <Grid item alignItems="center" justifyContent="center" xs={12} md={12} sx={{ padding:"2%" }}>
         

          <Box component={Grid} boxShadow={2} container direction="row"  xs={12} md={12} paddingTop={3} paddingBottom={3} > 
          <Box component={Grid} item direction="row" xs={12} md={2} ></Box>
          <Box component={Grid} item direction="row" xs={12} md={4} >
          <TextField
            required
            margin="dense"
            id="nombre"
            label="Nombre"
            value={nombre}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setNombre(v.target.value)}
            error={nombre === "" ? true : false}
            InputProps={{}}
          />

          <TextField
            required
            margin="dense"
            id="claveEstado"
            label="Clave del Estado"
            value={claveEstado}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setClaveEstado(v.target.value)}
            error={claveEstado === "" ? true : false}
            InputProps={{}}
          />

          </Box>
          <Box component={Grid} item direction="row" xs={12} md={2} ></Box>
          <Box component={Grid} item direction="row" xs={12} md={4}>

          {
            //Switch de si y no en vez de 1 y 0
          }
          <FormGroup>
            <InputLabel>Municipio en área metropolitana</InputLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={checkedMam}
                  onChange={toggleCheckedMam}
                  color="default"
                />
              }
              label={checkedMam ? textoDeAfirmacion : textoDeNegacion}
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>Municipio descentralizado</InputLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={checkedDescentralizado}
                  onChange={toggleCheckedDescentralizado}
                  color="default"
                />
              }
              label={
                checkedDescentralizado ? textoDeAfirmacion : textoDeNegacion
              }
            />
          </FormGroup>
          </Box>
          </Box>

          <Box component={Grid} item direction="row" height={12} xs={12} md={12} ></Box>
          <Box component={Grid} boxShadow={2} container direction="row" xs={12} md={12} paddingTop={3} paddingBottom={3} > 
          <Box component={Grid} item direction="row" xs={12} md={2}></Box>
          <Box component={Grid} item direction="row" xs={12} md={4}>
          
          <TextField
            required
            margin="dense"
            id="nombreCorto"
            label="Nombre Corto"
            value={nombreCorto}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setNombreCorto(v.target.value)}
            error={nombreCorto === "" ? true : false}
            InputProps={{}}
          />
          <TextField
            required
            margin="dense"
            id="ordenSFTGNL"
            label="Orden SFTGNL"
            value={ordenSFTGNL}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setOrdenSFTGNL(v.target.value)}
            error={ordenSFTGNL === "" ? true : false}
            InputProps={{}}
          />
          <TextField
            required
            margin="dense"
            id="clavePSIREGOB"
            label="Clave Proveedor SIREGOB"
            value={clavePSIREGOB}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setClavePSIREGOB(v.target.value)}
            error={clavePSIREGOB === "" ? true : false}
            InputProps={{}}
          />
          <TextField
            required
            margin="dense"
            id="clave Deudor SIREGOB"
            label="Clave Deudor SIREGOB"
            value={claveDSIREGOB}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setClaveDSIREGOB(v.target.value)}
            error={claveDSIREGOB === "" ? true : false}
            InputProps={{}}
          />
          <TextField
            required
            margin="dense"
            id="claveINEGI"
            label="Clave INEGI"
            value={claveINEGI}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setClaveINEGI(v.target.value)}
            error={claveINEGI === "" ? true : false}
            InputProps={{}}
          />
          </Box>
 
         <Box component={Grid} item direction="row" xs={12} md={2}  ></Box>
          <Box component={Grid} item direction="row" xs={12} md={4}  >
          <Box component={Grid}  container direction="row" xs={12} md={12} > 
          <Box component={Grid}  item direction="row" xs={12} md={6} > 
          <FormGroup>
            <InputLabel>¿Aplica el ARTF1?</InputLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={checkedArtF1}
                  onChange={toggleCheckedArtF1}
                  color="default"
                />
              }
              label={checkedArtF1 ? textoDeAfirmacion : textoDeNegacion}
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>¿Aplica el ARTF2?</InputLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={checkedArtF2}
                  onChange={toggleCheckedArtF2}
                  color="default"
                />
              }
              label={checkedArtF2 ? textoDeAfirmacion : textoDeNegacion}
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>¿Aplica el ARTF3?</InputLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={checkedArtF3}
                  onChange={toggleCheckedArtF3}
                  color="default"
                />
              }
              label={checkedArtF3 ? textoDeAfirmacion : textoDeNegacion}
            />
          </FormGroup>
          </Box>
          

          <Box component={Grid}  item direction="row" xs={12} md={12} sx={{ height:"100px" }}> </Box>
          <Box component={Grid}  item direction="row" xs={12} md={8} > </Box>
          <Box component={Grid}  item direction="row" xs={12} md={4} > 
          <button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()} >
            {tipo === 1 ? "Agregar" : "Editar"}
          </button> 
          </Box>
          </Box>
          </Box>
          </Box>
        </Grid>
      </Grid>

    </ModalForm>
  );
};

export default MunFacturacionModal;
