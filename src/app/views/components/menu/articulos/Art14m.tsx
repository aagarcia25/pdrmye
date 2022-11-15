import {
  Alert,
  Box,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { BtnRegresar } from "../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import CalculateIcon from "@mui/icons-material/Calculate";
import { COLOR } from "../../../../styles/colors";
import { RESPONSE } from "../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../services/localStorage";
import Slider from "../../Slider";
import { ArticulosServices } from "../../../../services/ArticulosServices";
import Swal from "sweetalert2";
import { CatalogosServices } from "../../../../services/catalogosServices";
import { setISOWeek } from "date-fns";

const Art14m = ({
  titulo,
  onClickBack,
  tipo,
}: {
  titulo: string;
  onClickBack: Function;
  tipo: Number;
}) => {
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [slideropen, setslideropen] = useState(false);


 
  const [importe, setImporte] = useState<Array<number>>([]);
  const [importeDistri, setimporteDistri] = useState<Array<number>>([]);


  const [fondos, setFondos] = useState([]);





  const [monto, setMonto] = useState<number>();



  const handleclose = () => {
    onClickBack();
  };

  const handleFondos = () => {
    let data = { NUMOPERACION: 6, CLAVE: tipo };
    CatalogosServices.fondos(data).then((res) => {
      setFondos(res.RESPONSE);
    });
  };

  const handleVersion = () => {
    if (monto == null) {
      AlertS.fire({
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

  const crearValue=()=>{
   
        let prevState = [...importe];
        prevState.push();
        setImporte(prevState);
        
        let prev=[...importeDistri]
        prev.push()
        setimporteDistri(prev);
  }


  useEffect(() => {
    handleFondos();
  }, [tipo]);

  useEffect(() => {
    setImporte(fondos.map(()=>{return(NaN)}))
    setimporteDistri(fondos.map(()=>{return(NaN)}))
  }, [fondos]);

  return (
    <div>
      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
          <Tooltip title="Presupuesto de Egreso de la Federación">
            <label className="subtitulo">
              Presupuesto de Egreso de la Federación
            </label>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
          <Tooltip title={titulo}>
            <label className="subtitulo">
            {titulo}
            </label>
          </Tooltip>
        </Grid>



        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
        <Tooltip title="Documento de política pública elaborado por el Ejecutivo Federal a través de la Secretaría de Hacienda y Crédito Público en el que se describen la cantidad, la forma de distribución y el destino de los recursos públicos de los tres poderes, de los organismos autónomos, así como las transferencias a los gobiernos estatales y municipales.">
            <label className="subtitulo">
           Capture el Presupuesto de Egreso de la Federación del Año en Curso
            </label>
            </Tooltip>
        </Grid>

        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
           
           <Grid item xs={4} sm={4} md={4} sx={{ textAlign: "center" }}>
             <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Fondo
             </Typography>
           </Grid>

           <Grid item xs={3} sm={3} md={3} sx={{ textAlign: "center" }}>
           <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Monto
           </Typography>
           </Grid>

           <Grid item xs={2} sm={2} md={2} sx={{ textAlign: "center" }}>
           <Tooltip title="Porcentaje del Monto Total que se distribuira a los Municipios">
             <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Procentaje Distribución
             </Typography>
             </Tooltip>
           </Grid>
           
           <Grid item xs={3} sm={3} md={3} sx={{ textAlign: "center" }}>
           <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Monto a Distribuir
           </Typography>
           </Grid>



         </Grid>
        </Grid>

 
        <Grid item xs={12} sm={12} md={12} >
        {
          fondos.map((item: any,x) => {
            return(
         
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
           
            <Grid item xs={4} sm={4} md={4} sx={{ textAlign: "center" }}>
            <Tooltip title={item.Descripcion}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {item.Clave}
              </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={3} sm={3} md={3} sx={{ textAlign: "center" }}>
            
              <Input
              key={x}
                sx={{ fontWeight: "MontserratMedium" }}
                required
                value={importe[x]}
                placeholder="1500000*"
                id={(x -1).toString()}
                onChange={(v) =>{
                  let numero =importe
                      numero[x]=parseInt(v.target.value);
                      setImporte([...importe,importe[x]=parseInt(v.target.value)]);
                  let im =importeDistri ;
                      importeDistri[x]=(item.PorcentajeDistribucion / 100) * (numero[x]);
                                setimporteDistri(im);
                  } }
                error={monto == null ? true : false}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              ></Input>
            </Grid>
          
            <Grid item xs={2} sm={2} md={2} sx={{ textAlign: "center" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {item.PorcentajeDistribucion} %
              </Typography>
            </Grid>
            
            <Grid item xs={3} sm={3} md={3} sx={{ textAlign: "center" }}>
              <Input
                key={x}
                sx={{ fontWeight: "MontserratMedium" }}
                required
                placeholder="1500000*"
                id="montodistri"
                value={importeDistri[x]}
                // onChange={(v) => setMonto( importeDistri)}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              ></Input>
            </Grid>




          </Grid>
            )
        
      })

       }
        </Grid>


        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "center" }}>
        <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Total:
        </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "center" }}>
              <Input
                sx={{ fontWeight: "MontserratMedium" }}
                required
                placeholder="1500000*"
                id="monto"
                value={importeDistri.reduce((a, b) => a + b, 0)}
                error={monto == null ? true : false}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              ></Input>
        </Grid>

        </Grid>
        </Grid>
       


        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
         <Alert severity="info">Importante: los calculos son Generados tomando en cuenta la ultima versión activa</Alert> 
        </Grid>
       
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
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
    </div>
  );
};

export default Art14m;
