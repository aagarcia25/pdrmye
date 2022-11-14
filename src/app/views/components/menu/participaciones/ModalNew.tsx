import { Box, Grid, IconButton, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../services/catalogosServices";
import SelectFrag from "../../Fragmentos/SelectFrag";
import { BtnRegresar } from "../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import CalculateIcon from "@mui/icons-material/Calculate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { InputAdornment } from "@mui/material";

const ModalNew = ({
  clave,
  titulo,
  onClickBack,
}: {
  clave: string;
  titulo: string;
  onClickBack: Function;
}) => {
  let year: number = new Date().getFullYear();
  //LLENADO DE FILTRO
  const [mes, setMeses] = useState<SelectValues[]>([]);
  const [tipoCalculo, setTipoCalculo] = useState<SelectValues[]>([]);

  //SETEO DE VALORES DE FILTRO
  const [idmes, setIdmes] = useState("");
  const [idTipoCalculo, setIdTipoCalculo] = useState("");
  // VARIABLES
  const [monto, setMonto] = useState<number>();
  const [nameNewDoc, setNameNewDoc] = useState("");
  const [file, setFile] = useState(Object);

  const handleSelectMes = (v: SelectValues) => {
    setIdmes(String(v));
  };

  const handleSelect01 = (v: SelectValues) => {
    setIdTipoCalculo(String(v));
  };

  const handleNewFile = (event: any) => {
    setFile(event?.target?.files?.[0] || "");
    ///// SE VALIDA SI NO SE CARGO ARCHIVO EN EL INPUT PARA PODER EXTRAER EL NOMBRE
    if (event.target.files.length === 0) {
    } else {
      setNameNewDoc(event.target!.files[0]!.name);
    }
  };

  const handleSend = () => {};

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion, CHID: clave };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion == 2) {
        setMeses(res.RESPONSE);
      } else if (operacion == 15) {
        setTipoCalculo(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    loadFilter(2);
    loadFilter(15);
  }, []);

  return (
    <div>
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
                Importe:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
           
         


              <Input
                sx={{ fontWeight: "MontserratMedium" }}
                required
                placeholder="1500000*"
                id="monto"
                onChange={(v) => setMonto(Number(v.target.value))}
                error={monto == null ? true : false}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              ></Input>
            </Grid>
          </Grid>
        </Grid>



        <Grid item xs={12} sm={12} md={12} >

          <Grid container spacing={1} sx={{ 
            justifyContent: "center" ,
            displayPrint : clave === 'ICV' ? 'block' :'none'
             
             }}>
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
          <IconButton onClick={handleSend}>
            <CalculateIcon />
            Calcular
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default ModalNew;
