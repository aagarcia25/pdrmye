import {
  Box,
  Grid,
  IconButton,
  Input,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../../../helpers/Alert";
import { Toast } from "../../../../helpers/Toast";
import { CatalogosServices } from "../../../../services/catalogosServices";
import { BtnRegresar } from "../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import { SubTitulo } from "../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import CalculateIcon from "@mui/icons-material/Calculate";
import { COLOR } from "../../../../styles/colors";
import { calculosServices } from "../../../../services/calculosServices";
import { RESPONSE } from "../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../services/localStorage";
import Slider from "../../Slider";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import SelectFrag from "../../Fragmentos/Select/SelectFrag";
import { useParams } from "react-router-dom";

const ModalFondo = ({
  titulo,
  onClickBack,
  modo,
  anio,
  mes
}: {
  titulo: string;
  onClickBack: Function;
  modo: string;
  anio: number;
  mes: string;
}) => {
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [slideropen, setslideropen] = useState(false);
  const [monto, setMonto] = useState<number>();
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [ajustes, setAjustes] = useState<SelectValues[]>([]);
  let year: number = new Date().getFullYear();




  const handleSelectMes = (v: SelectValues) => {
  };
  const handleSelectAjuste = (v: SelectValues) => {
  };


  const handleSend = () => {
    if (monto == null || anio) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
          CHUSER: user.id,
        NUMOPERACION: 1,
        IDESTATUS: "30ec276f-2b14-11ed-afdb-040300000000",
        CLAVEFONDO: "FGP",
        ANIO: year,
        MES: mes,
        ANIOPOBLACION: 2020,
      };
      agregar(data);
    }
  };

  const agregar = (data: any) => {
    calculosServices.CalculoPrincipalindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const mesesc = () => {
    let data = {
      NUMOPERACION: 2
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      setMeses(res.RESPONSE);
    });
  };

  const ajusteesc = () => {
    let data = {
      NUMOPERACION: 3
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      setAjustes(res.RESPONSE);
    });
  };


  let params = useParams();

  useEffect(() => {
    // SE ESTABLECE EL TIEMPO EN ESPERA PARA QUE SE CARGEN DE FORMA CORRECTA LOS COMPONENTES
    console.log(params)
    setTimeout(() => {
      mesesc();
      ajusteesc();
      setslideropen(false);
    }, 3000);
    setslideropen(true);

  }, []);

  return (
    <div>

      <Slider open={slideropen} ></Slider>
      <Grid container spacing={1} sx={{}} >
        <Grid item xs={3} md={2.1} lg={2.5}>
          <BtnRegresar onClick={onClickBack} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ justifyContent: "center", }} >
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", }}>
            <Titulo name={titulo} />
          </Box>
        </Grid>
      </Grid>



      {(modo == "ajuste") ?
        <Box>
          <Grid
            container spacing={1}
            sx={{ justifyContent: "center", }} >

            <Grid item xs={7} md={2.1} lg={2.5}>

              <label className="subtitulo">Ingrese monto y periodo <br /><br /><br /></label>
            </Grid>
          </Grid>


          <Grid container spacing={6}>


            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <label className="contenido">Año:</label>
            </Grid>
            <Grid
              item xs={6}
              sx={{
                display: "flex",
                justifyContent: "left",
              }}>
              <label className="contenido"> {anio}</label>
            </Grid>

            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <label className="contenido">Mes:</label>
            </Grid>

            <Grid item xs={5} md={6} lg={6} sx={{}}>
              <Box sx={{

                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}>
                <label className="contenido">{mes}</label>
              </Box>
            </Grid>

            <Grid
              item
              xs={5} md={5} lg={5}
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <label className="contenido">Monto:</label>
            </Grid>
            <Grid item xs={6} md={6}>
              <Input

                placeholder="1500000*"
                id="monto"
                onChange={(v) => setMonto(Number(v.target.value))}
                error={monto == null ? true : false}
                type="number"
              ></Input>
            </Grid>

            <Grid
              item
              xs={5} md={5} lg={5}
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <label className="contenido">Periodo:</label>
            </Grid>

            <Grid item xs={5} md={6} lg={6} >
              <Box sx={{
                display: "flex",
                alignItems: "center",
              }}>
                <SelectFrag options={ajustes} onInputChange={handleSelectAjuste} placeholder={"Seleccione el Ajuste"}></SelectFrag>
              </Box>
            </Grid>


            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            >
              <IconButton
                className="contenido"
                onClick={handleSend}
                sx={{
                  borderRadius: 1,
                  border: 1,
                  bgcolor: COLOR.negro,
                  color: COLOR.blanco,
                  "&:hover": {
                    bgcolor: COLOR.grisTarjetaBienvenido,
                    color: COLOR.negro,
                    fontFamily: 'MontserratMedium',
                  },
                }}
              >
                <CalculateIcon />
                Calcular
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        : ""}

      {(modo == "calculo") ?
        <Box>
          <Grid
            container spacing={1}
            sx={{ justifyContent: "center", }} >

            <Grid item xs={7} md={2.1} lg={2.5}>

              <SubTitulo />
            </Grid>
          </Grid>


          <Grid container spacing={6}>


            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <label className="contenido">Año:</label>
            </Grid>
            <Grid
              item xs={6}
              sx={{
                display: "flex",
                justifyContent: "left",
              }}>
              <label className="contenido">{year}</label>
            </Grid>
            {
              (String(params.fondo) == "FISM" || (String(params.fondo) == "FORTAMUN")) ?
              <Box              
              >
              <Grid
              item
              xs={5}
              sx={{
                bgcolor: "rgb(255, 245, 255)",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <label className="contenido"></label>
            </Grid>

            <Grid item xs={5} md={6} lg={6} sx={{}}>
              <Box sx={{

                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}>
              
              </Box>
            </Grid>
            </Box>
                :
                <Grid sx={{

               
                }}
                
                container >
                  <Grid
                    item
                    xs={5}
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "center",
                    }}
                  >
                    <label className="contenido">Mes:</label>
                  </Grid>

                  <Grid item xs={5} md={6} lg={6}
                  sx={{

                  
                  }}>
                    <Box sx={{
                      
                      p:3,
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                    }}>
                      <SelectFrag options={meses} onInputChange={handleSelectMes} placeholder={"Seleccione el Mes"}></SelectFrag>
                    </Box>
                  </Grid>
                </Grid>
            }


            <Grid
              item
              xs={5} md={5} lg={5}
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
                onClick={handleSend}
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
        :
        ""
      }

    </div>

  );
};

export default ModalFondo;
