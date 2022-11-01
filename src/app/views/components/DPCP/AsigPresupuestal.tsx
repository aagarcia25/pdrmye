import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/Select/SelectFrag";
import SendIcon from '@mui/icons-material/Send';

const AsigPresupuestal = () => {


    //Constantes para llenar los select
    const [estatus, setEstatus] = useState<SelectValues[]>([]);
    const [fondos, setFondos] = useState<SelectValues[]>([]);
    const [anios, setAnios] = useState<SelectValues[]>([]);
    const [mes, setMeses] = useState<SelectValues[]>([]);


    //Constantes de los filtros
    const [idEstatus, setIdEstatus] = useState("");
    const [idFondo, setIdFondo] = useState("");
    const [idanio, setIdanio] = useState("");
    const [idmes, setIdmes] = useState("");
//Constantes para las columnas 

const [pa, setPa] = useState(false);
const [sa, setSa] = useState(false);
const [ta, setTa] = useState(false);
const [ca, setCa] = useState(false);
const [ad, setAd] = useState(false);
const [as, setAs] = useState(false);
const [aa, setAa] = useState(false);
const [rf, setRf] = useState(false);
const [cf, setCf] = useState(false);
const [ae, setAe] = useState(false);
const [af, setAf] = useState(false);

    const loadFilter = (operacion: number) => {
        let data = { NUMOPERACION: operacion };
          CatalogosServices.SelectIndex(data).then((res) => {
          
            if(operacion == 8){
                setEstatus(res.RESPONSE);
            }else if(operacion == 12){
                setFondos(res.RESPONSE);
            }else if(operacion == 4){
                setAnios(res.RESPONSE);
            }else if(operacion == 2){
                setMeses(res.RESPONSE);
            }
           
          });
        }

    const handleFilterChange1 = (v: string) => {
            setIdEstatus(v);
    };

    const handleFilterChange2 = (v: string) => {
        setIdFondo(v);
    };

    const handleFilterChange3 = (v: string) => {
        setIdFondo(v);
    };

    const handleFilterChange4 = (v: string) => {
        setIdFondo(v);
    };


const handleClick = () => {
   
};
        

        useEffect(() => {  
            loadFilter(2);
            loadFilter(4);  
            loadFilter(8);
            loadFilter(12);
          }, []);     

  return (
    <div>
      <Grid container spacing={1}>
        
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
          <Grid item  xs={2} sm={2} md={2} lg={2}>
          <Typography   sx={{ fontFamily: "MontserratMedium"}}>Estatus:</Typography>
          <SelectFrag
                  value={idEstatus}
                  options={estatus}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Estatus"}
                  label={""}
                  disabled={false}
                />
          </Grid>
          <Grid item  xs={2} sm={2} md={2} lg={2}>
          <Typography   sx={{ fontFamily: "MontserratMedium"}}>Año:</Typography>
          <SelectFrag
                  value={idanio}
                  options={anios}
                  onInputChange={handleFilterChange2}
                  placeholder={"Seleccione Año"}
                  label={""}
                  disabled={false}
                />
          </Grid>

          <Grid item  xs={2} sm={2} md={2} lg={2}>
          <Typography   sx={{ fontFamily: "MontserratMedium"}}>Mes:</Typography>
          <SelectFrag
                  value={idmes}
                  options={mes}
                  onInputChange={handleFilterChange3}
                  placeholder={"Seleccione Mes"}
                  label={""}
                  disabled={false}
                />
          </Grid>

          <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography   sx={{ fontFamily: "MontserratMedium"}}>Fondo:</Typography>
          <SelectFrag
                  value={idFondo}
                  options={fondos}
                  onInputChange={handleFilterChange4}
                  placeholder={"Seleccione Fondo"}
                  label={""}
                  disabled={false}
                />
          </Grid>
        
        
          <Grid item xs={2}>
            3
          </Grid>
        </Grid>


        <Grid item xs={12} sm={12} md={12} lg={12}>
        <Button
         onClick={handleClick}
         variant="contained" 
         color="success" 
         endIcon={<SendIcon />}>
        Buscar
        </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography   sx={{ fontFamily: "MontserratMedium"}}>Para Realizar la consulta de Información es Requerido los filtros</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          1
        </Grid>
      </Grid>
    </div>
  );
};

export default AsigPresupuestal;
