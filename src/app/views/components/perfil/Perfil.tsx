import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
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
import validator from 'validator';
import { COLOR } from "../../../styles/colors";

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

  const handleTotal = (v: string) => {
    if ((validator.isNumeric(v) || v === "")) {
        setTelefono(v)
    }
};

  return (
    
    <Box
      sx={{
        //Principal
        width: "100%",
        height: "100%",
        backgroundColor: "#EEEEEE",
        // backgroundColor: "#FBF8EF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding:"0",
        marginTop:".5%",
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
          // justifyContent: "center",
          // border: "1px solid  black",
          // borderRadius: "1%",
          // backgroundColor: "blue"
        }}
      >
        

        {/* <Box  sx={{
          //EspacioTitulo
          width: "50%",
          backgroundColor: "skyblue",
        }}>
          <Typography variant="h6"  paddingTop={3}> Información Personal </Typography>
        </Box> */}

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
              // border: 3,
              // borderColor: "black",
              // display: "flex",
              justifyContent: "center",
              // alignItems: "center",
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
        <Box boxShadow={3}  sx={{
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

          <Typography sx={{ width: "30%", 
          fontFamily: "sans-serif", 
          fontSize: "1rem", 
          color:"#CCCCCC" }}
          > Nombre: 
          <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem",color:"white"  }}>
          {nombre} </Typography> 
          </Typography>

          <Typography sx={{ width: "30%", 
          fontFamily: "sans-serif", 
          fontSize: "1rem", 
          color:"#CCCCCC" }}
          > Apellido Paterno:  
          <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem",color:"white"  }}>
          {apellidoPaterno} </Typography> 
          </Typography>

          <Typography sx={{ width: "30%", 
          fontFamily: "sans-serif", 
          fontSize: "1rem", 
          color:"#CCCCCC" }}
          > Apellido Materno: 
          <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem",color:"white"  }}>
          {apellidoMaterno} </Typography> 
          </Typography>  
        </Box>

        <Box sx={{
          height: "2%",
        }}> </Box>
        
        <Box boxShadow={2}  sx={{
          width: "90%",
          height: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          borderRadius: "10px",
          bgcolor: "rgb(252,252,252)",
          flexDirection: "column"
        }}>  
       <Typography align="center" variant="h5" sx={{ width: "100%",color:COLOR.azul, paddingTop:"2%"}}>
          Contacto y Ubicación
        </Typography>
                
          <Box display="flex" flexWrap="wrap"  sx={{paddingTop:"2%", justifyContent: "center"}}>
            <Typography sx={{ paddingLeft:"2%", color:"#808080", fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex"}}>Departamento :</Typography>
            <Typography sx={{ ml:"1%", fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex"  }}> {departamento} </Typography>
            <Typography sx={{ paddingLeft:"10%", color:"#808080", fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex"}}>Correo electrónico :</Typography>
            <Typography sx={{ ml:"1%", fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex"}}> {correoElectronico}  </Typography>
          </Box>


        
          {botonEdicionTodo === "Editar" ?
            <Box display="flex" flexWrap="wrap"   sx={{ justifyContent: "center", paddingTop:"3%"}}>
              <Typography sx={{ color:"#808080",  fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex", }}>Telefono :</Typography>
              <Typography sx={{ ml:"1%",bgcolor:"#EEEEEE", fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex", flexDirection: "row" }}>  {telefono} </Typography>
            </Box> :

            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ paddingBottom:".5%", paddingTop:"2%"}}>
               <Box sx={{  width: 500 }}> </Box>
            <TextField
              disabled={botonEdicionTodo === "Editar" ? true : false}
              required
              inputProps={{maxLength: 12}}
              margin="dense"
              id="Telefono"
              label="Teléfono"
              value={telefono}
              type="text"
              fullWidth
              // sx={{ width: "40%",}}
              variant="outlined"
              onChange={(v) => handleTotal(v.target.value)}
              error={telefono == "" ? true : false}
            />
            <Box sx={{  width: 500 }}> </Box>
            </Stack>
          
            }



          {botonEdicionTodo === "Editar" ?
            <Box display="flex" flexWrap="wrap"   sx={{ justifyContent: "center", paddingTop:"3%"}}>
              <Typography sx={{ color:"#808080",  fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex", }}>Ubicación :</Typography>
              <Typography sx={{ ml:"1%",bgcolor:"#EEEEEE", fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex", flexDirection: "row" }}>{ubicacion} </Typography>
            </Box> :

            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ paddingBottom:".5%"}}>
              <Box sx={{  width: 500 }}> </Box>
            <TextField
              disabled={botonEdicionTodo === "Editar" ? true : false}
              required
              margin="dense"
              id="Ubicacion"
              label="Ubicación"
              value={ubicacion}
              type="text"
              fullWidth
              // sx={{ width: "60%", }}
              variant="outlined"
              onChange={(v) => setUbicacion(v.target.value)}
              error={ubicacion == "" ? true : false}
            />
            <Box sx={{  width: 500 }}> </Box>
            </Stack>

            }

          {botonEdicionTodo === "Editar" ?
            <Box display="flex" flexWrap="wrap"  sx={{ justifyContent: "center", paddingTop:"3%", paddingBottom:"2%"}}>
              <Typography sx={{ color:"#808080",  fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex", }}> Puesto :</Typography>
              <Typography sx={{ ml:"1%", bgcolor:"#EEEEEE", fontFamily: "sans-serif", fontSize: "1.4rem", display: "flex", flexDirection: "row" }}> {puesto} </Typography>
            </Box>
            :
            // pagina 2 el puesto

            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ paddingBottom:"2%"}}>
               
               <Box sx={{  width: 500 }}> </Box>
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
              error={puesto == "" ? true : false}
            />
            <Box sx={{  width: 500 }}> </Box>
            </Stack>
            
            }

              {/* BOTON DE GUARDAR  */}

          <Box display="flex" flexWrap="wrap" sx={{paddingBottom:"2%"}}>
          
          <Box  sx={{width: "70%"}}> </Box>
          <Box  sx={{width: "28%"}} >
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
