import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/localStorage";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import PersonIcon from "@mui/icons-material/Person";
import { DialogCambiarImagen } from "./DialogCambiarImagen";
import { AuthService } from "../../../services/AuthService";
import { Toast } from "../../../helpers/Toast";

export const Perfil = () => {
  const [user,setUser]=useState<RESPONSE>(JSON.parse(String(getUser())));
  
  //CAMPOS EN USO DE USUARIO
  // console.log(user.Nombre);
  //Abrir Dialog de imagen
  const [openDialog, setOpenDialog] = useState(false)

  const [nombre, setNombre] = useState(user.Nombre);
  const [nombreUsuario, setNombreUsuario] = useState(user.NombreUsuario);
  const [apellidoPaterno, setApellidoPaterno] = useState(user.ApellidoPaterno);
  const [apellidoMaterno, setApellidoMaterno] = useState(user.ApellidoMaterno);
  const [correoElectronico, setCorreoElectronico] = useState(user.CorreoElectronico);
  const [telefono, setTelefono] = useState(user.Telefono);
  const [rutaFoto, setRutaFoto] = useState("");
  const [puesto, setPuesto] = useState(user.Puesto);
  const [ubicacion, setUbicacion] = useState(user.Ubicacion);
  const [tipo, setTipo] = useState("");

  const [departamento, setDepartamento] = useState(user.DEPARTAMENTOS[0].NombreCorto);
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
        console.log("se guardo");
        console.log(res.SUCCESS);
        Toast.fire({
          icon: "success",
          title: "Datos actualizados.",
        });
      } else {
        console.log("no se guardo")
        console.log(res.SUCCESS);

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
    setTelefono(user.Telefono);
    setUbicacion(user.Ubicacion);
    setPuesto(user.Puesto);
    setDepartamento(user.DEPARTAMENTOS[0].NombreCorto);
    setUser(JSON.parse(String(getUser())));
  };

  let st;

  useEffect(() => { }, []);

  return (
    <Box
      sx={{
        //Principal
        width: "100%",
        height: "100%",
        // backgroundColor: "#FBF8EF",
        borderRadius: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "98%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          //backgroundColor: "blue"
        }}
      >
        

        <Box sx={{
          //EspacioTitulo
          width: "100%",
          height: "5%",
          //backgroundColor: "skyblue",
          display: "flex",
          justifyContent: "center"
        }}>
          <Typography sx={{ fontSize: "1.3vw", fontWeight: "Bold" }}> Información Personal </Typography>
        </Box>
        {/* Imagen y tipo de usuario */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
          <Box
            onClick={() => {
              setOpenDialog(true)
            }}

            sx={{
              width: "4vw",
              height: "4vw",
              backgroundColor: "",
              borderRadius: '50%',
              border: 3,
              borderColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
        <Box sx={{
          width: "90%",
          height: "12%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: "2vh",
          borderRadius: "15px",
          border: "1px solid black",
          bgcolor: "rgb(252,252,252)",
        }}>
          <Typography sx={{ width: "30%", fontFamily: "MontserratBold", fontSize: "1.5vw" }}>Nombre: {nombre} </Typography>

          <Typography sx={{ width: "30%", fontFamily: "MontserratBold", fontSize: "1.5vw" }}>Apellido paterno: {apellidoPaterno} </Typography>

          <Typography sx={{ width: "30%", fontFamily: "MontserratBold", fontSize: "1.5vw" }}>Apellido materno: {apellidoMaterno} </Typography>

        </Box>
        <Typography sx={{ fontSize: "1.3vw", fontWeight: "Bold", mt: "1vh", width: "100%", display: "flex" }}>
          Contacto y ubicación
        </Typography>
        <Box sx={{
          width: "90%",
          height: "60%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: "1vh",
          borderRadius: "15px",
          border: "1px solid black",
          bgcolor: "rgb(252,252,252)",
          flexDirection: "column"
        }}>

          <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "95%" }}>
            <Typography sx={{ width: "40%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>Departamento :</Typography>
            <Typography sx={{ width: "60%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>{departamento} </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "95%" }}>
            <Typography sx={{ width: "40%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>Correo electrónico :</Typography>
            <Typography sx={{ width: "60%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>{correoElectronico} </Typography>
          </Box>

          {botonEdicionTodo === "Editar" ?
            <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "95%" }}>
              <Typography sx={{ width: "40%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>Telefono :</Typography>
              <Typography sx={{ width: "60%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>{telefono} </Typography>
            </Box> :
            <TextField
              disabled={botonEdicionTodo === "Editar" ? true : false}
              required
              margin="dense"
              id="Telefono"
              label="Teléfono"
              value={telefono}
              type="number"
              sx={{ width: "90%", }}
              variant="outlined"
              onChange={(v) => setTelefono(v.target.value)}
              error={telefono == "" ? true : false}
            />}
          {botonEdicionTodo === "Editar" ?
            <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "95%" }}>
              <Typography sx={{ width: "40%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>Ubicación :</Typography>
              <Typography sx={{ width: "60%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>{ubicacion} </Typography>
            </Box> :
            <TextField
              disabled={botonEdicionTodo === "Editar" ? true : false}
              required
              margin="dense"
              id="Ubicacion"
              label="Ubicación"
              value={ubicacion}
              type="text"
              sx={{ width: "90%", }}
              variant="outlined"
              onChange={(v) => setUbicacion(v.target.value)}
              error={ubicacion == "" ? true : false}
            />}

          {botonEdicionTodo === "Editar" ?
            <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "95%" }}>
              <Typography sx={{ width: "40%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>Puesto :</Typography>
              <Typography sx={{ width: "60%", fontFamily: "MontserratBold", fontSize: "1.5vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>{puesto} </Typography>
            </Box>
            :
            <TextField
              disabled={botonEdicionTodo === "Editar" ? true : false}
              required
              margin="dense"
              id="Puesto"
              label="Puesto"
              value={puesto}
              type="text"
              sx={{ width: "90%", }}
              variant="outlined"
              onChange={(v) => setPuesto(v.target.value)}
              error={puesto == "" ? true : false}
            />}


        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%",height:"8%",alignItems:"center" }}>
          <Button
            variant="outlined"
            onClick={() => {
              if (botonEdicionTodo === "Guardar") setOpenDialogConfirmacion(true)
              else onClickEditar();
            }}

            color="success"
            sx={{
              width: "20%",
              height: "3vh",
              borderRadius: 1,
              "&:hover": {
                color: "#5048E5",
                backgroundColor: "#eeebf5",
              },
            }}
          > <Typography sx={{ fontSize: "3" }}>
              {botonEdicionTodo}
            </Typography></Button>

          {botonEdicionTodo === "Guardar" ? <Button
            variant="outlined"
            onClick={onClickCancelarEditarTodo}
            color="error"
            sx={{
              width: "20%",
              height: "3vh",
              borderRadius: 1,
              "&:hover": {
                color: "#5048E5",
                backgroundColor: "#eeebf5",
              },
            }}
          > <Typography sx={{ fontSize: "3" }}>
              Cancelar
            </Typography></Button> : null}
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
  );
};
