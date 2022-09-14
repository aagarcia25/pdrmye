import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { COLOR } from "../../styles/colors";
import PersonIcon from "@mui/icons-material/Person";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

export function BloqueoSesion() {
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
          <Typography sx={{fontSize: "3vw" }}>Cesar Rivera</Typography>
          <TextField
            sx={{
              width: "50vw",
              height: "5vh",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowRightAltIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Contraseña"
          ></TextField>

          <Typography sx={{ mt: 3, fontSize: "2vw" }}>
            Ingrese su contraseña para recobrar su sesión.
          </Typography>
          <Typography sx={{ mt: 5, fontSize: "1.8vw" }}>
            ¿Esa persona no es usted?{" "}
          </Typography>
          <Box>
            <Typography sx={{ mt: 1, fontSize: "1.8vw" }}>
              Haz click{" "}
              <Link to="/">
                {"aquí"}
              </Link>{" "}
              para iniciar sesión con un Usuario diferente.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
