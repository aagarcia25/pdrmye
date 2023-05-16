import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import ModalForm from "../componentes/ModalForm";
import SelectFrag from "../Fragmentos/SelectFrag";
import Slider from "../Slider";

const UsuarioResponsable = ({
  handleClose,
  id,
  nombre,
  tipo
}: {
  handleClose: Function;
  id: string;
  nombre: string;
  tipo: string;

}) => {
  const [slideropen, setslideropen] = useState(true);
  const [usuarios, setUsuarios] = useState<SelectValues[]>([]);
  const [usuariosDelegado, setUsuariosDelegado] = useState<SelectValues[]>([]);
  const [userid, setUserId] = useState<string>("");
  const [usedelegadoid, setuserdelegadoid] = useState<string>("");
  const [nuevaRelacion, setNuevaRelacion] = useState<boolean>(true);
  const [nuevoRegistro, setNuevoRegistro] = useState<boolean>(false);

  const [idReg, setIdReg] = useState<string>("");


  const handleChange1 = (v: string) => {
    setUserId(v);
    setNuevoRegistro(true);
  };

  const handleChange2 = (v: string) => {
    setuserdelegadoid(v);
    setNuevoRegistro(true);
  };

  const handleSend = () => { };

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion, TIPO: tipo };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 1) {
        setUsuarios(res.RESPONSE);
        setUsuariosDelegado(res.RESPONSE);
        setslideropen(false);
      }
    });
  };

  const loadinfo = () => {

    if (tipo === "MUN") {

      let data = {
        NUMOPERACION: 5,
        CHID: id
      };


      CatalogosServices.municipios(data).then((res) => {

        if (res.RESPONSE.length === 0) {
          setNuevaRelacion(true);
          setuserdelegadoid("");
          setUserId("");
        } else {
          setNuevaRelacion(false);
          setUserId(res?.RESPONSE[0]?.idUsuario);
          setuserdelegadoid(res?.RESPONSE[0]?.idUsuarioDelegado ? res?.RESPONSE[0]?.idUsuarioDelegado : "");
          setIdReg(res?.RESPONSE[0]?.id)
        }
      });
    }
    if (tipo === "ORG") {

      let data = {
        NUMOPERACION: 5,
        CHID: id
      };


      CatalogosServices.Organismos(data).then((res) => {

        if (res.RESPONSE.length === 0) {
          setNuevaRelacion(true);
          setuserdelegadoid("");
          setUserId("");
        } else {
          setNuevaRelacion(false);
          setUserId(res?.RESPONSE[0]?.idUsuarioRes);
          setuserdelegadoid(res?.RESPONSE[0]?.idDelegado ? res?.RESPONSE[0]?.idDelegado : "");
          setIdReg(res?.RESPONSE[0]?.id)
        }
      });
    }

  };


  const saveInfo = (eliminar: boolean) => {
    let data = {
      NUMOPERACION: nuevaRelacion ? 6 : 8,
      IDUSUARIO: userid,
      IDUSUARIODELEGADO: usedelegadoid === "false" ? "" : usedelegadoid,
      IdMunOrg: id,
      CHID: idReg,
    };
    let dataElim = {
      NUMOPERACION: 9,
      CHID: idReg
    };

    if (tipo === "MUN") {


      CatalogosServices.municipios(eliminar ? dataElim : data).then((res) => {
        //console.log(res.RESPONSE);
        if (res.SUCCESS) {
          loadinfo();
          setNuevoRegistro(false);
          setuserdelegadoid("");
          setUserId("");

          eliminar ?
            Toast.fire({
              icon: "error",
              title: "¡Relación Eliminada!",
            })
            :
            Toast.fire({
              icon: "info",
              title: nuevaRelacion ? "¡Relación Asignada!" : "¡Relación Actualizada!",
            });
        }
      });
    }
    if (tipo === "ORG") {

      CatalogosServices.Organismos(eliminar ? dataElim : data).then((res) => {
        if (res.SUCCESS) {
          loadinfo();
          setNuevoRegistro(false);
          setuserdelegadoid("");
          setUserId("");

          eliminar ?
            Toast.fire({
              icon: "error",
              title: "¡Relación Eliminada!",
            })
            :
            Toast.fire({
              icon: "info",
              title: nuevaRelacion ? "¡Relación Agregado!" : "¡Relación Actualizada!",
            });
        }
      });
    }

  };

  useEffect(() => {
    loadFilter(1);
    loadinfo();
  }, []);

  return (
    <>
      <Slider open={slideropen}></Slider>
      <ModalForm title={
        tipo === "MUN" ?
          "Usuario Responsable del Municipio: " + nombre
          : "Usuario Responsable del Organismo: " + nombre}
        handleClose={handleClose} >
        <div className="containerCente">
          <Box display={"flex"} paddingTop={3} justifyContent={"center"}>

            <Grid boxShadow={3} container item xs={12} sm={10} md={8} lg={5} spacing={1} padding={2} alignItems="center" justifyContent="center">

              <Grid item xs={12}>
                <Grid item xs={12} paddingBottom={2}>
                  <Typography variant="h6"> Usuario Responsable </Typography>
                </Grid>
                <Grid item xs={12} paddingBottom={2}>
                  <SelectFrag
                    value={userid}
                    options={usuarios}
                    onInputChange={handleChange1}
                    placeholder={"Seleccione Usuario"}
                    label={""}
                    disabled={false}
                  />
                </Grid>

                <Grid item xs={12} paddingBottom={2}>
                  <Typography variant="h6">Usuario Delegado</Typography>
                </Grid>
                <Grid item xs={12} paddingBottom={2}>
                  <SelectFrag
                    value={usedelegadoid}
                    options={usuariosDelegado}
                    onInputChange={handleChange2}
                    placeholder={"Seleccione Usuario"}
                    label={""}
                    disabled={false}
                  />
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} >
                  <Grid item xs={12} md={6} paddingBottom={2}>
                    <Button
                      disabled={!nuevoRegistro || userid === undefined || userid === "false"}
                      className="agregar"
                      onClick={() => saveInfo(false)} >
                      {nuevaRelacion ? "Asignar" : "Actualizar"}
                    </Button>
                  </Grid>
                  {!nuevaRelacion ?
                    <Grid item xs={12} md={6} paddingBottom={2}>
                      <Button
                        className="cancelar"
                        onClick={() => saveInfo(true)}
                      >
                        Eliminar relación
                      </Button>
                    </Grid>
                    :
                    ""

                  }

                </Grid>
              </Grid>
            </Grid>

          </Box>
        </div>
      </ModalForm>
    </>
  );
};

export default UsuarioResponsable;
