import { Box, Button, Grid, InputLabel, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { base64ToArrayBuffer } from "../../../helpers/Files";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { IReportes } from "../../../interfaces/menu/menu";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getcontrolInternoEntidad } from "../../../services/localStorage";
import SelectFrag from "../Fragmentos/SelectFrag";
import SliderProgress from "../SliderProgress";

import { Titulo } from "../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo";

export const Concentrado = () => {
  const [openSlider, setOpenSlider] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [anio, setAnio] = useState<string>("");
  const [reporte, setReporte] = useState<IReportes>();

  const [tipoReporte, setTipoReporte] = useState<string>("");

  const tiposReporte: SelectValues[] = [
  { label: "Distribución", value: "distribucion" },
  { label: "Montos ingresados", value: "montos" }
];

  const handleFilterChangeAnio = (v: string) => {
    setAnio(v);
    
  };

  const handleTipoReporteChange = (v: string) => {
  setTipoReporte(v);
};

  const loadFilter = (tipo: number) => {
    const data = {
      NUMOPERACION: tipo,
      P_DEPENDENCIA: JSON.parse(String(getcontrolInternoEntidad())),
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (tipo === 49) {
        setAnios(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    loadFilter(49);
  }, []);

  useEffect(() => {
    const x = anios[anios.length - 1]?.value || "";
    if (x) setAnio(x);
  }, [anios]);

  const handleGenerar = () => {
    setOpenSlider(true);

    if (anio === "" || anio === "false") {
      AlertS.fire({ title: "Es obligatorio el Año", icon: "warning" });
      setOpenSlider(false);
      return;
    }

    const data = {
      CHID: reporte?.id,
      AUXILIAR: reporte?.Auxiliar,
      P_ANIO: anio,
      P_TIPO_REPORTE: tipoReporte
    };

    axios
      .request({
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_APPLICATION_BASE_URL + "handleReportConcentrado",
        headers: { "Content-Type": "application/json", responseType: "blob" },
        data,
      })
      .then((response) => {
        if (!response.data.SUCCESS) {
            AlertS.fire({ title: response.data.STRMESSAGE, icon: "error" });
            setOpenSlider(false);
            return;
        }

        const bufferArray = base64ToArrayBuffer(String(response.data.RESPONSE));
        const blobStore = new Blob([bufferArray], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blobStore);
        link.download = `${reporte?.Nombre ?? "Concentrado_Anual"}_${anio}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
        setOpenSlider(false);

        
    })
      .catch((error) => {
        console.error(error);
        setOpenSlider(false);
      });
  };

  return (
    <Grid container xs={12} sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <SliderProgress open={openSlider} mensaje={"Generando Reporte"} />
       <Grid container item xs={11} sm={11} md={11} lg={11} sx={{ display: 'flex', justifyContent: 'center'}}>
           
        </Grid>

      <Grid
        container
        item
        xs={11} sm={11} md={7} lg={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 4,
        }}
      >

         <Titulo name={"Reporte de Concentrado Anual"}></Titulo>

        {/* Tipo de reporte */}
        <Box>
          <InputLabel sx={{ mb: 0.5 }}>Tipo de reporte:</InputLabel>
          <SelectFrag
            value={tipoReporte}
            options={tiposReporte}
            onInputChange={handleTipoReporteChange}
            placeholder={"Seleccione tipo de reporte"}
            label={""}
            disabled={false}
          />
        </Box>

        {/* Año */}
        <Box>
          <InputLabel sx={{ mb: 0.5 }}>Año:</InputLabel>
          <SelectFrag
            value={anio}
            options={anios}
            onInputChange={handleFilterChangeAnio}
            placeholder={"Seleccione Año"}
            label={""}
            disabled={false}
          />
        </Box>

        {/* Botón Generar */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="guardar"
            color="info"
            variant="contained"
            onClick={handleGenerar}
            disabled={openSlider}
            startIcon={openSlider ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ minWidth: 140 }}
          >
            {openSlider ? "Generando..." : "Generar"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};