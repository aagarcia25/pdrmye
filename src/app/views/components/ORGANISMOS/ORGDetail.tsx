import React, { useEffect, useState } from "react";
import { RESPONSE, PERMISO } from "../../../interfaces/user/UserInfo";
import { getUser, getPermisos } from "../../../services/localStorage";
import Slider from "../Slider";
import {
  Button,
  Grid,
  InputAdornment,
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
import ModalForm from "../componentes/ModalForm";

export const ORGDetail =
  ({
    idrow,
    handleClose
  }:
    {
      idrow: string;
      handleClose : Function;
    }) => {
    const user: RESPONSE = JSON.parse(String(getUser()));
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [openSlider, setOpenSlider] = useState(true);
    const [ures, setURes] = useState<SelectValues[]>([]);
    const [listConceptos, setListConceptos] = useState<SelectValues[]>([]);
    const [idUResp, setidUResp] = useState("");
    const [mensaje, setMensaje] = useState<string>();
    const [importe, setImporte] = useState<string>();
    const [claveConcepto, setClaveConcepto] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>();




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
        } else if (tipo === 28) {
          setListConceptos(res.RESPONSE);
        }
      });
    };

    const handleDetalle = (data: any) => { };

    useEffect(() => {
      loadFilter(28);
      loadFilter(26);
    }, []);

    return (
      <div>
        <ModalForm title={"Detalle Aportaciones"} handleClose={handleClose}>
          <Slider open={openSlider}></Slider>
          <Grid container spacing={1} padding={0} paddingTop={6}>
            <Grid container justifyContent="space-around">
              <Grid item xs={6} sm={4} md={2} lg={2}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Cpto de egreso:
                </Typography>
                <SelectFrag
                  value={claveConcepto}
                  options={listConceptos}
                  onInputChange={handleFilterChange2}
                  placeholder={"Seleccione Cpto de"}
                  label={""} disabled={false} />

                <Typography sx={{ fontFamily: "sans-serif" }} paddingTop={2}>
                  Parcial a Pagar:
                </Typography>
                <TextField
                  required
                  value={importe}
                  variant="outlined"
                  onChange={(v) => setImporte(v.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,

                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Descripción:
                </Typography>
                <TextField
                  required
                  fullWidth
                  value={descripcion}
                  spellCheck="true"
                  rows={5}
                  multiline
                  onChange={(v) => setDescripcion(v.target.value.trim())}
                  style={{ width: "100%" }}

                />
              </Grid>
            </Grid>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Clasificadores:
            </Typography>

            <Grid container spacing={1} paddingBottom={5}>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador01"
                  variant="outlined"
                  size="small"
                  label="Administrativo"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador02"
                  variant="outlined"
                  size="small"
                  label="Funcional"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador03"
                  variant="outlined"
                  size="small"
                  label="Programatico"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador04"
                  variant="outlined"
                  size="small"
                  label="Objeto del Gasto"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador05"
                  variant="outlined"
                  size="small"
                  label="Tipo de Gasto"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador06"
                  variant="outlined"
                  size="small"
                  label="fuente de finmanciamiento"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador07"
                  variant="outlined"
                  size="small"
                  label="ramo"
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador08"
                  variant="outlined"
                  size="small"
                  label="Año"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador09"
                  variant="outlined"
                  size="small"
                  label="Control Interno"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador10"
                  variant="outlined"
                  size="small"
                  label="Área Geografica"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <TextField
                  hiddenLabel
                  id="Clasificador11"
                  variant="outlined"
                  size="small"
                  label="Proy / Programa"

                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>

              </Grid>


            </Grid>

            <Grid paddingTop={6}
              item container justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
              <Tooltip title="Guardar Detalle">
                <Button value="check" onClick={() => handleDetalle({})} className={"guardar"}>
                  Guardar
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

        </ModalForm>
      </div>
    );
  };
