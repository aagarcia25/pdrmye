import {
  Box,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import Imeses from "../../../../../interfaces/filtros/meses";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { BtnRegresar } from "../../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import { SubTitulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
import { Titulo } from "../../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import CalculateIcon from "@mui/icons-material/Calculate";
import { COLOR } from "../../../../../styles/colors";
import { calculosServices } from "../../../../../services/calculosServices";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import Slider from "../../../Slider";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import SelectFrag from "../../../Fragmentos/Select/SelectFrag";

const ModalFgp = ({
  titulo,
  onClickBack,
}: {
  titulo: string;
  onClickBack: Function;
}) => {
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [slideropen, setslideropen] = useState(false);
  const [mes, setMes] = useState("");
  const [monto, setMonto] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [periodos, setPeriodos] = useState([]);


  const [meses, setMeses] = useState<SelectValues[]>([]);




  const handleSelectMes = (v: SelectValues) => {
    console.log(v?.value)
  };



  let year: number = new Date().getFullYear();

  const handleSend = () => {
    if (monto == "") {
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

  const ajustesc = () => {
    let data = { NUMOPERACION: 4 };
    CatalogosServices.AjustesIndex(data).then((res) => {
      setPeriodos(res.RESPONSE || "");
    });
  };

  useEffect(() => {
    // SE ESTABLECE EL TIEMPO EN ESPERA PARA QUE SE CARGEN DE FORMA CORRECTA LOS COMPONENTES
    setslideropen(true);
    setTimeout(() => {
      mesesc();
      ajustesc();
      setslideropen(false);
    }, 3000);
  }, []);

  return (
    <div>
      <Slider open={slideropen}></Slider>
      <Grid
        container spacing={1}
        sx={{  }} >

        <Grid item xs={3} md={2.1} lg={2.5}>
        <BtnRegresar onClick={onClickBack} />
        </Grid>
      </Grid>

      <Grid
        container spacing={2}
        sx={{ justifyContent: "center",
       }} >

        <Grid item xs={12}>
        <Box 
        
        sx={{
         
         display: "flex",
         justifyContent: "center",
         
       }}>
          <Titulo name={titulo} />
        </Box>
        
        </Grid>
      </Grid>

   


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
          <Typography sx={{ fontWeight: "Bold" }}>Año:</Typography>
        </Grid>
        <Grid 
        item xs={6}        
        sx={{
           display: "flex",
            justifyContent: "left",}}>
          <Input id="anio" readOnly defaultValue={year}></Input>
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
          <Typography sx={{ fontWeight: "Bold" }}>Mes:</Typography>
        </Grid>

        <Grid item xs={5} md={6} lg={6} sx={{}}>
        <Box sx={{
         
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}>
          <SelectFrag options={meses} onInputChange={handleSelectMes} placeholder={"Seleccione el Mes"}></SelectFrag>
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
          <Typography sx={{ fontWeight: "Bold" }}>Monto:</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Input
            required
            
            placeholder="1500000*"
            id="monto"
            onChange={(v) => setMonto(v.target.value)}
            error={monto == "" ? true : false}
            type="number"
          ></Input>
        </Grid>

        {/* 
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "Bold" }}>Periodo:</Typography>
        </Grid>

        <Grid item xs={4} sx={{}}>
          <Select
            fullWidth
            id="periodo"
            required
            onChange={(v) => setPeriodo(v.target.value)}
            value={periodo}
          >
            {periodos?.map((item: any) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.Descripcion}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        */}

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
    </div>
  );
};

export default ModalFgp;
