import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { COLOR } from "../../styles/colors";
import PersonIcon from "@mui/icons-material/Person";
import { Fingerprint } from "@mui/icons-material";
import { RESPONSE } from "../../interfaces/user/UserInfo";
import { getUser } from "../../services/localStorage";
import { useEffect, useState } from "react";
import { env_var } from "../../environments/env";


export function BloqueoSesion({
  handlePassword,
}: {
  handlePassword: Function;
}) {


  const [password, setPassword] = useState("");
  const user: RESPONSE =  JSON.parse(String(getUser()));

  useEffect(() => {
    
    
     
  }, [])
  
  
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "30%",
          blackgroundColor: COLOR.blanco,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
           <Typography sx={{ fontSize: "3vw" }}>{user.Nombre + ' ' + user.ApellidoPaterno + ' '+ user.ApellidoMaterno}</Typography> 
          <TextField
            sx={{
              width: "50vw",
              height: "5vh",
            }}
            type="password"
            onChange={(v) => setPassword(v.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Contraseña"
          ></TextField>
          
          <Box
            sx={{
              marginTop : 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton aria-label="fingerprint" color="secondary" onClick={() => handlePassword(password) }>
              <Fingerprint />
            </IconButton>
          </Box>



          <Typography sx={{ mt: 3, fontSize: "2vw" }}>
            Ingrese su contraseña para recobrar su sesión.
          </Typography>
          <Typography sx={{ mt: 5, fontSize: "1.8vw" }}>
            ¿Esa persona no es usted?{" "}
          </Typography>
          <Box>
            <Typography sx={{ mt: 1, fontSize: "1.8vw" }}>
              Haz click{" "}
              <Button
                href={env_var.BASE_URL_LOGIN}
                sx={{ mt: 1, fontSize: "1.6vw" }}
              >
                aquí
              </Button>
              para iniciar sesión con un Usuario diferente.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
