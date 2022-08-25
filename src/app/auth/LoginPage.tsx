import React, { FormEvent} from "react";
import {Box, Button, Grid, TextField, InputAdornment, Typography} from "@mui/material";
import logo from "../../assets/img/logopalacio.svg";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { authenticateUser, statusAuth } from "../store/authSlice/authSlice";
import { createTheme } from '@mui/material/styles';
//icons import
import LoginIcon from '@mui/icons-material/Login';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
//images
import ImageBackground from '../../assets/img/GOBIERNO_NL_LOGO-01.png';


export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const autenticate = useAppSelector(statusAuth);

  const { email, password ,onChange  } = useForm({
    email: '',
    password: ''
  });
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authenticateUser({ email, password }));
  };

    const theme = createTheme({
        palette: {
            primary: {
                light: '#b28900',
                main: '#ffc400',
                dark: '#ffcf33',
                contrastText: '#b24d00',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
           common:{ black:'#000000'}
        },
    });

  return (
    <Grid className="Esteeselfondo"
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
        <Box
          sx={{
           
          }}
        >
          <img src={logo} />
        </Box>

        <Grid
          item
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
          sx={{
              backgroundColor: theme.palette.primary.main,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, alignContent: "center"}}>
            Ingresa para empezar con tú sesión
          </Typography>
        </Grid>

        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Usuario"
                type="text"
                placeholder="nombre.apellido"
                fullWidth
                variant="filled" 
                name="email"
                style={{  borderRadius: "40px" }}
                value={email}
                onChange={onChange}
                InputProps={{
                  endAdornment:(
                      <InputAdornment position="end">
                        <MailIcon style={{ color: theme.palette.primary.main }}/>
                      </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                variant="filled" 
                value={password}
                onChange={onChange}
                InputProps={{
                  endAdornment:(
                      <InputAdornment position="end">
                        <LockIcon style={{ color: theme.palette.primary.main }}/>
                      </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
              <Grid item xs={12} sm={12}>
                <Button
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.black
                    }}
                  disabled={autenticate.isProcessingRequest}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                 <LoginIcon style={{ color: "black" }}/> Iniciar sesión
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>

    </Grid>
  );
};
