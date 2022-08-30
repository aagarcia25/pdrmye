import React, {  useContext, useState } from "react";
import { useNavigate  } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import logo from "../../assets/img/logopalacio.svg";

//icons import
import LoginIcon from "@mui/icons-material/Login";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";



import { AuthContext } from "../store/contexts/AuthContext";
import { AuthService } from "../../services/AuthService";
import { getUser, setTokens } from "../../helpers/localStorage";
import { CatalogosServices } from "../../services/CatalogosServices";
import { CalendarioService } from "../../services/CalendarioService";

export const LoginPage = () => {

  const theme = createTheme({
    palette: {
        primary: {
         // light: '#fff',
          main: '#666'
        }
    },
    components:{
      // nombre del componente
       MuiButton: {
        styleOverrides: {
          root:{
            borderRadius: 40,
            color: '#fff!important',
            backgroundcolor:'#666'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root:{
            borderRadius: 40,
            //color: '#fff!important',
            //backgroundcolor:'#666'
          }
        }
      }

    }
});




  const { dispatchUser }: any = useContext(AuthContext);
  const [auth, setAuth] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatchUser({type:"start"});
      const resp = await AuthService.login(auth);
      console.log(resp);
      if (resp.status === 200) {
        setTokens(resp.data);
        let u = getUser();
        //const respNotificacion = await CatalogosServices.Notificaciones({ NUMOPERACION: "5" , CHUSER:u.id });
        //const respCalendario   = await CalendarioService.calendarios({ NUMOPERACION: "5" , CHUSER:u.id  });
        dispatchUser({ type: "login", payload: resp.data });
        navigate("/home");
      }
    } catch (error) {}
  };

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    console.log(e.target.value);
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: `{$theme.primary.light}`,
        padding: 4,
      }}
    >
      <Grid
        item
        className="box-shadow"
        xs={2}
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{}}>
          <img src={logo} />
        </Box>

        <Grid
          item
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
          
        >
          <Typography variant="h5" sx={{ mb: 1, alignContent: "center" }}>
            Ingresa para empezar con tú sesión
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
            <ThemeProvider theme={theme}>
              <TextField
                label="Usuario"
                type="text"
                placeholder="nombre.apellido"
                fullWidth
                variant="filled"
                name="email"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
              />
                </ThemeProvider>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
            <ThemeProvider theme={theme}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                variant="filled"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              </ThemeProvider>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
              <Grid item xs={12} sm={12}>
              <ThemeProvider theme={theme}>
                <Button
                  //disabled={autenticate.isProcessingRequest}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  <LoginIcon /> Iniciar sesión
                </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
