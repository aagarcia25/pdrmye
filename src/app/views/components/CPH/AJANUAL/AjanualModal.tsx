import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AlertS } from '../../../../helpers/AlertS';
import { Toast } from '../../../../helpers/Toast';
import SelectValues from '../../../../interfaces/Select/SelectValues';
import { RESPONSE } from '../../../../interfaces/user/UserInfo';
import { calculosServices } from '../../../../services/calculosServices';
import { CatalogosServices } from '../../../../services/catalogosServices';
import { getUser } from '../../../../services/localStorage';
import SelectFrag from '../../Fragmentos/SelectFrag';

export const AjAnualModal = ({
    handleClose,
  }: {
    handleClose: Function;
  }) => {

  const [idfondo, setIdFondo] = useState("");
  const [anio, setAnio] = useState("");
  const [listaFondos, setlistaFondos] = useState<SelectValues[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));


  
  const handleFilterChange2 = (v: string) => {
    setIdFondo(v);
  };


  const validacion = () => {
    if(anio === "" || idfondo === null){
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de llenar los Campos*",
        icon: "error",
      });
    }else{
      let data = {
        NUMOPERACION: 1,
        P_ANIO:anio,
        P_FONDO:idfondo,
        P_USUARIO:user.id

      };
      calculosServices.AjusteSemestralIndex(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Consulta Exitosa!",
          });
          handleClose();
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });
    }
    
  }

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 31) {
        setlistaFondos(res.RESPONSE);
      } 
    });
  };
  
  useEffect(() => {
    loadFilter(31);


  }, []);


  return (
    <div>
      <Box>
        <Dialog open={true} fullScreen>
          <DialogTitle>Generación de Ajuste Semestral</DialogTitle>
          <DialogContent dividers={true}>

          <Grid container spacing={1}>
              <Grid item xs={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Año:</Typography>
              </Grid>
              <Grid item xs={12}>
              <TextField
              required
              margin="dense"
              id="anio"
              value={anio}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => setAnio(v.target.value)}
              error={anio === "" ? true : false}/>
              </Grid>

            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Fondo:</Typography>
              </Grid>
              <Grid item xs={12}>
               <SelectFrag
                  value={idfondo}
                  options={listaFondos}
                  onInputChange={handleFilterChange2}
                  placeholder={"Seleccione Fondo"}
                  label={""} disabled={false} />


              </Grid>

            </Grid>

          </DialogContent>


          <DialogActions>
            <button
              className="guardar"
              onClick={() => validacion() }
            >
              Generar
            </button>
            <button className="salir" onClick={() => handleClose()}>
              Salir
            </button>
          </DialogActions>

        </Dialog>
      </Box>
    </div>
  )
}

