import { Box, Checkbox, FormControlLabel, Grid, IconButton, Input, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../services/catalogosServices";
import SelectFrag from "../../Fragmentos/SelectFrag";
import { BtnRegresar } from "../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import CalculateIcon from "@mui/icons-material/Calculate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { InputAdornment } from "@mui/material";
import { RESPONSE } from "../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../services/localStorage";
import { Toast } from "../../../../helpers/Toast";
import { AlertS } from "../../../../helpers/AlertS";
import { calculosServices } from "../../../../services/calculosServices";
import Slider from "../../Slider";
import { ParametroServices } from "../../../../services/ParametroServices";

const ModalNew = ({
  clave,
  titulo,
  onClickBack,
  resetNum,
  resetSelect
}: {
  clave: string;
  titulo: string;
  onClickBack: Function;
  resetNum: number;
  resetSelect: string;
}) => {
  
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [year , setyear] = useState<number>();
  const [slideropen, setslideropen] = useState(true);
  //LLENADO DE FILTRO
  const [mes, setMeses] = useState<SelectValues[]>([]);
  const [tipoCalculo, setTipoCalculo] = useState<SelectValues[]>([]);
  const [versionCalculo, setversionCalculo] = useState<SelectValues[]>([]);

  //SETEO DE VALORES DE FILTRO
  const [idmes, setIdmes] = useState("");
  const [idTipoCalculo, setIdTipoCalculo] = useState("");
  const [idVersionCalculo, setIdVersionCalculo] = useState("");
  // VARIABLES
  const [monto, setMonto] = useState<number>();
  const [ieja, setieja] = useState<number>();
  const [derecho, setDerecho] = useState<number>();

  const [nameNewDoc, setNameNewDoc] = useState("");
  const [file, setFile] = useState(Object);
  const [Czero, setCzero]= useState<boolean>(false);
  const [disti, setDisti]= useState<boolean>(false);

  const handleSelectMes = (v: SelectValues) => {
    setIdmes(String(v));
  };

  const handleSelect01 = (v: SelectValues) => {
    setIdTipoCalculo(String(v));
  };

  const handleSelect02 = (v: SelectValues) => {
    setIdVersionCalculo(String(v));
  };

  const handleNewFile = (event: any) => {
    setFile(event?.target?.files?.[0] || "");
    if (event.target.files.length === 0) {
    } else {
      setNameNewDoc(event.target!.files[0]!.name);
    }
  };


  const parametros = () => {
    let data = {
      NUMOPERACION: 5,
      NOMBRE: "ANIO_OPERACION"
    }
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      setyear(Number(res.RESPONSE.Valor));
    });

  };


  const icv = () => {
    
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "RefrendosICV");
    formData.append("CHUSER", user.id);
    formData.append("ANIO", String(year));
    formData.append("MES", idmes);
    formData.append("CLAVE", clave);
    formData.append("TIPOCALCULO", idTipoCalculo);
    formData.append("DIST", disti  ? '1' : '0');
    formData.append("IDVERSION", idVersionCalculo);
    CatalogosServices.migraData(formData).then((res) => {
     
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });

        onClickBack();
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  const isrnomina = () => {
   
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "ISRNOMINA");
    formData.append("CHUSER", user.id);
    formData.append("ANIO", String(year));
    formData.append("MES", idmes);
    formData.append("IMPORTE", "0");
    formData.append("TIPOCALCULO", idTipoCalculo);
    formData.append("DIST", disti  ? '1' : '0');
    formData.append("IDVERSION", idVersionCalculo);
    CatalogosServices.migraData(formData).then((res) => {
      
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });

        onClickBack();
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

 


  const handleSend = () => {
    console.log(clave);
        if (clave === "ICV" ||clave === "HIDROCARBUROS"  || clave === "FOINMUN"  ||clave==='ISN100' || clave==='PREDIAL' ) {
          icv();
        } else if (clave === "ISR SALARIOS") {
          isrnomina();
        }else{
          
          if (monto === null || ieja === null || idmes=== null || idTipoCalculo===null
             || idmes=== "false" || idTipoCalculo==="false" || derecho=== null
             ) {
            AlertS.fire({
              title: "Error!",
              text: "Favor de Completar los Campos",
              icon: "error",
            });
          } else {
            let data = {
              CLAVEFONDO: clave,
              CHUSER: user.id,
              IMPORTE: monto,
              ANIO: year,
              MES: idmes,
              ZERO:Czero,
              TIPOCALCULO:idTipoCalculo,
              IEJA:ieja,
              DERECHO: derecho,
              IDVERSION: idVersionCalculo,
              P_DIST: disti  ? 1 : 0
            };
            console.log(data)
            // agregar(data);
          }
  
        }

  };

  const agregar = (data: any) => {
    calculosServices.CalculoPrincipalindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
        onClickBack();
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion, CHID: clave };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 2) {
        setMeses(res.RESPONSE);
      } else if (operacion === 15) {
        setTipoCalculo(res.RESPONSE);
      } else if (operacion === 23) {
        setversionCalculo(res.RESPONSE);
        setIdVersionCalculo(res.RESPONSE[0]['value']);
        setslideropen(false);
      } else if (operacion === 35) {
      setversionCalculo(res.RESPONSE);
      setIdVersionCalculo(res.RESPONSE[0]['value']);
      setslideropen(false);
      }
    });
  };

  const handleChangedisti = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisti(event.target.checked);
  };

  useEffect(() => {
    setMonto(resetNum);
    setIdmes(resetSelect);
    setIdTipoCalculo(resetSelect);
    
    parametros();
    loadFilter(2);
    loadFilter(15);
    
    if(clave ==='FFM30'){
      loadFilter(23);
    }else{
      loadFilter(35);
    }
  }, []);

  return (
    <div>
       <Slider open={slideropen}></Slider>
      <Grid container spacing={1} sx={{}}>
        <Grid item xs={3} md={2.1} lg={2.5}>
          <BtnRegresar onClick={onClickBack} />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            {titulo}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Año:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                {year}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Mes:
              </Typography>
            </Grid>

            <Grid item xs={2} sm={2} md={2} sx={{ textAlign: "left" }}>
              <SelectFrag
                value={idmes}
                options={mes}
                onInputChange={handleSelectMes}
                placeholder={"Seleccione el Mes"}
                label={""}
                disabled={false}
              ></SelectFrag>
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Tipo de Cálculo:
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} sx={{ textAlign: "left" }}>
              <SelectFrag
                value={idTipoCalculo}
                options={tipoCalculo}
                onInputChange={handleSelect01}
                placeholder={"Seleccione el Tipo de Cálculo"}
                label={""}
                disabled={false}
              ></SelectFrag>
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>


        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
              <Tooltip title={"Si se activa esta opción el cálculo se realizará tomando la proporción de garantía del fondo"}>
              <FormControlLabel
                    value={disti}
                    control={
                      <Checkbox
                        checked={disti}
                        onChange={handleChangedisti} />
                    }
                    label="Distribuir por Garantía"
                  />
                  </Tooltip>
              </Typography>
            </Grid>
            
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>


        <Grid item xs={12} sm={12} md={12}
        sx={{ 
          justifyContent: "center" ,
          display :clave === 'FFM30' || clave === 'FGP' ? 'block' :'none'
           }}
        >
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Versión de Coeficiente:
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} sx={{ textAlign: "left" }}>
              <SelectFrag
                value={idVersionCalculo}
                options={versionCalculo}
                onInputChange={handleSelect02}
                placeholder={"Seleccione la versión"}
                label={""}
                disabled={false}
              ></SelectFrag>
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}
        sx={{ 
            justifyContent: "center" ,
            display :clave !== 'HIDROCARBUROS' && clave !== 'FOINMUN' && clave !== 'ICV' && clave !== 'ISN100' && clave !== 'PREDIAL'  && clave !== 'FOULT' && clave !== 'FODES' && clave !== 'FOSEGMUN' && clave !== 'FODEM' ? 'block' :'none'
             }}
        >
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Importe:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <Input
              value={monto}
                sx={{ fontWeight: "MontserratMedium" }}
                required
                placeholder="1500000*"
                id="monto"
                onChange={(v) => {
                    setMonto(Number(v.target.value))
                    if(Number(v.target.value) === 0){
                        setCzero(true);
                    }else{
                        setCzero(false);
                    }
                }}
                error={monto? true : false}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              ></Input>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12} sm={12} md={12}
        sx={{ 
            justifyContent: "center" ,
            display :  clave === 'FOSEGMUN' ? 'block' :'none'
             }}
        >
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Impto. Erog. Juegos Apuesta:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <Input
                sx={{ fontWeight: "MontserratMedium" }}
                required
                placeholder="1500000*"
                id="ieja"
                onChange={(v) => {
                    setieja(Number(v.target.value))
                }}
                error={ieja? false : true}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              ></Input>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
          <Grid item container xs={6} sm={6} md={6}  justifyContent="flex-end" sx={{ textAlign: "right" , alignContent: "right"}}>
            <Grid item xs={12} sm={12} md={11} lg={6}  sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Derechos por los servicios de Supervisión, Control y Expedición de Constancias de Ingreso:
              </Typography>
            </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <Input
                sx={{paddingTop:2, fontWeight: "MontserratMedium" }}
                required
                placeholder="1500000*"
                id="ieja"
                onChange={(v) => {
                    setDerecho(Number(v.target.value))
                }}
                error={derecho? false : true}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              ></Input>
            </Grid>
          </Grid>
        </Grid>
        

        <Grid item xs={12} sm={12} md={12} 
          sx={{ 
            justifyContent: "center" ,
            display : clave === 'ICV' ||clave==='ISN100' ||clave==='PREDIAL' || clave === 'HIDROCARBUROS' || clave === 'FOINMUN' || clave === 'ISR SALARIOS' ? 'block' :'none'
             }}
        >

          <Grid container spacing={0} >
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Cargar Archivo:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <IconButton
                aria-label="upload picture"
                component="label"
                size="large"
              >
                <input
                  id="ICV"
                  required
                  type="file"
                  hidden
                  onChange={(event) => {
                    handleNewFile(event);
                  }}
                />
                <UploadFileIcon />
              </IconButton>

              <Box>
                <label>{nameNewDoc}</label>
              </Box>
            </Grid>
          </Grid>
        </Grid>


     


        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
          <IconButton onClick={handleSend} disabled={idmes==="false"|| idmes==="" ||idTipoCalculo==="false"||idTipoCalculo===""||Number(monto)<=0}>
            <CalculateIcon />
            Calcular
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default ModalNew;
