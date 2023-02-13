import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Toast } from "../../../../../helpers/Toast";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModalForm from "../../../componentes/ModalForm";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import Slider from "../../../Slider";

const MunicipiosUsuarioResponsable = ({
  handleClose,
  dt,
}: {
  handleClose: Function;
  dt: any;
}) => {
  const [slideropen, setslideropen] = useState(true);
  const [usuarios, setUsuarios] = useState<SelectValues[]>([]);
  const [usuariosDelegado, setUsuariosDelegado] = useState<SelectValues[]>([]);
  const [userid, setUserId] = useState<string>("");
  const [usedelegadoid, setuserdelegadoid] = useState<string>("");
  const [nuevaRelacion, setNuevaRelacion] = useState<boolean>();
  const [idReg, setIdReg] = useState<string>("");


  const handleChange1 = (v: string) => {
    setUserId(v);
  };

  const handleChange2 = (v: string) => {
    setuserdelegadoid(v);
  };

  const handleSend = () => { };

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 1) {
        setUsuarios(res.RESPONSE);
        setUsuariosDelegado(res.RESPONSE);
        setslideropen(false);
      }
    });
  };

  const loadinfo = () => {
    let data = {
      NUMOPERACION: 5,
      CHID: dt.id
    };

    CatalogosServices.municipios(data).then((res) => {

      if (res.RESPONSE.length === 0) {
        setNuevaRelacion(true);
      } else {
        setNuevaRelacion(false);
      }

      setUserId(res?.RESPONSE[0]?.idUsuario);
      setuserdelegadoid(res?.RESPONSE[0]?.idUsuarioDelegado);
      setIdReg(res?.RESPONSE[0]?.id)
    });
  };


  const saveInfo = (eliminar:boolean) => {
    let data = {
      NUMOPERACION: nuevaRelacion ? 6 : 8,
      IDUSUARIO: userid,
      IDUSUARIODELEGADO: usedelegadoid,
      IDMUNICIPIO: dt.id,
      CHID: idReg
    };
    let dataElim = {
      NUMOPERACION: 9,
      CHID: idReg
    };

    CatalogosServices.municipios(eliminar? dataElim :data).then((res) => {
      //console.log(res.RESPONSE);
      if(res.SUCCESS){
      loadinfo();
      eliminar?
      Toast.fire({
        icon: "error",
        title:"Relacion Eliminada!",
      })
      :
      Toast.fire({
        icon: "info",
        title: nuevaRelacion?"Registro Agregado!":"Registro Actualizado!",
      });
      }
      
 
    });
  };

  useEffect(() => {
    // console.log(dt.row.Nombre);
    loadFilter(1);
    loadinfo();
    console.log(userid +"   ---   "+usedelegadoid)
  }, []);

  return (
    <>
      <Slider open={slideropen}></Slider>
      <ModalForm title={"Usuario Responsable del Municipio: " + dt?.row?.Nombre} handleClose={handleClose} >

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
                  placeholder={"Sleccione Usuario"}
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
                    disabled={userid=== undefined || userid==="false" || usedelegadoid===undefined ||usedelegadoid==="false" }
                    className="editar"
                    onClick={() => saveInfo(false)}
                    sx={{ fontFamily: "sans-serif" }}
                  >
                   {nuevaRelacion?"Asignar":"Actualizar"} 
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

export default MunicipiosUsuarioResponsable;
