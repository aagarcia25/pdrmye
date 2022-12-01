import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { getUser } from "../../../services/localStorage";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import PersonIcon from "@mui/icons-material/Person";
import { DialogCambiarImagen } from "./DialogCambiarImagen";
import { AuthService } from "../../../services/AuthService";
import { Toast } from "../../../helpers/Toast";
import validator from 'validator';
import { COLOR } from "../../../styles/colors";

export const Perfil = () => {
  const [user, setUser] = useState<RESPONSE>(JSON.parse(String(getUser())));

  //Abrir Dialog de imagen
  const [openDialog, setOpenDialog] = useState(false)
  const [nombre, setNombre] = useState(user.Nombre);
  const [mensajeError, setMensajeError] = useState("*Ingrese Numeros*");
  const [celValid, setCelVAlid] = useState<boolean>();
  const [telValid, setTelValid] = useState<boolean>();
  const [extValid, setExtValid] = useState<boolean>();
  const [nombreUsuario, setNombreUsuario] = useState(user.NombreUsuario);
  const [apellidoPaterno, setApellidoPaterno] = useState(user.ApellidoPaterno);
  const [apellidoMaterno, setApellidoMaterno] = useState(user.ApellidoMaterno);
  const [correoElectronico, setCorreoElectronico] = useState(user.CorreoElectronico);
  const [telefono, setTelefono] = useState(user?.Telefono? user?.Telefono : "");
  const [extencion, setExtencion] = useState(user?.extencion ? user?.extencion : "");
  const [puesto, setPuesto] = useState(user.Puesto ? user.Puesto : "");
  const [celular, setCelular] = useState(user?.Celular ? String(user?.Celular) : "");
  const [tipo, setTipo] = useState("");
  const [departamento, setDepartamento] = useState(user.DEPARTAMENTOS[0]?.Descripcion);
  const [departamentos, setDepartamentos] = useState("");
  //CARD 1
  const [botonEdicionFoto, setBotonEdicionFoto] = useState("Editar");
  const [botonEdicionTodo, setBotonEdicionTodo] = useState("Editar");

  user.Nombre = nombre;
  const [openDialogConfirmacion, setOpenDialogConfirmacion] = useState(false);


  const handleCloseDialogImagen = () => {
    setOpenDialog(false);
  };
  const handleOpenDialogImagen = () => {
    setOpenDialog(true);
  };
  //PRIMER CARD FUNCIONES
  const onClickEditarFoto = () => {
    setBotonEdicionFoto("Guardar");
    // PERMITIR ABRIR ARCHIVOS Y SELECCIONAR UNO EL CUAL
    // LE MANDARÁ UN NUVO VALOR A LA IMAGEN QUE ESTA A
    // LA IZQUIERDA DE GUARDAR
    // HACER CONDICIÓON PARA MOSTRAR LA NUEVA IMAGEN
    // APARECER UN NUEVO BOTÓN QUE PONGA CANCELAR
    // Y CON ESE PAUSAR ACCIÓN DE MODIFICADO
    if (botonEdicionFoto === "Guardar") {
      setBotonEdicionFoto("Editar");
      // MANDAR TIPO OPERACION 2, revisar municipios para su creación
    }
  };

  const onClickEditar = () => {
    if (botonEdicionTodo === "Editar") {
      setBotonEdicionTodo("Guardar");
    } else
      setOpenDialogConfirmacion(true);
  };

  const validateCount = (valor: string, tipo: string) => {

    if (validator.isNumeric(valor)) {
      if (tipo === "cel") {
        setCelVAlid(true)
        setCelular(valor);

      } else if (tipo === "tel") {
        setTelValid(true);
        setTelefono(valor);

      } else if (tipo === "ext") {
        setExtValid(true);
        setExtencion(valor);

      }
    } else {
      setMensajeError("*Ingrese Solo Numeros*")
      if (tipo === "cel") {
        setCelVAlid(false)
        setCelular(valor);

      } else if (tipo === "tel") {
        setTelValid(false);
        setTelefono(valor);

      } else if (tipo === "ext") {
        setExtValid(false);
        setExtencion(valor);
      }
    }
  }

  const onClickGuardarCambios = () => {
    onClickCancelarEditarTodo();
    setOpenDialogConfirmacion(false);

    let dat = {
      NUMOPERACION: 5,
      CHUSER: user.id,
      CHID: user.id,
      UBICACION: puesto,
      PUESTO: puesto,
      EXTENCION: puesto
    };

    AuthService.adminUser(dat).then((res) => {

      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Datos actualizados.",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "No se actualizo la información.",
        });
      }

    });

  };
  const onClickCancelarEditarTodo = () => {

    setBotonEdicionTodo("Guardar");
    if (botonEdicionTodo === "Guardar") {
      setBotonEdicionTodo("Editar");
    }
    setTelefono((user?.Telefono)?user?.Telefono:"");
    setCelular(user?.Celular?user?.Celular:"");
    setPuesto(user.Puesto);
    setDepartamento(user?.DEPARTAMENTOS[0]?.Descripcion);
    setUser(JSON.parse(String(getUser())));
  };



  return (

    <Box sx={{
      //Principal
      width: "100%",
      height: "100%",
      backgroundColor: "#EEEEEE",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0",
      marginTop: ".5%",
    }}
    >
      <Box
        boxShadow={3}
        paddingBottom="2%"
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          justifyContent: "center",
          backgroundColor: "white",
          alignItems: "center"
        }}>

        <Box
          display="flex" flexDirection="row"
          sx={{
            width: "80%",
            height: "auto",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          {/* Imagen y tipo de usuario */}
          <Box paddingTop={3}>
            <Box boxShadow={3}
              onClick={() => {
                setOpenDialog(true)
              }}

              sx={{
                width: "7.4rem",
                height: "7.4rem",
                backgroundColor: "white",
                borderRadius: '50%',
                justifyContent: "center",
                cursor: "pointer",
              }}

            >
              {user.RutaFoto ? (
                <img
                  style={{
                    objectFit: "scale-down",
                    width: "100%",
                    height: "100%",
                    borderRadius: '50%',
                  }}
                  src={user.RutaFoto}
                />
              ) : (
                <PersonIcon

                  sx={{
                    width: "100%",
                    height: "100%",

                  }}
                />
              )}


            </Box>
            <DialogCambiarImagen open={openDialog} handleClose={handleCloseDialogImagen}></DialogCambiarImagen>

          </Box>

          {/* Informacion Basica */}
          <Box boxShadow={3} sx={{
            width: "90%",
            height: "12%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            mt: "2rem",
            borderRadius: "10px",
            // border: "1px solid black",
            bgcolor: "#051c2c",
          }}>

            <Typography sx={{
              width: "30%",
              fontFamily: "sans-serif",
              fontSize: "1rem",
              color: "#CCCCCC"
            }}
            > Nombre:
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", color: "white" }}>
                {nombre} </Typography>
            </Typography>

            <Typography sx={{
              width: "30%",
              fontFamily: "sans-serif",
              fontSize: "1rem",
              color: "#CCCCCC"
            }}
            > Apellido Paterno:
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", color: "white" }}>
                {apellidoPaterno} </Typography>
            </Typography>

            <Typography sx={{
              width: "30%",
              fontFamily: "sans-serif",
              fontSize: "1rem",
              color: "#CCCCCC"
            }}
            > Apellido Materno:
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", color: "white" }}>
                {apellidoMaterno} </Typography>
            </Typography>
          </Box>

          <Box sx={{
            height: "2%",
          }}> </Box>

          <Box boxShadow={2} sx={{
            width: "90%",
            height: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            borderRadius: "10px",
            bgcolor: "rgb(252,252,252)",
            flexDirection: "column"
          }}>

            <Typography align="center" variant="h5" sx={{ width: "100%", color: COLOR.azul, paddingTop: "2%" }}>
              Contacto y Ubicación
            </Typography>
            <br />
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid item xs={10}>
                <label className="negro">Departamento:</label>
                <label className="gris"> {departamento} </label>

              </Grid>
              <br />
              <Grid item xs={10}>
                <label className="negro">Correo electrónico:</label>
                <label className="gris"> {correoElectronico} </label>
              </Grid>
            </Grid>



            {botonEdicionTodo === "Editar" ?
              <>
                <Grid container direction="column" justifyContent="center" alignItems="center" >
                  <br />  <br />
                  <Grid item xs={10}>
                    <label className="negro">Telefono:</label>
                    <label className="gris"> {telefono? telefono:"Sin Informacion"} </label>
                  </Grid>
                  <br />
                  <Grid item xs={10}>
                    <label className="negro">Extencion:</label>
                    <label className="gris"> {extencion? extencion:"Sin Informacion"} </label>
                  </Grid>                  <br />
                  <Grid item xs={10}>
                    <label className="negro">Celular:</label>
                    <label className="gris"> {celular? celular:"Sin Informacion"} </label>
                  </Grid>
                  <br />
                  <Grid item xs={10}>
                    <label className="negro">Puesto:</label>
                    <label className="gris"> {puesto? puesto:"Sin Informacion"} </label>
                  </Grid>
                </Grid>
              </>
              :

              <>
                <Grid container direction="column" justifyContent="center" alignItems="center" >
                  <br />  <br />
                  <Grid item xs={10}>
                    <TextField
                      disabled={botonEdicionTodo === "Editar" ? true : false}
                      required
                      inputProps={{ maxLength: 12 }}
                      margin="dense"
                      id="Telefono"
                      label="Teléfono"
                      value={telefono}
                      type="text"
                      fullWidth
                      variant="outlined"
                      onChange={(v) => validateCount(v.target.value, "tel")}
                      error={!telValid}
                    />
                  </Grid>
                  <FormHelperText id="helper-text" error= {!telValid}>
                      {telValid?"":String(telefono).length===0?"Campo Vacio": mensajeError}
                  </FormHelperText>
                  <br />
                  <Grid item xs={10}>
                    <TextField
                      disabled={botonEdicionTodo === "Editar" ? true : false}
                      inputProps={{ maxLength: 5 }}
                      margin="dense"
                      id="extencion"
                      label="Extencion"
                      value={extencion}
                      type="text"
                      fullWidth
                      // sx={{ width: "40%",}}
                      variant="outlined"
                      onChange={(v) => validateCount(v.target.value, "ext")}
                      error={!extValid}
                    />
                  </Grid>
                  <FormHelperText id="helper-text" error= {!extValid}>
                  {extValid?"": String(extencion).length===0?"Campo Vacio": mensajeError} 
                  </FormHelperText>
                  <br />
                  <Grid item xs={10}>
                    <TextField
                      disabled={botonEdicionTodo === "Editar" ? true : false}
                      required
                      margin="dense"
                      id="Celular"
                      label="Celular"
                      value={celular}
                      type="text"
                      fullWidth
                      variant="outlined"
                      onChange={(v) => validateCount(v.target.value, "cel")}
                      error={!celValid}
                    />
                  </Grid>
                  <FormHelperText id="helper-text" error= {!celValid}>
                  {celValid?"":String(celular).length===0?"Campo Vacio": mensajeError} 
                  </FormHelperText>
                  <br />
                  <Grid item xs={10}>
                    <FormControl fullWidth >
                      <TextField
                        disabled={botonEdicionTodo === "Editar" ? true : false}
                        required
                        margin="dense"
                        id="Puesto"
                        label="Puesto"
                        value={puesto}
                        type="text"
                        fullWidth
                        // sx={{ width: 1/2 }}
                        variant="outlined"
                        onChange={(v) => setPuesto(v.target.value)}
                        error={puesto === "" ? true : false}
                      />
                    </FormControl>
                  </Grid>
                </Grid>


              </>
            }


            {/* BOTON DE GUARDAR  */}

            <Box display="flex" flexWrap="wrap" sx={{ paddingBottom: "2%" }}>

              <Box sx={{ width: "70%" }}> </Box>
              <Box sx={{ width: "28%" }} >
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (botonEdicionTodo === "Guardar") setOpenDialogConfirmacion(true)
                    else onClickEditar();
                  }}

                  color="success"
                  sx={{
                    width: "50%",
                    height: "auto",
                    borderRadius: 1,
                    "&:hover": {
                      color: "#5048E5",
                      backgroundColor: "#eeebf5",
                    },
                  }}
                >

                  <Typography sx={{ fontSize: "3" }}>
                    {botonEdicionTodo}
                  </Typography></Button>

                {botonEdicionTodo === "Guardar" ? <Button
                  variant="outlined"
                  onClick={onClickCancelarEditarTodo}
                  color="error"
                  sx={{
                    width: "50%",
                    height: "auto",
                    borderRadius: 1,
                    "&:hover": {
                      color: "#5048E5",
                      backgroundColor: "#eeebf5",
                    },
                  }}
                >

                  <Typography sx={{ fontSize: "3" }}>
                    Cancelar
                  </Typography></Button> : null}
              </Box>
            </Box>
          </Box>

          <Dialog
            open={openDialogConfirmacion}
            onClose={() => setOpenDialogConfirmacion(false)}
          >
            <DialogTitle id="alert-dialog-title">
              {"Editar información"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿ Desea cambiar la informacion ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setOpenDialogConfirmacion(false) }}>Cancelar</Button>
              <Button color="success" onClick={() => onClickGuardarCambios()}>Aceptar</Button>
              {/* onClickEditarTodo */}
            </DialogActions>
          </Dialog>


        </Box>
      </Box>
    </Box>
  );
};
