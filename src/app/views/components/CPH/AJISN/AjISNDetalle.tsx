import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { messages } from "../../../styles";

import Slider from "../../Slider";
import MUIXDataGrid from "../../MUIXDataGrid";
import { calculosServices } from "../../../../services/calculosServices";

export const AjISNDetalle = () => {
  const navigate = useNavigate();
  const { anio } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const handleBack = () => navigate("/inicio/articulos/AISN");

  const moneda = (value: any) =>
    Number(value || 0).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });

  const columnsAjISNDetalle: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "Nombre",
      headerName: "Municipio",
      minWidth: 180,
    },

    

    {
      field: "participaciones_pagadas_anio_anterior_def",
      headerName: "Participaciones Año Anterior",
      minWidth: 220,
      type: "number",
      align: "right",
      headerAlign: "right",
      valueFormatter: ({ value }) => moneda(value),
    },

    {
      field: "participaciones_anio_anterior_inflacion",
      headerName: "Año Anterior + Inflación",
      minWidth: 220,
      align: "right",
      headerAlign: "right",
      valueFormatter: ({ value }) => moneda(value),
    },

    {
      field: "participaciones_anio_actual_isn",
      headerName: "Participaciones ISN",
      minWidth: 200,
      align: "right",
      headerAlign: "right",
      valueFormatter: ({ value }) => moneda(value),
    },
    {
      field: "estima_recibir_menos_anio_anterior",
      headerName: "¿Recibe menos que el año anterior?",
      minWidth: 180,
    },
    {
      field: "compensacion",
      headerName: "Compensación",
      minWidth: 160,
      align: "right",
      headerAlign: "right",
      valueFormatter: ({ value }) => moneda(value),
    },

    {
      field: "excedente",
      headerName: "Excedente",
      minWidth: 160,
      align: "right",
      headerAlign: "right",
      valueFormatter: ({ value }) => moneda(value),
    },

    {
      field: "disminucion_excedente",
      headerName: "Disminución Excedente",
      minWidth: 200,
      align: "right",
      headerAlign: "right",
      valueFormatter: ({ value }) => moneda(value),
    },

    {
      field: "monto_distribuir_post_garantia",
      headerName: "Monto a Distribuir",
      minWidth: 200,
      align: "right",
      headerAlign: "right",
      valueFormatter: ({ value }) => moneda(value),
    },

    {
      field: "porcentaje",
      headerName: "%",
      width: 120,
    },

    {
      field: "coeficiente",
      headerName: "Coeficiente",
      width: 140,
    },
    {
      field: "ajuste",
      headerName: "Ajuste",
      width: 140,
    },
  ];

  useEffect(() => {
    setLoading(true);

    calculosServices
      .AjusteISNIndex({
        NUMOPERACION: 3,
        P_IDANIO: anio,
        P_FONDO: "",
      })
      .then((res) => {
        if (res.SUCCESS) setData(res.RESPONSE || []);
      })
      .finally(() => setLoading(false));
  }, [anio]);

  return (
    <Box p={2}>
      <Slider open={loading} />

      {/* Header */}
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Tooltip title="Regresar">
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item>
          <Typography variant="h5" fontWeight={600}>
            Ajuste ISN
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Detalle del año {anio}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Tabla */}
      <Card>
        <CardContent>
          <Box sx={{ height: 620 }}>
            <MUIXDataGrid
              columns={columnsAjISNDetalle}
              rows={data}
              localeText={{
                noRowsLabel: "No hay información para mostrar",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
