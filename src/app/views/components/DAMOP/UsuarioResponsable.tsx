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
  const [nuevaRelacion, setNuevaRelacion] = useState<boolean>();
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
      IDUSUARIODELEGADO: usedelegadoid==="false"?"":usedelegadoid,
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
              title: "Relacion Eliminada!",
            })
            :
            Toast.fire({
              icon: "info",
              title: nuevaRelacion ? "Registro Agregado!" : "Registro Actualizado!",
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
              title: "Relacion Eliminada!",
            })
            :
            Toast.fire({
              icon: "info",
              title: nuevaRelacion ? "Registro Agregado!" : "Registro Actualizado!",
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
        <Box boxShadow={3} paddingTop={3}>
          <Grid container spacing={1}>
            <Grid xs={3}> </Grid>
            <Grid xs={5}>
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

              <Grid item xs={12} paddingBottom={2}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1} >
                  {/* <Grid item container xs={12}   justifyContent="space-between" >  */}
                  <Button
                    disabled={!nuevoRegistro || userid === undefined || userid === "false"
                      // userid=== undefined || userid==="false" || usedelegadoid===undefined ||usedelegadoid==="false" 
                    }
                    className="editar"
                    onClick={() => saveInfo(false)}
                    sx={{ fontFamily: "sans-serif" }}
                  >
                    {nuevaRelacion ? "Asignar" : "Actualizar"}
                  </Button>
                  {!nuevaRelacion ?
                    <Button
                      className="regresar"
                      color="error"
                      onClick={() => saveInfo(true)}
                      sx={{ fontFamily: "sans-serif" }}
                    >
                      Eliminar relación
                    </Button> :
                    ""

                  }

                  {/* </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ModalForm>
    </>
  );
};

export default UsuarioResponsable;
