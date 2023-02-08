import React, { useEffect, useState } from "react";
import { RESPONSE, PERMISO } from "../../../interfaces/user/UserInfo";
import { getUser, getPermisos } from "../../../services/localStorage";
import Slider from "../Slider";
import {
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import SelectFrag from "../Fragmentos/SelectFrag";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectValues from "../../../interfaces/Select/SelectValues";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const ORGDetail = ({ idrow }: { idrow: string }) => {
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [openSlider, setOpenSlider] = useState(true);
  const [ures, setURes] = useState<SelectValues[]>([]);
  const [listConceptos, setListConceptos]= useState<SelectValues[]>([]);
  const [idUResp, setidUResp] = useState("");
  const [mensaje, setMensaje] = useState<string>();
  const [importe, setImporte] = useState<string>();
  const [claveConcepto,setClaveConcepto]= useState<string>("");




  const handleFilterChange1 = (v: string) => {
    setidUResp(v);
  };

  const handleFilterChange2 = (v: string) => {
    setClaveConcepto(v);
  };

  const loadFilter = (tipo: number) => {
    let data = { NUMOPERACION: tipo };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (tipo === 26) {
        setURes(res.RESPONSE);
        setOpenSlider(false);
      }else if (tipo === 28){
        setListConceptos(res.RESPONSE);
      }
    });
  };

  const handleDetalle = (data: any) => {};

  useEffect(() => {
    loadFilter(28);
    loadFilter(26);
  }, []);

  return (
    <div>
      <Slider open={openSlider}></Slider>

      <Grid container spacing={1} padding={0}>
        <Grid container>
          <Grid item xs={6} sm={4} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Cpto de egreso:
            </Typography>
            <SelectFrag
              value={claveConcepto}
              options={listConceptos}
              onInputChange={handleFilterChange2}
              placeholder={"Seleccione Cpto de"}
              label={""}
              disabled={false}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6} sm={4} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Descripción:
            </Typography>
            <textarea
              required
              spellCheck="true"
              rows={5}
              onChange={(v) => setMensaje(v.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>U.Resp:</Typography>
            <SelectFrag
              value={idUResp}
              options={ures}
              onInputChange={handleFilterChange1}
              placeholder={"Seleccione U.Resp"}
              label={""}
              disabled={false}
            />
          </Grid>
        </Grid>

       

        <Grid container spacing={2}>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Parcial a Pagar:
            </Typography>
            <TextField
              required
              value={importe}
              variant="standard"
              onChange={(v) => setImporte(v.target.value)}
            />
          </Grid>
        </Grid>

       
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Clasificadores:
          </Typography>

          <Grid container spacing={1}>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador01"
              variant="standard"
              size="small"
              label="Administrativo"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador02"
              variant="standard"
              size="small"
              label="Funcional"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador03"
              variant="standard"
              size="small"
              label="Programatico"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador04"
              variant="standard"
              size="small"
              label="Objeto del Gasto"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador05"
              variant="standard"
              size="small"
              label="Tipo de Gasto"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador06"
              variant="standard"
              size="small"
              label="fuente de finmanciamiento"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador07"
              variant="standard"
              size="small"
              label="ramo"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador08"
              variant="standard"
              size="small"
              label="Año"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador09"
              variant="standard"
              size="small"
              label="Control Interno"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador10"
              variant="standard"
              size="small"
              label="Área Geografica"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <TextField
              hiddenLabel
              id="Clasificador11"
              variant="standard"
              size="small"
              label="Proy / Programa"
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
           
          </Grid>
         
          
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
            <Tooltip title="Agregar Detalle">
              <ToggleButton value="check" onClick={() => handleDetalle({})}>
                <CheckBoxIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Cancelar Cambios">
              <ToggleButton value="check" onClick={() => handleDetalle({})}>
                <CancelPresentationIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
};
