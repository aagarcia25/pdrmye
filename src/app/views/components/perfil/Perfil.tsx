import {
  Avatar,
  Button,

  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/localStorage";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import PersonIcon from "@mui/icons-material/Person";

export const Perfil = () => {
  const user: RESPONSE = JSON.parse(String(getUser()));
  //CAMPOS EN USO DE USUARIO
  console.log(user.Nombre);

  const [nombre, setNombre] = useState(user.Nombre);
  const [nombreUsuario, setNombreUsuario] = useState(user.NombreUsuario);
  const [apellidoPaterno, setApellidoPaterno] = useState(user.ApellidoPaterno);
  const [apellidoMaterno, setApellidoMaterno] = useState(user.ApellidoMaterno);
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rutaFoto, setRutaFoto] = useState("");
  const [puesto, setPuesto] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tipo, setTipo] = useState("");

  const [departamento, setDepartamento] = useState("");
  const [departamentos, setDepartamentos] = useState("");

  //CARD 1
  const [botonEdicionFoto, setBotonEdicionFoto] = useState("Editar");
  const [botonEdicionTodo, setBotonEdicionTodo] = useState("Editar");

  user.Nombre = nombre;

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

  const onClickEditarTodo = () => {
    setBotonEdicionTodo("Guardar");
    //Avisos de que faltan algunos campos y avisar que sus compañeros no los podrán observar
    if (botonEdicionTodo === "Guardar") {
      setBotonEdicionTodo("Editar");

    }
  };

  let st;

  useEffect(() => { }, []);

  return (
    <Box
      sx={{
        //Principal
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "80%",
          //backgroundColor: "blue"
        }}
      >
        <Box
          sx={{
            //EspacioTitulo
            width: "100%",
            height: "15%",
            //backgroundColor: "skyblue",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              //Titulo
              width: "100%",
              height: "50%",
              //  backgroundColor: "skyblue",
            }}
          >
            <Typography
              sx={{
                //Tamaño
                fontSize: "2.5vw",
                fontWeight: "bold",
              }}
            >
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
            height: "100%",
            //  backgroundColor: "green"
          }}
        >
          <Box
            sx={{
              //CARD #1
              width: "100%",
              height: "50%",
              bgcolor: "rgb(252,252,252)",
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
                  // backgroundColor: "blue"
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
                sx={{
                  width: "75%",
                  height: "100%",
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
                      
                      <Box sx={{
                        width:"4vw",
                        height:"6vh",
                        backgroundColor:"white",
                        borderRadius: '50%',
                        border:3,
                        borderColor:"black",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                      }}>
                         {user.RutaFoto ? (
                        <img
                          style={{
                            objectFit: "scale-down",
                            width: "3vw",
                          }}
                          src={user.RutaFoto}
                        />
                      ) : (
                        <PersonIcon
                          sx={{
                            width: "10vw",
                            height: "4vh",
                            
                          }}
                        />
                      )}

                      </Box>
                      
                      <Box
                    sx={{
                      width: "25%",
                      height: "100%",
                      justifyContent: "start",
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                    }}>

                  </Box>
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
                        onClick={onClickEditarFoto}
                        sx={{
                          width: "2vw",
                          height: "3vh",
                          backgroundColor: "white",
                          borderColor: "#5048E7",
                          borderRadius: 1,
                          color: "#5048E5",
                          "&:hover": {
                            color: "#5048E5",
                            backgroundColor: "#eeebf5",
                          },
                        }}
                      >
                        <Typography sx={{ fontSize: "3" }}>
                          {botonEdicionFoto}
                        </Typography>
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
                        Tipo de usuario: {tipo
                          //VER COMO TRAER EL ROL DEL USUARIO!!!
                        }
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
                      //  backgroundColor: "green",
                    }}
                  >
                    <TextField
                      disabled={botonEdicionTodo === "Editar" ? true : false}
                      required
                      margin="dense"
                      id="Nombre"
                      label="Nombre"
                      value={nombre}
                      type="text"
                      fullWidth
                      variant="outlined"
                      onChange={(v) => setNombre(v.target.value)}
                      error={nombre == "" ? true : false}
                    />
                    <TextField
                      disabled={botonEdicionTodo === "Editar" ? true : false}
                      required
                      margin="dense"
                      id="ApellidoPaterno"
                      label="Apellido Paterno"
                      value={apellidoPaterno}
                      type="text"
                      fullWidth
                      variant="outlined"
                      onChange={(v) => setApellidoPaterno(v.target.value)}
                      error={apellidoPaterno == "" ? true : false}
                    />
                    <TextField
                      disabled={botonEdicionTodo === "Editar" ? true : false}
                      required
                      margin="dense"
                      id="ApellidoMaterno"
                      label="Apellido Materno"
                      value={apellidoMaterno}
                      type="text"
                      fullWidth
                      variant="outlined"
                      onChange={(v) => setApellidoMaterno(v.target.value)}
                      error={apellidoMaterno == "" ? true : false}
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
                    ></Grid>
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
              bgcolor: "rgb(252,252,252)",
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
                      backgrounColor: "blue",
                      mb: 1,
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
                        disabled={botonEdicionTodo === "Editar" ? true : false}
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
                        disabled={botonEdicionTodo === "Editar" ? true : false}
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
                      // backgrounColor:"blue",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        //Textfields ubicacion
                        width: "48%",
                        height: "100%",
                        //  backgroundColor: "white",
                      }}
                    >
                      <TextField
                        disabled={botonEdicionTodo === "Editar" ? true : false}
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
                        disabled={botonEdicionTodo === "Editar" ? true : false}
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
                      //Textfield Departamento
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
                        disabled={botonEdicionTodo === "Editar" ? true : false}
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
                  <Box sx={{
                    width: "100%",
                    height: "13%",
                    //  backgroundColor:"red",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end"
                  }}>
                    <Button
                      onClick={onClickEditarTodo}
                      sx={{
                        width: "2vw",
                        height: "3vh",
                        backgroundColor: "white",
                        borderColor: "#5048E7",
                        borderRadius: 1,
                        color: "#5048E5",
                        "&:hover": {
                          color: "#5048E5",
                          backgroundColor: "#eeebf5",
                        },
                      }}
                    > <Typography sx={{ fontSize: "3" }}>
                        {botonEdicionTodo}
                      </Typography></Button>
                  </Box>
                </Box>



              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
