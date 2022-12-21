import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getUser, setToken } from "../../../services/localStorage";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import PersonIcon from "@mui/icons-material/Person";
import { DialogCambiarImagen } from "./DialogCambiarImagen";
import { Toast } from "../../../helpers/Toast";
import { COLOR } from "../../../styles/colors";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { UserServices } from "../../../services/UserServices";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
export const Perfil = () => {
  const [user, setUser] = useState<RESPONSE>(JSON.parse(String(getUser())));

  //Abrir Dialog de imagen
  const query = new URLSearchParams(useLocation().search);
  const jwt = query.get("jwt");
  const [openDialog, setOpenDialog] = useState(false)
  //CARD 1
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [tokenValid, setTokenValid] = useState<boolean>();
  const [value, setValue] = useState('general');


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setPassword("");
    setConfPassword("")
  };

  const handleCloseDialogImagen = () => {
    setOpenDialog(false);
  };

  //PRIMER CARD FUNCIONES

  const RfToken = () => {
    UserServices.verify({}).then((res) => {
      if (res.status === 200) {
        setTokenValid(true)
        console.log("verify true")
        onClickChangePassword();
      } else if (res.status === 401) {
        console.log("verify false")
        UserServices.refreshToken().then((resAppLogin) => {
          if (resAppLogin.status === 200) {
            setTokenValid(true);
            setToken(jwt);
            onClickChangePassword();
          }
          else {
            setTokenValid(false);
            Toast.fire({
              icon: "error",
              title: "Sesión Demasiado Antigua",
            });
          }
        });

      }

    });
  };



  const onClickChangePassword = () => {
    if ((password !== confPassword) || (password.length < 6)) {
      Toast.fire({
        icon: "warning",
        title: "¡Verifique Los Campos!"
      });
    } else {
      Swal.fire({
        icon: "question",
        title: "Cambiar Contraseña?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {

          let dat = {
            IdUsuario: user.id,
            ContrasenaNueva: password,
          };

          if (tokenValid === true) {
            UserServices.changepassword(dat).then((res) => {
              if (res.status === 200 && res.data.message === "Cambio de contraseña exitoso!") {
                Swal.fire("¡Cambio de Contraseña exitoso!", "", "success");
                setPassword("");
                setConfPassword("");
              } else {
                Toast.fire({
                  icon: "warning",
                  title: "¡Cambio de Contraseña Fallo!",
                });
              }
            });
          } else {
            RfToken();
          }
        }
      });
    }
  };

  useEffect(() => {

    UserServices.verify({}).then((res) => {
      if (res.status === 200) {
        setTokenValid(true)
        console.log("verify true")
      } else if (res.status === 401) {
        console.log("verify false")
        UserServices.refreshToken().then((resAppLogin) => {
          if (resAppLogin.status === 200) {
            setTokenValid(true);
            setToken(jwt);
          }
          else {
            setTokenValid(false);
            Toast.fire({
              icon: "error",
              title: "Sesión Demasiado Antigua",
            });
          }
        });

      }

    });


  }, []);




  return (
    <Grid>
      <Grid container direction="row" justifyContent="flex-end" alignItems="center" paddingTop="2%" paddingBottom={1} >
        <BottomNavigation showLabels sx={{ width: 500, borderRadius: "10px", }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            //  sx={{ backgroundColor: "blue",}} 
            label="Información General"
            value="general"
            icon={<AccountBoxIcon />}
          />
          <BottomNavigationAction 
            // sx={{ backgroundColor: "blue", }}
            label="Cambiar Contraseña"
            value="password"
            icon={<VpnKeyIcon />}
          />
        </BottomNavigation>
      </Grid>
      <Grid sx={{
        //Principal
        width: "100%",
        height: "100%",
        // backgroundColor: "#EEEEEE",
        justifyContent: "center",
        alignItems: "flex-start",
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
          <Grid container>
            {value === "general" ?
              < Grid container sx={{ justifyContent: "center", borderRadius: "10px", }} >
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

                      sx={{ width: "7.4rem", height: "7.4rem", backgroundColor: "white", borderRadius: '50%', justifyContent: "center", cursor: "pointer", }} >
                      {user?.RutaFoto ?
                        <img style={{ objectFit: "scale-down", width: "100%", height: "100%", borderRadius: '50%', }}
                          src={user?.RutaFoto}
                        />
                        : <PersonIcon sx={{ width: "100%", height: "100%", }} />
                      }


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
                        {user.Nombre} </Typography>
                    </Typography>

                    <Typography sx={{
                      width: "30%",
                      fontFamily: "sans-serif",
                      fontSize: "1rem",
                      color: "#CCCCCC"
                    }}
                    > Apellido Paterno:
                      <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", color: "white" }}>
                        {user.ApellidoPaterno} </Typography>
                    </Typography>

                    <Typography sx={{
                      width: "30%",
                      fontFamily: "sans-serif",
                      fontSize: "1rem",
                      color: "#CCCCCC"
                    }}
                    > Apellido Materno:
                      <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", color: "white" }}>
                        {user.ApellidoMaterno} </Typography>
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
                    <Grid>
                      <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item xs={10}>
                          <label className="negro">Departamento:</label>
                          <label className="gris"> {user.DEPARTAMENTOS[0]?.Descripcion} </label>
                        </Grid>
                        <br />
                        <Grid item xs={10}>
                          <label className="negro">Correo electrónico:</label>
                          <label className="gris"> {user.CorreoElectronico} </label>
                        </Grid>
                      </Grid>
                      <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <br />
                        <Grid item xs={10}>
                          <label className="negro">Telefono:</label>
                          <label className="gris"> {user.Telefono ? user.Telefono : "Sin Informacion"} </label>
                        </Grid>
                        <br />
                        <Grid item xs={10}>
                          <label className="negro">Extencion:</label>
                          <label className="gris"> {user.Ext ? user.Ext : "Sin Informacion"} </label>
                        </Grid>                  <br />
                        <Grid item xs={10}>
                          <label className="negro">Celular:</label>
                          <label className="gris"> {user.Celular ? user.Celular : "Sin Informacion"} </label>
                        </Grid>
                        <br />
                        <Grid item xs={10}>
                          <label className="negro">Puesto:</label>
                          <label className="gris"> {user.Puesto ? user.Puesto : "Sin Informacion"} </label>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              : ""
            }
            {value === "password" ?
              < Grid container paddingTop="5%" direction="column" justifyContent="center" alignItems="center" >
                <Grid item >
                  <Grid item xs={12} sx={{}}>
                    <label> Ingrese  Nueva Contraseña</label>
                    <TextField
                      sx={{ minl: "center", borderRadius: "10px", }}
                      required
                      margin="dense"
                      value={password}
                      type="password"
                      fullWidth
                      variant="outlined"
                      onChange={(v) => setPassword(v.target.value)}
                      error={password.length < 6 ? true : false}
                      inputProps={{
                        maxLength: 100,
                        minLength: 6
                      }}
                    />
                    <FormHelperText id="component-helper-text">
                      <>
                        <InfoOutlinedIcon /> <label> Mínimo 6 Caracteres</label>
                      </>

                    </FormHelperText>
                  </Grid>

                  <Grid item xs={12} sx={{}}>

                    <label> Confirme  Contraseña</label>
                    <TextField
                      required
                      margin="dense"
                      value={confPassword}
                      type="password"
                      fullWidth
                      variant="outlined"
                      onChange={(v) => setConfPassword(v.target.value)}
                      error={(password !== confPassword) ? true : false}
                      inputProps={{
                        maxLength: 100,
                        minLength: 6
                      }}

                    />
                  </Grid>
                  <Grid container justifyContent="center" alignItems="center" alignContent="center">
                    <Grid item paddingTop="10%" xs={6}>
                      <Button
                        onClick={() => onClickChangePassword()}
                        color="primary" fullWidth variant="contained"> <Typography color="white"> Cambiar </Typography>
                      </Button>
                    </Grid>
                  </Grid>



                </Grid >

              </Grid>

              : ""}


          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
