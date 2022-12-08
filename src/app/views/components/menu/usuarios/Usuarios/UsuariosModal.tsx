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
import { RESPONSE, SolUser, SolUserData } from "../../../../../interfaces/user/UserInfo";
import { getPU, getToken, getUser } from "../../../../../services/localStorage";
import validator from 'validator';
import { UserServices } from "../../../../../services/UserServices";
import { ParametroServices } from "../../../../../services/ParametroServices";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import CloseIcon from '@mui/icons-material/Close';
import { UserReponse } from "../../../../../interfaces/user/UserReponse";
import Swal from "sweetalert2";
import { render } from "react-dom";
import SelectFragLogin from "../../../Fragmentos/SelectFragLogin";
import { text } from "node:stream/consumers";
import ModalForm from "../../../componentes/ModalForm";
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
  const [nameDep, setNameDep] = useState<string>("");

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

  const [tokenValid, setTokenValid] = useState<boolean>();

  const user: RESPONSE = JSON.parse(String(getUser()));
  const [emailError, setEmailError] = useState('')
  const [telError, setTelError] = useState('')
  const [celError, setCelError] = useState('')
  const [extError, setExtError] = useState('')

  const [ext, setExt] = useState<string>("");

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
  const handleFilterChange = (v: any) => {
    setIdDepartamento(v.value);
    setNameDep(v.label);
  };

  const handleFilterChangePerfil = (v: any) => {
    setIdPerfil(v.value);
    setNamePerf(v.label);
  };

  const Validator = (v: string, tipo: string) => {
    ///// clave
    if (tipo === "email") {
      if (validator.isEmail(v)) {
        setCorreoElectronico(v)
        setEmailError('email válido')
        setEmailValid(true);
      } else {
        setCorreoElectronico(v)
        setEmailError('Ingrese email válido')
        setEmailValid(false);
        setCorreoElectronico(v)
      }
    }
    else if (tipo === "tel") {
      if (validator.isNumeric(v)) {
        setTelError('')
        setTelValid(true);
        setTelefono(v)
      } else {
        setTelError('Ingrese Numeros')
        setTelValid(false);
        setTelefono(v)

      }
    }
    else if (tipo === "ext") {
      if (validator.isNumeric(v)) {
        setExtError('')
        setExtValid(true);
        setExt(v)
      } else {
        setExtError('Ingrese Numeros')
        setExtValid(false);
        setExt(v)

      }
    }
    else if (tipo === "cel") {
      if (validator.isNumeric(v)) {
        setCelError('')
        setCelValid(true);
        setCelular(v)
      } else {
        setCelError('Ingrese Numeros')
        setCelValid(false);
        setCelular(v)

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
          'Nombre: ' + Nombre + '  ' + ApellidoPaterno + ' ' + ApellidoMaterno + ' <br/>' +
          'Nombre Usuario:  ' + NombreUsuario + '<br/> ' +
          'Correo Electronico: ' + CorreoElectronico + '<br/> ' +
          'Puesto: ' + puesto + '<br/> ' +
          'RFC: ' + rfc + ' <br/> ' +
          'CURP: ' + curp + '<br/>  ' +
          'Telefono: ' + telefono + ' <br/> ' +
          'Extencion: ' + ext + ' <br/> ' +
          'Celular: ' + celular + ' <br/> ' +
          'Departamento: ' + nameDep + '<br/>  ' +
          'Perfil: ' + namePerf + '<br/>  '
        ,
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
            title: "¡Registro exitoso!"
          });
          handleClose("Registro Exitoso");
        } else {
          Toast.fire({
            icon: "error",
            title: "Error ",

          });

        }
      });

    } else {
      UserServices.signup(data).then((resUser) => {

        let dataAppId = {
          NUMOPERACION: 5,
          NOMBRE: "AppID"
        }

        ParametroServices.ParametroGeneralesIndex(dataAppId).then((resAppId) => {

          if (resUser.status === 201) {
            let datSol = {
              IdUsuario: resUser?.data?.IdUsuario,
              DatosAdicionales: "Departamento: " + nameDep + " Perfil: " + namePerf,
              TipoSolicitud: "Alta",
              CreadoPor: user.id,
              IdApp: resAppId?.RESPONSE?.Valor,
            };

            UserServices.createsolicitud(datSol).then((resSol) => {


              console.log(resSol.data.data[0][0].IdSolicitud)
              if (resSol.data.data[0][0].Respuesta === "201") {

                let dat = {
                  NUMOPERACION: tipo,
                  CHUSER: user.id,
                  idUsuarioCentral: resUser?.data?.IdUsuario,
                  PUESTO: puesto,
                  IDDEPARTAMENTO: idDepartamento,
                  IDPERFIL: idPerfil,
                  IDSOLICITUD: resSol.data.data[0][0].IdSolicitud
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
              }
            });

          }

          else {
            AlertS.fire({
              title: "Error!",
              text: resAppId.RESPONSE,
              icon: "warning",
            });
          }
        });
      });
    }
  }




  useEffect(() => {

    let d = {

    }
    UserServices.verify(d).then((resAppLogin) => {
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
      setIdPerfil(dt?.idPerfil);
      setRfc(dt?.Rfc);
      setCurp(dt?.Curp);
      setTelefono(dt?.Telefono);
    }

    loadFilter(7);
    loadFilter(9);
  }, [dt]);

  return (
    <div>
      <ModalForm title={tipo === 3 ? "Nuevo Registro" : "Editar Registro"} handleClose={handleClose}>
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
                <Grid xs={12} sm={12} md={12} lg={12} sx={{ paddingTop: "3%" }}  >
                  <Box maxHeight={1 / 2} flexDirection="row"> </Box>
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



