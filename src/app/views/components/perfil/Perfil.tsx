import {
  Avatar,
  Button,
  createTheme,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";


export const Perfil = () => {
  const [borderBottomColorMenu1, setBorderBottomColorMenu1] = useState("");
  const [borderBottomColorMenu2, setBorderBottomColorMenu2] = useState("");

  //CAMPOS EN USO DE USUARIO
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState(
    ""
  );
  const [telefono, setTelefono] = useState("");
  const [rutaFoto, setRutaFoto] = useState("");
  const [puesto, setPuesto] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tipo, setTipo] = useState("");
  const [departamento, setDepartamento] = useState("");

  const [departamentos, setDepartamentos] = useState("");

  const onClickMenu1 = () => {
    if (borderBottomColorMenu1 == "#5048E5") {
    } else {
      setBorderBottomColorMenu1("#5048E5");
      setBorderBottomColorMenu2("white");

      console.log("Menu1");
    }
  };

  const onClickMenu2 = () => {
    if (borderBottomColorMenu2 == "#5048E5") {
    } else {
      setBorderBottomColorMenu2("#5048E5");
      setBorderBottomColorMenu1("white");
      console.log("Menu2");
    }
  };

  let st;

  useEffect(() => {
    //SE AGREGAN LOS MENUS EN BLANCO PARA QUE NO SE AUTOSELECCIONEN
    //setBorderBottomColorMenu2("white");
    //Llamar al componente que iria en menu 1 para que lo precargué
  }, []);

  return (
    <Box sx={{width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
      <Box sx={{ width: "80%", height: "80%", 
      // backgroundColor: "blue"
       }}>
        <Box
          sx={{
            width: "100%",
            height: "15%",
            //backgroundColor: "skyblue",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "50%",
            }}
          >
            <Typography sx={{ fontSize: "2.5vw", fontWeight: "bold" }}>
              Perfil
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "50%",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "82%",
            // backgroundColor: "green"
          }}
        >
          <Box
            sx={{
              //CARD #1
              width: "100%",
              height: "50%",
              // backgroundColor: "aquamarine",
              borderRadius: 2,
              boxShadow: 2,
              mt: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                //CARD CONTENT
                width: "95%",
                height: "90%",
                //backgroundColor: "red",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "25%",
                  height: "100%",
                  // backgroundColor: "yellow"
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      //Anio
                      display: "flex",
                      justifyContent: "start",
                      // backgroundColor: "white",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.3vw", fontWeight: "Bold" }}>
                      Información Personal
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{ width: "75%", height: "100%", 
               // backgroundColor: "orange"
               }}
              >
                <Box
                  sx={{
                    //Foto y botón
                    width: "100%",
                    height: "25%",
                    // backgroundColor: "red",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={1.5}
                      sx={{
                        //Anio
                        display: "flex",
                        justifyContent: "start",
                        // backgroundColor: "violet",
                      }}
                    >
                      <Avatar
                        alt={nombre}
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: "3vw", height: "5vh" }}
                      />
                    </Grid>
                    <Grid
                      item //Botón Cambiar
                      xs={1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "white",
                      }}
                    >
                      <Button
                        sx={{
                          width: "2vw",
                          height: "3vh",
                          backgroundColor: "white",
                          borderColor: borderBottomColorMenu2,
                          borderRadius: 1,
                          color: "#5048E5",
                          "&:hover": {
                            color: "#5048E5",
                            backgroundColor: "#eeebf5",
                          },
                        }}
                      >
                        <Typography sx={{ fontSize: "3" }}>Cambiar</Typography>
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={9.5}
                      sx={{
                        //Anio
                        display: "flex",
                        justifyContent: "end",
                        // backgroundColor: "pink",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: "Bold" }}>
                        Tipo de usuario: {tipo}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: "75%",
                    //  backgroundColor: "brown",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      width: "90%",
                      height: "100%",
                      //   backgroundColor: "green",
                    }}
                  >
                    <TextField
                      required
                      margin="dense"
                      id="Nombre"
                      label="Nombre"
                      value={nombre}
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(v) => setNombre(v.target.value)}
                      error={nombre == "" ? true : false}
                      sx={{
                        height: "3vh",
                        mb: 1.4,
                      }}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="ApellidoPaterno"
                      label="Apellido Paterno"
                      value={apellidoPaterno}
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(v) => setApellidoPaterno(v.target.value)}
                      error={apellidoPaterno == "" ? true : false}
                      sx={{
                        height: "3vh",
                        mb: 1.4,
                      }}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="ApellidoMaterno"
                      label="Apellido Materno"
                      value={apellidoMaterno}
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(v) => setApellidoMaterno(v.target.value)}
                      error={apellidoMaterno == "" ? true : false}
                      sx={{
                        height: "3vh",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "10%",
                      height: "100%",
                      //  backgroundColor: "orange",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          height: "5.3vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                         // backgroundColor: "blue",
                        }}
                      >
                        <Button
                          sx={{
                            width: "2vw",
                            height: "2.5vh",
                            backgroundColor: "white",
                            borderColor: borderBottomColorMenu2,
                            borderRadius: 1,
                            color: "#5048E5",
                            mt: 1,
                            "&:hover": {
                              color: "#5048E5",
                              backgroundColor: "#eeebf5",
                            },
                          }}
                        >
                          Editar
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          height: "4.8vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        //  backgroundColor: "yellow",
                        }}
                      >
                        <Button
                          sx={{
                            width: "2vw",
                            height: "2.5vh",
                            backgroundColor: "white",
                            borderColor: borderBottomColorMenu2,
                            borderRadius: 1,
                            color: "#5048E5",
                            mt: 1,
                            "&:hover": {
                              color: "#5048E5",
                              backgroundColor: "#eeebf5",
                            },
                          }}
                        >
                          Editar
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          height: "5vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                         // backgroundColor: "blue",
                        }}
                      >
                        <Button
                          sx={{
                            width: "2vw",
                            height: "2.5vh",
                            backgroundColor: "white",
                            borderColor: borderBottomColorMenu2,
                            borderRadius: 1,
                            color: "#5048E5",
                            mt: 1,
                            "&:hover": {
                              color: "#5048E5",
                              backgroundColor: "#eeebf5",
                            },
                          }}
                        >
                          Editar
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              //CARD #2
              width: "100%",
              height: "50%",
              // backgroundColor: "aquamarine",
              borderRadius: 2,
              boxShadow: 2,
              mt: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                //CARD CONTENT
                width: "95%",
                height: "90%",
                //  backgroundColor: "red",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  //Subtitle
                  width: "25%",
                  height: "100%",
                  //  backgroundColor: "yellow",
                }}
              >
                <Typography sx={{ fontSize: "1.3vw", fontWeight: "Bold" }}>
                  Contacto y ubicación
                </Typography>
              </Box>
              <Box
                sx={{
                  //Content
                  width: "75%",
                  height: "100%",
                  //  backgroundColor: "orange",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    // Todos los Textfields
                    width: "90%",
                    height: "100%",
                    //  backgroundColor: "purple",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      //Textfields Email/Tellphone
                      width: "100%",
                      height: "25%",
                      display: "flex",
                      flexDirection: "row",
                      //  backgrounColor:"blue"
                    }}
                  >
                    <Box
                      sx={{
                        //Textfields correo
                        width: "48%",
                        height: "100%",
                        //  backgroundColor: "red",
                      }}
                    >
                      <TextField
                        required
                        margin="dense"
                        id="CorreoElectronico"
                        label="Correo Eléctronico"
                        value={correoElectronico}
                        type="email"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setCorreoElectronico(v.target.value)}
                        error={correoElectronico == "" ? true : false}
                      />
                    </Box>
                    <Box
                      sx={{
                        //Espacio entre Correo y telefono
                        width: "4%",
                        height: "100%",
                        // backgroundColor: "gray",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        //Textfield tellphone box
                        width: "48%",
                        height: "100%",
                        //  backgroundColor: "white",
                      }}
                    >
                      <TextField
                        required
                        margin="dense"
                        id="Telefono"
                        label="Teléfono"
                        value={telefono}
                        type="number"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setTelefono(v.target.value)}
                        error={telefono == "" ? true : false}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      //Textfields Ubicación y Puesto
                      width: "100%",
                      height: "25%",
                      display: "flex",
                      flexDirection: "row",
                      // backgrounColor:"blue"
                    }}
                  >
                    <Box
                      sx={{
                        //Textfields ubicacion
                        width: "48%",
                        height: "100%",
                        backgroundColor: "white",
                      }}
                    >
                      <TextField
                        required
                        margin="dense"
                        id="Ubicacion"
                        label="Ubicación"
                        value={ubicacion}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setUbicacion(v.target.value)}
                        error={ubicacion == "" ? true : false}
                      />
                    </Box>
                    <Box
                      sx={{
                        //Espacio entre Ubicación y Puesto
                        width: "4%",
                        height: "100%",
                        // backgroundColor: "gray",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        //Textfield puesto box
                        width: "48%",
                        height: "100%",
                        // backgroundColor: "red",
                      }}
                    >
                      <TextField
                        required
                        margin="dense"
                        id="Puesto"
                        label="Puesto"
                        value={puesto}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setPuesto(v.target.value)}
                        error={puesto == "" ? true : false}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      //Textfields Ubicación y Puesto
                      width: "100%",
                      height: "25%",
                      display: "flex",
                      flexDirection: "row",
                      //  backgrounColor:"blue"
                    }}
                  >
                    <Box
                      sx={{
                        //Textfields ubicacion
                        width: "100%",
                        height: "100%",
                       // backgroundColor: "pink",
                      }}
                    >
                      <TextField
                        required
                        margin="dense"
                        id="Departamento"
                        label="Departamento"
                        value={departamento}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setDepartamento(v.target.value)}
                        error={departamento == "" ? true : false}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    //Buttons Card 2
                    width: "10%",
                    height: "100%",
                    //  backgroundColor: "orange",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        height: "6.2vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        //  backgroundColor: "blue",
                      }}
                    >
                      <Button
                        sx={{
                          width: "2vw",
                          height: "2.5vh",
                          backgroundColor: "white",
                          borderColor: borderBottomColorMenu2,
                          borderRadius: 1,
                          color: "#5048E5",
                          mt: 1,
                          "&:hover": {
                            color: "#5048E5",
                            backgroundColor: "#eeebf5",
                          },
                        }}
                      >
                        Editar
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        height: "6.2vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "yellow",
                      }}
                    >
                      <Button
                        sx={{
                          width: "2vw",
                          height: "2.5vh",
                          backgroundColor: "white",
                          borderColor: borderBottomColorMenu2,
                          borderRadius: 1,
                          color: "#5048E5",
                          mt: 1,
                          "&:hover": {
                            color: "#5048E5",
                            backgroundColor: "#eeebf5",
                          },
                        }}
                      >
                        Editar
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        height: "6.2vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "blue",
                      }}
                    >
                      <Button
                        sx={{
                          width: "2vw",
                          height: "2.5vh",
                          backgroundColor: "white",
                          borderColor: borderBottomColorMenu2,
                          borderRadius: 1,
                          color: "#5048E5",
                          mt: 1,
                          "&:hover": {
                            color: "#5048E5",
                            backgroundColor: "#eeebf5",
                          },
                        }}
                      >
                        Editar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
