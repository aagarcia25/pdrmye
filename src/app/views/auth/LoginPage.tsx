import { Box, Button, Input, TextField, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo.svg";
import "../../../../src/App.css";
import { NavLink, useNavigate } from 'react-router-dom'
export const Login = () => {
  const navigate = useNavigate();
const [usuario, setUsuario] = useState(
    "Nombre de usuario o correo electrónico"
  );
  const [contrasena, setContrasena] = useState("Contraseña");

  const [isFocused, setIsFocused] = useState(false);
  const [btnBgColor, setBtnBgColor] = useState("#666666");
  const [btnTxtColor, setBtnTxtColor] = useState("#fff");
  const [userInputColor, setUserInputColor] = useState("#cccccc");
  const [userInputTextColor, setUserInputTextColor] = useState("#fff");

  const [contrasenaInputColor, setContrasenaInputColor] = useState("#cccccc");
  const [contrasenaTextInputColor, setContrasenaTextInputColor] =
    useState("#fff");

  const onChangeUsuario = (v: string) => {
  setUsuario(v);
  };

  const onChangePassword = (v: string) => {
    setContrasena(v);
  };

  const onFocusButton = () => {
    setIsFocused(true);

    setBtnBgColor("#fff");
    setBtnTxtColor("#000");
  };

  const onFocusLeaveButton = () => {
    setIsFocused(false);

    setBtnBgColor("#666666");
    setBtnTxtColor("#fff");
  };

  const onClickTxtUsuario = () => {
    setUserInputColor("#fff");
    setUserInputTextColor("#000");
    if (usuario == "Nombre de usuario o correo electrónico") {
    setUsuario("");
    }
  };

  const onClickTxtContrasena = () => {
    setContrasenaInputColor("#fff");
    setContrasenaTextInputColor("#000");
    if (contrasena == "Contraseña") {
      setContrasena("");
    }
  };

  const verifyUsuario = () => {
    setUserInputColor("#cccccc");
    setUserInputTextColor("#fff");

    if (usuario == "") {
     setUsuario("Nombre de usuario o correo electrónico");
    }
  };

  const verifyContrasena = () => {
    setContrasenaInputColor("#cccccc");
    setContrasenaTextInputColor("#fff");
    if (contrasena == "") {
      setContrasena("Contraseña");
    }
  };

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
          width: "100%",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "30%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              height: "90%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  height: "20%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={logo} style={{ width: "11vw" }} />
              </Box>

              <Box
                sx={{
                  mt: "3vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5vw",
                    fontFamily: "Montserrat,sans-seri",
                    color: "#858180",
                  }}
                >
                  INICIA SESIÓN
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: ".8vw",
                    fontFamily: "MontserratBold",
                    color: "#858180",
                  }}
                >
                  Ingresa tus datos de acceso:
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "15%",

                  mt: "2vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    height: "100%",
                    borderRadius: 10,
                    backgroundColor: userInputColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: 1,
                    borderColor: "#cccccc",
                  }}
                >
                  <Input
                    disableUnderline
                    value={usuario}
                    onChange={(v) => onChangeUsuario(v.target.value)}
                    sx={{
                      width: "80%",
                      color: userInputTextColor,
                      fontFamily: "MontserratLight",
                      fontSize: ".8vw",
                    }}
                    onClickCapture={() => onClickTxtUsuario()}
                    onBlurCapture={() => verifyUsuario()}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "15%",

                  mt: "2vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    height: "100%",
                    borderRadius: 10,
                    backgroundColor: contrasenaInputColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: 1,
                    borderColor: "#cccccc",
                  }}
                >
                  <Input
                    disableUnderline
                    value={contrasena}
                    onChange={(v) => onChangePassword(v.target.value)}
                    type="password"
                    sx={{
                      width: "80%",
                      color: contrasenaTextInputColor,
                      fontFamily: "MontserratLight",
                      fontSize: ".8vw",
                    }}
                    onClickCapture={() => onClickTxtContrasena()}
                    onBlurCapture={() => verifyContrasena()}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  mt: "2vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                 
                  onMouseOver={() => onFocusButton()}
                  onMouseLeave={() => onFocusLeaveButton()}

                  
                  onClick={() => navigate('/bienvenido')} 

                
                


                  sx={{
                    backgroundColor: btnBgColor,
                    color: btnTxtColor,
                    borderRadius: 10,
                    height: "5vh",
                    width: "7vw",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat,sans-seri",
                    fontSize: ".8vw",
                  }}
                >
                  Ingresar
                </Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  mt: "2vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "MontserratBold",
                    fontSize: ".8vw",
                    color: "#666666",
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#cccccc",
          width: "100vw",
          height: "5vh",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
2022 Aviso de Privacidad Contacto
      </footer>
    </Box>
  );
};
