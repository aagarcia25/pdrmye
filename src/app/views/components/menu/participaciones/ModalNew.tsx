import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import { USUARIORESPONSE } from "../../../../interfaces/user/UserInfo";
import { ParametroServices } from "../../../../services/ParametroServices";
import { calculosServices } from "../../../../services/calculosServices";
import { CatalogosServices } from "../../../../services/catalogosServices";
import { getUser } from "../../../../services/localStorage";
import SelectFrag from "../../Fragmentos/SelectFrag";
import Slider from "../../Slider";
import { TooltipPersonalizado } from "../../componentes/CustomizedTooltips";
import { TextFieldFormatoMoneda } from "../../componentes/TextFieldFormatoMoneda";
import { BtnRegresar } from "../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";

const ModalNew = ({
  clave,
  titulo,
  onClickBack,
  resetNum,
  resetSelect,
}: {
  clave: string;
  titulo: string;
  onClickBack: Function;
  resetNum: number;
  resetSelect: string;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const [year, setyear] = useState<number>();
  const [slideropen, setslideropen] = useState(true);

  // LLENADO DE FILTRO
  const [mes, setMeses] = useState<SelectValues[]>([]);
  const [tipoCalculo, setTipoCalculo] = useState<SelectValues[]>([]);
  const [versionCalculo, setversionCalculo] = useState<SelectValues[]>([]);

  // SETEO DE VALORES DE FILTRO
  const [idmes, setIdmes] = useState("");
  const [idTipoCalculo, setIdTipoCalculo] = useState("");
  const [idVersionCalculo, setIdVersionCalculo] = useState("");

  // VARIABLES
  const [monto, setMonto] = useState<number>();
  const [ieja, setieja] = useState<number>();
  const [derecho, setDerecho] = useState<number>();
  const [montoAnual, setMontoAnual] = useState<number>();

  // ARCHIVO
  const [nameNewDoc, setNameNewDoc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [Czero, setCzero] = useState<boolean>(false);
  const [disti, setDisti] = useState<boolean>(false);
  const [dises, setDises] = useState<boolean>(false);

  const handleSelectMes = (v: SelectValues) => {
    setIdmes(String(v));
  };

  const handleSelect01 = (v: SelectValues) => {
    setIdTipoCalculo(String(v));
  };

  const handleSelect02 = (v: SelectValues) => {
    setIdVersionCalculo(String(v));
  };

  const handleNewFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files?.[0] ?? null;
    setFile(f);
    setNameNewDoc(f?.name ?? "");
  };

  const parametros = () => {
    const data = {
      NUMOPERACION: 5,
      NOMBRE: "ANIO_OPERACION",
    };

    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      setyear(Number(res.RESPONSE.Valor));
    });
  };

  const buildFormData = (tipo: string) => {
    if (!file) {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de cargar un archivo.",
        icon: "error",
      });
      return null;
    }

    if (!year) {
      AlertS.fire({
        title: "¡Error!",
        text: "Aún no se ha cargado el año de operación. Intenta de nuevo.",
        icon: "error",
      });
      return null;
    }

    if (!idmes || idmes === "false" || !idTipoCalculo || idTipoCalculo === "false") {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de completar los campos (Mes y Tipo de Cálculo).",
        icon: "error",
      });
      return null;
    }

    const formData = new FormData();
    // Importante: manda el file real y su nombre real
    formData.append("inputfile", file, file.name);
    formData.append("tipo", tipo);
    formData.append("CHUSER", String(user.Id));
    formData.append("ANIO", String(year));
    formData.append("MES", String(idmes));
    formData.append("CLAVE", String(clave));
    formData.append("TIPOCALCULO", String(idTipoCalculo));
    formData.append("DIST", disti ? "1" : "0");
    formData.append("IDVERSION", String(idVersionCalculo));

    return formData;
  };

  const icv2 = () => {
    const formData = buildFormData("ICV");
    if (!formData) return;

    CatalogosServices.migraData(formData).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({ icon: "success", title: "Carga Exitosa!" });
        onClickBack();
      } else {
        AlertS.fire({ title: "¡Error!", text: res.STRMESSAGE, icon: "error" });
      }
    });
  };

  const icv = () => {
    const formData = buildFormData("RefrendosICV");
    if (!formData) return;

    CatalogosServices.migraData(formData).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({ icon: "success", title: "Carga Exitosa!" });
        onClickBack();
      } else {
        AlertS.fire({ title: "¡Error!", text: res.STRMESSAGE, icon: "error" });
      }
    });
  };

  const isrnomina = () => {
    // ISR Nómina trae IMPORTE=0 en tu lógica original
    const formData = buildFormData("ISRNOMINA");
    if (!formData) return;

    formData.append("IMPORTE", "0");

    CatalogosServices.migraData(formData).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({ icon: "success", title: "Carga Exitosa!" });
        onClickBack();
      } else {
        AlertS.fire({ title: "¡Error!", text: res.STRMESSAGE, icon: "error" });
      }
    });
  };

  const handleChange = (value: number) => {
    setMonto(Number(value));
    setCzero(Number(value) === 0);
  };

  const handleChangeAnual = (value: number) => {
    setMontoAnual(Number(value));
  };

  const handleSend = () => {
    // RUTAS CON ARCHIVO
    if (
      clave === "HIDROCARBUROS" ||
      clave === "FOINMUN" ||
      clave === "ISN100" ||
      clave === "PREDIAL"
    ) {
      icv();
      return;
    }

    if (clave === "ISR SALARIOS") {
      isrnomina();
      return;
    }

    if (clave === "ICV") {
      icv2();
      return;
    }

    // RUTAS SIN ARCHIVO (CÁLCULO NORMAL)
    if (!year) {
      AlertS.fire({
        title: "¡Error!",
        text: "Aún no se ha cargado el año de operación. Intenta de nuevo.",
        icon: "error",
      });
      return;
    }

    if (
      monto == null ||
      idmes == null ||
      idTipoCalculo == null ||
      idmes === "false" ||
      idTipoCalculo === "false" ||
      idmes === "" ||
      idTipoCalculo === ""
    ) {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
      return;
    }

    let data: any = {};

    if (dises) {
      data = {
        CLAVEFONDO: clave,
        CHUSER: user.Id,
        IMPORTE: monto,
        IMPORTE_ANUAL: montoAnual,
        ANIO: year,
        MES: idmes,
        ZERO: Czero,
        TIPOCALCULO: idTipoCalculo,
        IEJA: ieja,
        DERECHO: derecho,
        IDVERSION: idVersionCalculo,
        P_DIST: disti ? 1 : 0,
        P_DISES: dises ? 1 : 0,
      };
    } else {
      data = {
        CLAVEFONDO: clave,
        CHUSER: user.Id,
        IMPORTE: monto,
        ANIO: year,
        MES: idmes,
        ZERO: Czero,
        TIPOCALCULO: idTipoCalculo,
        IEJA: ieja,
        DERECHO: derecho,
        IDVERSION: idVersionCalculo,
        P_DIST: disti ? 1 : 0,
      };
    }

    calculosServices.CalculoPrincipalindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({ icon: "success", title: "¡Registro Agregado!" });
        onClickBack();
      } else {
        AlertS.fire({ title: "¡Error!", text: res.STRMESSAGE, icon: "error" });
      }
    });
  };

  const loadFilter = (operacion: number) => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const mesNombre = meses[new Date().getMonth()];
    const data = { NUMOPERACION: operacion, CHID: clave, P_MES: mesNombre };

    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 2) {
        setMeses(res.RESPONSE);
      } else if (operacion === 15) {
        setTipoCalculo(res.RESPONSE);
      } else if (operacion === 23) {
        setversionCalculo(res.RESPONSE);
        setIdVersionCalculo(res.RESPONSE?.[0]?.["value"] ?? "");
        setslideropen(false);
      } else if (operacion === 35) {
        setversionCalculo(res.RESPONSE);
        setIdVersionCalculo(res.RESPONSE?.[0]?.["value"] ?? "");
        setslideropen(false);
      } else if (operacion === 51) {
        setTipoCalculo(res.RESPONSE);
      }
    });
  };

  const handleChangedisti = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisti(event.target.checked);
  };

  const handleChangedises = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDises(event.target.checked);
  };

  useEffect(() => {
    setMonto(resetNum);
    setIdmes(resetSelect);
    setIdTipoCalculo(resetSelect);

    parametros();
    loadFilter(2);

    if (
      clave === "FGP" ||
      clave === "FFM30" ||
      clave === "FFM70" ||
      clave === "IEPS" ||
      clave === "FOFIR"
    ) {
      loadFilter(51);
    } else {
      loadFilter(15);
    }

    if (clave === "FFM30") {
      loadFilter(23);
    } else {
      loadFilter(35);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disableCalcular =
    !year ||
    idmes === "false" ||
    idmes === "" ||
    idTipoCalculo === "false" ||
    idTipoCalculo === "";

  return (
    <div>
      <Slider open={slideropen}></Slider>

      <Grid container spacing={1}>
        <Grid item xs={3} md={2.1} lg={2.5}>
          <BtnRegresar onClick={onClickBack} />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>{titulo}</Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={3} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>Año:</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>{year}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={3} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>Mes:</Typography>
            </Grid>

            <Grid item xs={6} sm={2} md={2} sx={{ textAlign: "left" }}>
              <SelectFrag
                value={idmes}
                options={mes}
                onInputChange={handleSelectMes}
                placeholder={"Seleccione el Mes"}
                label={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={3} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Tipo de Cálculo:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2} md={2} sx={{ textAlign: "left" }}>
              <SelectFrag
                value={idTipoCalculo}
                options={tipoCalculo}
                onInputChange={handleSelect01}
                placeholder={"Seleccione el Tipo de Cálculo"}
                label={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} sx={{ justifyContent: "center" }}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                <TooltipPersonalizado
                  title={
                    <React.Fragment>
                      {
                        "Si se activa esta opción el cálculo se realizará tomando la proporción de garantía del fondo"
                      }
                    </React.Fragment>
                  }
                >
                  <FormControlLabel
                    value={disti}
                    control={<Checkbox checked={disti} onChange={handleChangedisti} />}
                    label="Distribuir por Garantía"
                  />
                </TooltipPersonalizado>
              </Typography>
            </Grid>

            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            justifyContent: "center",
            display: clave === "FFM30" || clave === "FGP" ? "block" : "none",
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={3} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Versión de Coeficiente:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2} md={2} sx={{ textAlign: "left" }}>
              <SelectFrag
                value={idVersionCalculo}
                options={versionCalculo}
                onInputChange={handleSelect02}
                placeholder={"Seleccione la versión"}
                label={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            justifyContent: "center",
            display:
              clave !== "HIDROCARBUROS" &&
              clave !== "FOINMUN" &&
              clave !== "ICV" &&
              clave !== "ISN100" &&
              clave !== "PREDIAL" &&
              clave !== "FOULT" &&
              clave !== "FODES" &&
              clave !== "FOSEGMUN" &&
              clave !== "FODEM"
                ? "block"
                : "none",
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={3} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>Importe:</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <TextFieldFormatoMoneda
                disable={false}
                valor={0}
                handleSetValor={handleChange}
                error={!monto}
                modo={"moneda"}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            justifyContent: "center",
            display: clave === "FOSEGMUN" ? "block" : "none",
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
                onChange={(v) => setieja(Number(v.target.value))}
                onPaste={(e) => e.preventDefault()}
                error={ieja ? false : true}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid
              item
              container
              xs={6}
              sm={6}
              md={6}
              justifyContent="flex-end"
              sx={{ textAlign: "right", alignContent: "right" }}
            >
              <Grid item xs={12} sm={12} md={11} lg={6} sx={{ textAlign: "right" }}>
                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                  Derechos por los servicios de Supervisión, Control y Expedición de
                  Constancias de Ingreso:
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <Input
                sx={{ paddingTop: 2, fontWeight: "MontserratMedium" }}
                required
                placeholder="1500000*"
                id="derecho"
                onChange={(v) => setDerecho(Number(v.target.value))}
                onPaste={(e) => e.preventDefault()}
                error={derecho ? false : true}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            justifyContent: "center",
            display: clave === "FISM" ? "block" : "none",
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                <TooltipPersonalizado
                  title={
                    <React.Fragment>
                      {
                        "Si se activa esta opción, el cálculo se realizará considerando tanto el importe a distribuir en el mes como el importe anual asignado para su distribución"
                      }
                    </React.Fragment>
                  }
                >
                  <FormControlLabel
                    value={dises}
                    control={<Checkbox checked={dises} onChange={handleChangedises} />}
                    label="Distibución Especial"
                  />
                </TooltipPersonalizado>
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>

          {dises && (
            <Grid container spacing={1} sx={{ justifyContent: "center" }}>
              <Grid item xs={3} sm={6} md={6} sx={{ textAlign: "right" }}>
                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                  Importe Anual:
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
                <TextFieldFormatoMoneda
                  disable={false}
                  valor={0}
                  handleSetValor={handleChangeAnual}
                  error={!montoAnual}
                  modo={"moneda"}
                />
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            justifyContent: "center",
            display:
              clave === "ICV" ||
              clave === "ISN100" ||
              clave === "PREDIAL" ||
              clave === "HIDROCARBUROS" ||
              clave === "FOINMUN" ||
              clave === "ISR SALARIOS"
                ? "block"
                : "none",
          }}
        >
          <Grid container spacing={0}>
            <Grid
              container
              item
              xs={6}
              sm={6}
              md={6}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              paddingRight={1.5}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Cargar Archivo:
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <IconButton aria-label="upload picture" component="label" size="large">
                <input id="ICV" required type="file" hidden onChange={handleNewFile} />
                <UploadFileIcon />
              </IconButton>

              <Box>
                <label>{nameNewDoc}</label>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={9} sm={9} md={1} sx={{ textAlign: "center" }}>
          <Button
            className="enviar-mensaje"
            disabled={disableCalcular}
            onClick={handleSend}
            fullWidth
            variant="contained"
          >
            <Typography color="white">Calcular</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ModalNew;
