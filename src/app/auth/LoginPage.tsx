import React, { FormEvent} from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import logo from "../../assets/img/logopalacio.svg";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { authenticateUser, statusAuth } from "../store/authSlice/authSlice";


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
        >
          <Typography variant="h5" sx={{ mb: 1, alignContent: "center" }}>
            Inicio de Sessión
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
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
              <Grid item xs={12} sm={12}>
                <Button
                  color="primary"
                  disabled={autenticate.isProcessingRequest}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
