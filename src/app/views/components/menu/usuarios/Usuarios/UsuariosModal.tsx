import { useEffect, useState } from "react";
import {
  TextField,
  DialogActions,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getRfToken, getToken, getUser, setToken } from "../../../../../services/localStorage";
import validator from "validator";
import { UserServices } from "../../../../../services/UserServices";
import { ParametroServices } from "../../../../../services/ParametroServices";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Swal from "sweetalert2";
import SelectFragLogin from "../../../Fragmentos/SelectFragLogin";
import ModalForm from "../../../componentes/ModalForm";
import { useLocation } from "react-router";
import { SolicitudUsrTiDetalle } from "../../../../../interfaces/user/solicitudes";
import jwt_decode from "jwt-decode";
import { UserLogin } from "../../../../../interfaces/user/User";
import { env_var } from "../../../../../environments/env";
const UsuariosModal = ({
  handleClose,
  tipo,
  dt,
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  const query = new URLSearchParams(useLocation().search);
  const [id, setId] = useState<string>();
  const [departamento, setDepartamentos] = useState<SelectValues[]>([]);
  const [idDepartamento, setIdDepartamento] = useState<string>("");
  const [nameDep, setNameDep] = useState<string>("");
  const [uresp, setUresp] = useState<SelectValues[]>([]);
  const [idUresp, setIdUresp] = useState<string>("");
  const [nameUresp, setNameUresp] = useState<string>("Sin Unidad Asignada");
  const [perfiles, setPerfiles] = useState<SelectValues[]>([]);
  const [idPerfil, setIdPerfil] = useState<string>("");
  const [namePerf, setNamePerf] = useState<string>("");
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
  const [extValid, setExtValid] = useState<boolean>(true);
  const [usuariosiregob, setusuariosiregob] = useState<string>("Sin Usuario Asignado");
  const [tokenValid, setTokenValid] = useState<boolean>();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");
  const [celError, setCelError] = useState("");
  const [extError, setExtError] = useState("");
  const [ext, setExt] = useState<string>("");

  const loadFilter = (tipo: number) => {
    let data = { NUMOPERACION: tipo };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (tipo === 7) {
        setDepartamentos(res.RESPONSE);
      } else if (tipo === 9) {
        setPerfiles(res.RESPONSE);
      } else if (tipo === 26) {
        setUresp(res.RESPONSE);
      }
    });
  };
  const handleFilterChange = (v: any) => {
    setIdDepartamento(v.value);
    setNameDep(v.label);
  };

  const handleFilterChangePerfil = (v: any) => {
    setIdPerfil(v.value);
    setNamePerf(v.label);
  };

  const handleFilterChangeures = (v: any) => {
    setIdUresp(v.value);
    setNameUresp(v.label);
  };

  const Validator = (v: string, tipo: string) => {
    if (tipo === "email") {
      if (validator.isEmail(v)) {
        setCorreoElectronico(v);
        setEmailError("email válido");
        setEmailValid(true);
      } else {
        setCorreoElectronico(v);
        setEmailError("Ingrese email válido");
        setEmailValid(false);
        setCorreoElectronico(v);
      }
    } else if (tipo === "tel") {
      if (validator.isNumeric(v)) {
        setTelError("");
        setTelValid(true);
        setTelefono(v);
      } else {
        setTelError("Ingrese Numeros");
        setTelValid(false);
        setTelefono(v);
      }
    } else if (tipo === "ext") {
      if (validator.isNumeric(v)) {
        setExtError("");
        setExtValid(true);
        setExt(v);
      } else {
        setExtError("Ingrese Numeros");
        setExtValid(false);
        setExt(v);
      }
    } else if (tipo === "cel") {
      if (validator.isNumeric(v)) {
        setCelError("");
        setCelValid(true);
        setCelular(v);
      } else {
        setCelError("Ingrese Numeros");
        setCelValid(false);
        setCelular(v);
      }
    }
  };

  const handleSend = () => {
    if (
      Nombre === "" ||
      ApellidoPaterno === "" ||
      ApellidoMaterno === "" ||
      NombreUsuario === "" ||
      CorreoElectronico === "" ||
      emailValid === false ||
      telValid === false ||
      telefono === "" ||
      curp === "" ||
      rfc === "" ||
      idDepartamento === "" ||
      idPerfil === "" ||
      celular === "" ||
      puesto === ""
    ) {
      AlertS.fire({
        title: "Verificar los campos!",
        icon: "warning",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Estas Seguro de Enviar ?",
        html:
          "Nombre: " +
          Nombre +
          "  " +
          ApellidoPaterno +
          " " +
          ApellidoMaterno +
          " <br/>" +
          "Nombre Usuario:  " +
          NombreUsuario +
          "<br/> " +
          "Correo Electronico: " +
          CorreoElectronico +
          "<br/> " +
          "Puesto: " +
          puesto +
          "<br/> " +
          "RFC: " +
          rfc +
          " <br/> " +
          "CURP: " +
          curp +
          "<br/>  " +
          "Telefono: " +
          telefono +
          " <br/> " +
          "Extencion: " +
          ext +
          " <br/> " +
          "Celular: " +
          celular +
          " <br/> " +
          "Departamento: " +
          nameDep +
          "<br/>  " +
          "Perfil: " +
          namePerf +
          "<br/>  " +
          "Usuario Siregob: " +
          usuariosiregob +
          "<br/>  " +
          "Unidad Responsable: " +
          nameUresp +
          "<br/>  ",

        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            Nombre: Nombre,
            ApellidoPaterno: ApellidoPaterno,
            ApellidoMaterno: ApellidoMaterno,
            NombreUsuario: NombreUsuario,
            CorreoElectronico: CorreoElectronico,
            IdUsuarioModificador: user.id,
            Curp: curp,
            Rfc: rfc,
            Telefono: telefono,
            Ext: ext,
            Celular: celular,
            IdTipoUsuario: "",
          };
          handleRequest(data);
        } else if (result.isDenied) {
          Swal.fire("Solicitud no Realizada", "", "info");
        }
      });
    }
  };


  const RfToken = () => {
    UserServices.refreshToken().then((resAppRfToken) => {
      console.log(resAppRfToken)
      if (resAppRfToken?.status === 200) {
        setTokenValid(true);
        setToken(resAppRfToken?.data.token);
      } else {
        setTokenValid(false);
        Swal.fire({
          title: "Sesión Demasiado Antigua",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {

          if (result.isConfirmed) {
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(env_var.BASE_URL_LOGIN);
          }
        });
  
      }
    });
  };

  const handleRequest = (data: any) => {
    if (tipo === 5) {
      let dat = {
        NUMOPERACION: tipo,
        CHUSER: user.id,
        CHID: id,
        PUESTO: puesto,
        IDDEPARTAMENTO: idDepartamento,
        IDPERFIL: "AppID",
      };

      AuthService.adminUser(dat).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro exitoso!",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Error ",
          });
        }
      });
    } else if (tipo === 3) {

      const decoded: UserLogin = jwt_decode(String(getToken()));

      if (((decoded.exp - (Date.now() / 1000)) / 60) > 1) {

        UserServices.verify({}).then((resAppLogin) => {

          if (resAppLogin.status === 200) {
            let dataAppId = {
              NUMOPERACION: 5,
              NOMBRE: "AppID",
            };

            ParametroServices.ParametroGeneralesIndex(dataAppId).then(
              (resAppId) => {

                let datSol = {
                  Nombre: Nombre,
                  APaterno: ApellidoPaterno,
                  AMaterno: ApellidoMaterno,
                  NombreUsuario: NombreUsuario,
                  Email: CorreoElectronico,
                  Curp: curp,
                  RFC: rfc,
                  Celular: celular,
                  Telefono: telefono,
                  Extencion: ext,
                  TipoSolicitud: "Alta",
                  DatosAdicionales: "Departamento: " + nameDep + " Perfil: " + namePerf,
                  IdApp: resAppId?.RESPONSE?.Valor,
                  CreadoPor: user.id,
                };

                UserServices.createsolicitud(datSol).then((resSol) => {
                  console.log("respuesta de servicio de login");
                  console.log(resSol);
                  console.log(data.data);

                  if (resSol.data.data[0][0].Respuesta === "201") {
                    let url = "IdUsuario=" + user.id + "&IdSolicitud=" + resSol.data.data[0][0].IdSolicitud;
                    UserServices.detalleSol(url).then((resuser) => {
                      console.log("respuesta de servicio de detalleSol");
                      console.log(resuser);
                      console.log(resuser.data);
                      const resuserTi: SolicitudUsrTiDetalle = resuser.data;
                      let dat = {
                        NUMOPERACION: tipo,
                        CHUSER: user.id,
                        PUESTO: puesto,
                        IDDEPARTAMENTO: idDepartamento,
                        IDPERFIL: idPerfil,
                        IDSOLICITUD: resuserTi.Id,
                        IDURESP: idUresp,
                        USUARIOSIREGOB: usuariosiregob === "Sin Usuario Asignado" ? "" : usuariosiregob,
                        USUARIO: resuserTi.NombreUsuario
                      };

                      AuthService.adminUser(dat).then((res) => {
                        if (res.SUCCESS) {
                          Toast.fire({
                            icon: "success",
                            title: "¡Registro exitoso!",
                          });
                          handleClose("Registro Exitoso");
                        }
                      });
                    });
                  } else {
                    //alerta
                  }
                });
              }
            );
          } else {
            RfToken();
          }
        });

      }

    }
  };

  useEffect(() => {
    UserServices.verify({}).then((resAppLogin) => {
      resAppLogin.status === 200 ? setTokenValid(true) : setTokenValid(false);
      if (resAppLogin.status === 401){
        RfToken();
      }
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
      setIdPerfil(dt?.idPerfil);
      setRfc(dt?.Rfc);
      setCurp(dt?.Curp);
      setTelefono(dt?.Telefono);
    }

    loadFilter(7);
    loadFilter(9);
    loadFilter(26);
  }, [dt]);

  return (
    <div>
      <ModalForm
        title={tipo === 3 ? "Nuevo Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Box
              display="flex"
              flexWrap="wrap"
              boxShadow={2}
              sx={{ padding: "2%" }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{ paddingRight: "2%", paddingLeft: "2%" }}
              >
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
                  inputProps={{
                    maxLength: 20,
                  }}
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
                  inputProps={{
                    maxLength: 20,
                  }}
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
                  inputProps={{
                    maxLength: 20,
                  }}
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
                  inputProps={{
                    maxLength: 30,
                  }}
                />

                <TextField
                  required
                  margin="dense"
                  id="CorreoElectronico"
                  label="Correo Electronico"
                  fullWidth
                  value={CorreoElectronico}
                  variant="standard"
                  onChange={(e) => Validator(e.target.value, "email")}
                  error={emailValid === false || CorreoElectronico == null}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 100,
                  }}
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
                  inputProps={{
                    maxLength: 200,
                  }}
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

                <TextField
                  margin="dense"
                  id="usuariosiregob"
                  label="Usuario SIREGOB"
                  value={usuariosiregob === "Sin Usuario Asignado" ? "" : usuariosiregob}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setusuariosiregob(v.target.value)}
                  // error={usuariosiregob === null ? true : false}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    maxLength: 20,
                  }}
                ></TextField>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{ paddingRight: "2%", paddingLeft: "2%" }}
              >
                <TextField
                  required
                  margin="dense"
                  id="curp"
                  label="CURP"
                  value={curp}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setCurp(v.target.value.toUpperCase())}
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
                  onChange={(e) => Validator(e.target.value, "tel")}
                  error={!telValid || !telefono}
                  helperText={telError}
                  InputLabelProps={{ shrink: true }}
                />
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
                  onChange={(e) => Validator(e.target.value, "cel")}
                  error={!celValid || !celular}
                  helperText={celError}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  margin="dense"
                  id="ext"
                  label="Ext"
                  value={ext}
                  type="text"
                  fullWidth
                  inputProps={{ maxLength: 4 }}
                  variant="standard"
                  onChange={(e) => Validator(e.target.value, "ext")}
                  helperText={"Opcional* " + extError}
                  InputLabelProps={{ shrink: true }}
                  error={!extValid}
                />
                <Typography variant="body2"> {celError} </Typography>
                <br />
                <Typography variant="body2"> Departamento: </Typography>
                <SelectFragLogin
                  value={idDepartamento}
                  options={departamento}
                  onInputChange={handleFilterChange}
                  placeholder={"Seleccione Departamento"}
                  label={""}
                  disabled={false}
                />
                <br />
                <Typography variant="body2"> Perfil: </Typography>
                <SelectFragLogin
                  value={idPerfil}
                  options={perfiles}
                  onInputChange={handleFilterChangePerfil}
                  placeholder={"Seleccione Perfil"}
                  label={""}
                  disabled={false}
                />
                <br />
                <Typography variant="body2"> U. Responsable: </Typography>
                <SelectFragLogin
                  value={idUresp}
                  options={uresp}
                  onInputChange={handleFilterChangeures}
                  placeholder={"Seleccione U. Responsable"}
                  label={""}
                  disabled={false}
                />

                <Grid xs={12} sm={12} md={12} lg={12} sx={{ paddingTop: "3%" }}>
                  <Box maxHeight={1 / 2} flexDirection="row">
                    {" "}
                  </Box>
                  <Box maxHeight={1 / 2} flexDirection="row">
                    <DialogActions>
                      <Button
                        className="guardar"
                        color="info"
                        onClick={() => handleSend()}
                      >
                        {tipo === 3 ? "Solicitar" : "Solicitar Actualización"}
                      </Button>
                    </DialogActions>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </ModalForm>
    </div>
  );
};

export default UsuariosModal;
