import { Box, Grid, IconButton, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../../../helpers/Alert";
import { BtnRegresar } from "../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import CalculateIcon from "@mui/icons-material/Calculate";
import { COLOR } from "../../../../styles/colors";
import { RESPONSE } from "../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../services/localStorage";
import Slider from "../../Slider";
import { ArticulosServices } from "../../../../services/ArticulosServices";
import Swal from "sweetalert2";

const Art14m = ({
  titulo,
  onClickBack,
  tipo,
}: {
  titulo: string;
  onClickBack: Function;
  tipo:Number;
}) => {


  const user: RESPONSE = JSON.parse(String(getUser()));
  const [slideropen, setslideropen] = useState(false);
  const [monto, setMonto] = useState<number>();

  const handleclose = () => {
    onClickBack();
  }

  const handleVersion = () => {
    if (monto == null) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        CLAVE: tipo,
        CHUSER: user.id,
        ANIO: 2022,
        IMPORTE: monto,
      };

      Swal.fire({
        icon: "info",
        title: "Se Generar una nueva versión del Articulo ",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          setslideropen(true);
          ArticulosServices.generarVersion(data).then((res) => {
            console.log(res);
            setslideropen(false);
            handleclose();
          });
        }
      });
    }
  };

  


  return (
    <div>
      <Slider open={slideropen}></Slider>
      <Grid container spacing={1} sx={{}}>
        <Grid item xs={3} md={2.1} lg={2.5}>
          <BtnRegresar onClick={handleclose} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Titulo name={titulo} />
          </Box>
        </Grid>
      </Grid>

      <Box>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
          <Grid item xs={7} md={2.1} lg={2.5}>
            <label className="subtitulo">
              Ingrese Monto Observado <br />
              <br />
              <br />
              <br />
            </label>
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid
            item
            xs={5}
            md={5}
            lg={5}
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <label className="contenido">Monto:</label>
          </Grid>
          <Grid item xs={6} md={6}>
            <Input
              sx={{ fontWeight: "MontserratMedium" }}
              required
              placeholder="1500000*"
              id="monto"
              onChange={(v) => setMonto(Number(v.target.value))}
              error={monto == null ? true : false}
              type="number"
            ></Input>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          >
            <IconButton
              onClick={handleVersion}
              sx={{
                borderRadius: 1,
                border: 1,
                bgcolor: COLOR.negro,
                color: COLOR.blanco,
                "&:hover": {
                  bgcolor: COLOR.grisTarjetaBienvenido,
                  color: COLOR.negro,
                },
              }}
            >
              <CalculateIcon />
              Calcular
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Art14m;
