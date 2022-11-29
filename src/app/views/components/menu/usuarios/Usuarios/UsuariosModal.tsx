import { useEffect, useState } from "react";
import {
  Dialog,
  TextField,
  DialogActions,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPU, getToken, getUser } from "../../../../../services/localStorage";
import validator from 'validator';
import { UserServices } from "../../../../../services/UserServices";
import { ParametroServices } from "../../../../../services/ParametroServices";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import CloseIcon from '@mui/icons-material/Close';
import { UserReponse } from "../../../../../interfaces/user/UserReponse";
const UsuariosModal = ({
  open,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {

  const [id, setId] = useState<string>();
  const [departamento, setDepartamentos] = useState<SelectValues[]>([]);
  const [idDepartamento, setIdDepartamento] = useState<string>("");
  const [perfiles, setPerfiles] = useState<SelectValues[]>([]);
  const [idPerfil, setIdPerfil] = useState<string>("");
  const [Nombre, setNombre] = useState<string>("");
  const [ApellidoPaterno, setApellidoPaterno] = useState<string>("");
  const [ApellidoMaterno, setApellidoMaterno] = useState<string>("");
  const [NombreUsuario, setNombreUsuario] = useState<string>("");
  const [puesto, setPuesto] = useState<string>("");
  const [rfc, setRfc] = useState<string>("");
  const [curp, setCurp] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [CorreoElectronico, setCorreoElectronico] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>();
  const [telValid, setTelValid] = useState<boolean>();
  const [celValid, setCelValid] = useState<boolean>();
  const [tokenValid, setTokenValid] = useState<boolean>();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const token = JSON.parse(String(getToken()));
  const [emailError, setEmailError] = useState('')
  const [telError, setTelError] = useState('')
  const [celError, setCelError] = useState('')

  const loadFilter = (tipo: number) => {
    let data = { NUMOPERACION: tipo };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (tipo === 7) {
        setDepartamentos(res.RESPONSE);
      } else if (tipo === 9) {
        setPerfiles(res.RESPONSE);
      }

    });
  }
  const handleFilterChange = (v: string) => {
    setIdDepartamento(v);
  };

  const handleFilterChangePerfil = (v: string) => {
    setIdPerfil(v);
  };


  const validateEmail = (e: any) => {
    var email = e.target.value
    setCorreoElectronico(email);
    if (validator.isEmail(email)) {
      setEmailError('email válido')
      setEmailValid(true);
    } else {
      setEmailError('Ingrese email válido')
      setEmailValid(false);
    }
  }
  const validateNumber = (e: any) => {
    var tel = e.target.value
    setTelefono(tel);
    if (validator.isNumeric(tel)) {
      setTelError('')
      setTelValid(true);
    } else {
      setTelError('Ingrese Numeros')
      setTelValid(false);
    }
  }
  const validateCel = (e: any) => {
    var cel = e.target.value
    setCelular(cel);
    if (validator.isNumeric(cel)) {
      setCelError('')
      setCelValid(true);
    } else {
      setCelError('Ingrese Numeros')
      setCelValid(false);
    }
  }


  const handleSend = () => {
    let data = {
      Nombre: Nombre,
      ApellidoPaterno: ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno,
      NombreUsuario: NombreUsuario,
      CorreoElectronico: CorreoElectronico,
      IdUsuarioModificador: user.id,
      Curp: curp,
      Rfc: rfc,
      Celular: celular,
      Telefono: telefono


    };

    if (
      Nombre ===""||
      ApellidoPaterno ===""||
      ApellidoMaterno ===""||
      NombreUsuario ===""||
      CorreoElectronico ===""||
      emailValid === false||
      telValid ===false||
      telefono ===""||
      curp ===""||
      rfc ===""||
      idDepartamento ===""||
      idPerfil==="" ||
      celular ===""
    ) {
      AlertS.fire({
        title: "Verificar los campos!",
        icon: "warning",
      });
    } else {
      let data = {
        Nombre: Nombre,
        ApellidoPaterno: ApellidoPaterno,
        ApellidoMaterno: ApellidoMaterno,
        NombreUsuario: NombreUsuario,
        CorreoElectronico: CorreoElectronico,
        IdUsuarioModificador: user.id,
        Curp: curp,
        Rfc: rfc,
        Celular: celular,
        Telefono: telefono
      };
      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {


    if (tipo === 5) {
      let dat = {
        NUMOPERACION: tipo,
        CHUSER: user.id,
        CHID: id,
        NOMBRE: Nombre,
        AP: ApellidoPaterno,
        AM: ApellidoMaterno,
        NUSER: NombreUsuario,
        CORREO: CorreoElectronico,
        PUESTO: puesto,
        IDDEPARTAMENTO: idDepartamento,
        IDPERFIL: idPerfil,
        CURP: curp,
        RFC: rfc,
        CELULAR: telefono
      };

      AuthService.adminUser(dat).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro exitoso!"
          });
          handleClose("Registro Exitoso");
        }
      });

    } else {
      UserServices.signup(data, token).then((resUser) => {


        if (resUser.status === 201) {

          let data = {
            NUMOPERACION: 5,
            NOMBRE: "AppName"
          }


          ParametroServices.ParametroGeneralesIndex(data).then((restApp) => {

            UserServices.apps(token).then((resAppLogin) => {

              resAppLogin.data.data.map((item: any) => {
                if (item?.Nombre === restApp.RESPONSE.Valor) {

                  let dat = {
                    NUMOPERACION: tipo,
                    CHUSER: user.id,
                    CHID: resUser.data.IdUsuario,
                    NOMBRE: Nombre,
                    AP: ApellidoPaterno,
                    AM: ApellidoMaterno,
                    NUSER: NombreUsuario,
                    CORREO: CorreoElectronico,
                    IDDEPARTAMENTO: idDepartamento,
                    IDPERFIL: idPerfil,
                    PUESTO: puesto,
                    CURP: curp,
                    RFC: rfc,
                    CELULAR: telefono

                  };

                  AuthService.adminUser(dat).then((res) => {
                    if (res.SUCCESS) {

                      let datLink = {
                        IdUsuario: resUser.data.IdUsuario,
                        IdApp: item.Id,

                      };
                      UserServices.linkuserapp(datLink, token).then((resLink) => {

                        if (resLink.status === 201) {
                          Toast.fire({
                            icon: "success",
                            title: tipo === 3 ? "¡Registro exitoso!" : ""
                          });
                          handleClose("Registro Exitoso");

                        }

                      });
                    }
                  });
                }
              });
            });

          });

        }

        else if (resUser.status === 409) {
          AlertS.fire({
            title: "Error!",
            text: resUser.data.msg,
            icon: "error",
          });
        }
      });
    }
  };

  useEffect(() => {

    let d = {

    }
    UserServices.verify(d, token).then((resAppLogin) => {
      resAppLogin.status === 200 ?
        setTokenValid(true)
        :
        setTokenValid(false);
    });

    if (dt === "") {
    } else {
      setId(dt?.id);
      setNombre(dt?.Nombre);
      setApellidoPaterno(dt?.ApellidoPaterno);
      setApellidoMaterno(dt?.ApellidoMaterno);
      setNombreUsuario(dt?.NombreUsuario);
      setCorreoElectronico(dt?.CorreoElectronico);
      setPuesto(dt?.Puesto);
      setIdDepartamento(dt?.idDepartamento);
      setIdPerfil(dt?.idperfil);
      setRfc(dt?.Rfc);
      setCurp(dt?.Curp);
      setTelefono(dt?.Telefono);
    }

    loadFilter(7);
    loadFilter(9);
  }, [dt]);

  return (
    <div>
      <Dialog open={open} fullScreen >
        <Grid container spacing={1} sx={{ bgcolor: "#CCCCCC", paddingBottom: "1%", paddingTop: "1%" }}>
          <Grid item xs={12} sm={2} md={2} lg={2} ></Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4"> {tipo === 3 ? "Nuevo Registro" : "Editar Registro"} </Typography>
            </Box>

          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2}  >
            <Button variant="outlined"  onClick={() => handleClose()}>
              <Tooltip title="Salir">
                <IconButton
                  aria-label="close"
                  color="error"
                  onClick={() => handleClose()}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}>
          <Grid item xs={11} sm={11} md={11} lg={11} >
            <Box display="flex" flexWrap="wrap" boxShadow={2} sx={{ padding: "2%" }}>
              <Grid item xs={12} sm={12} md={6} lg={6} sx={{ paddingRight: "2%", paddingLeft: "2%" }}  >
                <TextField
                  required
                  margin="dense"
                  id="nombre"
                  label="Nombre"
                  value={Nombre}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNombre(v.target.value)}
                  error={Nombre === null ? true : false}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  required
                  margin="dense"
                  id="ApellidoPaterno"
                  label="Apellido Paterno"
                  value={ApellidoPaterno}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setApellidoPaterno(v.target.value)}
                  error={ApellidoPaterno === null ? true : false}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  required
                  margin="dense"
                  id="ApellidoMaterno"
                  label="Apellido Materno"
                  value={ApellidoMaterno}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setApellidoMaterno(v.target.value)}
                  error={ApellidoMaterno === null ? true : false}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  required
                  margin="dense"
                  id="NombreUsuario"
                  label="Nombre Usuario"
                  value={NombreUsuario}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNombreUsuario(v.target.value)}
                  error={NombreUsuario === null ? true : false}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  required
                  margin="dense"
                  id="CorreoElectronico"
                  label="Correo Electronico"
                  fullWidth
                  value={CorreoElectronico}
                  variant="standard"
                  onChange={(e) => validateEmail(e)}
                  error={emailValid === false || CorreoElectronico == null}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography variant="body2"> {emailError} </Typography>

                <TextField
                  required
                  margin="dense"
                  id="Puesto"
                  label="Puesto"
                  value={puesto}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setPuesto(v.target.value)}
                  error={puesto === null ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  required
                  margin="dense"
                  id="RFC"
                  label="RFC"
                  value={rfc}
                  type="text"
                  fullWidth
                  inputProps={{ maxLength: 13 }}
                  variant="standard"
                  onChange={(v) => setRfc(v.target.value.toUpperCase())}
                  error={rfc === null ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} sx={{ paddingRight: "2%", paddingLeft: "2%" }}   >
                <TextField
                  required
                  margin="dense"
                  id="curp"
                  label="CURP"
                  value={curp}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setCurp(v.target.value)}
                  inputProps={{ maxLength: 18 }}
                  error={curp === null ? true : false}
                />
                <TextField
                  required
                  margin="dense"
                  id="telefono"
                  label="Telefono"
                  value={telefono}
                  type="text"
                  fullWidth
                  inputProps={{ maxLength: 10, mask: "(___) ___-____" }}
                  variant="standard"
                  onChange={(e) => validateNumber(e)}
                  error={!telValid || !telefono}
                  InputLabelProps={{ shrink: true }}

                />
                <Typography variant="body2"> {telError} </Typography>
                <br />
                <TextField
                  required
                  margin="dense"
                  id="celular"
                  label="Telefono Movil"
                  value={celular}
                  type="text"
                  fullWidth
                  inputProps={{ maxLength: 10, mask: "(___) ___-____" }}
                  variant="standard"
                  onChange={(e) => validateCel(e)}
                  error={!celValid || !celular}
                  InputLabelProps={{ shrink: true }}

                />
                <Typography variant="body2"> {celError} </Typography>
                <br />
                <Typography variant="body2"> Departamento: </Typography>
                <SelectFrag
                  value={idDepartamento}
                  options={departamento}
                  onInputChange={handleFilterChange}
                  placeholder={"Seleccione Departamento"}
                  label={""}
                  disabled={false}
                />
                <br />
                <Typography variant="body2"> Perfil: </Typography>
                <SelectFrag
                  value={idPerfil}
                  options={perfiles}
                  onInputChange={handleFilterChangePerfil}
                  placeholder={"Seleccione Perfil"}
                  label={""}
                  disabled={false}
                />

                <Grid xs={12} sm={12} md={12} lg={12} sx={{ paddingTop: "3%" }}  >
                  <Box maxHeight={1 / 2} flexDirection="row"> </Box>
                  <Box maxHeight={1 / 2} flexDirection="row">
                    <DialogActions>
                      <Button
                        className="guardar"
                        color="info"
                        onClick={() => handleSend()}
                      >
                        {tipo === 3 ? "Guardar" : "Actualizar"}
                      </Button>
                    </DialogActions>
                  </Box>
                </Grid>

              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default UsuariosModal;



