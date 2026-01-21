import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Slider from "../../Slider";
import MUIXDataGrid from "../../MUIXDataGrid";
import { calculosServices } from "../../../../services/calculosServices";

export const AjISNDetalle = () => {
  const navigate = useNavigate();
  const { anio } = useParams();

  const [slideropen, setslideropen] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const handleBack = () => {
    navigate("/inicio/articulos/AISN");
  };

  const columnsAjISNDetalle = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    { field: "idMun", headerName: "ID Municipio", width: 150, hide: true },
    { field: "idPresupuestoPorRecaudacion", headerName: "ID Presupuesto", width: 150, hide: true },
    { field: "deleted", headerName: "Eliminado", width: 100, hide: true },
    { field: "fecha_creacion", headerName: "Fecha Creación", width: 180 },
    { field: "creadoPor", headerName: "Creado Por", hide: true, width: 150 },
    { field: "anio", headerName: "Año", width: 120 },
    { field: "mes", headerName: "Mes", width: 100 },
    { field: "IsnAnioAnt", headerName: "ISN Año Anterior", width: 180 },
    { field: "IsnAnioAntMasInflacion", headerName: "ISN Año Ant + Inflación", width: 200 },
    { field: "IsnEstimadoAnioActual", headerName: "ISN Estimado Año Actual", width: 200 },
    { field: "DiferenciaEstimada", headerName: "Diferencia Estimada", width: 180 },
    { field: "CoefDiferencia", headerName: "Coef. Diferencia", width: 160 },
    { field: "montosAnioAntMasInflacionCrecimiento", headerName: "Montos Año Ant + Inflación Crec.", width: 250 },
    { field: "monto_compensacion", headerName: "Monto Compensación", width: 180 },
    { field: "monto_act_mun_superior_ant", headerName: "Monto Act Mun Superior Ant", width: 220 },
    { field: "monto_excedente_sobre_ant", headerName: "Monto Excedente Sobre Ant", width: 220 },
    { field: "PORCENTAJE_COMPENSACION_EXCEDENTE_SOBRE_ANT", headerName: "% Comp. Excedente Sobre Ant", width: 240 },
    { field: "monto_a_disminuir_mun_crec", headerName: "Monto a Disminuir Mun Crec", width: 220 },
    { field: "SUMA_MONTO_COMPENSACION", headerName: "Suma Monto Compensación", width: 200 },
    { field: "SUMA_MONTO_EXCEDENTE_SOBRE_ANT", headerName: "Suma Monto Excedente Sobre Ant", width: 250 },
    { field: "monto_a_distribuir_min_garantizado", headerName: "Monto Dist. Min Garantizado", width: 230 },
    { field: "FACTOR1", headerName: "Factor 1", width: 130 },
    { field: "FACTOR2", headerName: "Factor 2", width: 130 },
    { field: "incremento_vs_ant", headerName: "Incremento vs Ant", width: 180 },
    { field: "coeficiente", headerName: "Coeficiente", width: 150 },
  ];

  useEffect(() => {
    setslideropen(true);

    calculosServices
      .AjusteISNIndex({
        NUMOPERACION: 3,
        P_IDANIO: anio,
        P_FONDO: "",
      })
      .then((res) => {
        if (res.SUCCESS) {
          setData(res.RESPONSE);
        }
        setslideropen(false);
      });
  }, [anio]);

  return (
    <Box>
      <Slider open={slideropen} />

      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4">
            Detalle Ajuste ISN – Año {anio}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mb: 1 }}>
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
          <Tooltip title="Regresar">
            <ToggleButton value="check" onClick={() => handleBack()}>
              <ArrowBackIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        <MUIXDataGrid columns={columnsAjISNDetalle} rows={data} />
      </div>
    </Box>
  );
};

