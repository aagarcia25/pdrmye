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

  const handleChange1 = (v: string) => {
    setUserId(v);
  };

  const handleChange2 = (v: string) => {
    setuserdelegadoid(v);
  };

  const handleSend = () => {};

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
    CHID:dt.id
  };

  CatalogosServices.municipios(data).then((res) => {
    setUserId(res?.RESPONSE[0]?.idUsuario);
    console.log(res?.RESPONSE[0])
    setuserdelegadoid(res?.RESPONSE[0]?.idUsuarioDelegado);
  });
};


const saveInfo = () => {
  let data = {
    NUMOPERACION: 6,
    IDUSUARIO:userid,
    IDMUNICIPIO:dt.id,
    IDUSUARIODELEGADO:usedelegadoid
  };

  CatalogosServices.municipios(data).then((res) => {
    //console.log(res.RESPONSE);
    Toast.fire({
      icon: "success",
      title: "Consulta Exitosa!",
    });
  });
};

  useEffect(() => {
    //console.log(dt);
    loadFilter(1);
    loadinfo();
  },[]);

  return (
    <>
    <Slider open={slideropen}></Slider>
    <ModalForm title={"Usuario Responsable del Municipio"} handleClose={handleClose} >
     
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
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} >
            <Grid item xs={2} > 
                <Button
                  color="info"
                  onClick={() => saveInfo()}
                  sx={{ fontFamily: "sans-serif" }}
                >
                  Actualizar
                </Button>
                </Grid>
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
